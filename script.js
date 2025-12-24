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

    if (projectPage) {
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
}
