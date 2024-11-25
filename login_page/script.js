// Function to handle user login
async function loginUser() {
    // Collect inputs from the login form
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Select the error message element
    const errorElement = document.getElementById("registerError");

    // Validate inputs
    if (!email || !password) {
        errorElement.textContent = "Please fill in both fields.";
        return;
    }

    // Prepare the payload for the backend
    const data = { email, password };

    try {
        // Send a POST request to the backend login endpoint
        const response = await axios.post("http://localhost:3000/api/users/login", data);

        // Handle success
        if (response.status === 200) {
            const result = response.data;

            // Store the token in localStorage for future authentication
            localStorage.setItem("token", result.token);

            alert("Login successful!");
            errorElement.textContent = ""; // Clear any previous errors

            // Redirect user to the homepage or dashboard
            window.location.href = "/homepage.html";
        }
    } catch (error) {
        // Handle errors
        if (error.response) {
            // Display backend error message
            errorElement.textContent = error.response.data.message || "Login failed.";
        } else {
            // Handle network or unexpected errors
            errorElement.textContent = "An error occurred. Please try again.";
        }
        console.error("Login error:", error);
    }
}
