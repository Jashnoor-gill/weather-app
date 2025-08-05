import React, { useState, useRef, useEffect } from 'react';

interface TiltedCardProps {
  imageSrc: string;
  altText: string;
  captionText?: string;
  containerHeight: string;
  containerWidth: string;
  imageHeight: string;
  imageWidth: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  displayOverlayContent?: boolean;
  overlayContent?: React.ReactNode;
}

const TiltedCard: React.FC<TiltedCardProps> = ({
  imageSrc,
  altText,
  captionText,
  containerHeight,
  containerWidth,
  imageHeight,
  imageWidth,
  rotateAmplitude = 10,
  scaleOnHover = 1.1,
  showMobileWarning = true,
  showTooltip = false,
  displayOverlayContent = false,
  overlayContent,
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const deltaX = (mouseX - centerX) / (rect.width / 2);
    const deltaY = (mouseY - centerY) / (rect.height / 2);
    
    setRotation({
      x: -deltaY * rotateAmplitude,
      y: deltaX * rotateAmplitude,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      className="relative perspective-1000"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div
        className="w-full h-full transition-transform duration-200 ease-out transform-gpu rounded-2xl overflow-hidden"
        style={{
          transform: `
            rotateX(${rotation.x}deg)
            rotateY(${rotation.y}deg)
            scale(${isHovered ? scaleOnHover : 1})
          `,
        }}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="object-cover rounded-2xl bg-white dark:bg-gray-800"
          style={{
            height: imageHeight,
            width: imageWidth,
          }}
        />
        
        {displayOverlayContent && isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl transition-opacity duration-200">
            {overlayContent}
          </div>
        )}
      </div>

      {captionText && !isHovered && (
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            {captionText}
          </p>
        </div>
      )}

      {showTooltip && isHovered && (
        <div className="absolute -bottom-8 left-0 right-0 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {altText}
          </p>
        </div>
      )}
    </div>
  );
};

export default TiltedCard;
