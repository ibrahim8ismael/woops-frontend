"use client";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Review AI performance and conversation stats.</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center text-slate-500 text-sm">
          Analytics dashboard goes here.
        </CardContent>
      </Card>
    </motion.div>
  );
}
