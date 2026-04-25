document.addEventListener('DOMContentLoaded', () => {
    const bars = document.querySelectorAll('.progress-bar');
    setTimeout(() => {
        bars.forEach(bar => {
            const val = bar.getAttribute('data-target');
            bar.style.width = val;
            bar.textContent = val;
        });
    }, 400);
});