// Function to display the success modal
function showSuccessMessage(message) {
    const modal = document.getElementById("successModal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.textContent = message;
    modal.style.display = "block";
  }
  
  // Function to close the success modal
  function closeSuccessMessage() {
    const modal = document.getElementById("successModal");
    modal.style.display = "none";
  }

// Function to send a signup request
async function registerUser() {
  // Extract user inputs
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;
  const credentials = document.getElementById("credentials").value.trim();
  
  // Validate required fields
  if (!username || !email || !password || !role) {
    document.getElementById("registerError").textContent = "All required fields must be provided.";
    return;
  }
  
  // Prepare the data to send
  const userData = {
    userId: username,
    name: username, 
    email: email,
    password: password,
    role: role.toLowerCase(), // Convert role to lowercase (provider/seeker)
  };

  // Add provider-specific fields if role is Provider
  if (role === "Provider" && credentials) {
    userData.credentials = [credentials];
  }

  try {
    // Send POST request to the signup endpoint
    const response = await fetch("http://127.0.0.1:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });    

    // Parse the response
    const result = await response.json();

    if (response.ok) {
      // On success, redirect to login or display a success message
      showSuccessMessage(result.message || "Sign up successful!");
    } else {
      // Display error message from the server
      document.getElementById("registerError").textContent = result.message || "Sign up failed.";
    }
  } catch (error) {
    // Handle network or unexpected errors
    console.error("Error during sign up:", error);
    document.getElementById("registerError").textContent = "An unexpected error occurred.";
  }
}
