import { User } from './../../model/user';
import { v4 as uuidv4 } from 'uuid';
import { FORGOT_PASSWORD, FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, USER_FAILED, USER_REQUEST, USER_SUCCESS, USER_UPDATE_FAILED, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from '../actions/authAction';


interface initialStateType {
  forgotPasswordEmailSended: boolean,
    forgotPasswordRequest: boolean,
    forgotPasswordFailed: boolean,
    resetPasswordRequest: boolean,
    resetPasswordFailed: boolean,
    loginRequest: boolean,
    loginFailed: boolean,
    registerRequest: boolean,
    registerFailed: boolean,

    isLogged: boolean,
    token: string,
    user: User | null,
}

const initialState = {
    forgotPasswordEmailSended: false,
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
    resetPasswordSuccess: false,
    loginRequest: false,
    loginFailed: false,
    registerRequest: false,
    registerFailed: false,

    userUpdateFailed: false,
    userUpdateRequest: false,
    logoutFailed: false,
    logoutRequest: false,

    
    isLogged: false,
    token: '',
    user: null,
}

const authReducer = (state: initialStateType = initialState, action: any): any => {
  switch (action.type) {
      // FORGOT_PASSWORD
      case FORGOT_PASSWORD: {
        return {
            ...state,
            forgotPasswordEmailSended: false,
        };
      }
      case FORGOT_PASSWORD_REQUEST: {
        return {
            ...state,
            forgotPasswordRequest: true,
        };
      }
      case FORGOT_PASSWORD_SUCCESS: {
        return {
            ...state,
            forgotPasswordFailed: false,
            forgotPasswordRequest: false,
            forgotPasswordEmailSended: true
        };
      }
      case FORGOT_PASSWORD_FAILED: {
        return {
            ...state,
            forgotPasswordEmailSended: false,
            forgotPasswordFailed: true,
            forgotPasswordRequest: false
        };
      }
      // RESET_PASSWORD
      case RESET_PASSWORD_REQUEST: {
        return {
            ...state,
            resetPasswordRequest: true,
            resetPasswordSuccess: false
        };
      }
      case RESET_PASSWORD_SUCCESS: {
        return {
            ...state,
            resetPasswordFailed: false,
            resetPasswordRequest: false,
            resetPasswordSuccess: true
        };
      }
      case RESET_PASSWORD_FAILED: {
        return {
            ...state,
            resetPasswordFailed: true,
            resetPasswordRequest: false,
            resetPasswordSuccess: false
        };
      }
      case USER_REQUEST: {
        return {
            ...state,
            userRequest: true,
        };
      }
      case USER_SUCCESS: {
        return {
            ...state,
            islogged: true,
            user: action.user,
            loginFailed: false,
            loginRequest: false
        };
      }
      case USER_FAILED: {
        return {
            ...state,
            islogged: false,
            user: null,
            loginFailed: false,
            loginRequest: false
        };
      }
      case LOGIN_REQUEST: {
        return {
            ...state,
            loginRequest: true,
        };
      }
      case LOGIN_SUCCESS: {
        return { 
          ...state,
          islogged: true,
          user: action.user,
          loginFailed: false,
          loginRequest: false
        };
      }
      case LOGIN_FAILED: {
        return { 
          ...state, 
          isLogged: false,
          loginFailed: true, 
          loginRequest: false 
        };
      }

      case REGISTER_REQUEST: {
        return {
            ...state,
            registerRequest: true,
        };
      }
      case REGISTER_SUCCESS: {
        return { 
          ...state,
          isLogged: true,
          accessToken: action.accessToken,
          refreshToken: action.refreshToken,
          user: action.user,
          registerFailed: false,
          registerRequest: false
        };
      }
      case REGISTER_FAILED: {
        return { 
          ...state, 
          isLogged: false,
          registerFailed: true, 
          registerRequest: false 
        };
      }

      case USER_UPDATE_REQUEST: {
        return {
            ...state,
            userUpdateRequest: true,
        };
      }
      case USER_UPDATE_SUCCESS: {
        return { 
          ...state,
          user: action.user,
          userUpdateFailed: false,
          userUpdateRequest: false
        };
      }
      case USER_UPDATE_FAILED: {
        return { 
          ...state, 
          userUpdateFailed: true, 
          userUpdateRequest: false 
        };
      }
      case LOGOUT_REQUEST: {
        return {
            ...state,
            logoutRequest: true,
        };
      }
      case LOGOUT_SUCCESS: {
        return { 
          ...state,
          islogged: false,
          user: null,
          logoutFailed: false,
          logoutRequest: false
        };
      }
      case LOGOUT_FAILED: {
        return { 
          ...state, 
          loginFailed: true, 
          loginRequest: false 
        };
      }

    default: 
      return state;
  }
}

export default authReducer;