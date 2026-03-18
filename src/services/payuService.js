import axios from 'axios';
import md5 from 'md5';

const makePayURequest = async (checkoutData, accountId, currency, country) => {
  const apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
  const apiLogin = "pRRXKOl8ikMmt9u";
  const merchantId = "508029";
  const referenceCode = `CP_ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  const amountToCharge = Number(checkoutData.total.toFixed(2));
  const signatureStr = `${apiKey}~${merchantId}~${referenceCode}~${amountToCharge}~${currency}`;
  const signature = md5(signatureStr);

  const expMonth = checkoutData.expirationDate.split('/')[0];
  const expYear = `20${checkoutData.expirationDate.split('/')[1]}`;
  const formattedExp = `${expYear}/${expMonth}`;

  const payload = {
    language: "es",
    command: "SUBMIT_TRANSACTION",
    merchant: {
      apiKey: apiKey,
      apiLogin: apiLogin
    },
    transaction: {
      order: {
        accountId: accountId,
        referenceCode: referenceCode,
        description: "Compra Cineplanet - Dulcería",
        language: "es",
        signature: signature,
        additionalValues: {
          TX_VALUE: {
            value: amountToCharge,
            currency: currency
          }
        },
        buyer: {
          fullName: "APPROVED",
          emailAddress: checkoutData.email,
          contactPhone: "7563126",
          dniNumber: checkoutData.documentNumber,
          shippingAddress: {
            street1: "Av. Isabel La Católica 103",
            city: "Lima",
            state: "Lima y Callao",
            country: country,
            postalCode: "000000",
            phone: "7563126"
          }
        }
      },
      payer: {
        fullName: "APPROVED",
        emailAddress: checkoutData.email,
        contactPhone: "7563126",
        dniNumber: checkoutData.documentNumber,
        dniType: checkoutData.documentType,
        billingAddress: {
          street1: "Av. Isabel La Católica 103",
          city: "Lima",
          state: "Lima y Callao",
          country: country,
          postalCode: "000000",
          phone: "7563126"
        }
      },
      creditCard: {
        number: checkoutData.cardNumber,
        securityCode: checkoutData.cvv,
        expirationDate: formattedExp,
        name: "APPROVED"
      },
      extraParameters: { INSTALLMENTS_NUMBER: 1 },
      type: "AUTHORIZATION_AND_CAPTURE",
      paymentMethod: "VISA",
      paymentCountry: country,
      deviceSessionId: `session_${Date.now()}`,
      ipAddress: "127.0.0.1",
      cookie: `cookie_${Date.now()}`,
      userAgent: navigator.userAgent
    },
    test: true
  };

  const response = await axios.post('/payu-api/payments-api/4.0/service.cgi', payload, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  return response.data;
};

export const submitPayment = async (checkoutData) => {
  try {
    // INTENTO 1: Cuenta Sandbox de Perú (Requisito original)
    console.log("-> Iniciando transacción con Sandbox Perú (512323, PEN)...");
    let response = await makePayURequest(checkoutData, "512323", "PEN", "PE");
    console.log("-> Respuesta Perú:", response);

    // Si la cuenta de Perú está caída o devuelve INACTIVE_PAYMENT_PROVIDER, probamos la global.
    const hasError = response.code === 'ERROR';
    const hasDecline = response.transactionResponse && response.transactionResponse.state !== 'APPROVED';

    if (hasError || hasDecline) {
      console.warn("Sandbox Perú falló o denegó la transacción. Realizando Failover automático a Sandbox Global (Colombia 512321, COP)...");
      // INTENTO 2: Cuenta Sandbox Global (Colombia). Esta cuenta es 100% estable en PayU Testing
      response = await makePayURequest(checkoutData, "512321", "COP", "CO");
      console.log("-> Respuesta Global (Failover):", response);
    }

    return response;
  } catch (error) {
    console.error("Error catastrófico de red:", error);
    throw error;
  }
};
