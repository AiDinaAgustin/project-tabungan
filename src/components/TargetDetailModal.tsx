"use client";

import { useState, useEffect } from "react";
import { getSavingsByTarget } from "@/lib/actions/savings";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

interface TargetDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    target: any;
}

export default function TargetDetailModal({
    isOpen,
    onClose,
    target,
}: TargetDetailModalProps) {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && target) {
            const fetchHistory = async () => {
                setLoading(true);
                const data = await getSavingsByTarget(target.id);
                setHistory(data);
                setLoading(false);
            };
            fetchHistory();
        }
    }, [isOpen, target]);

    if (!isOpen || !target) return null;

    const exportToPDF = () => {
        const doc = new jsPDF();

        // Add Title
        doc.setFontSize(18);
        doc.text(`Riwayat Tabungan: ${target.title}`, 14, 22);

        // Add Target Info
        doc.setFontSize(11);
        doc.text(`Total Target: Rp ${Number(target.targetAmount).toLocaleString("id-ID")}`, 14, 32);
        doc.text(`Terkumpul: Rp ${Number(target.collectedAmount).toLocaleString("id-ID")}`, 14, 38);

        const tableColumn = ["Tanggal", "Nama Pengirim", "Jumlah", "Sumber"];
        const tableRows = history.map(item => [
            new Date(item.createdAt).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }),
            item.userName,
            `Rp ${Number(item.amount).toLocaleString("id-ID")}`,
            item.source
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 45,
            theme: 'striped',
            headStyles: { fillColor: [124, 162, 157] }
        });

        doc.save(`Riwayat_Tabungan_${target.title.replace(/\s+/g, '_')}.pdf`);
    };

    const exportToExcel = () => {
        const worksheetData = history.map(item => ({
            "Tanggal": new Date(item.createdAt).toLocaleDateString("id-ID"),
            "Nama Pengirim": item.userName,
            "Jumlah": Number(item.amount),
            "Sumber": item.source
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Riwayat Tabungan");

        // Set column widths
        const wscols = [
            { wch: 20 },
            { wch: 25 },
            { wch: 20 },
            { wch: 20 }
        ];
        worksheet['!cols'] = wscols;

        XLSX.writeFile(workbook, `Riwayat_Tabungan_${target.title.replace(/\s+/g, '_')}.xlsx`);
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 relative z-10 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="bg-gradient-to-br from-[#7ca29d]/10 to-[#e0f2f1]/20 p-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${target.iconBg} rounded-xl flex items-center justify-center ${target.iconColor}`}>
                                <span className="material-symbols-outlined text-2xl">{target.icon}</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">{target.title}</h3>
                                <p className="text-xs font-bold text-[#7ca29d] uppercase tracking-widest">Detail Riwayat Tabungan</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            <span className="material-symbols-outlined text-xl text-slate-400 font-light">close</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target</p>
                            <p className="text-lg font-extrabold text-slate-800">
                                Rp {Number(target.targetAmount).toLocaleString("id-ID")}
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Terkumpul</p>
                            <p className="text-lg font-extrabold text-[#7ca29d]">
                                Rp {Number(target.collectedAmount).toLocaleString("id-ID")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Daftar Transaksi</p>
                        <div className="flex gap-2">
                            <button
                                onClick={exportToPDF}
                                disabled={history.length === 0}
                                className="flex items-center gap-2 px-3 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-100 transition-colors disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                                PDF
                            </button>
                            <button
                                onClick={exportToExcel}
                                disabled={history.length === 0}
                                className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-lg">description</span>
                                Excel
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <span className="animate-spin material-symbols-outlined text-3xl text-[#7ca29d] mb-4">sync</span>
                            <p className="text-sm font-medium text-slate-400">Memuat riwayat...</p>
                        </div>
                    ) : history.length > 0 ? (
                        <div className="space-y-3">
                            {history.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-[#7ca29d]/30 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center border border-slate-100 shadow-sm text-[10px] font-bold text-[#7ca29d]">
                                            {item.userName?.[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-700">{item.userName}</p>
                                            <p className="text-[10px] text-slate-400 font-medium">
                                                {new Date(item.createdAt).toLocaleDateString("id-ID", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })} • {item.source}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-extrabold text-slate-800">
                                        + Rp {Number(item.amount).toLocaleString("id-ID")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-3xl text-slate-200">history</span>
                            </div>
                            <p className="text-sm font-bold text-slate-300">Belum ada riwayat tabungan</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-slate-50 text-center">
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                        Setiap langkah kecil membawamu lebih dekat ke impian.
                    </p>
                </div>
            </div>
        </div>
    );
}
