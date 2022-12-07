export let productsList = [];

export function getProducts() {
    return productsList;
}

export function emptyShoppingCart() {
    productsList = [];
}

export function addProductToCart(product) {
    product.totalPrice = product.quantity * product.price;
    product.salesTaxes = 0;
    product.salesTaxes = calculateBasicSalesTax(product);
    product.salesTaxes = calculateImportDutyTax(product);
    product.totalPriceTaxed = product.salesTaxes + product.totalPrice;
    productsList.push(product);
}

export function calculateBasicSalesTax(prod) {
    const tax = isExcludedFromBasicTax(prod.type) ? prod.salesTaxes : Number(prod.salesTaxes + (0.10 * prod.totalPrice));
    return tax;
}

export function calculateImportDutyTax(prod) {
    const tax = isExcludedFromImportDutyTax(prod.imported) ? prod.salesTaxes : Number(prod.salesTaxes + (0.05 * prod.totalPrice));
    return tax;
}

export function sumSalesTax(products) {
    const total = products.reduce(function (sum, product) {
        return sum + product.salesTaxes;
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
        return sum + (product.totalPrice + product.salesTaxes);
    }, 0);

    const totalTax = productsList.reduce(function (sum, product) {
        return sum + product.salesTaxes;
    }, 0);

    let output = ``;

    for (const p in productsList) {
        let product = productsList[p];
        output += `${product.quantity} ${product.name}: ${(product.totalPrice + product.salesTaxes).toFixed(2)}\n`
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
