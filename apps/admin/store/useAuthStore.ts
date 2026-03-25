import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthStore {
  token: string | null;
  user: AuthUser | null;
  setAuth: (token: string, user: AuthUser) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setAuth: (token, user) => {
        localStorage.setItem("exvion_token", token);
        set({ token, user });
      },
      logout: () => {
        localStorage.removeItem("exvion_token");
        set({ token: null, user: null });
      },
      isAuthenticated: () => !!get().token,
    }),
    { name: "exvion-auth" }
  )
);
