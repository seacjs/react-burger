import { Dispatch } from 'react';
import { getCreateOrderRequest } from '../../api/requests';
import { getCookie } from '../../utils/cookie';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  ORDER_OPEN,
  ORDER_CLOSE,
} from '../constants/order';

export function getCreateOrder(ids: string[]) {
    return function(dispatch: Dispatch<any>) {
      const accessToken = getCookie('accessToken') as string;
      dispatch({
        type: CREATE_ORDER_REQUEST
      });
      getCreateOrderRequest(ids, accessToken).then(json => {
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
      }).catch(error => {
          console.log('error', error);
          dispatch({
            type: CREATE_ORDER_FAILED
          });
      });
    };
  }
