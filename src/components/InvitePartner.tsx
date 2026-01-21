"use client";

import { useState } from "react";

export default function InvitePartner() {
    const [email, setEmail] = useState("");

    return (
        <div className="bg-gradient-to-br from-[#7ca29d] to-[#5a807b] p-8 rounded-3xl text-white shadow-xl shadow-[#7ca29d]/20">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-white">person_add</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Undang Pasangan</h3>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
                Kelola keuangan lebih romantis dan transparan bersama pasangan halalmu.
            </p>
            <div className="space-y-3">
                <div className="relative">
                    <input
                        className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white placeholder:text-white/50 focus:ring-white/30 focus:border-white/30 outline-none text-sm"
                        placeholder="Email pasangan..."
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button className="w-full bg-white text-[#7ca29d] font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors shadow-lg">
                    Kirim Undangan
                </button>
            </div>
        </div>
    );
}
