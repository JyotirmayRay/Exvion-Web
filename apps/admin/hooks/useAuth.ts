"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { api } from "@/lib/api";

export const useAuth = () => {
  const router = useRouter();
  const { token, user, setAuth, logout } = useAuthStore();

  const login = async (email: string, password: string) => {
    const data = await api.login(email, password);
    // Set cookie for middleware
    document.cookie = `exvion_token=${data.token};path=/;max-age=604800`;
    setAuth(data.token, data.user);
    router.push("/dashboard");
  };

  const handleLogout = () => {
    document.cookie = "exvion_token=;path=/;max-age=0";
    logout();
    router.push("/login");
  };

  return { token, user, login, logout: handleLogout };
};
