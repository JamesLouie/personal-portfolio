import { useEffect, useRef } from 'react';

interface WaveAnimationProps {
  height?: number;
  speed?: number;
  amplitude?: number;
  frequency?: number;
}

const WaveAnimation = ({ 
  height = 100, 
  speed = 0.02, 
  amplitude = 20, 
  frequency = 0.02 
}: WaveAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;

    // Animation loop
    const animate = () => {
      time += speed;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw wave
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      // Create wave path
      for (let x = 0; x <= canvas.width; x += 2) {
        const y = canvas.height * 0.5 + 
                  Math.sin(x * frequency + time) * amplitude +
                  Math.sin(x * frequency * 0.5 + time * 0.7) * amplitude * 0.5;
        ctx.lineTo(x, y);
      }

      // Complete the path
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();

      // Create gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.1)');
      gradient.addColorStop(0.5, 'rgba(52, 211, 153, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fill();

      // Add subtle stroke
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [height, speed, amplitude, frequency]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: `${height}px`,
        pointerEvents: 'none',
      }}
    />
  );
};

export default WaveAnimation; 