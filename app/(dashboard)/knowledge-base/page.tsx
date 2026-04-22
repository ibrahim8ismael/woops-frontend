"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, Search, Edit2, Trash2, Eye, FileText, 
  Settings2, Activity, ShieldCheck, X, BookOpen, AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

// Recharts for monthly usage
import { AreaChart, Area, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

// --- Types & Mocks ---
type Category = { id: string, name: string, color: string };
type Status = "active" | "archived";
type Document = { id: string, title: string, categoryId: string, status: Status, content: string, addedDate: string };

const CATEGORIES: Category[] = [
  { id: 'c1', name: 'Shipping & Delivery', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { id: 'c2', name: 'Product Info', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { id: 'c3', name: 'Returns', color: 'bg-pink-100 text-pink-800 border-pink-200' },
  { id: 'c4', name: 'General Support', color: 'bg-slate-100 text-slate-800 border-slate-200' },
];

const INITIAL_DOCS: Document[] = [
  { id: 'DOC-1', title: 'Standard Shipping Times', categoryId: 'c1', status: 'active', content: 'Our standard shipping takes 3-5 business days for domestic orders.', addedDate: '2026-04-10' },
  { id: 'DOC-2', title: 'Return Policy 30 Days', categoryId: 'c3', status: 'active', content: 'Customers can return items within 30 days of receipt if unworn and with tags attached. Refunds process in 5-7 days.', addedDate: '2026-04-12' },
  { id: 'DOC-3', title: 'Sizing Guide Context', categoryId: 'c2', status: 'archived', content: 'Our sizes run slightly large. We recommend sizing down if between sizes.', addedDate: '2026-04-15' },
];

const MONTHLY_USAGE = [
  { name: 'Week 1', queries: 250 },
  { name: 'Week 2', queries: 400 },
  { name: 'Week 3', queries: 320 },
  { name: 'Week 4', queries: 750 },
];

// --- Subcomponents ---
const RadialGauge = ({ value, max, label, colorClass, size = 110, strokeWidth = 10, formatLabel = (v: number) => v.toString() }: any) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min((value / max) * 100, 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} className="stroke-slate-100" strokeWidth={strokeWidth} fill="none" />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
          cx={size / 2} cy={size / 2} r={radius} className={colorClass} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeDasharray={circumference}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold tracking-tight text-slate-900">{formatLabel(value)}</span>
        {label && <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-1">{label}</span>}
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, description, children, maxWidth = "max-w-xl" }: any) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className={`w-full ${maxWidth} bg-white rounded-2xl shadow-2xl border border-slate-200 pointer-events-auto flex flex-col max-h-[90vh] overflow-hidden`}
            >
              <div className="flex items-start justify-between p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">{title}</h2>
                  {description && <p className="text-sm text-slate-500 mt-1.5">{description}</p>}
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8 shrink-0 bg-white shadow-sm border border-slate-200 hover:bg-slate-100">
                  <X className="h-4 w-4 text-slate-600" />
                </Button>
              </div>
              <div className="p-6 md:p-8 overflow-y-auto w-full max-w-full block">
                {children}
              </div>
            </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

// --- Main Page Component ---
export default function KnowledgeBasePage() {
  const [docs, setDocs] = useState<Document[]>(INITIAL_DOCS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCatFilter, setSelectedCatFilter] = useState("all");

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);
  
  const [activeDoc, setActiveDoc] = useState<Document | null>(null);
  const [formData, setFormData] = useState<Partial<Document>>({});

  // Stats
  const limit = 50;
  const used = docs.length;
  const score = 88; // Example score
  
  const filteredDocs = docs.filter(d => 
    (selectedCatFilter === "all" || d.categoryId === selectedCatFilter) &&
    (d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCategory = (id: string) => CATEGORIES.find(c => c.id === id) || CATEGORIES[3];

  const handleOpenForm = (doc?: Document) => {
    setActiveDoc(doc || null);
    setFormData(doc ? { ...doc } : { title: "", content: "", categoryId: CATEGORIES[0].id, status: "active" });
    setIsFormOpen(true);
  };

  const handleSaveDoc = () => {
    if (!formData.title || !formData.content) return;
    if (activeDoc) {
      setDocs(docs.map(d => d.id === activeDoc.id ? { ...d, ...formData as Document } : d));
    } else {
      const newDoc: Document = {
        id: `DOC-${Date.now()}`,
        title: formData.title || "",
        content: formData.content || "",
        categoryId: formData.categoryId || CATEGORIES[0].id,
        status: formData.status as Status || "active",
        addedDate: new Date().toISOString().split('T')[0]
      };
      setDocs([newDoc, ...docs]);
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (activeDoc) {
      setDocs(docs.filter(d => d.id !== activeDoc.id));
      setIsDeleteOpen(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8 pb-12 overflow-hidden w-full max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Knowledge Base</h1>
          <p className="text-slate-500 mt-1">Manage documents and training data that powers your AI agent.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link href="/knowledge-base/urgent" className="w-full sm:w-auto">
            <Button variant="outline" className="shadow-sm gap-2 w-full sm:w-auto border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800">
              <AlertCircle className="h-4 w-4" /> Urgent Actions
            </Button>
          </Link>
          <Button onClick={() => handleOpenForm()} className="shadow-md gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" /> Add Document
          </Button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-emerald-100 bg-gradient-to-b from-white to-emerald-50/30 shadow-sm overflow-hidden flex flex-col w-full h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-600" />
              KB Capacity
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-slate-900">{limit - used}</p>
              <p className="text-sm font-medium text-emerald-600 mt-1">Documents remaining</p>
              <p className="text-xs text-slate-500 mt-2">Used {used} out of {limit}</p>
            </div>
            <RadialGauge value={used} max={limit} colorClass="stroke-emerald-500" size={90} strokeWidth={8} />
          </CardContent>
        </Card>

        <Card className="shadow-sm overflow-hidden flex flex-col w-full h-full">
          <CardHeader className="pb-0 shrink-0">
            <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-500" />
              AI Queries Answered
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex-1 w-full min-h-[100px] overflow-hidden px-0 pb-0">
             <div className="pl-6 pb-2">
               <span className="text-2xl font-bold text-slate-900">1,720</span>
               <span className="text-xs text-green-600 font-medium ml-2">+12% this month</span>
             </div>
             <div className="h-[80px] w-full mt-auto">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={MONTHLY_USAGE} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                   <defs>
                     <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                       <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                   <Area type="monotone" dataKey="queries" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVisits)" />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm w-full h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-500" />
              Performance Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex-1 space-y-3">
              <p className="text-sm text-slate-600 leading-snug pr-4">Your AI resolves <span className="font-semibold text-slate-900">88%</span> of incoming questions without human fallback.</p>
              <div className="text-xs text-amber-600 bg-amber-50 rounded-md p-2 inline-flex items-center font-medium border border-amber-100">
                <AlertCircle className="h-3 w-3 mr-1" /> Needs more return FAQs
              </div>
            </div>
            <RadialGauge value={score} max={100} formatLabel={(v: number) => `${v}%`} label="Score" colorClass="stroke-amber-400" size={90} strokeWidth={8} />
          </CardContent>
        </Card>
      </div>

      {/* Action Bar */}
      <Card className="shadow-sm border-slate-200 w-full overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 max-w-full">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search resources..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-white border-slate-200 shadow-sm" 
              />
            </div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 hide-scrollbar w-full md:w-auto">
            <Button variant={selectedCatFilter === "all" ? "default" : "outline"} size="sm" onClick={() => setSelectedCatFilter("all")} className={cn("rounded-full whitespace-nowrap", selectedCatFilter === "all" ? "bg-slate-800" : "")}>
              All
            </Button>
            {CATEGORIES.map(c => (
              <Button 
                key={c.id} 
                variant={selectedCatFilter === c.id ? "default" : "outline"} 
                size="sm" 
                onClick={() => setSelectedCatFilter(c.id)}
                className={cn("rounded-full whitespace-nowrap", selectedCatFilter === c.id ? "bg-slate-800" : "")}
              >
                {c.name}
              </Button>
            ))}
            <Button variant="ghost" size="sm" onClick={() => setIsCatOpen(true)} className="rounded-full text-slate-500 whitespace-nowrap ml-2">
              <Settings2 className="h-4 w-4 mr-2" /> Manage
            </Button>
          </div>
        </div>

        {/* Document List */}
        <div className="divide-y divide-slate-100 max-w-full overflow-hidden w-full">
          {filteredDocs.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 text-slate-200 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900">No documents found</h3>
              <p className="text-slate-500 mt-1">Try adjusting your filters or add a new document.</p>
            </div>
          ) : (
            filteredDocs.map((doc) => {
              const cat = getCategory(doc.categoryId);
              return (
                <div key={doc.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors w-full overflow-hidden">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 hidden sm:flex">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="space-y-1.5 min-w-0 flex-1 w-full max-w-full">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-semibold text-slate-900 truncate max-w-full">{doc.title}</h4>
                        {doc.status === 'archived' && <Badge variant="archived" className="text-[10px] w-fit">Archived</Badge>}
                      </div>
                      <div className="text-sm text-slate-500 truncate max-w-full w-full block">
                        {doc.content.substring(0, 80)}...
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap">
                        <span className={cn("px-2 py-0.5 rounded-md border", cat.color)}>{cat.name}</span>
                        <span>Added {new Date(doc.addedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:shrink-0 justify-end">
                    <Button variant="ghost" size="sm" onClick={() => { setActiveDoc(doc); setIsViewOpen(true); }} className="h-8 shadow-sm border border-slate-200 bg-white">
                      <Eye className="h-4 w-4 mr-1.5" /> View
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleOpenForm(doc)} className="h-8 w-8 text-slate-500 hover:text-emerald-600 shadow-sm border border-slate-200 bg-white">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => { setActiveDoc(doc); setIsDeleteOpen(true); }} className="h-8 w-8 text-slate-500 hover:text-red-600 shadow-sm border border-slate-200 bg-white">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>

      {/* --- MODALS --- */}
      
      {/* Add / Edit Modal */}
      <Modal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title={activeDoc ? "Edit Document" : "Add Manual Document"}
        description={activeDoc ? "Update your knowledge base entry." : "Add a custom text string for your AI to learn from."}
      >
         <div className="space-y-5">
           <div className="space-y-2">
             <label className="text-sm font-medium text-slate-900">Document Title</label>
             <Input 
               value={formData.title || ""} 
               onChange={e => setFormData({...formData, title: e.target.value})} 
               placeholder="e.g. Holiday Shipping Policy" 
               className="shadow-sm border-slate-200"
             />
           </div>
           
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <label className="text-sm font-medium text-slate-900">Category</label>
               <select 
                 className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                 value={formData.categoryId || ""}
                 onChange={e => setFormData({...formData, categoryId: e.target.value})}
               >
                 {CATEGORIES.map(c => (
                   <option key={c.id} value={c.id}>{c.name}</option>
                 ))}
               </select>
             </div>
             <div className="space-y-2">
               <label className="text-sm font-medium text-slate-900">Status</label>
               <select 
                 className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                 value={formData.status || "active"}
                 onChange={e => setFormData({...formData, status: e.target.value as Status})}
               >
                 <option value="active">Active (Training)</option>
                 <option value="archived">Archived (Ignored)</option>
               </select>
             </div>
           </div>

           <div className="space-y-2">
             <div className="flex justify-between">
               <label className="text-sm font-medium text-slate-900">Content</label>
               <span className="text-xs text-slate-400 font-mono">{(formData.content?.length || 0)}/500</span>
             </div>
             <Textarea 
               value={formData.content || ""} 
               onChange={e => {
                 if (e.target.value.length <= 500) {
                   setFormData({...formData, content: e.target.value})
                 }
               }}
               placeholder="Write the exact answer you want your AI to give..." 
               className="h-40 resize-none shadow-sm border-slate-200"
             />
           </div>
           
           <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
             <Button variant="ghost" onClick={() => setIsFormOpen(false)}>Cancel</Button>
             <Button onClick={handleSaveDoc} className="bg-emerald-600 hover:bg-emerald-700 shadow-md">
               {activeDoc ? "Save Changes" : "Create Document"}
             </Button>
           </div>
         </div>
      </Modal>

      {/* View Modal */}
      <Modal 
        isOpen={isViewOpen} 
        onClose={() => setIsViewOpen(false)}
        title={activeDoc?.title}
        description={`Added on ${activeDoc ? new Date(activeDoc.addedDate).toLocaleDateString() : ''}`}
      >
        {activeDoc && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <Badge variant={activeDoc.status === 'active' ? 'active' : 'archived'}>
                {activeDoc.status.charAt(0).toUpperCase() + activeDoc.status.slice(1)}
              </Badge>
              <span className={cn("px-2.5 py-1 rounded-md text-xs font-semibold border", getCategory(activeDoc.categoryId).color)}>
                {getCategory(activeDoc.categoryId).name}
              </span>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Training Content</h4>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-5 text-sm text-slate-800 leading-relaxed max-w-full overflow-hidden break-words w-full block">
                {activeDoc.content}
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
              <Button onClick={() => { setIsViewOpen(false); handleOpenForm(activeDoc); }} className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
                Edit Content
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Document"
        description="This action cannot be undone."
        maxWidth="max-w-md"
      >
        <div className="space-y-6">
          <p className="text-sm text-slate-600">
            Are you sure you want to delete <span className="font-semibold text-slate-900">&quot;{activeDoc?.title}&quot;</span>? The AI will immediately stop using this content for responses.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} className="shadow-sm">Delete Document</Button>
          </div>
        </div>
      </Modal>

      {/* Manage Categories Modal */}
      <Modal 
        isOpen={isCatOpen} 
        onClose={() => setIsCatOpen(false)}
        title="Manage Categories"
        description="Organize your knowledge base content."
        maxWidth="max-w-md"
      >
        <div className="space-y-6 w-full block">
          <div className="space-y-2 border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100 max-w-full block">
            {CATEGORIES.map(c => (
              <div key={c.id} className="flex items-center justify-between p-3 bg-slate-50 w-full overflow-hidden">
                <span className={cn("px-2 py-1 rounded-md text-xs font-semibold border truncate max-w-[200px]", c.color)}>{c.name}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 shrink-0">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input placeholder="New category name..." className="shadow-sm flex-1" />
            <Button variant="secondary" className="shadow-sm whitespace-nowrap">Add</Button>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button onClick={() => setIsCatOpen(false)} className="bg-slate-900 text-white">Done</Button>
          </div>
        </div>
      </Modal>

    </motion.div>
  );
}
