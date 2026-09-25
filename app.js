// Letter entrance — swap her name and the note here.
const letterCopy = {
  addressee: "Nidhi",
  forLine: "for Nidhi",
  when: "24 Dec — 2 Jan",
  lines: [
    "Nidhi,",
    "I kept these days for you.",
    "Not just for a trip,",
    "but for our first little chapter after becoming us.",
    "Christmas to the new year —",
    "a few days with nowhere else to be,",
    "nothing to rush toward,",
    "just you and me.",
    "We've spent so much time getting here.",
    "Now I want to slow down",
    "and simply be with you.",
    "Palawan is the place.",
    "But the memories I'm really looking forward to",
    "are the ones we'll make there —",
    "the quiet mornings, the silly moments,",
    "the conversations that go on too long,",
    "and all the little things we'll remember years from now.",
    "So, Nidhi…",
    "come away with me.",
    "24 Dec — 2 Jan",
    "Our first adventure as husband and wife.",
    "Palawan is the chapter.",
    "Let's write it together.",
  ],
};

const LETTER_SEEN_KEY = "palawan-letter-read";

function initLetter() {
  const root = document.querySelector("[data-letter]");
  if (!root) return;

  const nameEl = root.querySelector("[data-letter-name]");
  const forEl = root.querySelector("[data-letter-for]");
  const whenEl = root.querySelector("[data-letter-when]");
  const noteEl = root.querySelector("[data-letter-note]");
  const openBtn = root.querySelector("[data-letter-open]");
  const readBtn = root.querySelector("[data-letter-read]");
  const reduceMotion = document.documentElement.classList.contains("letter-reduced");

  if (nameEl) nameEl.textContent = letterCopy.addressee;
  if (forEl) forEl.textContent = letterCopy.forLine;
  if (whenEl) whenEl.textContent = letterCopy.when;
  if (openBtn) openBtn.setAttribute("aria-label", "Open the letter to " + letterCopy.addressee);

  if (noteEl && readBtn) {
    letterCopy.lines.forEach((line) => {
      const p = document.createElement("p");
      p.textContent = line;
      noteEl.insertBefore(p, readBtn);
    });
  }

  let seen = false;
  try {
    seen = sessionStorage.getItem(LETTER_SEEN_KEY) === "1";
  } catch (err) {
    seen = false;
  }

  if (seen) {
    root.hidden = true;
    document.documentElement.classList.add("letter-seen");
    document.documentElement.classList.remove("letter-holding", "letter-reduced");
    return;
  }

  let finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    root.hidden = true;
    document.documentElement.classList.remove("letter-holding");
    document.documentElement.classList.add("letter-dismissed");
  }

  function dismiss() {
    try {
      sessionStorage.setItem(LETTER_SEEN_KEY, "1");
    } catch (err) {}
    if (reduceMotion) {
      finish();
      return;
    }
    root.classList.add("is-leaving");
    root.addEventListener("transitionend", (event) => {
      if (event.target !== root || event.propertyName !== "opacity") return;
      finish();
    });
    window.setTimeout(finish, 1000);
  }

  function openLetter() {
    if (root.classList.contains("is-open")) return;
    root.classList.add("is-open");
    if (noteEl) noteEl.removeAttribute("aria-hidden");
    if (readBtn) readBtn.tabIndex = 0;
    if (openBtn) openBtn.setAttribute("aria-expanded", "true");
    if (readBtn) readBtn.focus({ preventScroll: true });
  }

  if (reduceMotion) openLetter();

  openBtn?.addEventListener("click", openLetter);
  readBtn?.addEventListener("click", dismiss);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || root.hidden || !root.classList.contains("is-open")) return;
    dismiss();
  });
}

initLetter();

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

function initHorizontalScrollers() {
  document.querySelectorAll("[data-horizontal-scroll]").forEach((scroller) => {
    const area = scroller.querySelector("[data-scroll-area]");
    const previous = scroller.querySelector("[data-scroll-prev]");
    const next = scroller.querySelector("[data-scroll-next]");
    if (!area || !previous || !next) return;

    function updateArrows() {
      const maxScroll = area.scrollWidth - area.clientWidth;
      const hasOverflow = maxScroll > 2;
      previous.disabled = !hasOverflow || area.scrollLeft <= 2;
      next.disabled = !hasOverflow || area.scrollLeft >= maxScroll - 2;
    }

    previous.addEventListener("click", () => area.scrollBy({ left: -area.clientWidth * 0.72, behavior: "smooth" }));
    next.addEventListener("click", () => area.scrollBy({ left: area.clientWidth * 0.72, behavior: "smooth" }));
    area.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    updateArrows();
  });
}

initHorizontalScrollers();
