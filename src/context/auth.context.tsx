import React, {
  createContext,
  FC,
  memo,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import {
  authReducer,
  IAuthReducer,
  TCurrentUser,
} from "../reducers/auth.reducer";

const AuthStateContext = createContext<TCurrentUser>({
  isLoading: false,
  attributes: null,
});
const AuthDispatchContext = createContext<(d: IAuthReducer) => void>(() => {});

interface iAuthProviderProps {
  children: ReactNode;
}
const AuthProvider: FC<iAuthProviderProps> = memo(({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    attributes: null,
  } as TCurrentUser);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
});

function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}
const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthState, useAuthDispatch };
