import { getProducts, addProductToCart, sumSalesTax, sumPrice, emptyShoppingCart } from '../src/taxes.js';

describe('Input 1', () => {

    beforeAll(() => {
        emptyShoppingCart();
        const products = getProducts();
        expect(products).toEqual([]);
    });

    it('Add products to the shopping cart', () => {
        addProductToCart({ name: 'book', quantity: 2, type: 'book', imported: false, price: 12.49 });
        addProductToCart({ name: 'music CD', quantity: 1, type: 'other', imported: false, price: 14.99 });
        addProductToCart({ name: 'chocolate bar', quantity: 1, type: 'food', imported: false, price: 0.85 });
    })

    it('Should return 3 products in list', () => {
        const products = getProducts();
        expect(products.length).toBe(3);
    })

    it('Should return 24.98 as total price for the book', () => {
        const products = getProducts();
        expect(products[0].price * products[0].quantity).toBe(24.98);
    })

    it('Should return 14.99 as total price for music CD', () => {
        const products = getProducts();
        expect(products[1].price * products[1].quantity).toBe(14.99);
    })

    it('Should return 0.85 as total price for the chocolate bar', () => {
        const products = getProducts();
        expect(products[2].price * products[2].quantity).toBe(0.85);
    })

    it('Should return 1.50 for total Sales Taxes of products', () => {
        const products = getProducts();
        const tax = sumSalesTax(products);
        expect(tax).toBe(1.50);
    })

    it('Should return 42.32 for total cost of products', () => {
        const products = getProducts();
        const total = sumPrice(products);
        expect(total).toBe(42.32);
    })

});


describe('Input 2', () => {

    beforeAll(() => {
        emptyShoppingCart();
        const products = getProducts();
        expect(products).toEqual([]);
    });

    it('Add products to the shopping cart', () => {
        addProductToCart({ name: 'imported box of chocolates', quantity: 1, type: 'food', imported: true, price: 10.00 });
        addProductToCart({ name: 'imported bottle of perfume', quantity: 1, type: 'other', imported: true, price: 47.50 });
    })

    it('Should return 2 products in list', () => {
        const products = getProducts();
        expect(products.length).toBe(2);
    })

    it('Should return 10.00 as total price for imported box of chocolates', () => {
        const products = getProducts();
        expect(products[0].price * products[0].quantity).toBe(10.00);
    })

    it('Should return 47.50 as total price for imported bottle of perfume', () => {
        const products = getProducts();
        expect(products[1].price * products[1].quantity).toBe(47.50);
    })

    it('Should return 1.50 for total Sales Taxes of products', () => {
        const products = getProducts();
        const tax = sumSalesTax(products);
        expect(tax).toBe(7.65);
    })

    it('Should return 65.15 for total cost of products', () => {
        const products = getProducts();
        const total = sumPrice(products);
        expect(total).toBe(65.15);
    })

});


describe('Input 3', () => {

    beforeAll(() => {
        emptyShoppingCart();
        const products = getProducts();
        expect(products).toEqual([]);
    });

    it('Add products to the shopping cart', () => {
        addProductToCart({ name: 'imported bottle of perfume', quantity: 1, type: 'other', imported: true, price: 27.99 });
        addProductToCart({ name: 'bottle of perfume', quantity: 1, type: 'other', imported: false, price: 18.99 });
        addProductToCart({ name: 'packet of headache pills', quantity: 1, type: 'medical', imported: false, price: 9.75 });
        addProductToCart({ name: 'box of imported chocolates', quantity: 3, type: 'food', imported: true, price: 11.25 });
    })

    it('Should return 4 products in list', () => {
        const products = getProducts();
        expect(products.length).toBe(4);
    })

    it('Should return 27.99 as total price for imported bottle of perfume', () => {
        const products = getProducts();
        expect(products[0].price * products[0].quantity).toBe(27.99);
    })

    it('Should return 18.99 as total price for bottle of perfume', () => {
        const products = getProducts();
        expect(products[1].price * products[1].quantity).toBe(18.99);
    })

    it('Should return 9.75 as total price for packet of headache pills', () => {
        const products = getProducts();
        expect(products[2].price * products[2].quantity).toBe(9.75);
    })

    it('Should return 33.75 as total price for box of imported chocolates', () => {
        const products = getProducts();
        expect(products[3].price * products[3].quantity).toBe(33.75);
    })

    it('Should return 7.90 for total Sales Taxes of products', () => {
        const products = getProducts();
        const tax = sumSalesTax(products);
        expect(tax).toBe(7.90);
    })

    it('Should return 98.38 for total cost of products', () => {
        const products = getProducts();
        const total = sumPrice(products);
        expect(total).toBe(98.38);
    })

});