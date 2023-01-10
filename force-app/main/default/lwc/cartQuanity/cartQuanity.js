
import { LightningElement ,api,track} from 'lwc';
import { SharedState } from './sharedState';
export {SharedState} from './sharedState'
export default class CartQuanity extends LightningElement {

quantity = SharedState.getQuantity()
@track value;

@api productId;
@api fromCart;
@api price;
// @api price;
//  @track totalInCart
  //cartQty={value:this.value, id:this.productId}
  connectedCallback() {
   this.value = this.quantity && this.quantity[this.productId]!==undefined ?this.quantity[this.productId]['quantity']:'1'
   const myevent=new CustomEvent("cartqtyevent",{
   // detail:this.cartQty
    detail:this.value,
    id:this.productId
   // totalInCart:this.totalInCart+this.value
});
this.dispatchEvent(myevent);
  }
    get options() {
        return [
            { label: 1, value: 1 },
            { label: 2, value: 2 },
            { label: 3, value: 3 },
            { label: 4, value: 4 },
            { label: 5, value: 5 },
            { label: 6, value: 6 },
        ];
    }
    get values(){
        return this.value
    }
    handleChange(event){
          this.value=event.target.value
         
          SharedState.setQuantity(this.value,this.productId,this.price, this.fromCart)
          const myevent=new CustomEvent("cartqtyevent",{
            detail:this.value,
            id:this.productId
            
        });
     
        this.dispatchEvent(myevent);

        }
       
}