const dayButtons = [...document.querySelectorAll('[data-day]')];
const dayPanels = [...document.querySelectorAll('[data-panel]')];

function activateDay(day) {
  dayButtons.forEach((button) => {
    const isActive = button.dataset.day === day;
    button.setAttribute('aria-selected', String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  dayPanels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== day;
  });
}

dayButtons.forEach((button, index) => {
  button.addEventListener('click', () => activateDay(button.dataset.day));
  button.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + dayButtons.length) % dayButtons.length;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % dayButtons.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = dayButtons.length - 1;
    dayButtons[nextIndex].focus();
    activateDay(dayButtons[nextIndex].dataset.day);
  });
});

document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
