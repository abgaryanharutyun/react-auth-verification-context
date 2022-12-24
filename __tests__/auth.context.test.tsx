import { act, render } from '@testing-library/react';
import { AuthProvider, useAuth } from '../src/context/auth.context';
import React from 'react';
const mockUserData = {
  id: 'test-id',
  email: 'test-email',
};
const mockUserDataRestored = {
  id: 'test-id-restored',
  email: 'test-email-restored',
};
const MockChildComponent = () => {
  const { login, logout, restoreToken, isAuthenticated, attributes } = useAuth();
  return (
    <div>
      MockChildComponent
      <button onClick={() => login(mockUserData)} data-testid={'login'}>
        Login
      </button>
      <button onClick={() => login(null)} data-testid={'loginEmpty'}>
        Login empty
      </button>
      <button onClick={() => restoreToken(mockUserDataRestored)} data-testid={'restoredToken'}>
        Restore Token
      </button>
      <button onClick={() => restoreToken(null)} data-testid={'restoredTokenEmpty'}>
        Restore Token empty
      </button>
      <button onClick={logout} data-testid={'logout'}>
        Logout
      </button>
      <div data-testid={'authenticatedStatus'}>{isAuthenticated.toString()}</div>
      {isAuthenticated && (
        <>
          <div data-testid={'userId'}>{attributes.id}</div>
          <div data-testid={'userEmail'}>{attributes.email}</div>
        </>
      )}
    </div>
  );
};

describe('AuthContext', () => {
  it('should render with child component', () => {
    const { getByText } = render(
      <AuthProvider>
        <MockChildComponent />
      </AuthProvider>,
    );
    expect(getByText('MockChildComponent')).toBeTruthy();
  });

  it('should work for login function', () => {
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <MockChildComponent />
      </AuthProvider>,
    );
    act(() => {
      getByTestId('login').click();
    });
    expect(getByText(mockUserData.id)).toBeTruthy();
    expect(getByText(mockUserData.email)).toBeTruthy();

    act(() => {
      getByTestId('loginEmpty').click();
    });

    expect(getByTestId('authenticatedStatus').textContent).toBe('false');

    act(() => {
      getByTestId('restoredTokenEmpty').click();
    });

    expect(getByTestId('authenticatedStatus').textContent).toBe('false');
  });
  it('should work for logout function', () => {
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <MockChildComponent />
      </AuthProvider>,
    );
    act(() => {
      getByTestId('login').click();
    });
    expect(getByText(mockUserData.id)).toBeTruthy();
    expect(getByText(mockUserData.email)).toBeTruthy();

    act(() => {
      getByTestId('logout').click();
    });

    expect(getByTestId('authenticatedStatus').textContent).toBe('false');
  });
  it('should work for restore function', () => {
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <MockChildComponent />
      </AuthProvider>,
    );
    act(() => {
      getByTestId('login').click();
    });
    expect(getByText(mockUserData.id)).toBeTruthy();
    expect(getByText(mockUserData.email)).toBeTruthy();

    act(() => {
      getByTestId('restoredToken').click();
    });
    expect(getByText(mockUserDataRestored.id)).toBeTruthy();
    expect(getByText(mockUserDataRestored.email)).toBeTruthy();
  });
});
