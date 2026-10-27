// Real-time typing for the experience dialogs.
//
// How it works:
// - Each [data-type] element keeps its full text in the layout. The part
//   that is not typed yet is invisible (visibility: hidden). Long sentences
//   wrap in their final place from the start, so the text does not jump.
// - Projects type one after the other. When a project is done, its
//   technology tags fade in ([data-type-reveal]).
// - "Show all", a click on the text, or reduced-motion settings show
//   everything at once.
(function () {
  var CHAR_MS = 22; // Time for one character.
  var MAX_TEXT_MS = 1600; // Long texts type faster, to stay below this time.
  var PAUSE_MS = 180; // Pause between texts.

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Split a string into characters. Keeps emoji as one character.
  function chars(text) {
    return Array.from(text);
  }

  // Build the spans once: screen-reader text, typed part, caret, rest.
  function prepare(el) {
    if (el.typing) return el.typing;
    var text = el.textContent.trim().replace(/\s+/g, " ");
    el.textContent = "";

    var sr = document.createElement("span");
    sr.className = "typing-sr";
    sr.textContent = text;

    var visual = document.createElement("span");
    visual.setAttribute("aria-hidden", "true");
    var done = document.createElement("span");
    var caret = document.createElement("span");
    caret.className = "typing-caret";
    var rest = document.createElement("span");
    rest.className = "typing-rest";
    visual.append(done, caret, rest);

    el.append(sr, visual);
    el.typing = { chars: chars(text), done: done, caret: caret, rest: rest };
    return el.typing;
  }

  // Show the first "count" characters. Hide the caret when "caret" is false.
  function show(el, count, caret) {
    var t = prepare(el);
    t.done.textContent = t.chars.slice(0, count).join("");
    t.rest.textContent = t.chars.slice(count).join("");
    t.caret.hidden = !caret;
  }

  function setup(body) {
    var modal = body.closest(".modal");
    var items = Array.prototype.slice.call(body.querySelectorAll("[data-typing-item]"));
    var skip = modal.querySelector("[data-typing-skip]");
    var timer = null;
    var userScrolled = false;

    function stop() {
      clearTimeout(timer);
      timer = null;
    }

    function finishAll() {
      stop();
      items.forEach(function (item) {
        item.classList.remove("is-pending", "is-typing");
        item.querySelectorAll("[data-type]").forEach(function (el) {
          show(el, Infinity, false);
        });
      });
      if (skip) skip.hidden = true;
    }

    function reset() {
      items.forEach(function (item) {
        item.classList.add("is-pending");
        item.classList.remove("is-typing");
        item.querySelectorAll("[data-type]").forEach(function (el) {
          show(el, 0, false);
        });
      });
      if (skip) skip.hidden = false;
    }

    // Keep the project that types in view, until the user scrolls.
    function follow(item) {
      if (userScrolled) return;
      var top = item.offsetTop - body.offsetTop;
      var bottom = top + item.offsetHeight;
      if (bottom > body.scrollTop + body.clientHeight) {
        body.scrollTo({ top: bottom - body.clientHeight + 16, behavior: "smooth" });
      }
    }

    // Type the text of each project, in order.
    function run() {
      var queue = [];
      items.forEach(function (item) {
        item.querySelectorAll("[data-type]").forEach(function (el) {
          queue.push({ item: item, el: el });
        });
      });

      var index = 0;
      var count = 0;

      function step() {
        var job = queue[index];
        if (!job) {
          finishAll();
          return;
        }

        var item = job.item;
        if (!item.classList.contains("is-typing")) {
          item.classList.remove("is-pending");
          item.classList.add("is-typing");
          follow(item);
        }

        var total = prepare(job.el).chars.length;
        var delay = Math.min(CHAR_MS, MAX_TEXT_MS / Math.max(total, 1));
        count += 1;
        show(job.el, count, true);

        if (count < total) {
          timer = setTimeout(step, delay);
          return;
        }

        // This text is done. Go to the next one.
        show(job.el, total, false);
        index += 1;
        count = 0;
        var next = queue[index];
        if (!next || next.item !== item) {
          item.classList.remove("is-typing"); // Shows the tags.
          follow(item);
        }
        timer = setTimeout(step, PAUSE_MS);
      }

      timer = setTimeout(step, 250); // Wait for the dialog animation.
    }

    modal.addEventListener("modal:open", function () {
      stop();
      userScrolled = false;
      body.scrollTop = 0;
      if (reduceMotion.matches) {
        finishAll();
        return;
      }
      reset();
      run();
    });

    modal.addEventListener("modal:close", stop);

    if (skip) skip.addEventListener("click", finishAll);
    body.addEventListener("click", function () {
      if (timer) finishAll();
    });
    ["wheel", "touchmove"].forEach(function (name) {
      body.addEventListener(name, function () { userScrolled = true; }, { passive: true });
    });
  }

  document.querySelectorAll("[data-typing-dialog]").forEach(setup);
})();
