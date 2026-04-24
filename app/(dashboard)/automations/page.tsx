"use client";

import React, { useState } from "react";
import { Plus, Search, Pencil, Trash2, Play, Pause, Zap, Clock, Globe, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const AUTOMATIONS = [
  {
    id: "dbd425372",
    name: "Incident Monitoring Flow",
    date: "Aug 2, 2025 9:34 am",
    executions: "12,467",
    status: "active",
    icon: Clock,
    iconColor: "bg-emerald-500",
  },
  {
    id: "dbd425373",
    name: "New Ticket Triage",
    date: "Aug 2, 2025 5:04 pm",
    executions: "1,547",
    status: "active",
    icon: Globe,
    iconColor: "bg-blue-500",
  },
  {
    id: "dbd425374",
    name: "Weekly Analytics Report",
    date: "Aug 25, 2025 1:28 am",
    executions: "245",
    status: "active",
    icon: Clock,
    iconColor: "bg-purple-500",
  },
  {
    id: "dbd425375",
    name: "Welcome Email Sequence",
    date: "Aug 17, 2025 10:39 pm",
    executions: "21,547",
    status: "active",
    icon: Zap,
    iconColor: "bg-rose-500",
  },
  {
    id: "dbd425376",
    name: "Inactive User Cleanup",
    date: "Aug 6, 2025 10:36 am",
    executions: "654",
    status: "inactive",
    icon: Clock,
    iconColor: "bg-slate-500",
  },
];

export default function AutomationsListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAutomations = AUTOMATIONS.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-50/50 p-6 sm:p-10 lg:p-14 overflow-y-auto w-full">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Automations</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Build and manage powerful workflows to automate your processes.
            </p>
          </div>
          <button 
            onClick={() => router.push('/automation/workflow/new')}
            className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-500/20 shrink-0"
          >
            <Plus className="h-4 w-4" />
            Create Workflow
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search workflows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            />
          </div>
        </div>

        {/* List */}
        <div className="grid gap-3">
          {filteredAutomations.map((automation) => (
            <div 
              key={automation.id} 
              className="group flex flex-col xl:flex-row xl:items-center p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all cursor-pointer shadow-sm gap-4 xl:gap-0"
              onClick={() => router.push(`/automation/workflow/${automation.id}`)}
            >
              {/* Info Column */}
              <div className="flex items-center gap-4 w-[280px] shrink-0">
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-opacity-10", automation.iconColor.replace('bg-', 'bg-').replace('-500', '-500/10'))}>
                  <automation.icon className={cn("h-5 w-5", automation.iconColor.replace('bg-', 'text-'))} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors truncate text-[14px]">
                    {automation.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 truncate">
                    {automation.id}
                  </p>
                </div>
              </div>

              {/* Data Columns */}
              <div className="flex items-center flex-1 justify-between px-0 xl:px-4 text-[13px] font-medium text-slate-600 gap-4 overflow-x-auto no-scrollbar">
                <div className="w-[160px] shrink-0 truncate">{automation.date}</div>
                <div className="w-[100px] shrink-0 text-slate-900 font-semibold">{automation.executions}</div>
                
                {/* Wavy Graph Placeholder */}
                <div className="hidden lg:block w-[120px] h-[30px] opacity-60 shrink-0">
                  <svg viewBox="0 0 100 30" className="w-full h-full drop-shadow-sm" preserveAspectRatio="none">
                    <path d="M0,15 C20,5 30,25 50,15 C70,5 80,25 100,15" fill="none" strokeWidth="2"
                          className={automation.status === 'active' ? "stroke-emerald-400" : "stroke-slate-300"} />
                  </svg>
                </div>

                {/* Status Badges matched to screenshot */}
                <div className="w-[90px] shrink-0 flex justify-end">
                  {automation.status === 'active' ? (
                    <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-md">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Active
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-rose-500 text-xs font-bold bg-rose-50 px-2 py-1 rounded-md">
                      <XCircle className="h-3.5 w-3.5" />
                      Inactive
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 xl:pl-6 xl:border-l border-slate-100 xl:ml-4 shrink-0 pt-4 xl:pt-0 border-t xl:border-t-0 mt-2 xl:mt-0 justify-end w-full xl:w-auto">
                <button
                  className={cn(
                    "p-2 rounded-lg transition-colors border",
                    automation.status === 'active' 
                      ? "text-slate-500 hover:text-amber-600 hover:bg-amber-50 border-slate-200 hover:border-amber-200" 
                      : "text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 border-slate-200 hover:border-emerald-200"
                  )}
                  onClick={(e) => { e.stopPropagation(); /* Menu Handler */ }}
                  title={automation.status === 'active' ? "Pause Automation" : "Resume Automation"}
                >
                  {automation.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  className="p-2 text-blue-600 bg-white hover:bg-blue-50 rounded-lg transition-colors border border-slate-200 hover:border-blue-200"
                  onClick={(e) => { e.stopPropagation(); /* Menu Handler */ }}
                  title="Edit Automation"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  className="p-2 text-rose-600 bg-white hover:bg-rose-50 rounded-lg transition-colors border border-slate-200 hover:border-rose-200"
                  onClick={(e) => { e.stopPropagation(); /* Menu Handler */ }}
                  title="Delete Automation"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
            </div>
          ))}

          {filteredAutomations.length === 0 && (
            <div className="text-center py-16 bg-white border border-slate-200 border-dashed rounded-2xl shadow-sm">
              <Zap className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No workflows found</h3>
              <p className="text-slate-500 font-medium">Try adjusting your search or create a new automation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

