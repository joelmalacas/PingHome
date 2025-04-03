# PingHome

PingHome é uma aplicação que realiza pings em dispositivos, armazena os dados em um banco de dados PostgreSQL e disponibiliza uma API para visualizar as informações.

## 📌 Funcionalidade
- **PingServer.js**: Realiza pings nos dispositivos e envia os dados para um cluster do PostgreSQL.
- **app.js**: Cria um endpoint para buscar os dados da tabela de dispositivos no banco de dados.
- **script.js**: Faz fetch da API do `app.js` e exibe os dados em uma tabela HTML para o usuário.

## 📦 Tecnologias Utilizadas
- **Node.js**
- **PostgreSQL**
- **Bibliotecas NPM:**
  - `ping`
  - `pg`
  - `cors`

## 🚀 Como Rodar o Projeto

### 1️⃣ Instalar dependências
```sh
npm install
```

### 2️⃣ Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto e configure as credenciais do PostgreSQL:
```
DB_HOST=seu_host
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
DB_PORT=5432
```

### 3️⃣ Executar os scripts

- **Iniciar o servidor API**
```sh
node app.js
```

- **Executar o script de ping**
```sh
node PingServer.js
```

- **Executar o frontend (caso necessário um servidor local)**
```sh
node script.js
```

## ⏳ Execução Automatizada
No servidor Linux, o script `PingServer.js` é executado a cada 20 minutos através de um cron job. Para configurar:
```sh
crontab -e
```
Adicione a seguinte linha:
```sh
*/20 * * * * /usr/bin/node /caminho/para/PingServer.js
```
Isso garante que o script seja executado automaticamente a cada 20 minutos.

## 📄 Licença
Este projeto é de código aberto e pode ser modificado conforme necessário.

---
Criado por Joel Malacas 🚀
