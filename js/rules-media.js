(() => {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const items = [...document.querySelectorAll(".rule-motion")].map(figure => ({
    figure,
    video: figure.querySelector("video"),
    button: figure.querySelector("button"),
    status: figure.querySelector(".rule-motion__state"),
    visible: false,
    userPaused: preference.matches,
    pending: false,
    failed: false,
  }));

  function shouldPlay(item) { return item.visible && !document.hidden && !item.userPaused && !item.failed; }
  function render(item) {
    const playing = !item.video.paused && !item.failed;
    const action = playing ? "일시정지" : "재생";
    item.button.textContent = item.failed ? "!" : playing ? "Ⅱ" : "▶";
    const label = item.failed ? `${item.video.dataset.title} 영상을 불러올 수 없음` : `${item.video.dataset.title} 영상 ${action}`;
    item.button.setAttribute("aria-label", label);
    item.button.title = label;
    item.status.textContent = item.failed ? "영상을 불러올 수 없음" : playing ? "실제 촬영 · 반복 재생" : "실제 촬영 · 일시정지";
  }
  function sync(item) {
    if (!shouldPlay(item)) {
      item.video.pause();
      render(item);
      return;
    }
    if (!item.video.getAttribute("src")) item.video.src = item.video.dataset.src;
    if (item.video.paused && !item.pending) {
      item.pending = true;
      item.video.play().then(() => {
        item.pending = false;
        if (!shouldPlay(item)) item.video.pause();
        render(item);
      }).catch(() => {
        item.pending = false;
        // A click can retry when automatic playback is unavailable.
        render(item);
      });
    }
  }

  for (const item of items) {
    item.video.muted = true;
    item.button.hidden = false;
    item.button.addEventListener("click", () => {
      item.userPaused = !item.video.paused;
      sync(item);
    });
    item.video.addEventListener("play", () => render(item));
    item.video.addEventListener("pause", () => render(item));
    item.video.addEventListener("error", () => {
      item.failed = true;
      item.button.disabled = true;
      render(item);
    });
    render(item);
  }
  if (typeof IntersectionObserver === "function") {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const item = items.find(item => item.figure === entry.target);
        item.visible = entry.isIntersecting;
        sync(item);
      }
    }, { threshold: .15 });
    items.forEach(item => observer.observe(item.figure));
  } else items.forEach(item => { item.visible = true; sync(item); });

  document.addEventListener("visibilitychange", () => items.forEach(sync));
  preference.addEventListener("change", event => {
    items.forEach(item => { item.userPaused = event.matches; sync(item); });
  });
})();
