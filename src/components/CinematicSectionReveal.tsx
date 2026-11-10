import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface CinematicSectionRevealProps {
  children: React.ReactNode;
  /**
   * Additional custom CSS classes for the wrapper
   */
  className?: string;
  /**
   * Delay in seconds before initiating the reveal animation
   * @default 0
   */
  delay?: number;
  /**
   * Distance in pixels to slide up from
   * @default 45
   */
  slideDistance?: number;
  /**
   * Duration in seconds for the reveal animation
   * @default 0.85
   */
  duration?: number;
  /**
   * Threshold percentage of section visibility required to trigger reveal
   * @default 0.1
   */
  threshold?: number;
  /**
   * Custom rootMargin for IntersectionObserver
   * @default '-40px 0px -40px 0px'
   */
  rootMargin?: string;
  /**
   * Whether to animate only once (true) or every time it enters the viewport
   * @default true
   */
  once?: boolean;
}

/**
 * High-performance IntersectionObserver-based cinematic reveal component.
 * Applies smooth GPU-accelerated fade-in, slide-up, and subtle focal de-blur
 * as primary content sections enter the viewport.
 */
export const CinematicSectionReveal: React.FC<CinematicSectionRevealProps> = ({
  children,
  className = '',
  delay = 0,
  slideDistance = 45,
  duration = 0.85,
  threshold = 0.08,
  rootMargin = '-50px 0px -50px 0px',
  once = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Use native IntersectionObserver for high performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  // Fallback for users preferring reduced motion
  if (shouldReduceMotion) {
    return (
      <div ref={containerRef} className={`w-full ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{
        opacity: 0,
        y: slideDistance,
        filter: 'blur(6px)',
      }}
      animate={
        isVisible
          ? {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }
          : {
              opacity: 0,
              y: slideDistance,
              filter: 'blur(6px)',
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Editorial cinematic deceleration curve
      }}
      className={`w-full will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};
