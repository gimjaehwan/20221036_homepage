(() => {
  const storageKey = "pin-lab-intro-seen-v1";
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  try {
    if (sessionStorage.getItem(storageKey)) return;
  } catch (_) { /* The intro also works when browser storage is unavailable. */ }
  if (motion.matches || typeof HTMLDialogElement === "undefined") return;

  const intro = document.createElement("dialog");
  intro.className = "bowling-intro";
  intro.setAttribute("aria-labelledby", "bowling-intro-title");
  intro.setAttribute("aria-describedby", "bowling-intro-caption");

  // Back-to-front pin order keeps the triangular rack readable on small screens.
  const pins = [
    [278, 144, -105, -30, -110, 90], [306, 144, -55, -55, -145, 100],
    [334, 144, 60, -50, 140, 100], [362, 144, 115, -25, 120, 90],
    [292, 163, -100, 0, -105, 50], [320, 163, 35, -65, 170, 65],
    [348, 163, 100, 0, 120, 50], [306, 182, -85, 30, -120, 25],
    [334, 182, 85, 35, 115, 25], [320, 201, -25, 45, -160, 0],
  ];
  intro.innerHTML = `
    <div class="bowling-intro__content">
      <p class="bowling-intro__eyebrow">EVERY FRAME, A NEW START</p>
      <h2 class="bowling-intro__title" id="bowling-intro-title">PIN LAB</h2>
      <svg class="bowling-intro__scene" viewBox="0 0 640 470" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="intro-lane" x1="0" y1="0" x2="0" y2="1">
            <stop stop-color="#b93f4d" stop-opacity=".08"/>
            <stop offset="1" stop-color="#b93f4d" stop-opacity=".2"/>
          </linearGradient>
          <linearGradient id="intro-pin" x1="0" x2="1">
            <stop stop-color="#a89799"/><stop offset=".4" stop-color="#fff8ef"/>
            <stop offset="1" stop-color="#cbb8b8"/>
          </linearGradient>
          <radialGradient id="intro-ball" cx=".3" cy=".25" r=".8">
            <stop stop-color="#ff9aa3"/><stop offset=".35" stop-color="#d74c60"/>
            <stop offset=".8" stop-color="#761d33"/><stop offset="1" stop-color="#300e1c"/>
          </radialGradient>
          <g id="intro-pin-shape">
            <ellipse cx="0" cy="2" rx="10" ry="3" fill="#000" opacity=".4"/>
            <path d="M-7 0C-13-6-9-17-5-24C-3-28-4-31-5-34C-10-46 10-46 5-34C4-31 3-28 5-24C9-17 13-6 7 0Z" fill="url(#intro-pin)"/>
            <path d="M-4.5-29H4.5M-4.5-25.5H4.5" stroke="#c54254" stroke-width="2.5"/>
          </g>
        </defs>
        <path d="M259 113H381L555 463H85Z" fill="url(#intro-lane)"/>
        <g fill="none" stroke="#ef6b76">
          <path d="M251 113L66 463M389 113L574 463" opacity=".35"/>
          <path d="M259 113L85 463M381 113L555 463" opacity=".55"/>
          <path d="M281 113L170 463M301 113L246 463M320 113V463M339 113L394 463M359 113L470 463" opacity=".08"/>
          <path d="M140 352H500" opacity=".18"/>
        </g>
        <g fill="#ef6b76" opacity=".4">
          <path d="M254 290l-4 8h8ZM287 290l-4 8h8ZM320 290l-4 8h8ZM353 290l-4 8h8ZM386 290l-4 8h8Z"/>
        </g>
        <ellipse class="bowling-intro__impact" cx="320" cy="194" rx="58" ry="25" fill="none" stroke="#ef6b76" stroke-width="2"/>
        ${pins.map(([x, y, dx, dy, turn, delay]) => `
          <g transform="translate(${x} ${y})"><g class="bowling-intro__pin" style="--dx:${dx}px;--dy:${dy}px;--turn:${turn}deg;--delay:${delay}ms"><use href="#intro-pin-shape"/></g></g>
        `).join("")}
        <g class="bowling-intro__ball">
          <ellipse cx="320" cy="432" rx="39" ry="9" fill="#000" opacity=".45"/>
          <circle cx="320" cy="390" r="43" fill="url(#intro-ball)"/>
          <g class="bowling-intro__spin">
            <path d="M285 368Q330 395 350 365M288 412Q315 381 358 400" fill="none" stroke="#fcb2ba" stroke-width="5" opacity=".23"/>
            <g fill="#300d1c" stroke="#ef8994" stroke-width=".8">
              <ellipse cx="310" cy="373" rx="4" ry="5"/>
              <ellipse cx="323" cy="370" rx="4" ry="5"/>
              <ellipse cx="320" cy="386" rx="5" ry="6"/>
            </g>
          </g>
        </g>
        <text class="bowling-intro__strike" x="320" y="255">STRIKE!</text>
      </svg>
      <p class="bowling-intro__caption" id="bowling-intro-caption">한 프레임씩, 더 정확하게.</p>
      <div class="bowling-intro__progress" aria-hidden="true"></div>
      <button class="bowling-intro__skip" type="button" autofocus>건너뛰기 <span aria-hidden="true">↗</span></button>
    </div>`;

  const previousFocus = document.activeElement;
  let closing = false;
  let autoClose;
  let removalTimer;
  function cleanup() {
    clearTimeout(autoClose);
    clearTimeout(removalTimer);
    document.body.classList.remove("intro-playing");
    motion.removeEventListener("change", onMotionChange);
    if (intro.open) intro.close();
    intro.remove();
    if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
  }
  function finish(immediate = false) {
    if (closing) return;
    closing = true;
    clearTimeout(autoClose);
    try { sessionStorage.setItem(storageKey, "1"); } catch (_) {}
    if (immediate || motion.matches) return cleanup();
    intro.classList.add("is-leaving");
    removalTimer = setTimeout(cleanup, 320);
  }
  function onMotionChange(event) { if (event.matches) finish(true); }

  intro.querySelector("button").addEventListener("click", () => finish(true));
  intro.addEventListener("cancel", (event) => { event.preventDefault(); finish(true); });
  motion.addEventListener("change", onMotionChange);
  document.body.appendChild(intro);
  try {
    intro.showModal();
    document.body.classList.add("intro-playing");
    autoClose = setTimeout(() => finish(), 3000);
  } catch (_) { cleanup(); }
})();
