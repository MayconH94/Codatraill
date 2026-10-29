import React, { useState } from 'react';
import { Technology, LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';
import { Download, Check, BookOpen, ExternalLink, RefreshCw } from 'lucide-react';

interface TechCardProps {
  tech: Technology;
  isDownloaded: boolean;
  onSelect: (tech: Technology) => void;
  onToggleDownload: (tech: Technology) => Promise<void>;
  lang: LanguageCode;
}

export const TechCard: React.FC<TechCardProps> = ({
  tech,
  isDownloaded,
  onSelect,
  onToggleDownload,
  lang,
}) => {
  const t = getTranslation(lang);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDownloadClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUpdating(true);
    try {
      await onToggleDownload(tech);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      onClick={() => onSelect(tech)}
      className="group relative bg-white dark:bg-[#0e1612] hover:bg-gray-50/80 dark:hover:bg-[#14201a] border border-gray-200 dark:border-[#1f3328] hover:border-brand-500/40 dark:hover:border-brand-500/60 rounded-2xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-neon-sm"
    >
      <div>
        {/* Top Header of Card */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm"
              style={{
                backgroundColor: `${tech.color}15`,
                color: tech.color,
                border: `1px solid ${tech.color}35`,
              }}
            >
              {tech.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-neon transition-colors">
                  {tech.name}
                </h3>
                {isDownloaded && (
                  <span
                    className="inline-flex items-center p-0.5 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-brand-neon"
                    title={t.downloaded}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <span className="text-[11px] font-mono text-gray-400 dark:text-[#8ba697]">
                v{tech.currentVersion}
              </span>
            </div>
          </div>

          {/* Offline Download Button */}
          <button
            onClick={handleDownloadClick}
            disabled={isUpdating}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all ${
              isDownloaded
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-brand-neon hover:bg-red-500/10 hover:text-red-500 border border-emerald-500/20'
                : 'bg-gray-100 hover:bg-brand-500 hover:text-white dark:bg-[#18261f] text-gray-700 dark:text-[#e6f3ec] dark:hover:bg-brand-500 dark:hover:text-[#070a08] border border-gray-200 dark:border-[#1f3328]'
            }`}
            title={isDownloaded ? t.downloaded : t.downloadForOffline}
          >
            {isUpdating ? (
              <RefreshCw className="w-4 h-4 animate-spin text-brand-500" />
            ) : isDownloaded ? (
              <Check className="w-4 h-4" />
            ) : (
              <Download className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 dark:text-[#8ba697] line-clamp-2 leading-relaxed mb-4">
          {tech.description}
        </p>
      </div>

      {/* Footer Details */}
      <div className="pt-3 border-t border-gray-100 dark:border-[#15241c] flex items-center justify-between text-[11px] text-gray-500 dark:text-[#8ba697]">
        <div className="flex items-center space-x-1 font-medium">
          <BookOpen className="w-3.5 h-3.5 text-brand-500 dark:text-brand-neon" />
          <span>
            {tech.articles.length} {t.articlesCount}
          </span>
        </div>

        <span className="text-brand-600 dark:text-brand-neon font-semibold text-xs group-hover:translate-x-0.5 transition-transform">
          {t.viewDocs} →
        </span>
      </div>
    </div>
  );
};
