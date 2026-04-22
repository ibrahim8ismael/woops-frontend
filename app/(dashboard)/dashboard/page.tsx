"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronLeft, ChevronRight, MessageSquareDashed, Plus, Plug, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Hello John</h1>
        <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
          Customize page
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Calendar Widget Alternative (Setup) */}
        <Card className="md:col-span-1 border-emerald-100 shadow-sm bg-gradient-to-b from-white to-emerald-50/20">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Quick Setup</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
               <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">1</div>
               <div className="space-y-1">
                 <p className="font-medium text-sm">Connect Channel</p>
                 <p className="text-xs text-slate-500">Link WhatsApp or Telegram.</p>
                 <Button size="sm" variant="outline" className="mt-2 h-7 px-3 text-xs">Connect</Button>
               </div>
            </div>
            <div className="w-px h-4 bg-slate-200 ml-4"></div>
            <div className="flex items-start gap-4 opacity-50">
               <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold">2</div>
               <div className="space-y-1">
                 <p className="font-medium text-sm">Upload Knowledge</p>
                 <p className="text-xs text-slate-500">Train AI with your FAQs.</p>
               </div>
            </div>
            <div className="w-px h-4 bg-slate-200 ml-4"></div>
            <div className="flex items-start gap-4 opacity-50">
               <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold">3</div>
               <div className="space-y-1">
                 <p className="font-medium text-sm">Go Live</p>
                 <p className="text-xs text-slate-500">Enable AI responses.</p>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started Banner */}
        <Card className="md:col-span-2 overflow-hidden relative bg-[#FDF9F3] border-none shadow-sm">
          <div className="absolute top-0 right-0 p-6 z-10 w-full flex justify-end">
            <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-6">
              Test AI Bot
            </Button>
          </div>
          <CardContent className="p-0 h-full flex flex-col justify-center min-h-[280px] relative z-0">
             <div className="px-8 md:w-2/3">
               <h2 className="text-2xl font-bold mb-2">Welcome to woops</h2>
               <p className="text-slate-600 mb-6">Your 24/7 AI agent is ready to handle customer inquiries and capture leads while you sleep.</p>
               
               <Card className="border shadow-sm max-w-sm">
                 <div className="p-4 flex items-center justify-between">
                   <div>
                     <p className="font-medium">Connect your first channel</p>
                     <p className="text-xs text-slate-500">Link WhatsApp to start receiving messages.</p>
                   </div>
                   <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center">
                     <Plug className="h-4 w-4 text-slate-400" />
                   </div>
                 </div>
               </Card>
             </div>
             {/* Decorative Elements */}
             <div className="absolute bottom-0 right-0 text-[200px] leading-none font-bold text-emerald-800/5 select-none -mb-8 -mr-8">
               W
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Your leads</CardTitle>
            <Button variant="ghost" size="sm" className="text-emerald-600 h-8">View all</Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mt-4">
              <div>
                <div className="text-4xl font-bold">14</div>
                <p className="text-sm font-medium text-slate-500 mt-1">Total leads captured</p>
              </div>
              <div className="h-16 w-16 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                <Users className="h-8 w-8 text-slate-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Your plan usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 mt-4">
             <div>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-sm font-medium">AI Responses</span>
                 <Plus className="h-4 w-4 text-emerald-600 cursor-pointer" />
               </div>
               <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-slate-300 w-0"></div>
               </div>
               <p className="text-xs text-slate-500 mt-2"><strong className="text-slate-900">500</strong> left out of 500 until 21/05/2026</p>
             </div>
             
             <div className="pt-4 border-t border-slate-100">
               <div className="flex justify-between items-center">
                 <span className="text-sm font-medium">Prepaid credits</span>
                 <Plus className="h-4 w-4 text-emerald-600 cursor-pointer" />
               </div>
               <p className="text-xs text-slate-500 mt-1">For extra AI models or heavy traffic.</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
