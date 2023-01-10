let _quantity={}; 
let _cartCount=0;
let _totalPrice=0;
let _totalBillingAmount=0

const SharedState = {
  setQuantity: (quantity, id,price, selected) => {
    _totalPrice = 0
    _quantity = {
        ..._quantity,
        [id]:{
          quantity,
           price,
          selected,
           totalPrice:quantity*price
        }
   };
   if(selected){
    let ids = Object.keys(_quantity)
    _cartCount = 0;
    _totalBillingAmount=0;
    ids.map((id) => {
      if(_quantity[id].selected){
        _cartCount+=parseInt(_quantity[id]['quantity']);
        _totalBillingAmount+=(_quantity[id]['totalPrice']);
        console.log(_totalBillingAmount)
      }
    })
   }
  },
  getQuantity: () => {
    return _quantity;
  },
  getCartCount:() => {
    return _cartCount
  },

  getCartBillingAmount:()=> {
    return _totalBillingAmount
  },

   getCartTotalPrice:(id)=>{
    return  _quantity[id]['totalPrice']
   },

  getCartQuantity:(id)=>{
    return _quantity[id]['quantity']
  },
  removeQuantity:(id) => {
    delete _quantity[id]
  },
  removeTotalInCart:()=>{
    _cartCount=0
  },
  removeTotalBillingAmount:()=>{
    _totalBillingAmount=0
  }
};

// Object.freeze(SharedState);
export { SharedState };