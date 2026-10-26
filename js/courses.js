(() => {
  const cards = [...document.querySelectorAll(".course-card")];
  const htmlCourseLink = document.querySelector(
    '.course-card[data-search*="html"] a',
  );
  if (htmlCourseLink) {
    htmlCourseLink.href = "mhtml-course.html";
    htmlCourseLink.removeAttribute("data-example");
    htmlCourseLink.innerHTML = "강좌 시작하기 <b>→</b>";
  }
  const cCourseLink = document.querySelector(
    '.course-card[data-search*="포인터"] a',
  );
  if (cCourseLink) {
    cCourseLink.href = "mc-course.html";
    cCourseLink.innerHTML = "강좌 시작하기 <b>→</b>";
  }
  const cppCourseLink = document.querySelector(
    '.course-card[data-search*="c++"] a',
  );
  if (cppCourseLink) {
    cppCourseLink.href = "mcpp-course.html";
    cppCourseLink.innerHTML = "강좌 시작하기 <b>→</b>";
  }
  const search = document.querySelector("#courseSearch");
  const filters = [...document.querySelectorAll(".course-filters button")];
  const empty = document.querySelector("#courseEmpty");
  let activeFilter = "all";

  function filterCourses() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const categoryMatch =
        activeFilter === "all" ||
        card.dataset.category.split(" ").includes(activeFilter);
      const textMatch =
        !query ||
        `${card.dataset.search} ${card.textContent}`
          .toLowerCase()
          .includes(query);
      card.hidden = !(categoryMatch && textMatch);
      if (!card.hidden) visible += 1;
    });
    empty.hidden = visible !== 0;
  }

  search.addEventListener("input", filterCourses);
  filters.forEach((button) =>
    button.addEventListener("click", () => {
      filters.forEach((item) =>
        item.classList.toggle("active", item === button),
      );
      activeFilter = button.dataset.filter;
      filterCourses();
    }),
  );

  const examples = {
    html: {
      code: '<article class="profile">\n  <h2>첫 번째 웹페이지</h2>\n  <p>HTML은 내용의 구조를 만듭니다.</p>\n</article>',
      result:
        '<div class="demo-card"><h3>첫 번째 웹페이지</h3><p>HTML은 내용의 구조를 만듭니다.</p></div>',
    },
    css: {
      code: ".button {\n  padding: 12px 18px;\n  border-radius: 10px;\n  color: white;\n  background: #8f2e3a;\n}",
      result: '<button class="demo-button">버튼 디자인</button>',
    },
    javascript: {
      code: 'const button = document.querySelector("button");\n\nbutton.addEventListener("click", () => {\n  button.textContent = "완료!";\n});',
      result:
        '<button class="demo-button" onclick="this.textContent=\'완료!\'">직접 눌러보세요</button>',
    },
  };
  const code = document.querySelector("#codeExample");
  const result = document.querySelector("#codeResult");
  const tabs = [...document.querySelectorAll(".code-tabs button")];

  function showExample(name) {
    const example = examples[name] || examples.html;
    code.textContent = example.code;
    result.innerHTML = example.result;
    tabs.forEach((tab) =>
      tab.classList.toggle("active", tab.dataset.example === name),
    );
  }

  tabs.forEach((tab) =>
    tab.addEventListener("click", () => showExample(tab.dataset.example)),
  );
  document
    .querySelectorAll('[data-example][href="#code-lab"]')
    .forEach((link) =>
      link.addEventListener("click", () => showExample(link.dataset.example)),
    );
  document
    .querySelector("#copyCode")
    .addEventListener("click", async (event) => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        event.currentTarget.textContent = "복사 완료";
      } catch {
        event.currentTarget.textContent = "코드를 선택해 복사하세요";
      }
      setTimeout(() => {
        event.currentTarget.textContent = "코드 복사";
      }, 1800);
    });
  showExample("html");

  const pathData = {
    beginner: {
      icon: "01",
      title: "HTML 입문 → 자기소개 페이지 실습",
      text: "문서 구조부터 시작해 직접 코드를 실행하며 첫 웹페이지를 완성하세요.",
      target: "mhtml-course.html",
    },
    web: {
      icon: "02",
      title: "HTML 입문 → 자기소개 페이지 실습",
      text: "실습과 퀴즈가 포함된 8개 단원으로 웹페이지의 뼈대를 익히세요.",
      target: "mhtml-course.html",
    },
    system: {
      icon: "03",
      title: "C 기초 → 배열과 함수 → 포인터",
      text: "8개 단원에서 C 문법과 메모리의 기초를 예제로 익히세요.",
      target: "mc-course.html",
    },
  };
  const pathButtons = [...document.querySelectorAll("[data-path]")];
  const pathResult = document.querySelector("#pathResult");
  function showPath(name) {
    const item = pathData[name];
    pathResult.innerHTML = `<span>${item.icon}</span><div><h3>${item.title}</h3><p>${item.text}</p></div><a href="${item.target}">추천 강좌 보기 →</a>`;
    pathButtons.forEach((button) =>
      button.classList.toggle("active", button.dataset.path === name),
    );
  }
  pathButtons.forEach((button) =>
    button.addEventListener("click", () => showPath(button.dataset.path)),
  );
  showPath("beginner");

  document.querySelectorAll(".syllabus-item>button").forEach((button) =>
    button.addEventListener("click", () => {
      const item = button.closest(".syllabus-item");
      const willOpen = !item.classList.contains("open");
      document.querySelectorAll(".syllabus-item").forEach((section) => {
        section.classList.remove("open");
        section.querySelector("button").setAttribute("aria-expanded", "false");
      });
      if (willOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    }),
  );
})();
