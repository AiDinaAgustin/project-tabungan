"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login:", { email, password });
    };

    return (
        <div className="bg-[#fcfbf7] min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Gradient Blobs */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#7ca29d]/5 rounded-full blur-[120px] z-0"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#7ca29d]/10 rounded-full blur-[100px] z-0"></div>

            <main className="relative z-10 w-full max-w-[1140px] px-6 py-12 flex items-center justify-center">
                <div className="bg-white shadow-2xl rounded-[32px] w-full flex overflow-hidden min-h-[720px]">
                    {/* Left Side - Illustration */}
                    <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#7ca29d] to-[#9bb8b4] p-16 flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            {/* Logo */}
                            <div className="flex items-center gap-2 mb-12">
                                <div className="size-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-2xl">
                                        savings
                                    </span>
                                </div>
                                <span className="text-white font-bold text-xl tracking-tight">
                                    DuoSavings
                                </span>
                            </div>

                            {/* Headline */}
                            <h2 className="text-white text-4xl font-bold leading-tight mb-6">
                                Kelola masa depan finansial Anda bersama kami.
                            </h2>
                            <p className="text-white/80 text-lg leading-relaxed max-w-md">
                                Masuk kembali ke akun Anda untuk memantau progres tabungan dan rencana keuangan bersama.
                            </p>
                        </div>

                        {/* Security Badge */}
                        <div className="relative z-10 mt-auto">
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex items-start gap-4">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <span className="material-symbols-outlined text-white">
                                        verified_user
                                    </span>
                                </div>
                                <div>
                                    <p className="text-white font-semibold mb-1 text-sm">
                                        Data Aman & Terenkripsi
                                    </p>
                                    <p className="text-white/70 text-xs">
                                        Privasi Anda adalah prioritas kami. Semua transaksi dilindungi protokol keamanan tingkat tinggi.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Blobs */}
                        <div className="absolute -bottom-20 -left-20 size-80 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 right-[-10%] size-64 bg-white/5 rounded-full blur-2xl"></div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                        <div className="w-full max-w-[400px] mx-auto">
                            {/* Header */}
                            <div className="mb-10 text-center lg:text-left">
                                {/* Mobile Logo */}
                                <div className="lg:hidden flex justify-center mb-6">
                                    <div className="size-12 bg-[#7ca29d]/20 rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#7ca29d] text-3xl">
                                            savings
                                        </span>
                                    </div>
                                </div>

                                <h1 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight mb-3">
                                    Selamat Datang Kembali!
                                </h1>
                                <p className="text-gray-500 text-base font-normal">
                                    Silakan masuk untuk melanjutkan perjalanan finansial Anda.
                                </p>
                            </div>

                            {/* Google Login Button */}
                            <button className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white h-12 rounded-xl hover:bg-gray-50 transition-all duration-200 mb-6 font-semibold shadow-sm">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span className="text-slate-800 text-sm">Masuk dengan Google</span>
                            </button>

                            {/* Divider */}
                            <div className="relative flex py-4 items-center mb-6">
                                <div className="flex-grow border-t border-gray-200"></div>
                                <span className="flex-shrink mx-4 text-gray-400 text-xs font-medium uppercase tracking-wider">
                                    Atau
                                </span>
                                <div className="flex-grow border-t border-gray-200"></div>
                            </div>

                            {/* Login Form */}
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                {/* Email Field */}
                                <div className="space-y-1.5">
                                    <label className="text-slate-800/70 text-xs font-bold tracking-wider uppercase ml-1">
                                        Email
                                    </label>
                                    <div className="relative group">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7ca29d] transition-colors text-xl">
                                            mail
                                        </span>
                                        <input
                                            className="w-full h-[52px] bg-gray-50 border-transparent rounded-xl pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-[#7ca29d]/40 focus:border-[#7ca29d] transition-all text-slate-800 placeholder:text-gray-400 outline-none text-sm"
                                            placeholder="nama@email.com"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-slate-800/70 text-xs font-bold tracking-wider uppercase">
                                            Kata Sandi
                                        </label>
                                        <Link
                                            className="text-[#7ca29d] text-xs font-bold hover:text-[#7ca29d]/80 transition-colors"
                                            href="#"
                                        >
                                            Lupa Sandi?
                                        </Link>
                                    </div>
                                    <div className="relative group">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7ca29d] transition-colors text-xl">
                                            lock
                                        </span>
                                        <input
                                            className="w-full h-[52px] bg-gray-50 border-transparent rounded-xl pl-12 pr-12 focus:bg-white focus:ring-2 focus:ring-[#7ca29d]/40 focus:border-[#7ca29d] transition-all text-slate-800 placeholder:text-gray-400 outline-none text-sm"
                                            placeholder="••••••••"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7ca29d] transition-colors"
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <span className="material-symbols-outlined text-xl">
                                                {showPassword ? "visibility_off" : "visibility"}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    className="w-full h-14 bg-[#7ca29d] text-white font-bold text-lg rounded-xl hover:bg-[#6b918c] transition-all shadow-lg shadow-[#7ca29d]/20 mt-4 active:scale-[0.98]"
                                    type="submit"
                                >
                                    Masuk
                                </button>
                            </form>

                            {/* Register Link */}
                            <div className="mt-8 text-center">
                                <p className="text-gray-500 text-sm">
                                    Belum punya akun?{" "}
                                    <Link
                                        className="text-[#7ca29d] font-bold hover:underline ml-1"
                                        href="/register"
                                    >
                                        Daftar Sekarang
                                    </Link>
                                </p>
                            </div>

                            {/* Terms */}
                            <p className="mt-12 text-center text-[10px] text-gray-400 leading-relaxed">
                                © 2026 Tabungan Bersama. Aman dan Terpercaya.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
