"use client";

import { useEffect, useState } from "react";

interface TargetCalculatorProps {
    selectedIds: string[];
    targets: any[];
    onClose: () => void;
}

export default function TargetCalculator({
    selectedIds,
    targets,
    onClose,
}: TargetCalculatorProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Animate in when at least 1 target is selected
        if (selectedIds.length >= 1) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [selectedIds.length]);

    const selected = targets.filter((t) => selectedIds.includes(t.id));
    const totalCollected = selected.reduce(
        (sum, t) => sum + parseFloat(t.collectedAmount || "0"),
        0
    );
    const totalGoal = selected.reduce(
        (sum, t) => sum + parseFloat(t.targetAmount || "0"),
        0
    );
    const totalProgress =
        totalGoal > 0 ? Math.min(Math.round((totalCollected / totalGoal) * 100), 100) : 0;
    const remaining = Math.max(totalGoal - totalCollected, 0);

    const fmt = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

    // Circumference for the ring
    const radius = 26;
    const circ = 2 * Math.PI * radius;
    const offset = circ - (totalProgress / 100) * circ;

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
                visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
        >
            {/* Backdrop blur strip */}
            <div className="bg-white/80 backdrop-blur-xl border-t border-slate-200/70 shadow-2xl shadow-slate-900/15">
                <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 md:px-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">

                        {/* Left: Title + selected chips */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="material-symbols-outlined text-[#7ca29d] text-lg">calculate</span>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                    Kalkulator Target
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {selected.map((t) => (
                                    <span
                                        key={t.id}
                                        className="inline-flex items-center gap-1 bg-[#e0f2f1] text-[#7ca29d] text-[11px] font-semibold px-2.5 py-1 rounded-full"
                                    >
                                        <span className="material-symbols-outlined text-[13px]">
                                            {t.icon || "savings"}
                                        </span>
                                        {t.title}
                                    </span>
                                ))}
                                {selectedIds.length === 0 && (
                                    <span className="text-xs text-slate-400 italic">
                                        Centang target untuk mulai menghitung...
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Middle: Stats */}
                        <div className="flex items-center gap-4 md:gap-8">
                            {/* Mini ring */}
                            <div className="relative flex items-center justify-center w-16 h-16 flex-shrink-0">
                                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 72 72">
                                    <circle
                                        cx="36" cy="36" r={radius}
                                        fill="none" stroke="#e0f2f1" strokeWidth="7"
                                    />
                                    <circle
                                        cx="36" cy="36" r={radius}
                                        fill="none"
                                        stroke="#7ca29d"
                                        strokeWidth="7"
                                        strokeLinecap="round"
                                        strokeDasharray={circ}
                                        strokeDashoffset={offset}
                                        className="transition-all duration-700 ease-in-out"
                                    />
                                </svg>
                                <span className="absolute text-[11px] font-extrabold text-slate-700">
                                    {totalProgress}%
                                </span>
                            </div>

                            {/* Numbers */}
                            <div className="grid grid-cols-3 gap-4 md:gap-8">
                                <div className="text-center md:text-left">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                                        Terkumpul
                                    </p>
                                    <p className="text-sm md:text-xl font-extrabold text-[#7ca29d] leading-tight">
                                        {fmt(totalCollected)}
                                    </p>
                                </div>
                                <div className="text-center md:text-left">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                                        Total Target
                                    </p>
                                    <p className="text-sm md:text-xl font-extrabold text-slate-700 leading-tight">
                                        {fmt(totalGoal)}
                                    </p>
                                </div>
                                <div className="text-center md:text-left">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                                        Sisa
                                    </p>
                                    <p className="text-sm md:text-xl font-extrabold text-amber-500 leading-tight">
                                        {fmt(remaining)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Close */}
                        <button
                            onClick={onClose}
                            className="self-start md:self-center flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                            title="Tutup kalkulator"
                        >
                            <span className="material-symbols-outlined text-base text-slate-500">close</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
