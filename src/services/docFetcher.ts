import { DocItem, OnlineSearchResult } from '../types';

export class DocFetcherService {
  /**
   * Global online search querying MDN Web Docs JSON API,
   * GitHub Raw Cheatsheet archives, and official doc repositories.
   */
  static async searchOnline(query: string, language: string = 'all'): Promise<OnlineSearchResult[]> {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    const results: OnlineSearchResult[] = [];

    // 1. Check for official full Markdown Cheatsheet on GitHub
    const slugMap: Record<string, string> = {
      react: 'react',
      python: 'python',
      javascript: 'es6',
      es6: 'es6',
      typescript: 'typescript',
      git: 'git',
      docker: 'docker',
      bash: 'bash',
      css: 'css',
      html: 'html',
      sql: 'sql',
      vue: 'vue',
      rust: 'rust',
      go: 'go',
      golang: 'go',
      regex: 'regex',
    };

    const matchedSlug = Object.keys(slugMap).find((k) => trimmed.includes(k));
    if (matchedSlug) {
      try {
        const rawUrl = `https://raw.githubusercontent.com/rstacruz/cheatsheets/master/${slugMap[matchedSlug]}.md`;
        const res = await fetch(rawUrl);
        if (res.ok) {
          const rawMd = await res.text();
          if (rawMd.length > 200) {
            results.push({
              title: `${matchedSlug.toUpperCase()} - Manual Oficial Completo`,
              snippet: `Guia exaustivo de referência e sintaxe completo (${Math.round(rawMd.length / 1024)} KB de documentação).`,
              url: rawUrl,
              source: 'Official Cheatsheets Archive',
              language: matchedSlug,
              content: `# Manual Completo: ${matchedSlug.toUpperCase()}\n\n> Documentação completa sincronizada em tempo real via GitHub.\n\n${rawMd.replace(/^---[\s\S]*?---/, '')}`
            });
          }
        }
      } catch {
        // network issue - continue
      }
    }

    // 2. Query MDN Web Docs API
    try {
      const mdnUrl = `https://developer.mozilla.org/api/v1/search?q=${encodeURIComponent(trimmed)}&locale=en-US`;
      const res = await fetch(mdnUrl, { headers: { 'Accept': 'application/json' } });
      if (res.ok) {
        const data = await res.json();
        if (data.documents && Array.isArray(data.documents)) {
          // Process top 4 results with deep content fetching
          for (const doc of data.documents.slice(0, 4)) {
            let fullContent = `# ${doc.title}\n\n${doc.summary || ''}\n\nLink: https://developer.mozilla.org${doc.mdn_url}\n`;

            // Fetch the full article JSON from MDN
            try {
              const fullRes = await fetch(`https://developer.mozilla.org${doc.mdn_url}/index.json`);
              if (fullRes.ok) {
                const fullData = await fullRes.json();
                if (fullData.doc && Array.isArray(fullData.doc.body)) {
                  const sections = fullData.doc.body
                    .map((section: any) => {
                      const title = section.value?.title ? `\n\n## ${section.value.title}\n` : '';
                      const content = section.value?.content
                        ? section.value.content
                            .replace(/<pre><code.*?>([\s\S]*?)<\/code><\/pre>/gi, '\n```javascript\n$1\n```\n')
                            .replace(/<code>(.*?)<\/code>/gi, '`$1`')
                            .replace(/<[^>]+>/g, '')
                        : '';
                      return `${title}${content}`;
                    })
                    .join('\n');
                  if (sections.trim().length > 100) {
                    fullContent = `# ${fullData.doc.title}\n\n${fullData.doc.summary || ''}\n${sections}`;
                  }
                }
              }
            } catch {
              // fallback to summary
            }

            results.push({
              title: doc.title || doc.mdn_url,
              snippet: doc.summary || 'Entrada oficial de documentação MDN Web Docs com exemplos e especificações completas.',
              url: `https://developer.mozilla.org${doc.mdn_url}`,
              source: 'MDN Web Docs (Oficial)',
              language: 'Web / JS / CSS / HTML',
              content: fullContent,
            });
          }
        }
      }
    } catch {
      // Offline fallback
    }

    // 3. Fallback Curated Extensive Knowledge Base
    if (results.length === 0) {
      results.push(...this.getCuratedDeepResults(trimmed));
    }

    return results;
  }

