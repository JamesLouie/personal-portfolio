import { useEffect, useRef } from 'react';

const GradientMeshAnimation = () => {
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

    let time = 0;

    // Animation loop
    const animate = () => {
      time += 0.005; // Very slow animation

      // Create gradient mesh
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5 + Math.sin(time) * 100,
        canvas.height * 0.5 + Math.cos(time) * 100,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        Math.max(canvas.width, canvas.height) * 0.8
      );

      // Add gradient stops with your theme colors
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.03)'); // Green
      gradient.addColorStop(0.3, 'rgba(52, 211, 153, 0.02)'); // Lighter green
      gradient.addColorStop(0.7, 'rgba(110, 231, 183, 0.01)'); // Even lighter green
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Transparent

      // Fill canvas with gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle moving dots
      for (let i = 0; i < 3; i++) {
        const x = canvas.width * 0.5 + Math.sin(time * 0.5 + i) * canvas.width * 0.3;
        const y = canvas.height * 0.5 + Math.cos(time * 0.3 + i) * canvas.height * 0.3;
        
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${0.1 + 0.05 * Math.sin(time + i)})`;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
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

export default GradientMeshAnimation; 