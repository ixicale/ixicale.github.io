// Mobile menu: open and close with the burger button.
(function () {
  document.querySelectorAll(".navbar-burger").forEach(function (burger) {
    var menu = document.getElementById(burger.dataset.target);
    if (!menu) return;

    function setOpen(open) {
      burger.classList.toggle("is-active", open);
      menu.classList.toggle("is-active", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    burger.addEventListener("click", function () {
      setOpen(!menu.classList.contains("is-active"));
    });

    // Close the menu after the user picks a link.
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });
  });
})();
