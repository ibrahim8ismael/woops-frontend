"use client";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LeadsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Leads (CRM)</h1>
      <Card>
        <CardHeader>
          <CardTitle>Captured Leads</CardTitle>
          <CardDescription>Manage contacts gathered by your AI agent.</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center text-slate-500 text-sm">
          Lead tracking implementation goes here.
        </CardContent>
      </Card>
    </motion.div>
  );
}
