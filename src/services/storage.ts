import { Bookmark, DocItem, LanguageCode, Technology, ThemeMode } from '../types';

const DB_NAME = 'Codatraill_DB';
const DB_VERSION = 1;

class OfflineStorage {
  private db: IDBDatabase | null = null;
  private isSupported: boolean = typeof window !== 'undefined' && 'indexedDB' in window;

  async init(): Promise<void> {
    if (!this.isSupported) return;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Store for downloaded packages
        if (!db.objectStoreNames.contains('packages')) {
          db.createObjectStore('packages', { keyPath: 'id' });
        }

        // Store for cached doc items
        if (!db.objectStoreNames.contains('articles')) {
          db.createObjectStore('articles', { keyPath: 'id' });
        }

        // Store for bookmarks
        if (!db.objectStoreNames.contains('bookmarks')) {
          db.createObjectStore('bookmarks', { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onerror = (event) => {
        console.error('IndexedDB error:', event);
        resolve(); // resolve anyway to allow localStorage fallback
      };
    });
  }

  // --- Packages / Tech Storage ---
  async savePackage(tech: Technology): Promise<void> {
    const updated: Technology = {
      ...tech,
      isDownloaded: true,
      downloadedAt: new Date().toISOString(),
    };

    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db!.transaction('packages', 'readwrite');
        const store = tx.objectStore('packages');
        store.put(updated);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    } else {
      localStorage.setItem(`codatraill_pkg_${tech.id}`, JSON.stringify(updated));
    }
  }

  async removePackage(techId: string): Promise<void> {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db!.transaction('packages', 'readwrite');
        const store = tx.objectStore('packages');
        store.delete(techId);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    } else {
      localStorage.removeItem(`codatraill_pkg_${techId}`);
    }
  }

  async getDownloadedPackageIds(): Promise<string[]> {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db!.transaction('packages', 'readonly');
        const store = tx.objectStore('packages');
        const request = store.getAllKeys();
        request.onsuccess = () => {
          resolve(request.result.map(String));
        };
        request.onerror = () => resolve([]);
      });
    } else {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('codatraill_pkg_')) {
          keys.push(key.replace('codatraill_pkg_', ''));
        }
      }
      return keys;
    }
  }

  // --- Custom Doc Articles (Online Imports) ---
  async saveCustomArticle(article: DocItem): Promise<void> {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db!.transaction('articles', 'readwrite');
        const store = tx.objectStore('articles');
        store.put(article);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    } else {
      localStorage.setItem(`codatraill_art_${article.id}`, JSON.stringify(article));
    }
  }

  async getCustomArticles(): Promise<DocItem[]> {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db!.transaction('articles', 'readonly');
        const store = tx.objectStore('articles');
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result as DocItem[]);
        request.onerror = () => resolve([]);
      });
    } else {
      const articles: DocItem[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('codatraill_art_')) {
          try {
            articles.push(JSON.parse(localStorage.getItem(key) || ''));
          } catch {
            // ignore
          }
        }
      }
      return articles;
    }
  }

  // --- Bookmarks ---
  async saveBookmark(bookmark: Bookmark): Promise<void> {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db!.transaction('bookmarks', 'readwrite');
        const store = tx.objectStore('bookmarks');
        store.put(bookmark);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    } else {
      localStorage.setItem(`codatraill_bm_${bookmark.id}`, JSON.stringify(bookmark));
    }
  }

  async removeBookmark(id: string): Promise<void> {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db!.transaction('bookmarks', 'readwrite');
        const store = tx.objectStore('bookmarks');
        store.delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    } else {
      localStorage.removeItem(`codatraill_bm_${id}`);
    }
  }

  async getBookmarks(): Promise<Bookmark[]> {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db!.transaction('bookmarks', 'readonly');
        const store = tx.objectStore('bookmarks');
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result as Bookmark[]);
        request.onerror = () => resolve([]);
      });
    } else {
      const list: Bookmark[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('codatraill_bm_')) {
          try {
            list.push(JSON.parse(localStorage.getItem(key) || ''));
          } catch {
            // ignore
          }
        }
      }
      return list;
    }
  }

  // --- Settings ---
  getTheme(): ThemeMode {
    return (localStorage.getItem('codatraill_theme') as ThemeMode) || 'dark';
  }

  setTheme(theme: ThemeMode): void {
    localStorage.setItem('codatraill_theme', theme);
  }

  getLanguage(): LanguageCode {
    return (localStorage.getItem('codatraill_lang') as LanguageCode) || 'pt';
  }

  setLanguage(lang: LanguageCode): void {
    localStorage.setItem('codatraill_lang', lang);
  }

  // --- Clear & Usage ---
  async clearAllData(): Promise<void> {
    if (this.db) {
      const stores = ['packages', 'articles', 'bookmarks'];
      return new Promise((resolve) => {
        const tx = this.db!.transaction(stores, 'readwrite');
        stores.forEach((s) => tx.objectStore(s).clear());
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    } else {
      const toRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('codatraill_')) {
          toRemove.push(key);
        }
      }
      toRemove.forEach((k) => localStorage.removeItem(k));
    }
  }

  async getStorageEstimate(): Promise<{ usageMB: string; quotaMB: string }> {
    if (navigator.storage && navigator.storage.estimate) {
      try {
        const estimate = await navigator.storage.estimate();
        const usage = ((estimate.usage || 0) / (1024 * 1024)).toFixed(1);
        const quota = ((estimate.quota || 0) / (1024 * 1024)).toFixed(0);
        return { usageMB: usage, quotaMB: quota };
      } catch {
        // ignore
      }
    }
    return { usageMB: '2.4', quotaMB: '2048' };
  }

  // --- Export & Import Backup ---
  async exportBackup(): Promise<string> {
    const downloadedPackages = await this.getDownloadedPackageIds();
    const customArticles = await this.getCustomArticles();
    const bookmarks = await this.getBookmarks();
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      downloadedPackages,
      customArticles,
      bookmarks,
      theme: this.getTheme(),
      lang: this.getLanguage(),
    };
    return JSON.stringify(data, null, 2);
  }

  async importBackup(jsonString: string): Promise<boolean> {
    try {
      const data = JSON.parse(jsonString);
      if (data.bookmarks && Array.isArray(data.bookmarks)) {
        for (const b of data.bookmarks) {
          await this.saveBookmark(b);
        }
      }
      if (data.customArticles && Array.isArray(data.customArticles)) {
        for (const a of data.customArticles) {
          await this.saveCustomArticle(a);
        }
      }
      if (data.theme) this.setTheme(data.theme);
      if (data.lang) this.setLanguage(data.lang);
      return true;
    } catch {
      return false;
    }
  }
}

export const storage = new OfflineStorage();
