import { useState, useRef, useEffect } from "react";

interface Contribution {
    name: string;
    initial: string;
    amount: string;
    bgColor: string;
    textColor: string;
}

interface TargetGoalCardProps {
    icon: string;
    iconBg: string;
    iconColor: string;
    title: string;
    subtitle: string;
    subtitleColor?: string;
    progress: number;
    progressColor: string;
    collected: string;
    collectedColor: string;
    target: string;
    contributions: Contribution[];
    buttonVariant?: "primary" | "dark";
    onSaveClick?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onDetail?: () => void;
    onWithdraw?: () => void;
}

export default function TargetGoalCard({
    icon,
    iconBg,
    iconColor,
    title,
    subtitle,
    subtitleColor = "text-slate-500",
    progress,
    progressColor,
    collected,
    collectedColor,
    target,
    contributions,
    buttonVariant = "primary",
    onSaveClick,
    onEdit,
    onDelete,
    onDetail,
    onWithdraw,
}: TargetGoalCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // viewBox-based circle — scales responsively with CSS width/height
    const circumference = 527.78; // 2 * π * 84
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="bg-white rounded-md p-4 md:p-8 shadow-sm border border-slate-100">

            {/* Mobile: row layout | Desktop: stacked then xl row */}
            <div className="flex flex-row gap-4 md:flex-col xl:flex-row md:gap-6 xl:gap-10">

                {/* Progress Ring */}
                <div className="flex flex-col items-center justify-center shrink-0 xl:w-1/2">
                    <div className="relative flex items-center justify-center mb-2 md:mb-6">
                        <svg
                            className="w-24 h-24 md:w-48 md:h-48 transform -rotate-90"
                            viewBox="0 0 192 192"
                        >
                            <circle
                                className="text-slate-100"
                                cx="96" cy="96"
                                fill="transparent"
                                r="84"
                                stroke="currentColor"
                                strokeWidth="12"
                            />
                            <circle
                                className={progressColor}
                                cx="96" cy="96"
                                fill="transparent"
                                r="84"
                                stroke="currentColor"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                strokeWidth="12"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                            <span className="text-xl md:text-4xl font-black serif-vibe text-slate-800">
                                {progress}%
                            </span>
                            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                Tercapai
                            </span>
                        </div>
                    </div>

                    {/* Collected info — hidden on mobile (shown in right column) */}
                    <div className="text-center hidden md:block">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">
                            Total Terkumpul
                        </p>
                        <p className={`text-2xl font-extrabold ${collectedColor} mb-1`}>
                            {collected}
                        </p>
                        <p className="text-sm text-slate-400">
                            dari target <span className="font-bold">{target}</span>
                        </p>
                    </div>
                </div>

                {/* Details */}
                <div className="xl:w-1/2 flex flex-col min-w-0 flex-1">
                    {/* Icon + title */}
                    <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-6">
                        <div className={`w-9 h-9 md:w-14 md:h-14 shrink-0 ${iconBg} rounded-lg flex items-center justify-center ${iconColor}`}>
                            <span className="material-symbols-outlined text-lg md:text-3xl">{icon}</span>
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-sm md:text-xl font-bold truncate">{title}</h3>
                            <p className={`text-[10px] md:text-sm font-medium ${subtitleColor} truncate`}>{subtitle}</p>
                        </div>
                    </div>

                    {/* Collected info — mobile only */}
                    <div className="md:hidden mb-2">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Terkumpul</p>
                        <p className={`text-sm font-extrabold ${collectedColor}`}>{collected}</p>
                        <p className="text-[10px] text-slate-400">dari target <span className="font-bold">{target}</span></p>
                    </div>

                    {/* Contributions */}
                    <div className="space-y-1.5 md:space-y-4 mb-3 md:mb-8">
                        <p className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Kontribusi Terakhir
                        </p>
                        {contributions.map((contrib, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 md:gap-3 min-w-0">
                                    <div className={`w-6 h-6 md:w-8 md:h-8 shrink-0 rounded-full ${contrib.bgColor} flex items-center justify-center text-[9px] md:text-[10px] font-bold ${contrib.textColor}`}>
                                        {contrib.initial}
                                    </div>
                                    <span className="text-[10px] md:text-sm font-semibold truncate">{contrib.name}</span>
                                </div>
                                <span className="text-[10px] md:text-sm font-bold text-slate-700 shrink-0 ml-1">
                                    {contrib.amount}
                                </span>
                            </div>
                        ))}
                        {contributions.length === 0 && (
                            <p className="text-[10px] md:text-xs text-slate-300 italic">Belum ada kontribusi</p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="mt-auto flex gap-2 relative" ref={menuRef}>
                        <button
                            onClick={onSaveClick}
                            disabled={progress >= 100}
                            className={`flex-1 py-2 md:py-3.5 rounded-md font-bold text-xs md:text-sm shadow-md transition-all hover:opacity-90 ${progress >= 100
                                ? "bg-slate-200 text-slate-500 cursor-not-allowed shadow-none"
                                : buttonVariant === "primary"
                                    ? "bg-[#7ca29d] text-white shadow-[#7ca29d]/20"
                                    : "bg-slate-900 text-white"
                                }`}
                        >
                            {progress >= 100 ? "Tercapai ✨" : "Menabung"}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="px-2.5 md:px-4 text-slate-600 rounded-sm hover:bg-slate-200 transition-colors"
                        >
                            <span className="material-symbols-outlined text-base md:text-[24px]">settings</span>
                        </button>

                        {isMenuOpen && (
                            <div className="absolute bottom-full right-0 mb-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-20">
                                {[
                                    { label: "Lihat Detail", icon: "history", action: onDetail, color: "hover:bg-[#7ca29d]/5" },
                                    { label: "Ambil Uang", icon: "payments", action: onWithdraw, color: "hover:bg-rose-50" },
                                ].map(({ label, icon, action, color }) => (
                                    <button
                                        key={label}
                                        onClick={() => { setIsMenuOpen(false); action?.(); }}
                                        className={`w-full px-3 py-2 text-left flex items-center gap-2 ${color} transition-colors`}
                                    >
                                        <span className="material-symbols-outlined text-slate-400 text-base">{icon}</span>
                                        <span className="text-xs font-bold text-slate-600">{label}</span>
                                    </button>
                                ))}
                                <div className="h-px bg-slate-100 mx-3 my-1" />
                                <button
                                    onClick={() => { setIsMenuOpen(false); onEdit?.(); }}
                                    className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-50 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-slate-400 text-base">edit_note</span>
                                    <span className="text-xs font-bold text-slate-600">Ubah Target</span>
                                </button>
                                <div className="h-px bg-slate-100 mx-3 my-1" />
                                <button
                                    onClick={() => { setIsMenuOpen(false); if (confirm("Hapus target ini? Semua riwayat terkait juga akan dihapus.")) { onDelete?.(); } }}
                                    className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-rose-50 transition-colors text-rose-500"
                                >
                                    <span className="material-symbols-outlined text-rose-400 text-base">delete_forever</span>
                                    <span className="text-xs font-bold">Hapus Target</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
