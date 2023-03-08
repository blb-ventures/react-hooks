import { MutableRefObject, useEffect } from 'react';

const DEFAULT_OBSERVE_TIMEOUT = 500;

export const useResizeObserver = (
  ref: MutableRefObject<any>,
  callback: (width?: number, height?: number) => void,
  options?: { fallback?: boolean; observeTimeout?: number },
) => {
  useEffect(() => {
    const isClient = typeof window === 'object';
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (isClient && window.ResizeObserver) {
      const setObserve = () => {
        if (ref.current != null) {
          resizeObserver.observe(ref.current);
        } else {
          setTimeout(setObserve, options?.observeTimeout ?? DEFAULT_OBSERVE_TIMEOUT);
        }
      };
      const resizeObserver = new window.ResizeObserver((entries: ResizeObserverEntry[]) => {
        entries.forEach((entry: ResizeObserverEntry) => {
          callback(entry.contentRect.width, entry.contentRect.height);
        });
      });
      setObserve();
    } else if (options?.fallback != null) {
      const handleResize = () => {
        const { width, height } = ref.current.getBoundingClientRect();
        callback(width, height);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
    return undefined;
  }, [ref, callback, options]);
};
