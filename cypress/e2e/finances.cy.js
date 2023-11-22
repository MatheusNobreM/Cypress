

describe('Transações', () => {

    // hooks -> executar antes ou depois / de cada ou todos os testes
    // before -> 1 antes de todos os testes
    // after ->  1 depois de todos os testes
    // beforeEach -> antes de cada testes
    // afterEach -> depois de todos os testes

    beforeEach(() => {
        cy.visit("https://devfinance-agilizei.netlify.app/#")
    });

    it('Cadastrar uma entrada', () => {

        criarTransacao("Freela", 250)
        cy.get("tbody tr td.description").should("have.text", "Freela")
    });

    it('Cadastrar uma saída', () => {

        criarTransacao("Cinema", -45)
        cy.get("tbody tr td.description").should("have.text", "Cinema")
    });

    it('Exxluir transação', () => {
        criarTransacao('Freela', 100)
        criarTransacao('Mesada', 50)

        // cy.contains('.description', 'Freela') // td -> referencia
        //  .parent() // tr
        //  .find('img') // elemento que a gente precisa
        //  .click()

        cy.contains('.description', 'Freela')
          .siblings()
          .children('img')
          .click()

         //cy.get('tbody tr').should("have.lenght", 1)
    })
});

function criarTransacao(descricao,valor) {
    cy.contains("Nova Transação").click()
    cy.get('#description').type(descricao)
    cy.get('#amount').type(valor)
    cy.get('#date').type("2023-02-04") // yyyy-mm-dd

    cy.contains('button', 'Salvar').click()
}
