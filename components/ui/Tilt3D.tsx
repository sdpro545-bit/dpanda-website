import React from "react";

interface Tilt3DProps {
  children: React.ReactNode;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  perspective?: number;
  className?: string;
}

export const Tilt3D: React.FC<Tilt3DProps> = ({
  children,
  rotateX = 55,
  rotateY = 0,
  rotateZ = -12,
  perspective = 1400,
  className = "",
}) => {
  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className={`inline-block ${className}`}
    >
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
          transformStyle: "preserve-3d",
        }}
        className="transition-transform duration-500 will-change-transform"
      >
        {children}
      </div>
    </div>
  );
};
