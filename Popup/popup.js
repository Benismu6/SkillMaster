export class Popup {
    constructor() {
        this.createPopup();
    }

    // Create the Popup and Attach to DOM
    createPopup() {
        // Check if the popup already exists
        if (document.getElementById("popup-container")) return;

        const popup = document.createElement("div");
        popup.id = "popup-container";
        popup.className = "popup-container";
        popup.style.display = "none"; // Initially hidden

        popup.innerHTML = `
            <img id="popup-image" class="popup-image" src="../Popup/saddrake.gif" alt="Sad Drake">
            <div id="popup-message" class="popup-message">Something went wrong!</div>
            <button id="popup-close-button" class="popup-close-button">Close</button>
        `;

        document.body.appendChild(popup);

        // Attach event listener to the Close button
        const closeButton = document.getElementById("popup-close-button");
        if (closeButton) {
            closeButton.addEventListener("click", this.hidePopup);
        } else {
            console.error("Close button not found!");
        }
    }

    // Show the Popup with a Custom Message
    showPopup(message) {
        const popup = document.getElementById("popup-container");
        const messageContainer = document.getElementById("popup-message");

        if (popup && messageContainer) {
            messageContainer.textContent = message;
            popup.style.display = "block"; // Make the popup visible
        } else {
            console.error("Popup container or message container not found!");
        }
    }

    // Hide the Popup
    hidePopup() {
        const popup = document.getElementById("popup-container");

        if (popup) {
            popup.style.display = "none"; // Hide the popup
        } else {
            console.error("Popup container not found!");
        }
    }
}
