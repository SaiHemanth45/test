import { createContext } from 'react';
// import { Issuer } from './utils/Auth';

export const AuthContext = createContext({
  isAuthenticated: false,
  isInitialized: false,
  user: null,
//   issuer: Issuer.Amplify,
  issuer: "Amplify",
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  confirmSignUp: () => Promise.resolve(),
  resendSignUp: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(),
  forgotPasswordSubmit: () => Promise.resolve(),
  signOut: () => Promise.resolve()
});
