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
});

