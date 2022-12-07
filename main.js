
import { addProductToCart, emptyShoppingCart, printReceipt } from './src/taxes.js';
import { input1, input2, input3 } from './src/inputs.js'

function printShoppingCartReceipt(input){
  emptyShoppingCart();
  for (let i = 0; i < input.length; i++) {
    addProductToCart(input[i]);
  }

  let receipt = printReceipt();
  console.log(receipt + '\n');
}

printShoppingCartReceipt(input1);
printShoppingCartReceipt(input2);
printShoppingCartReceipt(input3); 