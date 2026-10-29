import { DocItem } from '../../types';

export const sqlDocs: DocItem[] = [
  {
    id: 'sql-window-functions',
    techId: 'sql',
    title: 'Funções de Janela (Window Functions) e CTEs Avançadas',
    slug: 'sql-window-functions',
    summary: 'Aprenda ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, PARTITION BY e Common Table Expressions (WITH) recursivas.',
    category: 'database',
    tags: ['sql', 'postgres', 'window-functions', 'database'],
    version: 'PostgreSQL 16+',
    lastUpdated: '2026',
    content: `# Funções de Janela e Consultas Avançadas em SQL

Window Functions executam cálculos através de um conjunto de linhas relacionadas à linha atual sem colapsar o resultado em uma única linha (como o \`GROUP BY\` faz).

---

## 1. Funções de Janela de Ranking

\`\`\`sql
SELECT 
    id,
    nome,
    departamento,
    salario,
    -- Numeração sequencial contínua dentro de cada departamento
    ROW_NUMBER() OVER(PARTITION BY departamento ORDER BY salario DESC) as ranking_linha,
    -- Ranking com empates (pula posições)
    RANK() OVER(PARTITION BY departamento ORDER BY salario DESC) as rank_salario,
    -- Ranking denso (não pula posições)
    DENSE_RANK() OVER(PARTITION BY departamento ORDER BY salario DESC) as dense_rank_salario
FROM funcionarios;
\`\`\`

---

## 2. Navegação com \`LEAD()\` e \`LAG()\`

Úteis para comparar o registro atual com o anterior ou o próximo (ex: variação de vendas mês a mês):

\`\`\`sql
SELECT 
    mes,
    faturamento,
    LAG(faturamento, 1) OVER(ORDER BY mes) as faturamento_mes_anterior,
    faturamento - LAG(faturamento, 1) OVER(ORDER BY mes) as variacao_absoluta
FROM vendas_mensais;
\`\`\`
`
  }
];
