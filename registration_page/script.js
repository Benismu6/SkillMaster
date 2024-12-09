// Function to handle user login
async function loginUser() {
  // Get the username and password entered by the user
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Ensure both fields are filled
  if (!username || !password) {
    document.getElementById("registerError").textContent = "Username and password are required.";
    return;
  }

  // Prepare login data to send to the server
  const loginData = {
    email: username, // Assuming username is the email
    password: password,
  };

  try {
    // Send a POST request to the login API
    const response = await fetch("http://127.0.0.1:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    // Parse the JSON response from the server
    const result = await response.json();

    // Check if the login was successful
    if (response.ok) {
      // Redirect user based on their role
      const role = result.user.role; // Get user's role from the response

      // If 'seeker', go to the seeker profile page
      if (role.includes("seeker")) {
        window.location.href = "../profile_pages/seeker-profile.html";
      }
      // If 'provider', go to the provider public profile page
      else if (role.includes("provider")) {
        window.location.href = "../profile_pages/public-provider.html";
      } else {
        // If role is not recognized, show an error
        document.getElementById("registerError").textContent = "Unknown user role.";
      }
    } else {
      // Show an error message if the login failed
      document.getElementById("registerError").textContent = result.message || "Login failed.";
    }
  } catch (error) {
    // Handle unexpected errors like network issues
    console.error("Error during login:", error);
    document.getElementById("registerError").textContent = "An unexpected error occurred.";
  }
}
