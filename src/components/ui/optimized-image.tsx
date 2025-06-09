import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  aspectRatio?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = '100vw',
  quality = 75,
  aspectRatio,
  objectFit = 'cover',
  placeholder = 'empty',
  blurDataURL,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Generate srcset for responsive images with different formats
  const generateSrcSet = (imageSrc: string) => {
    const widths = [320, 640, 768, 1024, 1280, 1536];
    const formats = ['webp', 'avif', 'jpg'];
    
    return formats.map(format => {
      const srcset = widths
        .map(w => `${imageSrc}?w=${w}&q=${quality}&format=${format} ${w}w`)
        .join(', ');
      return `${srcset} ${format === 'webp' ? 'type="image/webp"' : format === 'avif' ? 'type="image/avif"' : ''}`;
    }).join(', ');
  };

  // Calculate aspect ratio padding
  const getAspectRatioStyle = () => {
    if (!aspectRatio) return {};
    return {
      paddingBottom: `${(1 / aspectRatio) * 100}%`,
    };
  };

  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [src, priority]);

  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        !isLoaded && !error && 'animate-pulse bg-muted',
        className
      )}
      style={{ 
        width: width || '100%',
        height: height || 'auto',
        ...getAspectRatioStyle()
      }}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && blurDataURL && !isLoaded && (
        <div 
          className="absolute inset-0 blur-xl scale-110"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Picture element for better format support */}
      <picture>
        <source
          type="image/webp"
          srcSet={generateSrcSet(src)}
          sizes={sizes}
        />
        <source
          type="image/avif"
          srcSet={generateSrcSet(src)}
          sizes={sizes}
        />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            error && 'opacity-100',
            `object-${objectFit}`
          )}
          style={{
            position: aspectRatio ? 'absolute' : 'relative',
            top: aspectRatio ? 0 : 'auto',
            left: aspectRatio ? 0 : 'auto',
            width: aspectRatio ? '100%' : 'auto',
            height: aspectRatio ? '100%' : 'auto',
          }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          {...props}
        />
      </picture>

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <span className="text-sm text-muted-foreground">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage; 