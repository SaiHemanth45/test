import React from 'react';
// import { ReactDOM } from 'react';
// import  ReactDOM from 'react-dom';
// import  rnder from 'react-dom';
// import { render } from 'react-dom';
// import ReactDOM from 'react-dom/client';

// import { AuthProvider, AuthConsumer, AuthContext } from '../components/AuthProvider';
// import { AuthProvider } from '../components/AuthProvider';
// import { AuthProvider } from './Components/AuthProvider';
// import { Authcontext } from './Components/AuthContext';
// import { amplifyConfig } from '../config/index';
// import { Issuer } from '../utils/auth';

import App from './App';

import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render(<App />);
