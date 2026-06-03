import React from 'react';

const FogDrift = () => {
  // Disabled on mobile as blur filter is GPU-costly
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  const fogBands = [
    { top: '55vh', height: '120px', duration: 30000, delay: 0,       opacity: 1.0 },
    { top: '65vh', height: '180px', duration: 45000, delay: -12000,  opacity: 0.8 },
    { top: '75vh', height: '100px', duration: 25000, delay: -6000,   opacity: 0.6 },
    { top: '85vh', height: '200px', duration: 60000, delay: -20000,  opacity: 0.5 },
  ];

  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: 3,
    contain: 'strict',
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes fogDrift {
          0%   { transform: translateX(-10%) translateY(-10px); }
          50%  { transform: translateX(10%)  translateY(10px);  }
          100% { transform: translateX(-10%) translateY(-10px); }
        }
      `}</style>
      {fogBands.map((band, i) => (
        <div
          key={i}
          className="fog-band"
          style={{
            position: 'absolute',
            left: '-20%',
            top: band.top,
            width: '140%',
            height: band.height,
            background: 'linear-gradient(to right, transparent 0%, rgba(168,184,208,0.04) 20%, rgba(168,184,208,0.07) 50%, rgba(168,184,208,0.04) 80%, transparent 100%)',
            borderRadius: '50%',
            filter: 'blur(30px)',
            opacity: band.opacity,
            animation: `fogDrift ${band.duration}ms ease-in-out ${band.delay}ms infinite`,
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        />
      ))}
    </div>
  );
};

export default FogDrift;
