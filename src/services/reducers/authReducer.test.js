import reducer from './authReducer'
import * as types from './../constants/auth';
import User from './../../model/user.ts';

const accessToken = 'accessToken';
const refreshToken = 'refreshToken';
const name = 'some name';
const email = 'email@mail.ru';
const user = {
    name: name,
    email: email
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
    userRequest: false,
    userUpdateFailed: false,
    userUpdateRequest: false,
    logoutFailed: false,
    logoutRequest: false,
    isLogged: false,
    accessToken: null,
    refreshToken: null,
    token: '',
    user: null,
  }

describe('auth reducer', () => {

  it('Return the auth initial state', () => {
    expect(reducer(undefined, {})).toEqual(
        initialState
    )
  })

  it('should handle ' + types.FORGOT_PASSWORD, () => {
    expect(
      reducer(initialState, {
        type: types.FORGOT_PASSWORD,
        email: email
      })
    ).toEqual({
        ...initialState,
        forgotPasswordEmailSended: false
    });
  });

  it('should handle ' + types.FORGOT_PASSWORD_FAILED, () => {
    expect(
      reducer(initialState, {
        type: types.FORGOT_PASSWORD_FAILED,
      })
    ).toEqual({
        ...initialState,
        forgotPasswordEmailSended: false,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false
    });
  });

  it('should handle ' + types.FORGOT_PASSWORD_REQUEST, () => {
    expect(
      reducer(initialState, {
        type: types.FORGOT_PASSWORD_REQUEST,
        email: email
      })
    ).toEqual({
        ...initialState,
        forgotPasswordRequest: true,
    });
  });


  it('should handle ' + types.FORGOT_PASSWORD_SUCCESS, () => {
    expect(
      reducer(initialState, {
        type: types.FORGOT_PASSWORD_SUCCESS,
      })
    ).toEqual({
        ...initialState,
        forgotPasswordFailed: false,
        forgotPasswordRequest: false,
        forgotPasswordEmailSended: true
    });
  });

  it('should handle ' + types.LOGIN_REQUEST, () => {
    expect(
      reducer(initialState, {
        type: types.LOGIN_REQUEST,
      })
    ).toEqual({
        ...initialState,
        loginRequest: true,
    });
  });

  it('should handle ' + types.LOGIN_SUCCESS, () => {
    expect(
      reducer(initialState, {
        type: types.LOGIN_SUCCESS,
        user: user
      })
    ).toEqual({
        ...initialState,
        isLogged: true,
        user: user,
        loginFailed: false,
        loginRequest: false
    });
  });

  it('should handle ' + types.LOGIN_FAILED, () => {
    expect(
      reducer(initialState, {
        type: types.LOGIN_FAILED,
      })
    ).toEqual({
        ...initialState,
        isLogged: false,
        loginFailed: true, 
        loginRequest: false 
    });
  });

  it('should handle ' + types.LOGOUT_REQUEST, () => {
    expect(
      reducer(initialState, {
        type: types.LOGOUT_REQUEST,
      })
    ).toEqual({
        ...initialState,
        logoutRequest: true
    });
  });

  it('should handle ' + types.LOGOUT_SUCCESS, () => {
    expect(
      reducer(initialState, {
        type: types.LOGOUT_SUCCESS,
        user: null
      })
    ).toEqual({
        ...initialState,
        isLogged: false,
        user: null,
        logoutFailed: false,
        logoutRequest: false
    });
  });

  it('should handle ' + types.LOGOUT_FAILED, () => {
    expect(
      reducer(initialState, {
        type: types.LOGOUT_FAILED,
      })
    ).toEqual({
        ...initialState,
        loginFailed: true, 
        loginRequest: false 
    });
  });

  it('should handle ' + types.REGISTER_REQUEST, () => {
    expect(
      reducer(initialState, {
        type: types.REGISTER_REQUEST,
      })
    ).toEqual({
        ...initialState,
        registerRequest: true,
    });
  });

  it('should handle ' + types.REGISTER_SUCCESS, () => {
    expect(
      reducer(initialState, {
        type: types.REGISTER_SUCCESS,
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken
      })
    ).toEqual({
        ...initialState,
        isLogged: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
        registerFailed: false,
        registerRequest: false
    });
  });

  it('should handle ' + types.REGISTER_FAILED, () => {
    expect(
      reducer(initialState, {
        type: types.REGISTER_FAILED,
      })
    ).toEqual({
        ...initialState,
        isLogged: false,
        registerFailed: true, 
        registerRequest: false 
    });
  });

  it('should handle ' + types.RESET_PASSWORD_REQUEST, () => {
    expect(
      reducer(initialState, {
        type: types.RESET_PASSWORD_REQUEST,
      })
    ).toEqual({
        ...initialState,
        resetPasswordRequest: true,
        resetPasswordSuccess: false
    });
  });

  it('should handle ' + types.RESET_PASSWORD_SUCCESS, () => {
    expect(
      reducer(initialState, {
        type: types.RESET_PASSWORD_SUCCESS,
      })
    ).toEqual({
        ...initialState,
        resetPasswordFailed: false,
        resetPasswordRequest: false,
        resetPasswordSuccess: true
    });
  });

  it('should handle ' + types.RESET_PASSWORD_FAILED, () => {
    expect(
      reducer(initialState, {
        type: types.RESET_PASSWORD_FAILED,
      })
    ).toEqual({
        ...initialState,
        resetPasswordFailed: true,
        resetPasswordRequest: false,
        resetPasswordSuccess: false
    });
  });

  //
  it('should handle ' + types.USER_REQUEST, () => {
    expect(
      reducer(initialState, {
        type: types.USER_REQUEST,
      })
    ).toEqual({
        ...initialState,
        userRequest: true,
    });
  });

  it('should handle ' + types.USER_SUCCESS, () => {
    expect(
      reducer(initialState, {
        type: types.USER_SUCCESS,
        user: user
      })
    ).toEqual({
        ...initialState,
        isLogged: true,
        user: user,
        loginFailed: false,
        loginRequest: false
    });
  });
  
  it('should handle ' + types.USER_FAILED, () => {
    expect(
      reducer(initialState, {
        type: types.USER_FAILED,
      })
    ).toEqual({
        ...initialState,
        isLogged: false,
        user: null,
        loginFailed: false,
        loginRequest: false
    });
  });

  //
  it('should handle ' + types.USER_UPDATE_REQUEST, () => {
    expect(
      reducer(initialState, {
        type: types.USER_UPDATE_REQUEST,
      })
    ).toEqual({
        ...initialState,
        userUpdateRequest: true,
    });
  });

  it('should handle ' + types.USER_UPDATE_SUCCESS, () => {
    expect(
      reducer(initialState, {
        type: types.USER_UPDATE_SUCCESS,
        user: user
      })
    ).toEqual({
        ...initialState,
        user: user,
        userUpdateFailed: false,
        userUpdateRequest: false
    });
  });
  
  it('should handle ' + types.USER_UPDATE_FAILED, () => {
    expect(
      reducer(initialState, {
        type: types.USER_UPDATE_FAILED,
      })
    ).toEqual({
        ...initialState,
        userUpdateFailed: true, 
        userUpdateRequest: false
    });
  });

});