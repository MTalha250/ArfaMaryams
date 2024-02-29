import { create } from "zustand";
import { User } from "@/types";
import { signOut } from "next-auth/react";

type AuthStore = {
  status: "loading" | "success" | "error";
  setStatus: (status: "loading" | "success" | "error") => void;
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  status: "loading",
  setStatus: (status) => set({ status }),
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => {
    set({ user: null });
    signOut();
  },
}));

export default useAuthStore;
