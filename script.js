document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.textContent = 'Sending...';
            btn.disabled = true;

            await new Promise(r => setTimeout(r, 800));

            form.innerHTML = '<p class="form-success">Message sent. I\'ll be in touch.</p>';
        });
    }
});
