import { create } from "zustand";
import { User } from "@/types";

type AuthStore = {
  status: "loading" | "success" | "error";
  setStatus: (status: "loading" | "success" | "error") => void;
  user: User | null;
  clearUser: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  status: "loading",
  setStatus: (status) => set({ status }),
  user: null,
  clearUser: () => set({ user: null }),
}));

export default useAuthStore;
