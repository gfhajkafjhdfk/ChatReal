window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('termsPage').style.display = 'block';
      }, 3000);
    });

// フェードイン関係
    const featureItems = document.querySelectorAll('.feature-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, {
    threshold: 0.1
  });

  featureItems.forEach(item => {
    observer.observe(item);
  });
    
