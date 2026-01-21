"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import AllocationChart from "@/components/AllocationChart";
import MonthlySummaryTable from "@/components/MonthlySummaryTable";
import { getSavingsHistory } from "@/lib/actions/savings";
import { getCurrentUser } from "@/lib/actions/auth";

export default function LaporanPage() {
    const [activeFilter, setActiveFilter] = useState("Bulan Ini");
    const [history, setHistory] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
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

    // Helper to group by month
    const processHistory = () => {
        const monthlyData: Record<string, { month: string, partnerA: number, partnerB: number }> = {};
        const allocations: Record<string, { name: string, amount: number }> = {};
        const summary: any[] = [];

        history.forEach(item => {
            const date = new Date(item.createdAt);
            const monthKey = date.toLocaleString('id-ID', { month: 'short', year: 'numeric' });

            // For Chart
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { month: monthKey.split(' ')[0], partnerA: 0, partnerB: 0 };
            }
            monthlyData[monthKey].partnerA += parseInt(item.amount) / 1000; // In thousands for chart scale

            // For Allocations
            if (item.targetTitle) {
                if (!allocations[item.targetTitle]) {
                    allocations[item.targetTitle] = { name: item.targetTitle, amount: 0 };
                }
                allocations[item.targetTitle].amount += parseInt(item.amount);
            }
        });

        // Convert allocations to percentages
        const totalAmount = Object.values(allocations).reduce((sum, a) => sum + a.amount, 0);
        const processedAllocations = Object.values(allocations).map((a, idx) => ({
            name: a.name,
            percentage: totalAmount > 0 ? Math.round((a.amount / totalAmount) * 100) : 0,
            color: ["#7ca29d", "#fbbf24", "#cbd5e1", "#94a3b8"][idx % 4]
        }));

        // Summary Table (Mocking trend for now based on previous items if available)
        // Grouping history by month for table
        const monthlyGroups: Record<string, any> = {};
        history.forEach(item => {
            const date = new Date(item.createdAt);
            const monthName = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
            if (!monthlyGroups[monthName]) {
                monthlyGroups[monthName] = { month: monthName, total: 0, contributor: item.userName };
            }
            monthlyGroups[monthName].total += parseInt(item.amount);
        });

        const processedSummary = Object.values(monthlyGroups).map((m: any) => ({
            month: m.month,
            total: `Rp ${m.total.toLocaleString("id-ID")}`,
            totalColor: "text-emerald-600",
            contributor: {
                name: m.contributor,
                initial: m.contributor?.[0] || "?",
                percentage: "100%", // Simplified
                bgColor: "bg-[#e0f2f1]",
                textColor: "text-[#7ca29d]",
            },
            trend: "up" as const,
        }));

        return {
            chartData: Object.values(monthlyData).reverse(),
            allocations: processedAllocations,
            summary: processedSummary
        };
    };

    const { chartData, allocations, summary } = processHistory();

    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto px-8 py-10">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold serif-vibe mb-2">
                            Laporan Keuangan
                        </h1>
                        <p className="text-slate-500 font-medium">
                            Analisis pertumbuhan tabungan {user?.partner ? "masa depan kita" : "masa depan Anda"}
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
                                <MonthlyBarChart data={chartData.length > 0 ? chartData : [{ month: "No Data", partnerA: 0, partnerB: 0 }]} />
                            </div>
                            <div className="lg:col-span-4">
                                <AllocationChart allocations={allocations.length > 0 ? allocations : [{ name: "No Data", percentage: 0, color: "#cbd5e1" }]} />
                            </div>
                        </div>

                        {/* Monthly Summary Table */}
                        <MonthlySummaryTable data={summary} />
                    </>
                )}
            </main>
            <Footer />
        </>
    );
}
