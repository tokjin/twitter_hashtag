class Twitter{
    constructor(){
        this.consumerKey = consumerKey,
        this.consumerSecret = consumerSecret,
        this.accessToken = accessToken,
        this.tokenSecret = tokenSecret;
    }
 
    api(url, param){
        let accessor = {consumerSecret: this.consumerSecret, tokenSecret: this.tokenSecret};
        
        let data = {
            method: 'GET', 
            action: url,
            parameters: {
                oauth_version: '1.0',
                oauth_signature_method: 'HMAC-SHA1',
                oauth_consumer_key: this.consumerKey,
                oauth_token: this.accessToken
            }
        };
        
        for(let key in param) data.parameters[key] = param[key];
        
        OAuth.setTimestampAndNonce(data);
        OAuth.SignatureMethod.sign(data, accessor);
        let newUrl = OAuth.addToURL(data.action, data.parameters);
        
        let options = {
            type: data.method,
            url: newUrl,
            dataType: "jsonp",
            jsonp: false,
            cache: true
        };
        
        $.ajax(options);
        return;
    }
}