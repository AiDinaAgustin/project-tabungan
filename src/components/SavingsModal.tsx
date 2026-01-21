"use client";

import { useState } from "react";

interface SavingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTarget?: string;
}

const QUICK_AMOUNTS = ["Rp 50k", "Rp 100k", "Rp 500k"];
const TARGETS = ["Liburan ke Jepang", "DP Rumah Impian", "Dana Darurat"];

const SAVERS = [
    {
        id: "saver-a",
        name: "Andi",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCO3GabToIuUBVURK6GA2vBQXOIQlysc4eJVhGWv8aFno2GtJelbyoWGyCKcS6aMvJoaobGMS7leNzZna563rJL8PyO8ubH3MArBMEE7QdhipVcL0GxPZBLicYMxgBY_dkMlykHTWKSfzQgA6XHLcE7mfXA4uu_eH9c8Y1YuBur4tk6ty_54-PMr7kquJiEMQEwObIA3-M7YHAwBUxq0hkEooLYySS3hQuadnU4_e9WvGGzU3C8t0qkjLx3f8F8mRgY2jSIGXtltB0",
    },
    {
        id: "saver-b",
        name: "Budi",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAMOGJxJBIjZSy5YyrvNjDYpHnYridKq18LChxf1amzJBSp8RUlbOMCrAhPpJGcdQytM9_D-J_Blp4ofK71wr22B0k3JUmLnlguuhjXrFddzOOx18WYZBGLXktJNQD4Euj5X42tIxDpr5_Fu0NRzTlj2xRic8NDnHg9BawVLkmYoJRL2B1IUhDeH4BkwljibOStoMXP_il1OiL6DTBLzv9JvvDRdlkEMK4OaycpBxxQs2gGYg3-tPEjAUYFuTJ6PAWkpjNOla2TsRQ",
    },
];

export default function SavingsModal({
    isOpen,
    onClose,
    defaultTarget = "Liburan ke Jepang",
}: SavingsModalProps) {
    const [selectedSaver, setSelectedSaver] = useState("saver-a");
    const [selectedAmount, setSelectedAmount] = useState("Rp 50k");
    const [customAmount, setCustomAmount] = useState("");
    const [target, setTarget] = useState(defaultTarget);

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
                <div className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
                    {/* Saver Selection */}
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                            Siapa yang menabung?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {SAVERS.map((saver) => (
                                <div key={saver.id} className="relative">
                                    <input
                                        type="radio"
                                        id={saver.id}
                                        name="saver"
                                        className="sr-only peer"
                                        checked={selectedSaver === saver.id}
                                        onChange={() => setSelectedSaver(saver.id)}
                                    />
                                    <label
                                        htmlFor={saver.id}
                                        className="flex flex-col items-center p-3 rounded-2xl border-2 border-slate-100 cursor-pointer hover:bg-slate-50 transition-all peer-checked:border-[#7ca29d] peer-checked:bg-[#7ca29d]/10 peer-checked:ring-2 peer-checked:ring-[#7ca29d]/20"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full bg-cover bg-center mb-2"
                                            style={{ backgroundImage: `url("${saver.avatar}")` }}
                                        />
                                        <span className="text-sm font-bold">{saver.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Amount Selection */}
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                            Pilih Nominal
                        </label>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {QUICK_AMOUNTS.map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => {
                                        setSelectedAmount(amount);
                                        setCustomAmount("");
                                    }}
                                    className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${selectedAmount === amount
                                            ? "border-[#7ca29d] bg-[#e0f2f1]/30 text-[#7ca29d]"
                                            : "border-slate-100 hover:border-[#7ca29d]/50 text-slate-600"
                                        }`}
                                >
                                    {amount}
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
                                value={customAmount}
                                onChange={(e) => {
                                    setCustomAmount(e.target.value);
                                    setSelectedAmount("");
                                }}
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
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                            >
                                {TARGETS.map((t) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                unfold_more
                            </span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button className="w-full bg-[#7ca29d] text-white py-4 rounded-2xl font-extrabold text-lg shadow-xl shadow-[#7ca29d]/30 hover:bg-[#7ca29d]/90 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3">
                        <span className="material-symbols-outlined">send_money</span>
                        Setor Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
}
