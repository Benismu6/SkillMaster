import React, { useState } from 'react';
import '../assets/css/global.css'; // global styles
import '../assets/css/login-page.css'; // Login-specific styles

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const loginUser = async () => {
        // Clear previous errors
        setError('');

        // Validate inputs
        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Prepare payload
        const data = { email, password };

        try {
            setLoading(true); // Set loading state
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            // Parse response
            const result = await response.json();

            if (!response.ok) {
                // Show backend error message
                setError(result.message || 'Login failed.');
                return;
            }

            // Save token in localStorage or other secure storage
            localStorage.setItem('token', result.token);

            // Redirect user to dashboard or homepage
            alert('Login successful!');
            window.location.href = '/dashboard';
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false); // Reset loading state
        }
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
            <button onClick={loginUser} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p className="error" id="registerError">{error}</p>}
            <p className="signup-prompt">Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    );
}

export default Login;
