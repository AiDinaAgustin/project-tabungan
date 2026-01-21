"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import AllocationChart from "@/components/AllocationChart";
import MonthlySummaryTable from "@/components/MonthlySummaryTable";
import MonthlyHistoryModal from "@/components/MonthlyHistoryModal";
import { getSavingsHistory } from "@/lib/actions/savings";
import { getCurrentUser } from "@/lib/actions/auth";

export default function LaporanPage() {
    const [activeFilter, setActiveFilter] = useState("Bulan Ini");
    const [history, setHistory] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [selectedMonthForHistory, setSelectedMonthForHistory] = useState("");
    const [filteredHistory, setFilteredHistory] = useState<any[]>([]);
    const filters = ["Bulan Ini", "3 Bulan", "Tahun Ini"];

    useEffect(() => {
        const fetchData = async () => {
            const [historyData, userData] = await Promise.all([
                getSavingsHistory(100),
                getCurrentUser()
            ]);
            setHistory(historyData);
            setUser(userData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const openHistoryModal = (monthFull: string) => {
        const filtered = history.filter(item => {
            const date = new Date(item.createdAt);
            const itemMonthFull = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
            return itemMonthFull === monthFull;
        });
        setFilteredHistory(filtered);
        setSelectedMonthForHistory(monthFull);
        setIsHistoryModalOpen(true);
    };

    // Helper to group by month
    const processHistory = () => {
        const monthlyData: Record<string, {
            month: string,
            fullMonth: string,
            partnerA: number,
            partnerB: number,
            targets: Record<string, number>
        }> = {};
        const globalAllocations: Record<string, { name: string, amount: number }> = {};

        // Identify users
        const currentUserId = user?.id;
        const partnerId = user?.partnerId;

        history.forEach(item => {
            const date = new Date(item.createdAt);
            const monthShort = date.toLocaleString('id-ID', { month: 'short' });
            const monthFull = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });

            if (!monthlyData[monthFull]) {
                monthlyData[monthFull] = {
                    month: monthShort,
                    fullMonth: monthFull,
                    partnerA: 0,
                    partnerB: 0,
                    targets: {}
                };
            }

            const amount = parseInt(item.amount);

            // Stats per Month
            if (item.userId === currentUserId) {
                monthlyData[monthFull].partnerA += amount;
            } else if (item.userId === partnerId) {
                monthlyData[monthFull].partnerB += amount;
            }

            // Target per Month
            if (item.targetTitle) {
                monthlyData[monthFull].targets[item.targetTitle] = (monthlyData[monthFull].targets[item.targetTitle] || 0) + amount;

                // Global Allocation
                if (!globalAllocations[item.targetTitle]) {
                    globalAllocations[item.targetTitle] = { name: item.targetTitle, amount: 0 };
                }
                globalAllocations[item.targetTitle].amount += amount;
            }
        });

        // Convert monthlyData to array and sort by date
        const sortedMonthsAsc = Object.values(monthlyData).sort((a, b) => {
            return new Date(a.fullMonth).getTime() - new Date(b.fullMonth).getTime();
        });

        // Summary Table with Growth and Largest Contributor
        const processedSummary = sortedMonthsAsc.map((m, idx) => {
            const total = m.partnerA + m.partnerB;

            // Calculate growth relative to previous month
            let growth = 0;
            let trend: "up" | "down" | "flat" = "flat";
            if (idx > 0) {
                const prevTotal = sortedMonthsAsc[idx - 1].partnerA + sortedMonthsAsc[idx - 1].partnerB;
                if (prevTotal > 0) {
                    growth = Math.round(((total - prevTotal) / prevTotal) * 100);
                    trend = growth > 0 ? "up" : growth < 0 ? "down" : "flat";
                }
            }

            // Find Largest Contributor for this month
            const isPartnerABigger = m.partnerA >= m.partnerB;
            const mainContributorName = isPartnerABigger ? user?.name : (user?.partnerName || "Pasangan");
            const mainContributorPercentage = total > 0 ? Math.round(((isPartnerABigger ? m.partnerA : m.partnerB) / total) * 100) : 0;

            return {
                month: m.fullMonth,
                total: `Rp ${total.toLocaleString("id-ID")}`,
                contributor: {
                    name: mainContributorName?.split(' ')[0] || "User",
                    initial: mainContributorName?.[0] || "?",
                    percentage: `${mainContributorPercentage}%`,
                    bgColor: isPartnerABigger ? "bg-[#e0f2f1]" : "bg-[#fef3c7]",
                    textColor: isPartnerABigger ? "text-[#7ca29d]" : "text-amber-600",
                },
                growth: growth > 0 ? `+${growth}%` : `${growth}%`,
                trend,
            };
        }).reverse();

        // Convert global allocations to percentages
        const totalAllocAmount = Object.values(globalAllocations).reduce((sum, a) => sum + a.amount, 0);
        const processedAllocations = Object.values(globalAllocations)
            .sort((a, b) => b.amount - a.amount)
            .map((a, idx) => ({
                name: a.name,
                percentage: totalAllocAmount > 0 ? Math.round((a.amount / totalAllocAmount) * 100) : 0,
                color: ["#7ca29d", "#fbbf24", "#94a3b8", "#cbd5e1"][idx % 4]
            }));

        return {
            chartData: sortedMonthsAsc,
            allocations: processedAllocations,
            summary: processedSummary
        };
    };

    const { chartData, allocations, summary } = processHistory();

    const isAnyModalOpen = isHistoryModalOpen;

    return (
        <>
            <Navbar />

            {/* Modals */}
            <MonthlyHistoryModal
                isOpen={isHistoryModalOpen}
                onClose={() => setIsHistoryModalOpen(false)}
                monthName={selectedMonthForHistory}
                history={filteredHistory}
            />

            <main className={`max-w-7xl mx-auto px-8 py-10 transition-all ${isAnyModalOpen ? "blur-sm pointer-events-none" : ""}`}>
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold serif-vibe mb-2">
                            Laporan Keuangan
                        </h1>
                        <p className="text-slate-500 font-medium">
                            Analisis pertumbuhan tabungan {user?.partnerId ? "masa depan kita" : "masa depan Anda"}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 p-1 bg-white rounded-2xl shadow-sm border border-slate-100">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${activeFilter === filter
                                    ? "bg-[#7ca29d] text-white"
                                    : "text-slate-500 hover:bg-slate-50"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </header>

                {loading ? (
                    <div className="py-20 text-center">
                        <span className="animate-spin material-symbols-outlined text-4xl text-[#7ca29d]">sync</span>
                        <p className="mt-4 text-slate-400 font-medium">Menghitung data...</p>
                    </div>
                ) : (
                    <>
                        {/* Charts Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                            <div className="lg:col-span-8">
                                <MonthlyBarChart
                                    data={chartData.length > 0 ? chartData : [{ month: "N/A", partnerA: 0, partnerB: 0 }]}
                                    partnerNames={[user?.name?.split(' ')[0] || "Anda", user?.partnerName?.split(' ')[0] || "Pasangan"]}
                                />
                            </div>
                            <div className="lg:col-span-4 h-full">
                                <AllocationChart allocations={allocations.length > 0 ? allocations : [{ name: "Belum Ada Data", percentage: 0, color: "#cbd5e1" }]} />
                            </div>
                        </div>

                        {/* Monthly Summary Table */}
                        <MonthlySummaryTable
                            data={summary}
                            onRowClick={(month) => openHistoryModal(month)}
                        />
                    </>
                )}
            </main>
            <Footer />
        </>
    );
}
