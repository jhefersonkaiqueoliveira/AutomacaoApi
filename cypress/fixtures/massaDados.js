export const massaDeDados = {
  endpoints: {
    usuarios: '/usuarios',
  },
  status: {
    sucesso: 200,
    criado: 201,
    requisicaoInvalida: 400,
  },
  mensagens: {
    cadastroSucesso: 'Cadastro realizado com sucesso',
    alteracaoSucesso: 'Registro alterado com sucesso',
    exclusaoSucesso: 'Registro excluído com sucesso',
    emailJaUtilizado: 'Este email já está sendo usado',
    usuarioNaoEncontrado: 'Usuário não encontrado',
    nenhumRegistroExcluido: 'Nenhum registro excluído',
    idDeveTer16Caracteres: 'id deve ter exatamente 16 caracteres alfanuméricos',
  },
  propriedades: {
    id: '_id',
    nome: 'nome',
    email: 'email',
    password: 'password',
    administrador: 'administrador',
    quantidade: 'quantidade',
    message: 'message',
    usuarios: 'usuarios',
  },
  ids: {
    invalido: 'id-inexistente',
    validoInexistente: '1234567890abcdef',
  },
  usuarios: {
    padrao: {
      nome: 'Usuario teste',
      password: 'teste',
      administrador: 'true',
    },
    alterado: {
      nome: 'Usuario alterado',
      password: 'teste123',
      administrador: 'false',
    },
    patch: {
      nome: 'Usuario Teste patch',
      password: 'teste123',
      administrador: 'false',
    },
  },
}
