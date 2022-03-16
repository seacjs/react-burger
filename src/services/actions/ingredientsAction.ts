import { Dispatch } from 'react';
import { getIngredientsRequest } from '../../api/requests';

const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED
};

export function getIngredinets() {
    return function(dispatch: Dispatch<any>) {
      dispatch({
        type: GET_ITEMS_REQUEST
      });
      getIngredientsRequest().then(json => {
        if (json && json.success) {
            console.log('getIngredinets json:', json);
          dispatch({
            type: GET_ITEMS_SUCCESS,
            items: json.data
          });
        } else {
          dispatch({
            type: GET_ITEMS_FAILED
          });
        }
      });
    };
  }