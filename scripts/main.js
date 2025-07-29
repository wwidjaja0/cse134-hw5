document.addEventListener('DOMContentLoaded', function () {
    initTheme();
});

function initTheme() {
    const root = document.documentElement;
    const colorScheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme: use localStorage if it exists, otherwise use system preference
    let currentTheme;
    if (colorScheme) {
        currentTheme = colorScheme;
    } else {
        currentTheme = prefersDark ? 'dark' : 'light';
    }

    root.setAttribute('data-theme', currentTheme);

    /**
     * Gets the value of a CSS custom property.
     * @param {string} property The name of the CSS custom property.
     * @returns {string} The value of the CSS custom property.
     */
    function getCustomStyle(property) {
        return getComputedStyle(root).getPropertyValue(property).trim();
    }

    backgroundColor = getCustomStyle('--background-color');
    textColor = getCustomStyle('--text-color');
    primaryColor = getCustomStyle('--primary-color');
    accentColor = getCustomStyle('--accent-color');

    const themeToggleBtn = document.querySelector('[data-theme-toggle]');
    if (themeToggleBtn) {
        themeToggleBtn.hidden = false;

        // Set initial icon based on current theme
        if (currentTheme === 'dark') {
            themeToggleBtn.querySelector('img').src = 'assets/icons/sun.svg';
        } else {
            themeToggleBtn.querySelector('img').src = 'assets/icons/moon.svg';
        }

        themeToggleBtn.addEventListener('click', () => {
            const theme = root.getAttribute('data-theme');
            if (theme === 'dark') {
                root.setAttribute('data-theme', 'light');
                themeToggleBtn.querySelector('img').src = 'assets/icons/moon.svg';
                localStorage.setItem('theme', 'light');
            } else {
                root.setAttribute('data-theme', 'dark');
                themeToggleBtn.querySelector('img').src = 'assets/icons/sun.svg';
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}
