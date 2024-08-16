describe('template spec', () => {
  //Я не чищу куки, так как - выдержка из доки: "Cypress automatically clears all cookies before each test to prevent state from being shared across tests when test isolation is enabled. You shouldn't need to use this command unless you're using it to clear specific cookies inside a single test or test isolation is disabled."

  it('попытка оформления заказа не авторизованным пользователем', () => {
    cy.intercept('/api/ingredients*', { fixture: 'ingredients.json' });

    cy.visit('http://localhost:4000');

    cy.contains('Оформить заказ')
      .click()
      .url()
      .should('eq', 'http://localhost:4000/login');
  });

  it('открытие и закрытие модалок ингредиентов по кнопке и оверлею', () => {
    cy.intercept('/api/ingredients*', { fixture: 'ingredients.json' });

    cy.visit('http://localhost:4000');

    //открыли модалку ингредиента
    cy.get('[data-ingredient="bun"]:last-of-type').click();

    //закрыли модалку ингредиента
    cy.get('[data-cy=modal]').should('be.visible');
    cy.contains('Флюоресцентная булка R2-D3');
    cy.get('button').click();
    cy.get('[data-cy=modal]').should('not.exist');

    // открытие другого ингредиента
    cy.get('[data-ingredient="main"]:first-of-type').click();

    //закрытие другого ингредиента по оверлею
    cy.get('[data-cy=modal]').should('be.visible');
    cy.contains('Биокотлета из марсианской Магнолии');
    cy.get('body').click(100, 100);
    cy.get('[data-cy=modal]').should('not.exist');
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

    cy.visit('http://localhost:4000');

    // //добавление булки
    cy.get('[data-ingredient="bun"]:first-of-type')
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-cy=bun-top]').should('contain', 'N-200i');
    cy.get('[data-cy=bun-bottom]').should('contain', 'N-200i');

    //Добавление ингредиентов

    cy.get('[data-ingredient="main"]:first-of-type')
      .contains('button', 'Добавить')
      .click();
    cy.get('[data-ingredient="main"]:nth-child(2)')
      .contains('button', 'Добавить')
      .click();
    cy.get('[data-ingredient="sauce"]:first-of-type')
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-cy=burger-constructor]').within(() => {
      cy.contains('Биокотлета из марсианской Магнолии').should('exist');
      cy.contains('Филе Люминесцентного тетраодонтимформа').should('exist');
      cy.contains('Соус Spicy-X').should('exist');
    });

    //Отправляем запрос
    cy.contains('Оформить заказ').click();
    cy.get('[data-cy="modal"]').should('be.visible').and('contain', '777');

    //Закрываем модалку
    cy.get('[data-cy="modal"]').find('button').click();
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy=burger-constructor]').within(() => {
      cy.get('[data-cy=bun-top]').should('not.exist');
      cy.get('[data-cy=bun-bottom]').should('not.exist');
      cy.contains('Биокотлета из марсианской Магнолии').should('not.exist');
      cy.contains('Филе Люминесцентного тетраодонтимформа').should('not.exist');
      cy.contains('Соус Spicy-X').should('not.exist');
    });
  });
});
