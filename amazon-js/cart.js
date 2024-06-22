
export let cart=JSON.parse(localStorage.getItem('cart'))  ||[ ];;

export function loadCart(){
  let xhr = new XMLHttpRequest();
  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.addEventListener('load',()=>{
    cart =xhr.response;
    console.log('cart is loaded from supersimplebacked.dev/cart');
  });
  xhr.send();
}
  
        

export function addToCart(productId){
  let isfound;
 let productQuantity=Number(document.querySelector(`.js-quantity-${productId}`).value)||1;
 
  
  cart.forEach((item)=>{
    if(item.id===productId){
      isfound=item;
    }

  });
  if(isfound){
    isfound.quantity+=productQuantity;
  }
  else{
    cart.push({id:productId,quantity:productQuantity,deliveryOptionId:'1'});
  }
  localStorage.setItem('cart',JSON.stringify(cart));

}
export function removeFromCart(id){
   
  for( let index=0;index<cart.length;index++){
    if(cart[index].id===id){
      cart.splice(index,1);
      localStorage.setItem('cart',JSON.stringify(cart));
      break;
    }

  }   
}


//function which update the quantity of both home page cart number and checkout page itmes number.
export function updateCart(cHTML){
  let cartQuantity=totalCartQuantity();
  cHTML.innerHTML=cartQuantity;
}

export function totalCartQuantity(){
  let cartQuantity=0;
  cart.forEach((item,index)=>{
    if(item.quantity){
      cartQuantity+=item.quantity;
    }
  });
  return cartQuantity;
}

//function which return single product selecting from cart with Id paramenter.
export function getProduct(Id){
  
  for(let index=0;index<cart.length;index++){
    if(cart[index].id===Id){
      return cart[index];
    }
  }
}

export function updateCartDelivery(productId,OptionId){
  cart.forEach((cartItem)=>{
    if(cartItem.id===productId){
      cartItem.deliveryOptionId=OptionId;
    }
   localStorage.setItem('cart',JSON.stringify(cart));
  });
  
}
