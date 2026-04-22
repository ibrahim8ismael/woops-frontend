"use client";

import React from "react";
import { motion } from "motion/react";
import { 
  Users, CheckCircle2, Briefcase, ArrowUpRight, 
  MoreHorizontal, ChevronLeft, ChevronRight, ArrowUpLeft,
  Search, Filter, Award, Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from "recharts";

// --- Mock Data ---
const PERFORMANCE_DATA = [
  { day: "S", ai: 30, manual: 20 },
  { day: "M", ai: 45, manual: 30 },
  { day: "T", ai: 35, manual: 40 },
  { day: "W", ai: 55, manual: 35 },
  { day: "T_ACT", ai: 40, manual: 50 }, // The highlighted 'Today'
  { day: "F", ai: 65, manual: 45 },
  { day: "S", ai: 50, manual: 60 },
  { day: "M_2", ai: 60, manual: 40 },
  { day: "T_2", ai: 45, manual: 55 },
];

const TABLE_DATA = [
  { sl: "01", name: "Sarah Jenkins", dept: "Enterprise SaaS", award: "TechFlow", date: "22/04/2026", initials: "SJ", color: "bg-blue-100 text-blue-700" },
  { sl: "02", name: "Michael Chen", dept: "Design Agency", award: "Pinnacle", date: "21/04/2026", initials: "MC", color: "bg-amber-100 text-amber-700" },
  { sl: "03", name: "Elena Rodriguez", dept: "Logistics", award: "Global Fleet", date: "19/04/2026", initials: "ER", color: "bg-emerald-100 text-emerald-700" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-emerald-900 text-white shadow-xl rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-2">
        <span>{payload[0].value} AI</span>
        <span className="w-1 h-1 rounded-full bg-emerald-400" />
        <span className="text-emerald-200">{payload[1].value} Man</span>
      </div>
    );
  }
  return null;
};

// --- Components ---
const KpiCard = ({ title, value, trend, icon: Icon, subtitle }: any) => (
  <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100/60 flex flex-col justify-between hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow">
    <div className="flex items-center gap-3 mb-6">
      <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
    </div>
    <div>
      <p className="text-xs font-medium text-slate-400 mb-1">{subtitle}</p>
      <div className="flex items-end gap-3">
        <span className="text-[40px] leading-none font-bold text-slate-900 tracking-tight">{value}</span>
        <div className="flex items-center text-xs font-semibold text-slate-600 mb-1.5">
          <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> {trend}
        </div>
      </div>
    </div>
  </div>
);

