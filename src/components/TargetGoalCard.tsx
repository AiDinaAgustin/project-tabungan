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
}: TargetGoalCardProps) {
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

                <div className="mt-auto flex gap-3">
                    <button
                        onClick={onSaveClick}
                        className={`flex-1 py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all hover:opacity-90 ${buttonVariant === "primary"
                                ? "bg-[#7ca29d] text-white shadow-[#7ca29d]/20"
                                : "bg-slate-900 text-white"
                            }`}
                    >
                        Menabung
                    </button>
                    <button className="px-4 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
