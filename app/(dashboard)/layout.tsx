"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { 
  HelpCircle, 
  Settings, 
  Bell,
  Menu,
  X,
  Activity,
  CheckCircle,
  Zap,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  ContactRound,
  Box,
  MessageCircleMore,
  Library,
  Hexagon,
  Waypoints,
  LineChart,
  BrainCircuit,
  Bot
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { href: "/dashboard", label: "Home", icon: LayoutGrid },
  { href: "/leads", label: "Leads (CRM)", icon: ContactRound },
  { href: "/products", label: "Products", icon: Box },
  { href: "/conversations", label: "Conversations", icon: MessageCircleMore },
  { href: "/knowledge-base", label: "Knowledge Base", icon: Library },
  { href: "/chat", label: "Chat with Atlas", icon: BrainCircuit },
  { href: "/automations", label: "Automations", icon: Zap },
  { href: "/channels", label: "Channels", icon: Waypoints },
  { href: "/analytics", label: "Analytics", icon: LineChart },
];

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "New Lead Assigned",
    description: "Sarah Jenkins from TechCorp just landed in your pipeline and needs review.",
    time: "2m ago",
    read: false,
    icon: ContactRound,
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    id: 2,
    title: "Atlas AI Summary Ready",
    description: "Your weekly performance digest has been generated effectively.",
    time: "1h ago",
    read: false,
    icon: Zap,
    color: "bg-amber-50 text-amber-500 border-amber-100",
  },
  {
    id: 3,
    title: "Flowmono Connected",
    description: "Your integration channel Flowmono Process Manager is now active.",
    time: "3h ago",
    read: true,
    icon: CheckCircle,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'usage' | 'notifications' | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-close sidebar on conversations page
  useEffect(() => {
    if (pathname.includes("/conversations")) {
      setIsSidebarCollapsed(true);
    }
  }, [pathname]);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Desktop */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarCollapsed ? 88 : 256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col border-r border-slate-200 bg-[#fbfdfb] shrink-0 relative overflow-visible"
      >
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-3 top-8 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50 transition-colors"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>

        <div className="flex bg-transparent h-24 shrink-0 items-center px-6 overflow-hidden">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className={cn("text-4xl font-bold tracking-tighter text-emerald-600 transition-all duration-300", isSidebarCollapsed && "text-2xl mt-1 ml-1")}>
              {isSidebarCollapsed ? "w" : "woops"}
            </span>
          </Link>
        </div>
        <nav className="flex-1 space-y-2 py-4 pl-4 overflow-x-hidden overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-4 py-3.5 relative group transition-colors",
                  isSidebarCollapsed ? "pl-3.5 pr-4 mr-2" : "pl-4",
                  isActive ? "" : "hover:bg-slate-50",
                  !isSidebarCollapsed && !isActive && "rounded-l-2xl",
                  isSidebarCollapsed && !isActive && "rounded-xl"
                )}
                title={isSidebarCollapsed ? link.label : undefined}
              >
                {isActive && (
                  <>
                    <motion.div
                      layoutId="active-bg-nav"
                      className={cn("absolute inset-0 bg-emerald-100/60", isSidebarCollapsed ? "rounded-xl" : "rounded-l-2xl")}
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                    <motion.div
                      layoutId="active-indicator"
                      className={cn("absolute top-1.5 bottom-1.5 w-1.5 bg-emerald-600", isSidebarCollapsed ? "left-0 rounded-r-full" : "right-0 rounded-l-full")}
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  </>
                )}
                <div className="z-10 flex items-center gap-4 whitespace-nowrap">
                  <div className={cn("flex items-center justify-center", isSidebarCollapsed && "w-6 h-6")}>
                    <link.icon className={cn("h-[22px] w-[22px] transition-colors", isActive ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900")} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  {!isSidebarCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn("text-[15px] transition-colors", isActive ? "font-bold text-slate-900" : "font-medium text-slate-700 group-hover:text-slate-900")}
                    >
                      {link.label}
                    </motion.span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </motion.aside>

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

          <div className="ml-auto flex items-center gap-2 sm:gap-4" ref={dropdownRef}>
            
            <Button variant="outline" size="sm" className="hidden sm:flex rounded-full gap-2 font-normal text-slate-600 border-slate-200 shadow-none hover:bg-slate-50 mr-2">
              <Bot className="h-4 w-4 text-emerald-500" /> Ask AI
            </Button>

            {/* Usage & Plan Dropdown */}
            <div className="relative">
              <div 
                onClick={() => setActiveDropdown(activeDropdown === 'usage' ? null : 'usage')}
                className={cn(
                  "hidden sm:flex items-center gap-2 text-sm font-medium cursor-pointer px-3 py-1.5 rounded-full transition-colors",
                  activeDropdown === 'usage' ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <Activity className="h-4 w-4" /> Usage and plan
              </div>
              
              <AnimatePresence>
                {activeDropdown === 'usage' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-3 w-[340px] bg-white rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-100 p-5 z-50 origin-top-right"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-bold text-slate-900 text-base">Usage & Plan</h3>
                      <span className="text-[10px] font-bold tracking-widest uppercase bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">Pro Plan</span>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Active Leads Metric */}
                      <div>
                        <div className="flex justify-between text-xs font-medium mb-1.5">
                          <span className="text-slate-600">Active Leads</span>
                          <span className="text-slate-900 font-bold">423 / 500</span>
                        </div>
                        <div className="h-[6px] w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>

                      {/* AI Tasks Metric */}
                      <div>
                        <div className="flex justify-between text-xs font-medium mb-1.5">
                          <span className="text-slate-600">Atlas AI Tasks</span>
                          <span className="text-slate-900 font-bold">8.4k / 10k</span>
                        </div>
                        <div className="h-[6px] w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }} />
                        </div>
                      </div>

                      {/* Storage Metric */}
                      <div>
                        <div className="flex justify-between text-xs font-medium mb-1.5">
                          <span className="text-slate-600">Cloud Storage</span>
                          <span className="text-slate-900 font-bold">2.1GB / 5GB</span>
                        </div>
                        <div className="h-[6px] w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '42%' }} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-[14px] hover:bg-slate-800 transition-colors">
                        <Sparkles className="h-4 w-4" /> Upgrade Plan
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
               <Button variant="ghost" size="icon" className="text-slate-500 rounded-full">
                 <HelpCircle className="h-5 w-5" />
               </Button>
               
               <Link href="/settings">
                 <Button variant="ghost" size="icon" className="text-slate-500 rounded-full">
                   <Settings className="h-5 w-5" />
                 </Button>
               </Link>

               {/* Notifications Dropdown */}
               <div className="relative">
                 <Button 
                   variant="ghost" 
                   size="icon" 
                   className={cn(
                     "text-slate-500 rounded-full relative transition-colors",
                     activeDropdown === 'notifications' && "bg-slate-100 text-slate-900"
                   )}
                   onClick={() => setActiveDropdown(activeDropdown === 'notifications' ? null : 'notifications')}
                 >
                   <Bell className="h-5 w-5" />
                   <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
                 </Button>

                 <AnimatePresence>
                  {activeDropdown === 'notifications' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-3 w-[360px] bg-white rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-100 p-2 z-50 origin-top-right overflow-hidden flex flex-col"
                    >
                      <div className="flex items-center justify-between p-4 pb-2">
                        <h3 className="font-bold text-slate-900 text-base">Notifications</h3>
                        <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">Mark all as read</button>
                      </div>

                      <div className="flex flex-col gap-1 p-2 max-h-[380px] overflow-y-auto">
                        {MOCK_NOTIFICATIONS.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={cn(
                              "flex gap-3 p-3 rounded-[16px] hover:bg-slate-50 transition-colors cursor-pointer",
                              !notif.read && "bg-slate-50/50"
                            )}
                          >
                            <div className={cn("h-10 w-10 rounded-full border flex items-center justify-center shrink-0", notif.color)}>
                              <notif.icon className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col gap-0.5 pt-0.5">
                              <div className="flex items-center justify-between">
                                <span className={cn("text-sm font-bold", notif.read ? "text-slate-700" : "text-slate-900")}>
                                  {notif.title}
                                </span>
                                {!notif.read && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1" />}
                              </div>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed pr-2">
                                {notif.description}
                              </p>
                              <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                                {notif.time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-2 pt-1">
                        <button className="w-full flex items-center justify-center gap-1 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-[12px] transition-colors">
                          View all activity <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                 </AnimatePresence>
               </div>
            </div>

            <div className="flex items-center gap-2 pl-2 sm:pl-4 sm:border-l border-slate-200 cursor-pointer ml-1">
              <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-semibold">
                JD
              </div>
              <span className="text-sm font-bold hidden sm:block text-slate-700">John Doe</span>
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
        <main className={cn(
          "flex-1 bg-slate-50/50",
          (pathname.includes("/conversations") || pathname.includes("/automations")) ? "p-0 overflow-hidden" : "p-6 md:p-8 overflow-y-auto"
        )}>
          <div className={cn("mx-auto", (pathname.includes("/conversations") || pathname.includes("/automations")) ? "max-w-none h-full" : "max-w-6xl")}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
