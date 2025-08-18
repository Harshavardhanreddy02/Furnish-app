import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

function Paypalbutton({ amount, onSuccess, onError }) {
  return (
    <PayPalScriptProvider options={{ 'client-id': 'AVTDPwKB02ocZiwMvmcSdAFWSjDW3aspLS-BHE0Q7Au5DSMvkgGRLO05XTYnldfLhaswrIImdXLWWeal' }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}

export default Paypalbutton;
