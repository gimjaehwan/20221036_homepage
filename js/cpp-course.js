(() => {
  const KEY = "cpp-course-progress-v1";
  const lessons = [
    {
      title: "C++와 첫 프로그램",
      lead: "iostream과 cout을 사용해 첫 C++ 프로그램을 만듭니다.",
      copy: `<h2>C++의 시작</h2><p>C++는 C의 성능과 저수준 제어를 유지하면서 클래스, 객체, 표준 라이브러리를 더한 언어입니다.</p><div class="concept-box"><b>std::cout</b><p><code>&lt;iostream&gt;</code>을 포함하면 콘솔에 문장을 출력할 수 있습니다. <code>\\n</code>은 줄을 바꿉니다.</p></div>`,
      code: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++!\\n";\n    return 0;\n}`,
      output: "Hello, C++!",
      task: "인사말을 바꾸고 자신의 학습 목표를 한 줄 더 출력하세요.",
    },
    {
      title: "변수와 문자열",
      lead: "auto, const, string 등 C++의 편리한 자료형 기능을 익힙니다.",
      copy: `<h2>값을 저장하는 변수</h2><p><code>int</code>는 정수, <code>double</code>은 실수, <code>std::string</code>은 문자열을 저장합니다. 바뀌지 않을 값은 <code>const</code>로 선언합니다.</p><div class="concept-box"><b>auto</b><p>오른쪽 값을 보고 컴파일러가 자료형을 추론하게 할 수 있습니다.</p></div>`,
      code: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string name = "김재환";\n    const int level = 1;\n    auto score = 95.5;\n\n    std::cout << name << " / 레벨 " << level << "\\n";\n    std::cout << "점수: " << score << "\\n";\n}`,
      output: "김재환 / 레벨 1\n점수: 95.5",
      task: "이름, 레벨, 점수를 자신의 값으로 수정하세요.",
    },
    {
      title: "조건문",
      lead: "조건에 따라 프로그램의 실행 흐름을 나눕니다.",
      copy: `<h2>if, else if, else</h2><p>위쪽 조건부터 검사하고 처음 참이 된 블록 하나만 실행합니다.</p><ul><li><code>==</code>: 같다</li><li><code>&amp;&amp;</code>: 모두 참</li><li><code>||</code>: 하나 이상 참</li></ul>`,
      code: `#include <iostream>\n\nint main() {\n    int score = 86;\n    if (score >= 90) {\n        std::cout << "A\\n";\n    } else if (score >= 80) {\n        std::cout << "B\\n";\n    } else {\n        std::cout << "C\\n";\n    }\n}`,
      output: "B",
      task: "70점 이상은 C, 그 미만은 다시 도전이라고 출력하도록 조건을 늘리세요.",
    },
    {
      title: "반복문과 vector",
      lead: "여러 데이터를 vector에 담고 반복문으로 처리합니다.",
      copy: `<h2>크기가 변하는 배열</h2><p><code>std::vector</code>는 필요한 만큼 데이터를 추가할 수 있는 표준 컨테이너입니다. 범위 기반 for 문으로 모든 원소를 간단히 읽을 수 있습니다.</p>`,
      code: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> scores {80, 90, 100};\n    int total = 0;\n\n    for (int score : scores) {\n        total += score;\n    }\n    std::cout << "합계: " << total << "\\n";\n}`,
      output: "합계: 270",
      task: "점수를 두 개 더 추가하고 평균도 출력해보세요.",
    },
    {
      title: "함수와 참조",
      lead: "기능을 함수로 분리하고 참조로 원본 값을 안전하게 다룹니다.",
      copy: `<h2>참조 전달</h2><p>매개변수에 <code>&amp;</code>를 붙이면 복사본이 아니라 원본 변수를 가리킵니다. 읽기만 할 때는 <code>const</code> 참조를 사용합니다.</p><div class="concept-box"><b>const std::string&amp;</b><p>긴 문자열을 복사하지 않으면서 함수 안에서 수정하지 못하게 합니다.</p></div>`,
      code: `#include <iostream>\n#include <string>\n\nvoid greet(const std::string& name) {\n    std::cout << name << "님, 반갑습니다!\\n";\n}\n\nint main() {\n    std::string user = "김재환";\n    greet(user);\n}`,
      output: "김재환님, 반갑습니다!",
      task: "학습 목표도 매개변수로 받아 함께 출력하도록 함수를 수정하세요.",
    },
    {
      title: "클래스와 객체",
      lead: "데이터와 기능을 하나로 묶는 객체지향의 기본을 배웁니다.",
      copy: `<h2>클래스는 설계도</h2><p>클래스는 객체가 가질 데이터와 동작을 정의합니다. <code>public</code> 영역의 멤버는 클래스 밖에서도 사용할 수 있습니다.</p><div class="concept-box"><b>생성자</b><p>객체가 만들어질 때 필요한 값을 받아 멤버를 초기화합니다.</p></div>`,
      code: `#include <iostream>\n#include <string>\n\nclass Course {\npublic:\n    Course(std::string title) : title_(title) {}\n    void introduce() const {\n        std::cout << title_ << " 강좌입니다.\\n";\n    }\nprivate:\n    std::string title_;\n};\n\nint main() {\n    Course course("C++ 입문");\n    course.introduce();\n}`,
      output: "C++ 입문 강좌입니다.",
      task: "수강 시간 멤버를 추가하고 introduce 함수에서 함께 출력하세요.",
    },
    {
      title: "상속과 다형성",
      lead: "공통 기능을 상속하고 가상 함수로 동작을 바꿉니다.",
      copy: `<h2>다형성</h2><p>기반 클래스의 함수를 <code>virtual</code>로 선언하면 파생 클래스가 <code>override</code>하여 자신에게 맞는 동작을 제공할 수 있습니다.</p><div class="concept-box"><b>소멸자는 virtual</b><p>기반 클래스 포인터로 객체를 제거할 가능성이 있다면 가상 소멸자를 사용합니다.</p></div>`,
      code: `#include <iostream>\n\nclass Language {\npublic:\n    virtual void hello() const { std::cout << "Hello\\n"; }\n    virtual ~Language() = default;\n};\n\nclass Cpp : public Language {\npublic:\n    void hello() const override { std::cout << "Hello, C++!\\n"; }\n};\n\nint main() {\n    Cpp language;\n    Language& base = language;\n    base.hello();\n}`,
      output: "Hello, C++!",
      task: "새로운 Python 클래스를 만들고 hello 함수를 재정의해보세요.",
    },
    {
      title: "최종 퀴즈",
      lead: "C++ 기본 문법과 객체지향 개념을 확인합니다.",
      copy: `<h2>마지막 점검</h2><p>4문제 중 3문제 이상 맞히면 C++ 입문 강좌를 완료합니다.</p><div class="concept-box"><b>언제든 다시 풀 수 있어요.</b><p>기억나지 않는 내용은 왼쪽 목차에서 다시 확인하세요.</p></div>`,
      code: "",
      output: "",
      task: "",
      quiz: true,
    },
  ];
  const questions = [
    {
      q: "문자열을 저장하는 표준 타입은?",
      options: ["std::string", "std::cout", "std::vector", "std::class"],
      answer: 0,
    },
    {
      q: "값이 바뀌지 않도록 선언하는 키워드는?",
      options: ["auto", "const", "public", "virtual"],
      answer: 1,
    },
    {
      q: "클래스에서 외부에 공개하는 접근 지정자는?",
      options: ["private", "static", "public", "return"],
      answer: 2,
    },
    {
      q: "파생 클래스에서 가상 함수를 재정의할 때 쓰는 키워드는?",
      options: ["override", "include", "using", "template"],
      answer: 0,
    },
  ];
  let state = { current: 0, completed: [], code: {} };
  try {
    state = { ...state, ...JSON.parse(localStorage.getItem(KEY)) };
  } catch (_) {}
  const nav = document.querySelector("#lessonNav"),
    editor = document.querySelector("#lessonEditor"),
    preview = document.querySelector("#lessonPreview"),
    practice = document.querySelector("#practiceSection"),
    quiz = document.querySelector("#quizSection"),
    complete = document.querySelector("#completeLesson");
  const save = () => localStorage.setItem(KEY, JSON.stringify(state));
  const esc = (value) =>
    String(value).replace(
      /[&<>]/g,
      (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char],
    );
  function toast(text) {
    const el = document.querySelector("#lessonToast");
    el.textContent = text;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 1800);
  }
  function updateProgress() {
    const value = Math.round((state.completed.length / lessons.length) * 100);
    document.querySelector("#progressLabel").textContent = `${value}%`;
    document.querySelector("#progressBar").style.width = `${value}%`;
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
  function saveEditor() {
    state.code[state.current] = editor.value;
    save();
  }
  function blockAfter(source, start) {
    const open = source.indexOf("{", start);
    if (open < 0) return "";
    let depth = 0;
    for (let i = open; i < source.length; i++) {
      if (source[i] === "{") depth++;
      if (source[i] === "}" && --depth === 0) return source.slice(open + 1, i);
    }
    return "";
  }
  function decodeLiteral(value) {
    return value
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }
  function valuesFrom(source) {
    const values = {};
    for (const match of source.matchAll(
      /(?:std::string|string|int|double|auto)\s+(\w+)\s*=\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|-?\d+(?:\.\d+)?)/g,
    )) {
      const raw = match[2];
      values[match[1]] =
        raw.startsWith('"') || raw.startsWith("'")
          ? decodeLiteral(raw.slice(1, -1))
          : raw;
    }
    return values;
  }
  function renderCout(body, context = {}) {
    const values = { ...valuesFrom(body), ...context };
    let result = "";
    for (const match of body.matchAll(/std::cout\s*<<\s*([\s\S]*?);/g)) {
      const expression = match[1];
      for (const part of expression.split(/\s*<<\s*/)) {
        const token = part.trim();
        if (/^"[\s\S]*"$/.test(token) || /^'[\s\S]*'$/.test(token))
          result += decodeLiteral(token.slice(1, -1));
        else if (token === "std::endl") result += "\n";
        else if (/^getName\s*\(\s*\)$/.test(token))
          result += context.__name ?? "";
        else if (Object.prototype.hasOwnProperty.call(values, token))
          result += values[token];
        else if (/^-?\d+(?:\.\d+)?$/.test(token)) result += token;
      }
    }
    return result;
  }
  function simulateCpp(source) {
    const mainIndex = source.search(/\bint\s+main\s*\(/);
    if (mainIndex < 0) return "";
    const main = blockAfter(source, mainIndex);
    const values = valuesFrom(source);
    let result = renderCout(main, values);
    const objects = {};
    for (const match of main.matchAll(
      /\b(\w+)\s+(\w+)\s*[({]\s*"((?:\\.|[^"\\])*)"/g,
    ))
      objects[match[2]] = { type: match[1], name: decodeLiteral(match[3]) };
    for (const call of main.matchAll(/\b(\w+)\.(\w+)\s*\(\s*\)\s*;/g)) {
      const object = objects[call[1]];
      if (!object) continue;
      const methodPattern = new RegExp(
        `\\b(?:void|auto|std::string|string|int|double)\\s+${call[2]}\\s*\\(`,
      );
      const methodIndex = source.search(methodPattern);
      if (methodIndex >= 0)
        result += renderCout(blockAfter(source, methodIndex), {
          ...values,
          __name: object.name,
        });
    }
    return result.trimEnd();
  }
  function showOutput() {
    saveEditor();
    const lesson = lessons[state.current],
      changed = editor.value.trim() !== lesson.code.trim(),
      simulated = simulateCpp(editor.value),
      output = simulated || lesson.output,
      label = changed
        ? simulated
          ? "EDITED CODE PREVIEW"
          : "PREVIEW NOT AVAILABLE"
        : "ORIGINAL EXAMPLE OUTPUT",
      message =
        changed && !simulated
          ? "이 문법은 브라우저 미리보기에서 계산할 수 없습니다. C++17 컴파일러에서 실행해 주세요."
          : output;
    preview.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;padding:24px;color:#eee;background:#0d0c0d;font:15px/1.8 Consolas,monospace}small{display:block;margin-bottom:18px;color:#d05b69;font:700 11px Arial,sans-serif;letter-spacing:.12em}pre{white-space:pre-wrap}</style></head><body><small>${label}</small><pre>${esc(message)}</pre></body></html>`;
  }
  function renderQuiz() {
    quiz.innerHTML = `<h2>C++ 최종 퀴즈</h2><p class="quiz-intro">답을 고른 뒤 정답을 확인하세요.</p><form id="quizForm">${questions.map((item, index) => `<div class="quiz-question" data-question="${index}"><h3>${index + 1}. ${item.q}</h3>${item.options.map((option, i) => `<label><input type="radio" name="q${index}" value="${i}"> ${esc(option)}</label>`).join("")}</div>`).join("")}<button class="submit-quiz" type="submit">정답 확인</button><p class="quiz-score" id="quizScore"></p></form>`;
    document.querySelector("#quizForm").addEventListener("submit", (event) => {
      event.preventDefault();
      let score = 0;
      questions.forEach((item, index) => {
        const box = event.currentTarget.querySelector(
            `[data-question="${index}"]`,
          ),
          selected = event.currentTarget.querySelector(
            `input[name="q${index}"]:checked`,
          ),
          correct = selected && Number(selected.value) === item.answer;
        box.classList.toggle("correct", correct);
        box.classList.toggle("wrong", !correct);
        if (correct) score++;
      });
      document.querySelector("#quizScore").textContent =
        `4문제 중 ${score}문제를 맞혔습니다.`;
      if (score >= 3) {
        if (!state.completed.includes(7)) state.completed.push(7);
        save();
        complete.disabled = false;
        complete.classList.add("done");
        complete.textContent = "강좌 완료 ✓";
        updateProgress();
        renderNav();
        toast("C++ 입문 강좌를 완료했습니다!");
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
    quiz.hidden = !lesson.quiz;
    if (lesson.quiz) renderQuiz();
    else {
      editor.value = state.code[index] ?? lesson.code;
      document.querySelector("#practiceTask").textContent = lesson.task;
      showOutput();
    }
    document.querySelector("#prevLesson").disabled = index === 0;
    document.querySelector("#nextLesson").disabled =
      index === lessons.length - 1;
    complete.classList.toggle("done", state.completed.includes(index));
    complete.textContent = state.completed.includes(index)
      ? "완료됨 ✓"
      : "학습 완료";
    complete.disabled = Boolean(
      lesson.quiz && !state.completed.includes(index),
    );
    renderNav();
    updateProgress();
    document.querySelector("#lessonSidebar").classList.remove("open");
    scrollTo({ top: 0, behavior: "smooth" });
  }
  editor.addEventListener("input", () => {
    saveEditor();
    showOutput();
  });
  editor.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const start = editor.selectionStart;
      editor.value =
        editor.value.slice(0, start) +
        "    " +
        editor.value.slice(editor.selectionEnd);
      editor.selectionStart = editor.selectionEnd = start + 4;
      saveEditor();
      showOutput();
    }
  });
  document.querySelector("#runCode").addEventListener("click", () => {
    showOutput();
    toast("수정한 코드의 결과를 미리 봅니다.");
  });
  document.querySelector("#resetCode").addEventListener("click", () => {
    editor.value = lessons[state.current].code;
    saveEditor();
    showOutput();
    toast("처음 코드로 되돌렸습니다.");
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
  complete.addEventListener("click", () => {
    if (!state.completed.includes(state.current))
      state.completed.push(state.current);
    else
      state.completed = state.completed.filter(
        (item) => item !== state.current,
      );
    save();
    showLesson(state.current);
  });
  document.querySelector("#resetProgress").addEventListener("click", () => {
    if (confirm("모든 C++ 학습 기록을 지울까요?")) {
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
  showLesson(Math.min(state.current, lessons.length - 1));
})();
