export const completePurchase = async (transactionInfo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock complete purchase request", transactionInfo);
      resolve({ responseCode: "0" });
    }, 800);
  });
};
