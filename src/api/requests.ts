const baseUrl = 'https://norma.nomoreparties.space/api';

const checkResponse = (response: Response) => {
  if (!response.ok) {
      throw new Error('ошибка ' + response.status);
  }
  return response.json();
}

export const getIngredientsRequest = () => {
  return fetch(`${baseUrl}/ingredients`)
    .then(checkResponse);
};

export const getCreateOrderRequest = (ids: string[]) => {
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({"ingredients": ids})
  };

  return fetch(`${baseUrl}/orders`, options)
    .then(checkResponse);
};

  