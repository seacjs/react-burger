import { Dispatch } from 'react';
import { getCreateOrderRequest } from '../../api/requests';

const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';
const ORDER_OPEN = 'ORDER_OPEN';
const ORDER_CLOSE = 'ORDER_CLOSE';


export {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED,
    ORDER_OPEN,
    ORDER_CLOSE
};

export function getCreateOrder(ids: string[]) {
    return function(dispatch: Dispatch<any>) {
      dispatch({
        type: CREATE_ORDER_REQUEST
      });
      getCreateOrderRequest(ids).then(json => {
        if (json && json.success) {
            console.log('getCreateOrderRequest json:', json);
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            order: {
              number: json.order.number,
              name: json.name
            }
          });
          dispatch({
            type: ORDER_OPEN,
          });
        } else {
          dispatch({
            type: CREATE_ORDER_FAILED
          });
        }
      });
    };
  }
