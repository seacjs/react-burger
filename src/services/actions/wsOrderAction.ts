import {
    WS_CONNECTION_START,
    WS_CONNECTION_END,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from '../constants/wsOrder';

export interface IwsConnectionInit {
  readonly type: typeof WS_CONNECTION_START;
  readonly wsUrl: string;
}
export interface IwsConnectionClose {
  readonly type: typeof WS_CONNECTION_END;
}
export interface IwsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly payload: any;
}
export interface IwsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: any;
}
export interface IwsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
    readonly payload: any;
}
export interface IwsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: any;
}
export interface IwsSendMessage {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: any;
}

export type TwsOrderActions = IwsConnectionInit
    | IwsConnectionClose
    | IwsConnectionSuccess 
    | IwsConnectionError 
    | IwsConnectionClosed 
    | IwsGetMessage 
    | IwsSendMessage;

  export const wsInit = (wsUrl: string):IwsConnectionInit => {
    return {
      type: WS_CONNECTION_START,
      wsUrl: wsUrl
    };
  };

  export const wsClose = ():IwsConnectionClose => {
    return {
      type: WS_CONNECTION_END,
    };
  };

  export const wsConnectionSuccess = (payload: any):IwsConnectionSuccess => {
    return {
      type: WS_CONNECTION_SUCCESS,
      payload: payload
    };
  };
  
  export const wsConnectionError = (payload: any): IwsConnectionError => {
    return {
      type: WS_CONNECTION_ERROR,
      payload: payload
    };
  };
  
  export const wsConnectionClosed = (payload: any): IwsConnectionClosed => {
    return {
      type: WS_CONNECTION_CLOSED,
      payload: payload
    };
  };
  
  export const wsGetMessage = (message: any): IwsGetMessage => {
    return {
      type: WS_GET_MESSAGE,
      payload: message
    };
  };
  
  export const wsSendMessage = (message: any): IwsSendMessage => {
    return {
      type: WS_SEND_MESSAGE,
      payload: message
    };
  };



  export const wsActions = {
    wsInit,
    wsClose,
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetMessage,
    wsSendMessage
  }
  export type wsAllActions = typeof wsActions;