import { LightningElement,api, wire ,track} from 'lwc';
import { publish,  MessageContext } from "lightning/messageService";
import CART_CHANNEL from "@salesforce/messageChannel/newproductAddRemoveCartChannel__c";
import { SharedState } from 'c/cartQuanity';
//import {  messageContext } from "lightning/messageService";
//import CARTQTY_CHANNEL from "@salesforce/messageChannel/cartQuantity__c";
export default class ProductTile extends LightningElement {
    @api cartDetail;
    @wire(MessageContext)
	messageContext;
	publishChange(cartData, cartAction) {
		const message = {
			cartData: cartData,
			action:{
				cartAction : cartAction
			}
		};
		publish(this.messageContext, CART_CHANNEL, message);
	}
    isSelected=false;
    handleClick(){
         this.isSelected = !this.isSelected;
     }
     @track value=1
     @track totalPri=0
    handleCartQuantichange(event){
        this.value=event.detail
       // this.totalPri=event.detail.totalPrice
    }
    @track billingAmount=0
    
    handleAddToCart(){
        SharedState.setQuantity(this.value, this.cartDetail.id,this.cartDetail.price,true)
        this.isSelected = !this.isSelected;
        let cartData = {
            id:this.cartDetail.id,
            title:this.cartDetail.title,
            image:this.cartDetail.image,
            price:this.cartDetail.price,
            quantity:this.value,
            totalPrice:this.value * this.cartDetail.price
            //totalPrice:this.totalPri
        }
    this.publishChange(cartData, 'Add');  
 }
 
}