# 🚀 Codatraill

> **Hub Centralizado de Documentações & Frameworks com Consulta 100% Offline e Mobile-First**

![Codatraill Banner](/public/logo.svg)

**Codatraill** é uma aplicação web progressiva (PWA) de alto desempenho desenvolvida para resolver um problema recorrente de desenvolvedores: a necessidade de abrir dezenas de abas e pesquisar separadamente a documentação de cada linguagem, framework e ferramenta.

Com o **Codatraill**, você tem acesso rápido, centralizado e totalmente **offline** a manuais, cheatsheets de sintaxe, guias de referência e APIs oficiais, além de um buscador online em tempo real integrado às APIs do **MDN Web Docs** e repositórios oficiais.

---

## ✨ Principais Funcionalidades

- **📱 Mobile-First & PWA**: Interface responsiva com navegação inferior (*Bottom Navigation*), suporte a gestos e instalável na tela inicial de qualquer smartphone (Android / iOS) ou desktop.
- **⚡ Suporte Offline Completo (IndexedDB)**: Armazene localmente pacotes inteiros de documentação com 1 clique para consultar no metrô, avião ou sem internet.
- **🌐 Buscador de Documentação Online**:
  - Consulta em tempo real à API oficial do **MDN Web Docs** (JavaScript, CSS, HTML, Web APIs).
  - Consulta aos repositórios e cheatsheets oficiais do **GitHub**.
  - Importação de qualquer documentação encontrada online diretamente para sua biblioteca offline.
- **🎨 Design Cyberpunk & Profissional**:
  - Paleta personalizada em tons de **Preto Obsidiana (`#070a08`)** e **Verde Neon / Esmeralda (`#00ff88`, `#10b981`)**.
  - Alternador de **Modo Escuro (Dark Mode)** e **Modo Claro (Light Mode)** com persistência local.
- **🌍 Multi-idioma (i18n)**: Seletor de idioma integrado com suporte completo a **Português (PT-BR)**, **Inglês (EN)** e **Espanhol (ES)**.
- **💻 Console Interativo / JS Sandbox**: Execute e teste códigos JavaScript em tempo real diretamente no leitor de documentação, com visualização de saída do console.
- **🔖 Favoritos e Notas**: Marque tópicos importantes para acesso instantâneo.
- **💾 Backup e Restauração**: Exporte e importe sua biblioteca offline em arquivos `.json`.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [React 19](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Build Tool:** [Vite](https://vite.dev/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Markdown & Sintaxe:** [Marked](https://marked.js.org/) & [PrismJS](https://prismjs.com/)
- **Armazenamento:** [IndexedDB API](https://developer.mozilla.org/pt-BR/docs/Web/API/IndexedDB_API) & Cache API

---

## 📚 Tecnologias Catalogadas

| Categoria | Tecnologias Inclusas |
| :--- | :--- |
| **Linguagens** | JavaScript (ES2024), TypeScript 5, Python 3.12, Rust, Go, Java 21 LTS, C++, C# (.NET 8), Kotlin, Dart |
| **Front-end** | React 19, Next.js 15, Vue.js 3, Tailwind CSS |
| **Back-end** | Node.js, Express, Go, Python, Java |
| **Mobile** | Flutter, React Native, Kotlin Android |
| **DevOps & Cloud** | Docker, Docker Compose, Git |
| **Banco de Dados** | SQL, PostgreSQL |

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18+)
- Gerenciador de pacotes `npm`

### Passos

1. **Clone o repositório:**
   \`\`\`bash
   git clone https://github.com/SEU-USUARIO/codatraill.git
   cd codatraill
   \`\`\`

2. **Instale as dependências:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Inicie o servidor de desenvolvimento:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Acesse no navegador:**
   - Local: \`http://localhost:5173\`
   - Na rede móvel/Wi-Fi: \`http://<SEU-IP>:5173\`

5. **Gerar build de produção:**
   \`\`\`bash
   npm run build
   \`\`\`

---

## 📱 Como Instalar no Celular (PWA)

1. Abra a aplicação no navegador do celular (Google Chrome no Android ou Safari no iOS).
2. Toque no botão de menu (três pontos) ou em **Compartilhar**.
3. Selecione **"Adicionar à Tela de Início"** / **"Instalar Aplicativo"**.
4. O ícone do **Codatraill** será adicionado à sua tela inicial, funcionando em tela cheia e offline!

---

## 📄 Licença
Distribuído sob a licença MIT. Veja \`LICENSE\` para mais informações.
