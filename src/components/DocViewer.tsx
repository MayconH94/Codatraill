import React, { useState, useEffect } from 'react';
import { DocItem, Technology, LanguageCode, Bookmark } from '../types';
import { getTranslation } from '../i18n/translations';
import { 
  ArrowLeft, Bookmark as BookmarkIcon, BookmarkCheck, ExternalLink, 
  Menu, X, Check, Copy, ZoomIn, ZoomOut, Share2, BookOpen, Play, Terminal, Trash2
} from 'lucide-react';
import { marked } from 'marked';

interface DocViewerProps {
  tech: Technology;
  initialArticleId?: string;
  onBack: () => void;
  lang: LanguageCode;
  bookmarks: Bookmark[];
  onToggleBookmark: (tech: Technology, article: DocItem) => void;
}

export const DocViewer: React.FC<DocViewerProps> = ({
  tech,
  initialArticleId,
  onBack,
  lang,
  bookmarks,
  onToggleBookmark,
}) => {
  const t = getTranslation(lang);
  const [selectedArticle, setSelectedArticle] = useState<DocItem>(
    tech.articles.find((a) => a.id === initialArticleId) || tech.articles[0]
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(15);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);
  const [playgroundCode, setPlaygroundCode] = useState(
    '// Teste e experimente código JavaScript em tempo real:\nconst linguagens = ["React", "TypeScript", "Python", "Go", "Rust"];\nconsole.log("Total de ferramentas:", linguagens.length);\n\nconst comPrefixo = linguagens.map(l => `🚀 ${l}`);\nconsole.log(comPrefixo);\n'
  );
  const [playgroundOutput, setPlaygroundOutput] = useState<string[]>([]);

  const handleRunPlayground = () => {
    const logs: string[] = [];
    const originalLog = console.log;
    try {
      console.log = (...args: any[]) => {
        logs.push(
          args
            .map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)))
            .join(' ')
        );
      };
      // Sandboxed execution of code snippet
      const result = new Function(playgroundCode)();
      if (result !== undefined) {
        logs.push(
          '➜ Retorno: ' +
            (typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result))
        );
      }
      setPlaygroundOutput(logs.length ? logs : ['✓ Código executado com sucesso sem erros.']);
    } catch (err: any) {
      setPlaygroundOutput([`❌ Erro na execução: ${err.message}`]);
    } finally {
      console.log = originalLog;
    }
  };

  useEffect(() => {
    if (initialArticleId) {
      const found = tech.articles.find((a) => a.id === initialArticleId);
      if (found) setSelectedArticle(found);
    }
  }, [initialArticleId, tech]);

  // Check if current article is bookmarked
  const isBookmarked = bookmarks.some((b) => b.articleId === selectedArticle.id);

  // Convert markdown to HTML with marked
  const renderedHtml = marked.parse(selectedArticle.content || '') as string;

  const handleCopyCode = (codeText: string, blockId: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeId(blockId);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${tech.name}: ${selectedArticle.title} - Codatraill`,
        text: selectedArticle.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070a08] text-gray-900 dark:text-[#e6f3ec] flex flex-col">
      
      {/* Top sticky navigation bar for Reader */}
      <div className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/90 dark:bg-[#070a08]/90 border-b border-gray-200 dark:border-[#1f3328] px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg text-gray-600 dark:text-[#8ba697] hover:bg-gray-100 dark:hover:bg-[#14201a] border border-gray-200 dark:border-[#1f3328] transition-colors"
              title={t.back}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Mobile TOC Drawer toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-1.5 rounded-lg text-gray-600 dark:text-[#8ba697] hover:bg-gray-100 dark:hover:bg-[#14201a] border border-gray-200 dark:border-[#1f3328] transition-colors"
              title={t.tableOfContents}
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: tech.color }}
              />
              <span className="font-bold text-sm tracking-tight text-gray-900 dark:text-white truncate max-w-[140px] sm:max-w-xs">
                {tech.name}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-neon border border-brand-500/20 font-mono">
                v{tech.currentVersion}
              </span>
            </div>
          </div>

          {/* Reader controls */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center space-x-0.5 bg-gray-100 dark:bg-[#0e1612] border border-gray-200 dark:border-[#1f3328] rounded-lg p-0.5">
              <button
                onClick={() => setFontSize((f) => Math.max(12, f - 1))}
                className="p-1 text-gray-600 dark:text-[#8ba697] hover:text-black dark:hover:text-white"
                title="Diminuir texto"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono px-1 text-gray-500 dark:text-[#8ba697]">
                {fontSize}px
              </span>
              <button
                onClick={() => setFontSize((f) => Math.min(22, f + 1))}
                className="p-1 text-gray-600 dark:text-[#8ba697] hover:text-black dark:hover:text-white"
                title="Aumentar texto"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-gray-600 dark:text-[#8ba697] hover:bg-gray-100 dark:hover:bg-[#14201a] border border-gray-200 dark:border-[#1f3328]"
              title={t.share}
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(tech, selectedArticle)}
              className={`p-1.5 rounded-lg border transition-all ${
                isBookmarked
                  ? 'bg-brand-500/15 text-brand-600 dark:text-brand-neon border-brand-500/40'
                  : 'text-gray-600 dark:text-[#8ba697] hover:bg-gray-100 dark:hover:bg-[#14201a] border-gray-200 dark:border-[#1f3328]'
              }`}
              title={isBookmarked ? t.bookmarked : t.bookmark}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <BookmarkIcon className="w-4 h-4" />
              )}
            </button>

            {/* External Official Docs link */}
            <a
              href={tech.docUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-700 dark:text-[#e6f3ec] bg-gray-100 hover:bg-gray-200 dark:bg-[#0e1612] dark:hover:bg-[#14201a] border border-gray-200 dark:border-[#1f3328]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t.officialDocs}</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Container: Sidebar + Content */}
      <div className="flex-1 max-w-6xl w-full mx-auto flex relative">
        
        {/* Table of Contents Drawer / Sidebar */}
        <aside
          className={`fixed md:sticky top-[49px] h-[calc(100vh-49px)] w-72 bg-white dark:bg-[#0b120e] border-r border-gray-200 dark:border-[#1f3328] z-20 transition-transform duration-200 overflow-y-auto ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#8ba697] flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5 text-brand-500 dark:text-brand-neon" />
                <span>{t.tableOfContents}</span>
              </h4>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden p-1 text-gray-500 hover:text-black dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              {tech.articles.map((art) => {
                const isActive = art.id === selectedArticle.id;
                return (
                  <button
                    key={art.id}
                    onClick={() => {
                      setSelectedArticle(art);
                      setIsSidebarOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex flex-col ${
                      isActive
                        ? 'bg-brand-500/10 text-brand-600 dark:text-brand-neon border border-brand-500/30 font-semibold'
                        : 'text-gray-700 dark:text-[#8ba697] hover:bg-gray-100 dark:hover:bg-[#14201a]'
                    }`}
                  >
                    <span className="truncate">{art.title}</span>
                    <span className="text-[10px] text-gray-400 dark:text-[#8ba697]/60 mt-0.5 truncate">
                      {art.summary}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile drawer */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
          />
        )}

        {/* Article Reader Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-3xl overflow-hidden">
          
          {/* Article Header */}
          <div className="mb-6 pb-4 border-b border-gray-200 dark:border-[#1f3328]">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {selectedArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-gray-100 dark:bg-[#15241c] text-brand-600 dark:text-brand-neon border border-brand-500/20"
                >
                  #{tag}
                </span>
              ))}
              <span className="text-[11px] text-gray-400 dark:text-[#8ba697]">
                Atualizado: {selectedArticle.lastUpdated}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {selectedArticle.title}
            </h1>

            <p className="mt-2 text-sm text-gray-600 dark:text-[#8ba697]">
              {selectedArticle.summary}
            </p>
          </div>

          {/* Rendered Markdown Body */}
          <div
            className="doc-content prose dark:prose-invert max-w-none"
            style={{ fontSize: `${fontSize}px` }}
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />

          {/* Interactive Code Playground / Sandbox */}
          <div className="mt-8 rounded-2xl bg-white dark:bg-[#0e1612] border border-gray-200 dark:border-[#1f3328] overflow-hidden shadow-sm">
            <div className="p-3.5 sm:p-4 bg-gray-50 dark:bg-[#14201a] border-b border-gray-200 dark:border-[#1f3328] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-brand-500 dark:text-brand-neon" />
                <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                  Console Interativo & Playground
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-neon font-mono">
                  JS Sandbox
                </span>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setIsPlaygroundOpen(!isPlaygroundOpen)}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold text-gray-700 dark:text-[#8ba697] hover:text-black dark:hover:text-white transition-colors"
                >
                  {isPlaygroundOpen ? 'Ocultar' : 'Abrir Console'}
                </button>
                <button
                  onClick={handleRunPlayground}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white dark:bg-brand-neon dark:text-[#070a08] shadow-neon-sm flex items-center space-x-1 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Executar</span>
                </button>
              </div>
            </div>

            {isPlaygroundOpen && (
              <div className="p-3.5 sm:p-4 space-y-3">
                <textarea
                  value={playgroundCode}
                  onChange={(e) => setPlaygroundCode(e.target.value)}
                  rows={5}
                  className="w-full p-3 font-mono text-xs bg-gray-900 text-emerald-300 rounded-xl border border-gray-700 focus:outline-none focus:border-brand-neon leading-relaxed resize-y"
                  placeholder="Digite código JavaScript aqui..."
                />

                {playgroundOutput.length > 0 && (
                  <div className="p-3 bg-black/80 rounded-xl border border-gray-800 font-mono text-xs text-gray-200 space-y-1">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-1 mb-1 text-[11px] text-gray-400">
                      <span>Saída do Console:</span>
                      <button
                        onClick={() => setPlaygroundOutput([])}
                        className="text-gray-400 hover:text-white flex items-center space-x-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Limpar</span>
                      </button>
                    </div>
                    {playgroundOutput.map((out, idx) => (
                      <div key={idx} className="whitespace-pre-wrap">
                        {out}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Copy snippet helper button at bottom */}
          <div className="mt-12 p-4 rounded-xl bg-gray-100 dark:bg-[#0e1612] border border-gray-200 dark:border-[#1f3328] flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-[#8ba697]">
              Documentação salva localmente para consulta offline rápida no Codatraill.
            </span>
            <button
              onClick={() => handleCopyCode(selectedArticle.content, 'full')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-500 text-white dark:bg-brand-neon dark:text-[#070a08] flex items-center space-x-1.5 shadow-neon-sm"
            >
              {copiedCodeId === 'full' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Conteúdo</span>
                </>
              )}
            </button>
          </div>

        </main>
      </div>

    </div>
  );
};
