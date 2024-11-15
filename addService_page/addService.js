// Run the script only after the page content has loaded
document.addEventListener("DOMContentLoaded", function() {

    // Get references to the form and confirmation message elements
    const form = document.getElementById("serviceForm");
    const confirmationMessage = document.getElementById("confirmationMessage");

    // New elements for service type selection, availability section, and live stream link
    const liveServiceRadio = document.getElementById("liveService");
    const postServiceRadio = document.getElementById("postService");
    const availabilitySection = document.getElementById("availabilitySection");
    const liveStreamLinkSection = document.getElementById("liveStreamLinkSection");

    // Function to toggle availability section and live stream link based on service type
    function toggleServiceTypeSections() {
        if (liveServiceRadio.checked) {
            availabilitySection.style.display = "block";
            liveStreamLinkSection.style.display = "block";
        } else if (postServiceRadio.checked) {
            availabilitySection.style.display = "none";
            liveStreamLinkSection.style.display = "none";
        }
    }

    // Set up event listeners for radio buttons to toggle sections
    liveServiceRadio.addEventListener("change", toggleServiceTypeSections);
    postServiceRadio.addEventListener("change", toggleServiceTypeSections);

    // Main function that initializes form handling

    // Main function that initializes form handling
    function initializeForm() {
        // Set up event listener for the form submission
        form.addEventListener("submit", handleFormSubmit);
    }

    // Function to collect data from the form fields
    function collectFormData() {
        // Gather data from each input field and return it as an object
        return {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            category: document.getElementById("category").value,
            price: document.getElementById("price").value,
            location: document.getElementById("location").value,

            // Collect checked values for availability checkboxes
            availability: Array.from(document.querySelectorAll("input[name='availability']:checked"))
                .map(checkbox => checkbox.value),

            // Dropdown selections
            time: document.getElementById("time").value,
            experience: document.getElementById("experience").value,

            // Optional fields
            contact: document.getElementById("contact").value,
            pricingDetails: document.getElementById("pricingDetails").value,
            serviceDetails: document.getElementById("serviceDetails").value,

            // Tags split into an array
            tags: document.getElementById("tags").value.split(",").map(tag => tag.trim())
        };
    }

    // Function to handle form submission
    function handleFormSubmit(event) {
        // Prevent the default page refresh behavior on form submission
        event.preventDefault();

        // Collect data from the form
        const serviceData = collectFormData();

        // Log data to confirm it has been collected correctly
        console.log("Service Data to Send:", serviceData);

        // Send the collected data to the server
        sendDataToServer(serviceData);
    }

    // Function to send data to the server
    function sendDataToServer(serviceData) {
        fetch("/api/services", {  // Connects to the backend endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/json"  // Sending JSON data
            },
            body: JSON.stringify(serviceData)  // Data from the form, in JSON format
        })
            .then(response => response.json())  // Parses the response from the backend
            .then(data => displayConfirmationMessage("Service submitted successfully!"))  // Shows success
            .catch(error => displayErrorMessage("Error submitting service. Please try again."));
    }

    // Function to display a success message on the page
    function displayConfirmationMessage(message) {
        confirmationMessage.textContent = message;
        confirmationMessage.style.color = "green";
        form.reset(); // Clear the form after successful submission
    }

    // Function to display an error message on the page
    function displayErrorMessage(message) {
        confirmationMessage.textContent = message;
        confirmationMessage.style.color = "red";
    }

    // Initialize the form handling
    initializeForm();
});
