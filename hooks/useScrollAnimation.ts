'use client';

import { useEffect, useRef, useState, RefObject } from 'react';

interface UseScrollAnimationReturn {
  ref: RefObject<HTMLDivElement>;
  isVisible: boolean;
}

export function useScrollAnimation(threshold = 0.1): UseScrollAnimationReturn {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isVisible };
}

// Hook for multiple elements with staggered animations
export function useStaggeredScrollAnimation(itemCount: number, threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false));

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animations
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => {
                const newState = [...prev];
                newState[i] = true;
                return newState;
              });
            }, i * 100);
          }
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [itemCount, threshold]);

  return { ref, visibleItems };
}
