"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroCard from "@/components/HeroCard";
import GoalCard from "@/components/GoalCard";
import HistoryItem from "@/components/HistoryItem";
import FinancialInsights from "@/components/FinancialInsights";
import InvitePartner from "@/components/InvitePartner";
import TipsCard from "@/components/TipsCard";
import Footer from "@/components/Footer";
import SavingsModal from "@/components/SavingsModal";
import { getTargets, deleteTarget } from "@/lib/actions/target";
import { getSavingsHistory, getFinancialInsights } from "@/lib/actions/savings";
import { getCurrentUser } from "@/lib/actions/auth";
import EditTargetModal from "@/components/EditTargetModal";
import TargetDetailModal from "@/components/TargetDetailModal";

export default function Home() {
  const [isSavingsModalOpen, setIsSavingsModalOpen] = useState(false);
  const [isEditTargetModalOpen, setIsEditTargetModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<any>(null);
  const [targetToEdit, setTargetToEdit] = useState<any>(null);
  const [targetForDetail, setTargetForDetail] = useState<any>(null);
  const [targets, setTargets] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const [targetsData, historyData, userData, insightsData] = await Promise.all([
      getTargets(),
      getSavingsHistory(5),
      getCurrentUser(),
      getFinancialInsights()
    ]);
    setTargets(targetsData);
    setHistory(historyData);
    setUser(userData);
    setInsights(insightsData || []);
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

  const handleDeleteClick = async (id: string) => {
    const result = await deleteTarget(id);
    if (result.success) {
      fetchData();
    } else {
      alert(result.error);
    }
  };

  const handleDetailClick = (target: any) => {
    setTargetForDetail(target);
    setIsDetailModalOpen(true);
  };

  const isAnyModalOpen = isSavingsModalOpen || isEditTargetModalOpen || isDetailModalOpen;

  return (
    <>
      <Navbar />

      {/* Modals */}
      <EditTargetModal
        isOpen={isEditTargetModalOpen}
        onClose={() => {
          setIsEditTargetModalOpen(false);
          fetchData();
        }}
        target={targetToEdit}
      />

      {/* Savings Modal */}
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

      <main className={`max-w-7xl mx-auto px-4 py-5 md:px-8 md:py-10 ${isAnyModalOpen ? "blur-sm pointer-events-none" : ""}`}>
        {/* Hero Glassmorphism Card */}
        <HeroCard
          totalAmount={`Rp ${targets.reduce((sum, t) => sum + parseFloat(t.collectedAmount), 0).toLocaleString("id-ID")}`}
          monthlyChange={`+Rp ${insights.reduce((sum, i) => sum + Number(i.totalAmount), 0).toLocaleString("id-ID")}`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6 md:space-y-12">
            {/* Goals Section */}
            <section>
              <div className="flex items-center justify-between mb-4 md:mb-8 px-1">
                <h2 className="text-lg md:text-2xl font-bold serif-vibe">
                  {user?.partner ? "Tujuan Kita" : "Tujuan Saya"}
                </h2>
                <a href="/target" className="text-sm font-bold text-[#7ca29d] flex items-center gap-1">
                  Lihat Semua{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-6">
                {loading ? (
                  <p className="col-span-full text-center text-slate-400">Memuat tujuan...</p>
                ) : targets.length > 0 ? (
                  targets.slice(0, 2).map((target, idx) => {
                    const collected = parseFloat(target.collectedAmount);
                    const goal = parseFloat(target.targetAmount);
                    const progress = Math.min(Math.round((collected / goal) * 100), 100);

                    return (
                      <GoalCard
                        key={target.id}
                        icon={target.icon}
                        iconColor={target.iconColor}
                        iconBg={target.iconBg}
                        title={target.title}
                        target={`Rp ${goal.toLocaleString("id-ID")}`}
                        progress={progress}
                        collected={`Rp ${collected.toLocaleString("id-ID")}`}
                        progressColor="bg-[#7ca29d]"
                        progressTextColor="text-[#7ca29d]"
                        isPrimary={idx === 0}
                        onSaveClick={() => handleSaveClick(target)}
                        onEdit={() => handleEditClick(target)}
                        onDelete={() => handleDeleteClick(target.id)}
                        onDetail={() => handleDetailClick(target)}
                      />
                    );
                  })
                ) : (
                  <div className="col-span-full p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center">
                    <p className="text-slate-400">Belum ada target. Ayo buat satu!</p>
                  </div>
                )}
              </div>
            </section>

            {/* History Section */}
            <section>
              <div className="flex items-center justify-between mb-4 md:mb-8 px-1">
                <h2 className="text-lg md:text-2xl font-bold serif-vibe">
                  Riwayat Tabungan
                </h2>
              </div>
              <div className="space-y-3">
                {loading ? (
                  <p className="text-center text-slate-400">Memuat riwayat...</p>
                ) : history.length > 0 ? (
                  history.map((item) => {
                    const isYou = item.userName === user?.name;
                    const amountValue = parseFloat(item.amount);
                    const isWithdrawal = amountValue < 0;

                    return (
                      <HistoryItem
                        key={item.id}
                        name={item.userName}
                        isYou={isYou}
                        source={item.source}
                        time={new Date(item.createdAt).toLocaleDateString("id-ID")}
                        amount={`${isWithdrawal ? "- " : "+ "}Rp ${Math.abs(amountValue).toLocaleString("id-ID")}`}
                        destination={isWithdrawal ? `Dari ${item.targetTitle}` : `Ke ${item.targetTitle}`}
                        borderColor={isWithdrawal ? "border-rose-400" : isYou ? "border-[#7ca29d]" : "border-amber-400"}
                        iconBg={isWithdrawal ? "bg-rose-50" : isYou ? "bg-[#e0f2f1]" : "bg-[#fef3c7]"}
                        iconColor={isWithdrawal ? "text-rose-500" : isYou ? "text-[#7ca29d]" : "text-amber-600"}
                        icon={isWithdrawal ? "payments" : isYou ? "person" : "partner_exchange"}
                        amountColor={isWithdrawal ? "text-rose-600" : isYou ? "text-[#7ca29d]" : "text-amber-600"}
                      />
                    );
                  })
                ) : (
                  <p className="text-center text-slate-400 py-4">Belum ada riwayat tabungan.</p>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-4 md:space-y-8">
            <FinancialInsights data={insights} />
            {!user?.partner && <InvitePartner />}
            <TipsCard />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
