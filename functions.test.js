import { describe, test, expect } from "vitest";

import {
  unique,
  groupBy,
  chunk,
  deepClone,
  memoize,
  counter
} from "../src/functions.js";

describe("unique", () => {
  test("removes duplicates", () => {
    expect(unique([1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
  });

  test("works with empty array", () => {
    expect(unique([])).toEqual([]);
  });
});

describe("groupBy", () => {
  test("groups objects by key", () => {
    const users = [
      { name: "Ali", group: "A" },
      { name: "Ayan", group: "B" },
      { name: "Dana", group: "A" }
    ];

    expect(groupBy(users, (user) => user.group)).toEqual({
      A: [
        { name: "Ali", group: "A" },
        { name: "Dana", group: "A" }
      ],
      B: [{ name: "Ayan", group: "B" }]
    });
  });

  test("works with empty array", () => {
    expect(groupBy([], (item) => item)).toEqual({});
  });
});

describe("chunk", () => {
  test("splits array into chunks", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([
      [1, 2],
      [3, 4],
      [5]
    ]);
  });

  test("returns empty array for zero size", () => {
    expect(chunk([1, 2, 3], 0)).toEqual([]);
  });
});

describe("deepClone", () => {
  test("creates an independent deep copy", () => {
    const original = {
      name: "Ali",
      address: {
        city: "Almaty"
      }
    };

    const copy = deepClone(original);

    copy.address.city = "Astana";

    expect(original.address.city).toBe("Almaty");
    expect(copy.address.city).toBe("Astana");
  });

  test("clones arrays", () => {
    const original = [1, { value: 2 }];
    const copy = deepClone(original);

    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
  });
});

describe("memoize", () => {
  test("caches function result", () => {
    let calls = 0;

    const add = memoize((a, b) => {
      calls++;
      return a + b;
    });

    expect(add(2, 3)).toBe(5);
    expect(add(2, 3)).toBe(5);
    expect(calls).toBe(1);
  });

  test("works with different arguments", () => {
    const multiply = memoize((a, b) => a * b);

    expect(multiply(2, 3)).toBe(6);
    expect(multiply(3, 4)).toBe(12);
  });
});

describe("counter", () => {
  test("starts from zero", () => {
    const c = counter();

    expect(c.value()).toBe(0);
  });

  test("increments and decrements", () => {
    const c = counter();

    c.inc();
    c.inc();
    c.dec();

    expect(c.value()).toBe(1);
  });

  test("supports custom start value", () => {
    const c = counter(10);

    expect(c.value()).toBe(10);
    c.inc();

    expect(c.value()).toBe(11);
  });
});