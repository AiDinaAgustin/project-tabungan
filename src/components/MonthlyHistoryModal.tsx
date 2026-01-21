"use client";

interface SavingsItem {
    id: string;
    amount: string;
    source: string;
    createdAt: string;
    targetTitle: string;
    userName: string;
}

interface MonthlyHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    monthName: string;
    history: SavingsItem[];
}

export default function MonthlyHistoryModal({
    isOpen,
    onClose,
    monthName,
    history,
}: MonthlyHistoryModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="bg-gradient-to-br from-[#7ca29d] to-[#5a837e] p-8 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <h2 className="text-3xl font-extrabold serif-vibe mb-2">Riwayat Tabungan</h2>
                    <p className="opacity-90 font-medium">{monthName}</p>
                </div>

                {/* Content */}
                <div className="p-8 max-h-[60vh] overflow-y-auto">
                    {history.length > 0 ? (
                        <div className="space-y-4">
                            {history.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:shadow-md transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#7ca29d]">
                                            <span className="material-symbols-outlined text-xl">savings</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{item.targetTitle}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] font-bold text-[#7ca29d] uppercase tracking-wider">{item.userName}</span>
                                                <span className="text-slate-300">•</span>
                                                <span className="text-xs text-slate-400 font-medium">
                                                    {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-base font-black text-emerald-600">
                                            +Rp {parseInt(item.amount).toLocaleString("id-ID")}
                                        </p>
                                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{item.source}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <span className="material-symbols-outlined text-4xl text-slate-200">history_toggle_off</span>
                            <p className="text-slate-400 mt-2 font-medium">Tidak ada riwayat tabungan di bulan ini.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
