
 let cart={

 cartItems:JSON.parse(localStorage.getItem('cart-oop'))  ||[ ],
  addToCart(productId){
  let isfound;
 let productQuantity=Number(document.querySelector(`.js-quantity-${productId}`).value)||1;
 
  
  this.cartItems.forEach((item)=>{
    if(item.id===productId){
      isfound=item;
    }

  });
  if(isfound){
    isfound.quantity+=productQuantity;
  }
  else{
    this.cartItems.push({id:productId,quantity:productQuantity,deliveryOptionId:'1'});
  }
  localStorage.setItem('cart-oop',JSON.stringify(this.cartItems));

},
 removeFromCart(id){
   
  for( let index=0;index<this.cartItems.length;index++){
    if(this.cartItems[index].id===id){
      this.cartItems.splice(index,1);
      localStorage.setItem('cart-oop',JSON.stringify(this.cartItems));
      break;
    }

  }   
},
 updateCart(cHTML){
  let cartQuantity=this.totalCartQuantity();
  cHTML.innerHTML=cartQuantity;
},
 totalCartQuantity(){
  let cartQuantity=0;
  this.cartItems.forEach((item,index)=>{
    if(item.quantity){
      cartQuantity+=item.quantity;
    }
  });
  return cartQuantity;
},
 getProduct(Id){
  
  for(let index=0;index<this.cartItems.length;index++){
    if(this.cartItems[index].id===Id){
      return this.cartItems[index];
    }
  }
},
 updateCartDelivery(productId,OptionId){
  this.cartItems.forEach((cartItem)=>{
    if(cartItem.id===productId){
      cartItem.deliveryOptionId=OptionId;
    }
   localStorage.setItem('cart-oop',JSON.stringify(this.cartItems));
  });
  
}


};



console.log(cart);




