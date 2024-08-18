const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });

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

function getTransactionInfo() {
  return {
    totalPriceStatus: 'FINAL',
    totalPrice: '5.99',
    currencyCode: 'USD',
  };
}

function createAndAddButton() {
  const button = paymentsClient.createButton({
    onClick: onGooglePaymentButtonClicked,
  });
  document.getElementById('container').appendChild(button);
}

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

function processPayment(paymentData) {
  unlockFeatures(); // Calls unlockFeatures from medievalsubscription.js
}
