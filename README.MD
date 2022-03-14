# VaiNaWebAPI

API criada para controle de dados de usuários, no qual: nome, telefone, CPF e CEP são salvos no banco de dados.

## Instalação/Utilização

Para rodar a API utilize o comando `docker-compose up`

## Métodos

<h3 align="center">Cadastro de usuários</h3>

> POST /register - Formato da requisição

```
{
"name": "kaio",
"phone": "99999999",
"CPF": "00000000010",
"CEP": "71705025",
"Street": "avenida contorno",
"City": "Brasília",
"State": "DF"
}
```

Em caso de sucesso, a resposta será:

> POST /register - Formato da resposta - STATUS 201

```
{
  "name": "kaio",
  "phone": "99999999",
  "CPF": "00000000010",
  "CEP": "71705025",
  "Street": "Avenida Contorno Bloco 1145",
  "City": "Brasília",
  "State": "DF",
  "uuid": "2d68e2e2-eb3f-4371-bbd0-717d13b98730"
}
```
Caso esteja faltando alguma chave no corpo da requisição, a resposta será:

> POST /register - Formato da resposta - STATUS 400

```
{
  "message": "Missing fields"
}
```

<h3 align="center">Login de usuários</h3>

> POST /login - Formato da requisição

```
{
	"CPF": "00000000010"
}
```

Caso o usuário seja cadastrado, a resposta será:

> POST /login - Formato da resposta - STATUS 200

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDUEYiOiIwMDAwMDAwMDAxMCIsImlhdCI6MTY0NzI2MTY4NCwiZXhwIjoxNjQ3MzQ4MDg0fQ.l84Z07Fu-E6s93fHMRL354QjjueDXA6wYas7bpqJE3U"
}
```

Caso o usuário não esteja no banco de dados, a resposta será:

> POST /login - Formato da resposta - STATUS 401

```
{
  "message": "User not registered"
}
```

<h3 align="center">Listar usuários</h3>

Caso o usuário esteja logado e com o `Bearer: token`, a resposta será:

> GET /users - Formato da resposta - STATUS 200

```
[
{
    "uuid": "2d68e2e2-eb3f-4371-bbd0-717d13b98730",
    "name": "kaio",
    "phone": "99999999",
    "CPF": "00000000010",
    "CEP": "71705025",
    "Street": "Avenida Contorno Bloco 1145",
    "City": "Brasília",
    "State": "DF"
  },
  {
    "uuid": "616f5227-9264-4180-bb8c-738b57b3e63c",
    "name": "user",
    "phone": "99999999",
    "CPF": "00000000011",
    "CEP": "71705035",
    "Street": "Avenida Contorno Área Especial 6",
    "City": "Brasília",
    "State": "DF"
  }
]
```

Caso o usuário não esteja logado e não tenha o `Bearer: token`, a resposta será:

> GET /users - Formato da resposta - STATUS 401

```
{
  "message": "Missing authorization headers"
}
```

<h3 align="center">Listar usuário por CPF</h3>

Caso o usuário esteja logado e com o `Bearer: token`, a resposta será:

> GET /users/cpf/:cpf - Formato da resposta - STATUS 200

```
{
  "uuid": "2d68e2e2-eb3f-4371-bbd0-717d13b98730",
  "name": "kaio",
  "phone": "99999999",
  "CPF": "00000000010",
  "CEP": "71705025",
  "Street": "Avenida Contorno Bloco 1145",
  "City": "Brasília",
  "State": "DF"
}
```

Caso o usuário não esteja logado e não tenha o `Bearer: token`, a resposta será:

> GET /users/cpf/:cpf - Formato da resposta - STATUS 401

```
{
  "message": "Missing authorization headers"
}
```

<h3 align="center">Listar usuário por CEP</h3>

Caso o usuário esteja logado e com o `Bearer: token`, a resposta será:

> GET /users/cep/:cep - Formato da resposta - STATUS 200

```
[
  {
    "uuid": "2d68e2e2-eb3f-4371-bbd0-717d13b98730",
    "name": "kaio",
    "phone": "99999999",
    "CPF": "00000000010",
    "CEP": "71705025",
    "Street": "Avenida Contorno Bloco 1145",
    "City": "Brasília",
    "State": "DF"
  }
]
```

Caso o usuário não esteja logado e não tenha o `Bearer: token`, a resposta será:

> GET /users/cep/:cep - Formato da resposta - STATUS 401

```
{
  "message": "Missing authorization headers"
}
```

<h3 align="center">Editar usuário</h3>

Caso o usuário esteja logado e com o `Bearer: token`, a resposta será:

> PATCH /users/:uuid - Formato da requisição 

```
{
  "nome": "Kaio Iwakiri"
}
```

Em caso de sucesso a resposta será:

> PATCH /users/:uuid - Formato da resposta - STATUS 200 

```
  {
    "uuid": "2d68e2e2-eb3f-4371-bbd0-717d13b98730",
    "name": "Kaio Iwakiri",
    "phone": "99999999",
    "CPF": "00000000010",
    "CEP": "71705025",
    "Street": "Avenida Contorno Bloco 1145",
    "City": "Brasília",
    "State": "DF"
  }
```

<h3 align="center">Remover usuário</h3>

Caso o usuário esteja logado e com o `Bearer: token`, a resposta será:

> DELETE /users/:uuid - Formato da resposta - STATUS 200 

```
{
  "message": "User deleted with success"
}
```
