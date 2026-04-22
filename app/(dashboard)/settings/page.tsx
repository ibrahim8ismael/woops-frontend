"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building, Bot, Shield, Users, Bell, CreditCard, Download, Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const menuItems = [
    { id: "profile", label: "Workspace Profile", icon: null },
    { id: "security", label: "Password & Security", icon: null },
    { id: "atlas", label: "Atlas AI Setup", icon: null },
    { id: "teams", label: "Teams", icon: null },
    { id: "notifications", label: "Notifications", icon: null },
    { id: "billing", label: "Billing", icon: null },
    { id: "export", label: "Data Export", icon: null },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header outside the main card */}
      <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
        Workspace Settings
      </h1>

      {/* Main Container mimicking the screenshot */}
      <div className="flex flex-col md:flex-row bg-white border border-slate-200/60 shadow-sm rounded-2xl overflow-hidden min-h-[700px]">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0 border-r border-slate-100 p-6 flex flex-col gap-1">
          <nav className="flex flex-col space-y-1">
            {menuItems.map((item) => (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id)}
                 className={cn(
                   "flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                   activeTab === item.id 
                     ? "bg-emerald-50 text-emerald-700" 
                     : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                 )}
               >
                 {item.label}
               </button>
            ))}
            
            <button
               onClick={() => setActiveTab("delete")}
               className={cn(
                 "flex items-center mt-6 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                 activeTab === "delete"
                   ? "bg-red-50 text-red-700" 
                   : "text-red-500 hover:bg-red-50 hover:text-red-600"
               )}
             >
               Delete Workspace
             </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-10 hide-scrollbar overflow-y-auto">
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl space-y-8">
              <h2 className="text-xl font-semibold text-slate-900">Workspace Profile</h2>

              {/* Top Profile Card */}
              <div className="border border-slate-200/80 rounded-2xl p-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                   <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-xl shrink-0 overflow-hidden">
                     JD
                   </div>
                   <div>
                     <h3 className="text-base font-semibold text-slate-900">John Doe</h3>
                     <p className="text-sm text-slate-500 font-medium">Head of Operations</p>
                     <p className="text-sm text-slate-400 mt-0.5">San Francisco, United States</p>
                   </div>
                </div>
                <Button variant="secondary" size="sm" className="bg-slate-100/80 text-emerald-700 hover:bg-slate-200 shadow-none font-medium gap-1.5 h-9 px-4 rounded-xl">
                  <Edit className="h-4 w-4" /> Edit
                </Button>
              </div>

              {/* Personal Information Card */}
              <div className="border border-slate-200/80 rounded-2xl p-6 shadow-sm relative">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-base font-semibold text-slate-900">Personal Information</h3>
                  <Button variant="secondary" size="sm" className="bg-slate-100/80 text-emerald-700 hover:bg-slate-200 shadow-none font-medium gap-1.5 h-9 px-4 rounded-xl absolute top-6 right-6">
                    <Edit className="h-4 w-4" /> Edit
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1.5">First Name</p>
                    <p className="text-sm font-medium text-slate-900">John</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1.5">Last Name</p>
                    <p className="text-sm font-medium text-slate-900">Doe</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1.5">Email Address</p>
                    <p className="text-sm font-medium text-slate-900">john.doe@acme.com</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1.5">Phone</p>
                    <p className="text-sm font-medium text-slate-900">+1-555-012-3456</p>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-xs font-semibold text-slate-400 mb-1.5">Bio</p>
                    <p className="text-sm font-medium text-slate-900">Head of Operations</p>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="border border-slate-200/80 rounded-2xl p-6 shadow-sm relative">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-base font-semibold text-slate-900">Workspace Details</h3>
                   <Button variant="secondary" size="sm" className="bg-slate-100/80 text-emerald-700 hover:bg-slate-200 shadow-none font-medium gap-1.5 h-9 px-4 rounded-xl absolute top-6 right-6">
                    <Edit className="h-4 w-4" /> Edit
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1.5">Country</p>
                    <p className="text-sm font-medium text-slate-900">United States</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1.5">City/State</p>
                    <p className="text-sm font-medium text-slate-900">San Francisco, California</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1.5">Postal Code</p>
                    <p className="text-sm font-medium text-slate-900">94105</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1.5">TAX ID</p>
                    <p className="text-sm font-medium text-slate-900">US-84930184</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "atlas" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl space-y-8">
              <h2 className="text-xl font-semibold text-slate-900">Atlas AI Setup</h2>

               {/* Atlas Configuration Card */}
               <div className="border border-slate-200/80 rounded-2xl p-6 shadow-sm relative">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2"><Bot className="h-5 w-5 text-emerald-600" /> Assistant Core</h3>
                  <Button variant="secondary" size="sm" className="bg-slate-100/80 text-emerald-700 hover:bg-slate-200 shadow-none font-medium gap-1.5 h-9 px-4 rounded-xl absolute top-6 right-6">
                    <Edit className="h-4 w-4" /> Edit
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-y-8">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1.5">System Identifier</p>
                    <p className="text-sm font-medium text-slate-900">Atlas</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1.5">Core Prompt / Persona</p>
                    <div className="text-sm font-medium text-slate-900 bg-slate-50 p-4 rounded-xl leading-relaxed mt-1">
                      &quot;You are Atlas, a helpful and professional customer support assistant for Acme Corp. Always maintain a polite tone. When handling products, ensure you reference the connected Knowledge Base strictly.&quot;
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1.5">Knowledge Ingestion Sync</p>
                    <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                       <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Active (Auto-Indexing)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab !== "profile" && activeTab !== "atlas" && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 flex flex-col items-center justify-center text-center">
               <div className="h-16 w-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-4">
                 <Building className="h-8 w-8 text-slate-300" />
               </div>
               <h3 className="text-lg font-semibold text-slate-900 capitalize">{activeTab} Details</h3>
               <p className="text-sm text-slate-500 mt-1 max-w-md">
                 Configuration mapping for the {activeTab} settings module is currently syncing.
               </p>
             </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
