import { TOrder } from './../../components/types/order';
import { 
    OPEN_FEED_DETAIL,
    CLOSE_FEED_DETAIL
} from '../constants/feedOrderDetail';

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
    | IShowFeedOrderDetail
    | IHideFeedOrderDetail;


export const showFeedOrderDetail = (order: TOrder, isOpen: boolean): IShowFeedOrderDetail => ({
    type: OPEN_FEED_DETAIL,
    isOpen: isOpen,
    order: order
});

export const hideFeedOrderDetail = (): IHideFeedOrderDetail => ({
    type: CLOSE_FEED_DETAIL,
    isOpen: false,
});