import { useEffect, useState } from 'react';

export const useEvent = <EventType>(
  eventTarget: EventTarget | null,
  eventName: string,
  callback?: (info: EventType) => void,
) => {
  const [eventValue, setEventValue] = useState<EventType | null>(null);
  useEffect(() => {
    const handleProgress = (e: Event) => {
      if (e instanceof CustomEvent<EventType>) {
        callback?.(e.detail);
        setEventValue(e.detail);
      }
    };
    if (eventTarget == null) {
      setEventValue(null);
      return () => {};
    }
    eventTarget.addEventListener(eventName, handleProgress);
    return () => eventTarget.removeEventListener(eventName, handleProgress);
  }, [eventTarget, eventName, callback]);
  return eventValue;
};
