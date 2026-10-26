// Light / dark theme switch.
// The first theme is set in _includes/head.html, before the page draws.
(function () {
  var root = document.documentElement;
  var STORAGE_KEY = "theme"; // Values: "theme-dark" or "theme-light".

  function current() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var next = theme === "dark" ? "light" : "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.setAttribute("aria-label", "Switch to " + next + " theme");
      button.setAttribute("aria-pressed", String(theme === "dark"));
    });
  }

  apply(current());

  document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      var theme = current() === "dark" ? "light" : "dark";
      apply(theme);
      try { localStorage.setItem(STORAGE_KEY, "theme-" + theme); } catch (e) {}
    });
  });
})();
