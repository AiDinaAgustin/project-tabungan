"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroCard from "@/components/HeroCard";
import GoalCard from "@/components/GoalCard";
import HistoryItem from "@/components/HistoryItem";
import FinancialInsights from "@/components/FinancialInsights";
import InvitePartner from "@/components/InvitePartner";
import TipsCard from "@/components/TipsCard";
import Footer from "@/components/Footer";
import SavingsModal from "@/components/SavingsModal";

export default function Home() {
  const [isSavingsModalOpen, setIsSavingsModalOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState("Liburan ke Jepang");

  const handleSaveClick = (targetTitle: string) => {
    setSelectedTarget(targetTitle);
    setIsSavingsModalOpen(true);
  };

  return (
    <>
      <Navbar />

      {/* Savings Modal */}
      <SavingsModal
        isOpen={isSavingsModalOpen}
        onClose={() => setIsSavingsModalOpen(false)}
        defaultTarget={selectedTarget}
      />

      <main className={`max-w-7xl mx-auto px-8 py-10 ${isSavingsModalOpen ? "blur-sm pointer-events-none" : ""}`}>
        {/* Hero Glassmorphism Card */}
        <HeroCard />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            {/* Goals Section */}
            <section>
              <div className="flex items-center justify-between mb-8 px-2">
                <h2 className="text-2xl font-bold serif-vibe">Tujuan Kita</h2>
                <button className="text-sm font-bold text-[#7ca29d] flex items-center gap-1">
                  Lihat Semua{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GoalCard
                  icon="flight_takeoff"
                  iconColor="text-[#7ca29d]"
                  iconBg="bg-[#e0f2f1]"
                  title="Liburan ke Jepang"
                  target="Rp 35.000.000"
                  progress={72}
                  collected="Rp 25.2jt"
                  progressColor="bg-[#7ca29d]"
                  progressTextColor="text-[#7ca29d]"
                  isPrimary={true}
                  onSaveClick={() => handleSaveClick("Liburan ke Jepang")}
                />
                <GoalCard
                  icon="home_work"
                  iconColor="text-amber-600"
                  iconBg="bg-[#fef3c7]"
                  title="DP Rumah Impian"
                  target="Rp 150.000.000"
                  progress={15}
                  collected="Rp 22.5jt"
                  progressColor="bg-amber-400"
                  progressTextColor="text-amber-600"
                  isPrimary={false}
                  onSaveClick={() => handleSaveClick("DP Rumah Impian")}
                />
              </div>
            </section>

            {/* History Section */}
            <section>
              <div className="flex items-center justify-between mb-8 px-2">
                <h2 className="text-2xl font-bold serif-vibe">
                  Riwayat Tabungan
                </h2>
              </div>
              <div className="space-y-3">
                <HistoryItem
                  name="Dinda"
                  isYou={true}
                  source="Tabungan Mingguan"
                  time="2 jam yang lalu"
                  amount="+Rp 500.000"
                  destination="Ke Liburan Jepang"
                  borderColor="border-[#7ca29d]"
                  iconBg="bg-[#e0f2f1]"
                  iconColor="text-[#7ca29d]"
                  icon="person"
                  amountColor="text-[#7ca29d]"
                />
                <HistoryItem
                  name="Raka"
                  isYou={false}
                  source="Bonus Gaji"
                  time="Kemarin"
                  amount="+Rp 2.500.000"
                  destination="Ke Rumah Impian"
                  borderColor="border-amber-300"
                  iconBg="bg-[#fef3c7]"
                  iconColor="text-amber-600"
                  icon="favorite"
                  amountColor="text-amber-600"
                />
                <HistoryItem
                  name="Dinda"
                  isYou={true}
                  source="Tabungan Harian"
                  time="3 hari yang lalu"
                  amount="+Rp 150.000"
                  destination="Dana Darurat"
                  borderColor="border-[#7ca29d]"
                  iconBg="bg-[#e0f2f1]"
                  iconColor="text-[#7ca29d]"
                  icon="person"
                  amountColor="text-[#7ca29d]"
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <FinancialInsights />
            <InvitePartner />
            <TipsCard />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
