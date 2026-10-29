import React from 'react';
import { Wifi, WifiOff, Moon, Sun, Globe, Search, HardDrive } from 'lucide-react';
import { LanguageCode, ThemeMode } from '../types';
import { getTranslation } from '../i18n/translations';

interface HeaderProps {
  isOnline: boolean;
  theme: ThemeMode;
  onToggleTheme: () => void;
  lang: LanguageCode;
  onChangeLang: (lang: LanguageCode) => void;
  onOpenOnlineSearch: () => void;
  onOpenStorageManager: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isOnline,
  theme,
  onToggleTheme,
  lang,
  onChangeLang,
  onOpenOnlineSearch,
  onOpenStorageManager,
}) => {
  const t = getTranslation(lang);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-[#070a08]/85 border-b border-gray-200 dark:border-[#1f3328] px-4 py-3 transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-2.5">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[#0e1612] border border-[#1f3328] shadow-neon-sm">
            <img src="/logo.svg" alt="Codatraill Logo" className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight text-gray-900 dark:text-white">
                Coda<span className="text-brand-500 dark:text-brand-neon">traill</span>
              </span>
              
              {/* Online/Offline Badge */}
              <div
                className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                  isOnline
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-brand-neon border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                }`}
                title={isOnline ? t.onlineStatus : t.offlineStatus}
              >
                {isOnline ? (
                  <>
                    <Wifi className="w-2.5 h-2.5 animate-pulse-subtle" />
                    <span className="hidden sm:inline">{t.onlineStatus}</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-2.5 h-2.5" />
                    <span>{t.offlineStatus}</span>
                  </>
                )}
              </div>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-[#8ba697] hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          
          {/* Online Search trigger button */}
          <button
            onClick={onOpenOnlineSearch}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-700 dark:text-[#e6f3ec] bg-gray-100 hover:bg-gray-200 dark:bg-[#0e1612] dark:hover:bg-[#14201a] border border-gray-200 dark:border-[#1f3328] transition-all"
            title={t.searchOnlineDocs}
          >
            <Search className="w-3.5 h-3.5 text-brand-500 dark:text-brand-neon" />
            <span className="hidden md:inline">{t.searchOnlineDocs}</span>
          </button>

          {/* Storage / Offline manager */}
          <button
            onClick={onOpenStorageManager}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium text-gray-700 dark:text-[#e6f3ec] bg-gray-100 hover:bg-gray-200 dark:bg-[#0e1612] dark:hover:bg-[#14201a] border border-gray-200 dark:border-[#1f3328] transition-all flex items-center space-x-1"
            title={t.storage}
          >
            <HardDrive className="w-3.5 h-3.5 text-gray-500 dark:text-[#8ba697]" />
            <span className="hidden lg:inline">{t.storage}</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <select
              value={lang}
              onChange={(e) => onChangeLang(e.target.value as LanguageCode)}
              className="appearance-none bg-gray-100 dark:bg-[#0e1612] text-gray-800 dark:text-[#e6f3ec] border border-gray-200 dark:border-[#1f3328] text-xs font-medium py-1.5 pl-7 pr-2 rounded-lg cursor-pointer focus:outline-none focus:border-brand-500"
              title={t.language}
            >
              <option value="pt">PT</option>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
            <Globe className="w-3 h-3 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-gray-700 dark:text-brand-neon bg-gray-100 hover:bg-gray-200 dark:bg-[#0e1612] dark:hover:bg-[#14201a] border border-gray-200 dark:border-[#1f3328] transition-all"
            aria-label="Toggle theme"
            title={theme === 'dark' ? t.lightTheme : t.darkTheme}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-brand-neon hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-gray-700 hover:-rotate-12 transition-transform" />
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
