function registerUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('registerError');
  
    if (username === '' || password === '') {
      errorElement.textContent = 'Please fill out all fields.';
      return;
    }
  //Need to change from local storage to database later
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  
    alert('Registration Successful! Now you can login.');
    window.location.href = 'index.html';
  }
  function loginUser() {
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

  // Load the minimal navigation
  fetch('common_html\minimal-nav.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('nav-placeholder').innerHTML = data;
  });

  // Load the footer
  fetch('common_html\footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  });