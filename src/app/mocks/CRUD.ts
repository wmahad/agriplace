import { v4 as uuidv4 } from "uuid";

export class CRUD<T extends { id: string }> {
  initialData: T[] = [];
  name: string = "";

  constructor(name: string, items: T[]) {
    this.name = name;
    this.initialData = items;
    const existingItems = this.getItems();
    localStorage.setItem(name, JSON.stringify(existingItems || items));
  }

  getItems = (): T[] => {
    return localStorage.getItem(this.name)
      ? JSON.parse(localStorage.getItem(this.name) as string)
      : this.initialData;
  };
  addItem = (item: Omit<T, "id">) => {
    const newItem = { ...item, id: uuidv4() };
    localStorage.setItem(
      this.name,
      JSON.stringify([...this.getItems(), newItem as T])
    );
    return newItem;
  };
  updateItem = (item: T) => {
    const items = this.getItems().map((d) => {
      if (d.id !== item.id) return d;
      return { ...d, ...item };
    });

    localStorage.setItem(this.name, JSON.stringify(items));
    return item;
  };
  deleteItem = (item: T) => {
    const items = this.getItems().filter(({ id }) => item.id !== id);
    localStorage.setItem(this.name, JSON.stringify(items));
  };

  reset = () => {
    localStorage.setItem(this.name, JSON.stringify(this.initialData));
  };
}
