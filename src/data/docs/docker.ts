import { DocItem } from '../../types';

export const dockerDocs: DocItem[] = [
  {
    id: 'docker-production-handbook',
    techId: 'docker',
    title: 'Manual de Docker para Produção: Multi-stage, Cache e Otimização',
    slug: 'docker-production-handbook',
    summary: 'Como criar imagens seguras com imagens non-root, Docker Compose v2, volumes persistentes e multi-stage builds de menos de 30MB.',
    category: 'devops',
    tags: ['docker', 'containers', 'devops', 'dockerfile'],
    version: '26.x+',
    lastUpdated: '2026',
    content: `# Manual de Produção: Docker e Dockerfile Otimizados

---

## 1. Multi-Stage Builds de Alta Performance

Multi-stage builds separam as dependências de compilação da imagem final distribuída para produção:

\`\`\`dockerfile
# -----------------------------------------------------------
# Estágio 1: Build da Aplicação
# -----------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copia apenas os manifests primeiro para aproveitar o cache de camadas
COPY package*.json ./
RUN npm ci

# Copia o código-fonte e compila
COPY . .
RUN npm run build

# -----------------------------------------------------------
# Estágio 2: Imagem Mínima de Produção
# -----------------------------------------------------------
FROM nginx:1.27-alpine-slim

# Remove configurações padrão do nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copia a configuração customizada do NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os artefatos compilados do estágio anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Usuário sem privilégios de root para segurança
USER nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
\`\`\`

---

## 2. Docker Compose v2 Completo com Banco de Dados e Cache

\`\`\`yaml
services:
  app:
    build: .
    ports:
      - "5173:80"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/codatraill
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: codatraill
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d codatraill"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
\`\`\`
`
  }
];
