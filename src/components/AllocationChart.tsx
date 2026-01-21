interface AllocationChartProps {
    allocations: {
        name: string;
        percentage: number;
        color: string;
    }[];
}

export default function AllocationChart({ allocations }: AllocationChartProps) {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold serif-vibe mb-6">Alokasi Dana</h3>
            <div className="relative w-48 h-48 mx-auto mb-8">
                <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                >
                    {/* Background Circle */}
                    <circle
                        className="text-slate-50"
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="14"
                    />
                    {/* DP Rumah Impian - 40% */}
                    <circle
                        className="text-amber-400"
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="40"
                        stroke="currentColor"
                        strokeDasharray="251.2"
                        strokeDashoffset="150.72"
                        strokeLinecap="round"
                        strokeWidth="14"
                    />
                    {/* Liburan Jepang - 35% */}
                    <circle
                        className="text-[#7ca29d]"
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="40"
                        stroke="currentColor"
                        strokeDasharray="251.2"
                        strokeDashoffset="163.28"
                        strokeLinecap="round"
                        strokeWidth="14"
                        transform="rotate(144 50 50)"
                    />
                    {/* Dana Darurat - 25% */}
                    <circle
                        className="text-slate-300"
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="40"
                        stroke="currentColor"
                        strokeDasharray="251.2"
                        strokeDashoffset="188.4"
                        strokeLinecap="round"
                        strokeWidth="14"
                        transform="rotate(270 50 50)"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        Terbagi
                    </span>
                    <span className="text-xl font-extrabold">3 Kategori</span>
                </div>
            </div>
            <div className="space-y-3">
                {allocations.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: item.color }}
                            ></span>
                            <span className="font-medium">{item.name}</span>
                        </div>
                        <span className="font-bold">{item.percentage}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
