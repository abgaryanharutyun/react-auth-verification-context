<p align="center">
  <img alt="react-theme-provider" src="./assets/auth-provider-logo-2.jpg" >
</p>

---

<div style='display: flex'>

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/abgaryanharutyun/react-auth-verification-context/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/abgaryanharutyun/react-auth-verification-context/tree/master)

<div style="width: 10px"></div>

[![codecov](https://codecov.io/gh/abgaryanharutyun/react-auth-verification-context/branch/master/graph/badge.svg?token=YSQ2HFT892)](https://codecov.io/gh/abgaryanharutyun/react-auth-verification-context)

<div style="width: 10px"></div>

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

</div>
## About

`react-auth-verification-context` is a library that provides a way to manage authentication state in a React application. It is implemented using the React context API, which allows you to pass data through the component tree without having to pass props down manually at every level.

To use `react-auth-verification-context`, you will need to wrap your root component with an AuthProvider component, which provides the authentication state and methods for updating it as props to its children. You can then use the useAuth hook to access the authentication state and methods from within any descendant component.

## Features

- Works in **React** and **React Native**
  - `AuthProvider` - Provider component
  - `useAuth` - React Hook
    - `login`
    - `logout`
    - `restoreToken`
    - `isAuthenticated`
    - `attributes`

## Getting started

### Installation

```sh
yarn add react-auth-verification-context
```

or using npm

```sh
npm install react-auth-verification-context --save
```

### Usage

```javascript
import { AuthProvider, useAuth } from 'react-auth-verification-context';

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
        console.log('error', e);
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
        <button onClick={() => login({ name: 'John Smit', id: '123' })}>Login</button>
      )}
    </div>
  );
}
```

In this example, the `AuthProvider` component provides the `isAuthenticated`, `login`, and `logout` values as context to the `AppNavigation` component, which can then use them to render a login or logout button depending on the authentication state.
