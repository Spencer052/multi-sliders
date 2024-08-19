<script>
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-slide");
  const arrowPrev = document.querySelector(".arrow-prev");
  const arrowNext = document.querySelector(".arrow-next");
  let currentIndex = 0;

  function updateSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
    const slide = slides[index];
    const presetName = slide.getAttribute("data-preset-name");
    const imageCount = slide.getAttribute("data-image-count");
    document.querySelector(".preset-name").textContent = presetName;
    document.querySelector(".image-count").textContent = imageCount;

    // Show/Hide arrows based on the current index
    arrowPrev.style.display = index === 0 ? "none" : "block";
    arrowNext.style.display = index === slides.length - 1 ? "none" : "block";
  }

  arrowPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlide(currentIndex);
    }
  });

  arrowNext.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSlide(currentIndex);
    }
  });

  // Initialize first slide
  updateSlide(currentIndex);

  // Initialize sliders for all slides
  slides.forEach((container) => {
    const beforeImage = container.querySelector(".slider-before");
    const afterImage = container.querySelector(".slider-after");
    const handle = container.querySelector(".slider-handle");

    if (beforeImage && afterImage && handle) {
      const initialPercentage = 50;
      handle.style.left = `${initialPercentage}%`;
      afterImage.style.clipPath = `inset(0 ${100 - initialPercentage}% 0 0)`;

      let dragging = false;

      handle.addEventListener("mousedown", (e) => {
        dragging = true;
        e.preventDefault();
      });

      document.addEventListener("mouseup", () => dragging = false);
      document.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        let widthPercentage = (x / rect.width) * 100;

        widthPercentage = Math.max(0, Math.min(widthPercentage, 100));

        window.requestAnimationFrame(() => {
          handle.style.left = `${widthPercentage}%`;
          afterImage.style.clipPath = `inset(0 ${100 - widthPercentage}% 0 0)`;
        });
      });

      handle.addEventListener("touchstart", (e) => {
        dragging = true;
        e.preventDefault();
      });

      document.addEventListener("touchend", () => dragging = false);
      container.addEventListener("touchmove", (e) => {
        if (!dragging) return;

        const rect = container.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        let widthPercentage = (x / rect.width) * 100;

        widthPercentage = Math.max(0, Math.min(widthPercentage, 100));

        window.requestAnimationFrame(() => {
          handle.style.left = `${widthPercentage}%`;
          afterImage.style.clipPath = `inset(0 ${100 - widthPercentage}% 0 0)`;
        });
      });
    }
  });
});

</script>
