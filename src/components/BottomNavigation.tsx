import React from 'react';
import { Home, Search, CheckCircle2, Bookmark, Settings } from 'lucide-react';
import { LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';

interface BottomNavigationProps {
  currentTab: 'home' | 'search' | 'offline' | 'bookmarks' | 'settings';
  onSelectTab: (tab: 'home' | 'search' | 'offline' | 'bookmarks' | 'settings') => void;
  lang: LanguageCode;
  bookmarksCount: number;
  offlineCount: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onSelectTab,
  lang,
  bookmarksCount,
  offlineCount,
}) => {
  const t = getTranslation(lang);

  const navItems: {
    id: 'home' | 'search' | 'offline' | 'bookmarks' | 'settings';
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[] = [
    { id: 'home', label: t.navHome, icon: <Home className="w-5 h-5" /> },
    { id: 'search', label: t.navExplore, icon: <Search className="w-5 h-5" /> },
    {
      id: 'offline',
      label: t.navOffline,
      icon: <CheckCircle2 className="w-5 h-5" />,
      badge: offlineCount > 0 ? offlineCount : undefined,
    },
    {
      id: 'bookmarks',
      label: t.navBookmarks,
      icon: <Bookmark className="w-5 h-5" />,
      badge: bookmarksCount > 0 ? bookmarksCount : undefined,
    },
    { id: 'settings', label: t.navSettings, icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#070a08]/90 backdrop-blur-md border-t border-gray-200 dark:border-[#1f3328] px-2 py-1.5 sm:hidden transition-colors duration-200">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-brand-600 dark:text-brand-neon font-bold'
                  : 'text-gray-500 dark:text-[#8ba697] hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="relative">
                {item.icon}
                {typeof item.badge === 'number' && (
                  <span className="absolute -top-1 -right-2 px-1 min-w-[14px] h-[14px] flex items-center justify-center text-[9px] font-bold bg-brand-500 dark:bg-brand-neon text-white dark:text-[#070a08] rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 w-4 h-0.5 bg-brand-500 dark:bg-brand-neon rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