  private static getCuratedDeepResults(query: string): OnlineSearchResult[] {
    const q = query.toLowerCase();
    const curated: OnlineSearchResult[] = [
      {
        title: 'React 19 - useActionState, useOptimistic e Server Components',
        snippet: 'Documentação exaustiva das novidades do React 19: gestão de formulários com useActionState, mutações otimistas e actions assíncronas.',
        url: 'https://react.dev/reference/react/useActionState',
        source: 'React Official Docs',
        language: 'React',
        content: `# React 19: Documentação Completa

O React 19 padroniza a gestão de formulários, mutações assíncronas e renderização no servidor.

## 1. \`useActionState\`
\`\`\`tsx
import { useActionState } from 'react';

async function updateProfile(previousState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const res = await api.save(name);
  return { success: true, user: res };
}

export function Profile() {
  const [state, formAction, isPending] = useActionState(updateProfile, null);

  return (
    <form action={formAction}>
      <input name="name" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar"}
      </button>
      {state?.success && <p>Atualizado com sucesso!</p>}
    </form>
  );
}
\`\`\`

## 2. \`useOptimistic\`
Permite exibir estados previstos antes do servidor confirmar:
\`\`\`tsx
import { useOptimistic } from 'react';

function LikeButton({ likes, onLike }: any) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (current: number, update: number) => current + update
  );

  async function handleLike() {
    addOptimisticLike(1);
    await onLike();
  }

  return <button onClick={handleLike}>❤️ {optimisticLikes}</button>;
}
\`\`\`
`
      },
      {
        title: 'Rust - Manual Completo de Ownership, Borrowing e Concorrência',
        snippet: 'Tratado completo sobre alocação de memória sem GC, regras de empréstimo exclusivo mutável e multithreading seguro.',
        url: 'https://doc.rust-lang.org/book/',
        source: 'The Rust Book',
        language: 'Rust',
        content: `# Rust: Manual Completo de Memória e Concorrência

## As Três Regras de Ouro
1. Cada valor tem exatamente um dono (*owner*).
2. Quando o dono sai de escopo, a memória é liberada via \`drop\`.
3. Você pode ter infinitas referências imutáveis \`&T\` OU exatamente UMA referência mutável \`&mut T\`.

\`\`\`rust
fn main() {
    let mut buffer = Vec::new();
    preencher(&mut buffer);
    println!("Total de itens: {}", buffer.len());
}

fn preencher(b: &mut Vec<i32>) {
    b.push(10);
    b.push(20);
    b.push(30);
}
\`\`\`
`
      },
      {
        title: 'Python 3.12+ - Asyncio, Concorrência e Módulo Collections',
        snippet: 'Manual avançado de corrotinas com TaskGroups, semáforos, generators e classes especiais do módulo collections.',
        url: 'https://docs.python.org/3/',
        source: 'Python Docs',
        language: 'Python',
        content: `# Python: Concorrência e Coleções Avançadas

\`\`\`python
import asyncio
from collections import defaultdict, Counter

async def worker(id: int, queue: asyncio.Queue):
    while True:
        item = await queue.get()
        print(f"Worker {id} processando {item}")
        await asyncio.sleep(0.5)
        queue.task_done()

async def main():
    q = asyncio.Queue()
    tasks = [asyncio.create_task(worker(i, q)) for i in range(3)]
    for item in range(10):
        await q.put(item)
    await q.join()
    for t in tasks:
        t.cancel()

asyncio.run(main())
\`\`\`
`
      }
    ];

    const matched = curated.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q) ||
        item.language.toLowerCase().includes(q)
    );

    return matched.length > 0 ? matched : curated;
  }

  static createDocItemFromOnline(result: OnlineSearchResult, techId: string = 'custom'): DocItem {
    return {
      id: `online_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      techId: techId,
      title: result.title,
      slug: result.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      summary: result.snippet,
      content: result.content || `# ${result.title}\n\n${result.snippet}\n\nLink original: [${result.url}](${result.url})`,
      category: 'language',
      tags: [result.source, result.language, 'online-import'],
      version: 'Latest',
      lastUpdated: new Date().toLocaleDateString('pt-BR'),
      isCustom: true,
    };
  }
}
