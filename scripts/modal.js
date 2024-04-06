$(document).ready(function () {
  const qsHtml = document.querySelector("html");
  const modals = document.querySelectorAll(".modal");
  const triggers = document.querySelectorAll(".modal-open");
  const closers = document.querySelectorAll(
    ".modal-background, .modal-close, .modal-card-head a, .modal-card-foot .button"
  );

  function startTypingEffect($mdl) {
    let delay = 0;
    const projects = $mdl.querySelectorAll(".project");
    projects.forEach(($project) => {
      const effects = $project.querySelectorAll(".js-typing-effect");
      effects.forEach((effect) => {
        effect.style.animationDelay = `${delay}s`;
        // effect.style.witheSpace = "normal";
        delay += 0.5;
      });
    });
  }
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
    startTypingEffect($el);
    qsHtml.classList.add("is-clipped");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
    qsHtml.classList.remove("is-clipped");
  }

  function closeAllModals() {
    modals.forEach(($modal) => closeModal($modal));
  }

  // Add a click event on buttons to open a specific modal
  triggers.forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => openModal($target));
  });

  // Add a click event on various child elements to close the parent modal
  closers.forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => closeModal($target));
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
});
