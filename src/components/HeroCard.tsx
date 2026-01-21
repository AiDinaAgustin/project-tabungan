interface HeroCardProps {
    totalAmount?: string;
    monthlyChange?: string;
}

export default function HeroCard({ totalAmount = "Rp 0", monthlyChange = "+Rp 0" }: HeroCardProps) {
    return (
        <section className="mb-12">
            <div className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-[#7ca29d]/20 via-[#e0f2f1]/30 to-[#fef3c7]/30">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#7ca29d]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"></div>
                <div className="relative z-10 glass-card rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-sm font-bold uppercase tracking-widest text-[#7ca29d]/80 mb-2">
                            Total Tabungan Bersama
                        </p>
                        <h1 className="text-5xl font-extrabold serif-vibe mb-2">
                            {totalAmount}
                        </h1>
                        <p className="text-slate-500 font-medium">
                            Satu langkah lebih dekat ke masa depan kita ✨
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 w-full md:w-auto">
                        <div className="text-center md:text-left px-6 py-2 border-l border-[#7ca29d]/20">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">
                                Bulan Ini
                            </p>
                            <p className="text-2xl font-bold text-emerald-600">{monthlyChange}</p>
                        </div>
                        <div className="text-center md:text-left px-6 py-2 border-l border-[#7ca29d]/20">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">
                                Target Terdekat
                            </p>
                            <p className="text-2xl font-bold">12 Hari</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
