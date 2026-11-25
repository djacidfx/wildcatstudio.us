// Use the same persistent theme preference as the studio homepage.
(() => {
  const button = document.getElementById('px-theme');
  if (!button) return;
  const root = document.documentElement;
  function syncLabel() {
    const light = root.dataset.theme === 'light';
    const label = light ? 'Switch to dark theme' : 'Switch to light theme';
    button.setAttribute('aria-label', label);
    button.title = label;
  }
  button.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    if (next === 'light') root.dataset.theme = 'light';
    else delete root.dataset.theme;
    try { localStorage.setItem('wildcat_theme', next); } catch (_) {}
    syncLabel();
  });
  syncLabel();
  button.hidden = false;
})();
