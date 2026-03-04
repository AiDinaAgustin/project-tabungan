"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import TargetGoalCard from "@/components/TargetGoalCard";
import NewTargetModal from "@/components/NewTargetModal";
import EditTargetModal from "@/components/EditTargetModal";
import SavingsModal from "@/components/SavingsModal";
import TargetDetailModal from "@/components/TargetDetailModal";
import WithdrawModal from "@/components/WithdrawModal";
import { getTargets, deleteTarget } from "@/lib/actions/target";
import { getCurrentUser } from "@/lib/actions/auth";
import Footer from "@/components/Footer";

export default function TargetPage() {
    const [isNewTargetModalOpen, setIsNewTargetModalOpen] = useState(false);
    const [isEditTargetModalOpen, setIsEditTargetModalOpen] = useState(false);
    const [isSavingsModalOpen, setIsSavingsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [targets, setTargets] = useState<any[]>([]);
    const [selectedTarget, setSelectedTarget] = useState<any>(null);
    const [targetToEdit, setTargetToEdit] = useState<any>(null);
    const [targetForDetail, setTargetForDetail] = useState<any>(null);
    const [targetForWithdraw, setTargetForWithdraw] = useState<any>(null);
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

    const handleWithdrawClick = (target: any) => {
        setTargetForWithdraw(target);
        setIsWithdrawModalOpen(true);
    };

    const handleDeleteClick = async (id: string) => {
        const result = await deleteTarget(id);
        if (result.success) {
            fetchData();
        } else {
            alert(result.error);
        }
    };

    const isAnyModalOpen = isNewTargetModalOpen || isEditTargetModalOpen || isSavingsModalOpen || isDetailModalOpen || isWithdrawModalOpen;

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
            <WithdrawModal
                isOpen={isWithdrawModalOpen}
                onClose={() => {
                    setIsWithdrawModalOpen(false);
                    fetchData();
                }}
                defaultTarget={targetForWithdraw}
            />

            <main className={`max-w-7xl mx-auto px-4 py-5 md:px-8 md:py-10 ${isAnyModalOpen ? "blur-sm pointer-events-none" : ""}`}>
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-12 gap-3 md:gap-6">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-extrabold serif-vibe mb-1 md:mb-2">
                            {user?.partner ? "Target Masa Depan" : "Target Saya"}
                        </h1>
                        <p className="text-slate-500 text-sm md:text-base font-medium">
                            {user?.partner
                                ? "Kelola dan pantau setiap impian yang kita bangun bersama."
                                : "Kelola dan pantau setiap impian yang Anda bangun."}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsNewTargetModalOpen(true)}
                        className="flex items-center gap-1.5 bg-[#7ca29d] text-white px-3 py-2 md:px-6 md:py-3.5 rounded-md font-bold text-xs md:text-base shadow-md shadow-[#7ca29d]/20 hover:bg-[#7ca29d]/90 transition-all active:scale-[0.98] self-start"
                    >
                        <span className="material-symbols-outlined text-base md:text-[24px]">add_circle</span>
                        Tambah Target Baru
                    </button>
                </header>

                {/* Target Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                    {loading ? (
                        <div className="col-span-full py-12 text-center">
                            <span className="animate-spin material-symbols-outlined text-3xl text-[#7ca29d]">sync</span>
                            <p className="mt-3 text-slate-400 text-sm font-medium">Memuat impian Anda...</p>
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
                                    onWithdraw={() => handleWithdrawClick(target)}
                                />
                            );
                        })
                    ) : (
                        <div className="col-span-full py-10 bg-white/50 rounded-2xl border-2 border-dashed border-slate-200 text-center">
                            <span className="material-symbols-outlined text-4xl text-slate-200 mb-2">sentiment_dissatisfied</span>
                            <h3 className="text-lg font-bold text-slate-500">Belum ada target</h3>
                            <p className="text-slate-400 text-sm mt-1">Ayo buat target pertama kita hari ini!</p>
                        </div>
                    )}

                    {/* Add New Target Card */}
                    <div
                        onClick={() => setIsNewTargetModalOpen(true)}
                        className="bg-white/40 border-2 border-dashed border-slate-200 rounded-md p-5 md:p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#7ca29d]/50 transition-all min-h-[160px] md:min-h-[300px]"
                    >
                        <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl md:text-4xl text-slate-300 group-hover:text-[#7ca29d] transition-colors">
                                auto_awesome
                            </span>
                        </div>
                        <h3 className="text-sm md:text-xl font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                            Mulai Impian Baru
                        </h3>
                        <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-[160px]">
                            Punya rencana lain? Buat target baru sekarang.
                        </p>
                    </div>
                </div>

                {/* Stats Summary Section */}
                <section className="mt-6 md:mt-16 bg-gradient-to-br from-[#7ca29d]/10 via-[#e0f2f1]/20 to-[#fef3c7]/20 rounded-md p-4 md:p-8">
                    <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-8 text-center md:text-left">
                        <div className="px-2 md:px-6 py-2 md:border-r border-slate-200">
                            <p className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                Total Tabungan
                            </p>
                            <p className="text-sm md:text-3xl font-extrabold serif-vibe leading-tight">
                                Rp {targets.reduce((sum, t) => sum + parseFloat(t.collectedAmount), 0).toLocaleString("id-ID")}
                            </p>
                        </div>
                        <div className="px-2 md:px-6 py-2 md:border-r border-slate-200">
                            <p className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                Terlampaui
                            </p>
                            <p className="text-sm md:text-3xl font-extrabold serif-vibe leading-tight">
                                {targets.filter(t => parseFloat(t.collectedAmount) >= parseFloat(t.targetAmount)).length}{" "}
                                <span className="text-xs md:text-sm text-slate-400 font-sans font-medium">Tujuan</span>
                            </p>
                        </div>
                        <div className="px-2 md:px-6 py-2">
                            <p className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                Kesehatan
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-1 md:gap-2">
                                <span className="material-symbols-outlined text-emerald-500 text-base md:text-[24px]">check_circle</span>
                                <p className="text-xs md:text-3xl font-extrabold serif-vibe text-emerald-600">Sangat Baik</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}
