export default function FinancialInsights() {
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
                    {/* Segment 1 (Partner A) */}
                    <circle
                        className="text-[#7ca29d]"
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="40"
                        stroke="currentColor"
                        strokeDasharray="251.2"
                        strokeDashoffset="100.48"
                        strokeLinecap="round"
                        strokeWidth="12"
                    />
                    {/* Segment 2 (Partner B) */}
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
                        strokeWidth="12"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-slate-400 uppercase">
                        Total Saving
                    </span>
                    <span className="text-xl font-extrabold">100%</span>
                </div>
            </div>
            <div className="space-y-4">
                <p className="text-sm font-semibold text-center text-slate-500 mb-4">
                    Siapa yang menabung paling banyak bulan ini?
                </p>
                <div className="flex items-center justify-between p-3 bg-[#e0f2f1] rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#7ca29d] flex items-center justify-center text-white text-xs font-bold">
                            D
                        </div>
                        <span className="text-sm font-bold">Dinda</span>
                    </div>
                    <span className="text-sm font-black text-[#7ca29d]">60%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#fef3c7] rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-white text-xs font-bold">
                            R
                        </div>
                        <span className="text-sm font-bold">Raka</span>
                    </div>
                    <span className="text-sm font-black text-amber-600">40%</span>
                </div>
            </div>
        </div>
    );
}
