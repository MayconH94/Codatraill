import React from 'react';
import { CategoryType, LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';
import { Layers, Terminal, Layout, Server, Smartphone, Cloud, Database, CheckCircle2 } from 'lucide-react';

interface CategoryFilterProps {
  selected: CategoryType | 'offline';
  onSelect: (cat: CategoryType | 'offline') => void;
  lang: LanguageCode;
  offlineCount?: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selected,
  onSelect,
  lang,
  offlineCount = 0,
}) => {
  const t = getTranslation(lang);

  const categories: { id: CategoryType | 'offline'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t.allCategories, icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'language', label: t.languages, icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: 'frontend', label: t.frontend, icon: <Layout className="w-3.5 h-3.5" /> },
    { id: 'backend', label: t.backend, icon: <Server className="w-3.5 h-3.5" /> },
    { id: 'mobile', label: t.mobile, icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: 'devops', label: t.devops, icon: <Cloud className="w-3.5 h-3.5" /> },
    { id: 'database', label: t.database, icon: <Database className="w-3.5 h-3.5" /> },
    {
      id: 'offline',
      label: `${t.downloadedOnly} (${offlineCount})`,
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 dark:text-brand-neon" />,
    },
  ];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex space-x-2 min-w-max">
        {categories.map((cat) => {
          const isActive = selected === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                isActive
                  ? 'bg-brand-500 text-white dark:bg-brand-neon dark:text-[#070a08] shadow-neon-sm font-bold'
                  : 'bg-white dark:bg-[#0e1612] text-gray-700 dark:text-[#8ba697] hover:bg-gray-100 dark:hover:bg-[#14201a] border border-gray-200 dark:border-[#1f3328]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
