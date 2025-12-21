/**
 * Exact Canvas-Based Starfield Animation from React StarfieldLayout
 * Converted to vanilla JavaScript for static HTML
 */

function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const stars = [];
  const numStars = 200;
  const speed = 0.5;

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * width - width / 2,
      y: Math.random() * height - height / 2,
      z: Math.random() * width
    });
  }

  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';

    for (let star of stars) {
      star.z -= speed;
      if (star.z <= 0) {
        star.z = width;
        star.x = Math.random() * width - width / 2;
        star.y = Math.random() * height - height / 2;
      }

      const x = (star.x / star.z) * width / 2 + width / 2;
      const y = (star.y / star.z) * height / 2 + height / 2;
      const size = (1 - star.z / width) * 3;

      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    requestAnimationFrame(animate);
  };

  const handleResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', handleResize);
  requestAnimationFrame(animate);
}

// Initialize starfield when DOM is ready
document.addEventListener('DOMContentLoaded', initStarfield);
