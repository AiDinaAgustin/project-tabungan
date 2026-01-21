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
                    {allocations.map((item, idx) => {
                        const circumference = 251.2;
                        const dashArray = (item.percentage / 100) * circumference;

                        let cumulativePercentage = 0;
                        for (let i = 0; i < idx; i++) {
                            cumulativePercentage += allocations[i].percentage;
                        }
                        const rotation = (cumulativePercentage / 100) * 360;

                        return (
                            <circle
                                key={item.name}
                                cx="50"
                                cy="50"
                                fill="transparent"
                                r="40"
                                stroke={item.color}
                                strokeDasharray={`${dashArray} ${circumference}`}
                                strokeDashoffset="0"
                                strokeLinecap="round"
                                strokeWidth="14"
                                transform={`rotate(${rotation} 50 50)`}
                                style={{ transition: 'all 0.5s ease' }}
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        Terbagi
                    </span>
                    <span className="text-xl font-extrabold whitespace-nowrap px-4">
                        {allocations.length} Kategori
                    </span>
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
