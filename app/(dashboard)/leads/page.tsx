"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, Mail, Phone, Building, DollarSign, Calendar, 
  Search, Plus, LayoutGrid, List as ListIcon, 
  MoreHorizontal, ChevronRight, Activity, ArrowUpRight, 
  MessageSquare, Trash2, X, Target
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

// --- Types ---
type LeadStage = "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  value: number;
  stage: LeadStage;
  source: string;
  notes: string;
  createdAt: string;
  lastActive: string;
}

const STAGES: { id: LeadStage; label: string; color: string; border: string; bg: string }[] = [
  { id: "new", label: "New Lead", color: "text-blue-700", border: "border-blue-200", bg: "bg-blue-50" },
  { id: "contacted", label: "Contacted", color: "text-amber-700", border: "border-amber-200", bg: "bg-amber-50" },
  { id: "qualified", label: "Qualified", color: "text-indigo-700", border: "border-indigo-200", bg: "bg-indigo-50" },
  { id: "proposal", label: "Proposal", color: "text-purple-700", border: "border-purple-200", bg: "bg-purple-50" },
  { id: "won", label: "Closed Won", color: "text-emerald-700", border: "border-emerald-200", bg: "bg-emerald-50" },
  { id: "lost", label: "Closed Lost", color: "text-slate-500", border: "border-slate-200", bg: "bg-slate-100" },
];

const INITIAL_LEADS: Lead[] = [
  {
    id: "L-1001", name: "Sarah Jenkins", company: "TechFlow Solutions", email: "sarah.j@techflow.io", phone: "+1 (555) 123-4567",
    value: 12500, stage: "new", source: "AI Website Assistant", notes: "Asked about enterprise pricing model.",
    createdAt: "2024-05-18T09:30:00Z", lastActive: "2024-05-18T09:30:00Z"
  },
  {
    id: "L-1002", name: "Michael Chen", company: "Pinnacle Design", email: "mchen@pinnacledesign.co", phone: "+1 (555) 987-6543",
    value: 4800, stage: "contacted", source: "Inbound Email", notes: "Followed up regarding their design overhaul project.",
    createdAt: "2024-05-17T11:20:00Z", lastActive: "2024-05-18T10:15:00Z"
  },
  {
    id: "L-1003", name: "Elena Rodriguez", company: "Global Logistics", email: "elena.r@globallogistics.com", phone: "+1 (555) 456-7890",
    value: 35000, stage: "qualified", source: "LinkedIn", notes: "Needs integration with 3rd party APIs.",
    createdAt: "2024-05-16T14:45:00Z", lastActive: "2024-05-17T16:00:00Z"
  },
  {
    id: "L-1004", name: "James Wilson", company: "Wilson & Co Advisors", email: "james@wilsonadvisors.net", phone: "+1 (555) 222-3333",
    value: 8500, stage: "proposal", source: "AI Website Assistant", notes: "Sent proposal draft yesterday. Waiting for review.",
    createdAt: "2024-05-14T08:15:00Z", lastActive: "2024-05-18T09:00:00Z"
  },
  {
    id: "L-1005", name: "Ahmed Hassan", company: "CloudScale Inc", email: "ahmed@cloudscale.io", phone: "+1 (555) 888-9999",
    value: 55000, stage: "won", source: "Referral", notes: "Signed the contract. Moving to onboarding phase.",
    createdAt: "2024-05-01T10:00:00Z", lastActive: "2024-05-18T11:00:00Z"
  }
];

// Simple formatting utility
const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

