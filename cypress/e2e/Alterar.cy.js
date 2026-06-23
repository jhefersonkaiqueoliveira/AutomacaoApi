import { massaDeDados } from '../fixtures/massaDados'
import { criarUsuario, gerarUsuario, deletarUsuario } from '../support/helper'

describe('Alteracao de usuarios', () => {
  it('altera usuario cadastrado com sucesso', () => {
    criarUsuario().then(({ id }) => {
      const usuarioAlterado = gerarUsuario({
        ...massaDeDados.usuarios.alterado,
      })

      cy.request('PUT', `${massaDeDados.endpoints.usuarios}/${id}`, usuarioAlterado).then((response) => {
        expect(response.status).to.eq(massaDeDados.status.sucesso)
        expect(response.body.message).to.eq(massaDeDados.mensagens.alteracaoSucesso)

        cy.request('GET', `${massaDeDados.endpoints.usuarios}/${id}`).then((searchResponse) => {
          expect(searchResponse.status).to.eq(massaDeDados.status.sucesso)
          expect(searchResponse.body[massaDeDados.propriedades.nome]).to.eq(usuarioAlterado.nome)
          expect(searchResponse.body[massaDeDados.propriedades.email]).to.eq(usuarioAlterado.email)
          expect(searchResponse.body[massaDeDados.propriedades.password]).to.eq(usuarioAlterado.password)
          expect(searchResponse.body[massaDeDados.propriedades.administrador]).to.eq(usuarioAlterado.administrador)

          deletarUsuario(id)
        })
      })
    })
  })

  it('nao altera usuario quando body esta vazio', () => {
    criarUsuario().then(({ id }) => {
      cy.request({
        method: 'PUT',
        url: `${massaDeDados.endpoints.usuarios}/${id}`,
        body: {},
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(massaDeDados.status.requisicaoInvalida)
        
        deletarUsuario(id)
      })
    })
  })

  it('nao altera usuario usando email ja cadastrado em outro usuario', () => {
    criarUsuario().then(({ usuario: primeiroUsuario, id: primeiroId }) => {
      criarUsuario().then(({ usuario: segundoUsuario, id: segundoId }) => {
        cy.request({
          method: 'PUT',
          url: `${massaDeDados.endpoints.usuarios}/${segundoId}`,
          body: {
            ...segundoUsuario,
            email: primeiroUsuario.email,
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(massaDeDados.status.requisicaoInvalida)
          expect(response.body.message).to.contain(massaDeDados.mensagens.emailJaUtilizado)

          deletarUsuario(primeiroId)
          deletarUsuario(segundoId)
        })
      })
    })
  })
})
