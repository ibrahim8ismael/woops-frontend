"use client";

import React from "react";
import { motion } from "motion/react";
import { 
  MoreHorizontal, Cloud, Hexagon, Users, Database, Shield, FolderSync, Plus, Settings2
} from "lucide-react";
import { cn } from "@/lib/utils";

const INTEGRATIONS = [
  {
    provider: "GOOGLE",
    name: "Google Drive",
    description: "Connecting with this program helps you link your external documents directly to woops.",
    isConnected: true,
    icon: Cloud,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50/50"
  },
  {
    provider: "FLOWMONO",
    name: "Flowmono Process Manager",
    description: "Connecting with this program helps you link automated triggers to your pipelines.",
    isConnected: true,
    icon: Hexagon,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50/50"
  },
  {
    provider: "MICROSOFT",
    name: "Microsoft Dynamics",
    description: "Connecting with this program helps you link legacy enterprise records to woops.",
    isConnected: false,
    icon: Database,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50/50"
  },
  {
    provider: "MICROSOFT",
    name: "Teams",
    description: "Connecting with this program helps you link team conversational alerts to notifications.",
    isConnected: false,
    icon: Users,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50/50"
  },
  {
    provider: "STERLING",
    name: "Sterling Connector",
    description: "Connecting with this program helps you link validated background checks to your roster.",
    isConnected: true,
    icon: Shield,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50/50"
  },
  {
    provider: "GOOGLE",
    name: "Flowmono Drive",
    description: "Connecting with this program helps you link dedicated storage arrays to active projects.",
    isConnected: false,
    icon: FolderSync,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-50/50"
  }
];

export default function ChannelsPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto pb-12 font-sans overflow-x-hidden">
      
      {/* Page Header */}
      <div className="mb-8 pl-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Connected Channels</h1>
        <p className="text-slate-500 mt-2 text-sm font-medium">
          Manage your integration channels and third-party app connections.
        </p>
      </div>

      {/* Integrations Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4, staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {INTEGRATIONS.map((integration, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {/* Integration Icon Box */}
                <div className={cn("h-[46px] w-[46px] rounded-[14px] border border-slate-100/80 flex items-center justify-center shrink-0", integration.iconBg)}>
                  <integration.icon className={cn("h-6 w-6 stroke-[2px]", integration.iconColor)} />
                </div>
                {/* Titles */}
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                    {integration.provider}
                  </span>
                  <h3 className="text-[15px] font-bold text-slate-800 leading-tight">
                    {integration.name}
                  </h3>
                </div>
              </div>
              {/* Optional Actions Menu */}
              <button className="text-slate-400 hover:text-slate-700 transition-colors p-1 -mt-1 -mr-1 rounded-md hover:bg-slate-50">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            {/* Description Body */}
            <p className="mt-5 text-[13px] text-slate-500 font-medium leading-relaxed">
              {integration.description}
            </p>

            {/* Bottom Footer (Pushed to bottom using mt-auto if container expands) */}
            <div className="mt-auto pt-1">
              {/* Soft line separator */}
              <div className="my-[18px] h-[1px] w-full bg-slate-100/80" />
              
              {/* Connection Status & Action Buttons */}
              <div className="flex items-center justify-between">
                <span className={cn(
                  "inline-flex items-center justify-center px-3 py-1 rounded-[8px] text-[11px] font-bold tracking-wide", 
                  integration.isConnected 
                    ? "text-emerald-700 bg-emerald-50" 
                    : "text-slate-500 bg-slate-100"
                )}>
                  {integration.isConnected ? "Connected" : "Not Connected"}
                </span>

                <button 
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-xl border transition-colors shadow-sm",
                    integration.isConnected 
                      ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      : "border-slate-900 bg-slate-900 text-white hover:bg-slate-800"
                  )}
                >
                  {integration.isConnected ? (
                    <>
                      <Settings2 className="h-3.5 w-3.5" /> Manage
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" /> Connect
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
