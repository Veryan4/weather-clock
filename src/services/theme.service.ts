const THEME_EVENT = "theme-update";
const THEME_KEY = "clock-theme";

export const themeService = { getTheme, changeTheme, THEME_EVENT };

const root = document.querySelector(":root") as HTMLElement;

function setLightTheme(): void {
  root.style.setProperty("--main-bg-color", "#fff");
  root.style.setProperty("--main-text-color", "#888888");
  root.style.setProperty("--second-text-color", "black");
  root.style.setProperty("--clock-color", "black");
  root.style.setProperty("--accent-bg-color", "rgba(255, 255, 255, 0.2)");
}

function setDarkTheme(): void {
  root.style.setProperty("--main-bg-color", "#1e1f26");
  root.style.setProperty("--main-text-color", "#ccc");
  root.style.setProperty("--second-text-color", "white");
  root.style.setProperty("--clock-color", "#ccc");
  root.style.setProperty("--accent-bg-color", "unset");
}


function getTheme(): string {
  const storedTheme = localStorage.getItem(THEME_KEY);
  return storedTheme ? storedTheme : "light";
}

function changeTheme(theme: "light" | "dark"): void {
  if (theme === "light") {
    setLightTheme();
  } else {
    setDarkTheme();
  }
  localStorage.setItem(THEME_KEY, theme);
  window.dispatchEvent(new CustomEvent(THEME_EVENT));
}
