"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, Filter, CheckCircle2, ChevronDown, UserCircle2, 
  Phone, Video, MoreVertical, Send, Paperclip, Smile, Bot, Sparkles 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// --- Mock Data ---
type Message = { id: string, sender: 'customer' | 'ai' | 'agent', text: string, time: string };
type Conversation = {
  id: string;
  customerName: string;
  channel: 'WhatsApp' | 'Telegram';
  status: 'open' | 'unassigned' | 'ai_handled';
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
};

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    customerName: "Sarah Jenkins",
    channel: "WhatsApp",
    status: "unassigned",
    lastMessage: "Can I get a refund for order #4920?",
    time: "10:42 AM",
    unread: 1,
    messages: [
      { id: "m1", sender: "customer", text: "Hi there", time: "10:40 AM" },
      { id: "m2", sender: "ai", text: "Hello Sarah! How can I help you today?", time: "10:40 AM" },
      { id: "m3", sender: "customer", text: "Can I get a refund for order #4920? It arrived damaged.", time: "10:42 AM" },
    ]
  },
  {
    id: "c2",
    customerName: "Michael Ross",
    channel: "Telegram",
    status: "open",
    lastMessage: "Yes, the blue one please.",
    time: "Yesterday",
    unread: 0,
    messages: [
      { id: "m1", sender: "customer", text: "Do you have the artisan mug in stock?", time: "Yesterday, 4:00 PM" },
      { id: "m2", sender: "ai", text: "Let me check that for you! Yes, we have the artisan mug in Blue and Charcoal. Which color would you prefer?", time: "Yesterday, 4:01 PM" },
      { id: "m3", sender: "customer", text: "Yes, the blue one please.", time: "Yesterday, 4:15 PM" },
      { id: "m4", sender: "agent", text: "Great choice Michael! I've reserved the blue artisan mug for you. Here is the link to complete your checkout: woops.shop/checkout/123", time: "Yesterday, 4:20 PM" },
    ]
  },
  {
    id: "c3",
    customerName: "Emma Watson",
    channel: "WhatsApp",
    status: "ai_handled",
    lastMessage: "Thanks, that's exactly what I needed.",
    time: "Mon",
    unread: 0,
    messages: [
      { id: "m1", sender: "customer", text: "What are your store hours?", time: "Mon, 9:00 AM" },
      { id: "m2", sender: "ai", text: "Our flagship store is open Monday-Friday from 9am to 8pm, and Saturday-Sunday from 10am to 6pm. We are located at 123 Main St.", time: "Mon, 9:00 AM" },
      { id: "m3", sender: "customer", text: "Thanks, that's exactly what I needed.", time: "Mon, 9:05 AM" },
    ]
  },
  {
    id: "c4",
    customerName: "David Chen",
    channel: "WhatsApp",
    status: "open",
    lastMessage: "I need to talk to a human.",
    time: "Tue",
    unread: 2,
    messages: [
      { id: "m1", sender: "customer", text: "Why is my tracking not updating?", time: "Tue, 2:00 PM" },
      { id: "m2", sender: "ai", text: "I understand that's frustrating. Tracking can sometimes take up to 24 hours to update after shipping. Can you provide your order number so I can check?", time: "Tue, 2:00 PM" },
      { id: "m3", sender: "customer", text: "I need to talk to a human.", time: "Tue, 2:01 PM" },
    ]
  }
];

