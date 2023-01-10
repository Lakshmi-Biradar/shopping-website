import { LightningElement,track} from 'lwc';
import getCartDetails from '@salesforce/apex/shoppingAppCtrl.getCartDetails'
import { SharedState } from './apiData';
export default class ProductList extends LightningElement {
    @track
    carts=[]
    @track cartFilter=[]
   
    connectedCallback(){
        this.fetchDetails();
        
    }
    fetchDetails(){
        let cartDetails = SharedState.getData()
        if(cartDetails){
            this.carts = cartDetails
            this.cartFilter = cartDetails
        }
        else{
            getCartDetails()
            .then(response =>{
                this.carts= JSON.parse(response)
                this.cartFilter=JSON.parse(response)
                SharedState.setData(this.carts)
            })
            .catch((error) => {
                console.error(error);
              });
        }
     
    }
    handleEvent(event){
        this.cartFilter=event.detail
      
    }

}
