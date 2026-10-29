import { DocItem } from '../../types';

export const reactDocs: DocItem[] = [
  {
    id: 'react-19-complete-guide',
    techId: 'react',
    title: 'React 19: Guia Completo de Novidades, Server Actions e Novos Hooks',
    slug: 'react-19-complete-guide',
    summary: 'Aprenda os novos hooks useActionState, useOptimistic, a nova API use(), Server Actions e o fim do forwardRef e useMemo manual com o React Compiler.',
    category: 'frontend',
    tags: ['react19', 'hooks', 'server-actions', 'optimistic'],
    version: 'React 19.0',
    lastUpdated: '2026',
    content: `# Guia Completo: Novidades do React 19

O React 19 traz a maior evolução do ecossistema desde a introdução dos Hooks no React 16.8.

---

## 1. \`useActionState\` (Substituto Moderno para Gestão de Formulários)

Elimina a necessidade de gerenciar três estados manuais (\`isPending\`, \`error\`, \`data\`):

\`\`\`tsx
import { useActionState } from 'react';

// Função assíncrona executada no envio
async function atualizarPerfil(estadoAnterior: any, formData: FormData) {
  const nome = formData.get('nome') as string;
  try {
    const res = await api.salvarNome(nome);
    return { sucesso: true, dados: res };
  } catch (erro: any) {
    return { sucesso: false, erro: erro.message };
  }
}

export function FormularioPerfil() {
  const [estado, formAction, isPending] = useActionState(atualizarPerfil, null);

  return (
    <form action={formAction} className="space-y-3">
      <input 
        name="nome" 
        placeholder="Seu nome completo" 
        disabled={isPending}
        className="p-2 border rounded"
      />
      <button 
        type="submit" 
        disabled={isPending}
        className="px-4 py-2 bg-emerald-500 text-white rounded font-bold"
      >
        {isPending ? 'Salvando no servidor...' : 'Atualizar Nome'}
      </button>

      {estado?.sucesso && <p className="text-emerald-400">Salvo com sucesso!</p>}
      {estado?.erro && <p className="text-red-400">Erro: {estado.erro}</p>}
    </form>
  );
}
\`\`\`

---

## 2. \`useOptimistic\` (Atualizações Otimistas na UI)

Permite exibir o novo valor imediatamente para o usuário antes mesmo do servidor responder, revertendo automaticamente em caso de falha:

\`\`\`tsx
import { useOptimistic } from 'react';

export function ListaMensagens({ mensagens, enviarMensagem }: any) {
  const [mensagensOtimistas, adicionarMensagemOtimista] = useOptimistic(
    mensagens,
    (estadoAtual: any[], novaMensagem: string) => [
      ...estadoAtual,
      { texto: novaMensagem, enviando: true }
    ]
  );

  async function acaoFormulario(formData: FormData) {
    const texto = formData.get('mensagem') as string;
    // 1. Atualiza a UI instantaneamente
    adicionarMensagemOtimista(texto);
    // 2. Envia para o servidor
    await enviarMensagem(texto);
  }

  return (
    <div>
      {mensagensOtimistas.map((m: any, i: number) => (
        <div key={i} className={m.enviando ? 'opacity-50' : 'opacity-100'}>
          {m.texto} {m.enviando && '(Enviando...)'}
        </div>
      ))}
      <form action={acaoFormulario}>
        <input name="mensagem" required />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
\`\`\`

---

## 3. O Fim do \`forwardRef\`

No React 19, \`ref\` é agora uma propriedade comum (*prop*), eliminando a necessidade da função \`forwardRef\`:

\`\`\`tsx
// React 19: ref como prop direta!
function MeuInput({ ref, placeholder }: { ref: React.Ref<HTMLInputElement>, placeholder: string }) {
  return <input ref={ref} placeholder={placeholder} className="p-2 border" />;
}
\`\`\`
`
  },
  {
    id: 'react-hooks-cheat-sheet',
    techId: 'react',
    title: 'Matriz e Referência Completa de Hooks Nativos',
    slug: 'hooks-cheat-sheet',
    summary: 'Referência rápida dos 14 hooks nativos com sintaxe, casos de uso e armadilhas comuns.',
    category: 'frontend',
    tags: ['hooks', 'cheatsheet', 'reference'],
    version: 'React 19.0',
    lastUpdated: '2026',
    content: `# Matriz Completa de Hooks do React

| Hook | Finalidade Principal | Quando Usar |
| :--- | :--- | :--- |
| \`useState\` | Estado local básico | Valores primitivos ou objetos que disparam re-render ao mudar |
| \`useReducer\` | Estado com lógica complexa | Transições de estado com múltiplos passos e ações |
| \`useEffect\` | Efeitos colaterais | Sincronização com sistemas externos, event listeners, subscrições |
| \`useContext\` | Leitura de Contexto | Compartilhar dados através da árvore sem *prop drilling* |
| \`useRef\` | Referência mutável persistente | Acesso direto a elementos do DOM ou valores que não devem re-renderizar |
| \`useMemo\` | Memoização de cálculo | Operações computacionais pesadas (filtros, ordenações de listas grandes) |
| \`useCallback\` | Memoização de funções | Passar callbacks para componentes filhos envelopados em \`React.memo\` |
| \`useTransition\`| Transições não urgentes | Manter a UI responsiva enquanto uma busca ou filtro pesado é processado |
| \`useDeferredValue\`| Adiar valor derivado | Deferir atualização de termos de busca mantendo a digitação rápida |
| \`useId\` | IDs únicos e estáveis | Acessibilidade entre inputs e labels compatível com SSR |
`
  }
];
