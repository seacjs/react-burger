import { getLoginRequest, getTokenRequest, getRegisterRequest, getLogoutRequest, getUserRequest, getForgotPasswordRequest, getResetPasswordRequest, getPatchUserRequest } from './../../api/requests';
import { Dispatch } from 'react';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
const USER_REQUEST = 'USER_REQUEST';
const USER_SUCCESS = 'USER_SUCCESS';
const USER_FAILED = 'USER_FAILED';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILED = 'REGISTER_FAILED';
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILED = 'LOGOUT_FAILED';
const TOKEN_REQUEST = 'TOKEN_REQUEST';
const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
const TOKEN_FAILED = 'TOKEN_FAILED';
const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
const USER_UPDATE_FAILED = 'USER_UPDATE_FAILED';

export function getForgotPassword(email: string) {
  return function(dispatch: Dispatch<any>) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    });
    getForgotPasswordRequest(email).then(json => {
      if (json && json.success) {
        console.log('getLoginRequest json:', json);
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });
      } else {
        dispatch({
          type: FORGOT_PASSWORD_FAILED
        });
      }
    }).catch(error => {
        console.log('error', error);
        dispatch({
          type: FORGOT_PASSWORD_FAILED
        });
    });
  };
}

export function getResetPassword(password: string, token: string) {
  return function(dispatch: Dispatch<any>) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    getResetPasswordRequest(password, token).then(json => {
      if (json && json.success) {
        console.log('getResetPasswordRequest json:', json);
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILED
        });
      }
    }).catch(error => {
        console.log('error', error);
        dispatch({
          type: RESET_PASSWORD_FAILED
        });
    });
  };
}

export function getUser() {
  return function(dispatch: Dispatch<any>) {
    // const accessToken = window.localStorage.getItem('accessToken') as string;
    const accessToken = getCookie('accessToken') as string;
    dispatch({
      type: USER_REQUEST
    });
    getUserRequest(accessToken).then(json => {
      if (json && json.success) {
        console.log('getLoginRequest json:', json);
        dispatch({
          type: USER_SUCCESS,
          user: json.user,
        });
      } else {
        dispatch({
          type: USER_FAILED
        });
      }
    }).catch(error => {
        if(error.status === 403) {
          const refreshToken = window.localStorage.getItem('refreshToken') as string;
          if (refreshToken) {
            dispatch(getToken(refreshToken));
            dispatch(getUser());
          }
        }
        console.log('error', error);
        dispatch({
          type: USER_FAILED
        });
    });
  };
}

export function getLogin(email: string, password: string) {
    return function(dispatch: Dispatch<any>) {
      // const accessToken = window.localStorage.getItem('accessToken') as string;
      const accessToken = getCookie('accessToken') as string;
      dispatch({
        type: LOGIN_REQUEST
      });
      getLoginRequest(password, email).then(json => {
        if (json && json.success) {
          console.log('getLoginRequest json:', json);
          dispatch({
            type: LOGIN_SUCCESS,
            user: json.user,
          });
          setCookie('accessToken', json.accessToken);
          // window.localStorage.setItem('accessToken', json.accessToken);
          window.localStorage.setItem('refreshToken', json.refreshToken);
        } else {
          dispatch({
            type: LOGIN_FAILED
          });
        }
      }).catch(error => {
          console.log('error', error);
          dispatch({
            type: LOGIN_FAILED
          });
      });
    };
}

export function getRegister(name: string, email: string, password: string) {
    return function(dispatch: Dispatch<any>) {
      dispatch({
        type: LOGIN_REQUEST
      });
      getRegisterRequest(name, email, password).then(json => {
        if (json && json.success) {
          console.log('getRegisterRequest json:', json);
          dispatch({
            type: REGISTER_SUCCESS,
            user: json.user,
          });
          setCookie('accessToken', json.accessToken);
          // setCookie('refreshToken', json.refreshToken);
          // window.localStorage.setItem('accessToken', json.accessToken);
          window.localStorage.setItem('refreshToken', json.refreshToken);
          dispatch({
            type: USER_REQUEST,
          });
        } else {
          dispatch({
            type: REGISTER_FAILED
          });
        }
      }).catch(error => {
          console.log('error', error);
          dispatch({
            type: REGISTER_FAILED
          });
      });
    };
}

export function getUpdate(name: string, email: string, password: string) {
  return function(dispatch: Dispatch<any>) {
    const accessToken = getCookie('accessToken') as string; //window.localStorage.getItem('accessToken') as string;
    dispatch({
      type: USER_UPDATE_REQUEST
    });
    getPatchUserRequest(accessToken, {name: name, email: email, password: password}).then(json => {
      if (json && json.success) {
        console.log('getUpdateRequest json:', json);
        dispatch({
          type: USER_UPDATE_SUCCESS,
          user: json.user,
        });
      } else {
        dispatch({
          type: USER_UPDATE_FAILED
        });
      }
    }).catch(error => {
        if(error.status === 403) {
          const refreshToken = window.localStorage.getItem('refreshToken') as string;
          if (refreshToken) {
            dispatch(getToken(refreshToken));
            dispatch(getUpdate(name, email, password));
          }
        }
        console.log('error', error);
        dispatch({
          type: USER_UPDATE_FAILED
        });
    });
  };
}

export function getToken(refreshToken: string) {
    return function(dispatch: Dispatch<any>) {
      dispatch({
        type: LOGIN_REQUEST
      });
      getTokenRequest(refreshToken).then(json => {
        if (json && json.success) {
          console.log('getTokenRequest json:', json);
          dispatch({
            type: TOKEN_SUCCESS,
          });
          // return Promise.resolve();
        } else {
          dispatch({
            type: TOKEN_FAILED
          });
        }
      }).catch(error => {
          console.log('error', error);
          dispatch({
            type: TOKEN_FAILED
          });
      });
    };
}

export function getLogout() {
  return function(dispatch: Dispatch<any>) {
    const refreshToken = window.localStorage.getItem('refreshToken') as string;
    // const accessToken = window.localStorage.getItem('accessToken') as string;
    const accessToken = getCookie('accessToken') as string;
    // const refreshToken = getCookie('refreshToken') as string;
    dispatch({
      type: LOGOUT_REQUEST
    });
    getLogoutRequest(accessToken, refreshToken).then(json => {
      if (json && json.success) {
        console.log('getLogoutRequest json:', json);
        dispatch({
          type: LOGOUT_SUCCESS,
        });
        deleteCookie('accessToken');
        // deleteCookie('refreshToken');
        // window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('refreshToken');
      } else {
        dispatch({
          type: LOGOUT_FAILED
        });
      }
    }).catch(error => {
        console.log('error', error);
        dispatch({
          type: LOGOUT_FAILED
        });
    });
  };
}

export {
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
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

    USER_REQUEST,
    USER_SUCCESS,
    USER_FAILED,
    
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILED
};