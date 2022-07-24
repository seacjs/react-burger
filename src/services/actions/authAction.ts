import { AppThunk } from './../reducers/rootReducer';
import { getLoginRequest, getTokenRequest, getRegisterRequest, getLogoutRequest, getUserRequest, getForgotPasswordRequest, getResetPasswordRequest, getPatchUserRequest } from './../../api/requests';
import { Dispatch } from 'react';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,

  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILED,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,

  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,

  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILED,

  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED
} from '../constants/auth';
import { User } from '../../model/user';

interface IGetForgotPassword {
  readonly type: typeof FORGOT_PASSWORD;
  readonly email: string;
}
interface IGetForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
  readonly email: string;
}
interface IGetForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
interface IGetForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

interface IGetResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
interface IGetResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
interface IGetResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

interface IGetUserRequest {
  readonly type: typeof USER_REQUEST;
}
interface IGetUserSuccess {
  readonly type: typeof USER_SUCCESS;
  readonly user: User;
}
interface IGetUserFailed {
  readonly type: typeof USER_FAILED;
}

interface IGetLoginRequest {
    readonly type: typeof LOGIN_REQUEST;
}
interface IGetLoginSuccess {
    readonly type: typeof LOGIN_SUCCESS;
    readonly user: User;
}
interface IGetLoginFailed {
    readonly type: typeof LOGIN_FAILED;
}

interface IGetRegisterRequest {
    readonly type: typeof REGISTER_REQUEST;
}
interface IGetRegisterSuccess {
    readonly type: typeof REGISTER_SUCCESS;
    readonly user: User;
    readonly accessToken: string;
    readonly refreshToken: string;
}
interface IGetRegisterFailed {
    readonly type: typeof REGISTER_FAILED;
}

interface IGetUpdateRequest {
    readonly type: typeof USER_UPDATE_REQUEST;

}
interface IGetUpdateSuccess {
    readonly type: typeof USER_UPDATE_SUCCESS;
    readonly user: User;
}
interface IGetUpdateFailed {
    readonly type: typeof USER_UPDATE_FAILED;
}

interface IGetTokenRequest {
    readonly type: typeof TOKEN_REQUEST;
}
interface IGetTokenSuccess {
    readonly type: typeof TOKEN_SUCCESS;
}
interface IGetTokenFailed {
    readonly type: typeof TOKEN_FAILED;
}

interface IGetLogoutRequest {
    readonly type: typeof LOGOUT_REQUEST;
}
interface IGetLogoutSuccess {
    readonly type: typeof LOGOUT_SUCCESS;
    readonly user: null;
}
interface IGetLogoutFailed {
    readonly type: typeof LOGOUT_FAILED;
}

export type TauthActions = IGetForgotPassword
| IGetForgotPasswordRequest
| IGetForgotPasswordSuccess
| IGetForgotPasswordFailed
| IGetResetPasswordRequest
| IGetResetPasswordSuccess
| IGetResetPasswordFailed
| IGetUserRequest
| IGetUserSuccess
| IGetUserFailed
| IGetLoginRequest
| IGetLoginSuccess
| IGetLoginFailed
| IGetRegisterRequest
| IGetRegisterSuccess
| IGetRegisterFailed
| IGetUpdateRequest
| IGetUpdateSuccess
| IGetUpdateFailed
| IGetTokenRequest
| IGetTokenSuccess
| IGetTokenFailed
| IGetLogoutRequest
| IGetLogoutSuccess
| IGetLogoutFailed;

export const getForgotPasswordAction = (email: string):IGetForgotPasswordRequest => ({
  type: FORGOT_PASSWORD_REQUEST,
  email
})
export const getForgotPasswordSuccess = ():IGetForgotPasswordSuccess => ({
  type: FORGOT_PASSWORD_SUCCESS
})
export const getForgotPasswordFailed = ():IGetForgotPasswordFailed => ({
  type: FORGOT_PASSWORD_FAILED
})
export const getForgotPassword = (email: string) => (dispatch: Dispatch<IGetForgotPasswordRequest | IGetForgotPasswordSuccess | IGetForgotPasswordFailed>) => {
  dispatch(getForgotPasswordAction(email));
  getForgotPasswordRequest(email).then(json => {
    if (json && json.success) {
      console.log('getForgotPasswordRequest json:', json);
      dispatch(getForgotPasswordSuccess());
    } else {
      dispatch(getForgotPasswordFailed());
    }
  }).catch(error => {
      console.log('error', error);
      dispatch(getForgotPasswordFailed());
  });
};

