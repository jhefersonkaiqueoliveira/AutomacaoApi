import { massaDeDados } from '../fixtures/massaDados'
import { criarUsuario } from '../support/helper'

describe('Exclusao de usuarios', () => {
  it('deleta usuario cadastrado com sucesso', () => {
    criarUsuario().then(({ id }) => {
      cy.request('DELETE', `${massaDeDados.endpoints.usuarios}/${id}`).then((response) => {
        expect(response.status).to.eq(massaDeDados.status.sucesso)
        expect(response.body.message).to.eq(massaDeDados.mensagens.exclusaoSucesso)

        cy.request({
          method: 'GET',
          url: `${massaDeDados.endpoints.usuarios}/${id}`,
          failOnStatusCode: false,
        }).then((searchResponse) => {
          expect(searchResponse.status).to.eq(massaDeDados.status.requisicaoInvalida)
          expect(searchResponse.body.message).to.contain(massaDeDados.mensagens.usuarioNaoEncontrado)
        })
      })
    })
  })

  it('informa quando tenta deletar usuario inexistente', () => {
    cy.request('DELETE', `${massaDeDados.endpoints.usuarios}/${massaDeDados.ids.invalido}`).then((response) => {
      expect(response.status).to.eq(massaDeDados.status.sucesso)
      expect(response.body.message).to.contain(massaDeDados.mensagens.nenhumRegistroExcluido)
    })
  })
})
