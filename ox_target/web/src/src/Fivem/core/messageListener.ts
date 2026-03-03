const listeners: Record<string, Function[]> = {};

window.addEventListener('message', ({ data }) => {
  const name = data.event || data.eventName;
  if (name && listeners[name])
    listeners[name].forEach((cb) => cb(data.payload ?? data));
});

export const addMessageListener = (name: string, cb: Function) => {
  if (!listeners[name]) listeners[name] = [];
  listeners[name].push(cb);
  return () => {
    listeners[name] = listeners[name].filter((l) => l !== cb);
  };
};
