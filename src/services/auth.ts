const signIn = async (email: string, password: string) => {
  try {
    return true;
  } catch (error) {
    return false;
  }
};

const signUp = async (username: string, password: string) => {
  try {
    return true;
  } catch (error) {
    return false;
  }
};

const confirmSignUp = async (email: string, code: string) => {
  try {
    return true;
  } catch (error) {
    return false;
  }
};

const signOut = async () => {
  try {
    return true;
  } catch (error) {
    return false;
  }
};

const checkAuth = async () => {
  try {
    return true;
  } catch (error) {
    return false;
  }
};

const resendVerificationCode = async (email: string) => {
  try {
    return true;
  } catch (error) {
    return false;
  }
};

export { signIn, signOut, checkAuth, signUp, confirmSignUp, resendVerificationCode };
