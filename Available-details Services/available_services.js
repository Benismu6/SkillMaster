// Function to fetch services based on the selected filters
async function fetchServices() {
    const category = document.getElementById('category').value;
    const tags = document.getElementById('tags').value.trim();
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const search = document.getElementById('search').value.trim();

    try {
        // Construct query parameters
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (tags) params.append('tags', tags);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        if (search) params.append('search', search);

        // Get the token from localStorage (assuming the user is authenticated)
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert("You need to be logged in to view services.");
            return;
        }

        // Send GET request to fetch filtered services, with the token in the Authorization header
        const response = await axios.get('http://localhost:3000/api/services', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: params,
        });

        // Get the services data
        const services = response.data.services;

        // Get the services list element
        const servicesList = document.getElementById('servicesList');

        // Clear previous services
        servicesList.innerHTML = '';

        // Check if no services were found
        if (services.length === 0) {
            servicesList.innerHTML = '<p>No services found matching your criteria.</p>';
        } else {
            // Display the fetched services
            services.forEach(service => {
                const serviceDiv = document.createElement('div');
                serviceDiv.classList.add('service-item');
                serviceDiv.innerHTML = `
                    <h3>${service.title}</h3>
                    <p><strong>Category:</strong> ${service.category}</p>
                    <p><strong>Description:</strong> ${service.description}</p>
                    <p><strong>Price:</strong> $${service.price}</p>
                    <p><strong>Experience Level:</strong> ${service.experience}</p>
                    <p><strong>Contact:</strong> ${service.contact}</p>
                `;

                // Add click event to navigate to service detail page
                serviceDiv.addEventListener('click', () => {
                    // Navigate to service detail page with service ID
                    window.location.href = `/service-detail.html?id=${service.serviceId}`;
                });

                // Add hover effect for better UX
                serviceDiv.style.cursor = 'pointer';
                serviceDiv.addEventListener('mouseover', () => {
                    serviceDiv.style.backgroundColor = '#f0f0f0';
                });
                serviceDiv.addEventListener('mouseout', () => {
                    serviceDiv.style.backgroundColor = '';
                });

                servicesList.appendChild(serviceDiv);
            });
        }
    } catch (error) {
        console.error('Error fetching services:', error);
        document.getElementById('servicesList').innerHTML = '<p>Error loading services. Please try again later.</p>';
    }
}

// Add event listeners to filter inputs
document.getElementById('category').addEventListener('change', fetchServices);
document.getElementById('tags').addEventListener('input', fetchServices);
document.getElementById('minPrice').addEventListener('input', fetchServices);
document.getElementById('maxPrice').addEventListener('input', fetchServices);
document.getElementById('search').addEventListener('input', fetchServices);

// Initial fetch of services
document.addEventListener('DOMContentLoaded', fetchServices);
