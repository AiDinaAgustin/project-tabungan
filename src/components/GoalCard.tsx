interface GoalCardProps {
    icon: string;
    iconColor: string;
    iconBg: string;
    title: string;
    target: string;
    progress: number;
    collected: string;
    progressColor: string;
    progressTextColor: string;
    isPrimary?: boolean;
    onSaveClick?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onDetail?: () => void;
}

import { useState, useRef, useEffect } from "react";

export default function GoalCard({
    icon,
    iconColor,
    iconBg,
    title,
    target,
    progress,
    collected,
    progressColor,
    progressTextColor,
    isPrimary = false,
    onSaveClick,
    onEdit,
    onDelete,
    onDetail,
}: GoalCardProps) {
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

    return (
        <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 relative">
            <div className="absolute top-6 right-6" ref={menuRef}>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
                >
                    <span className="material-symbols-outlined text-xl">more_vert</span>
                </button>

                {isMenuOpen && (
                    <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-30">
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                onDetail?.();
                            }}
                            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-[#7ca29d]/5 transition-colors group"
                        >
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-[#7ca29d] text-lg transition-colors">history</span>
                            <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">Detail</span>
                        </button>
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                onEdit?.();
                            }}
                            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-slate-50 transition-colors"
                        >
                            <span className="material-symbols-outlined text-slate-400 text-lg">edit</span>
                            <span className="text-sm font-bold text-slate-600">Edit</span>
                        </button>
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                if (confirm("Hapus target ini?")) {
                                    onDelete?.();
                                }
                            }}
                            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-rose-50 transition-colors text-rose-500"
                        >
                            <span className="material-symbols-outlined text-rose-400 text-lg">delete</span>
                            <span className="text-sm font-bold">Hapus</span>
                        </button>
                    </div>
                )}
            </div>

            <div
                className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}
            >
                <span className={`material-symbols-outlined ${iconColor} text-3xl`}>
                    {icon}
                </span>
            </div>
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            <p className="text-sm text-slate-500 mb-6">Target: {target}</p>
            <div className="w-full bg-slate-100 h-2.5 rounded-full mb-2 overflow-hidden">
                <div
                    className={`${progressColor} h-full rounded-full transition-all duration-1000`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="flex justify-between text-xs font-bold mb-6">
                <span className={progressTextColor}>{progress}% Terkumpul</span>
                <span className="text-slate-400">{collected}</span>
            </div>
            <button
                onClick={onSaveClick}
                disabled={progress >= 100}
                className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${progress >= 100
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                    : isPrimary
                        ? "bg-[#7ca29d] text-white shadow-lg shadow-[#7ca29d]/20 hover:bg-[#7ca29d]/90"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100"
                    }`}
            >
                <span className="material-symbols-outlined text-lg">
                    {progress >= 100 ? "stars" : "add_circle"}
                </span>
                {progress >= 100 ? "Target Tercapai ✨" : "Menabung"}
            </button>
        </div>
    );
}
