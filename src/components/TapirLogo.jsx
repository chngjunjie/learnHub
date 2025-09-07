import React from 'react';

function TapirLogo({ className = "", size = "h-30 w-30" }) {
  return (
    <img 
      src="/images/malayantapirB.webp" 
      alt="LearnHub Logo - Malayan Tapir" 
      className={`${size} object-contain ${className}`}
    />
  );
}

export default TapirLogo;