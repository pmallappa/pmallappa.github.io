// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
  const themeToggleBtn = document.getElementById('theme-toggle');

  if (!themeToggleBtn || !themeToggleDarkIcon || !themeToggleLightIcon) {
    console.error('Theme toggle elements not found');
    return;
  }

  // Get theme from localStorage or default to light
  function getTheme() {
    if (localStorage.getItem('color-theme')) {
      return localStorage.getItem('color-theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Set theme
  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      themeToggleLightIcon.classList.remove('hidden');
      themeToggleDarkIcon.classList.add('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      themeToggleLightIcon.classList.add('hidden');
      themeToggleDarkIcon.classList.remove('hidden');
    }
    localStorage.setItem('color-theme', theme);
  }

  // Initialize theme on page load
  const currentTheme = getTheme();
  setTheme(currentTheme);

  // Toggle theme on button click
  themeToggleBtn.addEventListener('click', function() {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
});
