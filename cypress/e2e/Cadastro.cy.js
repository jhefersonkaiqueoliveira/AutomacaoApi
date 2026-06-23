import { massaDeDados } from '../fixtures/massaDados'
import { criarUsuario, gerarUsuario, deletarUsuario } from '../support/helper'

describe.only('Cadastro de usuarios', () => {
  it('cadastra usuario com sucesso', () => {
    const usuario = gerarUsuario()

    cy.request('POST', massaDeDados.endpoints.usuarios, usuario).then((response) => {
      expect(response.status).to.eq(massaDeDados.status.criado)
      expect(response.body.message).to.eq(massaDeDados.mensagens.cadastroSucesso)
      expect(response.body[massaDeDados.propriedades.id]).to.not.be.empty

      deletarUsuario(response.body[massaDeDados.propriedades.id])
    })
  })

  it('nao cadastra usuario sem os campos obrigatorios do body', () => {
    cy.request({
      method: 'POST',
      url: massaDeDados.endpoints.usuarios,
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(massaDeDados.status.requisicaoInvalida)
      expect(response.body).to.have.property(massaDeDados.propriedades.nome)
      expect(response.body).to.have.property(massaDeDados.propriedades.email)
      expect(response.body).to.have.property(massaDeDados.propriedades.password)
      expect(response.body).to.have.property(massaDeDados.propriedades.administrador)
    })
  })

  it('nao cadastra usuario com email ja utilizado', () => {
    criarUsuario().then(({ usuario, id }) => {
      cy.request({
        method: 'POST',
        url: massaDeDados.endpoints.usuarios,
        body: usuario,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(massaDeDados.status.requisicaoInvalida)
        expect(response.body.message).to.contain(massaDeDados.mensagens.emailJaUtilizado)

        deletarUsuario(id)
      })
    })
  })
})
