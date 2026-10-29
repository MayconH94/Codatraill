import React from 'react';
import { Technology, LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';
import { HardDrive, X, Trash2, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

interface OfflineManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageCode;
  technologies: Technology[];
  downloadedIds: string[];
  onRemovePackage: (techId: string) => Promise<void>;
  onClearAll: () => Promise<void>;
  storageUsage: { usageMB: string; quotaMB: string };
}

export const OfflineManagerModal: React.FC<OfflineManagerModalProps> = ({
  isOpen,
  onClose,
  lang,
  technologies,
  downloadedIds,
  onRemovePackage,
  onClearAll,
  storageUsage,
}) => {
  const t = getTranslation(lang);

  if (!isOpen) return null;

  const downloadedTechs = technologies.filter((tech) =>
    downloadedIds.includes(tech.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0e1612] border border-gray-200 dark:border-[#1f3328] rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-[#1f3328] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-neon border border-brand-500/20">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                {t.storage}
              </h2>
              <p className="text-xs text-gray-500 dark:text-[#8ba697]">
                {t.offlineNotice}
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

        {/* Storage Stats Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-[#15241c] bg-gray-50/50 dark:bg-[#090f0c]">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-gray-600 dark:text-[#8ba697]">{t.usedStorage}</span>
            <span className="font-bold text-brand-600 dark:text-brand-neon font-mono">
              {storageUsage.usageMB} MB / {storageUsage.quotaMB} MB
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-[#1f3328] overflow-hidden">
            <div
              className="h-full bg-brand-500 dark:bg-brand-neon shadow-neon-sm rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(
                  100,
                  (parseFloat(storageUsage.usageMB) / (parseFloat(storageUsage.quotaMB) || 1024)) * 100
                )}%`,
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-[#8ba697]">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-500 dark:text-brand-neon" />
              <span>
                {downloadedTechs.length} {t.totalOfflinePackages}
              </span>
            </div>

            <button
              onClick={onClearAll}
              className="text-red-500 hover:text-red-600 text-xs font-semibold flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearCache}</span>
            </button>
          </div>
        </div>

        {/* Downloaded Packages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2">
          {downloadedTechs.length > 0 ? (
            downloadedTechs.map((tech) => (
              <div
                key={tech.id}
                className="p-3 rounded-xl bg-gray-50 dark:bg-[#14201a] border border-gray-200 dark:border-[#1f3328] flex items-center justify-between"
              >
                <div className="flex items-center space-x-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                    style={{
                      backgroundColor: `${tech.color}15`,
                      color: tech.color,
                      border: `1px solid ${tech.color}35`,
                    }}
                  >
                    {tech.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">
                      {tech.name}
                    </h4>
                    <span className="text-[10px] text-gray-400 dark:text-[#8ba697]">
                      {tech.articles.length} {t.articlesCount} • Pronto para consulta
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onRemovePackage(tech.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                  title="Remover pacote offline"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-400 dark:text-[#8ba697]">
              <ShieldCheck className="w-8 h-8 mx-auto text-gray-300 dark:text-[#1f3328] mb-2" />
              <p className="text-xs">
                Nenhum pacote salvo offline ainda. Clique em "Baixar Offline" em qualquer linguagem ou framework.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
