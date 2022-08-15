import { AppThunk } from './../reducers/rootReducer';
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

export type TOrderItemInfo = {
  number: string;
  name: string;
}

export interface IorderRequest {
  readonly type: typeof CREATE_ORDER_REQUEST
}
export interface IorderSuccess {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly order: TOrderItemInfo;
}
export interface IorderFailed {
  readonly type: typeof CREATE_ORDER_FAILED
}
export interface IorderOpen {
  readonly type: typeof ORDER_OPEN
}
export interface IorderClose {
  readonly type: typeof ORDER_CLOSE
}

export type TorderActions = IorderRequest
| IorderSuccess
| IorderFailed
| IorderOpen
|IorderClose;

export const orderRequest = (): IorderRequest => ({
  type: CREATE_ORDER_REQUEST
})
export const orderSuccess = (order: TOrderItemInfo): IorderSuccess => ({
  type: CREATE_ORDER_SUCCESS,
  order: order
})
export const orderFailed = (): IorderFailed => ({
  type: CREATE_ORDER_FAILED
})
export const orderOpen = (): IorderOpen => ({
  type: ORDER_OPEN
})

export type TgetCreateOrder = (ids: string[]) => AppThunk;
export const getCreateOrder: TgetCreateOrder = (ids: string[]): AppThunk => (dispatch: Dispatch<TorderActions>) => {
  const accessToken = getCookie('accessToken') as string;
  dispatch(orderRequest());
  getCreateOrderRequest(ids, accessToken).then(json => {
    if (json && json.success) {
        console.log('getCreateOrderRequest json:', json);
        dispatch(orderSuccess({
          number: json.order.number,
          name: json.name
        }))
        dispatch(orderOpen());
    } else {
      dispatch(orderFailed());
    }
  }).catch(error => {
      console.log('error', error);
      dispatch(orderFailed());
  });
}
