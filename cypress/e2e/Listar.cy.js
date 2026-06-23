import { massaDeDados } from '../fixtures/massaDados'
import { criarUsuario, deletarUsuario } from '../support/usuariosHelper'

describe('Listagem de usuarios', () => {
  it('lista usuarios cadastrados', () => {
    criarUsuario().then(({ id }) => {
      cy.request('GET', massaDeDados.endpoints.usuarios).then((response) => {
        const usuarioCriado = response.body[massaDeDados.propriedades.usuarios]
          .find((usuario) => usuario[massaDeDados.propriedades.id] === id)

        expect(response.status).to.eq(massaDeDados.status.sucesso)
        expect(response.body).to.have.property(massaDeDados.propriedades.usuarios)
        expect(usuarioCriado).to.exist

        deletarUsuario(id)
      })
    })
  })

  it('lista usuario filtrando por email cadastrado', () => {
    criarUsuario().then(({ usuario, id }) => {
      cy.request('GET', `${massaDeDados.endpoints.usuarios}?email=${usuario.email}`).then((response) => {
        expect(response.status).to.eq(massaDeDados.status.sucesso)
        expect(response.body[massaDeDados.propriedades.quantidade]).to.eq(1)
        expect(response.body[massaDeDados.propriedades.usuarios][0][massaDeDados.propriedades.email]).to.eq(usuario.email)
        expect(response.body[massaDeDados.propriedades.usuarios][0][massaDeDados.propriedades.id]).to.eq(id)

        deletarUsuario(id)
      })
    })
  })

  it('retorna lista vazia ao filtrar por email inexistente', () => {
    const emailInexistente = `usuario-inexistente-${Date.now()}@teste.com`

    cy.request('GET', `${massaDeDados.endpoints.usuarios}?email=${emailInexistente}`).then((response) => {
      expect(response.status).to.eq(massaDeDados.status.sucesso)
      expect(response.body[massaDeDados.propriedades.quantidade]).to.eq(0)
      expect(response.body[massaDeDados.propriedades.usuarios]).to.be.empty
    })
  })
})
