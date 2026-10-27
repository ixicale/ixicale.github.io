// Experience dialogs: open with [data-modal-open="id"], close with
// [data-modal-close], the Escape key, or a click on the background.
// Sends "modal:open" and "modal:close" events on the modal element.
(function () {
  var root = document.documentElement;
  var lastTrigger = null;
  var FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function open(modal, trigger) {
    lastTrigger = trigger || null;
    modal.hidden = false;
    modal.classList.add("is-active");
    root.classList.add("is-clipped");
    var first = modal.querySelector("[data-modal-close]:not(.modal-background)");
    if (first) first.focus();
    modal.dispatchEvent(new CustomEvent("modal:open"));
  }

  function close(modal) {
    modal.classList.remove("is-active");
    modal.hidden = true;
    root.classList.remove("is-clipped");
    modal.dispatchEvent(new CustomEvent("modal:close"));
    if (lastTrigger) lastTrigger.focus();
    lastTrigger = null;
  }

  function activeModal() {
    return document.querySelector(".modal.is-active");
  }

  document.querySelectorAll("[data-modal-open]").forEach(function (trigger) {
    var modal = document.getElementById(trigger.dataset.modalOpen);
    if (!modal) return;
    trigger.addEventListener("click", function () { open(modal, trigger); });
  });

  document.querySelectorAll("[data-modal-close]").forEach(function (closer) {
    closer.addEventListener("click", function () { close(closer.closest(".modal")); });
  });

  document.addEventListener("keydown", function (event) {
    var modal = activeModal();
    if (!modal) return;

    if (event.key === "Escape") {
      close(modal);
      return;
    }

    // Keep keyboard focus inside the open dialog.
    if (event.key === "Tab") {
      var items = Array.prototype.slice.call(modal.querySelectorAll(FOCUSABLE));
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
