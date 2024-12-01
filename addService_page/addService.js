// References to the form and dynamic elements
const serviceForm = document.getElementById("serviceForm"); // Main form element
const stepsSection = document.getElementById("stepsSection"); // Section where tutorial steps are added
const addStepButton = document.getElementById("addStepButton"); // Button to add a new tutorial step

let stepCounter = 1; // Tracks the number of steps in the tutorial

// Event listener to add a new tutorial step dynamically
addStepButton.addEventListener("click", () => {
    stepCounter++; // Increment the step counter

    // Create a new div for the step
    const stepDiv = document.createElement("div");
    stepDiv.classList.add("step"); // Add a class for styling
    stepDiv.id = `step-${stepCounter}`; // Unique ID for each step

    // HTML for the new step (content and media fields)
    stepDiv.innerHTML = `
        <label for="stepContent-${stepCounter}">Step ${stepCounter} Content:</label>
        <textarea id="stepContent-${stepCounter}" name="steps[${stepCounter - 1}][content]" rows="3" required></textarea>
        <label for="stepMedia-${stepCounter}">Media URLs (comma-separated):</label>
        <input type="text" id="stepMedia-${stepCounter}" name="steps[${stepCounter - 1}][media]" placeholder="e.g., http://example.com/image.jpg">
    `;

    stepsSection.appendChild(stepDiv); // Append the new step to the steps section
});

// Event listener to handle form submission
serviceForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
        // Step 1: Collect service data from the form
        const serviceData = {
            title: document.getElementById("title").value, // Service title
            description: document.getElementById("description").value, // Service description
            category: document.getElementById("category").value, // Service category
            price: parseFloat(document.getElementById("price").value), // Price as a number
            tags: document.getElementById("tags").value.split(",").map(tag => tag.trim()), // Split tags into an array
            experience: document.getElementById("experience").value, // Experience level
            contact: document.getElementById("contact").value, // Contact information
            additionalDetails: document.getElementById("additionalDetails").value || null, // Optional additional details
            imageUrl: document.getElementById("imageUrl").value || null, // Optional image URL
        };

        // Step 2: Send service data to the backend
        const serviceResponse = await fetch("/api/services", {
            method: "POST", // HTTP POST method
            headers: { "Content-Type": "application/json" }, // Indicate JSON data
            body: JSON.stringify(serviceData), // Convert the service data object to JSON
        });

        // Check if the service creation was successful
        if (!serviceResponse.ok) {
            const errorData = await serviceResponse.json(); // Extract error details
            throw new Error(errorData.message || "Failed to create service."); // Handle error
        }

        // Parse the response to get the serviceId
        const serviceResult = await serviceResponse.json();
        const serviceId = serviceResult.service.serviceId; // Extract the serviceId

        // Step 3: Collect tutorial data from the form
        const tutorialData = {
            serviceId, // Link tutorial to the created service
            title: document.getElementById("tutorialTitle").value, // Tutorial title
            description: document.getElementById("tutorialDescription").value, // Tutorial description
            steps: [], // Initialize an empty array for steps
        };

        // Collect all tutorial steps dynamically
        document.querySelectorAll(".step").forEach((stepDiv, index) => {
            const content = document.getElementById(`stepContent-${index + 1}`).value; // Step content
            const media = document.getElementById(`stepMedia-${index + 1}`).value
                .split(",") // Split media URLs by commas
                .map(url => url.trim()); // Remove extra spaces around URLs
            tutorialData.steps.push({ stepNumber: index + 1, content, media }); // Add step to the array
        });

        // Step 4: Send tutorial data to the backend
        const tutorialResponse = await fetch("/api/tutorials", {
            method: "POST", // HTTP POST method
            headers: { "Content-Type": "application/json" }, // Indicate JSON data
            body: JSON.stringify(tutorialData), // Convert the tutorial data object to JSON
        });

        // Check if the tutorial creation was successful
        if (!tutorialResponse.ok) {
            const errorData = await tutorialResponse.json(); // Extract error details
            throw new Error(errorData.message || "Failed to create tutorial."); // Handle error
        }

        // Parse the response to confirm success
        const tutorialResult = await tutorialResponse.json();

        // Success: Notify the user
        alert("Service and tutorial created successfully!");

        // Reset the form after successful submission
        serviceForm.reset(); // Clear all form fields
        stepsSection.innerHTML = ""; // Clear dynamically added steps
        stepCounter = 1; // Reset step counter
    } catch (error) {
        // Handle errors during the process
        console.error(error); // Log the error for debugging
        alert(`Error: ${error.message}`); // Show an error message to the user
    }
});
