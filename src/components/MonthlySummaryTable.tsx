interface MonthlySummaryRow {
    month: string;
    total: string;
    contributor: {
        name: string;
        initial: string;
        percentage: string;
        bgColor: string;
        textColor: string;
    };
    growth: string;
    trend: "up" | "down" | "flat";
}

interface MonthlySummaryTableProps {
    data: MonthlySummaryRow[];
    onRowClick?: (month: string) => void;
}

export default function MonthlySummaryTable({ data, onRowClick }: MonthlySummaryTableProps) {
    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case "up":
                return <span className="material-symbols-outlined text-emerald-500 text-base md:text-[24px]">trending_up</span>;
            case "down":
                return <span className="material-symbols-outlined text-rose-400 text-base md:text-[24px]">trending_down</span>;
            default:
                return <span className="material-symbols-outlined text-slate-400 text-base md:text-[24px]">trending_flat</span>;
        }
    };

    return (
        <section className="bg-white rounded-md shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 md:p-8 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-sm md:text-lg font-bold serif-vibe">Ringkasan Bulanan</h3>
                <button className="text-[#7ca29d] text-xs md:text-sm font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">download</span>{" "}
                    Unduh PDF
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50">
                            <th className="px-3 md:px-8 py-2.5 md:py-4 text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Bulan</th>
                            <th className="px-3 md:px-8 py-2.5 md:py-4 text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Total</th>
                            <th className="px-3 md:px-8 py-2.5 md:py-4 text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Kontributor</th>
                            <th className="px-3 md:px-8 py-2.5 md:py-4 text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Tren</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {data.map((row) => (
                            <tr
                                key={row.month}
                                className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                                onClick={() => onRowClick?.(row.month)}
                            >
                                <td className="px-3 md:px-8 py-3 md:py-5 font-bold text-xs md:text-base group-hover:text-[#7ca29d] transition-colors">
                                    <div className="flex items-center gap-1.5">
                                        {row.month}
                                        <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity">visibility</span>
                                    </div>
                                </td>
                                <td className="px-3 md:px-8 py-3 md:py-5 text-right font-extrabold text-[#7ca29d] text-xs md:text-base">
                                    {row.total}
                                </td>
                                <td className="px-3 md:px-8 py-3 md:py-5 hidden sm:table-cell">
                                    <div className="flex items-center gap-1.5 md:gap-2">
                                        <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full ${row.contributor.bgColor} flex items-center justify-center text-[9px] md:text-[10px] font-bold ${row.contributor.textColor}`}>
                                            {row.contributor.initial}
                                        </div>
                                        <span className="text-xs md:text-sm font-medium">
                                            {row.contributor.name} ({row.contributor.percentage})
                                        </span>
                                    </div>
                                </td>
                                <td className="px-3 md:px-8 py-3 md:py-5 text-center">
                                    <div className="flex items-center justify-center gap-1 md:gap-2">
                                        {getTrendIcon(row.trend)}
                                        <span className={`text-[10px] md:text-xs font-bold ${row.trend === "up" ? "text-emerald-500" : row.trend === "down" ? "text-rose-500" : "text-slate-400"}`}>
                                            {row.growth === "0%" ? "-" : row.growth}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
