// Get all stat value elements
const statValues = document.querySelectorAll('.stat-value');

// Options for the Intersection Observer
const options = {
  threshold: 0.7 // Trigger when 70% of the element is visible
};

// Function to handle the number increase animation
function animateStats(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targetValue = parseInt(entry.target.dataset.target);
      const duration = 2000; // Animation duration in milliseconds
      const step = Math.ceil(targetValue / (duration / 16)); // Update the value every 16ms (60fps)

      let currentValue = 0;

      const interval = setInterval(() => {
        if (currentValue >= targetValue) {
          clearInterval(interval);
        } else {
          currentValue += step;
          entry.target.textContent = currentValue;
        }
      }, 16);

      // Unobserve the target once the animation is triggered
      observer.unobserve(entry.target);
    }
  });
}

// Create a new Intersection Observer instance
const observer = new IntersectionObserver(animateStats, options);

// Observe each stat value element
statValues.forEach(value => {
  observer.observe(value);
});
