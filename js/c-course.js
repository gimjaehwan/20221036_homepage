(() => {
  const KEY = "c-course-progress-v1";
  const lessons = [
    {
      title: "C 언어와 첫 프로그램",
      lead: "C 프로그램의 기본 구조와 컴파일 과정을 이해합니다.",
      copy: `<h2>C 언어는 어디에 쓰이나요?</h2><p>C는 운영체제, 임베디드 장치, 게임 엔진처럼 <strong>빠른 실행과 메모리 제어</strong>가 필요한 곳에서 널리 사용됩니다.</p><div class="concept-box"><b>작성 → 컴파일 → 실행</b><p>소스 파일(.c)을 컴파일러가 실행 파일로 바꾸고, 컴퓨터가 그 실행 파일을 수행합니다.</p></div><h2>main 함수</h2><p>C 프로그램은 <code>main</code> 함수에서 시작합니다. 문장의 끝에는 세미콜론(<code>;</code>)을 붙입니다.</p>`,
      code: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, C!\\n");\n    return 0;\n}`,
      output: "Hello, C!",
      task: "출력 문장을 자신의 인사말로 바꿔보세요.",
    },
    {
      title: "변수와 자료형",
      lead: "정수, 실수, 문자 데이터를 변수에 저장하는 방법을 배웁니다.",
      copy: `<h2>자료형은 저장할 값의 종류예요</h2><ul><li><code>int</code>: 정수</li><li><code>double</code>: 실수</li><li><code>char</code>: 문자 한 개</li></ul><div class="concept-box"><b>선언과 초기화</b><p><code>int age = 20;</code>은 age라는 정수 변수를 만들고 20을 저장합니다.</p></div><div class="memory-map"><span>age: 20</span><span>score: 95.5</span><span>grade: A</span><span>메모리</span></div>`,
      code: `#include <stdio.h>\n\nint main(void) {\n    int age = 20;\n    double score = 95.5;\n    char grade = 'A';\n\n    printf("나이: %d\\n", age);\n    printf("점수: %.1f\\n", score);\n    printf("등급: %c\\n", grade);\n    return 0;\n}`,
      output: "나이: 20\n점수: 95.5\n등급: A",
      task: "나이, 점수, 등급 값을 자신의 값으로 바꿔보세요.",
    },
    {
      title: "입력과 출력",
      lead: "printf와 scanf로 사용자와 데이터를 주고받습니다.",
      copy: `<h2>형식 지정자</h2><p><code>%d</code>는 정수, <code>%lf</code>는 double, <code>%c</code>는 문자를 입력하거나 출력할 때 사용합니다.</p><div class="concept-box"><b>scanf에는 주소가 필요해요</b><p>변수 앞의 <code>&amp;</code>는 그 변수가 저장된 메모리 주소를 뜻합니다.</p></div>`,
      code: `#include <stdio.h>\n\nint main(void) {\n    int number;\n    printf("숫자를 입력하세요: ");\n    scanf("%d", &number);\n    printf("입력한 숫자: %d\\n", number);\n    return 0;\n}`,
      output: "숫자를 입력하세요: 7\n입력한 숫자: 7",
      task: "정수 두 개를 입력받아 두 값의 합을 출력하도록 확장해보세요.",
    },
    {
      title: "조건문",
      lead: "조건에 따라 서로 다른 코드를 실행하는 방법을 익힙니다.",
      copy: `<h2>if와 else</h2><p>조건식이 참이면 <code>if</code> 블록을, 거짓이면 <code>else</code> 블록을 실행합니다.</p><ul><li><code>==</code>: 같다</li><li><code>!=</code>: 다르다</li><li><code>&gt;=</code>: 크거나 같다</li><li><code>&amp;&amp;</code>: 두 조건이 모두 참</li></ul>`,
      code: `#include <stdio.h>\n\nint main(void) {\n    int score = 82;\n\n    if (score >= 80) {\n        printf("합격입니다.\\n");\n    } else {\n        printf("다시 도전하세요.\\n");\n    }\n    return 0;\n}`,
      output: "합격입니다.",
      task: "90점 이상 A, 80점 이상 B, 나머지는 C를 출력하도록 조건을 늘려보세요.",
    },
    {
      title: "반복문",
      lead: "for와 while을 사용해 반복 작업을 간결하게 표현합니다.",
      copy: `<h2>횟수를 알면 for</h2><p><code>for (초기식; 조건식; 증감식)</code> 순서로 반복을 제어합니다.</p><div class="concept-box"><b>무한 반복을 주의하세요.</b><p>조건이 언젠가 거짓이 되도록 반복 변수의 값을 바꿔야 합니다.</p></div>`,
      code: `#include <stdio.h>\n\nint main(void) {\n    int sum = 0;\n    for (int i = 1; i <= 5; i++) {\n        sum += i;\n        printf("%d ", i);\n    }\n    printf("\\n합계: %d\\n", sum);\n    return 0;\n}`,
      output: "1 2 3 4 5\n합계: 15",
      task: "1부터 10까지의 짝수만 출력하도록 조건을 바꿔보세요.",
    },
    {
      title: "배열과 문자열",
      lead: "같은 종류의 여러 값을 연속된 메모리에 저장합니다.",
      copy: `<h2>배열의 인덱스는 0부터</h2><p>크기가 5인 배열의 유효한 인덱스는 0부터 4까지입니다. 범위를 벗어나면 예측하기 어려운 오류가 생깁니다.</p><div class="memory-map"><span>scores[0]</span><span>scores[1]</span><span>scores[2]</span><span>scores[3]</span></div><p>C의 문자열은 <code>char</code> 배열이며 마지막에 끝을 알리는 <code>\\0</code> 문자가 들어갑니다.</p>`,
      code: `#include <stdio.h>\n\nint main(void) {\n    int scores[4] = {90, 85, 100, 95};\n    int total = 0;\n\n    for (int i = 0; i < 4; i++) {\n        total += scores[i];\n    }\n    printf("평균: %.1f\\n", total / 4.0);\n    return 0;\n}`,
      output: "평균: 92.5",
      task: "점수를 하나 더 추가하고 배열 크기와 평균 계산을 함께 수정해보세요.",
    },
    {
      title: "함수와 포인터",
      lead: "기능을 함수로 나누고 포인터로 메모리 주소를 다룹니다.",
      copy: `<h2>함수로 코드를 나누기</h2><p>함수는 입력을 받아 작업한 뒤 결과를 반환할 수 있습니다. 반복되는 로직을 함수로 만들면 코드가 읽기 쉬워집니다.</p><h2>포인터란?</h2><p>포인터는 다른 변수의 <strong>메모리 주소</strong>를 저장하는 변수입니다. <code>&amp;value</code>로 주소를 얻고, <code>*pointer</code>로 그 주소의 값에 접근합니다.</p><div class="concept-box"><b>포인터의 자료형을 맞추세요.</b><p>int 변수의 주소는 int 포인터에 저장합니다.</p></div>`,
      code: `#include <stdio.h>\n\nvoid double_value(int *number) {\n    *number = *number * 2;\n}\n\nint main(void) {\n    int value = 10;\n    double_value(&value);\n    printf("결과: %d\\n", value);\n    return 0;\n}`,
      output: "결과: 20",
      task: "값을 3배로 바꾸는 triple_value 함수로 수정해보세요.",
    },
    {
      title: "최종 퀴즈",
      lead: "C 언어의 핵심 문법과 메모리 개념을 점검합니다.",
      copy: `<h2>마지막 점검</h2><p>총 4문제 중 3문제 이상 맞히면 C 언어 입문 강좌가 완료됩니다.</p><div class="concept-box"><b>틀려도 다시 풀 수 있어요.</b><p>왼쪽 목차에서 필요한 단원을 다시 확인한 후 재도전하세요.</p></div>`,
      code: "",
      output: "",
      task: "",
      quiz: true,
    },
  ];
  const questions = [
    {
      q: "C 프로그램이 시작되는 함수는?",
      options: ["start", "main", "init", "run"],
      answer: 1,
    },
    {
      q: "정수를 저장하는 기본 자료형은?",
      options: ["char", "double", "int", "void"],
      answer: 2,
    },
    {
      q: "배열의 첫 번째 인덱스는?",
      options: ["0", "1", "-1", "배열마다 다름"],
      answer: 0,
    },
    {
      q: "변수의 주소를 얻는 연산자는?",
      options: ["*", "%", "&", "@"],
      answer: 2,
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
  function progress() {
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
          show(Number(button.dataset.index)),
        ),
      );
  }
  function showOutput() {
    const lesson = lessons[state.current];
    state.code[state.current] = editor.value;
    save();
    preview.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;padding:24px;color:#eee;background:#0d0c0d;font:15px/1.8 Consolas,monospace}small{display:block;margin-bottom:18px;color:#a2525d;font:700 11px Arial,sans-serif;letter-spacing:.12em}pre{white-space:pre-wrap}</style></head><body><small>EXPECTED OUTPUT</small><pre>${esc(lesson.output)}</pre></body></html>`;
  }
  function renderQuiz() {
    quiz.innerHTML = `<h2>C 언어 최종 퀴즈</h2><p class="quiz-intro">각 질문에 답한 후 정답을 확인하세요.</p><form id="quizForm">${questions.map((item, index) => `<div class="quiz-question" data-question="${index}"><h3>${index + 1}. ${item.q}</h3>${item.options.map((option, i) => `<label><input type="radio" name="q${index}" value="${i}"> ${esc(option)}</label>`).join("")}</div>`).join("")}<button class="submit-quiz" type="submit">정답 확인</button><p class="quiz-score" id="quizScore"></p></form>`;
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
        progress();
        renderNav();
        toast("C 언어 입문 강좌를 완료했습니다!");
      } else toast("3문제 이상 맞히면 완료됩니다.");
    });
  }
  function show(index) {
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
    progress();
    document.querySelector("#lessonSidebar").classList.remove("open");
    scrollTo({ top: 0, behavior: "smooth" });
  }
  document.querySelector("#runCode").addEventListener("click", () => {
    showOutput();
    toast("예상 출력을 표시했습니다.");
  });
  document.querySelector("#resetCode").addEventListener("click", () => {
    editor.value = lessons[state.current].code;
    showOutput();
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
    .addEventListener("click", () => show(Math.max(0, state.current - 1)));
  document
    .querySelector("#nextLesson")
    .addEventListener("click", () =>
      show(Math.min(lessons.length - 1, state.current + 1)),
    );
  complete.addEventListener("click", () => {
    if (!state.completed.includes(state.current))
      state.completed.push(state.current);
    else
      state.completed = state.completed.filter(
        (index) => index !== state.current,
      );
    save();
    show(state.current);
    toast(
      state.completed.includes(state.current)
        ? "학습 완료로 표시했습니다."
        : "완료 표시를 취소했습니다.",
    );
  });
  document.querySelector("#resetProgress").addEventListener("click", () => {
    if (confirm("모든 C 학습 기록을 지울까요?")) {
      localStorage.removeItem(KEY);
      state = { current: 0, completed: [], code: {} };
      show(0);
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
        "    " +
        editor.value.slice(editor.selectionEnd);
      editor.selectionStart = editor.selectionEnd = start + 4;
    }
  });
  show(Math.min(state.current, lessons.length - 1));
})();
