export enum AuthActions {
  RestoreToken = 'RESTORE_TOKEN',
  SignIn = 'SIGN_IN',
  SignOut = 'SIGN_OUT',
  Loading = 'LOADING',
}

export type TAuth = {
  isLoading: boolean;
  attributes: any;
  isAuthenticated: boolean;
  login: (a: any) => void;
  logout: () => void;
  restoreToken: (a: any) => void;
};

export type TCurrentUser = any;

export interface IAuthReducer {
  type: AuthActions | '';
  payload: any;
}

export const authReducer = (state: TAuth, action: IAuthReducer) => {
  switch (action.type) {
    case AuthActions.RestoreToken:
      return {
        ...state,
        isLoading: false,
        attributes: action.payload,
        isAuthenticated: action.payload ? true : false,
      };
    case AuthActions.SignIn:
      return {
        ...state,
        attributes: action.payload,
        isAuthenticated: action.payload ? true : false,
      };
    case AuthActions.SignOut:
      return {
        ...state,
        isLoading: false,
        attributes: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
