"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", label: "Ringkasan" },
        { href: "/target", label: "Target" },
        { href: "/laporan", label: "Laporan" },
    ];

    return (
        <nav className="sticky top-0 z-50 px-8 py-4 bg-white/70 backdrop-blur-md border-b border-slate-200/50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#7ca29d] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#7ca29d]/20">
                        <span className="material-symbols-outlined">favorite</span>
                    </div>
                    <h2 className="text-xl font-extrabold tracking-tight serif-vibe text-[#7ca29d]">
                        Tabungan Bersama
                    </h2>
                </div>
                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                className={
                                    pathname === item.href
                                        ? "text-[#7ca29d] border-b-2 border-[#7ca29d] pb-1"
                                        : "text-slate-500 hover:text-[#7ca29d] transition-colors"
                                }
                                href={item.href}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                        <div className="flex -space-x-3">
                            <div
                                className="w-9 h-9 rounded-full border-2 border-white bg-cover bg-center"
                                style={{
                                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCO3GabToIuUBVURK6GA2vBQXOIQlysc4eJVhGWv8aFno2GtJelbyoWGyCKcS6aMvJoaobGMS7leNzZna563rJL8PyO8ubH3MArBMEE7QdhipVcL0GxPZBLicYMxgBY_dkMlykHTWKSfzQgA6XHLcE7mfXA4uu_eH9c8Y1YuBur4tk6ty_54-PMr7kquJiEMQEwObIA3-M7YHAwBUxq0hkEooLYySS3hQuadnU4_e9WvGGzU3C8t0qkjLx3f8F8mRgY2jSIGXtltB0")`,
                                }}
                            />
                            <div
                                className="w-9 h-9 rounded-full border-2 border-white bg-cover bg-center"
                                style={{
                                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAMOGJxJBIjZSy5YyrvNjDYpHnYridKq18LChxf1amzJBSp8RUlbOMCrAhPpJGcdQytM9_D-J_Blp4ofK71wr22B0k3JUmLnlguuhjXrFddzOOx18WYZBGLXktJNQD4Euj5X42tIxDpr5_Fu0NRzTlj2xRic8NDnHg9BawVLkmYoJRL2B1IUhDeH4BkwljibOStoMXP_il1OiL6DTBLzv9JvvDRdlkEMK4OaycpBxxQs2gGYg3-tPEjAUYFuTJ6PAWkpjNOla2TsRQ")`,
                                }}
                            />
                        </div>
                        <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-600">
                                notifications
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
