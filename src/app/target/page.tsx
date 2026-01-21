"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import TargetGoalCard from "@/components/TargetGoalCard";
import NewTargetModal from "@/components/NewTargetModal";
import SavingsModal from "@/components/SavingsModal";

const targetData = [
    {
        icon: "flight_takeoff",
        iconBg: "bg-[#e0f2f1]",
        iconColor: "text-[#7ca29d]",
        title: "Liburan ke Jepang",
        subtitle: "Terisi Rp 500rb hari ini",
        subtitleColor: "text-emerald-600 font-bold",
        progress: 72,
        progressColor: "text-[#7ca29d]",
        collected: "Rp 25.200.000",
        collectedColor: "text-[#7ca29d]",
        target: "Rp 35.000.000",
        buttonVariant: "primary" as const,
        contributions: [
            { name: "Dinda", initial: "D", amount: "+Rp 500.000", bgColor: "bg-[#e0f2f1]", textColor: "text-[#7ca29d]" },
            { name: "Raka", initial: "R", amount: "+Rp 1.200.000", bgColor: "bg-[#fef3c7]", textColor: "text-amber-600" },
            { name: "Dinda", initial: "D", amount: "+Rp 250.000", bgColor: "bg-[#e0f2f1]", textColor: "text-[#7ca29d]" },
        ],
    },
    {
        icon: "home_work",
        iconBg: "bg-[#fef3c7]",
        iconColor: "text-amber-600",
        title: "DP Rumah Impian",
        subtitle: "Selesai dalam 2 tahun",
        subtitleColor: "text-slate-500",
        progress: 15,
        progressColor: "text-amber-400",
        collected: "Rp 22.500.000",
        collectedColor: "text-amber-600",
        target: "Rp 150.000.000",
        buttonVariant: "dark" as const,
        contributions: [
            { name: "Raka", initial: "R", amount: "+Rp 2.500.000", bgColor: "bg-[#fef3c7]", textColor: "text-amber-600" },
            { name: "Dinda", initial: "D", amount: "+Rp 1.000.000", bgColor: "bg-[#e0f2f1]", textColor: "text-[#7ca29d]" },
            { name: "Raka", initial: "R", amount: "+Rp 2.500.000", bgColor: "bg-[#fef3c7]", textColor: "text-amber-600" },
        ],
    },
    {
        icon: "medical_services",
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        title: "Dana Darurat",
        subtitle: "Hampir Selesai! 🎉",
        subtitleColor: "text-slate-500",
        progress: 95,
        progressColor: "text-emerald-500",
        collected: "Rp 19.000.000",
        collectedColor: "text-emerald-600",
        target: "Rp 20.000.000",
        buttonVariant: "primary" as const,
        contributions: [
            { name: "Dinda", initial: "D", amount: "+Rp 150.000", bgColor: "bg-[#e0f2f1]", textColor: "text-[#7ca29d]" },
            { name: "Raka", initial: "R", amount: "+Rp 300.000", bgColor: "bg-[#fef3c7]", textColor: "text-amber-600" },
            { name: "Dinda", initial: "D", amount: "+Rp 200.000", bgColor: "bg-[#e0f2f1]", textColor: "text-[#7ca29d]" },
        ],
    },
];

export default function TargetPage() {
    const [isNewTargetModalOpen, setIsNewTargetModalOpen] = useState(false);
    const [isSavingsModalOpen, setIsSavingsModalOpen] = useState(false);
    const [selectedTarget, setSelectedTarget] = useState("Liburan ke Jepang");

    const handleSaveClick = (targetTitle: string) => {
        setSelectedTarget(targetTitle);
        setIsSavingsModalOpen(true);
    };

    const isAnyModalOpen = isNewTargetModalOpen || isSavingsModalOpen;

    return (
        <>
            <Navbar />

            {/* Modals */}
            <NewTargetModal isOpen={isNewTargetModalOpen} onClose={() => setIsNewTargetModalOpen(false)} />
            <SavingsModal
                isOpen={isSavingsModalOpen}
                onClose={() => setIsSavingsModalOpen(false)}
                defaultTarget={selectedTarget}
            />

            <main className={`max-w-7xl mx-auto px-8 py-10 ${isAnyModalOpen ? "blur-sm pointer-events-none" : ""}`}>
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold serif-vibe mb-2">
                            Target Masa Depan
                        </h1>
                        <p className="text-slate-500 font-medium">
                            Kelola dan pantau setiap impian yang kita bangun bersama.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsNewTargetModalOpen(true)}
                        className="flex items-center gap-2 bg-[#7ca29d] text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl shadow-[#7ca29d]/20 hover:bg-[#7ca29d]/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <span className="material-symbols-outlined">add_circle</span>
                        Tambah Target Baru
                    </button>
                </header>

                {/* Target Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {targetData.map((target, index) => (
                        <TargetGoalCard
                            key={index}
                            {...target}
                            onSaveClick={() => handleSaveClick(target.title)}
                        />
                    ))}

                    {/* Add New Target Card */}
                    <div
                        onClick={() => setIsNewTargetModalOpen(true)}
                        className="bg-white/40 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#7ca29d]/50 transition-all"
                    >
                        <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-[#7ca29d] transition-colors">
                                auto_awesome
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                            Mulai Impian Baru
                        </h3>
                        <p className="text-sm text-slate-400 mt-2 max-w-[200px]">
                            Punya rencana lain? Buat target baru sekarang.
                        </p>
                    </div>
                </div>

                {/* Stats Summary Section */}
                <section className="mt-16 bg-gradient-to-br from-[#7ca29d]/10 via-[#e0f2f1]/20 to-[#fef3c7]/20 rounded-[2.5rem] p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                        <div className="px-6 py-2 md:border-r border-slate-200">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                Rata-rata Menabung
                            </p>
                            <p className="text-3xl font-extrabold serif-vibe">
                                Rp 4.250.000
                                <span className="text-sm text-slate-400 font-sans font-medium">
                                    /bln
                                </span>
                            </p>
                        </div>
                        <div className="px-6 py-2 md:border-r border-slate-200">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                Target Terlampaui
                            </p>
                            <p className="text-3xl font-extrabold serif-vibe">
                                4{" "}
                                <span className="text-sm text-slate-400 font-sans font-medium">
                                    Tujuan
                                </span>
                            </p>
                        </div>
                        <div className="px-6 py-2">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                Kesehatan Tabungan
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <span className="material-symbols-outlined text-emerald-500">
                                    check_circle
                                </span>
                                <p className="text-3xl font-extrabold serif-vibe text-emerald-600">
                                    Sangat Sehat
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className={`mt-20 py-10 border-t border-slate-200/50 text-center ${isAnyModalOpen ? "blur-sm" : ""}`}>
                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        © 2024 Tabungan Bersama • Masa Depan Kita
                    </p>
                    <div className="flex gap-6">
                        <a
                            className="text-xs font-bold text-slate-400 hover:text-[#7ca29d] transition-colors"
                            href="#"
                        >
                            BANTUAN
                        </a>
                        <a
                            className="text-xs font-bold text-slate-400 hover:text-[#7ca29d] transition-colors"
                            href="#"
                        >
                            KEAMANAN
                        </a>
                        <a
                            className="text-xs font-bold text-slate-400 hover:text-[#7ca29d] transition-colors"
                            href="#"
                        >
                            PRIVASI
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
