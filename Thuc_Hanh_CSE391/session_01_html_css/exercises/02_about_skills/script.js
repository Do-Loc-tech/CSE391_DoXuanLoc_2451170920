const progressBars = document.querySelectorAll('.skill-progress');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const bar = entry.target;
        const value = bar.dataset.skill;
        bar.style.setProperty('--progress-width', `${value}%`);
        bar.classList.add('animate');
        observer.unobserve(bar);
    });
}, {
    threshold: 0.5,
});

progressBars.forEach((bar) => observer.observe(bar));
