// <div class="countdown" data-date="25-10-2024" data-time="23:00"></div>
// Safe DOM selection function
function getElement(selector, parent = document) {
  try {
    return parent.querySelector(selector);
  } catch (e) {
    console.error("Invalid selector:", selector, e);
    return null;
  }
}

// Safe DOM selection for multiple elements
function getElements(selector, parent = document) {
  try {
    return parent.querySelectorAll(selector);
  } catch (e) {
    console.error("Invalid selector:", selector, e);
    return [];
  }
}

// Initialize all countdowns
function initializeCountdowns() {
  const countdowns = getElements(".countdown");

  countdowns.forEach((countdownEl) => {
    // Skip if already initialized
    if (countdownEl.dataset.initialized) return;
    countdownEl.dataset.initialized = "true";

    // Create countdown structure
    countdownEl.innerHTML = `
                    <div class="countdown-container">
                        <div class="countdown-unit day">
                            <div class="countdown-number">00</div>
                            <div class="countdown-label">days</div>
                        </div>
                        <div class="countdown-unit hour">
                            <div class="countdown-number">00</div>
                            <div class="countdown-label">hours</div>
                        </div>
                        <div class="countdown-unit min">
                            <div class="countdown-number">00</div>
                            <div class="countdown-label">mins</div>
                        </div>
                        <div class="countdown-unit sec">
                            <div class="countdown-number">00</div>
                            <div class="countdown-label">secs</div>
                        </div>
                    </div>
                `;

    // Get target date/time
    const dateStr = countdownEl.getAttribute("data-date") || "";
    const timeStr = countdownEl.getAttribute("data-time") || "00:00";

    try {
      const [day, month, year] = dateStr.split("-").map(Number);
      const [hours, minutes] = timeStr.split(":").map(Number);

      const targetDate = new Date(year, month - 1, day, hours, minutes, 0, 0);

      // Validate date
      if (isNaN(targetDate.getTime())) {
        throw new Error("Invalid date");
      }

      // Check if countdown should be expired
      if (Date.now() >= targetDate) {
        countdownEl.classList.add("hidden");
        const releaseContent = getElement("#release-content");
        if (releaseContent) releaseContent.classList.remove("hidden");
        return;
      }

      // Start countdown
      startCountdown(countdownEl, targetDate);
    } catch (e) {
      console.error("Error initializing countdown:", e);
      countdownEl.innerHTML = '<div class="text-danger">Invalid date format</div>';
    }
  });
}

function startCountdown(element, targetDate) {
  function update() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      element.classList.add("hidden");
      const releaseContent = getElement("#release-content");
      if (releaseContent) releaseContent.classList.remove("hidden");
      return;
    }

    // Calculate time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    // Update display
    const pad = (n) => n.toString().padStart(2, "0");
    getElement(".day .countdown-number", element).textContent = pad(days);
    getElement(".hour .countdown-number", element).textContent = pad(hours);
    getElement(".min .countdown-number", element).textContent = pad(mins);
    getElement(".sec .countdown-number", element).textContent = pad(secs);

    requestAnimationFrame(update);
  }

  update();
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCountdowns);
} else {
  initializeCountdowns();
}

// jQuery version (optional)
if (typeof jQuery !== "undefined") {
  $(document).ready(function () {
    $(".countdown").each(function () {
      if (!this.dataset.initialized) {
        initializeCountdowns();
      }
    });
  });
}
