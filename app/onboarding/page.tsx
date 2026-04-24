"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  UserCircle, 
  CheckCircle2, 
  Circle, 
  Check, 
  ChevronRight, 
  Search, 
  MessageCircle, 
  Mail, 
  Briefcase, 
  Instagram, 
  Youtube, 
  Smartphone, 
  Database,
  Users,
  TrendingUp,
  Zap,
  LayoutTemplate
} from "lucide-react";
import { cn } from "@/lib/utils";

type AccountType = "business" | "creator" | null;

interface OnboardingData {
  accountType: AccountType;
  companyName: string;
  industry: string;
  teamSize: string;
  niche: string;
  platforms: string[];
  audienceSize: string;
  goals: string[];
  integrations: string[];
  template: string | null;
}

const BUSINESS_STEPS = [
  { id: 1, title: "Account Type", desc: "How will you use woops?" },
  { id: 2, title: "Business Info", desc: "Tell us about your company" },
  { id: 3, title: "Goal Selection", desc: "What do you want to achieve?" },
  { id: 4, title: "Tools Integration", desc: "Connect your existing stack" },
  { id: 5, title: "Use Case Templates", desc: "Launch with a pre-built flow" },
];

const CREATOR_STEPS = [
  { id: 1, title: "Account Type", desc: "How will you use woops?" },
  { id: 2, title: "Creator Info", desc: "Tell us about your content" },
  { id: 3, title: "Goal Selection", desc: "What do you want to achieve?" },
  { id: 4, title: "Platform Connection", desc: "Link your social accounts" },
  { id: 5, title: "Use Case Templates", desc: "Launch with a pre-built flow" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    accountType: null,
    companyName: "",
    industry: "",
    teamSize: "",
    niche: "",
    platforms: [],
    audienceSize: "",
    goals: [],
    integrations: [],
    template: null,
  });

  const stepsList = data.accountType === "creator" ? CREATOR_STEPS : BUSINESS_STEPS;
  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(s => s + 1);
    } else {
      // Finish onboarding
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(s => s - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(s => s + 1);
    } else {
      router.push("/dashboard");
    }
  };

  // Step 1: Account Type
  const renderStep1 = () => (
    <div className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setData({ ...data, accountType: "business" })}
          className={cn(
            "flex flex-col items-start p-6 rounded-2xl border-2 transition-all duration-200 text-left",
            data.accountType === "business" 
              ? "border-emerald-600 bg-emerald-50/50 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]" 
              : "border-slate-200 hover:border-emerald-200 hover:bg-slate-50"
          )}
        >
          <div className={cn(
            "p-3 rounded-xl mb-4",
            data.accountType === "business" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
          )}>
            <Building2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Company / Business</h3>
          <p className="text-sm text-slate-500 font-medium">For teams, agencies, and businesses looking to automate operations and sales.</p>
        </button>

        <button
          onClick={() => setData({ ...data, accountType: "creator" })}
          className={cn(
            "flex flex-col items-start p-6 rounded-2xl border-2 transition-all duration-200 text-left",
            data.accountType === "creator" 
              ? "border-emerald-600 bg-emerald-50/50 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]" 
              : "border-slate-200 hover:border-emerald-200 hover:bg-slate-50"
          )}
        >
          <div className={cn(
            "p-3 rounded-xl mb-4",
            data.accountType === "creator" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
          )}>
            <UserCircle className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Content Creator</h3>
          <p className="text-sm text-slate-500 font-medium">For influencers, educators, and creators managing audience and monetization.</p>
        </button>
      </div>
    </div>
  );

  // Step 2: Info (Business or Creator)
  const renderStep2 = () => {
    if (data.accountType === "business") {
      return (
        <div className="space-y-6 max-w-xl">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Company Name</label>
            <input 
              type="text" 
              value={data.companyName}
              onChange={(e) => setData({ ...data, companyName: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
              placeholder="e.g. Acme Corp"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Industry</label>
            <select 
              value={data.industry}
              onChange={(e) => setData({ ...data, industry: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium appearance-none"
            >
              <option value="" disabled>Select an industry...</option>
              <option value="ecommerce">E-Commerce</option>
              <option value="saas">Software (SaaS)</option>
              <option value="agency">Agency / Consulting</option>
              <option value="realestate">Real Estate</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Team Size</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['1-10', '11-50', '51-200', '201+'].map(size => (
                <button
                  key={size}
                  onClick={() => setData({ ...data, teamSize: size })}
                  className={cn(
                    "px-4 py-3 rounded-xl border text-sm font-bold transition-all",
                    data.teamSize === size 
                      ? "bg-emerald-50 border-emerald-500 text-emerald-700" 
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    } 

    if (data.accountType === "creator") {
      const platformOptions = [
        { id: 'instagram', icon: Instagram, label: 'Instagram' },
        { id: 'tiktok', icon: Smartphone, label: 'TikTok' },
        { id: 'youtube', icon: Youtube, label: 'YouTube' },
        { id: 'x', icon: MessageCircle, label: 'X (Twitter)' },
      ];

      return (
        <div className="space-y-6 max-w-xl">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Niche</label>
            <select 
              value={data.niche}
              onChange={(e) => setData({ ...data, niche: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium appearance-none"
            >
              <option value="" disabled>Select your focus...</option>
              <option value="tech">Tech & Business</option>
              <option value="fitness">Health & Fitness</option>
              <option value="education">Education</option>
              <option value="lifestyle">Lifestyle & Fashion</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Primary Platforms</label>
            <div className="grid grid-cols-2 gap-3">
              {platformOptions.map(p => {
                const isActive = data.platforms.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      const newPlatforms = isActive 
                        ? data.platforms.filter(id => id !== p.id)
                        : [...data.platforms, p.id];
                      setData({ ...data, platforms: newPlatforms });
                    }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-bold transition-all text-left",
                      isActive 
                        ? "bg-emerald-50 border-emerald-500 text-emerald-700" 
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    )}
                  >
                    <p.icon className={cn("h-5 w-5", isActive ? "text-emerald-600" : "text-slate-400")} />
                    {p.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Audience Size (Optional)</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['< 10k', '10k-50k', '50k-200k', '200k+'].map(size => (
                <button
                  key={size}
                  onClick={() => setData({ ...data, audienceSize: size })}
                  className={cn(
                    "px-4 py-3 rounded-xl border text-sm font-bold transition-all",
                    data.audienceSize === size 
                      ? "bg-emerald-50 border-emerald-500 text-emerald-700" 
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  // Step 3: Goals
  const renderStep3 = () => {
    const businessGoals = [
      { id: 'ops', icon: Zap, title: 'Automate operations', desc: 'Streamline repetitive tasks' },
      { id: 'crm', icon: Users, title: 'Manage customers (CRM)', desc: 'Track leads and interactions' },
      { id: 'sales', icon: TrendingUp, title: 'Increase sales', desc: 'Drive more conversions' },
      { id: 'team', icon: Briefcase, title: 'Manage team workflows', desc: 'Coordinate your staff' },
    ];
    
    const creatorGoals = [
      { id: 'audience', icon: TrendingUp, title: 'Grow audience', desc: 'Reach more engaged followers' },
      { id: 'content', icon: Zap, title: 'Automate content posting', desc: 'Schedule across platforms' },
      { id: 'dms', icon: MessageCircle, title: 'Manage DMs', desc: 'Handle inbox efficiently' },
      { id: 'money', icon: Database, title: 'Monetization', desc: 'Convert audience to buyers' },
    ];

    const goalsList = data.accountType === "creator" ? creatorGoals : businessGoals;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {goalsList.map(goal => {
          const isActive = data.goals.includes(goal.id);
          return (
            <button
              key={goal.id}
              onClick={() => {
                const newGoals = isActive 
                  ? data.goals.filter(id => id !== goal.id)
                  : [...data.goals, goal.id];
                setData({ ...data, goals: newGoals });
              }}
              className={cn(
                "flex flex-col items-start p-5 rounded-2xl border-2 transition-all duration-200 text-left",
                isActive 
                  ? "border-emerald-600 bg-emerald-50/50 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]" 
                  : "border-slate-200 hover:border-emerald-200 hover:bg-slate-50"
              )}
            >
              <goal.icon className={cn("h-6 w-6 mb-3", isActive ? "text-emerald-600" : "text-slate-400")} />
              <h4 className="font-bold text-slate-900 mb-1">{goal.title}</h4>
              <p className="text-xs text-slate-500 font-medium">{goal.desc}</p>
            </button>
          )
        })}
      </div>
    );
  };

  // Step 4: Integrations
  const renderStep4 = () => {
    const businessTools = [
      { id: 'whatsapp', icon: MessageCircle, name: 'WhatsApp Business', desc: 'Client communication' },
      { id: 'email', icon: Mail, name: 'Email (SMTP / Brevo)', desc: 'Marketing & transactional' },
      { id: 'crm', icon: Database, name: 'External CRM', desc: 'Zoho, Salesforce, etc.' },
    ];
    
    const creatorTools = [
      { id: 'instagram', icon: Instagram, name: 'Instagram', desc: 'Posts & Automations' },
      { id: 'tiktok', icon: Smartphone, name: 'TikTok', desc: 'Short-form content' },
      { id: 'youtube', icon: Youtube, name: 'YouTube', desc: 'Video & Community' },
      { id: 'whatsapp', icon: MessageCircle, name: 'WhatsApp', desc: 'Community management' },
    ];

    const toolsList = data.accountType === "creator" ? creatorTools : businessTools;

    return (
      <div className="space-y-6 max-w-3xl">
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search integrations..." 
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {toolsList.map(tool => {
            const isConnected = data.integrations.includes(tool.id);
            return (
              <div key={tool.id} className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col items-start hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <tool.icon className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{tool.name}</h4>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium mb-4">{tool.desc}</p>
                
                <button
                  onClick={() => {
                    if (isConnected) {
                      setData({ ...data, integrations: data.integrations.filter(id => id !== tool.id) });
                    } else {
                      setData({ ...data, integrations: [...data.integrations, tool.id] });
                    }
                  }}
                  className={cn(
                    "mt-auto px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                    isConnected 
                      ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  )}
                >
                  {isConnected ? "Disconnect" : "Connect"}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    );
  };

  // Step 5: Templates
  const renderStep5 = () => {
    const businessTemplates = [
      { id: 'lead_crm', title: 'Lead capture → CRM → Follow-up', desc: 'Automatically store leads and send initial outreach.' },
      { id: 'wa_support', title: 'WhatsApp bot for support', desc: 'Handle common inquiries automatically.' },
      { id: 'email_auto', title: 'Email automation sequence', desc: 'Drip campaigns for new signups.' },
    ];
    
    const creatorTemplates = [
      { id: 'auto_dm', title: 'Auto-reply to DMs', desc: 'Send links or welcome messages instantly.' },
      { id: 'content_sched', title: 'Content scheduling', desc: 'Queue posts across multiple platforms.' },
      { id: 'lead_funnel', title: 'Lead funnel (bio → WhatsApp → offer)', desc: 'Convert profile visitors into revenue.' },
    ];

    const templatesList = data.accountType === "creator" ? creatorTemplates : businessTemplates;

    return (
      <div className="space-y-4 max-w-2xl">
        {templatesList.map(template => {
          const isActive = data.template === template.id;
          return (
            <button
              key={template.id}
              onClick={() => setData({ ...data, template: template.id })}
              className={cn(
                "w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left",
                isActive 
                  ? "border-emerald-600 bg-emerald-50/50 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]" 
                  : "border-slate-200 hover:border-emerald-200 hover:bg-slate-50"
              )}
            >
              <div className={cn(
                "h-10 w-10 shrink-0 rounded-xl flex items-center justify-center border",
                isActive ? "bg-emerald-600 border-emerald-700 text-white" : "bg-white border-slate-200 text-slate-400"
              )}>
                <LayoutTemplate className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">{template.title}</h4>
                <p className="text-xs text-slate-500 font-medium">{template.desc}</p>
              </div>
              <div className="ml-auto pl-4">
                <div className={cn(
                  "h-5 w-5 rounded-full border flex items-center justify-center transition-colors",
                  isActive ? "border-emerald-600 bg-emerald-600" : "border-slate-300 bg-white"
                )}>
                  {isActive && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    );
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return null;
    }
  };

  const activeStepConfig = stepsList[currentStep - 1] || stepsList[0];

  const canProceed = () => {
    if (currentStep === 1) return data.accountType !== null;
    if (currentStep === 2) {
      if (data.accountType === "business") return data.companyName.trim() !== "";
      if (data.accountType === "creator") return data.niche !== "" && data.platforms.length > 0;
    }
    return true; // Other steps are optional or have defaults capable
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] font-sans">
      {/* Left Sidebar */}
      <div className="hidden lg:flex w-[320px] xl:w-[360px] flex-col border-r border-slate-200/60 bg-white p-12 shrink-0">
        
        {/* Steps List */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-slate-200/80">
          {stepsList.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isFuture = currentStep < step.id;
            
            return (
              <div key={step.id} className="relative flex items-start gap-4 z-10 group">
                <div className={cn(
                  "flex items-center justify-center shrink-0 w-6 h-6 rounded-md z-10 text-[11px] font-bold transition-all duration-200",
                  (isCurrent || isCompleted) 
                    ? "bg-slate-900 text-white shadow-sm" 
                    : "bg-slate-100 text-slate-400"
                )}>
                  {step.id}
                </div>
                <div className="-mt-0.5">
                  <h3 className={cn(
                    "text-[15px] font-semibold transition-colors mb-0.5",
                    (isCurrent || isCompleted) ? "text-slate-900" : "text-slate-400"
                  )}>
                    {step.title}
                  </h3>
                  <p className={cn(
                    "text-[13px] leading-relaxed font-medium transition-colors",
                    (isCurrent || isCompleted) ? "text-slate-500" : "text-slate-400/80"
                  )}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-16 overflow-y-auto">
        <div className="max-w-3xl w-full mx-auto">
          
          {/* Logo & Header */}
          <div className="mb-10">
            <div className="mb-10 flex items-center gap-2.5">
              <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
                <span className="text-white font-black text-xl leading-none">w</span>
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">woops</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              {activeStepConfig.title}
            </h1>
            <p className="text-[15px] text-slate-500 font-medium">
              {currentStep === 4 
                ? "Please select one or multiple channels from available ones to connect." 
                : currentStep === 5 
                ? "Select a template to start with. You can always change this later."
                : "Fill in the details below to personalize your experience."}
            </p>
          </div>

          <div className="pb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {getStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="pt-8 border-t border-slate-200/60 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 text-[14px] font-semibold px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
              >
                <ChevronRight className="h-4 w-4 rotate-180" /> Back
              </button>
            ) : (
              <div /> // Placeholder for space-between 
            )}
            
            <div className="flex items-center gap-3">
              {currentStep > 2 && (
                <button
                  onClick={handleSkip}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-sm"
                >
                  Skip
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-all shadow-sm shadow-emerald-500/20"
              >
                {currentStep === totalSteps ? "Finish" : "Continue"}
                {currentStep < totalSteps && <ChevronRight className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
