import { useCallback, useEffect, useRef } from 'react';

export const DEFAULT_POLLING_INTERVAL = 10000;
export interface UsePollingOptions {
  intervalMs?: number;
  fn: () => void;
  autoStart?: boolean;
}

export const usePolling = ({ fn, intervalMs, autoStart }: UsePollingOptions) => {
  const intervalId = useRef<any>();
  const pause = useCallback(() => {
    if (intervalId.current != null) clearInterval(intervalId.current);
  }, []);
  const start = useCallback(() => {
    pause();
    intervalId.current = setInterval(fn, intervalMs ?? DEFAULT_POLLING_INTERVAL);
  }, [fn, intervalMs, pause]);
  useEffect(() => {
    if (autoStart) {
      start();
    }
    return pause;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { start, pause };
};
