describe('add ingredients to constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('should add ingredient', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Ингредиент 1')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Ингредиент 1')
      .should('exist');

    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 2')
      .should('exist');

    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 4')
      .should('exist');
  });
});

describe('ingredient modal', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('should open modal', () => {
    cy.contains('Ingredient Details').should('not.exist');
    cy.contains('Ингредиент 1').click();
    cy.contains('Ingredient Details').should('exist');
    cy.get('#modals').contains('Ингредиент 1').should('exist');
  });

  it('should close modal on button click', () => {
    cy.contains('Ингредиент 1').click();
    cy.contains('Ingredient Details').should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.contains('Ingredient Details').should('not.exist');
  });

  it('should close modal on overlay click', () => {
    cy.contains('Ингредиент 1').click();
    cy.contains('Ingredient Details').should('exist');
    cy.get('[data-cy=modal_overlay]').click('left', { force: true });
    cy.contains('Ingredient Details').should('not.exist');
  });
});

describe('order modal', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );

    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('should order burger', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=order-summ] button').click();

    cy.wait('@postOrder').then(() => {
      cy.get('@postOrder')
        .its('request.body')
        .should('deep.equal', {
          ingredients: ['1', '2', '4', '1']
        });

      cy.get('[data-cy=order-number]').contains('11111').should('exist');
    });

    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    cy.get('[data-cy=constructor]').contains('Ингредиет 1').should('not.exist');
    cy.get('[data-cy=constructor]').contains('Ингредиет 2').should('not.exist');
    cy.get('[data-cy=constructor]').contains('Ингредиет 4').should('not.exist');
  });
});
