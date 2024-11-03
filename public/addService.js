document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("serviceForm");
    const confirmationMessage = document.getElementById("confirmationMessage");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way

        // Capture form data
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const category = document.getElementById("category").value;
        const price = document.getElementById("price").value;
        const fileUpload = document.getElementById("fileUpload").files[0];

        // Basic validation
        if (!title || !description || !category || !price) {
            confirmationMessage.textContent = "Please fill out all required fields.";
            confirmationMessage.style.color = "red";
            return;
        }

        // Simulate data submission
        const serviceData = {
            title,
            description,
            category,
            price,
            file: fileUpload ? fileUpload.name : "No file uploaded"
        };

        // For now, we simply log the data to console
        console.log("Service Submitted:", serviceData);

        // Display confirmation message
        confirmationMessage.textContent = "Your service has been successfully submitted!";
        confirmationMessage.style.color = "green";

        // Reset form fields
        form.reset();
    });
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Prepare form data to send as JSON
    const formData = new FormData(form);

    fetch("/submit-service", {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            confirmationMessage.textContent = data.message;
            confirmationMessage.style.color = "green";
            form.reset();
        })
        .catch(error => {
            confirmationMessage.textContent = "Error submitting service. Please try again.";
            confirmationMessage.style.color = "red";
        });
});
