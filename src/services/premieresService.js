import premieres from '../mocks/premieres.json';

export const getPremieres = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(premieres);
    }, 800);
  });
};
