// quiz.js — reusable retrieval-practice widget.
//
// Markup contract:
//   <div class="quiz">
//     <p class="question">…</p>
//     <ul class="quiz-options">
//       <li><button class="quiz-option" data-correct>Right answer</button>
//           <p class="quiz-feedback">Why it is right.</p></li>
//       <li><button class="quiz-option">Wrong answer</button>
//           <p class="quiz-feedback">Why it is wrong.</p></li>
//     </ul>
//     <button class="quiz-retry">Try again</button>
//   </div>
//
// Feedback is immediate: click an option, all options lock, the chosen one and
// the correct one are highlighted with their explanations. "Try again" resets.

function initQuiz(quiz) {
  const options = quiz.querySelectorAll(".quiz-option");
  const retry = quiz.querySelector(".quiz-retry");

  function answer(chosen) {
    quiz.classList.add("answered");
    for (const opt of options) {
      opt.disabled = true;
      if (opt.hasAttribute("data-correct")) {
        opt.classList.add("correct");
      } else if (opt === chosen) {
        opt.classList.add("incorrect");
      }
    }
    if (retry) retry.focus();
  }

  function reset() {
    quiz.classList.remove("answered");
    for (const opt of options) {
      opt.disabled = false;
      opt.classList.remove("correct", "incorrect");
    }
    if (options.length) options[0].focus();
  }

  for (const opt of options) {
    opt.addEventListener("click", () => answer(opt));
  }
  if (retry) retry.addEventListener("click", reset);
}

document.querySelectorAll(".quiz").forEach(initQuiz);
