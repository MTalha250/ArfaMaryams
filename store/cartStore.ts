import { create } from "zustand";

type CartStore = {
  items: any[];
  addItem: (item: any) => void;
  removeItem: (id: any) => void;
  deleteItem: (id: any) => void;
  addQuantity: (id: any) => void;
  getItemQuantity: (id: any) => number;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    let new_items = get().items;
    let found = false;
    new_items.forEach((cart_item) => {
      if (cart_item.id === item.id) {
        found = true;
        cart_item.quantity++;
      }
    });

    if (!found) {
      new_items.push({ ...item, quantity: 1 });
    }

    set({ items: new_items });
  },
  removeItem: (id) => {
    let new_items = get().items;
    let found = false;
    new_items.forEach((cart_item) => {
      if (cart_item.id === id) {
        found = true;
        if (cart_item.quantity > 1) {
          cart_item.quantity--;
        } else {
          new_items = new_items.filter((item) => item.id !== id);
        }
      }
    });
    if (!found) {
      new_items = new_items.filter((item) => item.id !== id);
    }
    set({ items: new_items });
  },
  deleteItem: (id) => {
    let new_items = get().items;
    new_items = new_items.filter((item) => item.id !== id);
    set({ items: new_items });
  },
  addQuantity: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    })),
  getItemQuantity: (id) => {
    let quantity = 0;
    get().items.forEach((item) => {
      if (item.id === id) {
        quantity = item.quantity;
      }
    });
    return quantity;
  },
  getTotalPrice: () => {
    let total_price = 0;
    get().items.forEach((item) => {
      total_price += item.price * item.quantity;
    });
    return total_price;
  },
  getTotalItems: () => {
    let total_items = 0;
    get().items.forEach((item) => {
      total_items += item.quantity;
    });
    return total_items;
  },
  clearCart: () => set({ items: [] }),
}));
