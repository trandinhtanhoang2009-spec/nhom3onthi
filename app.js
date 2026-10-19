(() => {
  "use strict";

  const DATA = window.STUDY_DATA;
  const STORAGE_KEY = "on-nhe-study-app-v1";
  // Nhập email chung của nhóm nếu muốn điền sẵn email nhận góp ý trong biểu mẫu.
  const FEEDBACK_EMAIL = "";
  const FOCUS_SECONDS = 25 * 60;
  const DEFAULT_STATE = {
    theme: "light",
    profile: null,
    savedLessons: [],
    completedLessons: [],
    bestScores: {},
    comments: {},
    customLessons: [],
    essayDrafts: {}
  };

  const byId = (id) => document.getElementById(id);
  const safeStorage = {
    get(key) {
      try { return localStorage.getItem(key); } catch (_) { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); return true; } catch (_) { return false; }
    }
  };

  function loadState() {
    try {
      const saved = JSON.parse(safeStorage.get(STORAGE_KEY) || "null");
      if (!saved || typeof saved !== "object") return { ...DEFAULT_STATE };
      return {
        ...DEFAULT_STATE,
        ...saved,
        savedLessons: Array.isArray(saved.savedLessons) ? saved.savedLessons : [],
        completedLessons: Array.isArray(saved.completedLessons) ? saved.completedLessons : [],
        customLessons: Array.isArray(saved.customLessons) ? saved.customLessons : [],
        bestScores: saved.bestScores && typeof saved.bestScores === "object" ? saved.bestScores : {},
        comments: saved.comments && typeof saved.comments === "object" ? saved.comments : {},
        essayDrafts: saved.essayDrafts && typeof saved.essayDrafts === "object" ? saved.essayDrafts : {}
      };
    } catch (_) {
      return { ...DEFAULT_STATE };
    }
  }

  let state = loadState();
  let activeFilter = "all";
  let activeLesson = null;
  let activeTest = null;
  let quizAnswers = {};
  let quizSubmitted = false;
  let quizTimerInterval = null;
  let quizRemaining = 0;
  let focusRemaining = FOCUS_SECONDS;
  let focusInterval = null;
  let focusRunning = false;
  let toastTimeout = null;

  function persist() {
    const okay = safeStorage.set(STORAGE_KEY, JSON.stringify(state));
    if (!okay) showToast("Trình duyệt không cho phép lưu dữ liệu trên thiết bị này.");
    return okay;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function getAllLessons() {
    return [...DATA.lessons, ...state.customLessons];
  }

  function getSubject(subjectId) {
    return DATA.subjects.find((subject) => subject.id === subjectId) || DATA.subjects[0];
  }

  function showToast(message) {
    const toast = byId("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("is-visible"), 3000);
  }

  function applyTheme() {
    document.documentElement.dataset.theme = state.theme === "dark" ? "dark" : "light";
    const dark = state.theme === "dark";
    const icon = document.querySelector(".theme-icon");
    if (icon) icon.textContent = dark ? "☀" : "☾";
    const button = byId("themeToggle");
    if (button) {
      button.setAttribute("aria-label", dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối");
      button.title = dark ? "Giao diện sáng" : "Giao diện tối";
    }
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.content = dark ? "#152426" : "#f5f3ee";
  }

  function updateProfileUI() {
    const name = state.profile && state.profile.name ? state.profile.name.trim() : "";
    byId("profileButtonText").textContent = name ? `Xin chào, ${name}` : "Học với tư cách khách";
    byId("profileAvatar").textContent = name ? name.charAt(0).toLocaleUpperCase("vi-VN") : "K";
    byId("profileNameInput").value = name;
    byId("profileEmailInput").value = state.profile && state.profile.email ? state.profile.email : "";
  }

  function countDone(subjectId) {
    const validIds = new Set(getAllLessons().filter((lesson) => !subjectId || lesson.subject === subjectId).map((lesson) => lesson.id));
    return state.completedLessons.filter((id) => validIds.has(id)).length;
  }

  function updateProgress() {
    const lessons = getAllLessons();
    const done = countDone();
    const percent = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
    byId("overallProgressText").textContent = `${percent}%`;
    byId("overallProgressBar").style.width = `${percent}%`;
    byId("progressHint").textContent = done
      ? `Bạn đã hoàn thành ${done} trên ${lessons.length} bài học. Cứ giữ nhịp nhé!`
      : "Hoàn thành một bài học để bắt đầu ghi nhận tiến độ.";
    byId("lessonTotal").textContent = String(lessons.length).padStart(2, "0");
  }

  function renderSubjects() {
    const grid = byId("subjectGrid");
    grid.innerHTML = DATA.subjects.map((subject) => {
      const lessons = getAllLessons().filter((lesson) => lesson.subject === subject.id);
      const done = countDone(subject.id);
      const skills = subject.skills.slice(0, 4).map((skill) => `<span>${escapeHtml(skill)}</span>`).join("");
      return `
        <a class="subject-card" href="#hoc-lieu" data-color="${escapeHtml(subject.color)}" data-select-subject="${escapeHtml(subject.id)}" aria-label="Mở bài học môn ${escapeHtml(subject.name)}">
          <span class="subject-card-top"><span class="subject-symbol" aria-hidden="true">${escapeHtml(subject.icon)}</span><span class="subject-badge">${escapeHtml(subject.badge)}</span></span>
          <h3>${escapeHtml(subject.name)}</h3>
          <p class="subject-exam">${escapeHtml(subject.exam)}</p>
          <p class="subject-summary">${escapeHtml(subject.summary)}</p>
          <span class="skill-tags">${skills}</span>
          <span class="subject-card-bottom"><span>${done}/${lessons.length} bài đã học</span><span class="subject-arrow" aria-hidden="true">→</span></span>
        </a>`;
    }).join("");
  }

  function renderFilters() {
    const wrap = byId("filterButtons");
    const buttons = [
      { id: "all", label: "Tất cả" },
      ...DATA.subjects.map((subject) => ({ id: subject.id, label: subject.short })),
      { id: "saved", label: "♡ Đã lưu", saved: true }
    ];
    wrap.innerHTML = buttons.map((item) => `
      <button class="filter-chip${item.saved ? " saved-filter" : ""}" type="button" data-filter="${escapeHtml(item.id)}" aria-pressed="${activeFilter === item.id ? "true" : "false"}">${escapeHtml(item.label)}</button>
    `).join("");
  }

  function renderLessons() {
    renderFilters();
    const grid = byId("lessonGrid");
    const query = byId("lessonSearch").value.trim().toLocaleLowerCase("vi-VN");
    const lessons = getAllLessons().filter((lesson) => {
      const isSaved = state.savedLessons.includes(lesson.id);
      const filterMatches = activeFilter === "all" || (activeFilter === "saved" ? isSaved : lesson.subject === activeFilter);
      const haystack = [lesson.title, lesson.subtitle, lesson.category, lesson.goal, ...(lesson.keywords || [])].join(" ").toLocaleLowerCase("vi-VN");
      return filterMatches && (!query || haystack.includes(query));
    });
    byId("lessonCountText").textContent = `Đang hiển thị ${lessons.length} bài học`;
    byId("clearSearchButton").hidden = !query;
    byId("emptyLessons").hidden = lessons.length !== 0;
    grid.hidden = lessons.length === 0;

    grid.innerHTML = lessons.map((lesson) => {
      const subject = getSubject(lesson.subject);
      const saved = state.savedLessons.includes(lesson.id);
      const done = state.completedLessons.includes(lesson.id);
      const label = lesson.id.startsWith("custom-") ? "GHI CHÚ CỦA BẠN" : subject.name.toLocaleUpperCase("vi-VN");
      return `
        <article class="lesson-card">
          <div class="lesson-card-top"><span class="lesson-subject-label">${escapeHtml(label)}</span><span class="lesson-time"><span aria-hidden="true">◷</span> ${escapeHtml(lesson.minutes || 10)} phút</span></div>
          <h3>${escapeHtml(lesson.title)}${done ? '<span class="lesson-complete-mark" title="Đã hoàn thành" aria-label="Đã hoàn thành">✓</span>' : ""}</h3>
          <p>${escapeHtml(lesson.subtitle || lesson.goal || "Ghi chú ôn tập ngắn.")}</p>
          <div class="lesson-card-bottom"><span class="lesson-category">${escapeHtml(lesson.category || subject.name)}${lesson.id.startsWith("custom-") ? " · Tự thêm" : ""}</span>
            <span class="lesson-card-actions">
              <button class="save-lesson-button" type="button" data-save-lesson="${escapeHtml(lesson.id)}" aria-pressed="${saved ? "true" : "false"}" aria-label="${saved ? "Bỏ lưu" : "Lưu bài"}: ${escapeHtml(lesson.title)}" title="${saved ? "Bỏ lưu" : "Lưu bài"}">${saved ? "♥" : "♡"}</button>
              <button class="open-lesson-button" type="button" data-open-lesson="${escapeHtml(lesson.id)}">Mở bài →</button>
            </span>
          </div>
        </article>`;
    }).join("");
  }

  function renderTests() {
    const grid = byId("testGrid");
    grid.innerHTML = DATA.tests.map((test) => {
      const subject = getSubject(test.subject);
      const best = state.bestScores[test.id];
      const bestLabel = best && best.display ? `Lần tốt nhất: ${escapeHtml(best.display)}` : "Chưa làm bài";
      const itemCount = test.kind === "essay" ? "Bài viết ngắn" : `${test.items.length} câu`;
      return `
        <article class="test-card">
          <div class="test-card-head"><span class="test-subject">${escapeHtml(subject.name)}</span><span class="test-time">◷ ${escapeHtml(test.duration)} phút</span></div>
          <h3>${escapeHtml(test.title)}</h3>
          <p>${escapeHtml(test.subtitle)}</p>
          <div class="test-card-bottom"><span class="test-best">${bestLabel} · ${escapeHtml(itemCount)}</span><button class="test-start-button" type="button" data-start-test="${escapeHtml(test.id)}">Bắt đầu →</button></div>
        </article>`;
    }).join("");
  }

  function renderSources() {
    byId("sourceList").innerHTML = DATA.sources.map((source) => `
      <a class="source-item" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">
        <span><strong>${escapeHtml(source.label)}</strong><small>${escapeHtml(source.detail)}</small></span><span class="source-external" aria-hidden="true">↗</span>
      </a>`).join("");
  }

  function renderAll() {
    renderSubjects();
    renderLessons();
    renderTests();
    renderSources();
    updateProgress();
  }

  function formatCommentTime(value) {
    try {
      return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
    } catch (_) {
      return "Vừa xong";
    }
  }

  function renderComments(lessonId) {
    const list = state.comments[lessonId] || [];
    const container = byId("commentList");
    const count = byId("commentCount");
    if (count) count.textContent = `${list.length} bình luận`;
    if (!list.length) {
      container.innerHTML = '<div class="comment-empty">Chưa có bình luận. Hãy để lại câu hỏi hoặc chia sẻ cách bạn hiểu bài nhé.</div>';
      return;
    }
    container.innerHTML = list.slice().reverse().map((comment) => `
      <article class="comment-item">
        <div class="comment-item-head"><strong>${escapeHtml(comment.name || "Khách")}</strong><time datetime="${escapeHtml(comment.createdAt || "")}">${escapeHtml(formatCommentTime(comment.createdAt))}</time></div>
        <p>${escapeHtml(comment.text || "")}</p>
      </article>`).join("");
  }

  function sectionHtml(section) {
    const bullets = Array.isArray(section.bullets) && section.bullets.length
      ? `<ul>${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : "";
    const example = section.example ? `
      <div class="example-box"><span class="example-label">Ví dụ minh họa</span><p>${escapeHtml(section.example)}</p>${section.solution ? `<p class="example-solution"><strong>Cách làm:</strong> ${escapeHtml(section.solution)}</p>` : ""}</div>` : "";
    const takeaway = section.takeaway ? `<div class="takeaway-box"><strong>Nhớ nhanh:</strong> ${escapeHtml(section.takeaway)}</div>` : "";
    return `<section class="lesson-section"><h3>${escapeHtml(section.heading || "Ghi nhớ")}</h3>${section.body ? `<p>${escapeHtml(section.body)}</p>` : ""}${bullets}${example}${takeaway}</section>`;
  }

  function openLesson(lessonId) {
    const lesson = getAllLessons().find((item) => item.id === lessonId);
    if (!lesson) return;
    activeLesson = lesson;
    const subject = getSubject(lesson.subject);
    const isSaved = state.savedLessons.includes(lesson.id);
    const isDone = state.completedLessons.includes(lesson.id);
    const lessonSections = Array.isArray(lesson.sections) ? lesson.sections.map(sectionHtml).join("") : "";
    const test = DATA.tests.find((item) => item.subject === lesson.subject);
    byId("lessonDialogKicker").textContent = `${subject.name.toLocaleUpperCase("vi-VN")} · ${lesson.category || "BÀI HỌC"}`;
    byId("lessonDialogTitle").textContent = lesson.title;
    byId("lessonDialogBody").innerHTML = `
      <div class="lesson-dialog-content">
        <div class="lesson-meta-strip"><span class="lesson-meta-pill">${escapeHtml(lesson.level || "Ôn tập")}</span><span class="lesson-meta-pill">${escapeHtml(lesson.minutes || 10)} phút đọc</span>${lesson.id.startsWith("custom-") ? '<span class="lesson-meta-pill">Tự thêm trên thiết bị</span>' : ""}</div>
        ${lesson.goal ? `<div class="lesson-goal"><strong>Mục tiêu bài học</strong>${escapeHtml(lesson.goal)}</div>` : ""}
        ${lesson.subtitle ? `<p class="dialog-lede">${escapeHtml(lesson.subtitle)}</p>` : ""}
        ${lessonSections}
        <div class="lesson-dialog-actions">
          <button class="button button-dark" type="button" data-mark-complete="${escapeHtml(lesson.id)}">${isDone ? "✓ Đã hoàn thành" : "Đánh dấu đã học"}</button>
          <button class="save-inline" type="button" data-toggle-save-lesson="${escapeHtml(lesson.id)}" aria-pressed="${isSaved ? "true" : "false"}">${isSaved ? "♥ Đã lưu" : "♡ Lưu để xem lại"}</button>
          ${test ? `<button class="button button-soft" type="button" data-practice-subject="${escapeHtml(lesson.subject)}">Làm bài luyện ${escapeHtml(subject.name)} →</button>` : ""}
        </div>
        <section class="comments-section" aria-labelledby="commentsTitle">
          <div class="comments-heading"><h3 id="commentsTitle">Bình luận về bài học</h3><span id="commentCount">0 bình luận</span></div>
          <p class="form-hint">Bình luận được lưu trên thiết bị này. Hãy góp ý lịch sự, rõ ý nhé.</p>
          <div class="comment-list" id="commentList"></div>
          <form class="comment-form" id="commentForm" data-comment-lesson="${escapeHtml(lesson.id)}">
            <label class="visually-hidden" for="commentInput">Viết bình luận</label>
            <textarea id="commentInput" name="comment" maxlength="800" placeholder="Bạn đang thắc mắc điều gì? Hoặc chia sẻ một mẹo làm bài…" required></textarea>
            <button type="submit">Đăng bình luận</button>
          </form>
        </section>
      </div>`;
    renderComments(lesson.id);
    byId("lessonDialog").showModal();
  }

  function toggleSaved(lessonId) {
    const index = state.savedLessons.indexOf(lessonId);
    if (index >= 0) {
      state.savedLessons.splice(index, 1);
      showToast("Đã bỏ lưu bài học.");
    } else {
      state.savedLessons.push(lessonId);
      showToast("Đã lưu bài để xem lại.");
    }
    persist();
    renderLessons();
    renderSubjects();
    if (activeLesson && activeLesson.id === lessonId) {
      const button = document.querySelector("[data-toggle-save-lesson]");
      if (button) {
        const saved = state.savedLessons.includes(lessonId);
        button.setAttribute("aria-pressed", String(saved));
        button.textContent = saved ? "♥ Đã lưu" : "♡ Lưu để xem lại";
      }
    }
  }

  function toggleComplete(lessonId) {
    const index = state.completedLessons.indexOf(lessonId);
    if (index >= 0) {
      state.completedLessons.splice(index, 1);
      showToast("Đã bỏ trạng thái hoàn thành.");
    } else {
      state.completedLessons.push(lessonId);
      showToast("Tốt lắm! Bài học đã được ghi nhận.");
    }
    persist();
    renderLessons();
    renderSubjects();
    updateProgress();
    if (activeLesson && activeLesson.id === lessonId) {
      const button = document.querySelector("[data-mark-complete]");
      if (button) button.textContent = state.completedLessons.includes(lessonId) ? "✓ Đã hoàn thành" : "Đánh dấu đã học";
    }
  }

  function submitComment(event) {
    const form = event.target.closest("#commentForm");
    if (!form) return false;
    event.preventDefault();
    const textInput = form.querySelector("textarea[name='comment']");
    const text = textInput.value.trim();
    if (!text) return true;
    const lessonId = form.dataset.commentLesson;
    if (!Array.isArray(state.comments[lessonId])) state.comments[lessonId] = [];
    state.comments[lessonId].push({
      name: state.profile && state.profile.name ? state.profile.name : "Khách",
      text,
      createdAt: new Date().toISOString()
    });
    persist();
    renderComments(lessonId);
    form.reset();
    showToast("Bình luận đã được lưu trên thiết bị này.");
    return true;
  }

  function openDialog(dialog) {
    if (dialog && !dialog.open) dialog.showModal();
  }

  function openProfileDialog() {
    updateProfileUI();
    openDialog(byId("profileDialog"));
  }

  function openAddLessonDialog() {
    byId("addLessonForm").reset();
    openDialog(byId("addLessonDialog"));
  }

  function normalizeAnswer(value) {
    return String(value ?? "").trim().toLocaleLowerCase("vi-VN").replace(/\s+/g, "").replace(/,/g, ".");
  }

  function formatTime(seconds) {
    const safe = Math.max(0, seconds);
    const minutes = Math.floor(safe / 60).toString().padStart(2, "0");
    const remainder = (safe % 60).toString().padStart(2, "0");
    return `${minutes}:${remainder}`;
  }

  function stopQuizTimer() {
    if (quizTimerInterval) clearInterval(quizTimerInterval);
    quizTimerInterval = null;
  }

  function startQuizClock() {
    stopQuizTimer();
    quizRemaining = activeTest.duration * 60;
    byId("quizTimer").textContent = formatTime(quizRemaining);
    quizTimerInterval = setInterval(() => {
      if (quizSubmitted) return;
      quizRemaining -= 1;
      byId("quizTimer").textContent = formatTime(quizRemaining);
      if (quizRemaining <= 0) {
        stopQuizTimer();
        showToast("Hết giờ — bài làm được nộp tự động.");
        finishQuiz(true);
      }
    }, 1000);
  }

  function optionLetters(options) {
    return options.map((_, index) => String.fromCharCode(65 + index));
  }

  function renderObjectiveQuestions(test) {
    return test.items.map((item, questionIndex) => {
      const number = questionIndex + 1;
      if (item.type === "mcq") {
        const choices = item.options.map((option, optionIndex) => `
          <label class="quiz-option"><input type="radio" name="q${questionIndex}" value="${optionIndex}" ${quizAnswers[questionIndex] === optionIndex ? "checked" : ""}><span><strong>${String.fromCharCode(65 + optionIndex)}.</strong> ${escapeHtml(option)}</span></label>`).join("");
        return `<article class="quiz-question" data-question="${questionIndex}"><h3><span class="quiz-question-number">${number}</span>${escapeHtml(item.prompt)}</h3><div class="quiz-options">${choices}</div></article>`;
      }
      if (item.type === "short") {
        const savedAnswer = quizAnswers[questionIndex] ?? "";
        return `<article class="quiz-question" data-question="${questionIndex}"><h3><span class="quiz-question-number">${number}</span>${escapeHtml(item.prompt)}</h3><input class="quiz-short-input" type="text" inputmode="decimal" autocomplete="off" data-short-answer="${questionIndex}" value="${escapeHtml(savedAnswer)}" placeholder="Nhập câu trả lời"></article>`;
      }
      if (item.type === "tf") {
        const values = Array.isArray(quizAnswers[questionIndex]) ? quizAnswers[questionIndex] : [];
        const rows = item.statements.map((statement, statementIndex) => `
          <div class="tf-row"><span>${escapeHtml(statement.text)}</span><span class="tf-controls">
            <button class="tf-button" type="button" data-tf-question="${questionIndex}" data-tf-statement="${statementIndex}" data-tf-value="true" aria-pressed="${values[statementIndex] === true ? "true" : "false"}">Đúng</button>
            <button class="tf-button" type="button" data-tf-question="${questionIndex}" data-tf-statement="${statementIndex}" data-tf-value="false" aria-pressed="${values[statementIndex] === false ? "true" : "false"}">Sai</button>
          </span></div>`).join("");
        return `<article class="quiz-question" data-question="${questionIndex}"><h3><span class="quiz-question-number">${number}</span>${escapeHtml(item.prompt)}</h3><div class="tf-list">${rows}</div></article>`;
      }
      return "";
    }).join("");
  }

  function renderEssayTest(test) {
    const draft = state.essayDrafts[test.id] || "";
    const passage = test.passage ? `<blockquote class="essay-passage">${escapeHtml(test.passage)}</blockquote>` : "";
    const rubric = test.rubric.map((row, index) => `
      <label class="rubric-row"><input type="checkbox" data-rubric-index="${index}"><span>${escapeHtml(row.label)}</span><b>${escapeHtml(row.points)} điểm</b></label>`).join("");
    const outline = test.sampleOutline.map((line) => `<li>${escapeHtml(line)}</li>`).join("");
    return `${passage}<p class="essay-task">${escapeHtml(test.prompt)}</p>
      <textarea id="essayAnswer" class="essay-answer" maxlength="5000" placeholder="Ghi bài làm của bạn tại đây…">${escapeHtml(draft)}</textarea>
      <div class="essay-count" id="essayWordCount">0 từ · mục tiêu 180–220 chữ</div>
      <p class="rubric-title">Tự kiểm tra sau khi viết: đánh dấu tiêu chí bạn đã làm được</p>
      <div class="rubric-list">${rubric}</div>
      <div class="essay-outline"><h4>Gợi ý triển khai ý (không phải bài văn mẫu)</h4><ol>${outline}</ol></div>
      <p class="essay-save-note">Bản nháp tự lưu trên trình duyệt này. Điểm là tự đánh giá, không thay cho chấm của giáo viên.</p>`;
  }

  function openTest(testId) {
    const test = DATA.tests.find((item) => item.id === testId);
    if (!test) return;
    activeTest = test;
    quizAnswers = {};
    quizSubmitted = false;
    const subject = getSubject(test.subject);
    byId("quizDialogKicker").textContent = `${subject.name.toLocaleUpperCase("vi-VN")} · ${test.kind === "essay" ? "TỰ LUYỆN VIẾT" : "ĐỀ MINI"}`;
    byId("quizDialogTitle").textContent = test.title;
    byId("quizIntro").innerHTML = `<p><strong>${escapeHtml(test.duration)} phút.</strong> ${test.kind === "essay" ? "Viết bài trước, rồi dùng phiếu tự kiểm tra." : "Chọn đáp án hoặc nhập câu trả lời. Sau khi nộp, bạn sẽ thấy đáp án và giải thích."} Đây là bài luyện tự biên soạn theo định hướng đề thi, không phải đề chính thức.</p>`;
    byId("quizQuestions").innerHTML = test.kind === "essay" ? renderEssayTest(test) : renderObjectiveQuestions(test);
    byId("quizResult").hidden = true;
    byId("quizResult").innerHTML = "";
    byId("quizFooter").hidden = false;
    byId("submitQuizButton").disabled = false;
    byId("submitQuizButton").textContent = test.kind === "essay" ? "Tự đánh giá bài viết →" : "Nộp bài →";
    byId("quizProgressText").textContent = test.kind === "essay" ? "Bản nháp tự lưu trên thiết bị này." : `${test.items.length} câu · Chọn câu trả lời rồi nộp bài.`;
    if (!byId("quizDialog").open) byId("quizDialog").showModal();
    startQuizClock();
    if (test.kind === "essay") updateEssayWordCount();
  }

  function updateQuizProgress() {
    if (!activeTest || activeTest.kind !== "quiz" || quizSubmitted) return;
    const answered = activeTest.items.reduce((count, item, index) => {
      if (item.type === "mcq") return count + (Number.isInteger(quizAnswers[index]) ? 1 : 0);
      if (item.type === "short") return count + (String(quizAnswers[index] || "").trim() ? 1 : 0);
      if (item.type === "tf") {
        const values = quizAnswers[index];
        const fullyAnswered = Array.isArray(values) && item.statements.every((_, statementIndex) => typeof values[statementIndex] === "boolean");
        return count + (fullyAnswered ? 1 : 0);
      }
      return count;
    }, 0);
    byId("quizProgressText").textContent = `Đã trả lời ${answered}/${activeTest.items.length} câu.`;
  }

  function checkQuestion(item, index) {
    const answer = quizAnswers[index];
    if (item.type === "mcq") return answer === item.answer;
    if (item.type === "short") return (item.answers || []).some((value) => normalizeAnswer(value) === normalizeAnswer(answer));
    if (item.type === "tf") {
      const selected = Array.isArray(answer) ? answer : [];
      return item.statements.every((statement, statementIndex) => selected[statementIndex] === statement.answer);
    }
    return false;
  }

  function getCorrectLabel(item) {
    if (item.type === "mcq") return `Đáp án: ${String.fromCharCode(65 + item.answer)}. ${item.options[item.answer]}`;
    if (item.type === "short") return `Đáp án gợi ý: ${(item.answers || []).join(" / ")}`;
    if (item.type === "tf") return `Đúng/Sai: ${item.statements.map((statement, index) => `${index + 1}. ${statement.answer ? "Đúng" : "Sai"}`).join(" · ")}`;
    return "";
  }

  function saveBestScore(testId, score, total, display) {
    const old = state.bestScores[testId];
    const percent = total ? Math.round((score / total) * 100) : 0;
    if (!old || percent >= (Number(old.percent) || 0)) {
      state.bestScores[testId] = { score, total, percent, display };
    }
    persist();
    renderTests();
  }

  function finishObjectiveTest(autoSubmitted = false) {
    if (!activeTest || quizSubmitted) return;
    quizSubmitted = true;
    stopQuizTimer();
    const total = activeTest.items.length;
    const correct = activeTest.items.reduce((sum, item, index) => sum + (checkQuestion(item, index) ? 1 : 0), 0);
    const percent = Math.round((correct / total) * 100);
    const message = percent >= 80 ? "Rất tốt — nhớ đọc lại giải thích để chắc kiến thức." : percent >= 50 ? "Bạn đang tiến bộ — xem kỹ những câu còn nhầm nhé." : "Không sao, mỗi câu sai là một chỗ để học thêm.";
    const explanations = activeTest.items.map((item, index) => {
      const okay = checkQuestion(item, index);
      const yourAnswer = quizAnswers[index];
      let userLabel = "Chưa trả lời";
      if (item.type === "mcq" && Number.isInteger(yourAnswer)) userLabel = `Bạn chọn ${String.fromCharCode(65 + yourAnswer)}. ${item.options[yourAnswer]}`;
      else if (item.type === "short" && String(yourAnswer || "").trim()) userLabel = `Bạn nhập: ${String(yourAnswer)}`;
      else if (item.type === "tf" && Array.isArray(yourAnswer) && yourAnswer.some((value) => typeof value === "boolean")) userLabel = `Bạn chọn: ${yourAnswer.map((value, i) => typeof value === "boolean" ? `${i + 1} ${value ? "Đúng" : "Sai"}` : `${i + 1} chưa chọn`).join(" · ")}`;
      return `<div class="result-explanation ${okay ? "is-correct" : "is-wrong"}"><strong>${okay ? "✓ Đúng" : "↻ Cần xem lại"} · Câu ${index + 1}</strong><span>${escapeHtml(userLabel)}</span><br><span>${escapeHtml(getCorrectLabel(item))}</span><br><span>${escapeHtml(item.explanation)}</span></div>`;
    }).join("");
    const result = byId("quizResult");
    result.innerHTML = `<div class="result-head"><span class="result-score">${correct}/${total} câu · ${percent}%</span><span class="result-message">${escapeHtml(message)}</span></div>${autoSubmitted ? '<p class="form-hint">Bài được nộp tự động khi hết giờ.</p>' : ""}${explanations}`;
    result.hidden = false;
    byId("submitQuizButton").textContent = "Làm lại bài ↻";
    byId("quizProgressText").textContent = `Kết quả: ${correct}/${total} câu đúng.`;
    byId("quizQuestions").querySelectorAll("input, button").forEach((control) => { control.disabled = true; });
    saveBestScore(activeTest.id, correct, total, `${correct}/${total} · ${percent}%`);
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function updateEssayWordCount() {
    const textarea = byId("essayAnswer");
    const count = byId("essayWordCount");
    if (!textarea || !count) return;
    const words = textarea.value.trim() ? textarea.value.trim().split(/\s+/).filter(Boolean).length : 0;
    count.textContent = `${words} từ · mục tiêu 180–220 chữ`;
  }

  function finishEssayTest() {
    if (!activeTest || quizSubmitted) return;
    quizSubmitted = true;
    stopQuizTimer();
    const checked = [...byId("quizQuestions").querySelectorAll("[data-rubric-index]:checked")];
    let score = 0;
    const breakdown = activeTest.rubric.map((item, index) => {
      const okay = checked.some((input) => Number(input.dataset.rubricIndex) === index);
      if (okay) score += Number(item.points) || 0;
      return `<div class="result-explanation ${okay ? "is-correct" : "is-wrong"}"><strong>${okay ? "✓ Đã tự đánh dấu đạt" : "○ Chưa đánh dấu"} · ${escapeHtml(item.points)} điểm</strong><span>${escapeHtml(item.label)}</span></div>`;
    }).join("");
    const answer = byId("essayAnswer");
    if (answer) state.essayDrafts[activeTest.id] = answer.value;
    persist();
    const words = answer && answer.value.trim() ? answer.value.trim().split(/\s+/).filter(Boolean).length : 0;
    const result = byId("quizResult");
    result.innerHTML = `<div class="result-head"><span class="result-score">${score}/10 điểm tự đánh giá</span><span class="result-message">${words} từ · Đọc lại từng tiêu chí trước khi chốt.</span></div><p class="form-hint">Đây là điểm tự kiểm tra, không phải điểm chấm chính thức. Nếu bỏ sót một tiêu chí, hãy sửa bài rồi làm lại.</p>${breakdown}<div class="essay-outline"><h4>Gợi ý triển khai ý</h4><ol>${activeTest.sampleOutline.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ol></div>`;
    result.hidden = false;
    byId("submitQuizButton").textContent = "Viết lại bài ↻";
    byId("quizProgressText").textContent = `Phiếu tự đánh giá: ${score}/10.`;
    byId("quizQuestions").querySelectorAll("input, textarea").forEach((control) => { control.disabled = true; });
    saveBestScore(activeTest.id, score, 10, `${score}/10 tự chấm`);
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function finishQuiz(autoSubmitted = false) {
    if (!activeTest) return;
    if (activeTest.kind === "essay") finishEssayTest();
    else finishObjectiveTest(autoSubmitted);
  }

  function handleQuizQuestionChange(event) {
    if (!activeTest || quizSubmitted) return;
    const target = event.target;
    if (target.matches("input[type='radio'][name^='q']")) {
      const index = Number(target.name.slice(1));
      quizAnswers[index] = Number(target.value);
      updateQuizProgress();
    } else if (target.matches("[data-short-answer]")) {
      quizAnswers[Number(target.dataset.shortAnswer)] = target.value;
      updateQuizProgress();
    } else if (target.id === "essayAnswer") {
      state.essayDrafts[activeTest.id] = target.value;
      persist();
      updateEssayWordCount();
    }
  }

  function handleQuizQuestionClick(event) {
    const tfButton = event.target.closest("[data-tf-question]");
    if (tfButton && !quizSubmitted) {
      const qIndex = Number(tfButton.dataset.tfQuestion);
      const statementIndex = Number(tfButton.dataset.tfStatement);
      const value = tfButton.dataset.tfValue === "true";
      if (!Array.isArray(quizAnswers[qIndex])) quizAnswers[qIndex] = [];
      quizAnswers[qIndex][statementIndex] = value;
      byId("quizQuestions").querySelectorAll(`[data-tf-question="${qIndex}"][data-tf-statement="${statementIndex}"]`).forEach((button) => {
        button.setAttribute("aria-pressed", String(button === tfButton));
      });
      updateQuizProgress();
    }
  }

  function startTestForSubject(subjectId) {
    const test = DATA.tests.find((item) => item.subject === subjectId);
    if (test) openTest(test.id);
    else showToast("Bài luyện cho môn này đang được cập nhật.");
  }

  function addCustomLesson(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const subject = String(formData.get("subject") || "math");
    const title = String(formData.get("title") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const body = String(formData.get("body") || "").trim();
    const example = String(formData.get("example") || "").trim();
    if (!title || !category || !body) return;
    const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const lesson = {
      id,
      subject,
      category,
      title,
      subtitle: "Ghi chú tự thêm của bạn.",
      minutes: 8,
      level: "Tự thêm",
      goal: "Ghi lại kiến thức bằng lời dễ hiểu để xem lại khi ôn tập.",
      sections: [
        { heading: "Ý chính cần nhớ", body },
        ...(example ? [{ heading: "Ví dụ hoặc lưu ý", example }] : [])
      ],
      keywords: [category, subject]
    };
    state.customLessons.push(lesson);
    persist();
    activeFilter = subject;
    byId("lessonSearch").value = "";
    renderAll();
    byId("addLessonDialog").close();
    form.reset();
    showToast("Đã thêm ghi chú trên thiết bị này.");
    setTimeout(() => byId("hoc-lieu").scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }

  function exportUserData() {
    const payload = {
      app: "on-nhe",
      version: 1,
      exportedAt: new Date().toISOString(),
      note: "Bản sao lưu có thể chứa ghi chú, bình luận và tiến độ trên thiết bị. Hãy cẩn thận khi chia sẻ tệp này.",
      customLessons: state.customLessons,
      savedLessons: state.savedLessons,
      completedLessons: state.completedLessons,
      bestScores: state.bestScores,
      comments: state.comments,
      essayDrafts: state.essayDrafts
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `on-nhe-sao-luu-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    showToast("Đã tải bản sao lưu JSON.");
  }

  function importUserData(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(String(reader.result || "{}"));
        if (imported.app && imported.app !== "on-nhe") throw new Error("Tệp này không phải bản sao lưu Ôn Nhẹ.");
        if (Array.isArray(imported.customLessons)) {
          const existing = new Set(state.customLessons.map((lesson) => lesson.id));
          imported.customLessons.forEach((lesson) => {
            if (lesson && lesson.id && lesson.title && lesson.subject && !existing.has(lesson.id)) state.customLessons.push(lesson);
          });
        }
        if (Array.isArray(imported.savedLessons)) state.savedLessons = [...new Set([...state.savedLessons, ...imported.savedLessons])];
        if (Array.isArray(imported.completedLessons)) state.completedLessons = [...new Set([...state.completedLessons, ...imported.completedLessons])];
        if (imported.bestScores && typeof imported.bestScores === "object") state.bestScores = { ...state.bestScores, ...imported.bestScores };
        if (imported.comments && typeof imported.comments === "object") {
          Object.entries(imported.comments).forEach(([lessonId, comments]) => {
            if (!Array.isArray(comments)) return;
            const prior = Array.isArray(state.comments[lessonId]) ? state.comments[lessonId] : [];
            state.comments[lessonId] = [...prior, ...comments];
          });
        }
        if (imported.essayDrafts && typeof imported.essayDrafts === "object") state.essayDrafts = { ...state.essayDrafts, ...imported.essayDrafts };
        persist();
        renderAll();
        byId("importDataInput").value = "";
        showToast("Đã nhập dữ liệu học tập.");
      } catch (error) {
        showToast(error.message || "Không đọc được tệp JSON này.");
      }
    };
    reader.onerror = () => showToast("Không đọc được tệp. Hãy thử lại.");
    reader.readAsText(file);
  }

  function openFeedback() {
    byId("feedbackRecipient").value = FEEDBACK_EMAIL;
    openDialog(byId("feedbackDialog"));
  }

  function sendFeedback(event) {
    event.preventDefault();
    const recipient = byId("feedbackRecipient").value.trim() || FEEDBACK_EMAIL;
    const sender = byId("feedbackSender").value.trim();
    const subject = byId("feedbackSubject").value;
    const message = byId("feedbackMessage").value.trim();
    if (!recipient || !message) {
      showToast("Hãy nhập email nhận góp ý và nội dung trước nhé.");
      return;
    }
    const body = `${message}${sender ? `\n\nEmail phản hồi: ${sender}` : ""}\n\nGửi từ website Ôn Nhẹ.`;
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(`[Ôn Nhẹ] ${subject}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    byId("feedbackDialog").close();
    showToast("Đã mở ứng dụng email. Kiểm tra lại nội dung rồi bấm gửi nhé.");
  }

  function toggleMobileMenu(forceClose = false) {
    const nav = byId("primaryNav");
    const button = byId("mobileMenuToggle");
    const open = forceClose ? false : !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
  }

  function updateFocusUI() {
    byId("focusTime").textContent = formatTime(focusRemaining);
    byId("focusStartButton").textContent = focusRemaining === 0 ? "Hoàn thành ✓" : focusRunning ? "Tạm dừng" : focusRemaining === FOCUS_SECONDS ? "Bắt đầu" : "Tiếp tục";
    byId("focusStartButton").disabled = focusRemaining === 0;
    byId("focusProgressBar").style.width = `${((FOCUS_SECONDS - focusRemaining) / FOCUS_SECONDS) * 100}%`;
  }

  function toggleFocusTimer() {
    if (focusRunning) {
      focusRunning = false;
      clearInterval(focusInterval);
      focusInterval = null;
      byId("focusMessage").textContent = "Đã tạm dừng. Tiếp tục khi bạn sẵn sàng.";
      updateFocusUI();
      return;
    }
    if (focusRemaining <= 0) return;
    focusRunning = true;
    byId("focusMessage").textContent = "Cứ tập trung vào một việc nhỏ trước nhé.";
    updateFocusUI();
    focusInterval = setInterval(() => {
      focusRemaining -= 1;
      if (focusRemaining <= 0) {
        focusRemaining = 0;
        focusRunning = false;
        clearInterval(focusInterval);
        focusInterval = null;
        byId("focusMessage").textContent = "Hoàn thành một phiên học! Nghỉ ngắn rồi tiếp tục nhé.";
        showToast("Bạn đã hoàn thành phiên tập trung 25 phút!");
      }
      updateFocusUI();
    }, 1000);
  }

  function resetFocusTimer() {
    focusRunning = false;
    clearInterval(focusInterval);
    focusInterval = null;
    focusRemaining = FOCUS_SECONDS;
    byId("focusMessage").textContent = "Sẵn sàng cho một lượt học nhẹ nhàng?";
    updateFocusUI();
  }

  function bindEvents() {
    byId("themeToggle").addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      applyTheme();
      persist();
    });

    byId("profileButton").addEventListener("click", openProfileDialog);
    byId("profileForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const name = byId("profileNameInput").value.trim();
      const email = byId("profileEmailInput").value.trim();
      if (!name) return;
      state.profile = { name, email };
      persist();
      updateProfileUI();
      byId("profileDialog").close();
      showToast(`Chào ${name}! Hồ sơ đã lưu trên thiết bị.`);
    });
    byId("guestModeButton").addEventListener("click", () => {
      state.profile = null;
      persist();
      updateProfileUI();
      byId("profileDialog").close();
      showToast("Bạn đang học với tư cách khách.");
    });

    byId("subjectGrid").addEventListener("click", (event) => {
      const button = event.target.closest("[data-select-subject]");
      if (!button) return;
      activeFilter = button.dataset.selectSubject;
      byId("lessonSearch").value = "";
      renderLessons();
      byId("hoc-lieu").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    byId("filterButtons").addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      activeFilter = button.dataset.filter;
      renderLessons();
    });
    byId("lessonSearch").addEventListener("input", renderLessons);
    byId("clearSearchButton").addEventListener("click", () => {
      byId("lessonSearch").value = "";
      renderLessons();
      byId("lessonSearch").focus();
    });
    byId("lessonGrid").addEventListener("click", (event) => {
      const openButton = event.target.closest("[data-open-lesson]");
      if (openButton) openLesson(openButton.dataset.openLesson);
      const saveButton = event.target.closest("[data-save-lesson]");
      if (saveButton) toggleSaved(saveButton.dataset.saveLesson);
    });

    byId("lessonDialogBody").addEventListener("click", (event) => {
      const completeButton = event.target.closest("[data-mark-complete]");
      if (completeButton) toggleComplete(completeButton.dataset.markComplete);
      const saveButton = event.target.closest("[data-toggle-save-lesson]");
      if (saveButton) toggleSaved(saveButton.dataset.toggleSaveLesson);
      const practiceButton = event.target.closest("[data-practice-subject]");
      if (practiceButton) {
        const subjectId = practiceButton.dataset.practiceSubject;
        byId("lessonDialog").close();
        setTimeout(() => startTestForSubject(subjectId), 100);
      }
    });
    byId("lessonDialogBody").addEventListener("submit", submitComment);

    byId("testGrid").addEventListener("click", (event) => {
      const button = event.target.closest("[data-start-test]");
      if (button) openTest(button.dataset.startTest);
    });
    byId("quizQuestions").addEventListener("change", handleQuizQuestionChange);
    byId("quizQuestions").addEventListener("input", handleQuizQuestionChange);
    byId("quizQuestions").addEventListener("click", handleQuizQuestionClick);
    byId("submitQuizButton").addEventListener("click", () => {
      if (!activeTest) return;
      if (quizSubmitted) {
        openTest(activeTest.id);
        return;
      }
      finishQuiz(false);
    });
    byId("quizDialog").addEventListener("close", stopQuizTimer);
    byId("quizDialog").addEventListener("click", (event) => {
      if (event.target === byId("quizDialog")) byId("quizDialog").close();
    });

    byId("addLessonButton").addEventListener("click", openAddLessonDialog);
    byId("addLessonForm").addEventListener("submit", addCustomLesson);
    byId("exportDataButton").addEventListener("click", exportUserData);
    byId("importDataButton").addEventListener("click", () => byId("importDataInput").click());
    byId("importDataInput").addEventListener("change", (event) => importUserData(event.target.files && event.target.files[0]));

    byId("feedbackButton").addEventListener("click", openFeedback);
    byId("footerFeedbackLink").addEventListener("click", (event) => {
      event.preventDefault();
      openFeedback();
    });
    byId("feedbackForm").addEventListener("submit", sendFeedback);

    byId("mobileMenuToggle").addEventListener("click", () => toggleMobileMenu());
    byId("primaryNav").addEventListener("click", (event) => {
      if (event.target.closest("a")) toggleMobileMenu(true);
    });
    document.querySelectorAll("[data-close-dialog]").forEach((button) => {
      button.addEventListener("click", () => button.closest("dialog").close());
    });
    document.querySelectorAll("dialog").forEach((dialog) => {
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
      });
    });

    byId("focusStartButton").addEventListener("click", toggleFocusTimer);
    byId("focusResetButton").addEventListener("click", resetFocusTimer);

    document.addEventListener("keydown", (event) => {
      if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey) {
        const target = event.target;
        if (target instanceof HTMLElement && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
        event.preventDefault();
        byId("lessonSearch").focus();
        byId("hoc-lieu").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  function init() {
    if (!DATA || !Array.isArray(DATA.lessons)) {
      document.body.innerHTML = "<main style='font-family:system-ui;padding:3rem'><h1>Không tải được học liệu</h1><p>Hãy kiểm tra file content.js đã nằm cùng thư mục với index.html chưa.</p></main>";
      return;
    }
    applyTheme();
    updateProfileUI();
    renderAll();
    bindEvents();
    byId("currentYear").textContent = String(new Date().getFullYear());
    if (FEEDBACK_EMAIL) byId("feedbackRecipient").value = FEEDBACK_EMAIL;
    updateFocusUI();
  }

  init();
})();
