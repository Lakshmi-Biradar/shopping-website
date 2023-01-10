public class AuthurizePaymentGatewayCtrl {
    @AuraEnabled
    public static String payByAuthrizePayment(String cardNumber, String amount, String cardMonth, String cardYear, String cvv){
        String email = 'lakshmibiradar96@gmail.com';
        String loginId = '2L73xfU6'; 
        String transactionKey = '38hbY83m36CZ8J8B';
        
        JSONGenerator payBody = JSON.createGenerator(true);
        payBody.writeStartObject();
        payBody.writeFieldName('createTransactionRequest');
         
        payBody.writeStartObject();
        payBody.writeFieldName('merchantAuthentication');
         
        payBody.writeStartObject();
        payBody.writeStringField('name', loginId);
        payBody.writeStringField('transactionKey', transactionKey);
        payBody.writeEndObject();
         
        payBody.writeStringField('refId', '123456');
        payBody.writeFieldName('transactionRequest');
         
        payBody.writeStartObject();
        payBody.writeStringField('transactionType', 'authCaptureTransaction');
        payBody.writeStringField('amount', amount);
        payBody.writeFieldName('payment');
         
        payBody.writeStartObject();
        payBody.writeFieldName('creditCard');
         
        payBody.writeStartObject();
        payBody.writeStringField('cardNumber', cardNumber);
        payBody.writeStringField('expirationDate', cardYear + '-' + cardMonth);
        payBody.writeStringField('cardCode', cvv);
        payBody.writeEndObject();
         
         
        payBody.writeEndObject();
         
        
        Http h = new Http();
         
        
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://apitest.authorize.net/xml/v1/request.api');
        req.setHeader('Content-Type', 'application/json');
        req.setMethod('POST');
        req.setBody(payBody.getAsString());
      
        HttpResponse res = new HttpResponse();
        res = h.send(req);
        String responseBody = res.getBody();
        if(String.IsNotBlank(res.getBody())){
            System.debug(res.getBody());
            if(responseBody.contains('"description":"This transaction has been approved."') || responseBody.contains('"description":"Your order has been received. Thank you for your business!"')){
                return 'This transaction has been approved.';
            } else{
                string error = responseBody.substringBetween('"errorText":"','"');
                throw newMessageException('Error encountered: ' + error);   
            }
        } else{
            throw newMessageException('Error encountered. Status Code: ' + res.getStatus());   
        }
    }
 
    private static AuraHandledException newMessageException(String message) {
        AuraHandledException e = new AuraHandledException(message);
        e.setMessage(message);
        return e;
    }
 
    public static void payByEcheck(){
        String loginId = '2L73xfU6';
        String transactionKey = '38hbY83m36CZ8J8B';
             
        JSONGenerator payBody = JSON.createGenerator(true);
        payBody.writeStartObject();
        payBody.writeFieldName('createTransactionRequest');
         
        payBody.writeStartObject();
        payBody.writeFieldName('merchantAuthentication');
         
        payBody.writeStartObject();
        payBody.writeStringField('name', loginId);
        payBody.writeStringField('transactionKey', transactionKey);
        payBody.writeEndObject();
         
        payBody.writeStringField('refId', '123456');
        payBody.writeFieldName('transactionRequest');
         
        payBody.writeStartObject();
         
        payBody.writeStringField('transactionType', 'authCaptureTransaction');
         
        payBody.writeStringField('amount', '100');
         
        payBody.writeFieldName('payment');
         
        payBody.writeStartObject();
        payBody.writeFieldName('bankAccount');
         
        payBody.writeStartObject();
        payBody.writeStringField('accountType', 'accountType');
        payBody.writeStringField('routingNumber', 'Routing_Number');
        payBody.writeStringField('accountNumber', 'Account_Number');
        payBody.writeStringField('nameOnAccount', 'name on account');
        payBody.writeStringField('bankName', '');
        payBody.writeStringField('checkNumber', '');
        payBody.writeEndObject();
         
        payBody.writeEndObject();
         
        payBody.writeFieldName('customer');
        payBody.writeStartObject();
        if(String.isNotBlank(email)){
            payBody.writeStringField('email', email);
        }
         
        payBody.writeEndObject();
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://apitest.authorize.net/xml/v1/request.api');
        req.setHeader('Content-Type', 'application/json');
        req.setMethod('POST');
        req.setBody(payBody.getAsString());
        // Send the request, and return a response
        HttpResponse res = new HttpResponse();
        res = h.send(req);
        if(String.IsNotBlank(res.getBody())){
            system.debug(res.getBody());
        }
    }
}