import { createYield } from "typescript";

describe('Бургерная', function() {

    // 0.
    before(function() {
        cy.visit('http://localhost:3000');
        cy.contains('Соберите бургер');
    });

    beforeEach(function() {
        cy.intercept('/api/auth/login', { fixture: "login.json" });
        cy.intercept("GET", "/api/auth/user", { fixture: "user.json" });
        cy.intercept("POST", "/api/orders", { fixture: "order.json" });

        window.localStorage.setItem("refreshToken","fake");
        cy.setCookie('accessToken', 'Bearer fake');
    });

    // 1.
    it('перетаскивание ингредиента в конструктор', function() {
        cy.get('[class^=ingredient-element_card__]').first().as('product');
        cy.get('[class^=ingredient-element_card__]').eq(3).as('product2');
        cy.get('[class^=constructor_right]').as('right');
        cy.get('@right').find('div').first().as('cart');

        cy.get('@product').trigger('dragstart');
        cy.get('@cart').trigger('drop') ;

        cy.get('@product2').trigger('dragstart');
        cy.get('@cart').trigger('drop') ;
    });

    // 2.
    it('открытие модального окна с описанием ингредиента', function() {
        cy.get('[class^=ingredient-element_card__]').first().as('product');
        cy.get('@product').first().click();
    });

    // 3.
    it('отображение в модальном окне данных ингредиента', function() {
        cy.get('[class^=modal_modal]').first().as('modal');
        cy.get('@modal').contains('Детали ингредиента');
        cy.get('@modal').find('[class^=ingredient-details_name]').as('description');
        cy.get('@description').contains('булка');

        cy.get('@modal').find('svg').as('close');
        cy.get('@close').click();
    });

    // 4.
    it('открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»', function() {
        cy.get('[class^=button_button]').as('orderCreateButton');
        cy.get('@orderCreateButton').click();
    });

    // 5.
    it('закрытие модальных окон при клике на кнопку закрытия', function() {
        cy.get('[class^=modal_modal]').as('modal');
        cy.get('@modal').last().find('svg').as('closes');
        cy.get('@closes').click();
    });

}); 