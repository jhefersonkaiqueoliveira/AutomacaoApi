# Automacao de APIs com Cypress

# Pre-requisitos

- Node.js 20 ou superior

# Instalar e executar

cd api
npm install
npm test

## Cenarios cobertos

- Criar usuario(Cadastro com sucesso, tentativa de cadastro sem informar body, nao cadastrar 2 emails iguais)
- Listar usuarios(Lista usuarios cadastros, lista usuario por email cadastrado, erro ao tentar listar email inexistente)
- Buscar usuario por id(Busca usuario por id, buscar por id invalido, busca por usuario inexistente)
- Alterar usuario(Alterar cadastro, alterar com body vazio, alterar com email ja existente)
- Excluir usuario(Deleta usuario, deleta usuario inexistente)

## Observação

Os cenarios são feitos de forma que cada a cada execução seja criada uma massa de dados, em seguida seja feita a execução do cenario proposto e por fim a exclusão do mesmo. 
