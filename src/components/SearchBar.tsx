import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  lang: LanguageCode;
  totalResults?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  lang,
  totalResults,
}) => {
  const t = getTranslation(lang);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-gray-400 dark:text-[#8ba697] pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-10 pr-20 py-2.5 bg-white dark:bg-[#0e1612] border border-gray-300 dark:border-[#1f3328] rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#8ba697]/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
        />

        <div className="absolute right-3 flex items-center space-x-1.5">
          {value ? (
            <button
              onClick={() => onChange('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
              title="Limpar pesquisa"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-gray-400 dark:text-[#8ba697] bg-gray-100 dark:bg-[#18261f] border border-gray-200 dark:border-[#1f3328] rounded">
              /
            </kbd>
          )}
        </div>
      </div>

      {value && typeof totalResults === 'number' && (
        <div className="mt-1.5 px-2 text-xs text-gray-500 dark:text-[#8ba697]">
          {totalResults > 0
            ? `${totalResults} resultado(s) encontrado(s)`
            : t.noResults}
        </div>
      )}
    </div>
  );
};
