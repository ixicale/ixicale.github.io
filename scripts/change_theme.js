$(function () {
  const d = new Date();
  const hrs = d.getHours();
  const isNight = hrs > 18 || hrs < 6; // between 6pm and 6am

  const qsHtml = document.querySelector("html");
  const elCurrentTheme = document.getElementById("currentTheme");
  const elSunTheme = document.getElementById("themeSun");
  const elMoonTheme = document.getElementById("themeMoon");

  const setDarkMode = () => {
    elMoonTheme.classList.add("is-selected");
    elSunTheme.classList.remove("is-selected");
    qsHtml.classList.add("theme-dark");
    elCurrentTheme.classList.remove("fa-sun");
    elCurrentTheme.classList.add("fa-moon");
  };
  const setLightMode = () => {
    elSunTheme.classList.add("is-selected");
    elMoonTheme.classList.remove("is-selected");
    qsHtml.classList.remove("theme-dark");
    elCurrentTheme.classList.remove("fa-moon");
    elCurrentTheme.classList.add("fa-sun");
  };

  if (isNight) {
    setDarkMode();
  } else {
    setLightMode();
  }

  elSunTheme.addEventListener("click", () => {
    setLightMode();
  });
  elMoonTheme.addEventListener("click", () => {
    setDarkMode();
  });
});
