import { LightningElement ,track,wire} from 'lwc';
import {subscribe,MessageContext} from "lightning/messageService";
import { SharedState } from 'c/cartQuanity';
import CART_CHANNEL from "@salesforce/messageChannel/newproductAddRemoveCartChannel__c";
export default class ProductMaster extends LightningElement {
        @track totalInCart = 0;
        @track uniqueArray=[];
        @track arrayEle=[];
        @track totalPrc=0
        @track totalBillingAmount=0
        showCartData=false
        @wire(MessageContext)
        messageContext;
        connectedCallback() {
            this.subscribeMC();
        }  
        subscribeMC() {
           this.subscription = subscribe(this.messageContext,CART_CHANNEL,(message) => {
            let cartData = message.cartData;
            let cartAction = message.action.cartAction;
            if(cartAction ==='Add'){
            this.uniqueArray.push(cartData);    
           }
           this.uniqueArray=[...new Map(this.uniqueArray.map((item) => [item.id, item])).values()];
         
           this.totalInCart = SharedState.getCartCount()
            this.totalBillingAmount=SharedState.getCartBillingAmount()

         })               
     } 
     handleOpenCart(){
                window.location.href = "https://resourceful-hawk-9gx60s-dev-ed.trailblaze.lightning.force.com/lightning/n/Shopping_Website#/cart"
    }
    handleOpenProducts(){
        window.location.href="https://resourceful-hawk-9gx60s-dev-ed.trailblaze.lightning.force.com/lightning/n/Shopping_Website#/"
    }
    handleCartDeletion(event){
        const cartId=event.detail
        const cartIndex=this.uniqueArray.findIndex(element=>element.id=== cartId)
        let qtyVal=SharedState.getCartQuantity(cartId)
        this.totalInCart=this.totalInCart-qtyVal
        this.totalBillingAmount=this.totalBillingAmount- SharedState.getCartTotalPrice(cartId)
        this.uniqueArray.splice(cartIndex,1)
        SharedState.removeQuantity(cartId)
        
        //this.uniqueArray = this.uniqueArray.filter((element) => element.id !== cartId)
     }
   
     handleAfterPayment(event){
        let title=event.detail.title
        console.log(title)
        if(title){
        this.totalInCart=SharedState.removeTotalInCart()
        this.totalBillingAmount=SharedState.removeTotalBillingAmount()
        let cartArray=event.detail.cartPushedData
        this.uniqueArray=this.uniqueArray.map(element=>{
            SharedState.removeQuantity(element.id)
        })
        this.uniqueArray.splice(0,cartArray.length)
    }

     }
    handleCartQuantityChange(event){
        const carQty=event.detail.cartcount
        this.totalInCart = carQty
        const cartId=event.detail.id
        this.totalBillingAmount=event.detail.totalBillingAmount
       this.uniqueArray=this.uniqueArray.map(element=> element.id == cartId ? {...element, totalPrice:event.detail.totalPrice }: element) 
         }
   }