export const getResetPasswordRequestAction = (): IGetResetPasswordRequest => ({
  type: RESET_PASSWORD_REQUEST
})
export const getResetPasswordSuccess = (): IGetResetPasswordSuccess => ({
  type: RESET_PASSWORD_SUCCESS
})
export const getResetPasswordFailed = (): IGetResetPasswordFailed => ({
  type: RESET_PASSWORD_FAILED
})
export const getResetPassword = (password: string, token: string) => (dispatch: Dispatch<IGetResetPasswordRequest | IGetResetPasswordSuccess | IGetResetPasswordFailed>) => {
  getResetPasswordRequest(password, token).then(json => {
    if (json && json.success) {
      console.log('getResetPasswordRequest json:', json);
      dispatch(getResetPasswordSuccess());
    } else {
      dispatch(getResetPasswordFailed());
    }
  }).catch(error => {
      console.log('error', error);
      dispatch(getResetPasswordFailed());
  });
}

export const getUserRequestAction = (): IGetUserRequest => ({
  type: USER_REQUEST
})
export const getUserSuccess = (user: User): IGetUserSuccess => ({
  type: USER_SUCCESS,
  user: user
})
export const getUserFailed = (): IGetUserFailed => ({
  type: USER_FAILED
})

export type TgetUser = () => AppThunk;
export const getUser: TgetUser = (): AppThunk => (dispatch: Dispatch<AppThunk | TgetToken | IGetUserRequest | IGetUserSuccess | IGetUserFailed>) => {
  const accessToken = getCookie('accessToken') as string;
  dispatch(getUserRequestAction());
  getUserRequest(accessToken).then(json => {
    if (json && json.success) {
      console.log('getUserRequest json:', json);
      dispatch(getUserSuccess(json.user));
    } else {
      dispatch(getUserFailed());
    }
  }).catch(error => {
      if(error.status === 403) {
        dispatch(getToken(getUser));
      }
      console.log('error', error);
      dispatch(getUserFailed());
  });
}

export const getLoginRequestAction = (): IGetLoginRequest => ({
  type: LOGIN_REQUEST
})
export const getLoginSuccess = (user: User): IGetLoginSuccess => ({
  type: LOGIN_SUCCESS,
  user: user
})
export const getLoginFailed = (): IGetLoginFailed => ({
  type: LOGIN_FAILED
})
export type TgetLogin = (email: string, password: string) => AppThunk;
export const getLogin:TgetLogin = (email: string, password: string): AppThunk => (dispatch: Dispatch<IGetLoginRequest | IGetLoginSuccess | IGetLoginFailed>) => {
  const accessToken = getCookie('accessToken') as string;
  dispatch(getLoginRequestAction());
  getLoginRequest(password, email).then(json => {
    if (json && json.success) {
      console.log('getLoginRequest json:', json);
      dispatch(getLoginSuccess(json.user));
      setCookie('accessToken', json.accessToken, {path: '/'});
      window.localStorage.setItem('refreshToken', json.refreshToken);
    } else {
      dispatch(getLoginFailed());
    }
  }).catch(error => {
      console.log('error', error);
      dispatch(getLoginFailed());
  });
}

export const getRegisterRequestAction = (): IGetRegisterRequest => ({
  type: REGISTER_REQUEST
})
export const getRegisterSuccess = (user: User, accessToken: string, refreshToken: string): IGetRegisterSuccess => ({
  type: REGISTER_SUCCESS,
  user: user,
  accessToken: accessToken,
  refreshToken: refreshToken
})
export const getRegisterFailed = (): IGetRegisterFailed => ({
  type: REGISTER_FAILED
})

export type TgetRegister = (name: string, email: string, password: string) => AppThunk;
export const getRegister: TgetRegister = (name: string, email: string, password: string): AppThunk => (dispatch: Dispatch<IGetRegisterRequest | IGetRegisterSuccess | IGetRegisterFailed | IGetUserRequest>) => {
  dispatch(getRegisterRequestAction());
  getRegisterRequest(name, email, password).then(json => {
    if (json && json.success) {
      console.log('getRegisterRequest json:', json);
      setCookie('accessToken', json.accessToken, {path: '/'});
      window.localStorage.setItem('refreshToken', json.refreshToken);
      dispatch(getRegisterSuccess(json.user, json.accessToken, json.refreshToken));
      dispatch(getUserRequestAction())
    } else {
      dispatch(getRegisterFailed());
    }
  }).catch(error => {
      console.log('error', error);
      dispatch(getRegisterFailed());
  });
}

