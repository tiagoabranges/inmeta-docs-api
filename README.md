# 📁 Inmeta Document API - NestJS

## 💡 Descrição

O **Inmeta Document API** é uma aplicação RESTful desenvolvida com **NestJS** e **MongoDB**, que tem como objetivo gerenciar colaboradores, tipos de documentos e os documentos enviados por eles. Inspirado em necessidades reais de controle de documentação interna, o sistema permite criar regras dinâmicas sobre quais documentos são obrigatórios por colaborador, consultar o status de envio e realizar a gestão completa de registros.

---

## 🚀 Tecnologias Utilizadas

### Backend

- [NestJS](https://nestjs.com/) – Framework Node.js para aplicações escaláveis
- [TypeScript](https://www.typescriptlang.org/) – Superset do JavaScript com tipagem estática
- [MongoDB](https://www.mongodb.com/) – Banco de dados NoSQL
- [Mongoose](https://mongoosejs.com/) – ODM para MongoDB
- [Swagger](https://swagger.io/) – Documentação automática da API
- [class-validator](https://github.com/typestack/class-validator) + [class-transformer](https://github.com/typestack/class-transformer) – Validação de DTOs
- [Eslint](https://eslint.org/) + [Prettier](https://prettier.io/) – Padronização de código
- [Docker (opcional)](https://www.docker.com/) – Para subir o MongoDB localmente

---

## ⚙️ Funcionalidades

- ✅ CRUD de colaboradores (`/employees`)
- ✅ CRUD de tipos de documentos (`/document-types`)
- ✅ Envio e consulta de documentos por colaborador (`/documents`)
- ✅ Vinculação dinâmica de documentos obrigatórios
- ✅ Consulta de status dos documentos enviados e pendentes por colaborador
- ✅ Paginação e filtros em endpoints de consulta
- ✅ Documentação Swagger integrada e acessível

---

## 🔐 Endpoints principais

Todos os endpoints estão documentados com Swagger e podem ser acessados após rodar a aplicação localmente:



---

## 📦 Como rodar o projeto

### 🔧 Pré-requisitos

- Node.js ≥ 18.x
- MongoDB local ou Docker

### 💻 Rodando localmente

```bash
# Clone o repositório
$ git clone git@github.com:tiagoabranges/inmeta-docs-api.git

# Acesse o projeto
$ cd inmeta-docs-api

# Instale as dependências
$ npm install

# Crie um arquivo .env com a URI do seu MongoDB
# Exemplo de conteúdo:
# MONGO_URI=mongodb://localhost:27017/document-manager

# Rode a aplicação
$ npm run start:dev

# Acesse a documentação
http://localhost:3000/api

```

## ✨ Estrutura da aplicação


```bash
src/
├── common/
│   ├── filters/
│   │   └── http-exception.filter.ts      # Filtro global de tratamento de exceções
│   └── middlewares/
│       └── logger.middleware.ts          # Middleware para log de requisições
│
├── employee/
│   ├── employee.controller.ts
│   ├── employee.service.ts
│   ├── dto/
│   └── schemas/
│
├── document-type/
│   ├── document-type.controller.ts
│   ├── document-type.service.ts
│   ├── dto/
│   └── schemas/
│
├── document/
│   ├── document.controller.ts
│   ├── document.service.ts
│   ├── dto/
│   └── schemas/
│
├── app.module.ts
├── main.ts

```
## 📚 Swagger – Documentação da API
http://localhost:3000/api

Lá você verá todos os endpoints organizados e poderá testar diretamente do navegador:

```bash
POST/GET/DELETE /employees

POST/GET/DELETE /document-types

POST/GET/DELETE /documents

GET /documents/pending com paginação

GET /documents/status/:employeeId
```
## 📄 Exemplos de uso


📥 Criar um colaborador

```bash
POST /employees
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "cpf": "12345678900",
  "hiredAt": "2024-06-01"
}

```

📄 Criar um tipo de documento

```bash
POST /document-types
{
  "name": "Comprovante de Residência"
}

```


📥 Enviar um documento


```bash
POST /documents
{
  "employeeId": "ID do colaborador",
  "documentTypeId": "ID do tipo de documento",
  "status": "enviado"
}


```


📊 Ver status da documentação de um colaborador

```bash

GET /documents/status/:employeeId

```
## 🧪 Testando com API Client

Recomenda-se o uso de ferramentas para testar os endpoints da API:

- 🔍 [**Insomnia**](https://insomnia.rest/) – Ideal para testes rápidos e interface intuitiva.
- 📬 [**Postman**](https://www.postman.com/) – Bastante utilizado em times de desenvolvimento e com suporte a coleções avançadas.

💡 **Dica:**  
Você pode importar diretamente a documentação Swagger nestas ferramentas utilizando a URL: http://localhost:3000/api-json

Ou acessar a interface visual pelo Swagger:

👉 [http://localhost:3000/api](http://localhost:3000/api)

🧼 Padrão de Commits
Este projeto segue o padrão convencional:


```bash
feat: nova funcionalidade
fix: correção de bugs
chore: configuração e setup
docs: alterações na documentação
refactor: melhorias internas
```

🤝 Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues, pull requests ou sugerir melhorias.

🐛 Encontrou um problema?
Me avise por aqui:
LinkedIn – Tiago Abranges

📝 Licença
Desenvolvido com 💙 por Tiago Abranges
