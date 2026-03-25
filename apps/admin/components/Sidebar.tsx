import Link from "next/link";
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Leads", icon: Users, href: "/leads" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-8">
        <h1 className="text-xl font-bold tracking-tight text-white">EXVION <span className="text-blue-500">ADMIN</span></h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
