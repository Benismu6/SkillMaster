import React, { useState } from 'react';
import '../assets/css/global.css'; // global styles
import '../assets/css/login-page.css'; // Login-specific styles

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    // need to implement login logic here, potentially using an API
    console.log('Logging in:', { email, password });
    alert('Login functionality is a placeholder.');
  };

  return (
    <div className="container">
      <nav className="minimal-nav">
        <a href="/" className="logo">SkillMaster</a>
        <a href="/">Home</a>
      </nav>
      <h2>Log In</h2>
      <input
        type="text"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={loginUser}>Login</button>
      <p className="error" id="registerError"></p>
      <p className="signup-prompt">Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
}

export default Login;
