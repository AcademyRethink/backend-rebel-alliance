# Backend Rebel Alliance - Dashboard Agropecuário 👨‍🌾
### Sumário 📇
:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Funcionalidades](#funcionalidades)

:small_blue_diamond: [Iniciar](#iniciar)

:small_blue_diamond: [Testes](#testes)

:small_blue_diamond: [Tecnologias Utilizadas](#tecnologias-utilizadas)

:small_blue_diamond: [Squad](#squad)


### Descrição do projeto 

Desenvolvimento de uma API para gerenciamento de plantações de café

### Funcionalidades 

- Gereciamento de usuários
- Gerenciamento de fazendas
- Gerenciamento de plantios
- Gereciamento de colheitas
- Gerenciamento de etapas da plantação
- Gerenciamento do clima tempo
- Autenticação do usuário
- Criptografia de senha

>Para mais detalhes de rotas e funcionalidades: [Documentação API](https://docs.google.com/document/d/102ZZbmlU8LY9_RFKkPquUC4aj4eb8DZm72hfu0Bdgj4/edit)

### Iniciar 

Pré-requisitos:
* Git
* Node.js

No terminal, clone o projeto:

```
git clone git@github.com:AcademyRethink/backend-rebel-alliance.git
```

Acesse a pasta do projeto:

```
cd backend-rebel-alliance
```

Instale as dependências do projeto

```
npm i 
```

Crie e configure um arquivo `.env` com o link e senha do banco de dados

```
PG_CONNECTION_STRING = seuLink&suaSenha
```

Rode o comando abaixo para criar as tabelas no banco de dados

```
npx knex migrate:latest
```

Rode a aplicação 

```
npm start
```

Abra http://localhost:3000 no seu navegador 

### Testes 

* A cobertura de testes atual é de `88%`

### Tecnologias utilizadas 
- [Node](https://nodejs.org/en)
- [Typescrit](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Knex](https://knexjs.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [Bycript](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/)

>Para mais detalhes de linguagem e tecnologias utilizadas: [Documentação Técnica](https://docs.google.com/document/d/1Sriv2o5rSRV0hk43Ewk64vQ6elVtazbR/edit)

### Squad 

<div align="center">
  <img src="https://github.com/AcademyRethink/backend-rebel-alliance/assets/124922051/b21a6f5d-e441-46fd-bb56-fa9b848988dc" alt="Ana" width="60" height="60">
  <img src="https://github.com/AcademyRethink/backend-rebel-alliance/assets/124922051/81471041-776c-4802-973c-976f0f6bca63" alt="Hian" width="60" height="60">
  <img src="https://github.com/AcademyRethink/backend-rebel-alliance/assets/124922051/4b5c1a4c-3dda-48ae-b197-2b59437e5ed2" alt="José" width="60" height="60">
  <img src="https://github.com/AcademyRethink/backend-rebel-alliance/assets/124922051/850abc1b-b1ed-4f97-b6e3-366ac3465e0d" alt="Leticia" width="60" height="60">
  <img src="https://github.com/AcademyRethink/backend-rebel-alliance/assets/124922051/f001b245-3428-43f6-95ec-4b2fab6cd6c8" alt="Thiago" width="60" height="60">
  <img src="https://github.com/AcademyRethink/backend-rebel-alliance/assets/124922051/745b237d-4608-4b63-95a2-a7b2509f3e99" alt="Vinicius" width="60" height="60">
  <img src="https://github.com/AcademyRethink/backend-rebel-alliance/assets/124922051/974a6461-9c1f-4890-a324-d78090c28d72)" alt="Yuri" width="60" height="60">
</div>
<div align="center">
Ana - Hian - José - Leticia - Thiago - Vinicius - Yuri
</div>
