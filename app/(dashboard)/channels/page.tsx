"use client";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ChannelsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Channels</h1>
      <p className="text-slate-500">Connect your messaging platforms to the woops AI.</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>WhatsApp</CardTitle>
            <CardDescription>Connect your WhatsApp Business API.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Connect WhatsApp</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Telegram</CardTitle>
            <CardDescription>Connect a Telegram Bot.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Connect Telegram</Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
