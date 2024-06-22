/*
how to generate html of checkout using java script?
1.get the id of each product from cart(import cart).
2.using its id get product name, image, price and related info from roducts.js file (imporrt products).
3.plugin the above info into html contained variable
4.add all cart products to html container.
5.insert html's container value into web page using DOM concept.
6.finished.
 */
import { cart, removeFromCart, getProduct, updateCartDelivery } from "./cart.js";
import { products,loadProducts } from "../data/products.js";
import { centsToDollar } from "./cent-to-dollar.js";
import { deliveryOptions } from "./deliveryDateOption.js";
import { renderCheckOutHeader } from "./checkout/checkoutHeader.js";
import { deliveryDateGenrator } from "./weekend.js";
//import './backend.js';
//import '../data/car.js';
//import './cart-class.js';
//import { cartHTML } from "./amazon.js";

loadProducts(()=>{
  displayCheckout();
});

let checkoutHTML = '';
const checkoutGrid = document.querySelector('.detail-info-grid');

function displayCheckout() {
  let header = document.querySelector('.header');
  checkoutHTML = '';
  cart.forEach((cartItem) => {
    htmlGenerator(cartItem.id, cartItem.quantity, cartItem);
  });
  checkoutGrid.innerHTML = checkoutHTML;
  renderCheckOutHeader(header);
  paymentSummary();
  deliveryOptionInteractive();
  updateSave();
  deletedCartProduct();

}




function htmlGenerator(id, quantity, cartItemOption) {
  let cartItem;
  products.forEach((product) => {
    if (product.id === id) {
      cartItem = product;
      return cartItem;
    }
  });
  //make interactive to display delivery date selected
  let deliveryDate;
  deliveryOptions.forEach((deliveryOption) => {
    if (deliveryOption.deliveryOptionId === cartItemOption.deliveryOptionId) {
      deliveryDate = deliveryDateGenrator(deliveryOption.deliveryDate);
    }
  });


  if (cartItem) {
    checkoutHTML += `
    <div class="individual-product-grid">
          <div >
            <h3 class="delivery-date green">Delivery:${deliveryDate}</h3>
          </div>
          <div class="main-detail">
            <img src="../${cartItem.image}" class="checkout-image">
            <div class="modifiy-checkout">
              <p class="bold">${cartItem.name}</p>
              <p class="price red">$${centsToDollar(cartItem.priceCents)}</p>
              <div class="complex">
              <p style="display:inline-block;">Quantity:<span class="quantity-${cartItem.id}">${quantity}</span></p><div class=" update-saving update-save-${cartItem.id}"></div>
               <p class="update" data-update-product-id="${cartItem.id}">Update</p>
               <span class="delete" data-product-delete="${cartItem.id}">Delete</span>
               </div>
            
            </div>
            <div class="delivery-date-grid">
              <p class="bold choose">choose a delivery option:</p>
              ${deliveryOptionDateHTML(cartItemOption)}
              
            </div>
          </div>
       </div>`;
  }
}

/*
how to make delete is interactive?
1.get the Id of product using dataset method, which delete will clicked: set unique  data id of the product also to the delete element
2.addEventListener to delete element so as to remove the product from the cart as well as from checkout page.
3.delete product from cart and display cart in checkout page.
3.0 how to delete the product?
3.1. using function recieve id of clicked product from addEventListener
3.2. applay forEach method on cart in order to find the product.
    if product is find remove it using splice method.
    if not itrate over and over again untill product is found.
4. refresh checkout page after calling removeFromCart() method.
5.finished.
*/
function deletedCartProduct() {

  const deletedProduct = document.querySelectorAll('.delete');
  deletedProduct.forEach((toDelete) => {
    toDelete.addEventListener('click', () => {
      const productId = toDelete.dataset.productDelete;
      removeFromCart(productId);
      displayCheckout();

    });
  });
}

/* how to make update element interactive?
1.give unique and general class name, data propery of  each update element.
2.when update is clicked set innerHTML of update element empty string.
3.0 create empty div element with class name and data property.to use later.
3.display input and save element with unique class name and data propery.
4.when save is clicked,set container div emepty string and   set update element innerHTML is orginal update.
5.make cart quantity and cart data be updated when the above steps proformed.
6.finished.
use:data property to separate given product from other.
    forEach method to iterate some function over given array based data.
    addEventListen to add event for update elements.
    dataset to get the data propery of the given element.
    one save and input element at a time which is inserted using java script code.
    don't focus on the view rather that the functionality of the java script code.
    if problem,never give up! think about since you are software engineer who should have to solve more complex real world problem.

tip: make quantity value displayed inside input when update element is removed.
//I have gone some step u should appear and disappear 
*/
function updateSave() {

  const updateElements = document.querySelectorAll('.update');
  updateElements.forEach((element) => {
    let Id = element.dataset.updateProductId;
    element.addEventListener('click', () => {
      let updateSave = document.querySelector(`.update-save-${Id}`);
      let quantityNo = document.querySelector(`.quantity-${Id}`);
      let currentQuantity = quantityNo.innerHTML;
      quantityNo.innerHTML = '';
      element.innerHTML = '';
      currentQuantity = Number(currentQuantity);
      updateSave.innerHTML = `<input type="number" value="2" class="input-quantity input-${Id}" min="1"><span class="save save-${Id}">Save</span>`;
      document.querySelector(`.input-${Id}`).value = currentQuantity;
      saveUpdated(element, Id);
    });
  });
}

