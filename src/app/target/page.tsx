"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import TargetGoalCard from "@/components/TargetGoalCard";
import NewTargetModal from "@/components/NewTargetModal";
import EditTargetModal from "@/components/EditTargetModal";
import SavingsModal from "@/components/SavingsModal";
import TargetDetailModal from "@/components/TargetDetailModal";
import { getTargets, deleteTarget } from "@/lib/actions/target";
import { getCurrentUser } from "@/lib/actions/auth";

export default function TargetPage() {
    const [isNewTargetModalOpen, setIsNewTargetModalOpen] = useState(false);
    const [isEditTargetModalOpen, setIsEditTargetModalOpen] = useState(false);
    const [isSavingsModalOpen, setIsSavingsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [targets, setTargets] = useState<any[]>([]);
    const [selectedTarget, setSelectedTarget] = useState<any>(null);
    const [targetToEdit, setTargetToEdit] = useState<any>(null);
    const [targetForDetail, setTargetForDetail] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    const fetchData = async () => {
        setLoading(true);
        const [targetsData, userData] = await Promise.all([
            getTargets(),
            getCurrentUser()
        ]);
        setTargets(targetsData);
        setUser(userData);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSaveClick = (target: any) => {
        setSelectedTarget(target);
        setIsSavingsModalOpen(true);
    };

    const handleEditClick = (target: any) => {
        setTargetToEdit(target);
        setIsEditTargetModalOpen(true);
    };

    const handleDetailClick = (target: any) => {
        setTargetForDetail(target);
        setIsDetailModalOpen(true);
    };

    const handleDeleteClick = async (id: string) => {
        const result = await deleteTarget(id);
        if (result.success) {
            fetchData();
        } else {
            alert(result.error);
        }
    };

    const isAnyModalOpen = isNewTargetModalOpen || isEditTargetModalOpen || isSavingsModalOpen || isDetailModalOpen;

    return (
        <>
            <Navbar />

            {/* Modals */}
            <NewTargetModal
                isOpen={isNewTargetModalOpen}
                onClose={() => {
                    setIsNewTargetModalOpen(false);
                    fetchData();
                }}
            />
            <EditTargetModal
                isOpen={isEditTargetModalOpen}
                onClose={() => {
                    setIsEditTargetModalOpen(false);
                    fetchData();
                }}
                target={targetToEdit}
            />
            <SavingsModal
                isOpen={isSavingsModalOpen}
                onClose={() => {
                    setIsSavingsModalOpen(false);
                    fetchData();
                }}
                defaultTarget={selectedTarget}
            />
            <TargetDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                target={targetForDetail}
            />

            <main className={`max-w-7xl mx-auto px-8 py-10 ${isAnyModalOpen ? "blur-sm pointer-events-none" : ""}`}>
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold serif-vibe mb-2">
                            {user?.partner ? "Target Masa Depan" : "Target Saya"}
                        </h1>
                        <p className="text-slate-500 font-medium">
                            {user?.partner
                                ? "Kelola dan pantau setiap impian yang kita bangun bersama."
                                : "Kelola dan pantau setiap impian yang Anda bangun."}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsNewTargetModalOpen(true)}
                        className="flex items-center gap-2 bg-[#7ca29d] text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl shadow-[#7ca29d]/20 hover:bg-[#7ca29d]/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <span className="material-symbols-outlined">add_circle</span>
                        Tambah Target Baru
                    </button>
                </header>

                {/* Target Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {loading ? (
                        <div className="col-span-full py-20 text-center">
                            <span className="animate-spin material-symbols-outlined text-4xl text-[#7ca29d]">sync</span>
                            <p className="mt-4 text-slate-400 font-medium">Memuat impian Anda...</p>
                        </div>
                    ) : targets.length > 0 ? (
                        targets.map((target) => {
                            const collected = parseFloat(target.collectedAmount);
                            const goal = parseFloat(target.targetAmount);
                            const progress = Math.min(Math.round((collected / goal) * 100), 100);

                            // Format last contribution if it exists
                            const contributions = target.lastUserName ? [{
                                name: target.lastUserName,
                                initial: target.lastUserName[0].toUpperCase(),
                                amount: `+Rp ${Number(target.lastAmount).toLocaleString("id-ID")}`,
                                bgColor: target.lastUserName === user?.name ? "bg-[#e0f2f1]" : "bg-[#fef3c7]",
                                textColor: target.lastUserName === user?.name ? "text-[#7ca29d]" : "text-amber-600",
                            }] : [];

                            return (
                                <TargetGoalCard
                                    key={target.id}
                                    icon={target.icon}
                                    iconBg={target.iconBg}
                                    iconColor={target.iconColor}
                                    title={target.title}
                                    subtitle={progress >= 100 ? "Target Tercapai! 🎉" : "Saling bantu mencapainya"}
                                    subtitleColor={progress >= 100 ? "text-emerald-600 font-bold" : "text-slate-500"}
                                    progress={progress}
                                    progressColor={target.progressColor}
                                    collected={`Rp ${collected.toLocaleString("id-ID")}`}
                                    collectedColor={target.iconColor}
                                    target={`Rp ${goal.toLocaleString("id-ID")}`}
                                    buttonVariant="primary"
                                    contributions={contributions}
                                    onSaveClick={() => handleSaveClick(target)}
                                    onEdit={() => handleEditClick(target)}
                                    onDelete={() => handleDeleteClick(target.id)}
                                    onDetail={() => handleDetailClick(target)}
                                />
                            );
                        })
                    ) : (
                        <div className="col-span-full py-20 bg-white/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
                            <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">sentiment_dissatisfied</span>
                            <h3 className="text-2xl font-bold text-slate-500">Belum ada target</h3>
                            <p className="text-slate-400 mt-2">Ayo buat target pertama kita hari ini!</p>
                        </div>
                    )}

                    {/* Add New Target Card */}
                    <div
                        onClick={() => setIsNewTargetModalOpen(true)}
                        className="bg-white/40 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#7ca29d]/50 transition-all min-h-[300px]"
                    >
                        <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-[#7ca29d] transition-colors">
                                auto_awesome
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                            Mulai Impian Baru
                        </h3>
                        <p className="text-sm text-slate-400 mt-2 max-w-[200px]">
                            Punya rencana lain? Buat target baru sekarang.
                        </p>
                    </div>
                </div>

                {/* Stats Summary Section */}
                <section className="mt-16 bg-gradient-to-br from-[#7ca29d]/10 via-[#e0f2f1]/20 to-[#fef3c7]/20 rounded-[2.5rem] p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                        <div className="px-6 py-2 md:border-r border-slate-200">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                Total Tabungan
                            </p>
                            <p className="text-3xl font-extrabold serif-vibe">
                                Rp {targets.reduce((sum, t) => sum + parseFloat(t.collectedAmount), 0).toLocaleString("id-ID")}
                            </p>
                        </div>
                        <div className="px-6 py-2 md:border-r border-slate-200">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                Target Terlampaui
                            </p>
                            <p className="text-3xl font-extrabold serif-vibe">
                                {targets.filter(t => parseFloat(t.collectedAmount) >= parseFloat(t.targetAmount)).length}{" "}
                                <span className="text-sm text-slate-400 font-sans font-medium">
                                    Tujuan
                                </span>
                            </p>
                        </div>
                        <div className="px-6 py-2">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                Kesehatan Tabungan
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <span className="material-symbols-outlined text-emerald-500">
                                    check_circle
                                </span>
                                <p className="text-3xl font-extrabold serif-vibe text-emerald-600">
                                    Sangat Baik
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className={`mt-20 py-10 border-t border-slate-200/50 text-center ${isAnyModalOpen ? "blur-sm" : ""}`}>
                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        © 2026 Tabungan Bersama • {user?.partner ? "Masa Depan Kita" : "Masa Depan Anda"}
                    </p>
                    <div className="flex gap-6">
                        <a
                            className="text-xs font-bold text-slate-400 hover:text-[#7ca29d] transition-colors"
                            href="#"
                        >
                            BANTUAN
                        </a>
                        <a
                            className="text-xs font-bold text-slate-400 hover:text-[#7ca29d] transition-colors"
                            href="#"
                        >
                            KEAMANAN
                        </a>
                        <a
                            className="text-xs font-bold text-slate-400 hover:text-[#7ca29d] transition-colors"
                            href="#"
                        >
                            PRIVASI
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
