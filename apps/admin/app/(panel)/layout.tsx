"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileTabNav } from "@/components/layout/MobileTabNav";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { token } = useAuthStore();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const storedToken =
      token || (typeof window !== "undefined" && localStorage.getItem("exvion_token"));
    if (!storedToken) {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [token, router]);

  if (!authorized) {
    return (
      <div className="flex min-h-screen bg-brand-dark items-center justify-center">
        <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-brand-dark">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-screen md:ml-64 transition-all">
        {/* Desktop TopBar */}
        <div className="hidden md:block">
          <TopBar />
        </div>

        {/* Mobile Header */}
        <MobileHeader />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden pb-24 md:pb-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileTabNav />
      </div>
    </div>
  );
}
