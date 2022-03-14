# VaiNaWebAPI

API criada para controle de dados de usuários, no qual: nome, telefone, CPF e CEP são salvos no banco de dados.

## Instalação/Utilização

Para rodar a API utilize o comando docker-compose up

## Métodos

<h3 align="center">Cadastro de usuários</h3>

POST /register - Formato da requisição

{
"name": "kaio",
"phone": "99999999",
"CPF": "00000000009",
"CEP": "71705025",
"Street": "avenida contorno",
"City": "Brasília",
"State": "DF"
}
