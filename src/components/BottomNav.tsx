"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/", label: "Ringkasan", icon: "home" },
    { href: "/target", label: "Target", icon: "savings" },
    { href: "/laporan", label: "Laporan", icon: "bar_chart" },
];

export default function BottomNav() {
    const pathname = usePathname();

    // Jangan tampilkan di halaman login/register
    if (pathname === "/login" || pathname === "/register") return null;

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-slate-200/60 px-2 pb-safe">
            <div className="flex items-center justify-around">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center gap-0.5 py-2.5 px-5 rounded-xl transition-all ${isActive
                                    ? "text-[#7ca29d]"
                                    : "text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            <span
                                className={`material-symbols-outlined text-[22px] transition-all ${isActive ? "font-bold" : "font-light"
                                    }`}
                                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                            >
                                {item.icon}
                            </span>
                            <span className={`text-[10px] font-bold tracking-wide transition-all ${isActive ? "text-[#7ca29d]" : "text-slate-400"}`}>
                                {item.label}
                            </span>
                            {/* Active dot indicator */}
                            {isActive && (
                                <span className="w-1 h-1 rounded-full bg-[#7ca29d] mt-0.5" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
