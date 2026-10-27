// Typing effect for the rotating lines in the hero.
// The lines come from _data/content.yml (hero.rotating).
(function () {
  var el = document.querySelector("[data-typing]");
  if (!el) return;

  var lines;
  try { lines = JSON.parse(el.dataset.typing); } catch (e) { return; }
  if (!lines || lines.length < 2) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var index = 0;

  // With reduced motion, change the whole line every few seconds.
  if (reduceMotion) {
    setInterval(function () {
      index = (index + 1) % lines.length;
      el.textContent = lines[index];
    }, 4000);
    return;
  }

  var TYPE_MS = 60;
  var DELETE_MS = 30;
  var HOLD_MS = 1800;
  var text = lines[0];
  var deleting = true;

  function tick() {
    // Array.from keeps emoji as one character.
    var chars = Array.from(lines[index]);
    var shown = Array.from(text);

    if (deleting) {
      text = shown.slice(0, -1).join("");
      if (!text) {
        deleting = false;
        index = (index + 1) % lines.length;
      }
      el.textContent = text;
      return setTimeout(tick, DELETE_MS);
    }

    text = chars.slice(0, shown.length + 1).join("");
    el.textContent = text;
    if (text === lines[index]) {
      deleting = true;
      return setTimeout(tick, HOLD_MS);
    }
    setTimeout(tick, TYPE_MS);
  }

  setTimeout(tick, HOLD_MS);
})();
