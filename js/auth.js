(() => {
  const USERS_KEY = "portfolio-users-v1";
  const SESSION_KEY = "portfolio-session-v1";
  const $ = (selector) => document.querySelector(selector);
  const loginTab = $("#loginTab");
  const signupTab = $("#signupTab");
  const loginForm = $("#loginForm");
  const signupForm = $("#signupForm");
  const panel = $("#accountPanel");
  const message = $("#authMessage");

  const readUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  };
  const readSession = () => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch {
      return null;
    }
  };
  const normalizeEmail = (email) => email.trim().toLowerCase();
  const fallbackHash = (value) => {
    let first = 2166136261;
    let second = 2246822507;
    for (let index = 0; index < value.length; index += 1) {
      const code = value.charCodeAt(index);
      first = Math.imul(first ^ code, 16777619);
      second = Math.imul(second ^ code, 3266489917);
    }
    const partA = (first >>> 0).toString(16).padStart(8, "0");
    const partB = (second >>> 0).toString(16).padStart(8, "0");
    return `local-${partA}${partB}`;
  };

  const hashPassword = async (password) => {
    if (window.isSecureContext && window.crypto?.subtle && window.TextEncoder) {
      const bytes = new TextEncoder().encode(password);
      const digest = await crypto.subtle.digest("SHA-256", bytes);
      return [...new Uint8Array(digest)]
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
    }
    return fallbackHash(password);
  };

  function showMessage(text, error = false) {
    message.textContent = text;
    message.classList.toggle("error", error);
  }

  function selectTab(mode) {
    const login = mode === "login";
    loginForm.hidden = !login;
    signupForm.hidden = login;
    loginTab.classList.toggle("active", login);
    signupTab.classList.toggle("active", !login);
    loginTab.setAttribute("aria-selected", String(login));
    signupTab.setAttribute("aria-selected", String(!login));
    showMessage("");
  }

  function renderSession() {
    const session = readSession();
    const signedIn = Boolean(session);
    panel.hidden = !signedIn;
    loginForm.hidden = signedIn;
    signupForm.hidden = true;
    document.querySelector(".auth-tabs").hidden = signedIn;
    if (signedIn) {
      $("#accountName").textContent = `${session.name}님`;
      $("#accountEmail").textContent = session.email;
      $("#accountAvatar").textContent = session.name
        .trim()
        .charAt(0)
        .toUpperCase();
      document.title = `${session.name}님 | 나의 포트폴리오`;
    }
  }

  loginTab.addEventListener("click", () => selectTab("login"));
  signupTab.addEventListener("click", () => selectTab("signup"));

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const name = $("#signupName").value.trim();
      const email = normalizeEmail($("#signupEmail").value);
      const password = $("#signupPassword").value;
      const confirm = $("#signupConfirm").value;
      if (password !== confirm)
        return showMessage("비밀번호가 서로 다릅니다.", true);
      const users = readUsers();
      if (users.some((user) => user.email === email))
        return showMessage("이미 가입된 이메일입니다.", true);
      const passwordHash = await hashPassword(password);
      const id = window.crypto?.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      users.push({
        id,
        name,
        email,
        passwordHash,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      signupForm.reset();
      selectTab("login");
      $("#loginEmail").value = email;
      showMessage("회원가입이 완료되었습니다. 로그인해 주세요.");
    } catch (error) {
      console.error("회원가입 오류:", error);
      showMessage(
        "회원정보를 저장하지 못했습니다. 브라우저의 저장소 허용 여부를 확인해 주세요.",
        true,
      );
    }
  });

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const email = normalizeEmail($("#loginEmail").value);
      const passwordHash = await hashPassword($("#loginPassword").value);
      const user = readUsers().find(
        (item) => item.email === email && item.passwordHash === passwordHash,
      );
      if (!user)
        return showMessage("이메일 또는 비밀번호를 확인해 주세요.", true);
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ id: user.id, name: user.name, email: user.email }),
      );
      showMessage("로그인되었습니다.");
      renderSession();
    } catch (error) {
      console.error("로그인 오류:", error);
      showMessage(
        "로그인을 처리하지 못했습니다. 브라우저 저장소 설정을 확인해 주세요.",
        true,
      );
    }
  });

  $("#logoutButton").addEventListener("click", () => {
    localStorage.removeItem(SESSION_KEY);
    document.querySelector(".auth-tabs").hidden = false;
    loginForm.reset();
    selectTab("login");
    renderSession();
    showMessage("로그아웃되었습니다.");
  });

  if (location.hash === "#signup") selectTab("signup");
  renderSession();
})();
