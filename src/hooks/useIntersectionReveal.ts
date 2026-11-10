import { useEffect, useRef, useState } from 'react';

interface UseIntersectionRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Custom hook to detect when an element enters the viewport via native IntersectionObserver
 */
export function useIntersectionReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '-50px 0px -50px 0px',
  once = true,
}: UseIntersectionRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return { ref, isIntersecting };
}
