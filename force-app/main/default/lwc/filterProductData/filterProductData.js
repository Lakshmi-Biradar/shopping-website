import { LightningElement,api,track } from 'lwc';

export default class FilterProductData extends LightningElement {
    @api cartDetails
    // @track _isChecked = false;
    @track filterCartDetails=[]
    checkboxValue={
        category:[],
        price:[]
    }  
    get category_options() {
        return [
            { label: "men", value: "men's clothing"},
            { label: "women", value: "women's clothing" },
            { label: "jewelery", value: "jewelery" },
            { label: "electronics", value: "electronics" },
        ];
    }
    
    get Priceoptions(){
      return [
        { label: "0-50", value: "0-50"},
        { label: "51-150", value: "51-150"},
        { label: "151-500", value: "151-500"},
        { label: "501-1000", value: "501-1000"},
      ]  
    }
   
         filterArray=[]
    handleCategoryChange(event) {
        this.checkboxValue.category = event.detail.value
        this.filterCart()
    }
         
    filterCart(){   
         this.filterCartDetails=[...this.cartDetails]
        if(this.checkboxValue.category.length || this.checkboxValue.price.length){
           this.filterCartDetails= this.filterCartDetails.filter(item=>{
                if( this.checkboxValue.category.length && !this.checkboxValue.category.includes(item.category)){
                    return false;
                }
                if(this.checkboxValue.price.length && !this.checkforPrices(this.checkboxValue.price, item.price)){
                    return false;
                }
                console.log(item.price)
                return true;
            })

        }
        const myevent=new CustomEvent("filterevent",{
            detail:this.filterCartDetails
        });
        this.dispatchEvent(myevent);

    }

    checkforPrices(priceArray,price){
        let result= priceArray.filter(item=>{
            let rangeArr = this.getArrayFromRangeString(item)
            console.log('rangearr',rangeArr)
            if(rangeArr.length){
                return parseInt(rangeArr[0]) <= price && parseInt(rangeArr[1])>=price
            }
           // return parseInt(price)<= parseInt(item)
        })
        console.log('result',result)
        return result.length?true:false
    }
    getArrayFromRangeString(range){
        return range.split('-')
    }
    handlePriceChange(event){
        this.checkboxValue.price=event.detail.value
         this.filterCart();
    }
}