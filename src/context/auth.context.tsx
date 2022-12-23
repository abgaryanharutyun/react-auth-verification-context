import React, {
  createContext,
  FC,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";
import {
  AuthActions,
  authReducer,
  TAuth,
  TCurrentUser,
} from "../reducers/auth.reducer";

const AuthStateContext = createContext<TAuth>({
  isLoading: false,
  attributes: null,
  login: () => {},
  logout: () => {},
  restoreToken: () => {},
});

interface iAuthProviderProps {
  children: ReactNode;
}
const AuthProvider: FC<iAuthProviderProps> = memo(({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    attributes: null,
    isAuthenticated: false,
  } as TAuth);

  const login = useCallback((user: TCurrentUser) => {
    dispatch({ type: AuthActions.SignIn, payload: user });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: AuthActions.SignOut, payload: null });
  }, []);

  const restoreToken = useCallback((user: TCurrentUser) => {
    dispatch({ type: AuthActions.RestoreToken, payload: user });
  }, []);

  return (
    <AuthStateContext.Provider
      value={{ ...state, login, logout, restoreToken }}
    >
      {children}
    </AuthStateContext.Provider>
  );
});

function useAuth() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
