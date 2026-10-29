import { Technology } from '../types';
import { javascriptDocs } from './docs/javascript';
import { pythonDocs } from './docs/python';
import { reactDocs } from './docs/react';
import { rustDocs } from './docs/rust';
import { golangDocs } from './docs/golang';
import { dockerDocs } from './docs/docker';
import { sqlDocs } from './docs/sql';

export const defaultTechnologies: Technology[] = [
  // 1. JavaScript
  {
    id: 'javascript',
    name: 'JavaScript',
    slug: 'javascript',
    icon: 'FileCode2',
    category: 'language',
    description: 'Linguagem dinâmica moderna para a web, servidores e aplicações multiplataforma.',
    website: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript',
    docUrl: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference',
    currentVersion: 'ES2024 / ECMAScript',
    color: '#F7DF1E',
    totalArticles: 6,
    articles: [
      ...javascriptDocs,
      {
        id: 'js-array-methods',
        techId: 'javascript',
        title: 'Métodos Modernos de Array (map, filter, reduce, toSorted)',
        slug: 'array-methods',
        summary: 'Guia completo dos métodos funcionais de Array e novidades imutáveis do ES2023+.',
        category: 'language',
        tags: ['array', 'functional', 'es2023', 'imutabilidade'],
        version: 'ES2024',
        lastUpdated: '2026',
        content: `# Métodos Modernos de Array no JavaScript

O JavaScript oferece métodos poderosos e imutáveis para manipulação de arrays.

## Métodos Tradicionais Essenciais

### 1. \`map()\` - Transformação
Transforma cada elemento e retorna um novo array do mesmo tamanho.
\`\`\`javascript
const precos = [10, 20, 30];
const comDesconto = precos.map(p => p * 0.9);
console.log(comDesconto); // [9, 18, 27]
\`\`\`

### 2. \`filter()\` - Filtragem
Retorna um novo array contendo apenas os itens que atendem ao predicado.
\`\`\`javascript
const idades = [12, 18, 25, 14, 30];
const adultos = idades.filter(i => i >= 18);
console.log(adultos); // [18, 25, 30]
\`\`\`

### 3. \`reduce()\` - Acumulação
Reduz o array a um único valor acumulador.
\`\`\`javascript
const carrinho = [
  { item: 'Teclado', preco: 250 },
  { item: 'Mouse', preco: 120 }
];
const total = carrinho.reduce((acc, produto) => acc + produto.preco, 0);
console.log('Total:', total); // 370
\`\`\`

## Métodos Imutáveis (ES2023+)
Diferente de \`sort()\` e \`reverse()\` que mutavam o array original, os novos métodos criam cópias seguras:

\`\`\`javascript
const numeros = [5, 2, 8, 1];

// toSorted (não altera numeros)
const ordenados = numeros.toSorted((a, b) => a - b);
console.log(ordenados); // [1, 2, 5, 8]
console.log(numeros);   // [5, 2, 8, 1] (intacto!)

// toReversed
const invertidos = numeros.toReversed();

// with (substitui item sem mutação)
const atualizado = numeros.with(1, 99); // [5, 99, 8, 1]
\`\`\`
`
      },
      {
        id: 'js-async-promises',
        techId: 'javascript',
        title: 'Assincronismo, Promises e Async/Await',
        slug: 'async-promises',
        summary: 'Como trabalhar com código assíncrono, Promise.allSettled e tratamento de erros com try/catch.',
        category: 'language',
        tags: ['async', 'promises', 'await', 'event-loop'],
        version: 'ES2024',
        lastUpdated: '2026',
        content: `# Assincronismo no JavaScript Moderno

O JavaScript executa em uma thread única com suporte a operações assíncronas não bloqueantes através do Event Loop.

## Async / Await com Tratamento de Erros

\`\`\`javascript
async function buscarDadosUsuario(id) {
  try {
    const resposta = await fetch(\`https://api.exemplo.com/users/\${id}\`);
    if (!resposta.ok) {
      throw new Error(\`Erro HTTP: \${resposta.status}\`);
    }
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error('Falha ao obter usuário:', erro.message);
    throw erro;
  }
}
\`\`\`

## Combinadores de Promises

### \`Promise.allSettled()\`
Aguarda todas as promises resolverem ou rejeitarem, sem abortar se uma falhar.
\`\`\`javascript
const promessas = [
  fetch('/api/produtos'),
  fetch('/api/categorias'),
  fetch('/api/banners')
];

const resultados = await Promise.allSettled(promessas);

resultados.forEach((res, index) => {
  if (res.status === 'fulfilled') {
    console.log(\`Promise \${index} sucesso:\`, res.value);
  } else {
    console.error(\`Promise \${index} falhou:\`, res.reason);
  }
});
\`\`\`
`
      }
    ]
  },

  // 2. TypeScript
  {
    id: 'typescript',
    name: 'TypeScript',
    slug: 'typescript',
    icon: 'Layers',
    category: 'language',
    description: 'JavaScript com tipagem estática e tooling de classe mundial da Microsoft.',
    website: 'https://www.typescriptlang.org/',
    docUrl: 'https://www.typescriptlang.org/docs/',
    currentVersion: '5.7+',
    color: '#3178C6',
    totalArticles: 4,
    articles: [
      {
        id: 'ts-utility-types',
        techId: 'typescript',
        title: 'Utility Types Essenciais (Partial, Pick, Omit, Record)',
        slug: 'utility-types',
        summary: 'Guia completo de transformação de tipos com utilitários nativos do TypeScript.',
        category: 'language',
        tags: ['types', 'utility', 'generics'],
        version: '5.x',
        lastUpdated: '2026',
        content: `# Utility Types Essenciais no TypeScript

Os Utility Types permitem criar novos tipos a partir de interfaces e tipos existentes.

## 1. \`Partial<T>\`
Torna todas as propriedades de \`T\` opcionais.
\`\`\`typescript
interface Usuario {
  id: string;
  nome: string;
  email: string;
}

// Útil para updates parciais
function atualizarUsuario(id: string, campos: Partial<Usuario>) {
  // campos pode ter apenas { nome: "Novo Nome" }
}
\`\`\`

## 2. \`Pick<T, K>\` & \`Omit<T, K>\`
Seleciona ou exclui chaves específicas.
\`\`\`typescript
// Pick: escolhe apenas nome e email
type ResumoUsuario = Pick<Usuario, 'nome' | 'email'>;

// Omit: pega tudo EXCETO o id
type CriarUsuarioDTO = Omit<Usuario, 'id'>;
\`\`\`

## 3. \`Record<K, T>\`
Constrói um tipo de objeto com chaves \`K\` e valores \`T\`.
\`\`\`typescript
type Roles = 'admin' | 'editor' | 'viewer';

interface Permissoes {
  canRead: boolean;
  canWrite: boolean;
}

const permissoesPorRole: Record<Roles, Permissoes> = {
  admin: { canRead: true, canWrite: true },
  editor: { canRead: true, canWrite: true },
  viewer: { canRead: true, canWrite: false }
};
\`\`\`
`
      },
      {
        id: 'ts-generics',
        techId: 'typescript',
        title: 'Generics Avançados e Type Narrowing',
        slug: 'generics-narrowing',
        summary: 'Crie componentes e funções reutilizáveis com restrições genéricas e inferência precisa.',
        category: 'language',
        tags: ['generics', 'narrowing', 'types'],
        version: '5.x',
        lastUpdated: '2026',
        content: `# Generics no TypeScript

Generics permitem parametrizar tipos da mesma forma que parâmetros de função parametrizam valores.

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  timestamp: number;
}

async function apiFetch<T>(endpoint: string): Promise<ApiResponse<T>> {
  const res = await fetch(endpoint);
  const data = await res.json();
  return {
    data,
    status: res.status,
    timestamp: Date.now()
  };
}

// Uso tipado:
interface Produto {
  id: number;
  titulo: string;
}

const resposta = await apiFetch<Produto[]>('/api/produtos');
console.log(resposta.data[0].titulo); // Autocomplete completo!
\`\`\`
`
      }
    ]
  },

  // 3. React
  {
    id: 'react',
    name: 'React',
    slug: 'react',
    icon: 'Code',
    category: 'frontend',
    description: 'A biblioteca para interfaces web e nativas declarativas e baseadas em componentes.',
    website: 'https://react.dev/',
    docUrl: 'https://react.dev/reference/react',
    currentVersion: '19.0',
    color: '#61DAFB',
    totalArticles: 6,
    articles: [
      ...reactDocs,
      {
        id: 'react-hooks-reference',
        techId: 'react',
        title: 'Guia Completo de React Hooks (useState, useEffect, useMemo, useRef)',
        slug: 'react-hooks-reference',
        summary: 'Visão geral e boas práticas dos hooks fundamentais do React.',
        category: 'frontend',
        tags: ['hooks', 'state', 'effects', 'memo'],
        version: 'React 19',
        lastUpdated: '2026',
        content: `# Guia de Referência de React Hooks

Hooks permitem usar estado e outros recursos do React sem escrever classes.

## 1. \`useState\`
\`\`\`tsx
import { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState<number>(0);

  return (
    <button onClick={() => setContador(prev => prev + 1)}>
      Cliques: {contador}
    </button>
  );
}
\`\`\`

## 2. \`useEffect\`
Sincroniza o componente com um sistema externo (APIs, timers, DOM).
\`\`\`tsx
import { useEffect, useState } from 'react';

function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Função de limpeza (cleanup)
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []); // Array vazio = executa apenas na montagem

  return <span>Status: {isOnline ? '🟢 Online' : '🔴 Offline'}</span>;
}
\`\`\`

## 3. \`useMemo\` & \`useCallback\`
- \`useMemo\`: Memoiza o resultado de um cálculo pesado.
- \`useCallback\`: Memoiza a definição de uma função entre renders.
`
      },
      {
        id: 'react-custom-hooks',
        techId: 'react',
        title: 'Criando Custom Hooks Reutilizáveis',
        slug: 'custom-hooks',
        summary: 'Extraia lógica de estado para funções independentes e testáveis.',
        category: 'frontend',
        tags: ['custom-hooks', 'reusabilidade', 'arquitetura'],
        version: 'React 19',
        lastUpdated: '2026',
        content: `# Custom Hooks no React

Um Custom Hook é uma função JavaScript cujo nome começa com \`use\` e que pode chamar outros Hooks.

### Exemplo: Hook \`useLocalStorage\`
\`\`\`tsx
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
\`\`\`
`
      }
    ]
  },

  // 4. Python
  {
    id: 'python',
    name: 'Python',
    slug: 'python',
    icon: 'Terminal',
    category: 'language',
    description: 'Linguagem elegante, concisa e de uso geral para backend, IA, automação e ciência de dados.',
    website: 'https://www.python.org/',
    docUrl: 'https://docs.python.org/3/',
    currentVersion: '3.12+',
    color: '#3776AB',
    totalArticles: 7,
    articles: [
      ...pythonDocs,
      {
        id: 'python-core-syntax',
        techId: 'python',
        title: 'Sintaxe Essencial, List Comprehensions & Dicionários',
        slug: 'python-core-syntax',
        summary: 'Estruturas de dados nativas, unpacking e idioms idiomáticos do Python moderno.',
        category: 'language',
        tags: ['syntax', 'collections', 'pythonic'],
        version: '3.12',
        lastUpdated: '2026',
        content: `# Sintaxe Essencial e Coleções em Python

## List & Dict Comprehensions
\`\`\`python
# Lista de números pares ao quadrado
pares_quadrados = [x**2 for x in range(10) if x % 2 == 0]
# [0, 4, 16, 36, 64]

# Compreensão de Dicionário
produtos = [('teclado', 200), ('mouse', 100)]
tabela_precos = {item: preco for item, preco in produtos}
\`\`\`

## Manipulação Segura de Arquivos com Context Manager (\`with\`)
\`\`\`python
with open('dados.txt', 'r', encoding='utf-8') as f:
    linhas = f.readlines()
# Arquivo fechado automaticamente!
\`\`\`
`
      },
      {
        id: 'python-oop-dataclasses',
        techId: 'python',
        title: 'Dataclasses, Type Hints e Orientação a Objetos',
        slug: 'python-dataclasses',
        summary: 'Como criar modelos estruturados e concisos com @dataclass no Python moderno.',
        category: 'language',
        tags: ['oop', 'dataclasses', 'typehints'],
        version: '3.12',
        lastUpdated: '2026',
        content: `# Dataclasses no Python

As \`dataclasses\` eliminam o boilerplate manual de \`__init__\`, \`__repr__\` e \`__eq__\`.

\`\`\`python
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class Documento:
    id: str
    titulo: string
    tags: list[str] = field(default_factory=list)
    criado_em: datetime = field(default_factory=datetime.now)

    def resumo(self) -> str:
        return f"{self.titulo} ({len(self.tags)} tags)"

doc = Documento(id="1", titulo="Codatraill Guia", tags=["python", "docs"])
print(doc.resumo())
\`\`\`
`
      }
    ]
  },

  // 5. Rust
  {
    id: 'rust',
    name: 'Rust',
    slug: 'rust',
    icon: 'Cpu',
    category: 'language',
    description: 'Linguagem de sistemas ultra-rápida com segurança de memória garantida em tempo de compilação.',
    website: 'https://www.rust-lang.org/',
    docUrl: 'https://doc.rust-lang.org/book/',
    currentVersion: '1.80+',
    color: '#DEA584',
    totalArticles: 5,
    articles: [
      ...rustDocs,
      {
        id: 'rust-ownership',
        techId: 'rust',
        title: 'Ownership, Borrowing e Regras do Compilador',
        slug: 'rust-ownership',
        summary: 'Entenda os princípios de posse, referências imutáveis e mutáveis sem garbage collector.',
        category: 'language',
        tags: ['ownership', 'borrowing', 'memory'],
        version: '1.80+',
        lastUpdated: '2026',
        content: `# Ownership e Borrowing no Rust

O Rust garante memória segura sem garbage collector através das regras de ownership.

\`\`\`rust
fn main() {
    let mut texto = String::from("Codatraill");
    
    // Empréstimo mutável exclusivo:
    adicionar_sufixo(&mut texto);
    
    println!("{}", texto); // Codatraill - Hub
}

fn adicionar_sufixo(s: &mut String) {
    s.push_str(" - Hub");
}
\`\`\`
`
      }
    ]
  },

  // 6. Go (Golang)
  {
    id: 'golang',
    name: 'Go',
    slug: 'golang',
    icon: 'Terminal',
    category: 'backend',
    description: 'Linguagem simples, eficiente e focada em microsserviços e computação distribuída da Google.',
    website: 'https://go.dev/',
    docUrl: 'https://go.dev/doc/',
    currentVersion: '1.23+',
    color: '#00ADD8',
    totalArticles: 4,
    articles: [
      ...golangDocs,
      {
        id: 'go-concurrency',
        techId: 'golang',
        title: 'Goroutines, Canais e Tratamento de Erros',
        slug: 'go-concurrency',
        summary: 'Concorrência com goroutines leves e canais de sincronização.',
        category: 'backend',
        tags: ['concurrency', 'goroutines', 'channels'],
        version: '1.23',
        lastUpdated: '2026',
        content: `# Concorrência com Go

Go utiliza canais e goroutines para comunicação segura entre tarefas concorrentes.

\`\`\`go
package main

import (
    "fmt"
    "time"
)

func processar(canal chan string) {
    time.Sleep(time.Millisecond * 200)
    canal <- "Dados sincronizados com sucesso!"
}

func main() {
    c := make(chan string)
    go processar(c)

    mensagem := <-c
    fmt.Println(mensagem)
}
\`\`\`
`
      }
    ]
  },

  // 7. Tailwind CSS
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    slug: 'tailwindcss',
    icon: 'Sparkles',
    category: 'frontend',
    description: 'Framework CSS utility-first moderno para criação rápida e flexível de designs responsivos.',
    website: 'https://tailwindcss.com/',
    docUrl: 'https://tailwindcss.com/docs',
    currentVersion: '3.4 / 4.0',
    color: '#38BDF8',
    totalArticles: 3,
    articles: [
      {
        id: 'tailwind-cheatsheet',
        techId: 'tailwindcss',
        title: 'Guia de Utilitários de Flexbox, Grid e Responsividade',
        slug: 'tailwind-cheatsheet',
        summary: 'Classes essenciais para layouts mobile-first, dark mode e alinhamento.',
        category: 'frontend',
        tags: ['css', 'flexbox', 'grid', 'responsive'],
        version: 'v3.4+',
        lastUpdated: '2026',
        content: `# Tailwind CSS - Guia Rápido de Utilitários

## Mobile-First Breakpoints
- \`sm:\` >= 640px
- \`md:\` >= 768px
- \`lg:\` >= 1024px
- \`xl:\` >= 1280px

## Flexbox & Grid
\`\`\`html
<!-- Container centralizado com Flexbox -->
<div class="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
  <span class="text-emerald-400 font-bold">Codatraill</span>
  <button class="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 rounded">
    Docs
  </button>
</div>

<!-- Grid responsivo -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  <div class="p-4 border border-zinc-800 rounded">Card 1</div>
  <div class="p-4 border border-zinc-800 rounded">Card 2</div>
  <div class="p-4 border border-zinc-800 rounded">Card 3</div>
</div>
\`\`\`
`
      }
    ]
  },

  // 8. Docker
  {
    id: 'docker',
    name: 'Docker',
    slug: 'docker',
    icon: 'Layers',
    category: 'devops',
    description: 'Plataforma líder para containerização de aplicações, garantindo paridade de ambientes.',
    website: 'https://www.docker.com/',
    docUrl: 'https://docs.docker.com/',
    currentVersion: '26.x',
    color: '#2496ED',
    totalArticles: 4,
    articles: [
      ...dockerDocs,
      {
        id: 'docker-commands',
        techId: 'docker',
        title: 'Comandos CLI Essenciais e Docker Compose',
        slug: 'docker-commands',
        summary: 'Guia de bolso para construir, executar, inspecionar e gerenciar containers.',
        category: 'devops',
        tags: ['containers', 'compose', 'cli'],
        version: 'Latest',
        lastUpdated: '2026',
        content: `# Docker - Guia Prático de Comandos

## Comandos Mais Usados
\`\`\`bash
# Listar containers ativos
docker ps

# Listar todos os containers (incluindo parados)
docker ps -a

# Construir imagem a partir de Dockerfile
docker build -t meu-app:1.0 .

# Executar container em background com mapeamento de porta
docker run -d -p 3000:3000 --name meu-servico meu-app:1.0

# Ver logs em tempo real
docker logs -f meu-servico

# Acessar terminal interativo dentro do container
docker exec -it meu-servico sh
\`\`\`
`
      }
    ]
  },

  // 9. SQL / PostgreSQL
  {
    id: 'sql',
    name: 'SQL / PostgreSQL',
    slug: 'sql',
    icon: 'Database',
    category: 'database',
    description: 'Banco de dados relacional e consultas estruturadas padrão para integridade de dados.',
    website: 'https://www.postgresql.org/',
    docUrl: 'https://www.postgresql.org/docs/',
    currentVersion: '16+',
    color: '#336791',
    totalArticles: 4,
    articles: [
      ...sqlDocs,
      {
        id: 'sql-joins-indexes',
        techId: 'sql',
        title: 'Joins, Agrupamento e Índices de Performance',
        slug: 'sql-joins-indexes',
        summary: 'Consultas eficientes com INNER, LEFT, RIGHT JOIN, GROUP BY e EXPLAIN ANALYZE.',
        category: 'database',
        tags: ['sql', 'postgres', 'joins', 'indexes'],
        version: 'SQL Standard',
        lastUpdated: '2026',
        content: `# Guia de Consultas SQL e Relacionamentos

\`\`\`sql
-- INNER JOIN com agregação
SELECT 
    c.id AS categoria_id,
    c.nome AS categoria,
    COUNT(p.id) AS total_produtos,
    AVG(p.preco) AS preco_medio
FROM categorias c
LEFT JOIN produtos p ON c.id = p.categoria_id
GROUP BY c.id, c.nome
HAVING COUNT(p.id) > 0
ORDER BY total_produtos DESC;
\`\`\`
`
      }
    ]
  },

  // 10. Flutter & Dart
  {
    id: 'flutter',
    name: 'Flutter & Dart',
    slug: 'flutter',
    icon: 'Smartphone',
    category: 'mobile',
    description: 'Framework UI da Google para compilar apps nativos para iOS, Android, Web e Desktop.',
    website: 'https://flutter.dev/',
    docUrl: 'https://docs.flutter.dev/',
    currentVersion: '3.24+',
    color: '#02569B',
    totalArticles: 3,
    articles: [
      {
        id: 'flutter-widgets',
        techId: 'flutter',
        title: 'Árvore de Widgets, StatelessWidget e StatefulWidget',
        slug: 'flutter-widgets',
        summary: 'Composição de layouts móveis declarativos no Flutter.',
        category: 'mobile',
        tags: ['mobile', 'widgets', 'dart'],
        version: 'Flutter 3.x',
        lastUpdated: '2026',
        content: `# Flutter: Fundamentos de Widgets

No Flutter, quase tudo é um Widget:
\`\`\`dart
import 'package:flutter/material.dart';

class MeuCard extends StatelessWidget {
  final String titulo;
  const MeuCard({super.key, required this.titulo});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: const Color(0xFF0D1410),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFF1F3328)),
      ),
      child: Text(
        titulo,
        style: const TextStyle(color: Color(0xFF00FF88), fontWeight: FontWeight.bold),
      ),
    );
  }
}
\`\`\`
`
      }
    ]
  },

  // 11. Next.js
  {
    id: 'nextjs',
    name: 'Next.js',
    slug: 'nextjs',
    icon: 'Layers',
    category: 'frontend',
    description: 'Framework React full-stack líder com App Router, Server Components e Server Actions.',
    website: 'https://nextjs.org/',
    docUrl: 'https://nextjs.org/docs',
    currentVersion: '15.x',
    color: '#000000',
    totalArticles: 2,
    articles: [
      {
        id: 'nextjs-server-actions',
        techId: 'nextjs',
        title: 'Server Actions e Mutações de Dados',
        slug: 'nextjs-server-actions',
        summary: 'Execute funções assíncronas no servidor diretamente a partir de formulários ou botões.',
        category: 'frontend',
        tags: ['nextjs', 'server-actions', 'react'],
        version: '15.x',
        lastUpdated: '2026',
        content: `# Next.js: Server Actions

Server Actions permitem executar código no servidor a partir de componentes de cliente ou servidor sem criar rotas de API manuais.

\`\`\`tsx
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache';

export async function criarProjeto(formData: FormData) {
  const titulo = formData.get('titulo') as string;
  
  // Salva no banco de dados com segurança
  await db.projeto.create({ data: { titulo } });
  
  // Revalida a página para atualizar o cache
  revalidatePath('/projetos');
}
\`\`\`
`
      }
    ]
  },

  // 12. Node.js
  {
    id: 'nodejs',
    name: 'Node.js',
    slug: 'nodejs',
    icon: 'Server',
    category: 'backend',
    description: 'Ambiente de execução JavaScript construído no motor V8 para criação de servidores de alta concorrência.',
    website: 'https://nodejs.org/',
    docUrl: 'https://nodejs.org/docs/latest/api/',
    currentVersion: '22 LTS / 24',
    color: '#339933',
    totalArticles: 2,
    articles: [
      {
        id: 'node-fs-promises',
        techId: 'nodejs',
        title: 'Módulo fs/promises e Manipulação de Arquivos',
        slug: 'node-fs-promises',
        summary: 'Operações modernas de I/O de arquivos assíncronas com async/await.',
        category: 'backend',
        tags: ['node', 'fs', 'io', 'promises'],
        version: 'v22+',
        lastUpdated: '2026',
        content: `# Node.js: Manipulação Assíncrona de Arquivos

Utilize \`node:fs/promises\` para operações de disco limpas e assíncronas:

\`\`\`javascript
import { readFile, writeFile } from 'node:fs/promises';

async function salvarConfiguracoes(caminho, config) {
  try {
    const conteudo = JSON.stringify(config, null, 2);
    await writeFile(caminho, conteudo, 'utf-8');
    console.log('Configurações salvas!');
  } catch (err) {
    console.error('Erro de I/O:', err.message);
  }
}
\`\`\`
`
      }
    ]
  },

  // 13. Vue.js
  {
    id: 'vuejs',
    name: 'Vue.js',
    slug: 'vuejs',
    icon: 'Layout',
    category: 'frontend',
    description: 'Framework progressivo intuitivo com reatividade granular e Composition API.',
    website: 'https://vuejs.org/',
    docUrl: 'https://vuejs.org/guide/introduction.html',
    currentVersion: '3.5+',
    color: '#4FC08D',
    totalArticles: 2,
    articles: [
      {
        id: 'vue-composition-api',
        techId: 'vuejs',
        title: 'Composition API, ref, reactive e computed',
        slug: 'vue-composition-api',
        summary: 'Lógica componível e reatividade moderna com <script setup>.',
        category: 'frontend',
        tags: ['vue', 'composition-api', 'reactivity'],
        version: '3.5+',
        lastUpdated: '2026',
        content: `# Vue 3: Composition API com \`<script setup>\`

\`\`\`vue
<script setup>
import { ref, computed } from 'vue';

const termo = ref('');
const itens = ref(['JavaScript', 'TypeScript', 'Rust', 'Go']);

const filtrados = computed(() => {
  return itens.value.filter(item => 
    item.toLowerCase().includes(termo.value.toLowerCase())
  );
});
</script>

<template>
  <div class="p-4">
    <input v-model="termo" placeholder="Filtrar linguagens..." />
    <ul>
      <li v-for="lang in filtrados" :key="lang">{{ lang }}</li>
    </ul>
  </div>
</template>
\`\`\`
`
      }
    ]
  },

  // 14. Java
  {
    id: 'java',
    name: 'Java',
    slug: 'java',
    icon: 'Terminal',
    category: 'backend',
    description: 'Linguagem robusta para sistemas empresariais com Records, Virtual Threads e Spring Boot.',
    website: 'https://dev.java/',
    docUrl: 'https://docs.oracle.com/en/java/javase/21/',
    currentVersion: 'Java 21 LTS',
    color: '#ED8B00',
    totalArticles: 2,
    articles: [
      {
        id: 'java-records-streams',
        techId: 'java',
        title: 'Records Imutáveis e Stream API Moderna',
        slug: 'java-records-streams',
        summary: 'Modelagem concisa com Records e transformações de coleções com Streams.',
        category: 'backend',
        tags: ['java', 'records', 'streams', 'lts'],
        version: 'Java 21',
        lastUpdated: '2026',
        content: `# Java Moderno: Records e Stream API

## Records (Imutabilidade Elegante)
\`\`\`java
public record Documento(String id, String titulo, String linguagem) {
    public Documento {
        if (titulo == null || titulo.isBlank()) {
            throw new IllegalArgumentException("Título obrigatório!");
        }
    }
}
\`\`\`

## Stream API com Filtros e Coleta
\`\`\`java
List<Documento> docs = List.of(
    new Documento("1", "Guia Rust", "Rust"),
    new Documento("2", "Guia React", "JavaScript")
);

List<String> titulosRust = docs.stream()
    .filter(d -> "Rust".equals(d.linguagem()))
    .map(Documento::titulo)
    .toList();
\`\`\`
`
      }
    ]
  },

  // 15. C++
  {
    id: 'cpp',
    name: 'C++',
    slug: 'cpp',
    icon: 'Cpu',
    category: 'language',
    description: 'Linguagem de altíssima performance para jogos, sistemas operacionais e computação intensiva.',
    website: 'https://isocpp.org/',
    docUrl: 'https://en.cppreference.com/w/',
    currentVersion: 'C++20 / C++23',
    color: '#00599C',
    totalArticles: 2,
    articles: [
      {
        id: 'cpp-smart-pointers',
        techId: 'cpp',
        title: 'Smart Pointers e STL Vectors',
        slug: 'cpp-smart-pointers',
        summary: 'Gerenciamento seguro de memória com std::unique_ptr e std::shared_ptr.',
        category: 'language',
        tags: ['cpp', 'pointers', 'stl', 'memory'],
        version: 'C++20',
        lastUpdated: '2026',
        content: `# C++ Moderno: Smart Pointers (RAII)

Evite vazamentos de memória (\`memory leaks\`) usando ponteiros inteligentes:

\`\`\`cpp
#include <iostream>
#include <memory>
#include <vector>

struct Item {
    std::string nome;
    Item(std::string n) : nome(std::move(n)) {}
};

int main() {
    // std::unique_ptr desaloca a memória automaticamente ao sair de escopo!
    auto item = std::make_unique<Item>("Codatraill Docs");
    std::cout << "Item: " << item->nome << std::endl;

    std::vector<int> numeros = {10, 20, 30};
    numeros.push_back(40);

    for (const auto& n : numeros) {
        std::cout << n << " ";
    }
    return 0;
}
\`\`\`
`
      }
    ]
  },

  // 16. C# (.NET)
  {
    id: 'csharp',
    name: 'C# / .NET',
    slug: 'csharp',
    icon: 'Terminal',
    category: 'backend',
    description: 'Linguagem elegante da Microsoft para backend, cloud, games com Unity e apps desktop.',
    website: 'https://dotnet.microsoft.com/',
    docUrl: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
    currentVersion: '.NET 8 / 9',
    color: '#512BD4',
    totalArticles: 2,
    articles: [
      {
        id: 'csharp-linq',
        techId: 'csharp',
        title: 'LINQ e Expressões de Coleção no C# Moderno',
        slug: 'csharp-linq',
        summary: 'Consultas fluentes em coleções com Where, Select, OrderBy e novos literais [].',
        category: 'backend',
        tags: ['csharp', 'dotnet', 'linq'],
        version: 'C# 12 / .NET 8',
        lastUpdated: '2026',
        content: `# C# Moderno: LINQ e Coleções

\`\`\`csharp
using System;
using System.Linq;

record Linguagem(string Nome, string Categoria);

int[] numeros = [1, 2, 3, 4, 5]; // Sintaxe moderna de coleção

var langs = new List<Linguagem>
{
    new("C#", "Backend"),
    new("React", "Frontend"),
    new("Go", "Backend")
};

// Consulta LINQ fluente
var backends = langs
    .Where(l => l.Categoria == "Backend")
    .OrderBy(l => l.Nome)
    .Select(l => l.Nome);

foreach (var nome in backends)
{
    Console.WriteLine($"Backend: {nome}");
}
\`\`\`
`
      }
    ]
  },

  // 17. Kotlin
  {
    id: 'kotlin',
    name: 'Kotlin',
    slug: 'kotlin',
    icon: 'Smartphone',
    category: 'mobile',
    description: 'Linguagem moderna e concisa oficial para desenvolvimento Android e multiplataforma (KMP).',
    website: 'https://kotlinlang.org/',
    docUrl: 'https://kotlinlang.org/docs/home.html',
    currentVersion: '2.0+',
    color: '#7F52FF',
    totalArticles: 2,
    articles: [
      {
        id: 'kotlin-null-safety',
        techId: 'kotlin',
        title: 'Null Safety e Funções de Extensão',
        slug: 'kotlin-null-safety',
        summary: 'Elimine NullPointerExceptions em tempo de compilação.',
        category: 'mobile',
        tags: ['kotlin', 'android', 'null-safety'],
        version: '2.0',
        lastUpdated: '2026',
        content: `# Kotlin: Null Safety e Extensões

\`\`\`kotlin
fun main() {
    var texto: String? = null // Pode ser nulo
    
    // Chamada segura (?.) e operador Elvis (?:)
    val tamanho = texto?.length ?: 0
    println("Tamanho: $tamanho")

    // Extension Function:
    val titulo = "codatraill".paraCapitalizado()
    println(titulo) // Codatraill
}

fun String.paraCapitalizado(): String = 
    this.replaceFirstChar { if (it.isLowerCase()) it.titlecase() else it.toString() }
\`\`\`
`
      }
    ]
  },

  // 18. Git
  {
    id: 'git',
    name: 'Git',
    slug: 'git',
    icon: 'Layers',
    category: 'devops',
    description: 'O sistema de controle de versão distribuído padrão de toda a indústria de software.',
    website: 'https://git-scm.com/',
    docUrl: 'https://git-scm.com/doc',
    currentVersion: '2.45+',
    color: '#F05032',
    totalArticles: 2,
    articles: [
      {
        id: 'git-daily-commands',
        techId: 'git',
        title: 'Fluxo Diário: Branching, Stash e Rebase',
        slug: 'git-daily-commands',
        summary: 'Comandos essenciais para produtividade, stash de alterações e rebase interativo.',
        category: 'devops',
        tags: ['git', 'version-control', 'cli'],
        version: 'Latest',
        lastUpdated: '2026',
        content: `# Git: Guia de Comandos Diários

## Criação e Troca de Branches
\`\`\`bash
# Criar e mudar para nova branch
git switch -c feature/nova-documentacao

# Guardar alterações temporárias (Stash)
git stash save "Trabalho em progresso"
git stash pop # Recupera

# Rebase limpo na branch principal
git fetch origin
git rebase origin/main
\`\`\`
`
      }
    ]
  }
];
