import React from 'react';

const MoonRays = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: 2,
    contain: 'strict',
  };

  // System A — 3 broad rays originating from top-right
  const broadRays = [
    { rotate: -25, duration: 18000, delay: 0,       width: '70vw'  },
    { rotate: -40, duration: 24000, delay: -8000,   width: '100vw' },
    { rotate: -55, duration: 31000, delay: -15000,  width: '120vw' },
  ];

  // System B — 6 sharp narrow shafts (disabled on mobile)
  const sharpRays = [
    { rotate: -20, duration: 42000, delay: 0,       },
    { rotate: -32, duration: 50000, delay: -12000,  },
    { rotate: -44, duration: 58000, delay: -25000,  },
    { rotate: -35, duration: 46000, delay: -5000,   },
    { rotate: -48, duration: 54000, delay: -18000,  },
    { rotate: -22, duration: 62000, delay: -30000,  },
  ];

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes rayBreath {
          0%, 100% { opacity: 0.3; transform: scaleX(0.95) var(--ray-rotate); }
          50%       { opacity: 1.0; transform: scaleX(1.05) var(--ray-rotate); }
        }
        @keyframes moonGlow {
          0%, 100% { opacity: 0.05; }
          50%       { opacity: 0.12; }
        }
      `}</style>

      {/* Fog glow origin point at top-right */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle at 100% 0%, rgba(168,184,208,0.12) 0%, rgba(168,184,208,0.04) 40%, transparent 70%)',
        animation: `moonGlow ${(2400 * 3)}ms ease-in-out infinite`,
        willChange: 'opacity',
        transform: 'translateZ(0)',
      }} />

      {/* System A — Broad primary rays */}
      {broadRays.map((ray, i) => (
        <div
          key={`broad-${i}`}
          className="moon-ray"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: ray.width,
            height: '200vh',
            transformOrigin: 'top right',
            '--ray-rotate': `rotate(${ray.rotate}deg)`,
            transform: `rotate(${ray.rotate}deg)`,
            clipPath: 'polygon(100% 0%, 100% 0%, 60% 100%, 40% 100%)',
            background: 'linear-gradient(to bottom, rgba(168,184,208,0.08) 0%, rgba(168,184,208,0.03) 40%, transparent 80%)',
            animation: `rayBreath ${ray.duration}ms ease-in-out ${ray.delay}ms infinite`,
            willChange: 'opacity, transform',
          }}
        />
      ))}

      {/* System B — Sharp luminous shafts (desktop only) */}
      {!isMobile && sharpRays.map((ray, i) => (
        <div
          key={`sharp-${i}`}
          className="moon-ray-sharp"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '8px',
            height: '200vh',
            transformOrigin: 'top right',
            transform: `rotate(${ray.rotate}deg)`,
            clipPath: 'polygon(100% 0%, 100% 0%, 55% 100%, 45% 100%)',
            background: 'linear-gradient(to bottom, rgba(168,184,208,0.25) 0%, rgba(168,184,208,0.08) 30%, transparent 70%)',
            mixBlendMode: 'screen',
            animation: `rayBreath ${ray.duration}ms ease-in-out ${ray.delay}ms infinite`,
            willChange: 'opacity, transform',
          }}
        />
      ))}
    </div>
  );
};

export default MoonRays;
