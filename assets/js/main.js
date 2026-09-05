const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".site-menu");

function setTheme(theme, persist = false) {
  root.dataset.theme = theme;
  if (themeIcon) themeIcon.textContent = theme === "dark" ? "☾" : "☀";
  if (themeButton)
    themeButton.setAttribute(
      "aria-label",
      `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
    );
  if (persist) localStorage.setItem("matthewliu-theme", theme);
}

const themeFromUrl = new URLSearchParams(window.location.search).get("theme");
const storedTheme = localStorage.getItem("matthewliu-theme");
const systemTheme = matchMedia("(prefers-color-scheme: light)").matches
  ? "light"
  : "dark";
setTheme(
  themeFromUrl === "light" || themeFromUrl === "dark"
    ? themeFromUrl
    : storedTheme || systemTheme,
  Boolean(themeFromUrl),
);

themeButton?.addEventListener("click", () =>
  setTheme(root.dataset.theme === "dark" ? "light" : "dark", true),
);

// Browsers do not consistently share localStorage between local file:// pages.
// Carry the selected theme through local links while the site is being tested
// from the filesystem. This is unnecessary—and therefore omitted—in production.
if (window.location.protocol === "file:") {
  document.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", () => {
      const destination = new URL(link.href, window.location.href);

      if (destination.protocol === "file:") {
        destination.searchParams.set("theme", root.dataset.theme);
        link.href = destination.href;
      }
    });
  });
}

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.querySelector(".sr-only").textContent = open
    ? "Open navigation"
    : "Close navigation";
  menu.classList.toggle("open", !open);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu?.classList.contains("open")) {
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.focus();
  }
});
