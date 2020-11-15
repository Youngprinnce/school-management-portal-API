const request = require("request");
const MySecretKey = 'Bearer sk_test_089018cd3a15fb488e0edb78563bdd314c1c8f58';
const initializePayment = (form, mycallback) => {
    const options = {
        url: 'https://api.paystack.co/transaction/initialize',
        headers: {
            authorization: MySecretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
        },
        form
    }
    const callback = (error,body) => {
        return mycallback(error, body);
    }
    request.post(options, callback);
}


const verifyPayment = (ref, mycallback) => {
    const options = {
        url: 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
        headers: {
            authorization: MySecretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
        }
    }
    const callback = (error,  body) => {
        return mycallback(error, body);
    }
    request(options, callback);
}


module.exports = {
    initializePayment,
    verifyPayment
}
