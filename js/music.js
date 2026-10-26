(() => {
  const STORAGE_KEY = "portfolio-background-music";
  const defaults = { playing: false, time: 0, volume: 0.35 };
  let saved = defaults;

  try {
    saved = { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch (_) {
    saved = defaults;
  }

  const audio = new Audio("../audio/aruarian-dance.mp3");
  audio.loop = true;
  audio.preload = "metadata";
  audio.volume = Math.min(1, Math.max(0, saved.volume));

  const player = document.createElement("aside");
  player.className = "music-player";
  player.setAttribute("aria-label", "배경음악 재생기");
  player.innerHTML = `
    <button class="music-toggle" type="button" aria-label="배경음악 재생">
      <span class="music-icon" aria-hidden="true">▶</span>
    </button>
    <div class="music-info">
      <strong>Aruarian Dance</strong>
      <span class="music-state">재생 준비</span>
    </div>
    <label class="volume-label">
      <span class="sr-only">음량</span>
      <input class="music-volume" type="range" min="0" max="1" step="0.05" value="${audio.volume}">
    </label>`;
  document.body.appendChild(player);

  const toggle = player.querySelector(".music-toggle");
  const icon = player.querySelector(".music-icon");
  const state = player.querySelector(".music-state");
  const volume = player.querySelector(".music-volume");

  function store(playing = !audio.paused) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        playing,
        time: audio.currentTime || 0,
        volume: audio.volume,
      }),
    );
  }

  function update() {
    const playing = !audio.paused;
    icon.textContent = playing ? "Ⅱ" : "▶";
    toggle.setAttribute(
      "aria-label",
      playing ? "배경음악 일시정지" : "배경음악 재생",
    );
    state.textContent = playing ? "재생 중" : "일시정지";
    player.classList.toggle("is-playing", playing);
  }

  audio.addEventListener("loadedmetadata", () => {
    if (Number.isFinite(saved.time) && saved.time < audio.duration)
      audio.currentTime = saved.time;
    if (saved.playing)
      audio.play().catch(() => {
        state.textContent = "버튼을 눌러 재생";
      });
  });
  audio.addEventListener("play", () => {
    update();
    store(true);
  });
  audio.addEventListener("pause", () => {
    update();
    store(false);
  });
  audio.addEventListener("error", () => {
    state.textContent = "음악을 불러올 수 없음";
    toggle.disabled = true;
  });

  toggle.addEventListener("click", () => {
    if (audio.paused)
      audio.play().catch(() => {
        state.textContent = "재생할 수 없습니다";
      });
    else audio.pause();
  });

  volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
    store();
  });
  window.addEventListener("pagehide", () => store());
  setInterval(() => {
    if (!audio.paused) store(true);
  }, 1000);
  const navLinks = document.querySelector(".nav-links");
  if (navLinks && !navLinks.querySelector('a[href="mcourses.html"]')) {
    const courseLink = document.createElement("a");
    courseLink.href = "mcourses.html";
    courseLink.textContent = "코드강좌";
    const ideaLink = navLinks.querySelector('a[href="mideas.html"]');
    if (ideaLink) ideaLink.insertAdjacentElement("afterend", courseLink);
    else navLinks.appendChild(courseLink);
  }
  if (navLinks && !navLinks.querySelector('a[href="mauth.html"]')) {
    let session = null;
    try {
      session = JSON.parse(localStorage.getItem("portfolio-session-v1"));
    } catch (_) {}
    const accountLink = document.createElement("a");
    accountLink.href = "mauth.html";
    accountLink.className = "account-nav-link";
    accountLink.textContent = session ? `${session.name}님` : "로그인";
    accountLink.setAttribute(
      "aria-label",
      session ? `${session.name}님 계정 보기` : "로그인 또는 회원가입",
    );
    navLinks.appendChild(accountLink);
  }

  update();
})();
