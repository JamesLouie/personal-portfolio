import { useState } from 'react';
import BackgroundAnimation from './BackgroundAnimation';
import GradientMeshAnimation from './GradientMeshAnimation';
import WaveAnimation from './WaveAnimation';
import RippleAnimation from './RippleAnimation';
import InteractiveRippleAnimation from './InteractiveRippleAnimation';

type AnimationType = 'particles' | 'gradient' | 'waves' | 'pulse' | 'floating' | 'ripple' | 'interactive-ripple' | 'none';

interface AnimatedBackgroundProps {
  type?: AnimationType;
  showControls?: boolean;
}

const AnimatedBackground = ({ type = 'particles', showControls = false }: AnimatedBackgroundProps) => {
  const [currentType, setCurrentType] = useState<AnimationType>(type);

  // CSS-based animations
  const renderCSSAnimations = () => {
    if (currentType === 'pulse') {
      return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
          <div className="background-pulse"></div>
          <div className="background-pulse"></div>
          <div className="background-pulse"></div>
        </div>
      );
    }

    if (currentType === 'floating') {
      return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
      );
    }

    return null;
  };

  // Canvas-based animations
  const renderCanvasAnimations = () => {
    switch (currentType) {
      case 'particles':
        return <BackgroundAnimation />;
      case 'gradient':
        return <GradientMeshAnimation />;
      case 'waves':
        return <WaveAnimation height={150} speed={0.01} amplitude={30} frequency={0.015} />;
      case 'ripple':
        return <RippleAnimation />;
      case 'interactive-ripple':
        return <InteractiveRippleAnimation />;
      default:
        return null;
    }
  };

  // Animation controls
  const renderControls = () => {
    if (!showControls) return null;

    const animations: { type: AnimationType; label: string }[] = [
      { type: 'particles', label: 'Floating Particles' },
      { type: 'gradient', label: 'Gradient Mesh' },
      { type: 'waves', label: 'Wave Effect' },
      { type: 'pulse', label: 'Pulse Rings' },
      { type: 'floating', label: 'Floating Dots' },
      { type: 'ripple', label: 'Ripple Effect' },
      { type: 'interactive-ripple', label: 'Interactive Ripple' },
      { type: 'none', label: 'None' },
    ];

    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid rgba(16, 185, 129, 0.3)',
      }}>
        <div style={{ color: '#10B981', fontSize: '12px', marginBottom: '8px' }}>
          Background Animation:
        </div>
        <select
          value={currentType}
          onChange={(e) => setCurrentType(e.target.value as AnimationType)}
          style={{
            background: '#000',
            color: '#fff',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '12px',
          }}
        >
          {animations.map(({ type, label }) => (
            <option key={type} value={type}>
              {label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <>
      {renderCanvasAnimations()}
      {renderCSSAnimations()}
      {renderControls()}
    </>
  );
};

export default AnimatedBackground; 