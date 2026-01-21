interface FinancialInsightsProps {
    data: any[];
}

export default function FinancialInsights({ data = [] }: FinancialInsightsProps) {
    const totalRaw = data.reduce((sum, item) => sum + parseFloat(item.totalAmount), 0);

    // Sort data to keep colors consistent (e.g. current user first if possible, or just by alpha)
    const sortedData = [...data].sort((a, b) => b.totalAmount - a.totalAmount);

    const getStrokeProps = (idx: number) => {
        const percentage = totalRaw > 0 ? (parseFloat(sortedData[idx].totalAmount) / totalRaw) * 100 : 0;
        const circumference = 251.2;
        const segmentLength = (circumference * percentage) / 100;

        let cumulativeRotation = 0;
        for (let i = 0; i < idx; i++) {
            const p = (parseFloat(sortedData[i].totalAmount) / totalRaw) * 100;
            cumulativeRotation += (p / 100) * 360;
        }

        return {
            strokeDasharray: `${segmentLength} ${circumference}`,
            rotation: cumulativeRotation
        };
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold serif-vibe mb-6">Wawasan Keuangan</h3>

            <div className="relative w-48 h-48 mx-auto mb-8">
                <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                >
                    {/* Background Circle */}
                    <circle
                        className="text-slate-100"
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="12"
                    />

                    {sortedData.map((item, idx) => {
                        const { strokeDasharray, rotation } = getStrokeProps(idx);
                        return (
                            <circle
                                key={item.userId}
                                className={idx === 0 ? "text-[#7ca29d]" : "text-amber-400"}
                                cx="50"
                                cy="50"
                                fill="transparent"
                                r="40"
                                stroke="currentColor"
                                strokeDasharray={strokeDasharray}
                                strokeDashoffset={0}
                                strokeLinecap="round"
                                strokeWidth="12"
                                transform={`rotate(${rotation} 50 50)`}
                                style={{ transition: 'all 0.5s ease-in-out' }}
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-slate-400 uppercase text-center px-4">
                        Tabungan Bulan Ini
                    </span>
                    <span className="text-xl font-extrabold">
                        {totalRaw > 0 ? '100%' : '0%'}
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-sm font-semibold text-center text-slate-500 mb-4">
                    {totalRaw > 0
                        ? "Kontribusi tabungan bulan ini"
                        : "Belum ada tabungan bulan ini"}
                </p>

                {sortedData.map((item, idx) => {
                    const percentage = totalRaw > 0 ? Math.round((parseFloat(item.totalAmount) / totalRaw) * 100) : 0;
                    const isPrimary = idx === 0;

                    return (
                        <div
                            key={item.userId}
                            className={`flex items-center justify-between p-3 rounded-xl ${isPrimary ? 'bg-[#e0f2f1]' : 'bg-[#fef3c7]'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${isPrimary ? 'bg-[#7ca29d]' : 'bg-amber-400'}`}>
                                    {item.userName?.[0] || '?'}
                                </div>
                                <span className="text-sm font-bold text-slate-700">{item.userName}</span>
                            </div>
                            <span className={`text-sm font-black ${isPrimary ? 'text-[#7ca29d]' : 'text-amber-600'}`}>
                                {percentage}%
                            </span>
                        </div>
                    );
                })}

                {sortedData.length === 0 && (
                    <div className="py-4 text-center">
                        <p className="text-xs text-slate-400 font-medium italic">Data tidak tersedia</p>
                    </div>
                )}
            </div>
        </div>
    );
}
