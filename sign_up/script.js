// Toggles visibility of provider-specific fields based on role selection
function toggleFields() {
    const role = document.getElementById("role").value;
    const providerFields = document.getElementById("provider-fields");

    if (role === "Provider") {
        providerFields.style.display = "block";
    } else {
        providerFields.style.display = "none";
    }
}

// Function to handle user registration
async function registerUser() {
    // Collect inputs from the form
    const userId = document.getElementById("userId").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value; // "Seeker" or "Provider"
    const credentials = role === "Provider" ? document.getElementById("credentials").value.trim() : null;

    // Select the error message element
    const errorElement = document.getElementById("registerError");

    // Validate inputs
    if (!userId || !username || !email || !password || !role) {
        errorElement.textContent = "All fields are required. Please fill them out.";
        return;
    }

    // Prepare the payload to send to the backend
    const data = {
        userId,
        name: username,
        email,
        password,
        role: [role.toLowerCase()], // Convert role to lowercase as expected by the backend
    };

    // Add credentials for providers
    if (role === "Provider" && credentials) {
        data.credentials = [credentials]; // Backend expects credentials as an array
    }

    try {
        // Send a POST request to the backend
        const response = await axios.post("http://localhost:3000/api/users/signup", data);

        // Handle success
        alert("Registration successful! Please log in.");
        errorElement.textContent = ""; // Clear any previous errors
        window.location.href = "../login_page/login.html"; // Redirect to login page
    } catch (error) {
        // Handle errors
        if (error.response) {
            // Backend error
            errorElement.textContent = error.response.data.message || "Registration failed. Please try again.";
        } else {
            // Network or unexpected error
            errorElement.textContent = "An error occurred. Please try again.";
        }
        console.error("Error during registration:", error);
    }
}

