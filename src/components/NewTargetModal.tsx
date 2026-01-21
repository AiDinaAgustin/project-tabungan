"use client";

import { useState } from "react";
import { createTarget } from "@/lib/actions/target";

interface NewTargetModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewTargetModal({ isOpen, onClose }: NewTargetModalProps) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("title", name);
        formData.append("targetAmount", amount);
        formData.append("icon", category || "savings");

        const result = await createTarget(formData);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            setLoading(false);
            onClose();
            // revalidatePath is called in the action
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="bg-white w-full max-w-[560px] rounded-[24px] shadow-2xl border border-white/20 overflow-hidden transform transition-all relative z-10">
                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#7ca29d]/10 rounded-xl flex items-center justify-center text-[#7ca29d]">
                            <span className="material-symbols-outlined text-2xl">favorite</span>
                        </div>
                        <h2 className="text-2xl font-extrabold serif-vibe">Buat Impian Baru</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Form */}
                <div className="px-8 py-4">
                    <form className="space-y-6" id="new-target-form" onSubmit={handleSave}>
                        {error && (
                            <div className="bg-red-50 text-red-500 text-xs p-4 rounded-xl border border-red-100 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">error</span>
                                {error}
                            </div>
                        )}
                        {/* Nama Impian */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                                Nama Impian
                            </label>
                            <input
                                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#7ca29d]/30 text-slate-900 placeholder:text-slate-400 font-medium transition-all outline-none"
                                placeholder="Contoh: Liburan ke Bali"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Target Nominal */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                                Target Nominal
                            </label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                                    IDR
                                </span>
                                <input
                                    className="w-full pl-14 pr-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#7ca29d]/30 text-slate-900 font-bold transition-all outline-none"
                                    placeholder="0"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Kategori */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                                Pilih Kategori
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#7ca29d]/30 text-slate-900 font-medium appearance-none cursor-pointer transition-all outline-none"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Pilih Kategori</option>
                                    <option value="flight_takeoff">✈️ Travel</option>
                                    <option value="home_work">🏡 Home</option>
                                    <option value="favorite">💍 Wedding</option>
                                    <option value="medical_services">🏥 Emergency</option>
                                    <option value="savings">✨ Lainnya</option>
                                </select>
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                    <span className="material-symbols-outlined text-xl">category</span>
                                </div>
                            </div>
                        </div>

                        {/* Estimasi */}
                        <div className="bg-[#7ca29d]/5 rounded-2xl p-6 border border-[#7ca29d]/10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-[#7ca29d] uppercase tracking-widest mb-1">
                                        Estimasi Tabungan Bulanan
                                    </p>
                                    <p className="text-2xl font-extrabold serif-vibe text-[#7ca29d]">
                                        {amount ? `Rp ${(parseInt(amount) / 12).toLocaleString("id-ID")}` : "Rp 0"}
                                        <span className="text-sm font-sans font-medium text-slate-400 ml-1">
                                            /bulan (1th)
                                        </span>
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#7ca29d]">
                                    <span className="material-symbols-outlined">trending_up</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Buttons */}
                <div className="p-8 flex items-center gap-4">
                    <button
                        onClick={onClose}
                        type="button"
                        className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                    >
                        Batal
                    </button>
                    <button
                        form="new-target-form"
                        type="submit"
                        disabled={loading}
                        className="flex-[2] bg-[#7ca29d] text-white py-4 rounded-2xl font-bold shadow-xl shadow-[#7ca29d]/20 hover:bg-[#7ca29d]/90 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading && <span className="animate-spin material-symbols-outlined text-sm">sync</span>}
                        {loading ? "Menyimpan..." : "Simpan Target"}
                    </button>
                </div>
            </div>
        </div>
    );
}
