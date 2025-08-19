// <div class="countdown" data-date="25-10-2024" data-time="23:00"></div>
// Helper function
const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelectorAll(elem);

// Auto-generate countdown elements
function initializeCountdowns() {
  const countdowns = $$(".countdown");

  countdowns.forEach((countdownEl) => {
    // Create and insert the countdown structure
    countdownEl.innerHTML = `
       <div class="countdown-container">
            <div class="countdown-unit day">
                <div class="countdown-number">00</div>
                <div class="countdown-label">days</div>
            /div>
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

    // Get target date/time from data attributes
    const tarDate = countdownEl.getAttribute("data-date").split("-");
    const day = parseInt(tarDate[0]);
    const month = parseInt(tarDate[1]);
    const year = parseInt(tarDate[2]);
    let tarTime = countdownEl.getAttribute("data-time") || "00:00";
    let [tarhour, tarmin] = tarTime.split(":").map(Number);

    // Set the target datetime
    const countDownDate = new Date(year, month - 1, day, tarhour, tarmin, 0, 0).getTime();

    // Check if we should show the release content immediately
    const now = new Date().getTime();
    if (now >= countDownDate) {
      countdownEl.classList.add("hidden");
      $("#release-content").classList.remove("hidden");
      return;
    }

    // Start the countdown
    updateCountdown(countdownEl, countDownDate);
  });
}

function updateCountdown(countdownEl, targetDate) {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    countdownEl.classList.add("hidden");
    $("#release-content").classList.remove("hidden");
    return;
  }

  // Calculate time units
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update display
  countdownEl.querySelector(".day .countdown-number").textContent = addZero(days);
  countdownEl.querySelector(".hour .countdown-number").textContent = addZero(hours);
  countdownEl.querySelector(".min .countdown-number").textContent = addZero(minutes);
  countdownEl.querySelector(".sec .countdown-number").textContent = addZero(seconds);

  requestAnimationFrame(() => updateCountdown(countdownEl, targetDate));
}

const addZero = (x) => (x < 10 && x >= 0 ? "0" + x : x);

// Initialize all countdowns on page load
document.addEventListener("DOMContentLoaded", initializeCountdowns);
