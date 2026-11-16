const THEME_KEY = 'etikk-theme';

export function initTheme(win) {
  const { document } = win;
  const systemTheme = win.matchMedia?.('(prefers-color-scheme: dark)');
  let preference;
  try { preference = win.localStorage.getItem(THEME_KEY); } catch { /* Use the system theme when storage is unavailable. */ }
  if (preference !== 'dark' && preference !== 'light') preference = null;

  const isDark = () => document.documentElement.dataset.theme === 'dark';
  function syncButton() {
    const button = document.querySelector('[data-action="toggle-theme"]');
    if (!button) return;
    button.setAttribute('aria-pressed', String(isDark()));
    button.title = isDark() ? 'Bytt til lys modus' : 'Bytt til mørk modus';
  }
  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#171d19' : '#224c3d');
    syncButton();
  }
  apply(preference || (systemTheme?.matches ? 'dark' : 'light'));
  systemTheme?.addEventListener('change', event => {
    if (!preference) apply(event.matches ? 'dark' : 'light');
  });
  return {
    isDark,
    syncButton,
    toggle() {
      preference = isDark() ? 'light' : 'dark';
      try { win.localStorage.setItem(THEME_KEY, preference); } catch { /* Theme switching still works for this visit. */ }
      apply(preference);
    },
  };
}
