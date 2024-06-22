import { totalCartQuantity } from "../cart.js";
export function  renderCheckOutHeader(header){
  let checkOutHeaderHTML;
checkOutHeaderHTML=`<div>
      <a href="amazon.html" target="_self"><img src="../images/amazon-logo.png" class="logo-image"
          alt="amazon project logo image">
      </a>
    </div>
    <div>
      <p class="checkout-text">checkout(<span class="items-no"><span class="checked-amount">${totalCartQuantity()}</span> items</span>)</p>
    </div>
    <div>
      <img src="../images/icons/checkout-lock-icon.png" class="locked" alt=" check out image">
    </div>`;
    header.innerHTML=checkOutHeaderHTML;
}

