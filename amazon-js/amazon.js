//before you try to write code,set logical algorithm for the given problem to solve the problem in finite and sequential manner.
import { products,loadProducts } from "../data/products.js";
import { centsToDollar } from "./cent-to-dollar.js";
import { cart, addToCart,updateCart,loadCart } from "./cart.js";
new Promise((resolve)=>{
  loadProducts(()=>{
    resolve();
  });
}).then((resolve)=>{
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });
}).then(()=>{
  renderProductsGrid();
  console.log("what is going on?");
});
//loadProducts(renderProductsGrid);
/*
 Promise.all([ 
 new Promise((resolve)=>{
  loadProducts(()=>{
    resolve();
    console.log("loading... products is finished");
  });
 }),
 new Promise((resolve)=>{

  loadCart(()=>{
    resolve();
    console.log('loading... carts is gone out');
  });
 })
 ]).then(()=>{
   renderProductsGrid();
   console.log("products HTML is generated.");
});
*/

function renderProductsGrid(){


let gridHTML = '';
let cartHTML=document.querySelector('.cart-quantity');
products.forEach((product) => {
  gridHTML += ` <div class="inner-grid"> 
   <div class="product-image-grid-part">
     <img class="product-image" src="../${product.image}">
   </div>
   <div class="product-detail-info">
     <div class="product-name">
       ${product.name}
     </div>
     <div clas="star-rating">
         <img src="..${product.getRatingUrl()}" class="product-star"><span class="star-value">${product.rating.count}</span>
   
     </div>  
     <div class="product-price-product-no"><span class="body-text">$${product.getPrice()}</span>
       
       <select class="product-number js-quantity-${product.id}">
         <option>1</option>
         <option>2</option>
         <option>3</option>
         <option>4</option>
         <option>5</option>
         <option>7</option>
         <option>8</option>
         <option>9</option>
         <option>10</option>
       </select><br>
     </div>
    
    
     ${product.getProductSize()}
   
     <div>
        <img src="../images/icons/checkmark.png" class="unchecked checkmark-${product.id}">
       <button class="add-to-cart-button" data-product-id=${product.id}>Add to cart</button>
     </div>
     
   </div>
   </div>`
});
let gridContainer = document.querySelector('.products-container-grid');
gridContainer.innerHTML = gridHTML;
updateCart(cartHTML);

//function which appear ckeckmark for 3 second when add to cart button is clicked
let ischecked = false;
let id;
function checked(className) {
  let checkmark = document.querySelector(`.${className}`);

  if (!ischecked) {
    checkmark.classList.remove('unchecked');
    checkmark.classList.add('checked');
    ischecked = true;
  }
  if(id){
    clearTimeout(id);
  }
  id = setTimeout(() => {
    checkmark.classList.remove('checked');
    checkmark.classList.add('unchecked');
    ischecked = false;

  }, 1500);
}

// how to add product to cart
/*
when add to cart is clicked, increase the cart quantity number.
how to insert quantity data from quantity input?
1.get value of quantity using DOM by passing id of the button.
2.change the value string into number.
3.add the number to cartQuantity
4.finished
*/

const addToCartButton = document.querySelectorAll('.add-to-cart-button');
addToCartButton.forEach((button) => {
  button.addEventListener('click', () => {
    addToCart(button.dataset.productId);
    updateCart(cartHTML);
    checked(`checkmark-${button.dataset.productId}`);
  });
});

/*
this comment is written to see what if when we change branch using git branch "name of the branch we want to create" followed by git switch "name of brach which is created earlier"
now check the astrisk sign which tell your branch.
*/
let removedHtml=` <div class="choose-container">
       <p class="body-text">Color</p>
       <button class="choose">Yellow</button>
       <button class="choose">Teal</button>
     </div>
     <div>
       <p class="body-text">Size</p>
       <button class="choose">S</button>
       <button class="choose">M</button>
       <button class="choose">L</button>
     </div>`;
}