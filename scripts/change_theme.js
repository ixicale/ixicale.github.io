$(function () {
  const d = new Date();
  const hrs = d.getHours();
  const isNight = hrs > 18 || hrs < 6; // between 6pm and 6am
  const qsHTML = document.querySelector("html");
  const qsToggle = document.querySelector(".theme-toggle");
  const themeD = "theme-dark";
  const themeL = "theme-light";
  const stgTheme = localStorage.getItem("theme");
  let theme = stgTheme || (isNight ? themeD : themeL);
  if (theme === themeD) {
    qsToggle.classList.toggle("dark");
  } else {
    qsHTML.classList.add(themeL);
  }

  qsToggle.addEventListener("click", function () {
    this.classList.toggle("dark");
    let new_theme = themeD;
    if (qsToggle.classList.contains("dark")) {
      // Apply the dark theme
      qsHTML.classList.add(themeD);
      qsHTML.classList.remove(themeL);
    } else {
      // Apply the light theme
      qsHTML.classList.add(themeL);
      qsHTML.classList.remove(themeD);
      new_theme = themeL;
    }
    localStorage.setItem("theme", new_theme);
  });
});