export const getUpdateRequestAction = (): IGetUpdateRequest => ({
  type: USER_UPDATE_REQUEST
})
export const getUpdateSuccess = (user: User): IGetUpdateSuccess => ({
  type: USER_UPDATE_SUCCESS,
  user: user
})
export const getUpdateFailed = (): IGetUpdateFailed => ({
  type: USER_UPDATE_FAILED
})
export type TgetUpdate = (name: string, email: string, password: string) => AppThunk;
export const getUpdate: TgetUpdate = (name: string, email: string, password: string): AppThunk => (dispatch: Dispatch<AppThunk | TgetToken | IGetUpdateRequest | IGetUpdateSuccess | IGetUpdateFailed>) => {
  const accessToken = getCookie('accessToken') as string;
  dispatch(getUpdateRequestAction());
  getPatchUserRequest(accessToken, {name: name, email: email, password: password}).then(json => {
    if (json && json.success) {
      console.log('getUpdateRequest json:', json);
      dispatch(getUpdateSuccess(json.user));
    } else {
      dispatch(getUpdateFailed());
    }
  }).catch(error => {
    if(error.status === 403) {
      dispatch(getToken(getUpdate, [name, email, password]));
    }
    console.log('error', error);
    dispatch(getUpdateFailed());
  });
}

export const getTokenRequestAction = (): IGetTokenRequest => ({
  type: TOKEN_REQUEST
})
export const getTokenSuccess = (): IGetTokenSuccess => ({
  type: TOKEN_SUCCESS
})
export const getTokenFailed = (): IGetTokenFailed => ({
  type: TOKEN_FAILED
})

export type TgetToken = (action: TgetUser | TgetUpdate, actionParams?: any[]) => AppThunk;
export const getToken: TgetToken = (action: TgetUser | TgetUpdate, actionParams: any[] = []): AppThunk => (dispatch: Dispatch<AppThunk | IGetTokenRequest | IGetTokenSuccess | IGetTokenFailed>) => {
  const refreshToken = window.localStorage.getItem('refreshToken') as string;
  dispatch(getTokenRequestAction());
  getTokenRequest(refreshToken).then(json => {
    if (json && json.success) {
      console.log('getTokenRequest json:', json);
      dispatch(getTokenSuccess());
      setCookie('accessToken', json.accessToken, {path: '/'});
      window.localStorage.setItem('refreshToken', json.refreshToken);
      dispatch(action(...actionParams as [string, string, string]));
    } else {
      dispatch(getTokenFailed());
    }
  }).catch(error => {
      console.log('error', error);
      deleteCookie('accessToken');
      window.localStorage.removeItem('refreshToken');
      dispatch(getTokenFailed());
  });
}

export const getLogoutRequestAction = (): IGetLogoutRequest => ({
  type: LOGOUT_REQUEST
})
export const getLogoutSuccess = (): IGetLogoutSuccess => ({
  type: LOGOUT_SUCCESS,
  user: null
})
export const getLogoutFailed = (): IGetLogoutFailed => ({
  type: LOGOUT_FAILED
})
export type TgetLogout = () => AppThunk;
export const getLogout: TgetLogout = ():AppThunk => (dispatch: Dispatch<IGetLogoutRequest | IGetLogoutSuccess | IGetLogoutFailed>) => {
  const refreshToken = window.localStorage.getItem('refreshToken') as string;
  const accessToken = getCookie('accessToken') as string;
  dispatch(getLogoutRequestAction());
  getLogoutRequest(accessToken, refreshToken).then(json => {
    if (json && json.success) {
      console.log('getLogoutRequest json:', json);
      dispatch(getLogoutSuccess());
      deleteCookie('accessToken');
      window.localStorage.removeItem('refreshToken');
    } else {
      dispatch(getLogoutFailed());
    }
  }).catch(error => {
      console.log('error', error);
      dispatch(getLogoutFailed());
  });
}
