export enum AuthActions {
  RestoreToken = "RESTORE_TOKEN",
  SignIn = "SIGN_IN",
  SignOut = "SIGN_OUT",
  Loading = "LOADING",
}

export type TCurrentUser = {
  isLoading: boolean;
  attributes: any;
};

export type TUser = {};

export interface IAuthReducer {
  type: AuthActions | "";
  payload: any;
}

export const authReducer = (state: TCurrentUser, action: IAuthReducer) => {
  switch (action.type) {
    case AuthActions.RestoreToken:
      return {
        ...state,
        isLoading: false,
        attributes: action.payload,
      };
    case AuthActions.SignIn:
      return {
        ...state,
        attributes: action.payload,
      };
    case AuthActions.SignOut:
      return {
        ...state,
        isLoading: false,
        attributes: null,
      };
    default:
      return state;
  }
};
