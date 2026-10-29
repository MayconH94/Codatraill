import { DocItem } from '../../types';

export const pythonDocs: DocItem[] = [
  {
    id: 'py-data-structures',
    techId: 'python',
    title: 'Estruturas de Dados Essenciais e Comprehensions no Python Moderno',
    slug: 'data-structures-comprehensions',
    summary: 'Guia completo de Listas, Dicionários, Conjuntos, Tuplas, Slicing avançado e Dict/List Comprehensions.',
    category: 'language',
    tags: ['python', 'collections', 'comprehensions', 'data-structures'],
    version: 'Python 3.12+',
    lastUpdated: '2026',
    content: `# Estruturas de Dados e Comprehensions no Python

Python possui quatro tipos de coleções fundamentais nativas, otimizadas em nível de linguagem.

---

## 1. Dicionários e Métodos Modernos (Python 3.9+)

### Operadores de União de Dicionários (\`|\` e \`|=\`)
Introduzidos na PEP 584, dispensam \`dict(a, **b)\` ou \`a.update(b)\`:

\`\`\`python
config_padrao = {'host': 'localhost', 'porta': 8000, 'debug': True}
config_usuario = {'porta': 5173, 'debug': False}

# Cria um novo dicionário fundindo ambos (o da direita tem precedência)
config_final = config_padrao | config_usuario
print(config_final)
# {'host': 'localhost', 'porta': 5173, 'debug': False}

# Atualização in-place
config_padrao |= config_usuario
\`\`\`

### Compreensão de Dicionários
\`\`\`python
linguagens = ['Python', 'JavaScript', 'Rust', 'Go']
tamanhos = {lang: len(lang) for lang in linguagens if len(lang) > 2}
print(tamanhos) # {'Python': 6, 'JavaScript': 10, 'Rust': 4, 'Go': 2}
\`\`\`

---

## 2. Listas e Fatiamento Avançado (\`Slicing\`)

A sintaxe de slicing \`[inicio:fim:passo]\` é uma das mais poderosas do Python:

\`\`\`python
numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Inversão idiomática de lista
invertidos = numeros[::-1] # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

# Elementos em posições pares
pares = numeros[::2]       # [0, 2, 4, 6, 8]

# Últimos 3 elementos
ultimos = numeros[-3:]     # [7, 8, 9]
\`\`\`

---

## 3. Módulo \`collections\`: Superestruturas Nativas

### \`Counter\`
Conta a frequência de elementos automaticamente:
\`\`\`python
from collections import Counter

tags = ['python', 'backend', 'python', 'docker', 'python', 'docker']
contagem = Counter(tags)
print(contagem.most_common(2)) 
# [('python', 3), ('docker', 2)]
\`\`\`

### \`defaultdict\`
Elimina verificações com \`if chave not in dict\`:
\`\`\`python
from collections import defaultdict

agrupado = defaultdict(list)
usuarios = [('TI', 'Alice'), ('RH', 'Bob'), ('TI', 'Carlos')]

for departamento, nome in usuarios:
    agrupado[departamento].append(nome)

print(dict(agrupado))
# {'TI': ['Alice', 'Carlos'], 'RH': ['Bob']}
\`\`\`
`
  },
  {
    id: 'py-asyncio-concurrency',
    techId: 'python',
    title: 'Programação Assíncrona com \`asyncio\`, Tasks e Concorrência',
    slug: 'asyncio-concurrency',
    summary: 'Corrotinas com async/await, TaskGroups do Python 3.11+, semáforos e execução paralela de requisições de rede.',
    category: 'language',
    tags: ['asyncio', 'concurrency', 'tasks', 'python311'],
    version: 'Python 3.12+',
    lastUpdated: '2026',
    content: `# Concorrência com asyncio no Python Moderno

O \`asyncio\` provê infraestrutura para escrita de código concorrente através de corrotinas gerenciadas por um **Event Loop**.

---

## 1. TaskGroup: Gerenciamento Estruturado de Tarefas (Python 3.11+)

O \`asyncio.TaskGroup\` é a forma recomendada de executar múltiplas tarefas concorrentes com garantia de que, se uma falhar, as outras são limpas de forma determinística:

\`\`\`python
import asyncio
import time

async def buscar_documentacao(tech: str, delay: int) -> dict:
    print(f"Iniciando busca de {tech}...")
    await asyncio.sleep(delay)
    print(f"Concluída busca de {tech}!")
    return {"tech": tech, "status": "sincronizado"}

async def main():
    inicio = time.perf_counter()
    
    # TaskGroup executa as 3 tarefas concorrentemente
    async with asyncio.TaskGroup() as tg:
        tarefa1 = tg.create_task(buscar_documentacao("React", 1))
        tarefa2 = tg.create_task(buscar_documentacao("Python", 2))
        tarefa3 = tg.create_task(buscar_documentacao("Rust", 1))
    
    # Todos os resultados disponíveis aqui
    print("Resultados:", tarefa1.result(), tarefa2.result(), tarefa3.result())
    print(f"Tempo total decorrido: {time.perf_counter() - inicio:.2f}s")

if __name__ == "__main__":
    asyncio.run(main())
\`\`\`

---

## 2. Controle de Concorrência com \`Semaphore\`

Para evitar sobrecarregar APIs ou esgotar limites de taxa (Rate Limits):

\`\`\`python
sem = asyncio.Semaphore(5) # Limita a no máximo 5 requisições simultâneas

async def requisicao_segura(url):
    async with sem:
        # Apenas 5 corrotinas entram neste bloco por vez
        return await fetch_url(url)
\`\`\`
`
  },
  {
    id: 'py-oop-dunder',
    techId: 'python',
    title: 'Orientação a Objetos Avançada, Métodos Dunder e Dataclasses',
    slug: 'oop-dunder-dataclasses',
    summary: 'Sobrecarga de operadores, gerenciadores de contexto com __enter__/__exit__, representações __repr__ e o poder de @dataclass.',
    category: 'language',
    tags: ['oop', 'dunder', 'dataclass', 'magic-methods'],
    version: 'Python 3.12+',
    lastUpdated: '2026',
    content: `# Orientação a Objetos e Métodos Especiais (Dunder)

Os métodos com duplo sublinhado (*dunder methods*) integram as classes aos operadores nativos do Python.

---

## 1. Métodos Dunder Mais Importantes

\`\`\`python
class Versao:
    def __init__(self, major: int, minor: int, patch: int):
        self.major = major
        self.minor = minor
        self.patch = patch

    # Representação oficial para depuração
    def __repr__(self) -> str:
        return f"Versao({self.major}, {self.minor}, {self.patch})"

    # Representação amigável para print() e str()
    def __str__(self) -> str:
        return f"v{self.major}.{self.minor}.{self.patch}"

    # Sobrecarga do operador de igualdade (==)
    def __eq__(self, outro) -> bool:
        if not isinstance(outro, Versao):
            return False
        return (self.major, self.minor, self.patch) == (outro.major, outro.minor, outro.patch)

    # Sobrecarga do operador menor que (<) para ordenação automática com sort()
    def __lt__(self, outro) -> bool:
        return (self.major, self.minor, self.patch) < (outro.major, outro.minor, outro.patch)

v1 = Versao(1, 0, 0)
v2 = Versao(1, 2, 0)
print(v1 < v2) # True
\`\`\`

---

## 2. Gerenciador de Contexto com \`__enter__\` e \`__exit__\`

\`\`\`python
class Temporizador:
    def __enter__(self):
        import time
        self.inicio = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        fim = time.perf_counter()
        print(f"Tempo de execução: {(fim - self.inicio) * 1000:.2f} ms")

with Temporizador():
    # Bloco monitorado
    soma = sum(i**2 for i in range(1_000_000))
\`\`\`
`
  }
];
