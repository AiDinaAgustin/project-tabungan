"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import AllocationChart from "@/components/AllocationChart";
import MonthlySummaryTable from "@/components/MonthlySummaryTable";

const chartData = [
    { month: "Jan", partnerA: 40, partnerB: 30 },
    { month: "Feb", partnerA: 55, partnerB: 25 },
    { month: "Mar", partnerA: 45, partnerB: 40 },
    { month: "Apr", partnerA: 60, partnerB: 35 },
    { month: "Mei", partnerA: 50, partnerB: 45 },
    { month: "Jun", partnerA: 65, partnerB: 25 },
];

const allocations = [
    { name: "DP Rumah Impian", percentage: 40, color: "#fbbf24" },
    { name: "Liburan Jepang", percentage: 35, color: "#7ca29d" },
    { name: "Dana Darurat", percentage: 25, color: "#cbd5e1" },
];

const summaryData = [
    {
        month: "Juni 2026",
        total: "Rp 4.250.000",
        totalColor: "text-emerald-600",
        contributor: {
            name: "Dinda",
            initial: "D",
            percentage: "65%",
            bgColor: "bg-[#e0f2f1]",
            textColor: "text-[#7ca29d]",
        },
        trend: "up" as const,
    },
    {
        month: "Mei 2026",
        total: "Rp 3.800.000",
        totalColor: "",
        contributor: {
            name: "Raka",
            initial: "R",
            percentage: "52%",
            bgColor: "bg-[#fef3c7]",
            textColor: "text-amber-600",
        },
        trend: "flat" as const,
    },
    {
        month: "April 2026",
        total: "Rp 4.100.000",
        totalColor: "text-emerald-600",
        contributor: {
            name: "Dinda",
            initial: "D",
            percentage: "60%",
            bgColor: "bg-[#e0f2f1]",
            textColor: "text-[#7ca29d]",
        },
        trend: "up" as const,
    },
    {
        month: "Maret 2026",
        total: "Rp 2.950.000",
        totalColor: "text-rose-500",
        contributor: {
            name: "Raka",
            initial: "R",
            percentage: "55%",
            bgColor: "bg-[#fef3c7]",
            textColor: "text-amber-600",
        },
        trend: "down" as const,
    },
];

export default function LaporanPage() {
    const [activeFilter, setActiveFilter] = useState("Bulan Ini");
    const filters = ["Bulan Ini", "3 Bulan", "Tahun Ini"];

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
                            Analisis pertumbuhan tabungan masa depan kita
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
                        <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-[#7ca29d] transition-colors">
                            <span className="material-symbols-outlined">calendar_today</span>
                        </button>
                    </div>
                </header>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                    <div className="lg:col-span-8">
                        <MonthlyBarChart data={chartData} />
                    </div>
                    <div className="lg:col-span-4">
                        <AllocationChart allocations={allocations} />
                    </div>
                </div>

                {/* Monthly Summary Table */}
                <MonthlySummaryTable data={summaryData} />
            </main>
            <Footer />
        </>
    );
}
