"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileTabNav } from "@/components/layout/MobileTabNav";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
