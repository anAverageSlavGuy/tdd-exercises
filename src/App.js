import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { addProductToCart, emptyShoppingCart, printReceipt, getProducts } from './taxes.js';

function App() {

  const [receipt, setReceipt] = useState('');

  const name = useRef('');
  const quantity = useRef('');
  const type = useRef('');
  const imported = useRef(null);
  const price = useRef('');


  const showReceipt = () => {
    const result = printReceipt();
    setReceipt(result);
  }

  const addProduct = () => {
    let product = {};
    product.name = name.current.value || alert('Invalid name');
    product.quantity = Number(quantity.current.value) || alert('Invalid quantity');
    product.type = type.current.value || alert('Invalid type');
    product.imported = imported.current.checked;
    product.price = Number(price.current.value) || alert('Invalid type');
    console.log(product);
    addProductToCart(product);
  }

  const clearCart = () => {
    emptyShoppingCart();
    const result = getProducts();
    setReceipt(result);
  }

  return (
    <div className="App">
      <div className="container">
        <form className="mt-5 align-items-center d-flex">
          <div className="form-row align-items-center d-flex gap-2 justify-content-center m-auto">
            <div className="col-auto">
              <label className="sr-only" htmlFor="inputName">Name</label>
              <input ref={name} type="text" className="form-control mb-2" id="inputName" placeholder="cook book" />
            </div>
            <div className="col-auto">
              <label className="sr-only" htmlFor="inputQuantity">Quantity</label>
              <input ref={quantity} type="number" className="form-control mb-2" id="inputQuantity" placeholder={1} />
            </div>
            <div className="col-auto">
              <label className="sr-only" htmlFor="inputType">Type</label>
              <input ref={type} type="text" className="form-control mb-2" id="inputType" placeholder="book" />
            </div>
            <div className="col-auto mb-1">
              <input ref={imported} className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Imported
              </label>
            </div>
            <div className="col-auto">
              <label className="sr-only" htmlFor="inputPrice">Price</label>
              <input ref={price} type="number" className="form-control mb-2" id="inputPrice" placeholder="12.49" />
            </div>
          </div>
        </form>
        <div className="row justify-content-center">
          <div className="col-auto">
            <button type="button" className="btn btn-primary mt-2" onClick={() => addProduct()}>Add to cart</button>
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-danger mt-2" onClick={() => clearCart()}>Empty cart</button>
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-success mt-2" onClick={() => showReceipt()}>Print receipt</button>
          </div>
        </div>

        <pre className="d-flex justify-content-center mt-4">
          {receipt}
        </pre>
      </div>

    </div>
  );
}

export default App;
