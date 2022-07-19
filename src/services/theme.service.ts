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
  root.style.setProperty("---second-text-color", "black");
}

function setDarkTheme(): void {
  root.style.setProperty("--main-bg-color", "#1e1f26");
  root.style.setProperty("--main-text-color", "#ccc");
  root.style.setProperty("---second-text-color", "white");
}


function getTheme(): string {
  const storedTheme = localStorage.getItem(THEME_KEY);
  return storedTheme ? storedTheme : "light";
}

function changeTheme(newTheme?: "light" | "dark"): void {
  if(newTheme) {
    if (theme == newTheme) {
      return
    }
    theme = newTheme
    if (theme === "light") {
      theme = "light";
      setLightTheme();
    } else {
      theme = "dark";
      setDarkTheme();
      
    }
  } else {
    if (theme === "light") {
      theme = "dark";
      setDarkTheme();
    } else {
      theme = "light";
      setLightTheme();
    }
  }
  localStorage.setItem(THEME_KEY, theme);
  window.dispatchEvent(new CustomEvent(THEME_EVENT));
}
