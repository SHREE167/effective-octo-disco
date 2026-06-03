import React, { useMemo } from 'react';

const StarField = () => {
  const { stars, cluster } = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 60 : 180;

    const stars = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: 0.5 + Math.random() * 1.5,
      baseOpacity: 0.1 + Math.random() * 0.5,
      twinkleDuration: 3000 + Math.random() * 6000,
      twinkleDelay: -(Math.random() * 6000),
    }));

    const cluster = Array.from({ length: 12 }).map((_, i) => ({
      id: i + count,
      x: 70 + (Math.random() - 0.5) * 8,
      y: 12 + (Math.random() - 0.5) * 8,
      size: 0.5 + Math.random() * 1,
      baseOpacity: 0.1 + Math.random() * 0.3,
      twinkleDuration: 4000 + Math.random() * 5000,
      twinkleDelay: -(Math.random() * 5000),
      isBlue: true,
    }));

    return { stars, cluster };
  }, []);

  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: 1,
    maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 80%)',
    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 80%)',
    contain: 'strict',
  };

  const allStars = [...stars, ...cluster];

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: var(--star-opacity-min); }
          50%       { opacity: var(--star-opacity-max); }
        }
      `}</style>
      {allStars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            position: 'absolute',
            left: `${star.x}vw`,
            top: `${star.y}vh`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            background: star.isBlue ? '#a0b8d0' : '#c8c4ba',
            '--star-opacity-min': star.baseOpacity * 0.2,
            '--star-opacity-max': star.baseOpacity,
            animation: `twinkle ${star.twinkleDuration}ms ease-in-out ${star.twinkleDelay}ms infinite`,
            willChange: 'opacity',
            transform: 'translateZ(0)',
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
