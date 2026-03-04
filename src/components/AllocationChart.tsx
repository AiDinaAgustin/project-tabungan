interface AllocationChartProps {
    allocations: {
        name: string;
        percentage: number;
        color: string;
    }[];
}

export default function AllocationChart({ allocations }: AllocationChartProps) {
    return (
        <div className="bg-white p-4 md:p-8 rounded-md shadow-sm border border-slate-100">
            <h3 className="text-sm md:text-lg font-bold serif-vibe mb-3 md:mb-6">Alokasi Dana</h3>
            <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 md:mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                        className="text-slate-50"
                        cx="50" cy="50"
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
                                cx="50" cy="50"
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
                    <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        Terbagi
                    </span>
                    <span className="text-base md:text-xl font-extrabold whitespace-nowrap">
                        {allocations.length} Kategori
                    </span>
                </div>
            </div>
            <div className="space-y-2 md:space-y-3">
                {allocations.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs md:text-sm">
                        <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                            <span className="font-medium truncate">{item.name}</span>
                        </div>
                        <span className="font-bold shrink-0 ml-1">{item.percentage}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
