"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser, logoutUser } from "@/lib/actions/auth";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const navItems = [
        { href: "/", label: "Ringkasan" },
        { href: "/target", label: "Target" },
        { href: "/laporan", label: "Laporan" },
    ];

    const fetchUser = async () => {
        const data = await getCurrentUser();
        setUser(data);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleLogout = async () => {
        await logoutUser();
        router.push("/login");
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="sticky top-0 z-50 px-4 md:px-8 py-2.5 md:py-4 bg-white/70 backdrop-blur-md border-b border-slate-200/50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#7ca29d] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#7ca29d]/20 shrink-0">
                        <span className="material-symbols-outlined text-[18px] md:text-[24px]">favorite</span>
                    </div>
                    <h2 className="text-sm md:text-xl font-extrabold tracking-tight serif-vibe text-[#7ca29d] whitespace-nowrap">
                        Tabungan Bersama
                    </h2>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3 md:gap-8">
                    {/* Nav Links — desktop only */}
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

                    <div className="flex items-center gap-2 md:gap-4 md:pl-6 md:border-l md:border-slate-200 relative" ref={dropdownRef}>
                        {/* Notifications Button */}
                        <button className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-[#7ca29d] transition-colors">
                            <span className="material-symbols-outlined text-[18px] md:text-[24px]">notifications</span>
                            <span className="absolute top-1.5 right-2 md:top-2 md:right-2.5 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        {/* Profile Trigger */}
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className={`relative flex items-center gap-1.5 pl-1.5 pr-2.5 md:pl-2 md:pr-4 py-1 md:py-1.5 bg-white rounded-full shadow-md border border-slate-200/50 transition-all ${isProfileOpen ? "ring-2 ring-[#7ca29d]/20" : ""}`}
                        >
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white bg-[#7ca29d] flex items-center justify-center text-[9px] md:text-[10px] text-white font-bold shadow-sm">
                                    {user?.name?.[0] || "?"}
                                </div>
                                {user?.partner && (
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white bg-amber-500 flex items-center justify-center text-[9px] md:text-[10px] text-white font-bold shadow-sm">
                                        {user.partner.name?.[0] || "?"}
                                    </div>
                                )}
                            </div>
                            <span className="material-symbols-outlined text-slate-400 text-xs md:text-sm">
                                keyboard_arrow_down
                            </span>
                        </button>

                        {/* Profile Popup/Dropdown */}
                        {isProfileOpen && (
                            <div className="absolute top-11 md:top-14 right-0 w-[min(320px,calc(100vw-2rem))] bg-white/95 backdrop-blur-xl rounded-[20px] shadow-2xl border border-slate-100 z-50 overflow-hidden text-left origin-top-right transition-all">
                                <div className="p-4 md:p-5 bg-slate-50/50 border-b border-slate-200/40">
                                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 md:mb-4">
                                        {user?.partner ? "Profil Bersama" : "Profil Saya"}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-9 h-9 md:w-11 md:h-11 rounded-full border-2 border-white shadow-sm bg-[#7ca29d] flex items-center justify-center text-white font-bold text-sm">
                                                {user?.name?.[0] || "?"}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-800">{user?.name || "User"}</span>
                                                <span className="text-[10px] text-[#7ca29d] font-bold uppercase">Main</span>
                                            </div>
                                        </div>

                                        {user?.partner ? (
                                            <>
                                                <span className="material-symbols-outlined text-slate-300">link</span>
                                                <div className="flex items-center gap-2.5 text-right">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-800">{user.partner.name}</span>
                                                        <span className="text-[10px] text-amber-500 font-bold uppercase">Partner</span>
                                                    </div>
                                                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-full border-2 border-white shadow-sm bg-amber-500 flex items-center justify-center text-white font-bold text-sm">
                                                        {user.partner.name?.[0] || "?"}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-dashed border-[#7ca29d]/50 rounded-xl text-[#7ca29d] hover:bg-[#7ca29d]/5 transition-all group">
                                                <span className="material-symbols-outlined text-sm font-bold">add</span>
                                                <span className="text-[10px] font-bold uppercase">Undang</span>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="p-2 border-t border-slate-50 bg-slate-50/50">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-xl hover:bg-red-50 transition-colors group"
                                    >
                                        <span className="material-symbols-outlined text-red-400 font-light group-hover:text-red-500 transition-colors">
                                            logout
                                        </span>
                                        <span className="text-sm font-bold text-red-500">Keluar</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
