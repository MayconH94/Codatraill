import React from 'react';
import { Bookmark, Technology, LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';
import { Bookmark as BookmarkIcon, X, Trash2, ArrowRight } from 'lucide-react';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageCode;
  bookmarks: Bookmark[];
  technologies: Technology[];
  onSelectBookmark: (tech: Technology, articleId: string) => void;
  onRemoveBookmark: (id: string) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  lang,
  bookmarks,
  technologies,
  onSelectBookmark,
  onRemoveBookmark,
}) => {
  const t = getTranslation(lang);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0e1612] border border-gray-200 dark:border-[#1f3328] rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-[#1f3328] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-neon border border-brand-500/20">
              <BookmarkIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                {t.myBookmarks}
              </h2>
              <p className="text-xs text-gray-500 dark:text-[#8ba697]">
                {bookmarks.length} artigo(s) salvo(s) para acesso rápido
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#14201a]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Bookmarks */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2">
          {bookmarks.length > 0 ? (
            bookmarks.map((b) => {
              const tech = technologies.find((t) => t.id === b.techId);
              return (
                <div
                  key={b.id}
                  onClick={() => {
                    if (tech) {
                      onSelectBookmark(tech, b.articleId);
                      onClose();
                    }
                  }}
                  className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#14201a] border border-gray-200 dark:border-[#1f3328] hover:border-brand-500/40 cursor-pointer flex items-center justify-between group transition-all"
                >
                  <div className="flex-1 pr-3">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-neon font-semibold">
                      {b.techName}
                    </span>
                    <h4 className="mt-1 font-bold text-xs sm:text-sm text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-neon transition-colors">
                      {b.title}
                    </h4>
                    <span className="text-[10px] text-gray-400 dark:text-[#8ba697]">
                      Salvo em: {b.savedAt}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveBookmark(b.id);
                      }}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Remover dos favoritos"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-500 dark:group-hover:text-brand-neon group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-gray-400 dark:text-[#8ba697]">
              <BookmarkIcon className="w-8 h-8 mx-auto text-gray-300 dark:text-[#1f3328] mb-2" />
              <p className="text-xs">{t.noBookmarks}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
