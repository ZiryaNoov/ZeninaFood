// Live Clock
function updateClock() {
  const now = new Date();
  const options = { timeZone: 'Africa/Algiers', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const timeString = now.toLocaleTimeString('en-US', options);
  document.getElementById('time-numbers').textContent = timeString;
}
setInterval(updateClock, 1000);

// Weather Information
const apiKey = '70f3cb3ff881d0dac2ed826ea8425159'; // Replace with your API key if needed
const city = 'El Idrissia, Zenina'; 
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    if (data.main && data.weather) {
      const temperature = data.main.temp;
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`; // URL for the weather icon

      document.getElementById('weather-info').innerHTML = `
        <img src="${iconUrl}" alt="${data.weather[0].description}">
        <span>${Math.round(temperature)}°C</span>
      `;
    } else {
      console.error('Error fetching weather data:', data);
      document.getElementById('weather-info').textContent = 'Error fetching weather data.';
    }
  })
  .catch(error => console.error('Error fetching weather data:', error));

// Slider Controls
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const sliderContainer = document.querySelector('.slider-container');

let slideIndex = 0;
const numSlides = document.querySelectorAll('.slide').length;

function showSlide() {
slider.style.transform = `translateX(-${slideIndex * 100 / numSlides}%)`; 
}

function nextSlide() {
slideIndex = (slideIndex + 1) % numSlides;
showSlide();

if (slideIndex === 1 || slideIndex === 2 || slideIndex === 3) { 
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 7000);
} else {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 3000);
}
}

showSlide();

let slideInterval = setInterval(nextSlide, 3000); 
let isPaused = false;

sliderContainer.addEventListener('touchstart', () => {
clearInterval(slideInterval); 
isPaused = true;
});

sliderContainer.addEventListener('touchend', () => {
setTimeout(() => { 
  if (isPaused) {
    slideInterval = setInterval(nextSlide, 3000);
    isPaused = false; 
  }
}, 500);
});

prevButton.addEventListener('click', () => {
slideIndex = (slideIndex - 1 + numSlides) % numSlides;
showSlide();
});

nextButton.addEventListener('click', nextSlide);

// Animated Header
document.addEventListener("DOMContentLoaded", function() {
  const letters = document.querySelectorAll('h1 span');
  letters.forEach((letter, index) => {
      setTimeout(() => {
          letter.style.animationDelay = `${index * 0.1}s`;
          letter.style.opacity = 1;
      }, index * 100);
  });
});
function animateLetters(lettersToAnimate, duration = 1000, animationName = 'upDown 1s ease-out') {
  const letters = document.querySelectorAll('header h1 span');

  letters.forEach((letter, index) => {
    setTimeout(() => {
      letter.style.opacity = 1;
      letter.style.animation = `${animationName} forwards`;
    }, index * duration / letters.length);
  });
}
// Lottie Animations
document.addEventListener("DOMContentLoaded", function() {
  // Load and play the left animation
  var leftAnimation = lottie.loadAnimation({
    container: document.getElementById('left-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'animation/left.json' // Updated path to your left animation JSON file
  });

  // Load and play the right animation
  var rightAnimation = lottie.loadAnimation({
    container: document.getElementById('right-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'animation1/right.json' // Updated path to your right animation JSON file
  });

  // Optionally, you can control the size of the animations
  document.getElementById('left-animation').style.width = '100px';
  document.getElementById('left-animation').style.height = '100px';
  document.getElementById('right-animation').style.width = '100px';
  document.getElementById('right-animation').style.height = '100px';
});
function animateSpecificLetters(lettersToAnimate, animationName = 'upDown 1s ease-out infinite') {
  const letters = document.querySelectorAll('header h1 span');

  letters.forEach((letter, index) => {
    if (lettersToAnimate.includes(letter.textContent.toLowerCase())) {
      letter.style.animation = animationName;
    }
  });
}

function resetAnimation() {
  const letters = document.querySelectorAll('header h1 span');
  letters.forEach((letter) => {
    letter.style.animation = 'none'; // Remove any existing animations
  });
}

// Animation sequence
function animateLetters(lettersToAnimate, duration = 1000, animationName = 'upDown 1s ease-out') {
  const letters = document.querySelectorAll('header h1 span');

  letters.forEach((letter, index) => {
    setTimeout(() => {
      letter.style.opacity = 1;
      letter.style.animation = `${animationName} forwards`; 
    }, index * duration / letters.length);
  });
}

function animateSpecificLetters(lettersToAnimate, animationName = 'upDown 1s ease-out infinite') {
  const letters = document.querySelectorAll('header h1 span');

  letters.forEach((letter, index) => {
    if (lettersToAnimate.includes(letter.textContent.toLowerCase())) {
      letter.style.animation = animationName; 
    }
  });
}

function resetAnimation() {
  const letters = document.querySelectorAll('header h1 span');
  letters.forEach((letter) => {
    letter.style.animation = 'none'; 
    letter.style.transform = 'translateY(0)'; // Reset the position as well
  });
}

// Animation sequence
function animationSequence() {
  // Initial 1-second pause (no animation) - handled by the initial state of the letters

  // Full title animation (2 seconds)
  setTimeout(() => { 
    animateLetters(['Z', 'e', 'n', 'i', 'n', 'a', ' ', 'F', 'o', 'o', 'd'], 2000);
  }, 1000); // Start after the initial 1-second pause

  // Pause and transition (1 second)
  setTimeout(() => {
    resetAnimation(); 
  }, 3000); // 3 seconds (1s initial pause + 2s animation)

  // Restart the sequence for a continuous loop
  setTimeout(() => {
    animationSequence();
  }, 4000); // 4 seconds (3s from the previous timeout + 1s pause)
}

animationSequence(); // Start the animation sequence

// Continuous animation of specific letters (starts after the first sequence)
setTimeout(() => {
  animateSpecificLetters(['n', 'o']); 
}, 7000); // 7 seconds (to allow the first full animation sequence to complete)
