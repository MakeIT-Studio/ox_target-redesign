import { useEffect, useRef } from 'react';
import { addMessageListener } from '../core/messageListener';

export const useNuiEvent = <T>(name: string, handler: (data: T) => void) => {
  const h = useRef(handler);
  useEffect(() => {
    h.current = handler;
  }, [handler]);
  useEffect(() => addMessageListener(name, (d: any) => h.current(d)), [name]);
};
