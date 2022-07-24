import { RootState, AppDispatch } from './../reducers/rootReducer';
import { WS_CONNECTION_START, WS_CONNECTION_END, WS_SEND_MESSAGE } from './../constants/wsOrder';
import type { Middleware, MiddlewareAPI } from 'redux';
import { TwsOrderActions, wsAllActions } from './../actions/wsOrderAction';

export const socketMiddleware = (wsActions: wsAllActions): Middleware  => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: WebSocket | null = null;
  
      return (next: (a: TwsOrderActions) => void) => (action: TwsOrderActions) => {
        const { dispatch } = store;
        const { type } = action;
        
        const { 
            wsConnectionSuccess,
            wsConnectionError,
            wsConnectionClosed,
            wsGetMessage,
            wsSendMessage
        } = wsActions;

        if (type === WS_CONNECTION_START) {
          const { wsUrl } = action;
          socket = new WebSocket(wsUrl);
        }

        if (socket) {
          socket.onopen = (event: any) => {
            dispatch(wsConnectionSuccess(event));
          };
  
          socket.onerror = (event: any)  => {
            dispatch(wsConnectionError(event));
          };
  
          socket.onmessage = (event: any)  => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
            dispatch(wsGetMessage(restParsedData));
          };
  
          socket.onclose = (event: any)  => {
            dispatch(wsConnectionClosed(event));
          };
  
          if (type === WS_SEND_MESSAGE) { 
            const { payload } = action;
            const message = { ...payload };
            // socket.send(JSON.stringify(message));
            dispatch(wsSendMessage(JSON.stringify(message)))
          }
        }

        if (type === WS_CONNECTION_END && socket) {
            socket.close();
            console.log('socket.close by me, lol');
        }
  
        next(action);
      };
    };
  };