function saveUpdated(element, Id) {
  let updateSaver = document.querySelector(`.update-save-${Id}`);
  let saveElement = document.querySelector(`.save-${Id}`);
  let quantityNo = document.querySelector(`.quantity-${Id}`);
  saveElement.addEventListener('click', () => {
    let inputValue = Number(document.querySelector(`.input-${Id}`).value);
    quantityNo.innerHTML = inputValue;
    updateSaver.innerHTML = '';
    let checkoutItem = getProduct(Id);
    checkoutItem.quantity = inputValue;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCheckout();
    element.innerHTML = 'Update';
  });
}

/*
how to make shipping date is interactive??
when shipping is clicked:
  =>change the data of delivery date,the price of order summary should be changed.
  =>the radio button of selected date must be checked.
  =>when the webpage is reload ,the result of the about change must be consistence.
  to do so, use normalizing data software engineering principle and storing data in local storage.
            MVC method of software engineering,model view control
             |M|--------*|V|
              *         /
               \       /
                \     /
                 \   *
                  |C|
                
                  let us dive into:
algorithm:
1. create new array which will contain three information namely, quantityOptionId,priceCents for each three day of delivery.
2.add defualt deliveryOptionId for each product in the cart (1).
using the deliveryoptionId of cart much id of deliveryoption Id and then give data and price as desired.
3. calculate price beforetax, tax,total, total before tax.
and display on the order summery of part of web pages.
                  

*/
function deliveryOptionDateHTML(cartItem) {
  let deliveryOptionHTML = ``;
  deliveryOptions.forEach((deliveryOption) => {
    let deliveryDate = deliveryDateGenrator(deliveryOption.deliveryDate);
    let deliveryPrice = deliveryOption.deliveryPriceCents === 0 ? `Free` : `$${centsToDollar(deliveryOption.deliveryPriceCents)}-`;
    let isChecked = deliveryOption.deliveryOptionId == cartItem.deliveryOptionId;
    let checking = isChecked ? 'checked' : '';
    deliveryOptionHTML += `
    
      <div class="delivery-option" data-product-id=${cartItem.id} data-delivery-option-id=${deliveryOption.deliveryOptionId}>
          <input type="radio" name="${cartItem.id}" ${checking}>
        <div>
          <p class="delivery-day green">${deliveryDate}</p>
          <p class="shipping-fee-text">${deliveryPrice} Shipping</p>
        </div>
     </div>`
  });
  return deliveryOptionHTML;
}

/*
how to update delivery option id of cart when deliverydate is clicked.
1. get all deliverydate and then add event listner
1.1 get unique id and deliveryId of deliverydate using document.queryselector
2.find cart iterm using its id and then add event listner to update cart delivery optionId.
3.generate webpage 
4.finished.


*/
function deliveryOptionInteractive() {
  let deliverydays = document.querySelectorAll('.delivery-option');
  deliverydays.forEach((deliveryday) => {
    deliveryday.addEventListener('click', () => {
      let deliveryOptionId = deliveryday.dataset.deliveryOptionId;
      let productId = deliveryday.dataset.productId;
      updateCartDelivery(productId, deliveryOptionId);
      displayCheckout();

    });
  });
}

function shippingPrice(quantity, deliveryOptionId) {
  let shippPrice = 0;
  if (deliveryOptionId === '2') {
    shippPrice += quantity * centsToDollar(deliveryOptions[1].deliveryPriceCents);
  }
  else if (deliveryOptionId === '3') {
    shippPrice += quantity * centsToDollar(deliveryOptions[2].deliveryPriceCents);
  }
  return shippPrice;
}



function paymentSummary() {
  const orderSummaryContainer = document.querySelector('.order-summary-grid');
  let totalPrice = 0;
  let totalShipping = 0;
  let totalBeforeTax = 0;
  let estimatedTax = 0;
  let TotalOrderpayment = 0;
  let items = 0;
  let product;
  cart.forEach((cartItem) => {
    products.forEach((productItem) => {
      if (productItem.id == cartItem.id) {
        product = productItem;
      }

    });
    totalPrice += cartItem.quantity * centsToDollar(product.priceCents);
    items += cartItem.quantity;
    totalShipping += shippingPrice(cartItem.quantity, cartItem.deliveryOptionId);


  });
  totalBeforeTax = totalPrice + totalShipping;
  estimatedTax = totalBeforeTax * 0.1;
  TotalOrderpayment = totalBeforeTax + estimatedTax;
  totalBeforeTax = totalBeforeTax.toFixed(2);
  estimatedTax = estimatedTax.toFixed(2);
  TotalOrderpayment = TotalOrderpayment.toFixed(2);
  totalPrice = totalPrice.toFixed(2);
  totalShipping = totalShipping.toFixed(2);



  let ordersummaryHTML = `
<h3>Order Summary</h3>
<div class="items-shipping-handling inner-grid">
<div class="items inner-flex">
  <p>Items(<span class="total-items">${items}</span>):</p>
  <p>$<span class="items-price">${totalPrice}</span></p>
</div>

<div class="shipping-handling inner-flex">
  <p>Shipping & handling</p>
  <p>$<span class="handling-price">${totalShipping}</span></p>
</div>

</div>


<div class="total-tax inner-grid">
<div class="estimated inner-flex">
  <p>Total before tax:</p>
  <p>$<span class="total-price">${totalBeforeTax}</span></p>
</div>

<div class="estimated inner-flex">
  <p>Estimated tax (10%):</p>
  <p>$<span class="estimated-tax-price">${estimatedTax}</span></p>
</div>

</div>


<div class="order-total inner-flex">
<p class="bold red" >Order total:</p>
<p class="red bold" id="red">$<span class="order-total-price">${TotalOrderpayment}</span></p>
</div>
<button class="payment-method">Place your order</button>`;
  orderSummaryContainer.innerHTML = ordersummaryHTML;
}


/*
this is a comment which is targeted to check how to make different branch of the same project independently. 
I am gonna merge main branch and test branch.
*/