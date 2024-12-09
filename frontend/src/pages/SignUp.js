import React, { useState } from 'react';
import '../assets/css/global.css'; // Global styles
import '../assets/css/sign-up.css'; // Page-specific styles

function SignUp() {
    const [role, setRole] = useState('Seeker');
    const [formData, setFormData] = useState({
        userId: '',
        username: '',
        email: '',
        password: '',
        credentials: '',
        profilePicture: '',
        bio: '',
        phone: '',
        address: '',
        specialties: '',
    });

    const toggleFields = (newRole) => {
        setRole(newRole);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const registerUser = async () => {
        const {
            userId,
            username,
            email,
            password,
            credentials,
            profilePicture,
            bio,
            phone,
            address,
            specialties,
        } = formData;

        if (!userId || !username || !email || !password) {
            alert('All fields are required!');
            return;
        }

        const data = {
            userId,
            name: username,
            email,
            password,
            role: [role.toLowerCase()], // Send role as an array
            profilePicture: profilePicture || '',
            bio: bio || '',
            contactDetails: {
                phone: phone || '',
                address: address || '',
            },
            credentials: role === 'Provider' ? (credentials ? [credentials] : []) : [],
            specialties: role === 'Provider' ? (specialties ? specialties.split(',') : []) : [],
        };

        try {
            const response = await fetch('http://localhost:3000/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                alert(error.message || 'Registration failed.');
                return;
            }

            alert('Registration successful! Please log in.');
        } catch (err) {
            console.error(err);
            alert('An error occurred during registration.');
        }
    };

    return (
        <div className="container">
            <nav className="minimal-nav">
                <a href="/" className="logo">SkillMaster</a>
                <a href="/">Home</a>
            </nav>

            <h2>Sign Up</h2>

            <input
                type="text"
                id="userId"
                placeholder="User ID (unique username)"
                value={formData.userId}
                onChange={handleInputChange}
                required
            />

            <select id="role" value={role} onChange={(e) => toggleFields(e.target.value)}>
                <option value="Seeker">Seeker</option>
                <option value="Provider">Provider</option>
            </select>

            <input
                type="text"
                id="username"
                placeholder="Full Name"
                value={formData.username}
                onChange={handleInputChange}
                required
            />
            <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
            />
            <input
                type="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
            />

            <input
                type="text"
                id="profilePicture"
                placeholder="Profile Picture URL"
                value={formData.profilePicture}
                onChange={handleInputChange}
            />
            <textarea
                id="bio"
                placeholder="Tell us about yourself"
                value={formData.bio}
                onChange={handleInputChange}
            />

            <input
                type="text"
                id="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
            />
            <input
                type="text"
                id="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
            />

            {role === 'Provider' && (
                <div id="provider-fields">
                    <input
                        type="text"
                        id="credentials"
                        placeholder="Credentials (e.g., certifications, experience) - (comma-separated)"
                        value={formData.credentials}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        id="specialties"
                        placeholder="Specialties (comma-separated)"
                        value={formData.specialties}
                        onChange={handleInputChange}
                    />
                    <p className="info">
                        We will review your credentials and specialties to ensure proficiency. This may take some time.
                    </p>
                </div>
            )}

            <button onClick={registerUser}>Register</button>
            <p>Already have an account? <a href="/login">Log In</a></p>
        </div>
    );
}

export default SignUp;
