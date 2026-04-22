"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bot, User, Sparkles, Loader2, Plus, Monitor, Mic, ArrowUp, Package, BookOpen, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type MessageRole = "user" | "atlas";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
}

export default function ChatWithAtlasPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMsg: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: inputMessage.trim(),
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputMessage("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      let aiResponseContent = "I am Atlas. I've received your message. I am ready to assist with your leads, products, or knowledge base inquiries.";
      
      const lowerInput = newUserMsg.content.toLowerCase();
      if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        aiResponseContent = "Hello! How can I assist you with your operations today?";
      } else if (lowerInput.includes("product")) {
        aiResponseContent = "You have the capacity to manage physical products and services in the 'Products' tab. I can help query specific SKUs or categories for you.";
      } else if (lowerInput.includes("lead")) {
        aiResponseContent = "I can analyze your CRM leads to find the most pressing engagements. Need me to summarize recent activity?";
      } else if (lowerInput.includes("knowledge")) {
         aiResponseContent = "Your urgent actions are awaiting processing. Converting unresolved user queries into knowledge base articles will improve my future responses.";
      }

      const newAiMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        role: "atlas",
        content: aiResponseContent,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (actionText: string) => {
    setInputMessage(actionText);
    // Optionally focus the textarea
  };

  const renderInputForm = (isCentered: boolean) => (
    <motion.div 
      layout
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className={cn(
        "relative mx-auto w-full",
        isCentered ? "max-w-3xl" : "max-w-3xl"
      )}
    >
      <div 
        className={cn(
          "bg-white border rounded-3xl overflow-hidden flex flex-col focus-within:ring-1 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all",
          isCentered ? "border-slate-300 shadow-md hover:shadow-lg" : "border-slate-200 shadow-sm"
        )}
      >
        <Textarea
          placeholder="Assign a task or ask anything..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="resize-none border-0 shadow-none bg-transparent focus-visible:ring-0 px-5 py-4 text-base min-h-[100px]"
        />
        
        <div className="flex items-center justify-between p-2 pt-0 px-3 pb-3">
          {/* Left Hand Tools */}
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60">
              <Plus className="h-4 w-4" />
            </Button>
            
            {/* Quick integrations style pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50/50 hover:bg-slate-100 transition-colors cursor-pointer">
              <Package className="h-3.5 w-3.5 text-slate-700" />
              <BookOpen className="h-3.5 w-3.5 text-slate-700" />
            </div>

            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:bg-slate-100 border border-slate-200/60 hidden sm:inline-flex">
              <Monitor className="h-4 w-4" />
            </Button>
          </div>

          {/* Right Hand Tools */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:bg-slate-100 hidden sm:inline-flex">
              <Bot className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:bg-slate-100 hidden sm:inline-flex">
              <Mic className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className={cn(
                "h-8 w-8 rounded-full p-0 ml-1 transition-all",
                inputMessage.trim() ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-slate-200 text-slate-400"
              )}
            >
              {isTyping ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <ArrowUp className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
      
      {isCentered && (
        <div className="mt-3 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 opacity-80">
           <Sparkles className="h-3 w-3" /> Atlas may produce inaccurate information about people, places, or facts.
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="w-full h-[calc(100vh-8rem)] flex flex-col font-sans relative">
      <AnimatePresence mode="wait">
        {messages.length === 0 ? (
          <motion.div 
            key="empty-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col items-center justify-center px-4 w-full h-full pb-20"
          >
            {/* Free Plan Pill */}
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm text-sm font-medium text-slate-600 mb-8 cursor-pointer hover:bg-slate-50 transition-colors">
              <span>Free plan</span>
              <span className="w-px h-3 bg-slate-300"></span>
              <span className="text-emerald-600">Upgrade</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-slate-800 tracking-tight text-center mb-8">
              What can Atlas do for you?
            </h1>

            {renderInputForm(true)}
            
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-2xl">
               <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full bg-white text-slate-600 border-slate-200 hover:border-slate-300 font-normal shadow-sm"
                onClick={() => handleQuickAction("Summarize my active products in a list")}
              >
                  <Package className="h-3.5 w-3.5 mr-2 text-emerald-600" /> Summarize active products
               </Button>
               <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full bg-white text-slate-600 border-slate-200 hover:border-slate-300 font-normal shadow-sm"
                onClick={() => handleQuickAction("Check my settings for optimal AI responses")}
              >
                  <Settings className="h-3.5 w-3.5 mr-2 text-emerald-600" /> Optimize system settings
               </Button>
               <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full bg-white text-slate-600 border-slate-200 hover:border-slate-300 font-normal shadow-sm"
                onClick={() => handleQuickAction("Draft a new knowledge base article about our refund policy")}
              >
                  <BookOpen className="h-3.5 w-3.5 mr-2 text-emerald-600" /> Draft KB article
               </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="chat-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col h-full w-full max-w-4xl mx-auto"
          >
            {/* Chat History Area */}
            <div className="flex-1 overflow-y-auto px-4 py-8 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-4 group",
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div 
                    className={cn(
                      "h-8 w-8 shrink-0 rounded-full flex items-center justify-center mt-1",
                      message.role === "user" ? "bg-slate-100 text-slate-600" : "bg-emerald-600 text-white shadow-sm"
                    )}
                  >
                    {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  
                  <div className={cn(
                    "flex flex-col max-w-[85%]",
                    message.role === "user" ? "items-end" : "items-start"
                  )}>
                    <div 
                      className={cn(
                        "px-5 py-3.5 text-sm leading-relaxed",
                        message.role === "user" 
                          ? "bg-slate-100 text-slate-900 rounded-3xl rounded-tr-lg" 
                          : "bg-transparent text-slate-800"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4 flex-row">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-600 text-white shadow-sm flex items-center justify-center mt-1">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col max-w-[80%] items-start">
                    <div className="px-5 py-5 text-sm rounded-3xl bg-transparent text-slate-800 flex items-center gap-1.5 mt-1">
                      <motion.div 
                        className="h-2 w-2 bg-slate-300 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div 
                        className="h-2 w-2 bg-slate-300 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div 
                        className="h-2 w-2 bg-slate-300 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Docked Input Box */}
            <div className="p-4 pt-2 bg-transparent shrink-0">
               {renderInputForm(false)}
            </div>
          </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}
