"use client";

import React, { useState } from "react";
import { Plus, Search, MoreHorizontal, Zap, Clock, ShieldAlert, Cpu, Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const AUTOMATIONS = [
  {
    id: "workflow-1",
    name: "Incident Monitoring Flow",
    description: "Standardize incoming payload and generate alerts",
    trigger: { icon: Clock, type: "Schedule" },
    iconColor: "bg-emerald-500",
    actionsCount: 4,
    status: "active",
    lastRun: "2 mins ago",
    createdAt: "Oct 12, 2023",
  },
  {
    id: "workflow-2",
    name: "New Ticket Triage",
    description: "Analyze incoming support tickets with AI",
    trigger: { icon: Globe, type: "Webhook" },
    iconColor: "bg-blue-500",
    actionsCount: 6,
    status: "active",
    lastRun: "1 hour ago",
    createdAt: "Nov 4, 2023",
  },
  {
    id: "workflow-3",
    name: "Weekly Analytics Report",
    description: "Gather data and send email to stakeholders",
    trigger: { icon: Clock, type: "Schedule" },
    iconColor: "bg-purple-500",
    actionsCount: 3,
    status: "inactive",
    lastRun: "3 days ago",
    createdAt: "Dec 1, 2023",
  },
];

export default function AutomationsListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAutomations = AUTOMATIONS.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Automations</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Build and manage powerful workflows to automate your processes.
          </p>
        </div>
        <button 
          onClick={() => router.push('/workflow/new')}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-500/20"
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
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl px-4 py-2.5">
          <span className="text-slate-400">Sort by:</span>
          <select className="bg-transparent border-none focus:outline-none appearance-none cursor-pointer">
            <option>Last Edited</option>
            <option>Name (A-Z)</option>
            <option>Status</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="grid gap-4">
        {filteredAutomations.map((automation) => (
          <div 
            key={automation.id} 
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:border-slate-300 transition-all gap-6 cursor-pointer"
            onClick={() => router.push(`/workflow/${automation.id}`)}
          >
            {/* Info */}
            <div className="flex items-start gap-4">
              <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0 bg-opacity-10", automation.iconColor.replace('bg-', 'bg-').replace('-500', '-500/10'))}>
                <Zap className={cn("h-6 w-6", automation.iconColor.replace('bg-', 'text-'))} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{automation.name}</h3>
                  <div className={cn(
                    "px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase flex items-center gap-1",
                    automation.status === 'active' 
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                      : "bg-slate-100 text-slate-500 border border-slate-200"
                  )}>
                    {automation.status === 'active' && <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                    {automation.status}
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-500">
                  {automation.description}
                </p>
                <div className="flex items-center gap-4 mt-3 text-[13px] font-medium text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <automation.trigger.icon className="h-3.5 w-3.5" />
                    {automation.trigger.type}
                  </span>
                  <div className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>{automation.actionsCount} steps</span>
                  <div className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>Last run {automation.lastRun}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 sm:border-l border-slate-100 sm:pl-6">
              <div className="flex flex-col items-end gap-2">
                <button
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                  onClick={(e) => { e.stopPropagation(); /* Menu Handler */ }}
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
            
          </div>
        ))}

        {filteredAutomations.length === 0 && (
          <div className="text-center py-16 bg-slate-50 border border-slate-200 border-dashed rounded-2xl">
            <Zap className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">No workflows found</h3>
            <p className="text-slate-500 font-medium">Try adjusting your search or create a new automation.</p>
          </div>
        )}
      </div>
    </div>
  );
}
