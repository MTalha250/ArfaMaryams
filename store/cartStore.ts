import { create } from "zustand";
import axios from "axios";
type CartStore = {
  items: any[];
  initCart: (items: any) => void;
  addItem: (item: any, userId: any) => void;
  removeItem: (id: any, userId: any) => void;
  deleteItem: (id: any, userId: any) => void;
  addQuantity: (id: any, userId: any) => void;
  getItemQuantity: (id: any) => number;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: (userId: any) => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  initCart: (items) => {
    set({ items: items });
  },
  addItem: async (item, userId) => {
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
    await axios.put(`/api/update/${userId}`, { cart: new_items });
    set({ items: new_items });
  },
  removeItem: async (id, userId) => {
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
    await axios.put(`/api/update/${userId}`, { cart: new_items });
    set({ items: new_items });
  },
  deleteItem: async (id, userId) => {
    let new_items = get().items;
    new_items = new_items.filter((item) => item.id !== id);
    set({ items: new_items });
    await axios.put(`/api/update/${userId}`, { cart: new_items });
  },
  addQuantity: async (id, userId) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    }));
    await axios.put(`/api/update/${userId}`, { cart: get().items });
  },
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
  clearCart: async (userId) => {
    set({ items: [] });
    await axios.put(`/api/update/${userId}`, { cart: [] });
  },
}));
