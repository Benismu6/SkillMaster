const container = document.getElementById('testimonial-container');
const cards = document.querySelectorAll('.testimonial-card');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;

function showNextCard() {
  currentIndex = (currentIndex + 1) % cards.length; // Loop to the start
  updateCarousel();
}

function showPrevCard() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length; // Loop to the end
  updateCarousel();
}

function updateCarousel() {
  container.style.transform = `translateX(-${currentIndex * (cards[0].offsetWidth + 20)}px)`;
}

// Event Listeners
nextBtn.addEventListener('click', showNextCard);
prevBtn.addEventListener('click', showPrevCard);
