"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login:", { email, password });
    };

    return (
        <div className="bg-[#fcfbf7] min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Gradient Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#7ca29d]/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#7ca29d]/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-[480px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-2xl p-8 md:p-12 border border-white/50">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="w-14 h-14 bg-[#7ca29d]/15 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                        <span className="material-symbols-outlined text-[#7ca29d] text-4xl">
                            savings
                        </span>
                    </div>
                    <div className="mb-2">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#7ca29d]/80">
                            Tabungan Bersama
                        </span>
                    </div>
                    <h1 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">
                        Selamat Datang Kembali!
                    </h1>
                    <p className="text-gray-500 mt-3 text-base">
                        Kelola keuangan masa depan Anda dengan lebih tenang dan teratur.
                    </p>
                </div>

                {/* Google Login Button */}
                <div className="mb-8">
                    <button className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white h-14 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group">
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
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
                        <span className="text-slate-800 font-semibold text-base">
                            Masuk dengan Google
                        </span>
                    </button>
                </div>

                {/* Divider */}
                <div className="relative flex py-4 items-center mb-6">
                    <div className="flex-grow border-t border-gray-100"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs font-medium uppercase tracking-wider">
                        Atau dengan email
                    </span>
                    <div className="flex-grow border-t border-gray-100"></div>
                </div>

                {/* Login Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-slate-800/70 text-[13px] font-bold tracking-wide uppercase ml-1">
                            Email
                        </label>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7ca29d] transition-colors text-xl">
                                mail
                            </span>
                            <input
                                className="w-full h-14 bg-gray-50 border-transparent rounded-xl pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-[#7ca29d]/20 focus:border-[#7ca29d] transition-all text-slate-800 placeholder:text-gray-400 outline-none"
                                placeholder="nama@email.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-slate-800/70 text-[13px] font-bold tracking-wide uppercase">
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
                                className="w-full h-14 bg-gray-50 border-transparent rounded-xl pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-[#7ca29d]/20 focus:border-[#7ca29d] transition-all text-slate-800 placeholder:text-gray-400 outline-none"
                                placeholder="••••••••"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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
                <div className="mt-10 text-center">
                    <p className="text-gray-500 text-sm">
                        Belum punya akun?{" "}
                        <Link
                            className="text-[#7ca29d] font-bold hover:underline underline-offset-4"
                            href="/register"
                        >
                            Daftar Sekarang
                        </Link>
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 w-full text-center text-gray-400 text-xs tracking-wide">
                © 2024 Tabungan Bersama. Aman dan Terpercaya.
            </div>
        </div>
    );
}
