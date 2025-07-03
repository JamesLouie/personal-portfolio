import { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  maxRadius: number;
  speed: number;
  color: string;
}

const RippleAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const ripples: Ripple[] = [];
    const colors = ['#10B981', '#34D399', '#6EE7B7']; // Green theme colors

    // Function to create a new ripple
    const createRipple = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.3; // 30% of screen size
      const speed = 1 + Math.random() * 2; // Random speed between 1-3
      const color = colors[Math.floor(Math.random() * colors.length)];

      ripples.push({
        x,
        y,
        radius: 0,
        opacity: 0.8,
        maxRadius,
        speed,
        color
      });
    };

    // Create initial ripples
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createRipple(), i * 2000); // Stagger initial ripples
    }

    // Create new ripples periodically
    const rippleInterval = setInterval(() => {
      if (ripples.length < 5) { // Limit number of ripples
        createRipple();
      }
    }, 3000); // New ripple every 3 seconds

    // Animation loop
    const animate = () => {
      // Clear canvas with slight fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];

        // Update ripple
        ripple.radius += ripple.speed;
        ripple.opacity = 0.8 * (1 - ripple.radius / ripple.maxRadius);

        // Remove ripples that are too large or transparent
        if (ripple.radius > ripple.maxRadius || ripple.opacity <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        // Draw ripple
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${ripple.color}${Math.floor(ripple.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw inner ripple (for more complex effect)
        if (ripple.radius > 20) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius - 20, 0, Math.PI * 2);
          ctx.strokeStyle = `${ripple.color}${Math.floor(ripple.opacity * 0.5 * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(rippleInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    />
  );
};

export default RippleAnimation; 