import { Dispatch } from 'react';
import { getIngredientsRequest } from '../../api/requests';
import { Ingredient } from '../../model/ingredient';

import { 
  GET_ITEMS,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED
} from '../constants/ingredients';
import { AppThunk } from '../reducers/rootReducer';

// todo: это не нужно..
export interface IGetItemsAction {
  readonly type: typeof GET_ITEMS;
}

export interface IGetItemsRequestAction {
  readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsSuccessAction {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items:  Ingredient[];
}

export interface IGetItemsFailedAction {
  readonly type: typeof GET_ITEMS_FAILED;
}

export type TIngredientsActions = IGetItemsRequestAction 
  | IGetItemsSuccessAction
  | IGetItemsFailedAction;

export const getIngredientsRequestAction = (): IGetItemsRequestAction => ({
  type: GET_ITEMS_REQUEST
});
export const getIngredinetsSuccess = (items: Ingredient[]): IGetItemsSuccessAction => ({
  type: GET_ITEMS_SUCCESS,
  items: items
});
export const getIngredinetsFailed = (): IGetItemsFailedAction => ({
  type: GET_ITEMS_FAILED
});
export type TgetIngredinets = () => AppThunk;
export const getIngredinets: TgetIngredinets = (): AppThunk => (dispatch: Dispatch<TIngredientsActions>) => {
  dispatch(getIngredientsRequestAction());
  getIngredientsRequest().then(json => {
      if (json && json.success) {
        dispatch(getIngredinetsSuccess(json.data))
      } else {
        dispatch(getIngredinetsFailed());
      }
    }).catch(error => {
      dispatch(getIngredinetsFailed())
  })
};

// export function getIngredinets() {
//   return function(dispatch: Dispatch<TIngredientsActions>) {
//     dispatch(getIngredinetsRequest());
//     getIngredientsRequest().then(json => {
//         if (json && json.success) {
//           dispatch(getIngredinetsSuccess(json.data))
//         } else {
//           dispatch(getIngredinetsFailed());
//         }
//       }).catch(error => {
//         dispatch(getIngredinetsFailed())
//     })
//   };
// }