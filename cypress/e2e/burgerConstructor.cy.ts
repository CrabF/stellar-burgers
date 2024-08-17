import { first } from 'cypress/types/lodash';

describe('template spec', () => {
  //Я не чищу куки, так как - выдержка из доки: "Cypress automatically clears all cookies before each test to prevent state from being shared across tests when test isolation is enabled. You shouldn't need to use this command unless you're using it to clear specific cookies inside a single test or test isolation is disabled."

  it('попытка оформления заказа не авторизованным пользователем', () => {
    cy.intercept('/api/ingredients*', { fixture: 'ingredients.json' });

    cy.visit('/');

    cy.contains('Оформить заказ').click().url().should('include', '/login');
  });

  it('открытие и закрытие модалок ингредиентов по кнопке и оверлею', () => {
    cy.intercept('/api/ingredients*', { fixture: 'ingredients.json' });

    cy.visit('/');

    //Селекторы
    const MODAL_SELECTOR = '[data-cy=modal]';
    const BUN_SELECTOR = '[data-ingredient="bun"]';
    const MAIN_SELECTOR = '[data-ingredient="main"]';

    //alias
    cy.get(BUN_SELECTOR).as('bun');

    //открыли модалку ингредиента
    cy.get('@bun').last().click();

    //alias
    cy.get(MODAL_SELECTOR).as('modal');

    //закрыли модалку ингредиента
    cy.get('@modal').should('be.visible');
    cy.contains('Флюоресцентная булка R2-D3');
    cy.get('button').click();
    cy.get('@modal').should('not.exist');

    //alias
    cy.get(MAIN_SELECTOR).as('main');

    // открытие другого ингредиента
    cy.get('@main').first().click();

    //закрытие другого ингредиента по оверлею
    cy.get('@modal').should('be.visible');
    cy.contains('Биокотлета из марсианской Магнолии');
    cy.get('body').click(100, 100);
    cy.get('@modal').should('not.exist');
  });

  it('попытка оформления заказа авторизованным пользователем', () => {
    cy.intercept('/api/ingredients*', { fixture: 'ingredients.json' });
    cy.intercept('/api/auth/*', {
      success: true,
      user: {
        email: 'mail@mail.ru',
        name: 'Именное имя'
      }
    });
    cy.intercept('/api/orders*', { fixture: 'orderResponse.json' });

    cy.setCookie('accessToken', 'mockToken');
    localStorage.setItem('refreshToken', 'mockToken');

    cy.visit('/');

    //Селекторы
    const MODAL_SELECTOR = '[data-cy=modal]';
    const BUN_SELECTOR = '[data-ingredient="bun"]';
    const MAIN_SELECTOR = '[data-ingredient="main"]';
    const SAUCE_SELECTOR = '[data-ingredient="sauce"]';
    const TOP_BUN = '[data-cy=bun-top]';
    const BOTTOM_BUN = '[data-cy=bun-bottom]';
    const CONSTRUCTOR_SELECTOR = '[data-cy=burger-constructor]';

    // //добавление булки
    cy.get(BUN_SELECTOR).as('bun');
    cy.get('@bun').first().contains('button', 'Добавить').click();

    cy.get(TOP_BUN).as('topBun');
    cy.get(BOTTOM_BUN).as('bottomBun');
    cy.get('@topBun').should('contain', 'N-200i');
    cy.get('@bottomBun').should('contain', 'N-200i');

    //Добавление ингредиентов

    cy.get(MAIN_SELECTOR).as('main');
    cy.get('@main').first().contains('button', 'Добавить').click();
    cy.get('@main').eq(1).contains('button', 'Добавить').click();
    cy.get(SAUCE_SELECTOR).as('sauce');
    cy.get('@sauce').first().contains('button', 'Добавить').click();

    cy.get(CONSTRUCTOR_SELECTOR).as('constructor');
    cy.get('@constructor').within(() => {
      cy.contains('Биокотлета из марсианской Магнолии').should('exist');
      cy.contains('Филе Люминесцентного тетраодонтимформа').should('exist');
      cy.contains('Соус Spicy-X').should('exist');
    });

    //Отправляем запрос
    cy.contains('Оформить заказ').click();
    cy.get(MODAL_SELECTOR).as('modal');
    cy.get('@modal').should('be.visible').and('contain', '777');

    //Закрываем модалку
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('not.exist');
    cy.get('@constructor').within(() => {
      cy.get('@topBun').should('not.exist');
      cy.get('@bottomBun').should('not.exist');
      cy.contains('Биокотлета из марсианской Магнолии').should('not.exist');
      cy.contains('Филе Люминесцентного тетраодонтимформа').should('not.exist');
      cy.contains('Соус Spicy-X').should('not.exist');
    });
  });
});