export default function AnalyticsPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto pb-12 font-sans overflow-x-hidden">
      
      {/* Dashboard Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4, staggerChildren: 0.1 }}
        className="grid grid-cols-1 xl:grid-cols-12 gap-6"
      >
        {/* LEFT COLUMN (8 cols) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          
          {/* Top KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KpiCard 
              title="Total Active Deals" 
              value="1,248" 
              trend="+4%" 
              subtitle="In Pipeline"
              icon={Users} 
            />
            <KpiCard 
              title="Leads Engaged" 
              value="1,102" 
              trend="+4%" 
              subtitle="Generated Today"
              icon={CheckCircle2} 
            />
            <KpiCard 
              title="Open Proposals" 
              value="14" 
              trend="+4%" 
              subtitle="Awaiting Signature"
              icon={Briefcase} 
            />
          </div>

          {/* Tracker + Progress Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Tracker Chart Card */}
            <div className="md:col-span-5 bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100/60 relative">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-semibold text-slate-800">Tracker</h3>
                <button className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/50 hover:bg-slate-100 transition-colors">
                  History <ChevronRight className="h-3 w-3" />
                </button>
              </div>

              <div className="relative flex items-center justify-center py-4">
                {/* Custom SVG Donut imitating the styled aesthetic */}
                <svg viewBox="0 0 100 100" className="w-[200px] h-[200px] -rotate-90">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#f8fafc" strokeWidth="12" />
                  {/* Dashed background segment mimicking the screenshot's empty area style */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#cbd5e1" strokeWidth="12" strokeDasharray="2 4" />
                  <circle 
                    cx="50" cy="50" r="38" 
                    fill="none" 
                    stroke="#a7f3d0" 
                    strokeWidth="12" 
                    strokeDasharray="180 251.2" 
                  />
                  <circle 
                    cx="50" cy="50" r="38" 
                    fill="none" 
                    stroke="#047857" 
                    strokeWidth="12" 
                    strokeDasharray="80 251.2" 
                    strokeDashoffset="-100"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl tracking-tight font-bold text-slate-900 mt-2">68%</span>
                  <span className="text-[10px] font-semibold text-slate-500 max-w-[80px] text-center leading-tight">AI Resolution Rate</span>
                </div>
              </div>
            </div>

            {/* Progress Line Chart Card */}
            <div className="md:col-span-7 bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100/60 relative">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Progress</h3>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-3xl font-bold tracking-tight text-slate-900">4.2k</span>
                    <span className="text-xs font-semibold text-slate-500 mb-1.5 leading-tight">Interactions<br/>This Week</span>
                  </div>
                </div>
                <button className="h-8 w-8 rounded-lg border border-slate-200/60 flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors">
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              <div className="h-[200px] w-full mt-4 -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={PERFORMANCE_DATA} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="4 4" horizontal={false} vertical={true} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={(props) => {
                        const { x, y, payload } = props;
                        const isToday = payload.value === "T_ACT";
                        const label = payload.value.split('_')[0];
                        return (
                          <g transform={`translate(${x},${y})`}>
                            {isToday ? (
                              <circle cx="0" cy="12" r="10" fill="#f8fafc" stroke="#047857" strokeWidth="2" />
                            ) : null}
                            <text x="0" y="16" dy="0" textAnchor="middle" fill={isToday ? "#047857" : "#94a3b8"} fontSize="11" fontWeight="600">
                              {label}
                            </text>
                          </g>
                        );
                      }}
                      dy={10} 
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }} />
                    <Line type="monotone" dataKey="ai" stroke="#047857" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" dataKey="manual" stroke="#a7f3d0" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - SCHEDULE (4 cols) */}
        <div className="xl:col-span-4 bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100/60 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">Schedule</h3>
            <button className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-500 transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-5 mb-8 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-base font-bold text-slate-900">April 22</h4>
              <div className="flex gap-1">
                <button className="h-7 w-7 rounded border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 shadow-sm text-slate-600"><ChevronLeft className="h-4 w-4" /></button>
                <button className="h-7 w-7 rounded border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 shadow-sm text-slate-600"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="flex justify-between items-center px-1">
              {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'].map((day, i) => {
                const date = 19 + i;
                const isActive = date === 22;
                return (
                  <div key={day} className="flex flex-col items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-400">{day}</span>
                    <span className={cn(
                      "h-9 w-9 rounded-xl flex items-center justify-center text-sm font-bold transition-colors cursor-pointer text-slate-700",
                      isActive ? "bg-emerald-900 text-white shadow-md transform scale-105" : "hover:bg-white hover:shadow-sm"
                    )}>
                      {date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-1 space-y-0 pl-16 pt-2">
            
            {/* Timeline Item 1 */}
            <div className="relative pl-6 pb-8 border-l-2 border-dashed border-slate-200">
              <div className="absolute -left-[7px] top-1.5 h-3 w-3 bg-white border-[3px] border-emerald-200 rounded-full" />
              <div className="absolute -left-[60px] top-0.5 text-xs font-bold text-slate-600 w-12 text-right">10:00 AM</div>
              <div className="bg-emerald-50/80 rounded-xl p-3 -mt-2 border border-emerald-100/50">
                 <div className="font-bold text-slate-800 text-sm">Product Demo</div>
                 <div className="text-xs font-medium text-slate-500 mt-1">Acme Corporation</div>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative pl-6 pb-8 border-l-2 border-dashed border-slate-200">
              <div className="absolute -left-[7px] top-1.5 h-3 w-3 bg-white border-[3px] border-emerald-600 rounded-full" />
              <div className="absolute -left-[60px] top-0.5 text-xs font-bold text-slate-600 w-12 text-right">11:30 AM</div>
              <div className="bg-slate-100 rounded-xl p-3 -mt-2 border border-slate-200/60">
                 <div className="font-bold text-slate-800 text-sm">Contract Review</div>
                 <div className="text-xs font-medium text-slate-500 mt-1">Global Logistics</div>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative pl-6 pb-2 border-l-2 border-dashed border-transparent">
              <div className="absolute -left-[7px] top-1.5 h-3 w-3 bg-white border-[3px] border-emerald-200 rounded-full" />
              <div className="absolute -left-[60px] top-0.5 text-xs font-bold text-slate-600 w-12 text-right">02:00 PM</div>
              <div className="bg-emerald-50/80 rounded-xl p-3 -mt-2 border border-emerald-100/50">
                 <div className="font-bold text-slate-800 text-sm">Onboarding Call</div>
                 <div className="text-xs font-medium text-slate-500 mt-1">Pinnacle Design</div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM ROW (12 cols combined) */}
        
        {/* Left Bottom - Impact Metrics */}
        <div className="xl:col-span-4 bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100/60 relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800">Atlas Impact Metrics</h3>
            <button className="h-8 w-8 rounded-lg border border-slate-200/60 flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors">
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-6 mb-8 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-900" /> Fully Automated
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-300" /> Human Assisted
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-sm font-bold text-slate-800 mb-2">
                <span>General Inquiries</span>
                <span>86.8%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3.5 flex overflow-hidden">
                <div className="bg-emerald-900 h-full" style={{ width: '66.8%' }} />
                <div className="bg-emerald-300 h-full" style={{ width: '20%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm font-bold text-slate-800 mb-2">
                <span>Problem Solving</span>
                <span>74.5%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3.5 flex overflow-hidden">
                <div className="bg-emerald-300 h-full" style={{ width: '74.5%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between text-sm font-bold text-slate-800 mb-2">
                <span>Technical Support</span>
                <span>42.0%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3.5 flex overflow-hidden">
                <div className="bg-emerald-900 h-full" style={{ width: '25%' }} />
                <div className="bg-emerald-300 h-full" style={{ width: '17%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Bottom - Data Table */}
        <div className="xl:col-span-8 bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100/60 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold text-slate-800">Recent Closed Deals</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                <Filter className="h-4 w-4" /> Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[13px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 font-semibold w-12">CL.</th>
                  <th className="py-4 font-semibold px-2">Image</th>
                  <th className="py-4 font-semibold">Name</th>
                  <th className="py-4 font-semibold">Department</th>
                  <th className="py-4 font-semibold">Client Target</th>
                  <th className="py-4 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {TABLE_DATA.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors text-sm group">
                    <td className="py-4 font-bold text-slate-800">{row.sl}</td>
                    <td className="py-4 px-2">
                       <div className={cn("h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-sm", row.color)}>
                         {row.initials}
                       </div>
                    </td>
                    <td className="py-4 font-bold text-slate-800">{row.name}</td>
                    <td className="py-4 font-medium text-slate-600">{row.dept}</td>
                    <td className="py-4 font-bold text-slate-800 flex items-center gap-2">
                      <Target className="h-4 w-4 text-emerald-500" /> {row.award}
                    </td>
                    <td className="py-4 font-medium text-slate-500">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
