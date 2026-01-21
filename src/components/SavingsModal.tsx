"use client";

import { useState, useEffect } from "react";
import { addSavings } from "@/lib/actions/savings";
import { getTargets } from "@/lib/actions/target";

interface SavingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTarget?: any;
}

const QUICK_AMOUNTS = [
    { label: "50rb", value: "50000" },
    { label: "100rb", value: "100000" },
    { label: "500rb", value: "500000" }
];

export default function SavingsModal({
    isOpen,
    onClose,
    defaultTarget,
}: SavingsModalProps) {
    const [amount, setAmount] = useState("");
    const [targetId, setTargetId] = useState("");
    const [targets, setTargets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useState<any>(null);
    const [saverId, setSaverId] = useState("");

    useEffect(() => {
        const init = async () => {
            if (isOpen) {
                const [targetsData, userData] = await Promise.all([
                    getTargets(),
                    import("@/lib/actions/auth").then(m => m.getCurrentUser())
                ]);
                const filteredTargets = targetsData.filter(
                    (t) => Number(t.collectedAmount) < Number(t.targetAmount)
                );
                setTargets(filteredTargets);
                setUser(userData);
                if (userData) setSaverId(userData.id);
                if (defaultTarget) setTargetId(defaultTarget.id);
            }
        };
        init();
    }, [isOpen, defaultTarget]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("targetId", targetId);
        formData.append("amount", amount);
        formData.append("source", "Tabungan Jago");
        formData.append("userId", saverId);

        const result = await addSavings(formData);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            setLoading(false);
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
            <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#7ca29d]/20 border border-slate-100 relative z-10">
                {/* Header */}
                <div className="bg-gradient-to-br from-[#7ca29d]/20 to-[#e0f2f1]/30 p-8 text-center relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                            <span className="material-symbols-outlined text-[#7ca29d] text-4xl">
                                savings
                            </span>
                        </div>
                        <h2 className="text-2xl font-extrabold serif-vibe text-slate-800">
                            Mari Menabung!
                        </h2>
                        <p className="text-sm font-medium text-slate-600 mt-1">
                            Catat setoran untuk tujuan masa depan.
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
                    <form className="space-y-6" id="savings-form" onSubmit={handleSave}>
                        {error && (
                            <div className="bg-red-50 text-red-500 text-xs p-4 rounded-xl border border-red-100 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">error</span>
                                {error}
                            </div>
                        )}

                        {/* Saver Selection (Only if Partner exists) */}
                        {user?.partner && (
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                                    Siapa yang Menabung?
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setSaverId(user.id)}
                                        className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${saverId === user.id ? "border-[#7ca29d] bg-[#e0f2f1]/30" : "border-slate-100"}`}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#7ca29d] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                            {user.name?.[0]}
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-slate-700">{user.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">Saya</p>
                                        </div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSaverId(user.partner.id)}
                                        className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${saverId === user.partner.id ? "border-amber-400 bg-amber-50" : "border-slate-100"}`}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                            {user.partner.name?.[0]}
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-slate-700">{user.partner.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">Pasangan</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Amount Selection */}
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                                Pilih Nominal
                            </label>
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {QUICK_AMOUNTS.map((amt) => (
                                    <button
                                        key={amt.value}
                                        type="button"
                                        onClick={() => setAmount(amt.value)}
                                        className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${amount === amt.value
                                            ? "border-[#7ca29d] bg-[#e0f2f1]/30 text-[#7ca29d]"
                                            : "border-slate-100 hover:border-[#7ca29d]/50 text-slate-600"
                                            }`}
                                    >
                                        {amt.label}
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                                    Rp
                                </span>
                                <input
                                    type="number"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-lg font-extrabold focus:ring-2 focus:ring-[#7ca29d]/20 placeholder:text-slate-300 outline-none"
                                    placeholder="Ketik nominal..."
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Target Selection */}
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                                Target Tujuan
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-[#7ca29d]/20 outline-none"
                                    value={targetId}
                                    onChange={(e) => setTargetId(e.target.value)}
                                    required
                                >
                                    <option value="">Pilih Target</option>
                                    {targets.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.title}
                                        </option>
                                    ))}
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                    unfold_more
                                </span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#7ca29d] text-white py-4 rounded-2xl font-extrabold text-lg shadow-xl shadow-[#7ca29d]/30 hover:bg-[#7ca29d]/90 transition-all transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <span className="animate-spin material-symbols-outlined">sync</span>
                            ) : (
                                <span className="material-symbols-outlined">send_money</span>
                            )}
                            {loading ? "Memproses..." : "Setor Sekarang"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
