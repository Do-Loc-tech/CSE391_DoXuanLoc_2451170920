// Main JavaScript for Portfolio Site

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio site loaded');

    // Add click event to contact button
    const contactBtn = document.querySelector('a[href^="mailto:"]');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            alert('Opening email client...');
        });
    }
});