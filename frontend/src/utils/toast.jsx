let listeners = [];

export const toast = {
  success: (msg) => emit("success", msg),
  error: (msg) => emit("error", msg),
  info: (msg) => emit("info", msg),
};

function emit(type, message) {
  listeners.forEach((cb) => cb({ type, message, id: Date.now() }));
}

export const subscribe = (cb) => {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
};
