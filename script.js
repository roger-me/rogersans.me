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
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: '45303619-810e-47a7-b3c5-6de49193da18',
                        subject: 'New message from portfolio',
                        name: name,
                        email: email,
                        message: message
                    })
                });

                const data = await response.json();

                if (data.success) {
                    submitBtn.innerHTML = '&#10003; Message sent, thank you!';
                    submitBtn.classList.add('submit-btn-success');
                    form.reset();
                } else {
                    throw new Error(data.message || 'Failed to send');
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
            // On mobile (< 900px), let the link work normally
            if (window.innerWidth <= 900) {
                return; // Don't prevent default, go to the page
            }
            e.preventDefault();
            const projectId = link.dataset.project;
            openProject(projectId);
        });
    });
});

function openProject(projectId, updateHistory = true) {
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

        // Update URL
        if (updateHistory) {
            history.pushState({ project: projectId }, '', `/${projectId}`);
        }

        // Scroll project page to top
        setTimeout(() => {
            projectPage.scrollTop = 0;
        }, 50);
    }
}

function closeProject(updateHistory = true) {
    const pagesWrapper = document.querySelector('.pages-wrapper');
    pagesWrapper.classList.remove('show-project');

    // Remove active from all links
    document.querySelectorAll('[data-project]').forEach(link => {
        link.classList.remove('active');
    });

    // Update URL
    if (updateHistory) {
        history.pushState({}, '', '/');
    }

    // Remove active from all project pages
    document.querySelectorAll('.page-project').forEach(page => {
        page.classList.remove('active');
    });
}

// Handle URL on page load
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.replace('/', '');
    if (path && document.getElementById(`${path}-page`)) {
        openProject(path, false);
    }
});

// Handle browser back/forward
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.project) {
        openProject(e.state.project, false);
    } else {
        closeProject(false);
    }
});
