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
            className={`flex items-center justify-between p-2.5 md:p-4 bg-white rounded-md border-l-4 ${borderColor} shadow-sm gap-2`}
        >
            {/* Left: icon + info */}
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
                <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${iconBg} flex items-center justify-center shrink-0`}
                >
                    <span className={`material-symbols-outlined ${iconColor} text-base md:text-[24px]`}>
                        {icon}
                    </span>
                </div>
                <div className="min-w-0">
                    <p className="font-bold text-xs md:text-sm truncate">
                        {name}
                        {isYou && " (Kamu)"}
                    </p>
                    <p className="text-[10px] md:text-xs text-slate-400 truncate">
                        {source} • {time}
                    </p>
                </div>
            </div>

            {/* Right: amount + destination */}
            <div className="text-right shrink-0 max-w-[42%]">
                <p className={`font-extrabold ${amountColor} text-xs md:text-base leading-tight`}>{amount}</p>
                <p className="text-[9px] md:text-[10px] uppercase font-bold text-slate-400 tracking-wide truncate">
                    {destination}
                </p>
            </div>
        </div>
    );
}
