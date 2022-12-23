<p align="center">
  <img alt="react-theme-provider" src="./assets/auth-provider-logo.jpg" width="496">
</p>

## About

`react-auth-context` is a library that provides a way to manage authentication state in a React application. It is implemented using the React context API, which allows you to pass data through the component tree without having to pass props down manually at every level.

To use `react-auth-context`, you will need to wrap your root component with an AuthProvider component, which provides the authentication state and methods for updating it as props to its children. You can then use the useAuth hook to access the authentication state and methods from within any descendant component.

## Features

- Works in **React** and **React Native**
- `createTheming(defaultTheme)` - factory returns:
  - `AuthProvider` - component
  - `useAuth` - React Hook
    - `login`
    - `logout`
    - `restoreToken`
    - `isAuthenticated`
    - `attributes`

## Getting started

### Installation

```sh
yarn add react-auth-context
```

or using npm

```sh
npm install react-auth-context --save
```

### Usage

```javascript
import { AuthProvider, useAuth } from "react-auth-context";

function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}

function AppNavigation() {
  const { isAuthenticated, login, logout } = useAuth();
  useEffect(() => {
    const bootstrapAsync = async () => {
      setLoading(true);
      let userAttributes = null;
      try {
        const user = await checkAuth();
        const { attributes: userAttr } = user;
        userAttributes = userAttr;
      } catch (e) {
        console.log("error", e);
      }
      restoreToken(userAttributes);
      setLoading(false);
    };

    bootstrapAsync();
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => login({ name: "John Smit", id: "123" })}>
          Login
        </button>
      )}
    </div>
  );
}
```

In this example, the `AuthProvider` component provides the `isAuthenticated`, `login`, and `logout` values as context to the `AppNavigation` component, which can then use them to render a login or logout button depending on the authentication state.
