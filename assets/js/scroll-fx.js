// Scroll effects for the page sections. Styles: _sass/components/_scroll-fx.scss.
// - "is-focus": the section crosses the middle of the screen (zoom on focus).
// - "is-in": the section came into view, so its items come in one by one.
// Nothing runs when the device asks for less motion.
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var sections = Array.prototype.slice.call(document.querySelectorAll(".site-section"));
  if (!sections.length) return;

  // Items that come in one by one, in page order inside each section.
  var itemSelector = [
    ".section-header",
    ".about-text > *",
    ".skills-grid > .panel-card",
    ".timeline-item",
    ".projects-grid > .panel-card",
    ".contact-card"
  ].join(", ");

  sections.forEach(function (section) {
    var items = section.querySelectorAll(itemSelector);
    items.forEach(function (item, i) {
      item.classList.add("fx-item");
      item.style.setProperty("--i", Math.min(i, 10));
      item.querySelectorAll(".tech-tag").forEach(function (tag, j) {
        tag.style.setProperty("--j", Math.min(j, 12));
      });
    });
  });

  // After the items are in, remove the effect classes, so hover effects
  // on cards and tags work at their normal speed again.
  function finish(section) {
    var items = section.querySelectorAll(".fx-item");
    var wait = 10 * 110 + 320 + 12 * 45 + 800;
    setTimeout(function () {
      items.forEach(function (item) {
        item.classList.remove("fx-item");
        item.style.removeProperty("--i");
        item.querySelectorAll(".tech-tag").forEach(function (tag) {
          tag.style.removeProperty("--j");
        });
      });
    }, wait);
  }

  var inObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      inObserver.unobserve(entry.target);
      finish(entry.target);
    });
  }, { threshold: 0.12 });

  var focusObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      entry.target.classList.toggle("is-focus", entry.isIntersecting);
    });
  }, { rootMargin: "-45% 0px -45% 0px" });

  document.documentElement.classList.add("fx-on");
  sections.forEach(function (section) {
    inObserver.observe(section);
    focusObserver.observe(section);
  });
})();
