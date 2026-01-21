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
                return (
                    <span className="material-symbols-outlined text-emerald-500">
                        trending_up
                    </span>
                );
            case "down":
                return (
                    <span className="material-symbols-outlined text-rose-400">
                        trending_down
                    </span>
                );
            default:
                return (
                    <span className="material-symbols-outlined text-slate-400">
                        trending_flat
                    </span>
                );
        }
    };

    return (
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-lg font-bold serif-vibe">Ringkasan Bulanan</h3>
                <button className="text-[#7ca29d] text-sm font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">download</span>{" "}
                    Unduh PDF
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50">
                            <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Bulan
                            </th>
                            <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                                Total Menabung
                            </th>
                            <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Kontribusi Terbesar
                            </th>
                            <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
                                Pertumbuhan
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {data.map((row) => (
                            <tr
                                key={row.month}
                                className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                                onClick={() => onRowClick?.(row.month)}
                            >
                                <td className="px-8 py-5 font-bold group-hover:text-[#7ca29d] transition-colors">
                                    <div className="flex items-center gap-2">
                                        {row.month}
                                        <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">visibility</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-right font-extrabold text-[#7ca29d]">
                                    {row.total}
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-6 h-6 rounded-full ${row.contributor.bgColor} flex items-center justify-center text-[10px] font-bold ${row.contributor.textColor}`}
                                        >
                                            {row.contributor.initial}
                                        </div>
                                        <span className="text-sm font-medium">
                                            {row.contributor.name} ({row.contributor.percentage})
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        {getTrendIcon(row.trend)}
                                        <span className={`text-xs font-bold ${row.trend === "up" ? "text-emerald-500" :
                                            row.trend === "down" ? "text-rose-500" :
                                                "text-slate-400"
                                            }`}>
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