export default function ConversationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [aiEnabledChats, setAiEnabledChats] = useState<Record<string, boolean>>({
    c2: false, // Default to false for the Human Handoff demo case
  });

  const filteredConversations = MOCK_CONVERSATIONS.filter(chat => {
    if (activeTab === "all") return true;
    if (activeTab === "unassigned") return chat.status === "unassigned";
    if (activeTab === "my") return chat.status === "open";
    if (activeTab === "ai") return chat.status === "ai_handled";
    return true;
  });

  const selectedChat = MOCK_CONVERSATIONS.find(c => c.id === selectedChatId);
  const isAiActive = selectedChat ? (aiEnabledChats[selectedChat.id] ?? true) : true;

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full bg-white overflow-hidden">
      
      {/* Left Sidebar (Filters) */}
      <div className="w-56 border-r border-slate-200 bg-slate-50/50 flex flex-col hidden md:flex shrink-0">
         <div className="p-4 border-b border-slate-200">
           <div className="relative">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
             <Input placeholder="Search..." className="pl-9 h-9 bg-white border-slate-200 text-xs shadow-sm" />
           </div>
         </div>
         <div className="p-2 space-y-1 overflow-y-auto">
           <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2 mt-2">Inbox</div>
           <button 
             onClick={() => setActiveTab("my")}
             className={cn("flex w-full items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors", activeTab === "my" ? "bg-emerald-100 text-emerald-900" : "text-slate-600 hover:bg-slate-100")}
           >
             <span>My messages</span>
           </button>
           <button 
             onClick={() => setActiveTab("unassigned")}
             className={cn("flex w-full items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors", activeTab === "unassigned" ? "bg-emerald-100 text-emerald-900" : "text-slate-600 hover:bg-slate-100")}
           >
             <span>Unassigned</span>
             <span className="text-xs bg-slate-200 text-slate-600 px-1.5 rounded-sm">1</span>
           </button>
           <button 
             onClick={() => setActiveTab("all")}
             className={cn("flex w-full items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors", activeTab === "all" ? "bg-emerald-100 text-emerald-900" : "text-slate-600 hover:bg-slate-100")}
           >
             <span>All messages</span>
           </button>

           <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2 mt-4">AI Agent</div>
            <button 
              onClick={() => setActiveTab("ai")}
              className={cn("flex w-full items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors", activeTab === "ai" ? "bg-emerald-100 text-emerald-900" : "text-slate-600 hover:bg-slate-100")}
            >
             <span>Handled by AI</span>
           </button>
         </div>
      </div>

      {/* Middle Column (Chat List) */}
      <div className="w-80 border-r border-slate-200 bg-white flex flex-col shrink-0">
        <div className="p-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <Button variant="outline" size="sm" className="h-8 text-xs font-normal bg-white shadow-sm">
            Open <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:bg-emerald-50">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredConversations.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center h-full">
               <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                 <CheckCircle2 className="h-6 w-6 text-emerald-600" />
               </div>
               <h3 className="text-sm font-semibold text-slate-900">All clear!</h3>
               <p className="text-xs text-slate-500 mt-1 max-w-[200px]">No messages in this view.</p>
            </div>
          ) : (
            filteredConversations.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setSelectedChatId(chat.id)}
                className={cn(
                  "p-4 cursor-pointer transition-colors border-l-2",
                  selectedChatId === chat.id 
                    ? "bg-slate-50 border-emerald-500" 
                    : "border-transparent hover:bg-slate-50/50"
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-medium text-slate-900">{chat.customerName}</h4>
                  <span className="text-xs text-slate-500">{chat.time}</span>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-xs text-slate-500 line-clamp-1 pr-4">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="h-5 w-5 bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded outline outline-1",
                    chat.channel === "WhatsApp" ? "bg-emerald-50 text-emerald-700 outline-emerald-200" : "bg-blue-50 text-blue-700 outline-blue-200"
                  )}>
                    {chat.channel}
                  </span>
                  {chat.status === "ai_handled" && (
                     <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 outline outline-1 outline-purple-200 flex items-center gap-1">
                       <Sparkles className="h-3 w-3" /> AI
                     </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Column (Chat View) */}
      <div className="flex-1 bg-slate-50 flex flex-col relative min-w-0">
        {!selectedChat ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative w-48 h-32 mx-auto mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-full h-1 bg-emerald-600/20 rounded-full"></div>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2 bg-slate-50 px-4 py-2">
                   <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white shadow-sm flex items-center justify-center text-white"><UserCircle2 className="w-5 h-5"/></div>
                      <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white shadow-sm flex items-center justify-center text-white"><BotIcon className="w-4 h-4"/></div>
                   </div>
                   <CheckCircle2 className="w-8 h-8 text-emerald-600 ml-2 bg-white rounded-full" />
                </div>
              </div>
              
              <h2 className="text-lg font-bold text-slate-900 mb-2">You&apos;re all caught up!</h2>
              <p className="text-sm text-slate-500">Select a conversation to start messaging.</p>
            </motion.div>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 shrink-0">
                  <UserCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm leading-none">{selectedChat.customerName}</h3>
                  <p className="text-xs text-slate-500 mt-1">{selectedChat.channel}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 mr-2 border-r border-slate-200 pr-5">
                  <span className={cn(
                    "text-xs font-medium flex items-center gap-1.5 transition-colors hidden sm:flex", 
                    isAiActive ? "text-emerald-600" : "text-slate-400"
                  )}>
                    <Sparkles className="h-3.5 w-3.5" />
                    AI Auto-Reply
                  </span>
                  <button
                    onClick={() => setAiEnabledChats(prev => ({...prev, [selectedChat.id]: !isAiActive}))}
                    className={cn(
                      "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
                      isAiActive ? "bg-emerald-500" : "bg-slate-200"
                    )}
                    role="switch"
                    aria-checked={isAiActive}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        isAiActive ? "translate-x-4" : "translate-x-0"
                      )}
                    />
                  </button>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-700 hidden sm:flex">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-700 hidden sm:flex">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-700">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
              <div className="text-center">
                <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full uppercase tracking-wider">Conversation Started</span>
              </div>
              
              {selectedChat.messages.map((msg, idx) => {
                const isCustomer = msg.sender === 'customer';
                const isAI = msg.sender === 'ai';
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={msg.id} 
                    className={cn("flex w-full", isCustomer ? "justify-start" : "justify-end")}
                  >
                    {!isCustomer && (
                       <div className="opacity-0 w-8 shrink-0 mr-2"></div>
                    )}
                    
                    <div className={cn(
                      "flex flex-col gap-1 max-w-[75%]",
                      isCustomer ? "items-start" : "items-end"
                    )}>
                      <div className="flex items-center gap-2 mb-1 px-1">
                        <span className="text-xs text-slate-500">{msg.time}</span>
                        {isAI && <span className="text-[10px] font-bold text-purple-600 flex items-center gap-1"><Sparkles className="h-3 w-3"/> AI Response</span>}
                        {msg.sender === 'agent' && <span className="text-[10px] font-bold text-emerald-600 text-slate-500 text-[10px]">You</span>}
                      </div>
                      
                      <div className={cn(
                        "px-4 py-2.5 rounded-2xl text-sm shadow-sm",
                        isCustomer 
                          ? "bg-white border text-slate-900 rounded-tl-sm" 
                          : isAI
                            ? "bg-purple-50 border border-purple-100 text-purple-900 rounded-tr-sm"
                            : "bg-emerald-600 text-white rounded-tr-sm"
                      )}>
                        {msg.text}
                      </div>
                    </div>
                    
                    {isCustomer && (
                       <div className="opacity-0 w-8 shrink-0 ml-2"></div>
                    )}
                  </motion.div>
                );
              })}
              
              <AnimatePresence>
                {!isAiActive && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex justify-center mt-6 mb-2"
                  >
                    <span className="text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                      <UserCircle2 className="h-3.5 w-3.5" />
                      AI paused. You are managing this conversation.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Message Input Container */}
            <div className="p-4 bg-white border-t border-slate-200 shrink-0">
              <div className="flex items-end gap-2 max-w-4xl mx-auto">
                <Button variant="ghost" size="icon" className="shrink-0 text-slate-400 hover:text-slate-600 h-10 w-10" disabled={isAiActive}>
                  <Paperclip className="h-5 w-5" />
                </Button>
                <div className="relative flex-1">
                  <textarea 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={isAiActive ? "Pause AI Auto-Reply to write a message..." : "Type your message..."} 
                    className={cn(
                      "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm resize-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 min-h-[44px] max-h-[120px]",
                      isAiActive && "cursor-not-allowed opacity-60 bg-slate-100"
                    )}
                    rows={1}
                    disabled={isAiActive}
                  />
                  <Button variant="ghost" size="icon" className="absolute right-2 bottom-2 h-7 w-7 text-slate-400 hover:text-slate-600" disabled={isAiActive}>
                    <Smile className="h-5 w-5" />
                  </Button>
                </div>
                <Button size="icon" className="shrink-0 bg-emerald-600 hover:bg-emerald-700 h-10 w-10 rounded-full shadow-sm text-white" disabled={isAiActive || !replyText.trim()}>
                  <Send className="h-4 w-4 ml-0.5" />
                </Button>
              </div>
              <div className="text-center mt-2 flex items-center justify-center gap-4">
                <span className="text-[10px] text-slate-400">Shift + Enter for new line</span>
                <button 
                  disabled={isAiActive}
                  className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-600 font-medium rounded border border-emerald-100 flex items-center gap-1 cursor-pointer hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <BotIcon className="h-3 w-3" /> Draft with AI
                </button>
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  );
}

function BotIcon(props: React.ComponentProps<"svg">) {
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
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
