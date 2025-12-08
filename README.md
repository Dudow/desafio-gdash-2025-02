# GDash - Sistema de Coleta e Análise de Dados Climáticos

Este projeto implementa uma plataforma full-stack de monitoramento climático com IA, construída para demonstrar integração entre múltiplos serviços, linguagens e tecnologias modernas, orquestradas via Docker Compose.

A aplicação realiza todo o fluxo:

> Python → Message Broker → Go → NestJS → MongoDB → Frontend (React)

Coletando, processando, armazenando e exibindo dados reais de clima, enriquecidos com insights gerados por IA.

## Vídeo de Apresentação

## Como Utilizar

    cd react-dashboard

    cp .env.example  .env

    cd ../nest-api

    cp .env.example  .env

    Adicionar OPENAI_API_KEY  no  .env

> `OPENAI_API_KEY="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"`

    cd ..

    docker compose up --build

## Links de Acesso

RabbitMQ: http://localhost:15672/

Frontend: http://localhost:3005/

## Usuário Padrão

Email: admin@example.com

Senha: 123456

## ✅ Checklist rápido

- [x] Python coleta dados de clima (Open-Meteo ou OpenWeather)
- [x] Python envia dados para a fila
- [x] Worker Go consome a fila e envia para a API NestJS
- [x] API NestJS:
  - [x] Armazena logs de clima em MongoDB
  - [x] Expõe endpoints para listar dados
  - [x] Gera/retorna insights de IA (endpoint próprio)
  - [x] Exporta dados em CSV/XLSX
  - [x] Implementa CRUD de usuários + autenticação
  - [x] (Opcional) Integração com API pública paginada
- [x] Frontend React + Vite + Tailwind + shadcn/ui:
  - [x] Dashboard de clima com dados reais
  - [x] Exibição de insights de IA
  - [x] Exporta dados em CSV/XLSX
  - [x] CRUD de usuários + login
  - [x] Autenticação
  - [x] (Opcional) Página consumindo API pública paginada
- [x] Docker Compose sobe todos os serviços
- [x] Código em TypeScript (backend e frontend)
- [ ] Vídeo explicativo (máx. 5 minutos)
- [ ] Pull Request via branch com seu nome completo
- [x] README completo com instruções de execução
- [x] Logs e tratamento de erros básicos em cada serviço
