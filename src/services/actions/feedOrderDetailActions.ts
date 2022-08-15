import { AppThunk } from './../reducers/rootReducer';
import { getOrderRequest } from './../../api/requests';
import { TOrder } from './../../components/types/order';
import { 
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    OPEN_FEED_DETAIL,
    CLOSE_FEED_DETAIL
} from '../constants/feedOrderDetail';
import { Dispatch } from 'react';
import { getCookie } from '../../utils/cookie';

export interface IFeedOrderDetailRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IFeedOrderDetailSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: TOrder;
}
export interface IFeedOrderDetailFailed {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface IShowFeedOrderDetail {
    readonly type: typeof OPEN_FEED_DETAIL;
    readonly isOpen: boolean;
    readonly order: TOrder;
}
export interface IHideFeedOrderDetail {
    readonly type: typeof CLOSE_FEED_DETAIL;
    readonly isOpen: boolean;
}

export type TFeedOrderDetailctions = 
  | IFeedOrderDetailRequest
  | IFeedOrderDetailSuccess
  | IFeedOrderDetailFailed
  | IShowFeedOrderDetail
  | IHideFeedOrderDetail;

export const feedOrderDetailRequest = ():IFeedOrderDetailRequest => ({
  type: GET_ORDER_REQUEST
})
export const feedOrderDetailSuccess = (order: TOrder):IFeedOrderDetailSuccess => ({
  type: GET_ORDER_SUCCESS,
  order
})
export const feedOrderDetailFailed = ():IFeedOrderDetailFailed => ({
  type: GET_ORDER_FAILED
})
export const showFeedOrderDetail = (order: TOrder, isOpen: boolean): IShowFeedOrderDetail => ({
    type: OPEN_FEED_DETAIL,
    isOpen: isOpen,
    order: order
});
export const hideFeedOrderDetail = (): IHideFeedOrderDetail => ({
    type: CLOSE_FEED_DETAIL,
    isOpen: false,
});

export type TgetFeedOrderDetail = (id: string) =>  AppThunk;
export const getFeedOrderDetail: TgetFeedOrderDetail = (id: string): AppThunk => (dispatch: Dispatch<TFeedOrderDetailctions>) => {
  const accessToken = getCookie('accessToken') as string;
  dispatch(feedOrderDetailRequest());
  getOrderRequest(id, accessToken).then(json => {
    if (json && json.success) {
        console.log('getOrderRequest json:', json.orders[0]);
        dispatch(feedOrderDetailSuccess(json.orders[0]));
        dispatch(showFeedOrderDetail(json.orders[0], true));
    } else {
      dispatch(feedOrderDetailFailed());
    }
  }).catch(error => {
      console.log('error', error);
      dispatch(feedOrderDetailFailed());
  });
}