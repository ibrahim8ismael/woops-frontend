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
  Package,
  Network
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
  { href: "/channels", label: "Channels", icon: Network },
  { href: "/analytics", label: "Analytics", icon: BarChart },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-[#fbfdfb] shrink-0">
        <div className="flex bg-transparent h-24 shrink-0 items-center px-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-4xl font-bold tracking-tighter text-emerald-600">woops</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-2 py-4 pl-4 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-4 py-3.5 pl-4 relative group transition-colors",
                  isActive ? "" : "hover:bg-slate-50 rounded-l-2xl"
                )}
              >
                {isActive && (
                  <>
                    <motion.div
                      layoutId="active-bg-nav"
                      className="absolute inset-0 bg-emerald-100/60 rounded-l-2xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute right-0 top-1.5 bottom-1.5 w-1.5 bg-emerald-600 rounded-l-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  </>
                )}
                <div className="z-10 flex items-center gap-4">
                  <link.icon className={cn("h-[22px] w-[22px] transition-colors", isActive ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900")} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={cn("text-[15px] transition-colors", isActive ? "font-bold text-slate-900" : "font-medium text-slate-700 group-hover:text-slate-900")}>
                    {link.label}
                  </span>
                </div>
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
               <Link href="/settings">
                 <Button variant="ghost" size="icon" className="text-slate-500 rounded-full">
                   <Settings className="h-5 w-5" />
                 </Button>
               </Link>
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
                <div className="flex items-center justify-between mb-8 pl-4">
                  <span className="text-4xl font-bold tracking-tighter text-emerald-600">woops</span>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6 text-slate-700" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-2 pl-4">
                  {sidebarLinks.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-4 py-3.5 pl-4 relative group transition-colors",
                          isActive ? "" : "hover:bg-slate-50 rounded-l-2xl"
                        )}
                      >
                        {isActive && (
                          <>
                            <motion.div
                              layoutId="active-bg-nav-mobile"
                              className="absolute inset-0 bg-emerald-100/60 rounded-l-2xl"
                            />
                            <motion.div
                              layoutId="active-indicator-mobile"
                              className="absolute right-0 top-1.5 bottom-1.5 w-1.5 bg-emerald-600 rounded-l-full"
                            />
                          </>
                        )}
                        <div className="z-10 flex items-center gap-4">
                          <link.icon className={cn("h-[22px] w-[22px] transition-colors", isActive ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900")} strokeWidth={isActive ? 2.5 : 2} />
                          <span className={cn("text-[15px] transition-colors", isActive ? "font-bold text-slate-900" : "font-medium text-slate-700 group-hover:text-slate-900")}>
                            {link.label}
                          </span>
                        </div>
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
