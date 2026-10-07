export function unique(arr) {
  return [...new Set(arr)];
}

export function groupBy(arr, keyFn) {
  return arr.reduce((groups, item) => {
    const key = keyFn(item);

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);

    return groups;
  }, {});
}

export function chunk(arr, size) {
  if (size <= 0) {
    return [];
  }

  const result = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}

export function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  const clone = {};

  for (const [key, value] of Object.entries(obj)) {
    clone[key] = deepClone(value);
  }

  return clone;
}

export function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  };
}

export function counter(start = 0) {
  let value = start;

  return {
    inc() {
      value++;
      return value;
    },

    dec() {
      value--;
      return value;
    },

    value() {
      return value;
    }
  };
}