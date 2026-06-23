import { massaDeDados } from '../fixtures/massaDados'
import { criarUsuario, deletarUsuario } from '../support/helper'

describe('Busca de usuarios', () => {
  it.only('busca usuario cadastrado com sucesso', () => {
    criarUsuario().then(({ usuario, id }) => {
      cy.request('GET', `${massaDeDados.endpoints.usuarios}/${id}`).then((response) => {
        expect(response.status).to.eq(massaDeDados.status.sucesso)
        expect(response.body[massaDeDados.propriedades.id]).to.eq(id)

        deletarUsuario(id)
      })
    })
  })

  it('nao busca usuario com id fora do padrao esperado', () => {
    cy.request({
      method: 'GET',
      url: `${massaDeDados.endpoints.usuarios}/${massaDeDados.ids.invalido}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(massaDeDados.status.requisicaoInvalida)
      expect(response.body.id).to.contain(massaDeDados.mensagens.idDeveTer16Caracteres)
    })
  })

  it('nao encontra usuario com id valido inexistente', () => {
    cy.request({
      method: 'GET',
      url: `${massaDeDados.endpoints.usuarios}/${massaDeDados.ids.validoInexistente}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(massaDeDados.status.requisicaoInvalida)
      expect(response.body.message).to.contain(massaDeDados.mensagens.usuarioNaoEncontrado)
    })
  })
})
