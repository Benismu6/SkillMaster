document.addEventListener("DOMContentLoaded", () => {
    const profileForm = document.getElementById("profileForm");

    // Get the token from localStorage or sessionStorage
    const token = localStorage.getItem("token");

    // If the token doesn't exist, redirect to login
    if (!token) {
        window.location.href = "/login.html";
        return;
    }

    // Fetch user data when the page loads
    const fetchUserData = async () => {
        try {
            const res = await fetch("/api/users/profile/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                const user = data.user;

                // Populate the profile form with user data
                document.getElementById("profileName").textContent = user.name;
                document.getElementById("profileEmail").textContent = user.email;
                document.getElementById("profileBio").textContent = user.bio || "No bio available";
                document.getElementById("profileImage").src = user.profilePicture || "default-profile.png";
                document.getElementById("name").value = user.name;
                document.getElementById("email").value = user.email;
                document.getElementById("bio").value = user.bio || "";
                document.getElementById("profilePicture").value = user.profilePicture || "";
            } else {
                alert("Failed to load user profile.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Call fetchUserData to display the user's data when the page loads
    fetchUserData();

    // Handle form submission to update user profile
    profileForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const updatedUserData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            bio: document.getElementById("bio").value,
            profilePicture: document.getElementById("profilePicture").value,
        };

        try {
            const res = await fetch("/api/users/profile/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedUserData),
            });

            if (res.ok) {
                alert("Profile updated successfully!");
                fetchUserData(); // Refresh the profile data
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    });
});
