import { create } from "zustand";
import axios from "axios";
type CartStore = {
  items: any[];
  initCart: (items: any) => void;
  addItem: (item: any, userId: any, user: boolean, update: any) => void;
  removeItem: (id: any, userId: any, user: boolean, update: any) => void;
  deleteItem: (id: any, userId: any, user: boolean, update: any) => void;
  addQuantity: (id: any, userId: any, user: boolean, update: any) => void;
  getItemQuantity: (id: any) => number;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: (userId: any, user: boolean, update: any) => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  initCart: (items) => {
    set({ items: items });
  },
  addItem: async (item, userId, user, update) => {
    let new_items = get().items;
    let found = false;
    new_items.forEach((cart_item) => {
      if (
        cart_item.id + cart_item.size + cart_item.color ===
        item.id + item.size + item.color
      ) {
        found = true;
        cart_item.quantity++;
      }
    });

    if (!found) {
      new_items.push({ ...item, quantity: 1 });
    }
    set({ items: new_items });
    if (user) {
      await axios.put(`/api/update/${userId}`, { cart: new_items });
      update(new_items);
    }
  },
  removeItem: async (id, userId, user, update) => {
    let new_items = get().items;
    let found = false;
    new_items.forEach((cart_item) => {
      if (cart_item.id + cart_item.size + cart_item.color === id) {
        found = true;
        if (cart_item.quantity > 1) {
          cart_item.quantity--;
        } else {
          new_items = new_items.filter(
            (item) => item.id + item.size + item.color !== id
          );
        }
      }
    });
    if (!found) {
      new_items = new_items.filter(
        (item) => item.id + item.size + item.color !== id
      );
    }
    set({ items: new_items });
    if (user) {
      await axios.put(`/api/update/${userId}`, { cart: new_items });
      update(new_items);
    }
  },
  deleteItem: async (id, userId, user, update) => {
    let new_items = get().items;
    new_items = new_items.filter(
      (item) => item.id + item.size + item.color !== id
    );
    set({ items: new_items });
    if (user) {
      await axios.put(`/api/update/${userId}`, { cart: new_items });
      update(new_items);
    }
  },
  addQuantity: async (id, userId, user, update) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id + i.size + i.color === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    }));
    if (user) {
      await axios.put(`/api/update/${userId}`, { cart: get().items });
      update(get().items);
    }
  },
  getItemQuantity: (id) => {
    let quantity = 0;
    get().items.forEach((item) => {
      if (item.id + item.size + item.color === id) {
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
  clearCart: async (userId, user, update) => {
    set({ items: [] });
    if (user) {
      await axios.put(`/api/update/${userId}`, { cart: [] });
      update([]);
    }
  },
}));
