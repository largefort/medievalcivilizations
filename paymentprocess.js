// Define the base request object
const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0
};

// Define the card payment method object
const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    allowedCardNetworks: ['MASTERCARD', 'VISA']
  },
  tokenizationSpecification: {
    type: 'PAYMENT_GATEWAY',
    parameters: {
      gateway: 'example', // Replace 'example' with your payment gateway
      gatewayMerchantId: 'exampleGatewayMerchantId' // Replace with your merchant ID
    }
  }
};

// Initialize the Google Pay API client
const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });

// This function is called when the Google Pay API script is loaded
function onGooglePayLoaded() {
  const paymentDataRequest = getGooglePaymentDataRequest();
  paymentsClient.isReadyToPay(paymentDataRequest)
    .then(function(response) {
      if (response.result) {
        createAndAddButton();
      }
    })
    .catch(function(err) {
      console.error(err);
    });
}

// This function creates the Google Payment Data Request
function getGooglePaymentDataRequest() {
  const paymentDataRequest = Object.assign({}, baseRequest);
  paymentDataRequest.allowedPaymentMethods = [baseCardPaymentMethod];
  paymentDataRequest.transactionInfo = getTransactionInfo();
  paymentDataRequest.merchantInfo = {
    merchantId: 'BCR2DN4TWPCOZRR7',
    merchantName: 'Medieval+'
  };
  return paymentDataRequest;
}

// This function returns the transaction info
function getTransactionInfo() {
  return {
    totalPriceStatus: 'FINAL',
    totalPrice: '5.99',
    currencyCode: 'USD',
  };
}

// This function creates and adds the Google Pay button to the UI
function createAndAddButton() {
  const button = paymentsClient.createButton({
    onClick: onGooglePaymentButtonClicked,
  });
  document.getElementById('container').appendChild(button);
}

// This function handles the button click and processes the payment
function onGooglePaymentButtonClicked() {
  const paymentDataRequest = getGooglePaymentDataRequest();
  paymentsClient.loadPaymentData(paymentDataRequest)
    .then(function(paymentData) {
      processPayment(paymentData);
    })
    .catch(function(err) {
      console.error(err);
    });
}

// This function processes the payment and unlocks features
function processPayment(paymentData) {
  unlockFeatures(); // Calls unlockFeatures from medievalsubscription.js
}
