// Apply the saved theme before the page is painted.
(() => {
  const themeFromUrl = new URLSearchParams(window.location.search).get("theme");
  const savedTheme = localStorage.getItem("matthewliu-theme");
  const preferredTheme = window.matchMedia("(prefers-color-scheme: light)")
    .matches
    ? "light"
    : "dark";

  document.documentElement.dataset.theme =
    themeFromUrl === "light" || themeFromUrl === "dark"
      ? themeFromUrl
      : savedTheme || preferredTheme;
})();
