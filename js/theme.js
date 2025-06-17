// Dark Mode Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    
    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a small animation effect to both toggles
        if (themeToggle) {
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        }
        
        if (mobileThemeToggle) {
            mobileThemeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                mobileThemeToggle.style.transform = 'scale(1)';
            }, 150);
        }
    }
    
    // Add click event listeners to both toggles
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        
        // Add keyboard support (Space and Enter keys)
        themeToggle.addEventListener('keydown', function(e) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleTheme();
            }
        });
        
        // Make the toggle focusable for accessibility
        themeToggle.setAttribute('tabindex', '0');
        themeToggle.setAttribute('role', 'button');
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
        
        // Add keyboard support (Space and Enter keys)
        mobileThemeToggle.addEventListener('keydown', function(e) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleTheme();
            }
        });
        
        // Make the toggle focusable for accessibility
        mobileThemeToggle.setAttribute('tabindex', '0');
        mobileThemeToggle.setAttribute('role', 'button');
        mobileThemeToggle.setAttribute('aria-label', 'Toggle dark mode');
    }
}); 