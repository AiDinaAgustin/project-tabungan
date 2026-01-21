interface HistoryItemProps {
    name: string;
    isYou?: boolean;
    source: string;
    time: string;
    amount: string;
    destination: string;
    borderColor: string;
    iconBg: string;
    iconColor: string;
    icon: string;
    amountColor: string;
}

export default function HistoryItem({
    name,
    isYou = false,
    source,
    time,
    amount,
    destination,
    borderColor,
    iconBg,
    iconColor,
    icon,
    amountColor,
}: HistoryItemProps) {
    return (
        <div
            className={`flex items-center justify-between p-4 bg-white rounded-2xl border-l-4 ${borderColor} shadow-sm`}
        >
            <div className="flex items-center gap-4">
                <div
                    className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center`}
                >
                    <span className={`material-symbols-outlined ${iconColor}`}>
                        {icon}
                    </span>
                </div>
                <div>
                    <p className="font-bold text-sm">
                        {name}
                        {isYou && " (Kamu)"}
                    </p>
                    <p className="text-xs text-slate-400">
                        {source} • {time}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className={`font-extrabold ${amountColor} text-lg`}>{amount}</p>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {destination}
                </p>
            </div>
        </div>
    );
}
