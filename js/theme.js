/**
 * ZYRANA Luxury Perfume Brand
 * Theme Toggle Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    initializeThemeToggle();
});

/**
 * Initialize theme toggle functionality with localStorage persistence
 */
function initializeThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const storedTheme = localStorage.getItem('zyrana-theme');
    
    // Set initial theme based on localStorage or system preference
    if (storedTheme) {
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(storedTheme);
    } else {
        // Check for system preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkScheme) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('zyrana-theme', 'dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('zyrana-theme', 'light-theme');
        }
    }
    
    // Add click event to toggle theme
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            if (body.classList.contains('light-theme')) {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                localStorage.setItem('zyrana-theme', 'dark-theme');
            } else {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                localStorage.setItem('zyrana-theme', 'light-theme');
            }
        });
    }
    
    // Update theme buttons or UI to match current theme
    updateThemeUI();
}

/**
 * Update UI elements to match current theme
 */
function updateThemeUI() {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    // Update logo gradient colors
    const gradientStartElements = document.querySelectorAll('.gradient-start-color');
    const gradientEndElements = document.querySelectorAll('.gradient-end-color');
    
    gradientStartElements.forEach(element => {
        if (isDarkTheme) {
            element.setAttribute('stop-color', 'var(--color-emerald-light)');
        } else {
            element.setAttribute('stop-color', 'var(--color-emerald)');
        }
    });
    
    gradientEndElements.forEach(element => {
        element.setAttribute('stop-color', 'var(--color-gold)');
    });
}

/**
 * Listen for system theme changes
 */
const systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
systemThemeMediaQuery.addEventListener('change', e => {
    const storedTheme = localStorage.getItem('zyrana-theme');
    
    // Only auto-switch if user hasn't manually selected a theme
    if (!storedTheme) {
        if (e.matches) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        }
        
        updateThemeUI();
    }
});
