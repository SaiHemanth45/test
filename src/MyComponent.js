import React, { useContext, useState } from 'react';
import { AuthContext } from './Components/AuthContext';

function MyComponent() {
  const { isAuthenticated, signIn, signOut } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      alert('Sign in failed: ' + error.message);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h2>Authenticated</h2>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSignIn}>Sign In</button>
        </>
      )}
    </div>
  );
}

export default MyComponent;
