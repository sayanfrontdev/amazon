/* ====================================
   AMAZON CLONE — THEME TOGGLE (Dark / Light)
   ==================================== */

(function () {
  'use strict';

  let currentTheme = localStorage.getItem('amazon_theme') || 'light';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('amazon_theme', theme);
    currentTheme = theme;
    updateToggleUI();
  }

  function updateToggleUI() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    btn.setAttribute('aria-label', currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('title', currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    // The CSS handles the visual indicator via data-theme attribute
  }

  function toggleTheme() {
    const next = currentTheme === 'light' ? 'dark' : 'light';
    // Trigger page transition animation
    document.documentElement.classList.add('theme-transitioning');
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 500);
    applyTheme(next);
  }

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    updateToggleUI();
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.addEventListener('click', toggleTheme);
  });

  // Expose globally for any inline calls
  window.toggleTheme = toggleTheme;
})();
