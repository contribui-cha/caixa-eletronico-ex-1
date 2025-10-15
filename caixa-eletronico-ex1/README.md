# 🏦 Caixa Eletrônico

Projeto desenvolvido em React + TypeScript para simular um sistema de caixa eletrônico com funcionalidades de depósito, saque e histórico de transações.

## 📋 Sobre o Projeto

Este é um projeto educacional que demonstra os conceitos fundamentais do React:
- **useState**: Gerenciamento de estado dos componentes
- **useEffect**: Sincronização com localStorage para persistência de dados
- **Componentização**: Divisão da aplicação em componentes reutilizáveis
- **Formulários**: Manipulação de eventos e validação de dados
- **TypeScript**: Tipagem estática para maior segurança no código

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Entre na pasta do projeto:
```bash
cd caixa-eletronico-ex1
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

4. Abra o navegador e acesse: `http://localhost:5173`

## 👥 Usuários para Teste

O sistema possui 3 usuários mockados para autenticação:

| Usuário | Senha |
|---------|-------|
| joao    | 1234  |
| maria   | 5678  |
| pedro   | 9012  |

## 🎯 Funcionalidades

### 1. Login
- Tela inicial com autenticação
- Validação de usuário e senha
- Lista de usuários disponíveis para facilitar os testes

### 2. Caixa Eletrônico
- **Saldo**: Exibição do saldo atual (inicia em R$ 0,00)
- **Depositar**: Adiciona valores ao saldo
- **Sacar**: Retira valores do saldo (com validação de saldo insuficiente)
- **Histórico**: Lista todas as operações realizadas com:
  - Data e hora da transação
  - Tipo de operação (DEP para depósito, SAQ para saque)
  - Saldo após a operação
- **Sair**: Retorna para a tela de login

### 3. Persistência de Dados
- Os dados são salvos no **localStorage** do navegador
- Cada usuário tem seu próprio saldo e histórico
- Os dados permanecem salvos mesmo após fechar o navegador

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Login.tsx              # Componente de autenticação
│   └── CaixaEletronico.tsx    # Componente principal do caixa
├── App.tsx                     # Componente raiz com navegação
└── main.tsx                    # Ponto de entrada da aplicação
```

## 🛠️ Tecnologias Utilizadas

- **React 18**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset do JavaScript com tipagem estática
- **Vite**: Build tool rápida para desenvolvimento
- **Bootstrap 5**: Framework CSS para estilização
- **LocalStorage**: API do navegador para persistência de dados

## 📝 Regras de Negócio

1. O saldo inicial de cada usuário é R$ 0,00
2. Depósitos aumentam o saldo
3. Saques diminuem o saldo
4. Não é permitido sacar valores maiores que o saldo disponível
5. Todas as operações são registradas no histórico com data e hora
6. Cada usuário tem seus próprios dados isolados
7. Os dados persistem entre as sessões

## 💡 Conceitos React Utilizados

### useState
Usado para gerenciar estados locais:
- `usuarioLogado`: Controla qual usuário está autenticado
- `saldo`: Armazena o saldo atual
- `historico`: Lista de operações realizadas
- `valor`: Valor digitado no campo de operação
- `erro`: Mensagens de erro de validação

### useEffect
Usado para efeitos colaterais:
- Carregar dados do localStorage quando o componente monta
- Salvar dados no localStorage quando saldo ou histórico mudam

### Componentização
- `Login`: Componente responsável pela autenticação
- `CaixaEletronico`: Componente principal com as funcionalidades do caixa
- `App`: Componente que gerencia a navegação entre telas

### Props
Interface de comunicação entre componentes:
- `onLogin`: Callback para notificar login bem-sucedido
- `onLogout`: Callback para notificar logout
- `usuario`: String com o nome do usuário logado

## 🎨 Layout

O projeto utiliza Bootstrap 5 via CDN para estilização, proporcionando:
- Design responsivo
- Cards com sombras
- Cores temáticas (amarelo/warning para ações principais)
- Tabelas estilizadas para o histórico
- Alertas informativos

## 📚 Aprendizados

Este projeto é ideal para:
- ✅ Entender o fluxo de dados em React
- ✅ Praticar gerenciamento de estado com hooks
- ✅ Trabalhar com formulários e validações
- ✅ Implementar persistência de dados no navegador
- ✅ Criar navegação entre componentes
- ✅ Aplicar TypeScript em projetos React


**Desenvolvido como exercício educacional de React + TypeScript**
