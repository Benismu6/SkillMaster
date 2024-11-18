// Wait until the DOM content is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Get references to important elements on the page
    const form = document.getElementById("serviceForm");
    const liveServiceRadio = document.getElementById("liveService");
    const postServiceRadio = document.getElementById("postService");
    const liveStreamLinkSection = document.getElementById("liveStreamLinkSection");
    const tutorialSection = document.getElementById("tutorialSection");
    const stepsSection = document.getElementById("stepsSection");
    const addStepButton = document.getElementById("addStepButton");
    const confirmationMessage = document.getElementById("confirmationMessage");
    let stepCount = 1; // Counter for tracking the number of steps added

    // Function to toggle between livestreaming and tutorial sections
    function toggleSections() {
        if (liveServiceRadio.checked) {
            // Show livestreaming link section if "Live Video Streaming" is selected
            liveStreamLinkSection.style.display = "block";
            tutorialSection.style.display = "none";
        } else if (postServiceRadio.checked) {
            // Show tutorial creation section if "Post Content Online" is selected
            liveStreamLinkSection.style.display = "none";
            tutorialSection.style.display = "block";
        }
    }

    // Event listeners for radio buttons to toggle sections
    liveServiceRadio.addEventListener("change", toggleSections);
    postServiceRadio.addEventListener("change", toggleSections);

    // Function to add a new step to the tutorial
    addStepButton.addEventListener("click", () => {
        stepCount++; // Increment step counter
        const newStep = document.createElement("div");
        newStep.classList.add("step"); // Add a class for styling
        newStep.id = `step${stepCount}`; // Unique ID for the step
        newStep.innerHTML = `
            <h3>Step ${stepCount}</h3>
            <label for="stepTitle${stepCount}">Step Title:</label>
            <input type="text" id="stepTitle${stepCount}" name="stepTitle${stepCount}" required>
            
            <label for="stepDescription${stepCount}">Step Description:</label>
            <textarea id="stepDescription${stepCount}" name="stepDescription${stepCount}" rows="4" required></textarea>

            <label for="stepMedia${stepCount}">Upload Media (Optional):</label>
            <input type="file" id="stepMedia${stepCount}" name="stepMedia${stepCount}" accept="image/*,video/*">
        `;
        stepsSection.appendChild(newStep); // Add the new step to the steps section
    });

    // Event listener for form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default page refresh on form submission

        // Create a FormData object to gather form data
        const formData = new FormData(form);
        if (postServiceRadio.checked) {
            // Collect tutorial steps if "Post Content Online" is selected
            const steps = Array.from(stepsSection.querySelectorAll(".step")).map((step, index) => ({
                stepNumber: index + 1,
                stepTitle: step.querySelector(`#stepTitle${index + 1}`).value,
                stepDescription: step.querySelector(`#stepDescription${index + 1}`).value,
            }));
            formData.append("tutorialSteps", JSON.stringify(steps));
        }

        // Send the form data to the server
        fetch("/api/services", {
            method: "POST", // Use POST method
            body: formData, // Send the form data
        })
            .then(response => response.json()) // Parse the response as JSON
            .then(data => {
                // Display a success message
                confirmationMessage.textContent = "Service submitted successfully!";
                confirmationMessage.style.color = "green";
                form.reset(); // Reset the form after submission
            })
            .catch(error => {
                // Display an error message
                confirmationMessage.textContent = "Error submitting service. Please try again.";
                confirmationMessage.style.color = "red";
            });
    });
});
