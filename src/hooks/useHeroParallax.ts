import { RefObject } from 'react';
import { useScroll, useTransform, useSpring, useReducedMotion, MotionValue } from 'motion/react';

interface UseHeroParallaxOptions {
  visualRange?: [number, number];
  textRange?: [number, number];
}

interface UseHeroParallaxReturn {
  visualY: MotionValue<number>;
  textY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

/**
 * useHeroParallax
 * Custom hook providing smooth, spring-damped scroll parallax offsets
 * for the hero text and visual composition using Framer Motion.
 *
 * @param targetRef - Ref to the hero section container
 * @param options - Custom ranges for visual and text parallax offsets
 */
export const useHeroParallax = (
  targetRef: RefObject<HTMLElement | null>,
  options: UseHeroParallaxOptions = {}
): UseHeroParallaxReturn => {
  const shouldReduceMotion = useReducedMotion();

  const {
    visualRange = [0, -65],
    textRange = [0, -20],
  } = options;

  // Track scroll progress across the hero section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  // Calculate raw parallax transforms
  const rawVisualY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : visualRange
  );

  const rawTextY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : textRange
  );

  // Apply spring smoothing for organic, fluid motion
  const visualY = useSpring(rawVisualY, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  const textY = useSpring(rawTextY, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return {
    visualY,
    textY,
    scrollYProgress,
  };
};
