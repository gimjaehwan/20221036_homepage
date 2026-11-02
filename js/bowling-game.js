(() => {
  "use strict";

  const MAX_FRAMES = 10;
  const BEST_KEY = "pin-lab-bowling-best-v5";
  const HISTORY_KEY = "pin-lab-bowling-history-v1";
  const BALLS = {
    reactive: { name: "리액티브", hook: 1.18, friction: 0.82, color: "#a93243" },
    urethane: { name: "우레탄", hook: 0.73, friction: 0.68, color: "#7047a2" },
    plastic: { name: "플라스틱", hook: 0.2, friction: 0.46, color: "#246d91" },
  };
  const PIN_LAYOUT = [
    [1, 0, 0.88],
    [2, -0.22, 0.91], [3, 0.22, 0.91],
    [4, -0.44, 0.94], [5, 0, 0.94], [6, 0.44, 0.94],
    [7, -0.66, 0.97], [8, -0.22, 0.97], [9, 0.22, 0.97], [10, 0.66, 0.97],
  ];

  const $ = (selector) => document.querySelector(selector);
  const lane = $("#bowlingLane");
  const canvas = $("#bowlingCanvas");
  const ctx = canvas?.getContext("2d");
  const handedness = $("#handednessControl");
  const ballType = $("#ballTypeControl");
  const spinControl = $("#spinControl");
  const spinValue = $("#spinValue");
  const chargeValue = $("#chargeValue");
  const chargeFill = $("#chargeFill");
  const steerValue = $("#steerValue");
  const steerButtons = [...document.querySelectorAll("[data-steer]")];
  const throwButton = $("#throwButton");
  const resetButton = $("#resetButton");
  const frameNumber = $("#frameNumber");
  const totalScore = $("#totalScore");
  const scorecardTotal = $("#scorecardTotal");
  const bestScore = $("#bestScore");
  const lastResult = $("#lastResult");
  const streakValue = $("#streakValue");
  const status = $("#gameStatus");
  const shotAnalysis = $("#shotAnalysis");
  const remainingPins = $("#remainingPins");
  const frameStrip = $("#frameStrip");
  const speedMetric = $("#speedMetric");
  const revMetric = $("#revMetric");
  const breakMetric = $("#breakMetric");
  const entryMetric = $("#entryMetric");
  if (!lane || !canvas || !ctx || !frameStrip) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let frames = createFrames();
  let currentFrame = 0;
  let pins = createPins();
  let ball = createBall();
  let rolling = false;
  let gameOver = false;
  let dragging = false;
  let dragStart = { x: 0, y: 0 };
  let dragPower = 0;
  let dragDirection = 0;
  let steering = 0;
  let animationId = 0;
  let lastTime = 0;
  let firstImpactAt = 0;
  let slowUntil = 0;
  let settleTime = 0;
  let pinsAtStart = 10;
  let strikeStreak = 0;
  let audioContext = null;
  let best = Number(localStorage.getItem(BEST_KEY)) || 0;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(start, end, amount) {
    return start + (end - start) * amount;
  }

  function createFrames() {
    return Array.from({ length: MAX_FRAMES }, () => ({ rolls: [] }));
  }

  function createPins(standingIds = PIN_LAYOUT.map(([id]) => id)) {
    return PIN_LAYOUT.map(([id, x, y]) => ({
      id, x, y, homeX: x, homeY: y,
      vx: 0, vy: 0, angle: 0, angular: 0,
      standing: standingIds.includes(id), fallen: false,
    }));
  }

  function createBall() {
    return {
      x: 0, y: 0.03, vx: 0, vy: 0, spin: 0,
      active: false, gutter: false, trace: [], rotation: 0,
      speedKmh: 0, revRpm: 0, breakpointX: 0, entryAngle: 0,
    };
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    width = Math.max(320, rect.width);
    height = Math.max(520, rect.height);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  function project(x, y) {
    const t = clamp(y / 1.04, 0, 1);
    const centerY = height - 92 - t * (height - 150);
    const half = lerp(width * 0.46, width * 0.125, t);
    return { x: width / 2 + x * half, y: centerY, scale: lerp(1, 0.31, t), half };
  }

  function drawLane() {
    ctx.clearRect(0, 0, width, height);
    const topY = 48;
    const bottomY = height - 28;
    const topHalf = width * 0.125;
    const bottomHalf = width * 0.46;
    const gradient = ctx.createLinearGradient(0, topY, 0, bottomY);
    gradient.addColorStop(0, "#6f432b");
    gradient.addColorStop(0.52, "#a86e43");
    gradient.addColorStop(1, "#c68b58");
    ctx.beginPath();
    ctx.moveTo(width / 2 - topHalf, topY);
    ctx.lineTo(width / 2 + topHalf, topY);
    ctx.lineTo(width / 2 + bottomHalf, bottomY);
    ctx.lineTo(width / 2 - bottomHalf, bottomY);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.save();
    ctx.clip();
    for (let board = 0; board <= 39; board += 1) {
      const ratio = board / 39;
      ctx.beginPath();
      ctx.moveTo(width / 2 - topHalf + ratio * topHalf * 2, topY);
      ctx.lineTo(width / 2 - bottomHalf + ratio * bottomHalf * 2, bottomY);
      ctx.strokeStyle = board === 20 ? "#5b241f99" : "#5a39254d";
      ctx.lineWidth = board === 20 ? 2 : 1;
      ctx.stroke();
    }
    const oil = ctx.createLinearGradient(0, topY, 0, bottomY);
    oil.addColorStop(0, "#11182716");
    oil.addColorStop(0.34, "#d9ecff2a");
    oil.addColorStop(0.66, "#edf7ff10");
    oil.addColorStop(0.69, "transparent");
    ctx.fillStyle = oil;
    ctx.fillRect(0, topY, width, bottomY - topY);
    ctx.restore();

    ctx.strokeStyle = "#2a0f13";
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(width / 2 - topHalf, topY);
    ctx.lineTo(width / 2 - bottomHalf, bottomY);
    ctx.moveTo(width / 2 + topHalf, topY);
    ctx.lineTo(width / 2 + bottomHalf, bottomY);
    ctx.stroke();

    [0.33, 0.45].forEach((y) => {
      [-0.5, -0.25, 0, 0.25, 0.5].forEach((x) => {
        const point = project(x, y);
        ctx.fillStyle = "#5e292d88";
        ctx.beginPath();
        ctx.moveTo(point.x, point.y - 7 * point.scale);
        ctx.lineTo(point.x + 5 * point.scale, point.y + 6 * point.scale);
        ctx.lineTo(point.x - 5 * point.scale, point.y + 6 * point.scale);
        ctx.closePath();
        ctx.fill();
      });
    });
    const pocketX = handedness.value === "right" ? 0.085 : -0.085;
    const pocket = project(pocketX, 0.875);
    ctx.strokeStyle = "#ff6675dd";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(pocket.x, pocket.y, 13, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawTrace() {
    if (ball.trace.length < 2) return;
    ctx.save();
    ctx.lineCap = "round";
    for (let index = 1; index < ball.trace.length; index += 1) {
      const before = project(ball.trace[index - 1].x, ball.trace[index - 1].y);
      const now = project(ball.trace[index].x, ball.trace[index].y);
      ctx.strokeStyle = `rgba(255, 91, 106, ${index / ball.trace.length * 0.65})`;
      ctx.lineWidth = lerp(2, 6, index / ball.trace.length);
      ctx.beginPath();
      ctx.moveTo(before.x, before.y);
      ctx.lineTo(now.x, now.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawPin(pin) {
    if (!pin.standing && !pin.fallen) return;
    const point = project(pin.x, pin.y);
    const w = 20 * point.scale;
    const h = 52 * point.scale;
    ctx.save();
    ctx.translate(point.x, point.y);
    if (pin.fallen) ctx.rotate(pin.angle || 1.25);
    ctx.shadowColor = "#0009";
    ctx.shadowBlur = 9 * point.scale;
    ctx.shadowOffsetY = 5 * point.scale;
    ctx.fillStyle = "#f7f5ee";
    ctx.beginPath();
    ctx.moveTo(-w * 0.24, -h * 0.5);
    ctx.bezierCurveTo(-w * 0.5, -h * 0.28, -w * 0.6, h * 0.1, -w * 0.46, h * 0.45);
    ctx.quadraticCurveTo(0, h * 0.58, w * 0.46, h * 0.45);
    ctx.bezierCurveTo(w * 0.6, h * 0.1, w * 0.5, -h * 0.28, w * 0.24, -h * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.fillStyle = "#c73342";
    ctx.fillRect(-w * 0.38, -h * 0.18, w * 0.76, h * 0.07);
    ctx.fillRect(-w * 0.4, -h * 0.07, w * 0.8, h * 0.06);
    ctx.restore();
  }

  function drawBall() {
    const point = project(ball.x, ball.y);
    const radius = 31 * point.scale;
    const spec = BALLS[ballType.value];
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate(ball.rotation);
    ctx.shadowColor = "#000b";
    ctx.shadowBlur = 18 * point.scale;
    ctx.shadowOffsetY = 9 * point.scale;
    const gradient = ctx.createRadialGradient(-radius * 0.3, -radius * 0.35, 2, 0, 0, radius);
    gradient.addColorStop(0, "#ff8590");
    gradient.addColorStop(0.22, spec.color);
    gradient.addColorStop(1, "#18060a");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.fillStyle = "#170509";
    [[-0.25, -0.32], [0.08, -0.42], [0.2, -0.12]].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(radius * x, radius * y, Math.max(1.5, radius * 0.08), 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  function draw() {
    if (!width || !height) return;
    drawLane();
    drawTrace();
    [...pins].sort((a, b) => b.y - a.y).forEach(drawPin);
    if (ball.y < 1.18) drawBall();
    if (performance.now() < slowUntil) {
      ctx.fillStyle = "#12090bd9";
      ctx.fillRect(width / 2 - 70, 68, 140, 32);
      ctx.fillStyle = "#ff7180";
      ctx.font = "900 12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("SLOW MOTION · IMPACT", width / 2, 89);
    }
  }

  function standingList() {
    return pins.filter((pin) => pin.standing).map((pin) => pin.id);
  }

  function updateRemainingPins() {
    const list = standingList();
    remainingPins.textContent = list.length ? `남은 핀: ${list.join(", ")}` : "남은 핀: 없음";
  }

  function playImpact(strength = 0.5) {
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(150 + strength * 90, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(55, audioContext.currentTime + 0.09);
      gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06 + strength * 0.08, audioContext.currentTime + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.11);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.12);
    } catch (_) {
      // Audio is an enhancement; gameplay continues when the browser blocks it.
    }
  }

  function hitPin(pin, nx, ny, force) {
    if (!pin.standing) return;
    pin.standing = false;
    pin.fallen = true;
    pin.vx += nx * force + ball.vx * 0.3;
    pin.vy += Math.max(0.018, ny * force + ball.vy * 0.16);
    pin.angular = (Math.random() - 0.5) * 5;
    pin.angle = Math.atan2(ny, nx) + Math.PI / 2;
    if (!firstImpactAt) {
      firstImpactAt = performance.now();
      slowUntil = firstImpactAt + 520;
      navigator.vibrate?.(35);
    }
    playImpact(clamp(force * 6, 0.2, 1));
  }

  function collideBallPins() {
    if (ball.gutter || ball.y < 0.79) return;
    pins.forEach((pin) => {
      if (!pin.standing) return;
      const dx = pin.x - ball.x;
      const dy = pin.y - ball.y;
      const distance = Math.hypot(dx, dy);
      if (distance >= 0.205) return;
      const nx = dx / Math.max(distance, 0.001);
      const ny = dy / Math.max(distance, 0.001);
      const force = clamp(Math.hypot(ball.vx, ball.vy) * 0.32, 0.075, 0.15);
      hitPin(pin, nx, ny, force);
      ball.vx -= nx * 0.018;
      ball.vy *= 0.94;
    });
  }

  function updatePins(dt) {
    pins.forEach((pin) => {
      if (!pin.fallen) return;
      pin.x += pin.vx * dt;
      pin.y += pin.vy * dt;
      pin.angle += pin.angular * dt;
      pin.vx *= Math.pow(0.19, dt);
      pin.vy *= Math.pow(0.16, dt);
      pin.angular *= Math.pow(0.13, dt);
    });
    for (let a = 0; a < pins.length; a += 1) {
      const source = pins[a];
      if (!source.fallen || Math.hypot(source.vx, source.vy) < 0.012) continue;
      for (let b = 0; b < pins.length; b += 1) {
        if (a === b) continue;
        const target = pins[b];
        if (!target.standing) continue;
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const distance = Math.hypot(dx, dy);
        if (distance > 0.17) continue;
        const nx = dx / Math.max(distance, 0.001);
        const ny = dy / Math.max(distance, 0.001);
        const force = clamp(Math.hypot(source.vx, source.vy) * 0.58, 0.042, 0.115);
        target.standing = false;
        target.fallen = true;
        target.vx = source.vx * 0.5 + nx * force;
        target.vy = source.vy * 0.5 + ny * force;
        target.angle = Math.atan2(ny, nx) + Math.PI / 2;
        target.angular = (Math.random() - 0.5) * 5;
        playImpact(force * 4);
      }
    }
  }

  function updatePhysics(dt, now) {
    const timeScale = now < slowUntil ? 0.32 : 1;
    dt *= timeScale;
    const spec = BALLS[ballType.value];
    if (ball.active) {
      let hookZone = 0.025;
      if (ball.y >= 0.56 && ball.y < 0.84) hookZone = 0.42;
      else if (ball.y >= 0.84) hookZone = 0.15;
      ball.vx += ball.spin * spec.hook * hookZone * dt;
      ball.spin *= Math.pow(1 - spec.friction * 0.006, dt * 60);
      ball.vx += steering * 0.12 * dt;
      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;
      ball.rotation += (ball.vy * 20 + ball.spin * 3) * dt;
      if (Math.abs(ball.x) > 1.02) {
        ball.gutter = true;
        ball.x = clamp(ball.x, -1.12, 1.12);
        ball.vx *= 0.75;
      }
      if (!ball.gutter && ball.y > 0.8 && ball.y < 1.06) collideBallPins();
      updatePins(dt);
      if (!ball.trace.length || ball.y - ball.trace.at(-1).y > 0.012) {
        ball.trace.push({ x: ball.x, y: ball.y });
        if (ball.trace.length > 100) ball.trace.shift();
      }
      if (ball.y > 1.17) ball.active = false;
    } else {
      updatePins(dt);
      settleTime += dt;
      if (settleTime > 1.05) finishThrow();
    }
  }

  function animate(now) {
    if (!rolling) return;
    const dt = Math.min(0.033, (now - lastTime) / 1000 || 0.016);
    lastTime = now;
    updatePhysics(dt, now);
    draw();
    if (rolling) animationId = requestAnimationFrame(animate);
  }

  function launch(power = 0.72, direction = 0) {
    if (rolling || gameOver) return;
    const normalizedPower = clamp(Number(power) || 0.72, 0.2, 1);
    const side = handedness.value === "right" ? 1 : -1;
    const rawSpin = Number(spinControl.value) / 100;
    ball = createBall();
    ball.active = true;
    ball.vy = 0.22 + normalizedPower * 0.16;
    ball.vx = clamp(direction, -1, 1) * 0.105;
    ball.spin = rawSpin * 0.12 * side;
    ball.speedKmh = 17 + normalizedPower * 15;
    ball.revRpm = Math.round(90 + Math.abs(rawSpin) * 410);
    ball.breakpointX = 0;
    pinsAtStart = standingList().length;
    rolling = true;
    dragging = false;
    firstImpactAt = 0;
    slowUntil = 0;
    settleTime = 0;
    lane.classList.remove("charging");
    lane.classList.add("rolling");
    throwButton.disabled = true;
    handedness.disabled = true;
    ballType.disabled = true;
    spinControl.disabled = true;
    status.textContent = "오일 구간을 지나 브레이크 포인트로 진입하고 있습니다.";
    steerValue.value = "공 진행 중 · 미세 조정 가능";
    chargeFill.style.width = `${Math.round(normalizedPower * 100)}%`;
    chargeValue.value = `${Math.round(normalizedPower * 100)}%`;
    lastTime = performance.now();
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(animate);
  }

  function shotFeedback(knocked) {
    const side = handedness.value === "right" ? 1 : -1;
    const target = side * 0.085;
    const error = ball.x - target;
    const angle = Math.abs((Math.atan2(ball.vx, ball.vy) * 180) / Math.PI);
    ball.entryAngle = angle;
    const breakpoint = ball.trace.find((point) => point.y >= 0.63) || ball.trace.at(-1) || { x: 0 };
    ball.breakpointX = breakpoint.x;
    speedMetric.textContent = `${ball.speedKmh.toFixed(1)} km/h`;
    revMetric.textContent = `${ball.revRpm} rpm`;
    breakMetric.textContent = `${Math.round(20 + breakpoint.x * 19)} 보드`;
    entryMetric.textContent = `${angle.toFixed(1)}°`;
    if (ball.gutter) return "거터입니다. 출발각을 중앙 쪽으로 줄여 보세요.";
    if (knocked === pinsAtStart) return pinsAtStart === 10 ? "포켓과 핀 액션이 완벽했습니다." : "남은 핀을 모두 처리했습니다.";
    if (!firstImpactAt) return "핀에 닿지 않았습니다. 출발각을 핀 덱 안쪽으로 조정하세요.";
    if (Math.abs(error) < 0.08 && angle >= 3 && angle <= 6.5) return "포켓 진입은 좋았습니다. 볼 속도를 조금 낮춰 핀 액션을 키워 보세요.";
    if (error * side < 0) return "헤드핀을 두껍게 맞았습니다. 시작 위치를 바깥쪽으로 옮겨 보세요.";
    return "헤드핀을 얇게 맞았습니다. 출발각을 포켓 쪽으로 조금 줄여 보세요.";
  }

  function finishThrow() {
    if (!rolling) return;
    rolling = false;
    lane.classList.remove("rolling");
    setSteering(0);
    const knocked = pinsAtStart - standingList().length;
    const wasFullRack = pinsAtStart === 10;
    const feedback = shotFeedback(knocked);
    lastResult.textContent = wasFullRack && knocked === 10 ? "STRIKE!" : `${knocked} PINS`;
    shotAnalysis.textContent = feedback;
    strikeStreak = wasFullRack && knocked === 10 ? strikeStreak + 1 : 0;
    streakValue.textContent = String(strikeStreak);
    const progress = advanceGame(knocked);
    renderScorecard();
    updateFrameLabel();
    updateRemainingPins();

    if (gameOver) {
      const finalScore = Number(scorecardTotal.textContent) || 0;
      if (finalScore > best) {
        best = finalScore;
        localStorage.setItem(BEST_KEY, String(best));
      }
      saveHistory(finalScore);
      bestScore.textContent = String(best);
      status.textContent = `게임 종료! 총점 ${finalScore}점 · 기록이 이 브라우저에 저장되었습니다.`;
      steerValue.value = "게임이 끝났습니다";
      throwButton.disabled = true;
      draw();
      return;
    }

    status.textContent = progress.frameFinished
      ? `${currentFrame + 1}프레임을 준비합니다.`
      : `${standingList().length}핀이 실제 위치에 남았습니다. 스페어를 노려 보세요.`;
    window.setTimeout(() => {
      resetBall(progress.resetRack);
      throwButton.disabled = false;
      handedness.disabled = false;
      ballType.disabled = false;
      spinControl.disabled = false;
    }, 850);
  }

  function resetBall(resetRack = false) {
    cancelAnimationFrame(animationId);
    if (resetRack) pins = createPins();
    else pins = pins.map((pin) => ({
      ...pin,
      x: pin.homeX,
      y: pin.homeY,
      vx: 0,
      vy: 0,
      angle: 0,
      angular: 0,
      fallen: false,
    }));
    ball = createBall();
    dragging = false;
    dragPower = 0;
    dragDirection = 0;
    chargeFill.style.width = "0%";
    chargeValue.value = "0%";
    lane.classList.remove("charging", "rolling");
    steerValue.value = "공을 당겨 주세요";
    updateRemainingPins();
    draw();
  }

  function advanceGame(knocked) {
    const frame = frames[currentFrame];
    frame.rolls.push(knocked);
    let resetRack = false;
    let frameFinished = false;
    if (currentFrame < 9) {
      if (frame.rolls[0] === 10 || frame.rolls.length === 2) {
        frameFinished = true;
        resetRack = true;
      }
    } else if (frame.rolls.length === 1 && knocked === 10) {
      resetRack = true;
    } else if (frame.rolls.length === 2) {
      const [first, second] = frame.rolls;
      if (first === 10 && second === 10) resetRack = true;
      else if (first < 10 && first + second === 10) resetRack = true;
      else if (first < 10 && first + second < 10) gameOver = true;
    } else if (frame.rolls.length === 3) gameOver = true;
    if (frameFinished) {
      currentFrame += 1;
      pins = createPins();
    }
    return { resetRack, frameFinished };
  }

  function mark(value) {
    if (value === undefined) return "";
    if (value === 10) return "X";
    if (value === 0) return "–";
    return String(value);
  }

  function frameMarks(index) {
    const rolls = frames[index].rolls;
    if (index < 9) {
      if (rolls[0] === 10) return ["", "X"];
      return [mark(rolls[0]), rolls[0] + rolls[1] === 10 ? "/" : mark(rolls[1])];
    }
    const [first, second, third] = rolls;
    const secondMark = first !== undefined && first < 10 && first + second === 10 ? "/" : mark(second);
    const thirdMark = first === 10 && second !== undefined && second < 10 && second + third === 10 ? "/" : mark(third);
    return [mark(first), secondMark, thirdMark];
  }

  function nextRolls(frameIndex, count) {
    const values = [];
    for (let index = frameIndex + 1; index < MAX_FRAMES; index += 1) {
      values.push(...frames[index].rolls);
      if (values.length >= count) break;
    }
    return values.slice(0, count);
  }

  function frameComplete(index) {
    const rolls = frames[index].rolls;
    if (index < 9) return rolls[0] === 10 || rolls.length === 2;
    if (rolls.length < 2) return false;
    const bonus = rolls[0] === 10 || rolls[0] + rolls[1] === 10;
    return bonus ? rolls.length === 3 : rolls.length === 2;
  }

  function cumulativeScores() {
    const totals = Array(MAX_FRAMES).fill(null);
    let running = 0;
    for (let index = 0; index < MAX_FRAMES; index += 1) {
      const rolls = frames[index].rolls;
      let value = null;
      if (index === 9) {
        if (frameComplete(index)) value = rolls.reduce((sum, roll) => sum + roll, 0);
      } else if (rolls[0] === 10) {
        const bonus = nextRolls(index, 2);
        if (bonus.length === 2) value = 10 + bonus[0] + bonus[1];
      } else if (rolls.length === 2 && rolls[0] + rolls[1] === 10) {
        const bonus = nextRolls(index, 1);
        if (bonus.length === 1) value = 10 + bonus[0];
      } else if (rolls.length === 2) value = rolls[0] + rolls[1];
      if (value === null) break;
      running += value;
      totals[index] = running;
    }
    return totals;
  }

  function renderScorecard() {
    const totals = cumulativeScores();
    frameStrip.replaceChildren();
    frames.forEach((_, index) => {
      const cell = document.createElement("article");
      cell.className = "score-frame";
      cell.classList.toggle("current", !gameOver && index === currentFrame);
      const rollBoxes = frameMarks(index).map((roll) => `<i>${roll}</i>`).join("");
      cell.innerHTML = `<span>${index + 1}</span><div class="roll-boxes">${rollBoxes}</div><strong class="frame-total">${totals[index] ?? ""}</strong>`;
      frameStrip.append(cell);
    });
    const latest = [...totals].reverse().find((value) => value !== null);
    totalScore.textContent = String(latest ?? 0);
    scorecardTotal.textContent = latest ?? "—";
  }

  function updateFrameLabel() {
    if (gameOver) return void (frameNumber.textContent = "FINISH");
    const roll = frames[currentFrame].rolls.length + 1;
    frameNumber.textContent = `${currentFrame + 1} / 10 · ${roll}구${currentFrame === 9 && roll === 3 ? " · 보너스" : ""}`;
  }

  function saveHistory(score) {
    let history = [];
    try { history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch (_) { history = []; }
    history.unshift({ score, ball: BALLS[ballType.value].name, date: new Date().toISOString() });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 10)));
  }

  function pointerPosition(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function beginDrag(event) {
    if (rolling || gameOver) return;
    event.preventDefault();
    dragging = true;
    dragStart = pointerPosition(event);
    dragPower = 0;
    dragDirection = 0;
    canvas.setPointerCapture?.(event.pointerId);
    lane.classList.add("charging");
    steerValue.value = "구속과 출발각을 정하는 중";
  }

  function moveDrag(event) {
    if (!dragging) return;
    event.preventDefault();
    const point = pointerPosition(event);
    const pullX = clamp(point.x - dragStart.x, -130, 130);
    const pullY = clamp(point.y - dragStart.y, 0, 150);
    dragPower = pullY / 150;
    dragDirection = -pullX / 130;
    ball.x = clamp((point.x - width / 2) / (width * 0.46), -0.55, 0.55);
    ball.y = -0.01;
    const percent = Math.round(dragPower * 100);
    chargeFill.style.width = `${percent}%`;
    chargeValue.value = `${percent}%`;
    steerValue.value = percent < 20 ? "조금 더 당겨 주세요" : `${percent}% · 놓으면 투구`;
    draw();
  }

  function releaseDrag(event) {
    if (!dragging) return;
    event.preventDefault();
    dragging = false;
    canvas.releasePointerCapture?.(event.pointerId);
    lane.classList.remove("charging");
    if (dragPower < 0.2) {
      ball = createBall();
      chargeFill.style.width = "0%";
      chargeValue.value = "0%";
      steerValue.value = "20% 이상 당겨 주세요";
      draw();
      return;
    }
    launch(dragPower, dragDirection);
  }

  function setSteering(direction) {
    steering = rolling ? direction : 0;
    steerButtons.forEach((button) => button.classList.toggle("pressed", Number(button.dataset.steer) === steering));
  }

  function resetGame() {
    cancelAnimationFrame(animationId);
    frames = createFrames();
    currentFrame = 0;
    pins = createPins();
    ball = createBall();
    rolling = false;
    gameOver = false;
    strikeStreak = 0;
    totalScore.textContent = "0";
    scorecardTotal.textContent = "—";
    lastResult.textContent = "—";
    streakValue.textContent = "0";
    [speedMetric, revMetric, breakMetric, entryMetric].forEach((element) => { element.textContent = "—"; });
    status.textContent = "공을 아래로 당겨 구속과 출발각을 정하세요.";
    shotAnalysis.textContent = "실제 충돌한 핀만 쓰러집니다. 1–3 또는 1–2 포켓을 노려 보세요.";
    throwButton.disabled = false;
    handedness.disabled = false;
    ballType.disabled = false;
    spinControl.disabled = false;
    resetBall(true);
    renderScorecard();
    updateFrameLabel();
  }

  steerButtons.forEach((button) => {
    const direction = Number(button.dataset.steer);
    button.addEventListener("pointerdown", (event) => { event.preventDefault(); setSteering(direction); });
    ["pointerup", "pointercancel", "pointerleave"].forEach((name) => button.addEventListener(name, () => setSteering(0)));
  });
  canvas.addEventListener("pointerdown", beginDrag);
  canvas.addEventListener("pointermove", moveDrag);
  canvas.addEventListener("pointerup", releaseDrag);
  canvas.addEventListener("pointercancel", () => resetBall(false));
  canvas.addEventListener("keydown", (event) => {
    if (event.code === "Enter") { event.preventDefault(); launch(); }
  });
  document.addEventListener("keydown", (event) => {
    if (["ArrowLeft", "KeyA"].includes(event.code)) { event.preventDefault(); setSteering(-1); }
    if (["ArrowRight", "KeyD"].includes(event.code)) { event.preventDefault(); setSteering(1); }
    if (event.code === "Space" && !rolling) { event.preventDefault(); launch(); }
  });
  document.addEventListener("keyup", (event) => {
    if (["ArrowLeft", "ArrowRight", "KeyA", "KeyD"].includes(event.code)) setSteering(0);
  });
  spinControl.addEventListener("input", () => { spinValue.value = `${Number(spinControl.value) > 0 ? "+" : ""}${spinControl.value}`; });
  handedness.addEventListener("change", draw);
  ballType.addEventListener("change", draw);
  throwButton.addEventListener("click", () => launch());
  resetButton.addEventListener("click", resetGame);
  window.addEventListener("resize", resizeCanvas);

  bestScore.textContent = String(best);
  renderScorecard();
  updateFrameLabel();
  updateRemainingPins();
  resizeCanvas();
})();
