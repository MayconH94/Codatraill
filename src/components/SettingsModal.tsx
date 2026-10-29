import React from 'react';
import { ThemeMode, LanguageCode } from '../types';
import { getTranslation } from '../i18n/translations';
import { Settings, X, Moon, Sun, Globe, HardDrive, Smartphone, Trash2, Download, Upload } from 'lucide-react';
import { storage } from '../services/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  lang: LanguageCode;
  onChangeLang: (lang: LanguageCode) => void;
  storageUsage: { usageMB: string; quotaMB: string };
  onClearAll: () => Promise<void>;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  lang,
  onChangeLang,
  storageUsage,
  onClearAll,
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
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                {t.settings}
              </h2>
              <p className="text-xs text-gray-500 dark:text-[#8ba697]">
                Personalize tema, idioma e dados offline
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

        {/* Settings Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* Theme Option */}
          <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#14201a] border border-gray-200 dark:border-[#1f3328] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gray-200 dark:bg-[#1f3328] text-gray-700 dark:text-brand-neon">
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                  {t.theme}
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-[#8ba697]">
                  {theme === 'dark' ? t.darkTheme : t.lightTheme}
                </p>
              </div>
            </div>

            <button
              onClick={onToggleTheme}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-[#070a08] border border-gray-300 dark:border-[#1f3328] text-gray-800 dark:text-brand-neon shadow-sm hover:border-brand-500 transition-colors"
            >
              Alternar
            </button>
          </div>

          {/* Language Selector Option */}
          <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#14201a] border border-gray-200 dark:border-[#1f3328] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gray-200 dark:bg-[#1f3328] text-brand-500 dark:text-brand-neon">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                  {t.language}
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-[#8ba697]">
                  {lang === 'pt' ? 'Português (Brasil)' : lang === 'en' ? 'English (US)' : 'Español'}
                </p>
              </div>
            </div>

            <div className="flex space-x-1">
              {(['pt', 'en', 'es'] as LanguageCode[]).map((code) => (
                <button
                  key={code}
                  onClick={() => onChangeLang(code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    lang === code
                      ? 'bg-brand-500 text-white dark:bg-brand-neon dark:text-[#070a08] shadow-neon-sm'
                      : 'bg-white dark:bg-[#0e1612] text-gray-600 dark:text-[#8ba697] border border-gray-200 dark:border-[#1f3328]'
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Storage & Clear */}
          <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#14201a] border border-gray-200 dark:border-[#1f3328]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <HardDrive className="w-4 h-4 text-brand-500 dark:text-brand-neon" />
                <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                  {t.storage}
                </h4>
              </div>
              <span className="text-xs font-mono text-brand-600 dark:text-brand-neon font-bold">
                {storageUsage.usageMB} MB usado
              </span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-[#8ba697] mb-3">
              Todos os documentos baixados ficam gravados no IndexedDB do seu navegador para consulta 100% sem internet.
            </p>
            <div className="flex gap-2 mb-3">
              <button
                onClick={async () => {
                  const backup = await storage.exportBackup();
                  const blob = new Blob([backup], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `codatraill-backup-${new Date().toISOString().slice(0, 10)}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-[#18261f] dark:hover:bg-[#20332a] text-gray-800 dark:text-[#e6f3ec] border border-gray-200 dark:border-[#1f3328] flex items-center justify-center space-x-1"
              >
                <Download className="w-3.5 h-3.5 text-brand-500" />
                <span>Exportar Backup</span>
              </button>

              <label className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-[#18261f] dark:hover:bg-[#20332a] text-gray-800 dark:text-[#e6f3ec] border border-gray-200 dark:border-[#1f3328] flex items-center justify-center space-x-1 cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-brand-500" />
                <span>Restaurar</span>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const text = await file.text();
                      const ok = await storage.importBackup(text);
                      if (ok) {
                        alert('Backup restaurado com sucesso! A página será recarregada.');
                        window.location.reload();
                      } else {
                        alert('Erro ao importar arquivo de backup.');
                      }
                    }
                  }}
                />
              </label>
            </div>

            <button
              onClick={onClearAll}
              className="w-full py-2 px-3 rounded-lg text-xs font-bold text-red-500 hover:text-red-600 bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearCache}</span>
            </button>
          </div>

          {/* Mobile App Install Tip (PWA) */}
          <div className="p-3.5 rounded-xl bg-brand-500/5 dark:bg-brand-500/10 border border-brand-500/20">
            <div className="flex items-start space-x-3">
              <Smartphone className="w-5 h-5 text-brand-500 dark:text-brand-neon shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                  Instalar como Aplicativo Mobile
                </h4>
                <p className="text-[11px] text-gray-600 dark:text-[#8ba697] mt-0.5 leading-relaxed">
                  No celular (Chrome ou Safari), toque em <strong>"Compartilhar"</strong> ou no menu de 3 pontos e escolha <strong>"Adicionar à Tela de Início"</strong> para usar o Codatraill em tela cheia como um app nativo offline!
                </p>
              </div>
            </div>
          </div>

          {/* About App */}
          <div className="p-3 text-center text-xs text-gray-400 dark:text-[#8ba697]/70">
            <p className="font-bold text-gray-700 dark:text-white">Codatraill v1.0.0</p>
            <p className="text-[10px] mt-0.5">Construído com React, Tailwind CSS e TypeScript</p>
          </div>

        </div>

      </div>
    </div>
  );
};
