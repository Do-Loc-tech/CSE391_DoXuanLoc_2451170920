const progressBars = document.querySelectorAll('.skill-progress');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const bar = entry.target;
    const targetValue = bar.dataset.value;
    bar.style.width = `${targetValue}%`;
    observer.unobserve(bar);
  });
}, {
  threshold: 0.35,
});

progressBars.forEach((bar) => observer.observe(bar));
