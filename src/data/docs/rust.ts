import { DocItem } from '../../types';

export const rustDocs: DocItem[] = [
  {
    id: 'rust-ownership-lifetimes',
    techId: 'rust',
    title: 'Ownership, Borrowing, Lifetimes e o Borrow Checker em Detalhes',
    slug: 'ownership-borrowing-lifetimes',
    summary: 'Aprofundamento nas regras de ouro da gestão de memória sem Garbage Collector no Rust: referências exclusivas mutáveis vs imutáveis compartilhadas.',
    category: 'language',
    tags: ['rust', 'ownership', 'borrowing', 'lifetimes'],
    version: 'Rust 1.80+',
    lastUpdated: '2026',
    content: `# Ownership, Borrowing e Lifetimes no Rust

A característica definidora do Rust é a garantia de segurança de memória e ausência de *data races* em tempo de compilação sem *garbage collector*.

---

## 1. As Três Leis de Ownership

1. Cada valor no Rust tem um proprietário (*owner*).
2. Só pode existir um único proprietário por vez.
3. Quando o proprietário sai de escopo (\`}\`), o valor é liberado automaticamente via trait \`Drop\`.

\`\`\`rust
fn main() {
    let s1 = String::from("Codatraill");
    
    // MOVE de posse: s1 deixa de ser válido!
    let s2 = s1;
    
    // println!("{}", s1); // ❌ Erro de compilação: value borrowed here after move
    println!("{}", s2); // ✅ Válido!
}
\`\`\`

---

## 2. As Regras de Empréstimo (Borrowing)

Você pode criar referências a um valor usando o operador \`&\`:

> **A Regra de Ouro do Empréstimo:**  
> A qualquer momento, você pode ter:  
> - **OU** qualquer número de referências imutáveis (\`&T\`)  
> - **OU** exatamente uma única referência mutável (\`&mut T\`)  
> **Mas NUNCA ambas ao mesmo tempo!**

\`\`\`rust
fn main() {
    let mut texto = String::from("Rust");

    // Múltiplos empréstimos imutáveis são permitidos:
    let r1 = &texto;
    let r2 = &texto;
    println!("{} e {}", r1, r2); // Leitura segura

    // r1 e r2 não são mais usados após esta linha (Non-Lexical Lifetimes - NLL)

    // Agora um empréstimo mutável exclusivo é permitido:
    let r3 = &mut texto;
    r3.push_str(" 2026");
    println!("{}", r3);
}
\`\`\`

---

## 3. Lifetimes Explicadas (\`'a\`)

Lifetimes garantem que nenhuma referência sobreviva por mais tempo do que os dados aos quais ela aponta (*dangling pointers*):

\`\`\`rust
// Função que retorna a string mais longa entre duas fatias
// O lifetime 'a especifica que a referência retornada viverá pelo menos
// o menor dos tempos de vida entre x e y
fn maior<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
\`\`\`
`
  },
  {
    id: 'rust-error-handling',
    techId: 'rust',
    title: 'Tratamento Idiomático de Erros com Result<T, E> e Option<T>',
    slug: 'error-handling-result-option',
    summary: 'Elimine crashes usando o operador ?, unwrap seguro, pattern matching e combinação com map, and_then.',
    category: 'language',
    tags: ['rust', 'error-handling', 'result', 'option'],
    version: 'Rust 1.80+',
    lastUpdated: '2026',
    content: `# Tratamento de Erros no Rust

Rust não possui exceções. Em vez disso, codifica a possibilidade de ausência com \`Option<T>\` e falha com \`Result<T, E>\`.

---

## 1. O Operador \`?\` (Propagação Limpa de Erros)

O operador \`?\` desempacota o valor de um \`Ok(v)\` ou retorna prematuramente da função com \`Err(e)\`:

\`\`\`rust
use std::fs::File;
use std::io::{self, Read};

fn ler_conteudo_arquivo(caminho: &str) -> Result<String, io::Error> {
    let mut arquivo = File::open(caminho)?; // Retorna io::Error se falhar
    let mut conteudo = String::new();
    arquivo.read_to_string(&mut conteudo)?;
    Ok(conteudo)
}
\`\`\`
`
  }
];
