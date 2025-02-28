const carouselContainer = document.querySelector(".carousel-container");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let slideIndex = 1;
let isTransitioning = false;

// Clone first and last slides for seamless effect
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

carouselContainer.appendChild(firstClone);
carouselContainer.insertBefore(lastClone, slides[0]);

const totalSlides = document.querySelectorAll(".slide").length;
carouselContainer.style.transform = `translateX(-100%)`;

// Change Slide Function
function changeSlide(n) {
  if (isTransitioning) return;
  isTransitioning = true;

  slideIndex += n;
  carouselContainer.style.transition = "transform 0.6s ease-in-out";
  carouselContainer.style.transform = `translateX(-${slideIndex * 100}%)`;

  setTimeout(() => {
    if (slideIndex >= totalSlides - 1) {
      carouselContainer.style.transition = "none";
      slideIndex = 1;
      carouselContainer.style.transform = `translateX(-100%)`;
    } else if (slideIndex <= 0) {
      carouselContainer.style.transition = "none";
      slideIndex = totalSlides - 3;
      carouselContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
    isTransitioning = false;
  }, 600);

  updateDots();
}

// Auto-slide every 5 sec
let autoSlide = setInterval(() => {
  changeSlide(1);
}, 5000);

// Pause on hover
document.querySelector(".carousel").addEventListener("mouseenter", () => {
  clearInterval(autoSlide);
});

document.querySelector(".carousel").addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => {
    changeSlide(1);
  }, 5000);
});

// Update Dots
function updateDots() {
  let realIndex = slideIndex - 1;
  if (realIndex < 0) realIndex = slides.length - 1;
  if (realIndex >= slides.length) realIndex = 0;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[realIndex].classList.add("active");
}

// Add event listeners for dots
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    slideIndex = i + 1;
    changeSlide(0);
  });
});

function goToMovie(url) {
  window.location.href = url;
}
