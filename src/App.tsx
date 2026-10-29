import React, { useState, useEffect, useMemo } from 'react';
import { 
  Technology, DocItem, CategoryType, LanguageCode, ThemeMode, Bookmark 
} from './types';
import { defaultTechnologies } from './data/defaultDocsets';
import { storage } from './services/storage';
import { getTranslation } from './i18n/translations';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { TechCard } from './components/TechCard';
import { DocViewer } from './components/DocViewer';
import { OnlineSearchModal } from './components/OnlineSearchModal';
import { OfflineManagerModal } from './components/OfflineManagerModal';
import { BookmarksModal } from './components/BookmarksModal';
import { SettingsModal } from './components/SettingsModal';
import { BottomNavigation } from './components/BottomNavigation';
import { Sparkles, Terminal, BookOpen, CheckCircle2, Globe, WifiOff } from 'lucide-react';

export const App: React.FC = () => {
  // App State
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [lang, setLang] = useState<LanguageCode>('pt');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  
  // Data State
  const [technologies, setTechnologies] = useState<Technology[]>(defaultTechnologies);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [initialArticleId, setInitialArticleId] = useState<string | undefined>(undefined);
  
  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'offline'>('all');
  
  // Modals & Navigation
  const [isOnlineSearchOpen, setIsOnlineSearchOpen] = useState(false);
  const [isOfflineManagerOpen, setIsOfflineManagerOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentBottomTab, setCurrentBottomTab] = useState<'home' | 'search' | 'offline' | 'bookmarks' | 'settings'>('home');
  const [storageUsage, setStorageUsage] = useState({ usageMB: '1.8', quotaMB: '2048' });
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  const t = getTranslation(lang);

  // Listen for PWA Install Prompt
  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallApp = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice && choice.outcome === 'accepted') {
        setInstallPrompt(null);
      }
    }
  };

  // Initialize App, Theme, Storage & Listeners
  useEffect(() => {
    // 1. Setup Theme
    const savedTheme = storage.getTheme();
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 2. Setup Language
    const savedLang = storage.getLanguage();
    setLang(savedLang);

    // 3. Online / Offline listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 4. Initialize IndexedDB
    storage.init().then(async () => {
      const pkgIds = await storage.getDownloadedPackageIds();
      // By default, mark top 3 packages as downloaded so user has immediate offline docs
      if (pkgIds.length === 0) {
        const starter = ['javascript', 'typescript', 'react'];
        for (const id of starter) {
          const tech = defaultTechnologies.find((t) => t.id === id);
          if (tech) await storage.savePackage(tech);
        }
        setDownloadedIds(starter);
      } else {
        setDownloadedIds(pkgIds);
      }

      // Load bookmarks
      const bms = await storage.getBookmarks();
      setBookmarks(bms);

      // Load custom imported articles
      const customArticles = await storage.getCustomArticles();
      if (customArticles.length > 0) {
        setTechnologies((prev) => {
          let customTech = prev.find((t) => t.id === 'custom-docs');
          if (!customTech) {
            customTech = {
              id: 'custom-docs',
              name: 'Docs Importados',
              slug: 'custom-docs',
              icon: 'Globe',
              category: 'language',
              description: 'Documentações importadas via busca online no Codatraill.',
              website: '',
              docUrl: '',
              currentVersion: 'Personalizada',
              color: '#00FF88',
              totalArticles: customArticles.length,
              articles: customArticles,
            };
            return [customTech, ...prev];
          } else {
            return prev.map((t) =>
              t.id === 'custom-docs'
                ? { ...t, articles: customArticles, totalArticles: customArticles.length }
                : t
            );
          }
        });
      }

      // Estimate storage
      const usage = await storage.getStorageEstimate();
      setStorageUsage(usage);
    });

    // 5. Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Theme Toggle Handler
  const handleToggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    storage.setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Language Change Handler
  const handleChangeLang = (newLang: LanguageCode) => {
    setLang(newLang);
    storage.setLanguage(newLang);
  };

  // Package Download / Remove Toggle
  const handleToggleDownload = async (tech: Technology) => {
    const isDownloaded = downloadedIds.includes(tech.id);
    if (isDownloaded) {
      await storage.removePackage(tech.id);
      setDownloadedIds((prev) => prev.filter((id) => id !== tech.id));
    } else {
      await storage.savePackage(tech);
      setDownloadedIds((prev) => [...prev, tech.id]);
    }
    const usage = await storage.getStorageEstimate();
    setStorageUsage(usage);
  };

  // Bookmark Toggle
  const handleToggleBookmark = async (tech: Technology, article: DocItem) => {
    const exists = bookmarks.find((b) => b.articleId === article.id);
    if (exists) {
      await storage.removeBookmark(exists.id);
      setBookmarks((prev) => prev.filter((b) => b.id !== exists.id));
    } else {
      const newBm: Bookmark = {
        id: `bm_${Date.now()}`,
        techId: tech.id,
        techName: tech.name,
        articleId: article.id,
        title: article.title,
        category: article.category,
        savedAt: new Date().toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US'),
      };
      await storage.saveBookmark(newBm);
      setBookmarks((prev) => [newBm, ...prev]);
    }
  };

  // Import online documentation
  const handleImportDoc = async (article: DocItem) => {
    await storage.saveCustomArticle(article);
    setTechnologies((prev) => {
      const existing = prev.find((t) => t.id === 'custom-docs');
      if (existing) {
        return prev.map((t) =>
          t.id === 'custom-docs'
            ? { ...t, articles: [article, ...t.articles], totalArticles: t.articles.length + 1 }
            : t
        );
      } else {
        const newTech: Technology = {
          id: 'custom-docs',
          name: 'Docs Importados',
          slug: 'custom-docs',
          icon: 'Globe',
          category: 'language',
          description: 'Documentações sincronizadas online no Codatraill.',
          website: '',
          docUrl: '',
          currentVersion: 'Personalizada',
          color: '#00FF88',
          totalArticles: 1,
          articles: [article],
        };
        return [newTech, ...prev];
      }
    });

    const usage = await storage.getStorageEstimate();
    setStorageUsage(usage);
  };

  // Clear all cache
  const handleClearAll = async () => {
    if (confirm(t.clearCache + '?')) {
      await storage.clearAllData();
      setDownloadedIds([]);
      setBookmarks([]);
      setStorageUsage({ usageMB: '0.2', quotaMB: '2048' });
      alert(t.cacheCleared);
    }
  };

  // Filtered Technologies computation
  const filteredTechnologies = useMemo(() => {
    return technologies.filter((tech) => {
      // Category filter
      if (selectedCategory === 'offline') {
        if (!downloadedIds.includes(tech.id)) return false;
      } else if (selectedCategory !== 'all') {
        if (tech.category !== selectedCategory) return false;
      }

      // Search Query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchName = tech.name.toLowerCase().includes(q);
      const matchDesc = tech.description.toLowerCase().includes(q);
      const matchArticles = tech.articles.some(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags.some((tag) => tag.toLowerCase().includes(q))
      );

      return matchName || matchDesc || matchArticles;
    });
  }, [technologies, selectedCategory, downloadedIds, searchQuery]);

  // Handle Bottom Navigation Switch
  const handleSelectBottomTab = (tab: 'home' | 'search' | 'offline' | 'bookmarks' | 'settings') => {
    setCurrentBottomTab(tab);
    if (tab === 'home') {
      setSelectedTech(null);
      setSelectedCategory('all');
    } else if (tab === 'search') {
      setIsOnlineSearchOpen(true);
    } else if (tab === 'offline') {
      setSelectedTech(null);
      setSelectedCategory('offline');
    } else if (tab === 'bookmarks') {
      setIsBookmarksOpen(true);
    } else if (tab === 'settings') {
      setIsSettingsOpen(true);
    }
  };

  // If a technology reader is active, render DocViewer
  if (selectedTech) {
    return (
      <DocViewer
        tech={selectedTech}
        initialArticleId={initialArticleId}
        onBack={() => {
          setSelectedTech(null);
          setInitialArticleId(undefined);
        }}
        lang={lang}
        bookmarks={bookmarks}
        onToggleBookmark={handleToggleBookmark}
      />
    );
  }

  return (
    <div className="min-h-screen pb-20 sm:pb-8 bg-gray-50 dark:bg-[#070a08] text-gray-900 dark:text-[#e6f3ec] transition-colors duration-200">
      
      {/* Top Header */}
      <Header
        isOnline={isOnline}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        lang={lang}
        onChangeLang={handleChangeLang}
        onOpenOnlineSearch={() => setIsOnlineSearchOpen(true)}
        onOpenStorageManager={() => setIsOfflineManagerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 pt-4 sm:pt-6 space-y-4">
        
        {/* PWA Install Banner */}
        {installPrompt && (
          <div className="p-3.5 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-between gap-3 shadow-neon-sm">
            <div className="flex items-center space-x-2.5">
              <span className="text-xl">📱</span>
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">
                  Instalar Codatraill como Aplicativo
                </p>
                <p className="text-[11px] text-gray-600 dark:text-[#8ba697]">
                  Acesse direto da sua tela inicial com carregamento instantâneo offline.
                </p>
              </div>
            </div>
            <button
              onClick={handleInstallApp}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white dark:bg-brand-neon dark:text-[#070a08] shadow-neon-sm shrink-0"
            >
              Instalar
            </button>
          </div>
        )}

        {/* Offline Banner alert if user is disconnected */}
        {!isOnline && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center space-x-2 text-xs text-amber-700 dark:text-amber-300">
            <WifiOff className="w-4 h-4 shrink-0 text-amber-500" />
            <span>
              <strong>Modo Offline Ativo:</strong> Você está consultando a base de dados sincronizada localmente no seu aparelho.
            </span>
          </div>
        )}

        {/* Hero Section on Mobile */}
        <div className="sm:hidden pt-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="p-1 rounded bg-brand-500/10 text-brand-600 dark:text-brand-neon">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-semibold text-brand-600 dark:text-brand-neon">
              Central de Documentações
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Todas as suas docs em um só app.
          </h1>
        </div>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          lang={lang}
          totalResults={searchQuery ? filteredTechnologies.length : undefined}
        />

        {/* Category Filters */}
        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          lang={lang}
          offlineCount={downloadedIds.length}
        />

        {/* Quick Online Doc Fetcher CTA Bar */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0e1612] to-emerald-950/20 border border-brand-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-neon-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-brand-500/15 text-brand-500 dark:text-brand-neon border border-brand-500/30">
              <Globe className="w-5 h-5 animate-pulse-subtle" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center space-x-1.5">
                <span>{t.onlineSearchTitle}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-brand-neon/20 text-brand-neon font-mono font-normal">
                  Live Fetch
                </span>
              </h3>
              <p className="text-xs text-gray-500 dark:text-[#8ba697]">
                Busque qualquer biblioteca ou documentação na web e salve para ler offline.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOnlineSearchOpen(true)}
            className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white dark:bg-brand-neon dark:text-[#070a08] shadow-neon-sm flex items-center space-x-1.5 transition-all"
          >
            <span>Buscar Online</span>
            <span>→</span>
          </button>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 pt-2">
          {filteredTechnologies.map((tech) => (
            <TechCard
              key={tech.id}
              tech={tech}
              isDownloaded={downloadedIds.includes(tech.id)}
              onSelect={(selected) => {
                setSelectedTech(selected);
                setInitialArticleId(undefined);
              }}
              onToggleDownload={handleToggleDownload}
              lang={lang}
            />
          ))}
        </div>

        {filteredTechnologies.length === 0 && (
          <div className="py-16 text-center text-gray-400 dark:text-[#8ba697]">
            <BookOpen className="w-12 h-12 mx-auto text-gray-300 dark:text-[#1f3328] mb-3" />
            <h3 className="text-base font-bold text-gray-700 dark:text-white">
              {t.noResults}
            </h3>
            <p className="text-xs mt-1 max-w-sm mx-auto">
              Tente buscar por termos como "JavaScript", "React", "Rust", ou use a busca online para importar novas documentações.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-gray-200 dark:bg-[#18261f] text-gray-800 dark:text-[#e6f3ec]"
            >
              Limpar Filtros
            </button>
          </div>
        )}

      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation
        currentTab={currentBottomTab}
        onSelectTab={handleSelectBottomTab}
        lang={lang}
        bookmarksCount={bookmarks.length}
        offlineCount={downloadedIds.length}
      />

      {/* Online Search & Import Modal */}
      <OnlineSearchModal
        isOpen={isOnlineSearchOpen}
        onClose={() => setIsOnlineSearchOpen(false)}
        lang={lang}
        onImportDoc={handleImportDoc}
      />

      {/* Offline Storage Manager Modal */}
      <OfflineManagerModal
        isOpen={isOfflineManagerOpen}
        onClose={() => setIsOfflineManagerOpen(false)}
        lang={lang}
        technologies={technologies}
        downloadedIds={downloadedIds}
        onRemovePackage={async (techId) => {
          await storage.removePackage(techId);
          setDownloadedIds((prev) => prev.filter((id) => id !== techId));
        }}
        onClearAll={handleClearAll}
        storageUsage={storageUsage}
      />

      {/* Bookmarks Modal */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        lang={lang}
        bookmarks={bookmarks}
        technologies={technologies}
        onSelectBookmark={(tech, articleId) => {
          setSelectedTech(tech);
          setInitialArticleId(articleId);
        }}
        onRemoveBookmark={async (id) => {
          await storage.removeBookmark(id);
          setBookmarks((prev) => prev.filter((b) => b.id !== id));
        }}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        lang={lang}
        onChangeLang={handleChangeLang}
        storageUsage={storageUsage}
        onClearAll={handleClearAll}
      />

    </div>
  );
};
