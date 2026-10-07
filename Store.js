export class Store {
  #items = [];

  constructor(items = []) {
    this.#items = [...items];
  }

  add(item) {
    this.#items.push(item);
    return item;
  }

  remove(id) {
    const index = this.#items.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this.#items.splice(index, 1);
    return true;
  }

  find(id) {
    return this.#items.find((item) => item.id === id);
  }

  total() {
    return this.#items.length;
  }

  get items() {
    return [...this.#items];
  }

  static from(items) {
    return new Store(items);
  }
}

export class SortedStore extends Store {
  find(id) {
    const item = super.find(id);

    if (!item) {
      return undefined;
    }

    return item;
  }

  get items() {
    return super.items.sort((a, b) =>
      String(a.name ?? "").localeCompare(String(b.name ?? ""))
    );
  }
}