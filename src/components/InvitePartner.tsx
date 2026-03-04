"use client";

import { useState } from "react";
import { invitePartner } from "@/lib/actions/auth";

export default function InvitePartner() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleInvite = async () => {
        if (!email) return;
        setLoading(true);
        setError("");

        try {
            const result = await invitePartner(email);
            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(true);
                // Hard refresh to update Navbar and other components
                window.location.reload();
            }
        } catch (err) {
            setError("Terjadi kesalahan sistem");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 md:p-8 rounded-md text-white shadow-xl shadow-emerald-500/20">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-md flex items-center justify-center mb-4 md:mb-6">
                    <span className="material-symbols-outlined text-white">check_circle</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Berhasil Terhubung!</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                    Anda sudah terhubung dengan pasangan. Selamat menabung bersama!
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-[#7ca29d] to-[#5a807b] p-6 md:p-8 rounded-md text-white shadow-xl shadow-[#7ca29d]/20">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-md flex items-center justify-center mb-4 md:mb-6">
                <span className="material-symbols-outlined text-white">person_add</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Undang Pasangan</h3>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
                Kelola keuangan lebih romantis dan transparan bersama pasangan halalmu.
            </p>
            <div className="space-y-3">
                <div className="relative">
                    <input
                        className="w-full bg-white/10 border border-white/20 rounded-md py-2.5 md:py-3 px-4 text-white placeholder:text-white/50 focus:ring-white/30 focus:border-white/30 outline-none text-sm"
                        placeholder="Email pasangan..."
                        type="email"
                        disabled={loading}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {error && <p className="text-xs font-bold text-rose-200 mt-1">{error}</p>}
                <button
                    onClick={handleInvite}
                    disabled={loading || !email}
                    className="w-full bg-white text-[#7ca29d] font-bold py-2.5 md:py-3 rounded-md hover:bg-slate-50 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading && <span className="animate-spin material-symbols-outlined text-sm">sync</span>}
                    {loading ? "Mengirim..." : "Kirim Undangan"}
                </button>
            </div>
        </div>
    );
}
