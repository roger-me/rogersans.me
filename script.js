document.addEventListener('DOMContentLoaded', () => {
    // Contact Form
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formError = document.getElementById('formError');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();

            // Validation
            if (!name || !email || !message) {
                formError.textContent = 'Please fill in all fields';
                formError.classList.add('visible');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formError.textContent = 'Please enter a valid email';
                formError.classList.add('visible');
                return;
            }

            formError.classList.remove('visible');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Disable all inputs
            form.querySelectorAll('input, textarea').forEach(field => {
                field.disabled = true;
            });

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitBtn.innerHTML = '&#10003; Message sent, thank you!';
                    submitBtn.classList.add('submit-btn-success');
                    form.reset();
                } else {
                    throw new Error('Failed to send');
                }
            } catch (error) {
                formError.textContent = 'Failed to send. Please try again.';
                formError.classList.add('visible');
                submitBtn.textContent = 'Send';
                submitBtn.disabled = false;

                // Re-enable inputs on error
                form.querySelectorAll('input, textarea').forEach(field => {
                    field.disabled = false;
                });
            }
        });

        // Clear error on input
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', () => {
                formError.classList.remove('visible');
            });
        });
    }

    // Project Navigation
    const projectLinks = document.querySelectorAll('[data-project]');
    const pagesWrapper = document.querySelector('.pages-wrapper');

    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = link.dataset.project;
            openProject(projectId);
        });
    });
});

function openProject(projectId) {
    const pagesWrapper = document.querySelector('.pages-wrapper');
    const projectPage = document.getElementById(`${projectId}-page`);
    const projectLink = document.querySelector(`[data-project="${projectId}"]`);

    // If clicking on already active project, close it
    if (projectLink && projectLink.classList.contains('active')) {
        closeProject();
        return;
    }

    if (projectPage) {
        // Remove active from all links
        document.querySelectorAll('[data-project]').forEach(link => {
            link.classList.remove('active');
        });

        // Remove active from all project pages
        document.querySelectorAll('.page-project').forEach(page => {
            page.classList.remove('active');
        });

        // Add active to clicked link
        if (projectLink) {
            projectLink.classList.add('active');
        }

        // Add active to project page
        projectPage.classList.add('active');
        pagesWrapper.classList.add('show-project');

        // Scroll project page to top
        setTimeout(() => {
            projectPage.scrollTop = 0;
        }, 50);
    }
}

function closeProject() {
    const pagesWrapper = document.querySelector('.pages-wrapper');
    pagesWrapper.classList.remove('show-project');

    // Remove active from all links
    document.querySelectorAll('[data-project]').forEach(link => {
        link.classList.remove('active');
    });

    // Remove active from all project pages
    document.querySelectorAll('.page-project').forEach(page => {
        page.classList.remove('active');
    });
}

// Theme Switcher
function toggleThemeMenu() {
    const menu = document.getElementById('themeMenu');
    menu.classList.toggle('active');
}

function setTheme(theme) {
    if (theme === 'light') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme);
    updateActiveTheme(theme);
}

function updateActiveTheme(theme) {
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.theme === theme) {
            option.classList.add('active');
        }
    });
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Theme option click handlers
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            setTheme(option.dataset.theme);
            document.getElementById('themeMenu').classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const themeSwitcher = document.querySelector('.theme-switcher');
        if (themeSwitcher && !themeSwitcher.contains(e.target)) {
            document.getElementById('themeMenu').classList.remove('active');
        }
    });
});
