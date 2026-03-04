interface HeroCardProps {
    totalAmount?: string;
    monthlyChange?: string;
}

export default function HeroCard({ totalAmount = "Rp 0", monthlyChange = "+Rp 0" }: HeroCardProps) {
    return (
        <section className="mb-6 md:mb-12">
            <div className="relative overflow-hidden rounded-md p-5 md:p-10 bg-gradient-to-br from-[#7ca29d]/20 via-[#e0f2f1]/30 to-[#fef3c7]/30">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#7ca29d]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"></div>
                <div className="relative z-10 glass-card rounded-md p-4 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#7ca29d]/80 mb-1 md:mb-2">
                            Total Tabungan Bersama
                        </p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold serif-vibe mb-1 md:mb-2">
                            {totalAmount}
                        </h1>
                        <p className="text-slate-500 font-medium text-xs md:text-base">
                            Satu langkah lebih dekat ke masa depan kita
                        </p>
                    </div>
                    <div className="w-full md:w-auto">
                        <div className="text-center md:text-left px-4 md:px-8 py-2.5 md:py-4 border-l-2 border-[#7ca29d]/20 bg-white/40 rounded-md backdrop-blur-sm">
                            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">
                                Tabungan Bulan Ini
                            </p>
                            <p className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-600">{monthlyChange}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

