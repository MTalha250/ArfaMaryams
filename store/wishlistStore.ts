import { create } from "zustand";
import axios from "axios";
type WishlistStore = {
  wishlist: any[];
  initWishlist: (items: any) => void;
  addToWishlist: (item: any, userId: any) => void;
  removeFromWishlist: (id: any, userId: any) => void;
  inWishlist: (id: any) => boolean;
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlist: [],
  initWishlist: (items) => {
    set({ wishlist: items });
  },
  addToWishlist: async (item, userId) => {
    let new_wishlist = get().wishlist;
    let found = false;
    new_wishlist.forEach((wishlist_item) => {
      if (wishlist_item.id === item.id) {
        found = true;
      }
    });
    if (!found) {
      new_wishlist.push(item);
    }
    await axios.put(`/api/update/${userId}`, { wishlist: new_wishlist });
    set({ wishlist: new_wishlist });
  },
  removeFromWishlist: async (id, userId) => {
    let new_wishlist = get().wishlist;
    new_wishlist = new_wishlist.filter((item) => item.id !== id);
    await axios.put(`/api/update/${userId}`, { wishlist: new_wishlist });
    set({ wishlist: new_wishlist });
  },
  inWishlist: (id) => {
    let found = false;
    get().wishlist.forEach((wishlist_item) => {
      if (wishlist_item.id === id) {
        found = true;
      }
    });
    return found;
  },
}));
