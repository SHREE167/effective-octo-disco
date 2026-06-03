import React, { useMemo } from 'react';

const EmberParticles = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 20 : 60;

  const colors = ['#c8a96e', '#e8844a', '#d4cfc8', '#c8a96e', '#d4cfc8'];

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 1.5 + Math.random() * 2.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      baseOpacity: 0.3 + Math.random() * 0.5,
      duration: 8000 + Math.random() * 12000,
      delay: -(Math.random() * 15000),
      driftX: (Math.random() - 0.5) * 60,
      rotateEnd: (Math.random() - 0.5) * 360,
      isDiamond: Math.random() > 0.6,
      blur: Math.random() > 0.7,
    }));
  }, [count]);

  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: 4,
    contain: 'strict',
    overflow: 'hidden',
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes emberRise {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0) rotate(0deg) scale(0.8);
          }
          10% { opacity: var(--ember-opacity); }
          80% { opacity: var(--ember-opacity); }
          100% {
            opacity: 0;
            transform: translateY(-110vh) translateX(var(--ember-drift)) rotate(var(--ember-rotate)) scale(1.2);
          }
        }
      `}</style>
      {particles.map(p => (
        <div
          key={p.id}
          className="ember-particle"
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: `${p.x}vw`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
            borderRadius: p.isDiamond ? '1px' : '50%',
            transform: p.isDiamond ? 'rotate(45deg)' : 'none',
            '--ember-opacity': p.baseOpacity,
            '--ember-drift': `${p.driftX}px`,
            '--ember-rotate': `${p.rotateEnd}deg`,
            filter: p.blur ? 'blur(0.5px)' : 'none',
            animation: `emberRise ${p.duration}ms ease-in ${p.delay}ms infinite`,
            willChange: 'transform, opacity',
            transformOrigin: 'center center',
          }}
        />
      ))}
    </div>
  );
};

export default EmberParticles;
