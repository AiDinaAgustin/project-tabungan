"use client";

import { useState } from "react";

interface MonthlyLineChartProps {
    data: {
        month: string;
        partnerA: number;
        partnerB: number;
    }[];
    partnerNames?: [string, string];
    colors?: [string, string];
}

export default function MonthlyLineChart({
    data,
    partnerNames = ["Partner A", "Partner B"],
    colors = ["#7ca29d", "#fbbf24"]
}: MonthlyLineChartProps) {
    const defaultMonth = data.length > 0 ? data[data.length - 1].month : "";
    const [activeMonth, setActiveMonth] = useState(defaultMonth);

    const maxValue = Math.max(
        ...data.map(item => Math.max(item.partnerA + item.partnerB)), // We can stack them or show two lines. Let's show two lines.
        ...data.map(item => Math.max(item.partnerA, item.partnerB)),
        1
    );

    // Geometry for SVG
    const width = 600;
    const height = 200;
    const paddingX = 40;
    const paddingY = 40;
    const chartWidth = width - paddingX * 2;
    const chartHeight = height - paddingY * 2;

    const points = data.length > 0 ? data : [{ month: "N/A", partnerA: 0, partnerB: 0 }];
    const stepX = points.length > 1 ? chartWidth / (points.length - 1) : chartWidth;

    const getCoordinates = (value: number, index: number) => {
        const x = paddingX + index * stepX;
        const y = paddingY + chartHeight - (value / maxValue) * chartHeight;
        return { x, y };
    };

    const pathA = points.map((p, i) => {
        const { x, y } = getCoordinates(p.partnerA, i);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(" ");

    const pathB = points.map((p, i) => {
        const { x, y } = getCoordinates(p.partnerB, i);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(" ");

    return (
        <div className="bg-white p-4 md:p-8 rounded-md shadow-sm border border-slate-100 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 md:mb-8">
                <h3 className="text-sm md:text-lg font-bold serif-vibe">Pertumbuhan Bulanan</h3>
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors[0] }}></span>
                        <span className="text-[10px] md:text-xs font-bold text-slate-400 capitalize">{partnerNames[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors[1] }}></span>
                        <span className="text-[10px] md:text-xs font-bold text-slate-400 capitalize">{partnerNames[1]}</span>
                    </div>
                </div>
            </div>
            
            <div className="relative flex-1 w-full min-h-[200px] mt-2 md:mt-4">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    {/* Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                        <line
                            key={ratio}
                            x1={paddingX}
                            y1={paddingY + chartHeight * ratio}
                            x2={width - paddingX}
                            y2={paddingY + chartHeight * ratio}
                            stroke="#f8fafc"
                            strokeWidth="2"
                        />
                    ))}

                    {/* Lines */}
                    <path
                        d={pathA}
                        fill="none"
                        stroke={colors[0]}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-700 drop-shadow-md"
                    />
                    <path
                        d={pathB}
                        fill="none"
                        stroke={colors[1]}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-700 drop-shadow-md"
                    />

                    {/* Data points */}
                    {points.map((p, i) => {
                        const coordA = getCoordinates(p.partnerA, i);
                        const coordB = getCoordinates(p.partnerB, i);
                        
                        const formatCurrency = (val: number) => {
                            if (val >= 1000000) return `Rp ${(val / 1000000).toFixed(1).replace('.0', '')}jt`;
                            if (val >= 1000) return `Rp ${(val / 1000).toFixed(0)}k`;
                            return `Rp ${val}`;
                        };
                        
                        return (
                            <g key={i} className="cursor-pointer group" onClick={() => setActiveMonth(p.month)}>
                                {/* Invisible larger circle for easier hovering/clicking */}
                                <circle cx={coordA.x} cy={coordA.y} r="15" fill="transparent" />
                                <circle cx={coordB.x} cy={coordB.y} r="15" fill="transparent" />
                                
                                <circle
                                    cx={coordA.x} cy={coordA.y} r="5"
                                    fill="white" stroke={colors[0]} strokeWidth="2.5"
                                    className={`transition-all duration-300 ${activeMonth === p.month ? 'r-6 shadow-lg' : 'group-hover:r-6'}`}
                                />
                                <circle
                                    cx={coordB.x} cy={coordB.y} r="5"
                                    fill="white" stroke={colors[1]} strokeWidth="2.5"
                                    className={`transition-all duration-300 ${activeMonth === p.month ? 'r-6 shadow-lg' : 'group-hover:r-6'}`}
                                />
                                
                                {/* X-axis labels */}
                                <text
                                    x={coordA.x}
                                    y={height - 10}
                                    textAnchor="middle"
                                    className={`text-[9px] md:text-[10px] font-bold uppercase transition-all duration-300 ${activeMonth === p.month ? "fill-[#7ca29d] font-extrabold" : "fill-slate-400"}`}
                                >
                                    {p.month}
                                </text>

                                {/* Tooltip for active month */}
                                {activeMonth === p.month && (
                                    <foreignObject 
                                        x={coordA.x - 60} 
                                        y={Math.min(coordA.y, coordB.y) - 55} 
                                        width="120" 
                                        height="60"
                                        className="overflow-visible pointer-events-none"
                                    >
                                        <div className="bg-slate-800 text-white text-[10px] font-bold rounded-lg px-2.5 py-1.5 shadow-lg flex flex-col justify-center relative mx-auto w-fit">
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: colors[0] }}></span>
                                                <span className="truncate">{formatCurrency(p.partnerA)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: colors[1] }}></span>
                                                <span className="truncate">{formatCurrency(p.partnerB)}</span>
                                            </div>
                                            {/* Triangle pointer */}
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                                        </div>
                                    </foreignObject>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
