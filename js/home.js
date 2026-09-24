document.addEventListener("DOMContentLoaded", () => {
  // Initialize Top Carousel
  initCarousel({
    containerSelector: "#topCarousel",
    dotsSelector: "#topCarouselDots",
    intervalTime: 4000,
  });

  // Initialize Sponsor Carousel
  initCarousel({
    containerSelector: "#sponsorCarousel",
    dotsSelector: "#sponsorCarouselDots",
    intervalTime: 3500,
  });

  // Search button interaction (Prevent reload & provide visual feedback)
  const searchBtn = document.getElementById("searchSubmitBtn");
  const jobTitleInput = document.getElementById("jobTitleInput");

  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const keyword = jobTitleInput ? jobTitleInput.value.trim() : "";
      
      searchBtn.style.transform = "scale(0.95)";
      setTimeout(() => {
        searchBtn.style.transform = "";
      }, 150);

      // Temporary button state change
      const originalText = searchBtn.textContent;
      searchBtn.textContent = "กำลังค้นหา";
      setTimeout(() => {
        searchBtn.textContent = originalText;
        if (keyword) {
          alert(`ผลการค้นหาสำหรับ: "${keyword}"`);
        } else {
          alert("ล้อเล่น");
        }
      }, 400);
    });
  }
});

/**
 * Reusable Carousel Initializer
 * @param {Object} options
 * @param {string} options.containerSelector
 * @param {string} options.dotsSelector
 * @param {number} options.intervalTime
 */
function initCarousel({ containerSelector, dotsSelector, intervalTime = 4000 }) {
  const container = document.querySelector(containerSelector);
  const dotsContainer = document.querySelector(dotsSelector);

  if (!container || !dotsContainer) return;

  const slides = container.querySelectorAll(".slide-item");
  const dots = dotsContainer.querySelectorAll(".dot");

  if (slides.length === 0 || dots.length === 0) return;

  let currentIndex = 0;
  let timer = null;

  function showSlide(index) {
    // Wrap around index
    if (index >= slides.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slides.length - 1;
    } else {
      currentIndex = index;
    }

    // Update slides
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    // Update dots
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    timer = setInterval(nextSlide, intervalTime);
  }

  function stopAutoPlay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // Bind click on pagination dots
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      startAutoPlay(); // Restart timer after manual click
    });
  });

  // Pause on hover (Desktop)
  container.addEventListener("mouseenter", stopAutoPlay);
  container.addEventListener("mouseleave", startAutoPlay);
  dotsContainer.addEventListener("mouseenter", stopAutoPlay);
  dotsContainer.addEventListener("mouseleave", startAutoPlay);

  // Touch swipe support for mobile & tablet devices
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    },
    { passive: true }
  );

  container.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoPlay();
    },
    { passive: true }
  );

  function handleSwipe() {
    const swipeThreshold = 40; // minimum distance in px to trigger swipe
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left -> Next slide
      showSlide(currentIndex + 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right -> Prev slide
      showSlide(currentIndex - 1);
    }
  }

  // Start autoplay initially
  showSlide(0);
  startAutoPlay();
}
