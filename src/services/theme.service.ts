const THEME_EVENT = "theme-update";
const THEME_KEY = "clock-theme";

export const themeService = { getTheme, changeTheme, THEME_EVENT };

const root = document.querySelector(":root") as HTMLElement;

let theme = getTheme();
if (theme === "light") {
  setLightTheme();
} else {
  setDarkTheme();
}

function setLightTheme(): void {
  root.style.setProperty("--main-bg-color", "#fff");
  root.style.setProperty("--main-text-color", "#888888");
}

function setDarkTheme(): void {
  root.style.setProperty("--main-bg-color", "#1e1f26");
  root.style.setProperty("--main-text-color", "#ccc");
}


function getTheme(): string {
  const storedTheme = localStorage.getItem(THEME_KEY);
  return storedTheme ? storedTheme : "light";
}

function changeTheme(): void {
  if (theme === "light") {
    theme = "dark";
    setDarkTheme();
  } else {
    theme = "light";
    setLightTheme();
  }
  localStorage.setItem(THEME_KEY, theme);
  window.dispatchEvent(new CustomEvent(THEME_EVENT));
}
