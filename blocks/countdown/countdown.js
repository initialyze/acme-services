/*
 * Countdown Timer Block
 * Display countdown to event date
 */
export default function decorate(block) {
  // Get the event date from the first cell
  const dateCell = block.querySelector('div:nth-child(1)');
  const dateValue = dateCell?.textContent.trim();

  // Create the countdown container
  const countdownContainer = document.createElement('div');
  countdownContainer.className = 'countdown-container';

  // Create countdown elements
  const countdownDisplay = document.createElement('div');
  countdownDisplay.className = 'countdown-display';

  const timeUnits = ['days', 'hours', 'minutes', 'seconds'];
  timeUnits.forEach((unit) => {
    const unitElement = document.createElement('div');
    unitElement.className = `countdown-unit ${unit}`;
    unitElement.innerHTML = `
      <div class="countdown-value">00</div>
      <div class="countdown-label">${unit}</div>
    `;
    countdownDisplay.appendChild(unitElement);
  });

  countdownContainer.appendChild(countdownDisplay);

  // Replace the block with the countdown
  block.innerHTML = '';
  block.appendChild(countdownContainer);

  // Set up the countdown timer
  if (dateValue) {
    const eventDate = new Date(dateValue);
    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        countdownDisplay.innerHTML = '<div class="countdown-expired">Event has started!</div>';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const units = countdownDisplay.querySelectorAll('.countdown-value');
      units[0].textContent = days.toString().padStart(2, '0');
      units[1].textContent = hours.toString().padStart(2, '0');
      units[2].textContent = minutes.toString().padStart(2, '0');
      units[3].textContent = seconds.toString().padStart(2, '0');
    }, 1000);
  }
}
