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
}

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
}: GoalCardProps) {
    return (
        <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100">
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
                className={`w-full py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${isPrimary
                    ? "bg-[#7ca29d] text-white shadow-lg shadow-[#7ca29d]/20 hover:bg-[#7ca29d]/90"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
            >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                Menabung
            </button>
        </div>
    );
}
