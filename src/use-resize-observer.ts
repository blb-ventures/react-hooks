import { MutableRefObject, useEffect } from 'react';

export const useResizeObserver = (
  ref: MutableRefObject<any>,
  callback: (width?: number, height?: number) => void,
  options?: { fallback?: boolean },
) => {
  useEffect(() => {
    const isClient = typeof window === 'object';
    if (isClient && window.ResizeObserver) {
      const setObserve = () => {
        if (ref.current != null) {
          resizeObserver.observe(ref.current);
        } else {
          setTimeout(setObserve, 500);
        }
      };
      const resizeObserver = new window.ResizeObserver((entries: ResizeObserverEntry[]) => {
        entries.forEach((entry: ResizeObserverEntry) => {
          callback(entry.contentRect.width, entry.contentRect.height);
        });
      });
      setObserve();
    } else if (options != null && options.fallback) {
      const handleResize = () => {
        const { width, height } = ref.current.getBoundingClientRect();
        callback(width, height);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
    return () => {};
  }, [ref, callback, options]);
};
