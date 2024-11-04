document.getElementById('serviceForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const serviceName = document.getElementById('serviceName').value;
    const serviceDescription = document.getElementById('serviceDescription').value;
    const servicePrice = document.getElementById('servicePrice').value;
    const serviceSkill = document.getElementById('serviceSkill').value.toLowerCase();
    const serviceAge = document.getElementById('serviceAge').value;
    const serviceGender = document.getElementById('serviceGender').value;
    const serviceExperience = document.getElementById('serviceExperience').value;

    const service = {
        name: serviceName,
        description: serviceDescription,
        price: servicePrice,
        skill: serviceSkill,
        age: serviceAge,
        gender: serviceGender,
        experience: serviceExperience
    };

    // Get existing services from local storage
    const services = JSON.parse(localStorage.getItem('services')) || [];
    
    // Add new service to the list
    services.push(service);
    
    // Save updated services to local storage
    localStorage.setItem('services', JSON.stringify(services));

    // Clear the form fields
    document.getElementById('serviceForm').reset();
    alert("Service added successfully!");
});