// Simple Slide-over panel component
const SlidePanel = ({ isOpen, onClose, title, children }: any) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm" />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-600" /> {title}
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full border border-slate-200 bg-white">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [viewMode, setViewMode] = useState<"board" | "list">("board");
  const [searchTerm, setSearchTerm] = useState("");
  const [draggedLead, setDraggedLead] = useState<string | null>(null);

  // Panel State
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [formData, setFormData] = useState<Partial<Lead>>({});

  const filteredLeads = useMemo(() => {
    return leads.filter(l => 
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [leads, searchTerm]);

  // --- Handlers ---
  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    setDraggedLead(leadId);
    e.dataTransfer.effectAllowed = "move";
    // For visual ghost effect
    setTimeout(() => {
      if (document.getElementById(`lead-${leadId}`)) {
        document.getElementById(`lead-${leadId}`)!.style.opacity = "0.5";
      }
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent, leadId: string) => {
    setDraggedLead(null);
    if (document.getElementById(`lead-${leadId}`)) {
      document.getElementById(`lead-${leadId}`)!.style.opacity = "1";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, stage: LeadStage) => {
    e.preventDefault();
    if (!draggedLead) return;
    setLeads(prev => prev.map(l => l.id === draggedLead ? { ...l, stage, lastActive: new Date().toISOString() } : l));
    setDraggedLead(null);
  };

  const openForm = (lead?: Lead) => {
    if (lead) {
      setActiveLead(lead);
      setFormData({ ...lead });
    } else {
      setActiveLead(null);
      setFormData({
        name: "", company: "", email: "", phone: "", value: 0, stage: "new", source: "Manual Entry", notes: ""
      });
    }
    setPanelOpen(true);
  };

  const saveLead = () => {
    if (!formData.name) return; // Simple validation

    if (activeLead) {
      setLeads(prev => prev.map(l => l.id === activeLead.id ? { ...l, ...formData as Lead, lastActive: new Date().toISOString() } : l));
    } else {
      setLeads([{ 
        ...formData as Lead, 
        id: `L-${Date.now()}`, 
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      }, ...leads]);
    }
    setPanelOpen(false);
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    setPanelOpen(false);
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() || "L";
  };

  return (
    <div className="w-full h-[calc(100vh-8rem)] flex flex-col font-sans">
      {/* Header Area */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            Pipeline & CRM
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manage your leads, track deals, and close more business.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search leads..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 w-full sm:w-64 bg-white"
            />
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <Button 
              variant={viewMode === "board" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => setViewMode("board")}
              className={cn("h-8 px-3 rounded-md", viewMode === "board" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-900")}
            >
              <LayoutGrid className="h-4 w-4 mr-2" /> Board
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => setViewMode("list")}
              className={cn("h-8 px-3 rounded-md", viewMode === "list" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-900")}
            >
              <ListIcon className="h-4 w-4 mr-2" /> List
            </Button>
          </div>

          <Button className="bg-emerald-600 hover:bg-emerald-700 shadow-sm gap-2" onClick={() => openForm()}>
            <Plus className="h-4 w-4" /> Add Lead
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "board" ? (
        // Kanban Board View
        <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
          <div className="flex gap-4 h-full min-w-max px-1">
            {STAGES.map((stage) => {
              const stageLeads = filteredLeads.filter(l => l.stage === stage.id);
              const totalValue = stageLeads.reduce((sum, l) => sum + l.value, 0);

              return (
                <div 
                  key={stage.id} 
                  className="flex flex-col w-80 shrink-0"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stage.id)}
                >
                  <div className={cn("flex items-center justify-between p-3 rounded-t-xl border border-b-0", stage.border, stage.bg)}>
                    <div className="flex items-center gap-2">
                      <div className={cn("h-2.5 w-2.5 rounded-full bg-current", stage.color)}></div>
                      <h3 className={cn("font-semibold text-sm", stage.color)}>{stage.label}</h3>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full bg-white/60 font-medium", stage.color)}>
                        {stageLeads.length}
                      </span>
                    </div>
                    {totalValue > 0 && <span className="text-xs font-semibold text-slate-500">{formatCurrency(totalValue)}</span>}
                  </div>
                  
                  <div className={cn(
                    "flex-1 bg-slate-50/50 border border-slate-200 rounded-b-xl p-3 flex flex-col gap-3 overflow-y-auto"
                  )}>
                    <AnimatePresence>
                      {stageLeads.length === 0 ? (
                        <div className="h-24 flex items-center justify-center text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                          Drop leads here
                        </div>
                      ) : (
                        stageLeads.map((lead) => (
                          <motion.div
                            layoutId={`lead-${lead.id}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={lead.id}
                            id={`lead-${lead.id}`}
                            draggable
                            onDragStart={(e: any) => handleDragStart(e, lead.id)}
                            onDragEnd={(e: any) => handleDragEnd(e, lead.id)}
                            onClick={() => openForm(lead)}
                            className="bg-white border text-left border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all rounded-xl p-4 cursor-grab active:cursor-grabbing group"
                          >
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                                  {getInitials(lead.name)}
                                </div>
                                <div className="truncate">
                                  <h4 className="font-semibold text-sm text-slate-900 truncate">{lead.name}</h4>
                                  <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                                    <Building className="h-3 w-3" /> {lead.company}
                                  </p>
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 h-6 w-6 text-slate-400 opacity-0 group-hover:opacity-100">
                                  <MoreHorizontal className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openForm(lead); }}>Edit Details</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); deleteLead(lead.id); }} className="text-red-600">Delete Lead</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            
                            {lead.notes && (
                              <p className="text-xs text-slate-600 mb-3 line-clamp-2 bg-slate-50 p-2 rounded-md">
                                {lead.notes}
                              </p>
                            )}

                            <div className="flex items-center justify-between mt-auto">
                              <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 hover:bg-slate-200">
                                {lead.source}
                              </Badge>
                              <span className="text-sm font-semibold text-slate-700">
                                {formatCurrency(lead.value)}
                              </span>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // List View
        <Card className="flex-1 shadow-sm border-slate-200 overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-200 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Lead</th>
                  <th className="px-6 py-4">Stage</th>
                  <th className="px-6 py-4">Value</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Source</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      No leads found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const stageConf = STAGES.find(s => s.id === lead.stage);
                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/50 cursor-pointer transition-colors" onClick={() => openForm(lead)}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                              {getInitials(lead.name)}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900">{lead.name}</div>
                              <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Building className="h-3 w-3" /> {lead.company}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={cn("capitalize border-transparent", stageConf?.bg, stageConf?.color)}>
                            {stageConf?.label}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {formatCurrency(lead.value)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-xs text-slate-600"><Mail className="h-3 w-3" /> {lead.email}</div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-600"><Phone className="h-3 w-3" /> {lead.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{lead.source}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" className="h-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                            Details <ArrowUpRight className="h-4 w-4 ml-1" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Detail/Edit Panel */}
      <SlidePanel 
        isOpen={panelOpen} 
        onClose={() => setPanelOpen(false)} 
        title={activeLead ? "Lead Details" : "Add New Lead"}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
              <Input value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Jane Doe" />
            </div>
            
            <div className="space-y-2 col-span-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input value={formData.company || ""} onChange={e => setFormData({...formData, company: e.target.value})} className="pl-9" placeholder="Acme Inc." />
              </div>
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input value={formData.email || ""} onChange={e => setFormData({...formData, email: e.target.value})} className="pl-9" placeholder="jane@example.com" />
              </div>
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input value={formData.phone || ""} onChange={e => setFormData({...formData, phone: e.target.value})} className="pl-9" placeholder="(555) 123-4567" />
              </div>
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Est. Deal Value</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input type="number" value={formData.value || ""} onChange={e => setFormData({...formData, value: parseInt(e.target.value) || 0})} className="pl-9" placeholder="5000" />
              </div>
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pipeline Stage</label>
              <select 
                value={formData.stage || "new"} 
                onChange={e => setFormData({...formData, stage: e.target.value as LeadStage})}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Notes & Intent</label>
              <Textarea 
                value={formData.notes || ""} 
                onChange={e => setFormData({...formData, notes: e.target.value})} 
                placeholder="What is this lead looking for?" 
                className="h-24 resize-none"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between gap-3">
            {activeLead ? (
              <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 w-full sm:w-auto" onClick={() => deleteLead(activeLead.id)}>
                <Trash2 className="h-4 w-4 mr-2" /> Delete Lead
              </Button>
            ) : <div />}
            
            <div className="flex gap-3 w-full sm:w-auto">
              <Button variant="ghost" onClick={() => setPanelOpen(false)} className="flex-1 sm:flex-none">Cancel</Button>
              <Button onClick={saveLead} className="bg-emerald-600 hover:bg-emerald-700 flex-1 sm:flex-none">
                {activeLead ? "Save Changes" : "Create Lead"}
              </Button>
            </div>
          </div>
        </div>
      </SlidePanel>
    </div>
  );
}
