import payByAuthrizePayment from "@salesforce/apex/AuthurizePaymentGatewayCtrl.payByAuthrizePayment";
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { SharedState } from 'c/cartQuanity';
import { LightningElement,track,api,wire } from 'lwc';
export default class CartData extends LightningElement {
    @api cartPushedData;
    @track total;
    @api totalBillingAmount;
    @track value=1
    handleCartChange(event){
     let id=event.target.name
      this.dispatchEvent(
        new CustomEvent('cartqtychange',{
        detail:{
            cartcount:SharedState.getCartCount(),
            totalPrice:SharedState.getCartTotalPrice(id),
            id:event.target.name,
            totalBillingAmount:SharedState.getCartBillingAmount()
          }
        })
      )
    }
      
    handleDeleteCart(event){
        this.dispatchEvent(
          new CustomEvent('selectcart', {
            detail:event.target.name 
          })
          )
      }
      @track showCheckout=false
      handleCheckOut(){
        this.showCheckout=true
      }
      monthOptions = [
        {
            value: "01",
            label: "January"
        },
        {
            value: "02",
            label: "February"
        },
        {
            value: "03",
            label: "March"
        },
        {
            value: "04",
            label: "April"
        },
        {
            value: "05",
            label: "May"
        },
        {
            value: "06",
            label: "June"
        },
        {
            value: "07",
            label: "July"
        },
        {
            value: "08",
            label: "August"
        },
         {
            value: "09",
            label: "September"
        },
        {
            value: "10",
            label: "October"
        },
        {
            value: "11",
            label: "November"
        },
        {
            value: "12",
            label: "December"
        }
];
      yearOptions = [
            {
                value: "2023",
                label: "2023"
            },
            {
                value: "2024",
                label: "2024"
            },
            {
                value: "2025",
                label: "2025"
            },
            {
                value: "2026",
                label: "2026"
            },
            {
                value: "2027",
                label: "2027"
            },
            {
                value: "2028",
                label: "2028"
            },
            {
                value: "2029",
                label: "2029"
            },
            {
                value: "2030",
                label: "2030"
            }
        
    ];


        @track cardNumber;
        @track cvv;
        @track cardMonth;
        @track cardYear;
        @track showSpinner = false;

    handleChange(event) {
        if(event.target.name == 'cardNumber'){
            this.cardNumber = event.detail.value;
        } else if(event.target.name == 'amount'){
            this.amount = event.detail.value4
        } else if(event.target.name == 'month'){
            this.cardMonth = event.detail.value;
        } else if(event.target.name == 'year'){
            this.cardYear = event.detail.value;
        } else if(event.target.name == 'cvv'){
            this.cvv = event.detail.value;
        }
    }

    hideModalBox(){
        this.isShowModal = false;
    }
    title=''
    handlePayment(){
        this.handleSpinner();
            payByAuthrizePayment({cardNumber : this.cardNumber, amount : this.totalBillingAmount, 
                  cardMonth : this.cardMonth, cardYear : this.cardYear, cvv : this.cvv
                })
            .then(res=>{
            this.title = res;
            console.log('result:- from success ',title)
            this.ShowToast('Success!', title, 'success', 'dismissable');
        }).catch(err=>{
            console.log('error:-', err)
      this.ShowToast('Error!!', err.body.message, 'error', 'dismissable');
        }).finally(() => {
            this.dispatchEvent(
                new CustomEvent('payment',{
                  
                    detail:{
                        cartPushedData:this.cartPushedData,
                        title:this.title
                    }
                })

            )
          //  console.log(this.ShowToast())
        this.handleSpinner();

    })
    setTimeout(() => {
        // this.ready = true;
        window.location.href="https://resourceful-hawk-9gx60s-dev-ed.trailblaze.lightning.force.com/lightning/n/Shopping_Website#/"
    }, 3000);
    
}

        handleSpinner(){
            this.showSpinner = !this.showSpinner;
        }

        ShowToast(title, message, variant, mode){
        const evt = new ShowToastEvent({
        title: title,
        message:message,
        variant: variant,
        mode: mode
        });
        this.dispatchEvent(evt);
    }

@track isShowModal=false
showModalBox(){
  this.isShowModal=true
}
}