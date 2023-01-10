public with sharing class newShopping_Cart_Ctrl {
    @AuraEnabled
    public static String getCartDetails(){
        Http http = new Http();
       	HttpRequest httpRequest = new HttpRequest();
        httpRequest.setEndpoint('https://fakestoreapi.com/products');
        httpRequest.setMethod('GET');
    	HttpResponse response = http.send(httpRequest);
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            System.debug(response.getBody());
            return response.getBody();
        }
        return '';
    }
   
}

