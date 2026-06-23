import { massaDeDados } from '../fixtures/massaDados'

export const gerarUsuario = (dados = {}) => ({
  ...massaDeDados.usuarios.padrao,
  email: `usuario-teste-${Date.now()}-${Math.floor(Math.random() * 1000)}@teste.com`,
  ...dados,
})

export const criarUsuario = (dados = {}) => {
  const usuario = gerarUsuario(dados)

  return cy.request('POST', massaDeDados.endpoints.usuarios, usuario).then((response) => ({
    usuario,
    id: response.body._id,
    response,
  }))
}

export const deletarUsuario = (id) => {
  if (!id) {
    return cy.wrap(null)
  }

  return cy.request({
    method: 'DELETE',
    url: `${massaDeDados.endpoints.usuarios}/${id}`,
    failOnStatusCode: false,
  })
}
