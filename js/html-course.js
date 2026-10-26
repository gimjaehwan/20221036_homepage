(() => {
  const KEY = "html-course-progress-v1";
  const lessons = [
    {
      title: "웹과 HTML 이해하기",
      lead: "웹페이지가 브라우저에 표시되는 과정과 HTML의 역할을 알아봅니다.",
      copy: `<h2>HTML은 무엇인가요?</h2><p>HTML은 <strong>웹페이지의 내용과 구조</strong>를 표현하는 언어입니다. 제목은 제목으로, 문단은 문단으로 표시해 브라우저가 각 내용의 의미를 이해하게 합니다.</p><div class="concept-box"><b>HTML = HyperText Markup Language</b><p>서로 연결되는 문서를 만들기 위해 태그로 내용을 표시하는 언어라는 뜻입니다.</p></div><h2>태그의 기본 구조</h2><p>대부분의 요소는 여는 태그, 내용, 닫는 태그로 이루어집니다.</p><div class="tag-diagram"><span class="angle">&lt;</span><span class="name">p</span><span class="angle">&gt;</span>안녕하세요<span class="angle">&lt;/</span><span class="name">p</span><span class="angle">&gt;</span></div><p>아래 코드의 문장을 바꾼 후 실행해 보세요.</p>`,
      code: `<!doctype html>\n<html lang="ko">\n<head>\n  <meta charset="UTF-8">\n  <title>나의 첫 페이지</title>\n</head>\n<body>\n  <h1>안녕하세요!</h1>\n  <p>나의 첫 HTML 페이지입니다.</p>\n</body>\n</html>`,
      task: "제목과 문단의 내용을 자신의 소개로 바꿔보세요.",
    },
    {
      title: "제목과 문단",
      lead: "제목의 단계와 문단 태그를 사용해 읽기 좋은 글을 구성합니다.",
      copy: `<h2>제목에는 순서가 있어요</h2><p><code>&lt;h1&gt;</code>은 페이지의 가장 중요한 제목입니다. 그 아래 내용은 <code>&lt;h2&gt;</code>, 더 작은 항목은 <code>&lt;h3&gt;</code>처럼 단계적으로 사용합니다.</p><ul><li>한 페이지의 핵심 제목에는 보통 <code>h1</code>을 한 번 사용합니다.</li><li>단계를 건너뛰지 않으면 문서 구조를 이해하기 쉽습니다.</li><li><code>p</code>는 하나의 의미 있는 문단을 표시합니다.</li></ul><div class="concept-box"><b>모양 때문에 태그를 선택하지 마세요.</b><p>글자 크기는 CSS로 바꾸고, HTML에서는 내용의 의미에 맞는 태그를 선택합니다.</p></div>`,
      code: `<h1>나의 취미</h1>\n\n<h2>사진 찍기</h2>\n<p>일상의 장면을 사진으로 남기는 것을 좋아합니다.</p>\n\n<h2>코딩하기</h2>\n<p>아이디어가 화면에서 동작하는 과정이 재미있습니다.</p>`,
      task: "새로운 h2 제목과 문단을 한 쌍 더 추가해 보세요.",
    },
    {
      title: "링크와 이미지",
      lead: "다른 페이지로 이동하는 링크와 정보를 전달하는 이미지를 추가합니다.",
      copy: `<h2>링크 만들기</h2><p><code>a</code> 요소의 <code>href</code> 속성에 이동할 주소를 적습니다.</p><div class="tag-diagram">&lt;a href="https://example.com"&gt;사이트 방문&lt;/a&gt;</div><h2>이미지 설명은 필수예요</h2><p><code>img</code>의 <code>src</code>는 이미지 위치, <code>alt</code>는 이미지를 볼 수 없을 때 전달할 설명입니다.</p><div class="concept-box"><b>좋은 alt 문구</b><p>“이미지”가 아니라 “창가에서 위를 바라보는 고양이”처럼 이미지가 전달하는 정보를 적습니다.</p></div>`,
      code: `<h1>좋아하는 사이트</h1>\n<p>아래 링크를 누르면 새 탭에서 열립니다.</p>\n<a href="https://developer.mozilla.org/ko/" target="_blank">\n  MDN 웹 문서 보기\n</a>\n\n<h2>나의 사진</h2>\n<img src="../images/career-cat.png"\n     alt="위를 바라보는 고양이"\n     width="220">`,
      task: "링크의 주소와 표시 문구를 자신이 좋아하는 사이트로 바꿔보세요.",
    },
    {
      title: "목록과 표",
      lead: "여러 항목을 목록으로 묶고 규칙적인 데이터를 표로 정리합니다.",
      copy: `<h2>순서가 중요한가요?</h2><p>순서와 관계없는 항목에는 <code>ul</code>, 단계나 순위처럼 순서가 중요한 항목에는 <code>ol</code>을 사용합니다.</p><h2>표의 기본 구조</h2><p><code>table</code> 안에서 한 행은 <code>tr</code>, 제목 셀은 <code>th</code>, 데이터 셀은 <code>td</code>로 표현합니다.</p><div class="concept-box"><b>표는 데이터에만 사용하세요.</b><p>화면 배치를 위해 표를 사용하면 모바일 대응과 접근성이 나빠집니다.</p></div>`,
      code: `<h1>이번 주 학습 계획</h1>\n<ul>\n  <li>HTML 문서 구조</li>\n  <li>CSS 선택자</li>\n  <li>JavaScript 이벤트</li>\n</ul>\n\n<table border="1" cellpadding="8">\n  <tr><th>요일</th><th>학습 시간</th></tr>\n  <tr><td>월요일</td><td>1시간</td></tr>\n  <tr><td>수요일</td><td>2시간</td></tr>\n</table>`,
      task: "목록에 학습 항목을 하나 추가하고 표에도 새로운 행을 만들어보세요.",
    },
    {
      title: "입력 폼",
      lead: "사용자에게 정보를 입력받는 폼과 다양한 입력 요소를 배웁니다.",
      copy: `<h2>form과 label</h2><p><code>form</code>은 입력 요소들을 하나의 제출 단위로 묶습니다. 각 입력란에는 무엇을 입력하는지 알려주는 <code>label</code>이 필요합니다.</p><ul><li><code>type="text"</code>: 짧은 글</li><li><code>type="email"</code>: 이메일 형식 검사</li><li><code>textarea</code>: 여러 줄 글</li><li><code>button</code>: 동작 실행</li></ul><div class="concept-box"><b>placeholder는 label을 대신하지 않습니다.</b><p>입력 후 사라지는 안내문보다 항상 보이는 레이블이 더 명확합니다.</p></div>`,
      code: `<h1>문의하기</h1>\n<form onsubmit="event.preventDefault(); alert('전송 완료!')">\n  <p>\n    <label for="name">이름</label><br>\n    <input id="name" type="text" required>\n  </p>\n  <p>\n    <label for="message">문의 내용</label><br>\n    <textarea id="message" rows="4"></textarea>\n  </p>\n  <button type="submit">보내기</button>\n</form>`,
      task: "이메일을 입력받는 label과 input을 이름 입력란 아래에 추가해보세요.",
    },
    {
      title: "시맨틱 태그",
      lead: "내용의 역할을 분명하게 전달하는 의미 있는 페이지 구조를 만듭니다.",
      copy: `<h2>의미 있는 영역 나누기</h2><p>모든 영역을 <code>div</code>로 만드는 대신 역할에 맞는 시맨틱 태그를 사용하면 사람과 검색 엔진 모두 문서를 쉽게 이해합니다.</p><ul><li><code>header</code>: 페이지나 영역의 머리말</li><li><code>nav</code>: 주요 탐색 링크</li><li><code>main</code>: 페이지의 핵심 내용</li><li><code>section</code>: 주제로 묶인 내용</li><li><code>article</code>: 독립적으로 읽을 수 있는 글</li><li><code>footer</code>: 저작권과 부가 정보</li></ul>`,
      code: `<header>\n  <h1>코딩 기록</h1>\n  <nav><a href="#today">오늘의 공부</a></nav>\n</header>\n\n<main>\n  <section id="today">\n    <h2>오늘의 공부</h2>\n    <article>\n      <h3>시맨틱 HTML</h3>\n      <p>의미에 맞는 태그를 배웠습니다.</p>\n    </article>\n  </section>\n</main>\n\n<footer>© 2026 코딩 기록</footer>`,
      task: "main 안에 “다음 학습 목표”라는 새로운 section을 추가해보세요.",
    },
    {
      title: "자기소개 페이지 실습",
      lead: "앞에서 배운 요소를 조합해 하나의 완성된 자기소개 문서를 만듭니다.",
      copy: `<h2>프로젝트 요구사항</h2><ul><li>이름이 포함된 <code>h1</code></li><li>자기소개 문단</li><li>좋아하는 것 3개 이상의 목록</li><li>GitHub 또는 즐겨 찾는 사이트 링크</li><li>연락을 위한 간단한 폼</li></ul><div class="concept-box"><b>완성보다 수정이 중요합니다.</b><p>예제의 내용을 자신의 이야기로 바꾸고, 요소를 추가하거나 순서를 바꿔보세요.</p></div>`,
      code: `<!doctype html>\n<html lang="ko">\n<head>\n  <meta charset="UTF-8">\n  <title>김재환의 자기소개</title>\n</head>\n<body>\n  <header>\n    <h1>안녕하세요, 김재환입니다.</h1>\n    <p>웹 개발을 배우며 작은 프로젝트를 만들고 있습니다.</p>\n  </header>\n  <main>\n    <section>\n      <h2>좋아하는 것</h2>\n      <ul><li>코딩</li><li>음악</li><li>고양이</li></ul>\n    </section>\n    <section>\n      <h2>연락하기</h2>\n      <a href="mailto:hello@example.com">이메일 보내기</a>\n    </section>\n  </main>\n  <footer>© 2026 김재환</footer>\n</body>\n</html>`,
      task: "모든 예시 내용을 자신의 정보로 바꾸고 새로운 section을 하나 추가해보세요.",
    },
    {
      title: "최종 퀴즈",
      lead: "지금까지 배운 핵심 개념을 문제로 확인하고 강좌를 마무리합니다.",
      copy: `<h2>마지막 점검</h2><p>총 4문제 중 3문제 이상 맞히면 HTML 입문 강좌를 완료할 수 있습니다. 틀려도 언제든 다시 풀 수 있어요.</p><div class="concept-box"><b>기억이 나지 않아도 괜찮아요.</b><p>왼쪽 목차에서 이전 단원으로 돌아가 내용을 다시 확인해 보세요.</p></div>`,
      code: "",
      task: "",
      quiz: true,
    },
  ];

  const quizQuestions = [
    {
      q: "페이지의 가장 중요한 제목에 알맞은 태그는?",
      options: ["<p>", "<h1>", "<title>", "<strong>"],
      answer: 1,
    },
    {
      q: "새 탭에서 링크를 열 때 사용하는 속성은?",
      options: [
        'target="_blank"',
        'open="new"',
        'href="blank"',
        'window="new"',
      ],
      answer: 0,
    },
    {
      q: "이미지를 설명하는 속성은?",
      options: ["title", "src", "alt", "name"],
      answer: 2,
    },
    {
      q: "페이지의 핵심 내용을 감싸는 시맨틱 태그는?",
      options: ["<main>", "<aside>", "<footer>", "<span>"],
      answer: 0,
    },
  ];

  let state = { current: 0, completed: [], code: {} };
  try {
    state = { ...state, ...JSON.parse(localStorage.getItem(KEY)) };
  } catch (_) {}

  const nav = document.querySelector("#lessonNav");
  const editor = document.querySelector("#lessonEditor");
  const preview = document.querySelector("#lessonPreview");
  const practice = document.querySelector("#practiceSection");
  const quizSection = document.querySelector("#quizSection");
  const completeButton = document.querySelector("#completeLesson");

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }
  function escapeHtml(value) {
    return value.replace(
      /[&<>]/g,
      (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char],
    );
  }
  function toast(text) {
    const el = document.querySelector("#lessonToast");
    el.textContent = text;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 1800);
  }
  function updateProgress() {
    const percent = Math.round((state.completed.length / lessons.length) * 100);
    document.querySelector("#progressLabel").textContent = `${percent}%`;
    document.querySelector("#progressBar").style.width = `${percent}%`;
  }
  function renderNav() {
    nav.innerHTML = lessons
      .map(
        (lesson, index) =>
          `<button type="button" data-index="${index}" class="${index === state.current ? "active" : ""} ${state.completed.includes(index) ? "completed" : ""}"><span class="lesson-number">${String(index + 1).padStart(2, "0")}</span><strong>${lesson.title}</strong><span class="lesson-check">${state.completed.includes(index) ? "✓" : ""}</span></button>`,
      )
      .join("");
    nav
      .querySelectorAll("button")
      .forEach((button) =>
        button.addEventListener("click", () =>
          showLesson(Number(button.dataset.index)),
        ),
      );
  }
  function runCode() {
    const value = editor.value;
    state.code[state.current] = value;
    save();
    const isCompleteDocument = /<!doctype|<html[\s>]/i.test(value);
    preview.srcdoc = isCompleteDocument
      ? value
      : `<!doctype html><html><head><meta charset="UTF-8"><style>body{padding:22px;font-family:Arial,sans-serif;color:#272024;line-height:1.6}img{max-width:100%;height:auto}a{color:#9c3340}button{padding:9px 14px}table{border-collapse:collapse}</style></head><body>${value}</body></html>`;
  }
  function renderQuiz() {
    quizSection.innerHTML = `<h2>HTML 최종 퀴즈</h2><p class="quiz-intro">각 질문에 답한 후 채점 버튼을 눌러주세요.</p><form id="quizForm">${quizQuestions.map((item, index) => `<div class="quiz-question" data-question="${index}"><h3>${index + 1}. ${item.q}</h3>${item.options.map((option, i) => `<label><input type="radio" name="q${index}" value="${i}"> ${escapeHtml(option)}</label>`).join("")}</div>`).join("")}<button class="submit-quiz" type="submit">정답 확인</button><p class="quiz-score" id="quizScore"></p></form>`;
    document.querySelector("#quizForm").addEventListener("submit", (event) => {
      event.preventDefault();
      let score = 0;
      quizQuestions.forEach((item, index) => {
        const box = event.currentTarget.querySelector(
          `[data-question="${index}"]`,
        );
        const selected = event.currentTarget.querySelector(
          `input[name="q${index}"]:checked`,
        );
        const correct = selected && Number(selected.value) === item.answer;
        box.classList.toggle("correct", correct);
        box.classList.toggle("wrong", !correct);
        if (correct) score += 1;
      });
      document.querySelector("#quizScore").textContent =
        `${quizQuestions.length}문제 중 ${score}문제를 맞혔습니다.`;
      if (score >= 3) {
        if (!state.completed.includes(7)) state.completed.push(7);
        save();
        updateProgress();
        renderNav();
        completeButton.disabled = false;
        completeButton.classList.add("done");
        completeButton.textContent = "강좌 완료 ✓";
        toast("HTML 입문 강좌를 완료했습니다!");
      } else toast("3문제 이상 맞히면 완료됩니다.");
    });
  }
  function showLesson(index) {
    state.current = index;
    save();
    const lesson = lessons[index];
    document.querySelector("#headerLessonTitle").textContent = lesson.title;
    document.querySelector("#lessonStep").textContent =
      `LESSON ${String(index + 1).padStart(2, "0")}`;
    document.querySelector("#lessonTitle").textContent = lesson.title;
    document.querySelector("#lessonLead").textContent = lesson.lead;
    document.querySelector("#lessonCopy").innerHTML = lesson.copy;
    practice.hidden = Boolean(lesson.quiz);
    quizSection.hidden = !lesson.quiz;
    if (lesson.quiz) renderQuiz();
    else {
      editor.value = state.code[index] ?? lesson.code;
      document.querySelector("#practiceTask").textContent = lesson.task;
      runCode();
    }
    document.querySelector("#prevLesson").disabled = index === 0;
    document.querySelector("#nextLesson").disabled =
      index === lessons.length - 1;
    completeButton.classList.toggle("done", state.completed.includes(index));
    completeButton.textContent = state.completed.includes(index)
      ? "완료됨 ✓"
      : "학습 완료";
    completeButton.disabled = Boolean(
      lesson.quiz && !state.completed.includes(index),
    );
    completeButton.title = completeButton.disabled
      ? "퀴즈에서 3문제 이상 맞히면 완료됩니다."
      : "";
    renderNav();
    updateProgress();
    document.querySelector("#lessonSidebar").classList.remove("open");
    scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelector("#runCode").addEventListener("click", () => {
    runCode();
    toast("결과를 새로 실행했습니다.");
  });
  document.querySelector("#resetCode").addEventListener("click", () => {
    editor.value = lessons[state.current].code;
    runCode();
  });
  document
    .querySelector("#copyLessonCode")
    .addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(editor.value);
        toast("코드를 복사했습니다.");
      } catch {
        toast("코드를 선택해서 복사해 주세요.");
      }
    });
  document
    .querySelector("#prevLesson")
    .addEventListener("click", () =>
      showLesson(Math.max(0, state.current - 1)),
    );
  document
    .querySelector("#nextLesson")
    .addEventListener("click", () =>
      showLesson(Math.min(lessons.length - 1, state.current + 1)),
    );
  completeButton.addEventListener("click", () => {
    if (!state.completed.includes(state.current))
      state.completed.push(state.current);
    else
      state.completed = state.completed.filter(
        (index) => index !== state.current,
      );
    save();
    showLesson(state.current);
    toast(
      state.completed.includes(state.current)
        ? "학습 완료로 표시했습니다."
        : "완료 표시를 취소했습니다.",
    );
  });
  document.querySelector("#resetProgress").addEventListener("click", () => {
    if (confirm("모든 학습 기록과 작성한 코드를 지울까요?")) {
      localStorage.removeItem(KEY);
      state = { current: 0, completed: [], code: {} };
      showLesson(0);
    }
  });
  document
    .querySelector("#mobileOutline")
    .addEventListener("click", (event) => {
      const sidebar = document.querySelector("#lessonSidebar");
      sidebar.classList.toggle("open");
      event.currentTarget.setAttribute(
        "aria-expanded",
        String(sidebar.classList.contains("open")),
      );
    });
  editor.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const start = editor.selectionStart;
      editor.value =
        editor.value.slice(0, start) +
        "  " +
        editor.value.slice(editor.selectionEnd);
      editor.selectionStart = editor.selectionEnd = start + 2;
    }
  });
  showLesson(Math.min(state.current, lessons.length - 1));
})();
