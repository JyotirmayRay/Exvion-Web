"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

import { Icon, type IconName } from "@exvion/ui";

const navItems: { icon: IconName; label: string; href: string }[] = [
  { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
  { icon: "leads", label: "All Leads", href: "/leads" },
  { icon: "fire", label: "High Value", href: "/leads?tier=high" },
  { icon: "calendar", label: "Bookings", href: "/bookings" },
  { icon: "settings", label: "Settings", href: "/settings" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <>
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64
        flex-col glass border-r border-white/5 z-40">

        <div className="p-6 border-b border-white/5 flex justify-center">
          <img 
            src="/logo.webp" 
            alt="Exvion Admin" 
            className="h-8 w-auto" 
          />
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href.split("?")[0];
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 3 }}
                  className={`flex items-center gap-3 px-4 py-3 
                    rounded-xl transition-all text-sm font-medium
                    ${isActive
                      ? "bg-brand-primary/15 text-brand-primary border border-brand-primary/20"
                      : "text-text-secondary hover:text-white hover:bg-white/5"
                    }`}
                >
                  <Icon name={item.icon} size={20} className="shrink-0" />
                  {item.label}
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full 
                      bg-brand-primary" />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-brand-primary/20 
              flex items-center justify-center text-brand-primary 
              text-sm font-bold">
              {user?.name?.[0] || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">
                {user?.name}
              </p>
              <p className="text-text-muted text-[10px] truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <button onClick={logout}
            className="w-full text-left text-text-muted hover:text-white 
              transition-colors text-xs px-2 py-1.5 rounded-lg 
              hover:bg-white/5">
            → Sign Out
          </button>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50
        glass border-t border-white/5 flex justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href.split("?")[0];
          return (
            <Link key={item.href} href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 
                rounded-xl transition-all
                ${isActive ? "text-brand-primary" : "text-text-muted"}`}
            >
              <Icon name={item.icon} size={24} />
              <span className="text-[9px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};
