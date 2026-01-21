"use client";

import { useState, useEffect } from "react";
import { withdrawSavings } from "@/lib/actions/savings";
import { getTargets } from "@/lib/actions/target";

interface WithdrawModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTarget?: any;
}

export default function WithdrawModal({
    isOpen,
    onClose,
    defaultTarget,
}: WithdrawModalProps) {
    const [amount, setAmount] = useState("");
    const [reason, setReason] = useState("");
    const [targetId, setTargetId] = useState("");
    const [targets, setTargets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const init = async () => {
            if (isOpen) {
                const [targetsData, userData] = await Promise.all([
                    getTargets(),
                    import("@/lib/actions/auth").then(m => m.getCurrentUser())
                ]);
                // For withdrawal, we show all targets that have some money
                const targetsWithMoney = targetsData.filter(
                    (t) => Number(t.collectedAmount) > 0
                );
                setTargets(targetsWithMoney);
                setUser(userData);
                if (defaultTarget) setTargetId(defaultTarget.id);
            }
        };
        init();
    }, [isOpen, defaultTarget]);

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const selectedTarget = targets.find(t => t.id === targetId);
        if (selectedTarget && Number(amount) > Number(selectedTarget.collectedAmount)) {
            setError("Jumlah penarikan melebihi saldo yang ada");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("targetId", targetId);
        formData.append("amount", amount);
        formData.append("source", reason || "Penarikan Dana");

        const result = await withdrawSavings(formData);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            setLoading(false);
            setAmount("");
            setReason("");
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl shadow-rose-900/20 border border-slate-100 relative z-10">
                {/* Header */}
                <div className="bg-gradient-to-br from-rose-50 to-rose-100/30 p-8 text-center relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl border border-rose-100">
                            <span className="material-symbols-outlined text-rose-500 text-4xl">
                                payments
                            </span>
                        </div>
                        <h2 className="text-2xl font-extrabold serif-vibe text-slate-800">
                            Ambil Uang
                        </h2>
                        <p className="text-sm font-medium text-slate-600 mt-1">
                            Gunakan dana dari target yang sudah terkumpul.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/50 flex items-center justify-center hover:bg-white transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-8">
                    <form className="space-y-6" onSubmit={handleWithdraw}>
                        {error && (
                            <div className="bg-red-50 text-red-500 text-xs p-4 rounded-xl border border-red-100 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">error</span>
                                {error}
                            </div>
                        )}

                        {/* Target Selection */}
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                                Ambil Dari Target
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-rose-500/20 outline-none"
                                    value={targetId}
                                    onChange={(e) => {
                                        setTargetId(e.target.value);
                                        setError("");
                                    }}
                                    required
                                >
                                    <option value="">Pilih Target</option>
                                    {targets.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.title} (Saldo: Rp {Number(t.collectedAmount).toLocaleString("id-ID")})
                                        </option>
                                    ))}
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                    unfold_more
                                </span>
                            </div>
                        </div>

                        {/* Amount Selection */}
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                                Jumlah yang Diambil
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                                    Rp
                                </span>
                                <input
                                    type="number"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-lg font-extrabold focus:ring-2 focus:ring-rose-500/20 placeholder:text-slate-300 outline-none"
                                    placeholder="Ketik nominal..."
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Reason Selection */}
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                                Keperluan / Alasan (Opsional)
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-rose-500/20 placeholder:text-slate-300 outline-none"
                                placeholder="Contoh: Beli tiket konser..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-rose-500 text-white py-4 rounded-2xl font-extrabold text-lg shadow-xl shadow-rose-500/30 hover:bg-rose-600 transition-all transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <span className="animate-spin material-symbols-outlined">sync</span>
                            ) : (
                                <span className="material-symbols-outlined">outbox</span>
                            )}
                            {loading ? "Memproses..." : "Ambil Dana"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
