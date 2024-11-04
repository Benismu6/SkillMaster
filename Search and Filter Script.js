function filterServices() {
    const searchInput = document.getElementById('searchBar').value.toLowerCase();
    const genderFilter = document.getElementById('genderFilter').value;
    const minExperience = parseInt(document.getElementById('minExperience').value) || 0;
    const maxExperience = parseInt(document.getElementById('maxExperience').value) || Infinity;

    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        const skill = item.getAttribute('data-skill').toLowerCase();
        const gender = item.getAttribute('data-gender');
        const experience = parseInt(item.getAttribute('data-experience'));

        const matchesSearch = skill.includes(searchInput);
        const matchesGender = !genderFilter || gender === genderFilter;
        const matchesExperience = experience >= minExperience && experience <= maxExperience;

        if (matchesSearch && matchesGender && matchesExperience) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}
s