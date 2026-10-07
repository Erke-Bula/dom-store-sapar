import { describe, test, expect } from "vitest";

import { Store, SortedStore } from "../src/Store.js";

describe("Store", () => {
  test("adds an item", () => {
    const store = new Store();

    const item = { id: 1, name: "Apple" };

    store.add(item);

    expect(store.find(1)).toEqual(item);
  });

  test("removes an item", () => {
    const store = new Store([
      { id: 1, name: "Apple" },
      { id: 2, name: "Banana" }
    ]);

    expect(store.remove(1)).toBe(true);
    expect(store.find(1)).toBeUndefined();
  });

  test("returns false when removing missing item", () => {
    const store = new Store();

    expect(store.remove(100)).toBe(false);
  });

  test("finds an item", () => {
    const store = new Store([
      { id: 1, name: "Apple" }
    ]);

    expect(store.find(1).name).toBe("Apple");
  });

  test("returns total number of items", () => {
    const store = new Store([
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ]);

    expect(store.total()).toBe(3);
  });

  test("total is zero for empty store", () => {
    const store = new Store();

    expect(store.total()).toBe(0);
  });

  test("static from creates a Store", () => {
    const store = Store.from([
      { id: 1, name: "Apple" }
    ]);

    expect(store).toBeInstanceOf(Store);
    expect(store.total()).toBe(1);
  });
});

describe("SortedStore", () => {
  test("inherits from Store", () => {
    const store = new SortedStore();

    expect(store).toBeInstanceOf(Store);
  });

  test("sorts items by name", () => {
    const store = new SortedStore([
      { id: 1, name: "Zebra" },
      { id: 2, name: "Apple" },
      { id: 3, name: "Banana" }
    ]);

    expect(store.items.map((item) => item.name)).toEqual([
      "Apple",
      "Banana",
      "Zebra"
    ]);
  });
});