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

    // Calculate stroke dashoffset for progress ring
    // Circumference = 2 * π * r = 2 * 3.14159 * 84 ≈ 527.78
    const circumference = 527.78;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col xl:flex-row gap-10">
            {/* Progress Ring Section */}
            <div className="flex flex-col items-center justify-center xl:w-1/2">
                <div className="relative flex items-center justify-center mb-6">
                    <svg className="w-48 h-48 transform -rotate-90">
                        {/* Background Circle */}
                        <circle
                            className="text-slate-100"
                            cx="96"
                            cy="96"
                            fill="transparent"
                            r="84"
                            stroke="currentColor"
                            strokeWidth="12"
                        />
                        {/* Progress Circle */}
                        <circle
                            className={progressColor}
                            cx="96"
                            cy="96"
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
                        <span className="text-4xl font-black serif-vibe text-slate-800">
                            {progress}%
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Tercapai
                        </span>
                    </div>
                </div>
                <div className="text-center">
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

            {/* Details Section */}
            <div className="xl:w-1/2 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                    <div
                        className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center ${iconColor}`}
                    >
                        <span className="material-symbols-outlined text-3xl">{icon}</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{title}</h3>
                        <p className={`text-sm font-medium ${subtitleColor}`}>{subtitle}</p>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Kontribusi Terakhir
                    </p>
                    {contributions.map((contrib, index) => (
                        <div key={index} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-8 h-8 rounded-full ${contrib.bgColor} flex items-center justify-center text-[10px] font-bold ${contrib.textColor}`}
                                >
                                    {contrib.initial}
                                </div>
                                <span className="text-sm font-semibold">{contrib.name}</span>
                            </div>
                            <span className="text-sm font-bold text-slate-700">
                                {contrib.amount}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-auto flex gap-3 relative" ref={menuRef}>
                    <button
                        onClick={onSaveClick}
                        disabled={progress >= 100}
                        className={`flex-1 py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all hover:opacity-90 ${progress >= 100
                            ? "bg-slate-200 text-slate-500 cursor-not-allowed shadow-none"
                            : buttonVariant === "primary"
                                ? "bg-[#7ca29d] text-white shadow-[#7ca29d]/20"
                                : "bg-slate-900 text-white"
                            }`}
                    >
                        {progress >= 100 ? "Target Tercapai ✨" : "Menabung"}
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="px-4 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors relative"
                    >
                        <span className="material-symbols-outlined">settings</span>
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20">
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    onDetail?.();
                                }}
                                className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-[#7ca29d]/5 transition-colors group"
                            >
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-[#7ca29d] text-xl transition-colors">history</span>
                                <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">Lihat Detail</span>
                            </button>
                            <div className="h-px bg-slate-100 mx-4 my-1"></div>
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    onEdit?.();
                                }}
                                className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-slate-50 transition-colors"
                            >
                                <span className="material-symbols-outlined text-slate-400 text-xl">edit_note</span>
                                <span className="text-sm font-bold text-slate-600">Ubah Target</span>
                            </button>
                            <div className="h-px bg-slate-100 mx-4 my-1"></div>
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    if (confirm("Apakah Anda yakin ingin menghapus target ini? Semua riwayat tabungan terkait juga akan dihapus.")) {
                                        onDelete?.();
                                    }
                                }}
                                className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-rose-50 transition-colors text-rose-500"
                            >
                                <span className="material-symbols-outlined text-rose-400 text-xl text-rose-500">delete_forever</span>
                                <span className="text-sm font-bold">Hapus Target</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
