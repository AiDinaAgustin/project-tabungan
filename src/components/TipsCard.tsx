export default function TipsCard() {
    return (
        <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100">
            <div className="flex gap-3">
                <span className="material-symbols-outlined text-emerald-600">
                    lightbulb
                </span>
                <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                    <span className="font-bold">Tips Hari Ini:</span> Mengalokasikan sisa
                    uang jajan ke &apos;Dana Darurat&apos; secara konsisten dapat mempercepat
                    target 3 hari lebih awal!
                </p>
            </div>
        </div>
    );
}
