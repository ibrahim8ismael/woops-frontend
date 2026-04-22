"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, X, Inbox, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const INITIAL_QUESTIONS = [
  {
    id: "1",
    text: "Can I connect my Shopify store to this AI?",
    timestamp: "2024-05-15T10:30:00Z"
  },
  {
    id: "2",
    text: "What happens if I go over my monthly message limit?",
    timestamp: "2024-05-15T11:45:00Z"
  },
  {
    id: "3",
    text: "Do you support multilingual responses out of the box?",
    timestamp: "2024-05-15T14:20:00Z"
  }
];

const CATEGORIES = [
  "Product",
  "Pricing",
  "Onboarding",
  "Channel Setup",
  "Features",
  "Billing",
  "Troubleshooting",
  "Policies",
  "Support",
  "Imported Questions"
];

export default function UrgentActionsPage() {
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<typeof INITIAL_QUESTIONS[0] | null>(null);
  
  const [kbTitle, setKbTitle] = useState("");
  const [kbContent, setKbContent] = useState("");
  const [kbCategory, setKbCategory] = useState("Imported Questions");
  
  const [toastMessage, setToastMessage] = useState<{title: string, error?: boolean} | null>(null);

  const showToast = (title: string, error = false) => {
    setToastMessage({ title, error });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleIgnore = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    showToast("Question ignored");
  };

  const openAddDialog = (question: typeof INITIAL_QUESTIONS[0]) => {
    setSelectedQuestion(question);
    setKbTitle(question.text);
    setKbContent("");
    setKbCategory("Imported Questions");
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => {
      setSelectedQuestion(null);
    }, 200); 
  };

  const handleSaveToKb = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuestion) return;
    
    setQuestions(prev => prev.filter(q => q.id !== selectedQuestion.id));
    closeDialog();
    showToast("Added to Knowledge Base");
  };

  return (
    <div className="flex-1 space-y-6 max-w-5xl mx-auto p-4 md:p-8">
      <div className="flex items-center space-x-4 mb-6">
        <Link href="/knowledge-base">
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-white">
            <ArrowLeft className="h-4 w-4 text-slate-700" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Urgent Actions</h1>
          <p className="text-sm text-slate-500 mt-1">Pending unanswered customer questions requiring KB entries.</p>
        </div>
      </div>

      {questions.length === 0 ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-xl border border-slate-200">
          <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <Inbox className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">All caught up!</h3>
          <p className="text-slate-500 mt-1 max-w-sm">There are no pending unanswered questions. Your AI is running smoothly.</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {questions.map((q) => (
              <motion.div 
                key={q.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              >
                <Card className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white shadow-sm border-slate-200 hover:border-emerald-200 transition-colors">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-slate-900 pr-4">{q.text}</h3>
                    <div className="flex items-center text-xs text-slate-500 mt-2">
                      <Clock className="mr-1.5 h-3.5 w-3.5" />
                      {new Date(q.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Button variant="outline" className="text-slate-600 border-slate-200 bg-white" onClick={() => handleIgnore(q.id)}>
                      Ignore
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => openAddDialog(q)}>
                      <Plus className="h-4 w-4 mr-1.5" />
                      Add to KB
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {isDialogOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
              onClick={closeDialog}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 bg-white rounded-xl shadow-xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="text-lg font-semibold text-slate-900">Create Knowledge Base Entry</h2>
                <Button variant="ghost" size="icon" onClick={closeDialog} className="h-8 w-8 rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <form onSubmit={handleSaveToKb} className="p-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Question Title</label>
                  <Input 
                    value={kbTitle} 
                    onChange={e => setKbTitle(e.target.value)} 
                    placeholder="E.g., Integrating with Zapier" 
                    required 
                    className="focus-visible:ring-emerald-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Answer Content</label>
                  <Textarea 
                    value={kbContent} 
                    onChange={e => setKbContent(e.target.value)} 
                    placeholder="Enter the comprehensive answer the AI should provide..." 
                    className="h-32 resize-none focus-visible:ring-emerald-500" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Category</label>
                  <select 
                    value={kbCategory} 
                    onChange={e => setKbCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans text-slate-900"
                  >
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                  <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">Save Entry</Button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className={`fixed bottom-6 left-1/2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium z-50 ${toastMessage.error ? "bg-red-600 text-white" : "bg-slate-900 text-white"}`}
          >
            {toastMessage.title}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
