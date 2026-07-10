// eventEmitter.js
const eventEmitter = (() => {
  const listeners = {}; // { eventName: Set<callback> }

  return {
    on(eventName, callback) {
      if (typeof callback !== 'function') {
        console.warn(
          `[EventEmitter] on(): callback for "${eventName}" must be a function`
        );
        return;
      }
      if (!listeners[eventName]) {
        listeners[eventName] = new Set();
      }
      listeners[eventName].add(callback);
    },

    off(eventName, callback) {
      if (!listeners[eventName]) return;
      listeners[eventName].delete(callback);

      // cleanup empty sets to avoid memory bloat
      if (listeners[eventName].size === 0) {
        delete listeners[eventName];
      }
    },

    emit(eventName, payload) {
      if (!listeners[eventName] || listeners[eventName].size === 0) {
        console.warn(`[EventEmitter] emit(): No listeners for "${eventName}"`);
        return;
      }

      listeners[eventName].forEach((callback) => {
        try {
          callback(payload);
        } catch (err) {
          // ✅ Req 4c: one bad listener won't break others
          console.error(
            `[EventEmitter] Listener error for "${eventName}":`,
            err
          );
        }
      });
    },
  };
})();

export default eventEmitter;
