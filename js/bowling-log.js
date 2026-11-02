(() => {
  const KEY = "pin-lab-practice-records-v1";
  const form = document.querySelector("#practiceForm");
  const list = document.querySelector("#recordList");
  const date = document.querySelector("#playDate");
  const score = document.querySelector("#score");
  const focus = document.querySelector("#focus");
  const memo = document.querySelector("#memo");
  let records = [];

  try {
    records = JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    records = [];
  }

  date.value = new Date().toISOString().slice(0, 10);

  const escapeHtml = (value) =>
    String(value).replace(
      /[&<>'"]/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[char],
    );

  function save() {
    localStorage.setItem(KEY, JSON.stringify(records));
  }

  function render() {
    if (!records.length) {
      list.innerHTML =
        '<div class="empty">아직 저장한 게임이 없습니다.<br />첫 연습 기록을 남겨보세요.</div>';
      return;
    }
    list.innerHTML = records
      .map(
        (record) => `
      <article class="record">
        <div class="record-top"><strong>${record.score}점</strong><time>${record.date}</time></div>
        <p><b>${escapeHtml(record.focus)}</b>${record.memo ? `<br>${escapeHtml(record.memo)}` : ""}</p>
        <button type="button" data-delete="${record.id}">기록 삭제</button>
      </article>`,
      )
      .join("");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    records.unshift({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      date: date.value,
      score: Number(score.value),
      focus: focus.value,
      memo: memo.value.trim(),
    });
    save();
    form.reset();
    date.value = new Date().toISOString().slice(0, 10);
    render();
  });

  list.addEventListener("click", (event) => {
    const id = event.target.dataset.delete;
    if (!id) return;
    records = records.filter((record) => record.id !== id);
    save();
    render();
  });

  render();
})();
