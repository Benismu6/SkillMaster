async function registerUser() {
  console.log("Register button clicked");

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  const credentials = role === "Provider" ? document.getElementById('credentials').value : "";
  const errorElement = document.getElementById('registerError');

  if (!username || !email || !password) {
    errorElement.textContent = 'Please fill out all required fields.';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: username,
        name: username, // Assuming name is the same as username
        email,
        password,
        role,
        credentials,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Registration Successful! You can now log in.');
      window.location.href = '/registration_page/login.html'; // Redirect to login page
    } else {
      errorElement.textContent = result.message || 'Registration failed.';
    }
  } catch (error) {
    errorElement.textContent = 'Error connecting to the server. Please try again later.';
    console.error('Error during registration:', error);
  }
}

// Login functionality
function loginUser() {
  console.log("Login button clicked");

  const loginUsername = document.getElementById('loginUsername').value;
  const loginPassword = document.getElementById('loginPassword').value;
  const errorElement = document.getElementById('loginError');

  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  if (loginUsername === storedUsername && loginPassword === storedPassword) {
    alert('Login Successful!');
  } else {
    errorElement.textContent = 'Invalid username or password.';
  }
}

// Load navigation
fetch('../common_html/minimal-nav.html')
  .then(response => response.text())
  .then(data => {
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) navPlaceholder.innerHTML = data;
  })
  .catch(error => console.error('Error loading navigation:', error));

// Load footer
fetch('../common_html/footer.html')
  .then(response => response.text())
  .then(data => {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.innerHTML = data;
  })
  .catch(error => console.error('Error loading footer:', error));