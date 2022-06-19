import { getCookie } from "../../utils/cookie";
import {WS_CONNECTION_START, WS_CONNECTION_END} from './../constants/wsOrder';

export const socketMiddleware = (wsActions: any) => {
    return (store: any) => {
      let socket: any = null;
  
      return (next: any) => (action: any) => {
        const { dispatch } = store;
        const { type, wsUrl, payload } = action;

        const { 
            wsConnectionSuccess,
            wsConnectionError,
            wsConnectionClosed,
            wsGetMessage,
            wsSendMessage
        } = wsActions;

        if (type === WS_CONNECTION_START) {
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
            // todo: if not suceess ...
            console.log('socket.onmessage', parsedData, event);
            dispatch(wsGetMessage(restParsedData));
          };
  
          socket.onclose = (event: any)  => {
            dispatch(wsConnectionClosed(event));
          };
  
          // todo ....
          if (type === wsSendMessage) { 
            const message = { ...payload };
            socket.send(JSON.stringify(message));
          }
        }

        if (type === WS_CONNECTION_END && socket) {
            // [code], [reason]
            socket.close();
            console.log('socket.close by me, lol');
        }
  
        next(action);
      };
    };
  };