export let productsList = [];

export function getProducts() {
    return productsList;
}

export function emptyShoppingCart() {
    productsList = [];
}

export function addProductToCart(product) {
    product.totalPrice = product.quantity * product.price;
    const { totalSalesTax, totalPriceTaxed } = calculateSalesTax(product);
    product = { ...product, totalSalesTax, totalPriceTaxed };
    productsList.push(product);
}

export function calculateSalesTax(prod) {

    let taxPercentage = isExcludedFromBasicTax(prod.type) ? 0 : 10;
    taxPercentage = isExcludedFromImportDutyTax(prod.imported) ? taxPercentage : taxPercentage + 5;
    
    const salesTaxesNotRounder = Number((prod.price) * taxPercentage / 100);
    const salesTaxes = Number((Math.ceil(salesTaxesNotRounder * 20) / 20).toFixed(2));
    const result = prod.price + salesTaxes;
    const totalPriceTaxed = Number((prod.quantity * result).toFixed(2));
    const totalSalesTax = Number((prod.quantity * salesTaxes).toFixed(2));
    return { totalSalesTax, totalPriceTaxed };
}

export function sumSalesTax(products) {
    const total = products.reduce(function (sum, product) {
        return sum + product.totalSalesTax;
    }, 0);

    return Number(total.toFixed(2));
}

export function sumPrice(products) {
    const total = products.reduce(function (sum, product) {
        return sum + product.totalPriceTaxed;
    }, 0);

    return Number(total.toFixed(2));
}

export function printReceipt() {
    const totalPrice = productsList.reduce(function (sum, product) {
        return sum + (product.totalPrice + product.totalSalesTax);
    }, 0);

    const totalTax = productsList.reduce(function (sum, product) {
        return sum + product.totalSalesTax;
    }, 0);

    let output = ``;

    for (const p in productsList) {
        let product = productsList[p];
        output += `${product.quantity} ${product.name}: ${(product.totalPrice + product.totalSalesTax).toFixed(2)}\n`
    }

    output += `Sales Taxes: ${totalTax.toFixed(2)}\n`;
    output += `Total: ${totalPrice.toFixed(2)}`;

    return output;
}

function isExcludedFromBasicTax(type) {
    const excludeFromTax = ['book', 'food', 'medical'];
    let excluded = excludeFromTax.includes(type) ? true : false;
    return excluded;
}

function isExcludedFromImportDutyTax(imported) {
    let excluded = imported === true ? false : true;
    return excluded;
}
