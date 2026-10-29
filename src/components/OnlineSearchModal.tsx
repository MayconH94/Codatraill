import React, { useState } from 'react';
import { OnlineSearchResult, LanguageCode, DocItem } from '../types';
import { DocFetcherService } from '../services/docFetcher';
import { getTranslation } from '../i18n/translations';
import { Search, X, Download, Check, ExternalLink, Loader2, Sparkles, Globe } from 'lucide-react';

interface OnlineSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageCode;
  onImportDoc: (article: DocItem) => void;
}

export const OnlineSearchModal: React.FC<OnlineSearchModalProps> = ({
  isOpen,
  onClose,
  lang,
  onImportDoc,
}) => {
  const t = getTranslation(lang);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<OnlineSearchResult[]>([]);
  const [importedIds, setImportedIds] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const data = await DocFetcherService.searchOnline(query.trim());
      setResults(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = (item: OnlineSearchResult) => {
    const docItem = DocFetcherService.createDocItemFromOnline(item);
    onImportDoc(docItem);
    setImportedIds((prev) => new Set(prev).add(item.url));
  };

  const popularSuggestions = ['React 19', 'Rust Ownership', 'Python 3.12', 'Docker Compose', 'Go Goroutines', 'TypeScript satisfies'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0e1612] border border-gray-200 dark:border-[#1f3328] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-[#1f3328] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-neon border border-brand-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {t.onlineSearchTitle}
              </h2>
              <p className="text-xs text-gray-500 dark:text-[#8ba697]">
                {t.onlineSearchSubtitle}
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

        {/* Search Input Form */}
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-[#15241c]">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-[#8ba697]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.onlineSearchPrompt}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#18261f] border border-gray-300 dark:border-[#1f3328] rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white dark:bg-brand-neon dark:text-[#070a08] font-bold text-sm rounded-xl flex items-center space-x-1.5 shadow-neon-sm disabled:opacity-50 transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>Buscar</span>
              )}
            </button>
          </form>

          {/* Popular shortcuts */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-gray-400 dark:text-[#8ba697] text-[11px] flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-brand-500 dark:text-brand-neon" />
              <span>{t.popularSearches}</span>
            </span>
            {popularSuggestions.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setQuery(item);
                  DocFetcherService.searchOnline(item).then(setResults);
                }}
                className="px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-[#18261f] hover:bg-brand-500/10 text-gray-700 dark:text-[#8ba697] hover:text-brand-500 dark:hover:text-brand-neon border border-gray-200 dark:border-[#1f3328] text-[11px] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-gray-500 dark:text-[#8ba697]">
              <Loader2 className="w-8 h-8 animate-spin text-brand-500 dark:text-brand-neon mb-2" />
              <p className="text-xs">{t.fetchingOnline}</p>
            </div>
          ) : results.length > 0 ? (
            results.map((item, index) => {
              const isImported = importedIds.has(item.url);
              return (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-gray-50 dark:bg-[#14201a] border border-gray-200 dark:border-[#1f3328] hover:border-brand-500/40 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-brand-500/10 text-brand-600 dark:text-brand-neon border border-brand-500/20">
                          {item.source}
                        </span>
                        <span className="text-[11px] text-gray-400 dark:text-[#8ba697]">
                          {item.language}
                        </span>
                      </div>
                      <h3 className="mt-1 font-bold text-sm text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-600 dark:text-[#8ba697] line-clamp-2">
                        {item.snippet}
                      </p>
                    </div>

                    {/* Import Button */}
                    <button
                      onClick={() => handleImport(item)}
                      disabled={isImported}
                      className={`shrink-0 px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                        isImported
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-brand-neon border border-emerald-500/30'
                          : 'bg-brand-500 hover:bg-brand-600 text-white dark:bg-brand-neon dark:text-[#070a08] shadow-neon-sm'
                      }`}
                    >
                      {isImported ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{t.savedToCodatraill}</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>{t.saveToCodatraill}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {item.url && (
                    <div className="mt-2.5 pt-2 border-t border-gray-200 dark:border-[#1f3328] flex items-center justify-between text-[11px]">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-brand-500 dark:hover:text-brand-neon flex items-center space-x-1 truncate max-w-sm"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span className="truncate">{item.url}</span>
                      </a>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-10 text-center text-gray-500 dark:text-[#8ba697]">
              <Globe className="w-10 h-10 mx-auto text-gray-400 dark:text-[#1f3328] mb-2" />
              <p className="text-xs">{t.fetchOnlineDocsDesc}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
