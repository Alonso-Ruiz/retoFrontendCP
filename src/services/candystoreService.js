import candystore from '../mocks/candystore.json';

export const getCandyStoreItems = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(candystore);
    }, 600);
  });
};
