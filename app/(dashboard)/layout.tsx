"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart, 
  BookOpen, 
  Bot, 
  HelpCircle, 
  Home, 
  LayoutDashboard, 
  Link as LinkIcon, 
  MessageSquare, 
  Settings, 
  Users, 
  Bell,
  Menu,
  X,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/leads", label: "Leads (CRM)", icon: Users },
  { href: "/products", label: "Products", icon: Package },
  { href: "/conversations", label: "Conversations", icon: MessageSquare },
  { href: "/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { href: "/chat", label: "Chat with Atlas", icon: Bot },
  { href: "/channels", label: "Channels", icon: LinkIcon },
  { href: "/analytics", label: "Analytics", icon: BarChart },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-slate-50/50">
        <div className="flex bg-slate-50 border-b border-slate-200 h-16 shrink-0 items-center px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-emerald-600">woops</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors relative",
                  isActive
                    ? "text-emerald-700 bg-emerald-100/50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-emerald-100 rounded-lg -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <link.icon className="h-5 w-5 shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden sm:flex rounded-full gap-2 font-normal text-slate-600 border-slate-200 shadow-none hover:bg-slate-50">
              <Bot className="h-4 w-4 text-emerald-500" /> Ask AI
            </Button>
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer px-2">
              <Activity className="h-4 w-4" /> Usage and plan
            </div>
            <div className="flex items-center gap-2">
               <Button variant="ghost" size="icon" className="text-slate-500 rounded-full">
                 <HelpCircle className="h-5 w-5" />
               </Button>
               <Button variant="ghost" size="icon" className="text-slate-500 rounded-full">
                 <Settings className="h-5 w-5" />
               </Button>
               <Button variant="ghost" size="icon" className="text-slate-500 rounded-full relative">
                 <Bell className="h-5 w-5" />
                 <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
               </Button>
            </div>
            <div className="flex items-center gap-2 pl-4 border-l border-slate-200 cursor-pointer">
              <div className="h-8 w-8 rounded-sm bg-slate-900 text-white flex items-center justify-center text-xs font-semibold">
                JD
              </div>
              <span className="text-sm font-medium hidden sm:block">John Doe</span>
            </div>
          </div>
        </header>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white p-6 pb-12 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-2xl font-bold tracking-tight text-emerald-600">woops</span>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-2">
                  {sidebarLinks.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "text-emerald-700 bg-emerald-50"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        )}
                      >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 md:p-8">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// Simple Activity icon since it might not be imported correctly above
function Activity(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}
