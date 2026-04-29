document.addEventListener('DOMContentLoaded', () => {
    
    /* --- Sandwich Menu Logic --- */
    const menuBtn = document.getElementById('menu-btn');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-links a');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navOverlay.classList.toggle('open');

        if (navOverlay.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navOverlay.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    });

    /* --- Theme Toggle Logic --- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const logos = document.querySelectorAll('.logo-container img, .hero-logo');

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        logos.forEach(logo => logo.style.opacity = '0');

        setTimeout(() => {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }

            logos.forEach(logo => logo.style.opacity = '1');
        }, 200); 
    });

    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalBody = document.getElementById('modal-body');

    function openModal(title, desc, role = null) {
        modalTitle.textContent = title;
        modalBody.textContent = desc;
        
        if (role) {
            modalSubtitle.textContent = role;
            modalSubtitle.style.display = 'block';
        } else {
            modalSubtitle.style.display = 'none';
        }

        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }

    function closeModal() {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    closeModalBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    const projectBtn = document.getElementById('view-project-btn');
    if (projectBtn) {
        projectBtn.addEventListener('click', (e) => {
            const title = e.target.getAttribute('data-title');
            const desc = e.target.getAttribute('data-desc');
            openModal(title, desc);
        });
    }

    const teamCards = document.querySelectorAll('.interactive-card');
    teamCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const targetCard = e.target.closest('.interactive-card');
            const title = targetCard.getAttribute('data-title');
            const role = targetCard.getAttribute('data-role');
            const desc = targetCard.getAttribute('data-desc');
            
            openModal(title, desc, role);
        });
    });
});