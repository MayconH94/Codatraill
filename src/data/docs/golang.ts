import { DocItem } from '../../types';

export const golangDocs: DocItem[] = [
  {
    id: 'go-concurrency-patterns',
    techId: 'golang',
    title: 'Padrões de Concorrência: Goroutines, Canais, Select e Context',
    slug: 'concurrency-patterns',
    summary: 'Aprofunde-se no modelo CSP (Communicating Sequential Processes): canais com buffer, multiplexação com select, e cancelamento com context.Context.',
    category: 'backend',
    tags: ['golang', 'concurrency', 'goroutines', 'channels', 'context'],
    version: 'Go 1.23+',
    lastUpdated: '2026',
    content: `# Concorrência Profunda em Go

O lema de Go é: *"Não se comunique compartilhando memória; em vez disso, compartilhe memória comunicando-se."*

---

## 1. Goroutines e Canais

Uma Goroutine é uma thread leve gerenciada pelo Go Runtime (custo inicial de ~2KB versus ~1MB de uma thread de SO):

\`\`\`go
package main

import (
    "fmt"
    "time"
)

func worker(id int, filaJobs <-chan int, resultados chan<- int) {
    for j := range filaJobs {
        fmt.Printf("Worker %d processando job %d\n", id, j)
        time.Sleep(time.Millisecond * 300)
        resultados <- j * 2
    }
}

func main() {
    const totalJobs = 5
    jobs := make(chan int, totalJobs)
    resultados := make(chan int, totalJobs)

    // Inicia 3 workers em paralelo
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, resultados)
    }

    // Envia os dados
    for j := 1; j <= totalJobs; j++ {
        jobs <- j
    }
    close(jobs)

    // Coleta as respostas
    for a := 1; a <= totalJobs; a++ {
        res := <-resultados
        fmt.Println("Resultado:", res)
    }
}
\`\`\`

---

## 2. Multiplexação com \`select\` e Timeout

\`\`\`go
select {
case msg := <-canalDados:
    fmt.Println("Dados recebidos:", msg)
case <-time.After(2 * time.Second):
    fmt.Println("Timeout de 2 segundos esgotado!")
}
\`\`\`
`
  }
];
