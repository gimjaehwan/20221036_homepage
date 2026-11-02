(() => {
  const scenes = [...document.querySelectorAll(".technique-motion svg")];
  const toggle = document.getElementById("techniqueMotionToggle");
  if (!toggle || !scenes.length || !scenes.every(svg => typeof svg.pauseAnimations === "function")) return;

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const visible = new Set();
  const started = new Set();
  let paused = motionPreference.matches;
  toggle.hidden = false;

  function update() {
    toggle.textContent = paused ? "움직임 재생" : "움직임 일시정지";
    toggle.setAttribute("aria-pressed", String(paused));
    for (const scene of scenes) {
      const playing = !paused && !document.hidden && visible.has(scene);
      scene.closest(".technique-motion").classList.toggle("is-playing", playing);
      if (playing) {
        if (!started.has(scene)) {
          scene.querySelectorAll("animate, animateTransform").forEach(animation => animation.beginElement());
          started.add(scene);
        }
        scene.unpauseAnimations();
      } else scene.pauseAnimations();
    }
  }

  toggle.addEventListener("click", () => { paused = !paused; update(); });
  motionPreference.addEventListener("change", event => {
    paused = event.matches;
    if (paused) scenes.forEach(scene => scene.setCurrentTime(0));
    update();
  });
  document.addEventListener("visibilitychange", update);

  if (typeof IntersectionObserver === "function") {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      update();
    }, { threshold: 0.15 });
    scenes.forEach(scene => { scene.pauseAnimations(); observer.observe(scene); });
  } else {
    scenes.forEach(scene => visible.add(scene));
  }
  update();
})();
