import { DocItem } from '../../types';

export const javascriptDocs: DocItem[] = [
  {
    id: 'js-arrays-complete',
    techId: 'javascript',
    title: 'Referência Definitiva de Arrays: 35+ Métodos e ES2023/2024',
    slug: 'arrays-complete',
    summary: 'Guia exaustivo de manipulação de arrays: transformações, buscas, ordenação imutável e boas práticas de performance.',
    category: 'language',
    tags: ['array', 'es2024', 'functional', 'performance'],
    version: 'ES2024',
    lastUpdated: '2026',
    content: `# Referência Definitiva de Arrays no JavaScript Moderno

Arrays no JavaScript são estruturas de dados indexadas de alta performance que implementam tanto métodos mutáveis quanto imutáveis.

---

## 1. Métodos Imutáveis Modernos (ES2023 / ES2024)

Os métodos clássicos \`sort()\`, \`reverse()\` e \`splice()\` alteram o array original. O ES2023 introduziu variantes puras que retornam uma nova cópia:

### \`toSorted(compareFn)\`
Ordena os elementos sem mutar o array original.
\`\`\`javascript
const precos = [120, 45, 890, 15, 300];
const ordenados = precos.toSorted((a, b) => a - b);

console.log(ordenados); // [15, 45, 120, 300, 890]
console.log(precos);    // [120, 45, 890, 15, 300] (inalterado!)
\`\`\`

### \`toReversed()\`
Inverte a ordem dos itens sem afetar o array original.
\`\`\`javascript
const fila = ['Cliente A', 'Cliente B', 'Cliente C'];
const invertida = fila.toReversed();

console.log(invertida); // ['Cliente C', 'Cliente B', 'Cliente A']
console.log(fila);      // ['Cliente A', 'Cliente B', 'Cliente C']
\`\`\`

### \`toSpliced(start, deleteCount, ...items)\`
Remove ou substitui elementos de forma imutável.
\`\`\`javascript
const linguagens = ['JS', 'PHP', 'Ruby', 'Go'];
const atualizadas = linguagens.toSpliced(1, 2, 'TypeScript', 'Rust');

console.log(atualizadas); // ['JS', 'TypeScript', 'Rust', 'Go']
console.log(linguagens);  // ['JS', 'PHP', 'Ruby', 'Go']
\`\`\`

### \`with(index, value)\`
Substitui um único elemento em um índice específico sem clonagem manual.
\`\`\`javascript
const status = ['pendente', 'pendente', 'pendente'];
const aprovado = status.with(1, 'aprovado');

console.log(aprovado); // ['pendente', 'aprovado', 'pendente']
\`\`\`

---

## 2. Iteração e Transformação Funcional

### \`map(callback(item, index, array))\`
Aplica uma transformação em cada item e retorna um novo array de mesmo tamanho.
\`\`\`javascript
const produtos = [
  { nome: 'Notebook', valor: 4500 },
  { nome: 'Monitor', valor: 1200 }
];

const comImposto = produtos.map(p => ({
  ...p,
  valorFinal: p.valor * 1.15
}));
\`\`\`

### \`filter(predicate)\`
Cria um novo array apenas com itens que retornam \`true\` para a função de teste.
\`\`\`javascript
const usuarios = [
  { id: 1, ativo: true },
  { id: 2, ativo: false },
  { id: 3, ativo: true }
];

const ativos = usuarios.filter(u => u.ativo);
\`\`\`

### \`reduce(accumulator, current, index, array)\`
Acumula todos os valores em uma única saída (objeto, número, mapa ou outro array).
\`\`\`javascript
const vendas = [
  { categoria: 'Hardware', total: 500 },
  { categoria: 'Software', total: 200 },
  { categoria: 'Hardware', total: 300 }
];

const totaisPorCategoria = vendas.reduce((acc, venda) => {
  acc[venda.categoria] = (acc[venda.categoria] || 0) + venda.total;
  return acc;
}, {});

console.log(totaisPorCategoria); // { Hardware: 800, Software: 200 }
\`\`\`

### \`flatMap(callback)\`
Equivalente a rodar um \`map()\` seguido de um \`flat(1)\`, ideal para achatamento de listas aninhadas.
\`\`\`javascript
const frases = ['Codatraill documentação', 'centralizada e offline'];
const palavras = frases.flatMap(f => f.split(' '));
console.log(palavras); // ['Codatraill', 'documentação', 'centralizada', 'e', 'offline']
\`\`\`

---

## 3. Busca e Validação

| Método | Retorno | Descrição |
| :--- | :--- | :--- |
| \`find(fn)\` | Elemento ou \`undefined\` | Retorna o primeiro elemento que satisfaz a condição |
| \`findLast(fn)\` | Elemento ou \`undefined\` | Busca do final para o início (ES2023) |
| \`findIndex(fn)\` | Índice (\`number\`) ou \`-1\` | Índice do primeiro elemento coincidente |
| \`findLastIndex(fn)\` | Índice (\`number\`) ou \`-1\` | Índice do último elemento coincidente (ES2023) |
| \`includes(val)\` | \`boolean\` | Verifica presença por igualdade estrita (\`SameValueZero\`) |
| \`some(fn)\` | \`boolean\` | Retorna \`true\` se ao menos UM elemento cumprir a condição |
| \`every(fn)\` | \`boolean\` | Retorna \`true\` se TODOS os elementos cumprirem a condição |
`
  },
  {
    id: 'js-async-deep-dive',
    techId: 'javascript',
    title: 'Assincronismo Profundo: Event Loop, Microtasks e Concorrência',
    slug: 'async-deep-dive',
    summary: 'Compreenda a mecânica interna do Event Loop do V8, Call Stack, Microtask Queue vs Macrotask Queue e controle de concorrência com AbortController.',
    category: 'language',
    tags: ['async', 'event-loop', 'microtasks', 'promises'],
    version: 'ES2024',
    lastUpdated: '2026',
    content: `# Assincronismo Profundo no JavaScript

O JavaScript opera em uma **Single Thread** com concorrência orientada a eventos (*Event Loop*).

---

## 1. A Arquitetura do Runtime (V8)

1. **Call Stack**: Pilha de execução síncrona LIFO (Last-In, First-Out).
2. **Web APIs / Node APIs**: Onde tarefas assíncronas (Timers, Fetch, I/O) são executadas em segundo plano pela plataforma subjacente.
3. **Microtask Queue**: Fila de altíssima prioridade contendo callbacks de \`Promise\`, \`queueMicrotask\` e \`MutationObserver\`. É esvaziada completamente antes de qualquer Macrotask!
4. **Macrotask Queue (Task Queue)**: Fila para \`setTimeout\`, \`setInterval\`, \`setImmediate\` e eventos de I/O.

\`\`\`javascript
console.log('1. Síncrono');

setTimeout(() => {
  console.log('4. Macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('2. Microtask (Promise)');
});

queueMicrotask(() => {
  console.log('3. Microtask (queueMicrotask)');
});

// Ordem de Saída:
// 1. Síncrono
// 2. Microtask (Promise)
// 3. Microtask (queueMicrotask)
// 4. Macrotask (setTimeout)
\`\`\`

---

## 2. Combinadores de Promises

### Comparativo dos 4 Métodos de Combinação:

\`\`\`javascript
const p1 = fetch('/api/user');
const p2 = fetch('/api/settings');
const p3 = fetch('/api/notifications');
\`\`\`

### \`Promise.allSettled([p1, p2, p3])\`
- **Comportamento**: Nunca falha por rejeição precoce. Aguarda todos os resultados.
- **Ideal para**: Operações independentes onde o fracasso de uma não invalida as outras.

\`\`\`javascript
const resultados = await Promise.allSettled([p1, p2, p3]);

resultados.forEach((res, i) => {
  if (res.status === 'fulfilled') {
    console.log(\`Sucesso no serviço \${i}:\`, res.value);
  } else {
    console.warn(\`Falha no serviço \${i}:\`, res.reason);
  }
});
\`\`\`

### \`Promise.all([p1, p2, p3])\`
- Falha imediatamente se qualquer uma das promises for rejeitada (*fail-fast*).

### \`Promise.race([p1, p2, p3])\`
- Retorna o resultado da primeira que resolver OU rejeitar.

### \`Promise.any([p1, p2, p3])\`
- Retorna a primeira que resolver com SUCESSO. Se todas falharem, lança um \`AggregateError\`.

---

## 3. Cancelamento Seguro com \`AbortController\`

O \`AbortController\` é a API padrão para abortar requisições de rede, timers e tarefas pesadas:

\`\`\`javascript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout de 5s

try {
  const resposta = await fetch('https://api.exemplo.com/dados', {
    signal: controller.signal
  });
  const json = await resposta.json();
  console.log(json);
} catch (erro) {
  if (erro.name === 'AbortError') {
    console.error('Requisição cancelada por timeout de 5 segundos!');
  } else {
    console.error('Erro de conexão:', erro);
  }
} finally {
  clearTimeout(timeoutId);
}
\`\`\`
`
  },
  {
    id: 'js-objects-classes',
    techId: 'javascript',
    title: 'Objetos, Protótipos, Classes Modernas e Desestruturação',
    slug: 'objects-classes',
    summary: 'Campos privados (#), métodos estáticos, herança prototípica, getters/setters e desestruturação avançada.',
    category: 'language',
    tags: ['oop', 'classes', 'prototypes', 'es2022'],
    version: 'ES2024',
    lastUpdated: '2026',
    content: `# Objetos e Classes Modernas no JavaScript

O JavaScript implementa Orientação a Objetos baseada em protótipos, complementada pela sintaxe de classes introduzida no ES6 e aprimorada com campos privados reais no ES2022.

---

## 1. Campos e Métodos Privados Reais (\`#\`)

Diferente de TypeScript que valida privacidade apenas em tempo de compilação, o prefixo \`#\` impõe privacidade rigorosa no próprio motor JavaScript em tempo de execução:

\`\`\`javascript
class ContaBancaria {
  // Campo público
  titular;

  // Campo privado (inacessível de fora da classe)
  #saldo = 0;

  // Campo estático privado
  static #taxaManutencao = 0.02;

  constructor(titular, saldoInicial) {
    this.titular = titular;
    this.#saldo = saldoInicial;
  }

  depositar(valor) {
    if (valor <= 0) throw new Error('Valor inválido');
    this.#saldo += valor;
    this.#registrarLog(\`Depósito de R$ \${valor}\`);
  }

  // Método privado
  #registrarLog(mensagem) {
    console.log(\`[AUDIT] \${new Date().toISOString()} - \${mensagem}\`);
  }

  // Getter
  get saldo() {
    return this.#saldo;
  }
}

const conta = new ContaBancaria('Maycon', 1000);
conta.depositar(500);
console.log(conta.saldo); // 1500
// conta.#saldo; // ❌ SyntaxError: Private field '#saldo' must be declared in an enclosing class
\`\`\`

---

## 2. Blocos de Inicialização Estática (\`static { }\`)

Permitem executar lógica complexa de configuração estática com acesso a campos privados:

\`\`\`javascript
class ConfiguracaoSistema {
  static porta;
  static ambiente;

  static {
    try {
      this.porta = process.env.PORT || 3000;
      this.ambiente = process.env.NODE_ENV || 'development';
    } catch {
      this.porta = 8080;
      this.ambiente = 'local';
    }
  }
}
\`\`\`

---

## 3. Desestruturação Avançada e Operador Rest/Spread

\`\`\`javascript
const usuario = {
  id: 101,
  nome: 'Codatraill User',
  contato: {
    email: 'dev@codatraill.app',
    telefone: '11999999999'
  },
  roles: ['admin', 'developer']
};

// Desestruturação aninhada com renomeação e valor padrão
const {
  nome: nomeCompleto,
  contato: { email },
  status = 'ativo',
  ...restante
} = usuario;

console.log(nomeCompleto); // 'Codatraill User'
console.log(email);        // 'dev@codatraill.app'
console.log(status);       // 'ativo' (default)
console.log(restante);     // { id: 101, roles: ['admin', 'developer'] }
\`\`\`
`
  },
  {
    id: 'js-storage-offline-apis',
    techId: 'javascript',
    title: 'APIs Modernas do Navegador: IndexedDB, Cache API e Service Workers',
    slug: 'storage-offline-apis',
    summary: 'Como construir aplicações verdadeiramente offline-first com armazenamento transacional em IndexedDB e interceptação de requisições via Service Worker.',
    category: 'language',
    tags: ['indexeddb', 'service-worker', 'pwa', 'offline'],
    version: 'HTML5 / W3C',
    lastUpdated: '2026',
    content: `# Armazenamento Offline e PWA no Navegador

Para que uma aplicação funcione 100% desconectada da internet (como o Codatraill), utilizamos o tripé: **IndexedDB**, **Cache API** e **Service Workers**.

---

## 1. Comparativo de Armazenamento no Navegador

| Tecnologia | Capacidade | Síncrono / Assíncrono | Suporta Objetos Complexos? |
| :--- | :--- | :--- | :--- |
| **LocalStorage** | ~5MB | Síncrono (bloqueia thread) | Não (apenas strings) |
| **SessionStorage**| ~5MB | Síncrono (bloqueia thread) | Não (perdido ao fechar aba) |
| **IndexedDB** | **Gigas (+50GB)** | **Assíncrono (não bloqueia UI)**| **Sim (Binários, Blobs, JSON)** |
| **Cache API** | **Gigas** | **Assíncrono** | **Sim (Pares Request/Response)**|

---

## 2. Exemplo Completo de IndexedDB Transacional

\`\`\`javascript
function abrirBanco(nomeBanco, versao) {
  return new Promise((resolve, reject) => {
    const requisicao = indexedDB.open(nomeBanco, versao);

    requisicao.onupgradeneeded = (evento) => {
      const db = evento.target.result;
      if (!db.objectStoreNames.contains('documentos')) {
        const store = db.createObjectStore('documentos', { keyPath: 'id' });
        store.createIndex('categoria', 'categoria', { unique: false });
      }
    };

    requisicao.onsuccess = () => resolve(requisicao.result);
    requisicao.onerror = () => reject(requisicao.error);
  });
}

// Salvar documento no IndexedDB
async function salvarDocumento(db, documento) {
  return new Promise((resolve, reject) => {
    const transacao = db.transaction(['documentos'], 'readwrite');
    const store = transacao.objectStore('documentos');
    const request = store.put(documento);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
\`\`\`

---

## 3. Service Worker: Estratégia Stale-While-Revalidate

A estratégia *Stale-While-Revalidate* devolve imediatamente o conteúdo em cache (para velocidade instantânea offline) enquanto busca a versão mais recente em segundo plano:

\`\`\`javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('codatraill-v1').then(async (cache) => {
      const respostaEmCache = await cache.match(event.request);

      const requisicaoRede = fetch(event.request).then((respostaRede) => {
        if (respostaRede.status === 200) {
          cache.put(event.request, respostaRede.clone());
        }
        return respostaRede;
      }).catch(() => respostaEmCache);

      return respostaEmCache || requisicaoRede;
    })
  );
});
\`\`\`
`
  }
];
