import { AppDispatch, AppThunk, RootState } from './../services/reducers/rootReducer';
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
  } from 'react-redux';
import { Dispatch } from 'react';
  
  export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  
  // export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 
  // export const useDispatch = () => dispatchHook<Dispatch<AppDispatch | AppThunk>>(); 






  // создаем новый тип для диспатча типы берем из библиотеки redux-thunk
// export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export const useDispatch = () => dispatchHook<AppDispatch>();