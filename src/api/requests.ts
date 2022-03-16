const urlIngredients = 'https://norma.nomoreparties.space/api/ingredients';
const urlCreateOrder = 'https://norma.nomoreparties.space/api/orders';

export const getIngredientsRequest = () => {
  return fetch(urlIngredients)
    .then(res => {
      if (!res.ok) {
          throw new Error('ошибка ' + res.status);
      }
      return res.json();
    });
};

export const getCreateOrderRequest = (ids: string[]) => {

  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({"ingredients": ids})
  };

  return fetch(urlCreateOrder, options)
    .then(res => {
      if (!res.ok) {
          throw new Error('ошибка ' + res.status);
      }
      return res.json();
    });
};

  