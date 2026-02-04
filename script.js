document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.timeline-slider');

    // Restore timeline value from localStorage
    const savedYearIndex = localStorage.getItem('selectedYearIndex') || '0';

    sliders.forEach(slider => {
        // Initial set from storage
        slider.value = savedYearIndex;
        updateContent(slider.value);

        slider.addEventListener('input', (e) => {
            const val = e.target.value;
            // Sync all sliders on the page (if multiple)
            sliders.forEach(s => s.value = val);
            updateContent(val);
            // Save to localStorage
            localStorage.setItem('selectedYearIndex', val);
        });
    });

    function updateContent(value) {
        const years = ['1750', '1800', '1850', '1891'];
        const selectedYear = years[value];

        // Hide all year-specific content
        document.querySelectorAll('[data-year]').forEach(el => {
            el.style.display = 'none';
        });

        // Show content for the selected year
        document.querySelectorAll(`[data-year="${selectedYear}"]`).forEach(el => {
            el.style.display = 'block';

            // Update title based on the active block
            if (el.dataset.title) {
                const mainTitle = document.querySelector('h1');
                if (mainTitle) {
                    mainTitle.textContent = el.dataset.title;
                }
            }
        });
    }

    // Sidebar Toggle Logic
    const dropdowns = document.querySelectorAll('.nav-item.has-submenu');

    dropdowns.forEach(toggle => {
        const menuId = toggle.id;
        const submenu = toggle.nextElementSibling;
        const arrow = toggle.querySelector('.arrow');

        // Restore sidebar state
        if (menuId) {
            const isCollapsed = localStorage.getItem(`sidebar_${menuId}`) === 'true';

            if (submenu && submenu.classList.contains('submenu')) {
                if (isCollapsed) {
                    submenu.classList.add('collapsed');
                } else {
                    submenu.classList.remove('collapsed');
                }
            }
            if (arrow) {
                if (isCollapsed) {
                    arrow.classList.add('collapsed');
                } else {
                    arrow.classList.remove('collapsed');
                }
            }
        }

        toggle.addEventListener('click', () => {
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('collapsed');
                // Save state
                if (menuId) {
                    localStorage.setItem(`sidebar_${menuId}`, submenu.classList.contains('collapsed'));
                }
            }
            if (arrow) {
                arrow.classList.toggle('collapsed');
            }
        });
    });

    // Hash Highlighting Logic
    function highlightHash() {
        // Remove existing highlights
        document.querySelectorAll('.highlight-target').forEach(el => {
            el.classList.remove('highlight-target');
        });

        const hash = window.location.hash.substring(1); // Remove '#'
        if (hash) {
            const targetEl = document.getElementById(hash);
            if (targetEl) {
                // If the element is inside a hidden data-year block, we might need to show it
                // Check if it's visible, if not, try to switch year? 
                // For now, just styling and scrolling.
                targetEl.classList.add('highlight-target');

                // Add a small delay to ensure styles apply before scrolling, or if layout shifts
                setTimeout(() => {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }
    }

    // Handle initial load
    if (window.location.hash) {
        // Delay slightly to allow other scripts (like timeline) to settle
        setTimeout(highlightHash, 300);
    }

    // Handle navigation within page
    window.addEventListener('hashchange', highlightHash);
});

