
# 💳 NexasPay App

Bem-vindo ao **NexasPay**, um aplicativo desenvolvido com **React Native + Expo**, que integra um **servidor local (API)** com suporte à **OpenAI** para respostas inteligentes e automação financeira.

---

## 🚀 Como Rodar o Projeto

### 🧩 1. Instale as dependências

No diretório principal do projeto (onde está o arquivo `package.json` do app):

```bash
npm install
````

### 🧠 2. Configure o servidor (API)

A API local é responsável por lidar com as requisições da IA (OpenAI) e demais endpoints da aplicação.
Ela se encontra dentro da pasta **`/server`**.

Entre na pasta:

```bash
cd server
```

Instale as dependências do servidor:

```bash
npm install
```

Crie o arquivo `.env` dentro da pasta `server` com as seguintes variáveis:

```bash
OPENAI_API_KEY=sua_chave_aqui
PORT=3001
```

> 🔑 Substitua `sua_chave_aqui` pela sua **chave da OpenAI** (que você encontra em [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)).

Depois, inicie o servidor:

```bash
npm run dev
```

O servidor será iniciado em:

```
http://localhost:3001
```

---

### 📱 3. Execute o app mobile

No diretório raiz (volte da pasta `server`):

```bash
cd ..
npx expo start
```

Isso abrirá o **Expo Developer Tools** no seu navegador.
Você poderá rodar o app em:

* 🧪 **Development Build**
* 🤖 **Android Emulator**
* 🍏 **iOS Simulator**
* 📱 **Expo Go App**

---

## 🧰 Estrutura do Projeto

```
nexaspay/
├── app/               # Código principal do app (rotas, telas e componentes)
├── server/            # API local com integração OpenAI
├── assets/            # Ícones, imagens e logos
├── utils/             # Funções auxiliares e constantes globais
├── package.json
└── README.md
```

---

## 🧠 Funcionalidades

* 💬 Chat com assistente inteligente (IA via OpenAI API)
* 💳 Simulação de transações e Pix
* 📊 Módulo de Score Financeiro (NexasScore)
* 🔐 Integração futura com autenticação segura (JWT / Cognito)
* ☁️ API modular, pronta para deploy em cloud

---

## ⚙️ Comandos úteis

| Comando                         | Descrição                             |
| ------------------------------- | ------------------------------------- |
| `npm install`                   | Instala dependências do app           |
| `cd server && npm install`      | Instala dependências do servidor      |
| `npm run dev` (na pasta server) | Inicia a API local                    |
| `npx expo start`                | Inicia o app Expo                     |
| `npm run reset-project`         | (Opcional) Cria um novo projeto limpo |

---

## 🔗 Recursos

* [📘 Documentação do Expo](https://docs.expo.dev/)
* [🧠 API OpenAI](https://platform.openai.com/docs)
* [⚡ FastAPI + Nexas API (futuro backend oficial)](https://github.com/NexasPay/api-nexaspay)
* [📱 Protótipo no Figma](https://www.figma.com/proto/5DCAR8BqB7s7Jp6hkWmdLi/NexasPay---App?node-id=1-2&starting-point-node-id=19%3A85&t=4Rlj2TpCnDiMLj8I-1)

---

## 🧩 Observações

> ⚠️ Este projeto é um **MVP (Produto Mínimo Viável)**.
> Por questões de tempo, **módulos avançados de IA, AWS e Blockchain não foram incluídos** nesta entrega.
> O foco foi garantir o fluxo funcional entre **App + API + OpenAI**, com base sólida para evolução futura.

---

## 🧡 Equipe NexasPay

Desenvolvido com foco em **inovação, performance e experiência do usuário**.

> “Simplificando o futuro dos pagamentos digitais.”

---

```

---

### ✅ O que esse README já cobre:
- Como **instalar o app e o servidor** corretamente.  
- Onde **criar o `.env`** e quais variáveis usar.  
- Passo a passo de **execução (API + Expo)**.  
- Descrição de **funcionalidades e estrutura**.  
- Observação clara sobre o **MVP e escopo reduzido (sem AWS/ML/Blockchain)**.

---

Posso te gerar agora o **`.env.example`** e o **script `package.json` ajustado** com `"start:server"` e `"start:app"` (para rodar tudo junto com um comando `npm run dev:all`)? Isso deixaria o projeto pronto para o time iniciar rápido. Quer que eu te mande isso também?
```
