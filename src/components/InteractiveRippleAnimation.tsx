import { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  maxRadius: number;
  speed: number;
  color: string;
  startTime: number;
}

const InteractiveRippleAnimation = () => {
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
    const createRipple = (x: number, y: number) => {
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.4; // 40% of screen size
      const speed = 2 + Math.random() * 3; // Random speed between 2-5
      const color = colors[Math.floor(Math.random() * colors.length)];

      ripples.push({
        x,
        y,
        radius: 0,
        opacity: 1,
        maxRadius,
        speed,
        color,
        startTime: Date.now()
      });
    };

    // Mouse click handler
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createRipple(x, y);
    };

    // Touch handler for mobile
    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      createRipple(x, y);
    };

    // Add event listeners
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleTouch, { passive: false });

    // Create initial ripples
    setTimeout(() => createRipple(canvas.width * 0.3, canvas.height * 0.3), 1000);
    setTimeout(() => createRipple(canvas.width * 0.7, canvas.height * 0.7), 3000);
    setTimeout(() => createRipple(canvas.width * 0.5, canvas.height * 0.5), 5000);

    // Animation loop
    const animate = () => {
      // Clear canvas with slight fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];

        // Update ripple
        ripple.radius += ripple.speed;
        ripple.opacity = Math.max(0, 1 - (ripple.radius / ripple.maxRadius));

        // Remove ripples that are too large or transparent
        if (ripple.radius > ripple.maxRadius || ripple.opacity <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        // Draw main ripple
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${ripple.color}${Math.floor(ripple.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw inner ripple for more complex effect
        if (ripple.radius > 30) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius - 30, 0, Math.PI * 2);
          ctx.strokeStyle = `${ripple.color}${Math.floor(ripple.opacity * 0.6 * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Draw outer ripple for wave effect
        if (ripple.radius > 60) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius - 60, 0, Math.PI * 2);
          ctx.strokeStyle = `${ripple.color}${Math.floor(ripple.opacity * 0.3 * 255).toString(16).padStart(2, '0')}`;
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
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouch);
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
        pointerEvents: 'auto', // Allow clicks
        zIndex: -1,
        cursor: 'pointer', // Show pointer cursor
      }}
    />
  );
};

export default InteractiveRippleAnimation; 