import React from "react";
import { Check, Star, Layers, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-12">
        
        {/* Header */}
        <div className="mb-12">
          <Link href="/automation" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6">
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Upgrade Plan
          </h1>
          <p className="text-slate-600 text-base">
            Woops pricing plans are designed to meet your needs as you grow
          </p>
        </div>

        {/* Billing Toggle (Monthly / Annual) */}
        <div className="flex p-1 bg-slate-100 rounded-xl mb-12 w-fit max-w-[320px]">
          <button className="flex-1 py-2 px-6 bg-white text-slate-900 font-bold text-sm rounded-lg shadow-sm border border-slate-200/50">
            Monthly
          </button>
          <button className="flex-1 py-2 px-6 text-slate-500 font-bold text-sm rounded-lg hover:text-slate-700 transition-colors">
            Annual <span className="text-emerald-600 ml-1">(Save 20%)</span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Creator Plan */}
          <div className="bg-white border text-center lg:text-left border-slate-200 rounded-[2rem] p-8 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Starter</h2>
              <p className="text-sm text-slate-500 min-h-[40px]">
                Perfect for simple workflows and individual use.
              </p>
            </div>
            
            <div className="mb-8">
              <div className="flex items-baseline justify-center xl:justify-start">
                <span className="text-lg font-bold text-slate-900 self-start mt-1 mr-1">$</span>
                <span className="text-5xl font-extrabold text-slate-900 tracking-tight">Free</span>
              </div>
              <p className="text-sm text-slate-500 font-medium mt-2">Forever free</p>
            </div>

            <button className="w-full py-3.5 bg-slate-100 text-slate-400 font-bold text-[15px] rounded-xl mb-3 cursor-not-allowed border border-slate-200">
              Current Plan
            </button>
            <p className="text-xs font-bold text-slate-400 text-center mb-8">
              No credit card required
            </p>

            <div className="border-t border-slate-100 pt-8 mt-auto text-left">
              <h3 className="font-bold text-slate-900 mb-1">Features</h3>
              <p className="text-sm text-slate-500 mb-6">Everything in our free plan includes</p>
              
              <ul className="space-y-4">
                {[
                  "100 tasks/month",
                  "5 active workflows",
                  "Standard templates",
                  "Basic integrations",
                  "Community support",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-slate-700 font-medium leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-emerald-50/50 border-2 border-emerald-500 rounded-[2rem] p-8 shadow-sm flex flex-col h-full relative">
            <div className="absolute top-8 right-8 bg-emerald-100 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-emerald-600" />
              Popular
            </div>
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Pro Plan</h2>
              <p className="text-sm text-slate-600 min-h-[40px] pr-16 bg-transparent">
                Leverage advanced logic to create automated workflows.
              </p>
            </div>
            
            <div className="mb-8">
              <div className="flex items-baseline justify-center xl:justify-start">
                <span className="text-lg font-bold text-slate-900 self-start mt-1 mr-1">$</span>
                <span className="text-5xl font-extrabold text-slate-900 tracking-tight">29</span>
              </div>
              <p className="text-sm text-slate-600 font-medium mt-2">Per user, per month & billed annually</p>
            </div>

            <Link href="/upgrade/checkout" className="block text-center w-full py-3.5 bg-white border border-emerald-500 text-emerald-700 font-bold text-[15px] rounded-xl mb-3 hover:bg-emerald-50 transition-colors shadow-sm">
              Switch to this Plan
            </Link>
            <p className="text-xs font-bold text-slate-500 text-center mb-8">
              Start Free 7-Days Trial
            </p>

            <div className="border-t border-emerald-200/50 pt-8 mt-auto text-left">
              <h3 className="font-bold text-slate-900 mb-1">Features</h3>
              <p className="text-sm text-slate-600 mb-6">Everything in Starter & Plus</p>
              
              <ul className="space-y-4">
                {[
                  "5,000 tasks/month",
                  "Unlimited active workflows",
                  "Advanced logic & branching",
                  "Premium integrations",
                  "Custom webhooks",
                  "Priority email support",
                  "Revision history (30 days)"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                      <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-slate-700 font-medium leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Business Plan */}
          <div className="bg-white border text-center lg:text-left border-slate-200 rounded-[2rem] p-8 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Team Plan</h2>
              <p className="text-sm text-slate-500 min-h-[40px]">
                Collaborative automation with enhanced control, security and support.
              </p>
            </div>
            
            <div className="mb-8">
              <p className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-1">Start from</p>
              <div className="flex items-baseline justify-center xl:justify-start -mt-2">
                <span className="text-lg font-bold text-slate-900 self-start mt-2 mr-1">$</span>
                <span className="text-5xl font-extrabold text-slate-900 tracking-tight">99</span>
              </div>
              <p className="text-sm text-slate-500 font-medium mt-2">Custom Pricing, Custom Billing</p>
            </div>

            <button className="w-full py-3.5 bg-emerald-600 text-white font-bold text-[15px] rounded-xl mb-3 hover:bg-emerald-700 transition-colors shadow-sm">
              Contact Sales
            </button>
            <p className="text-xs font-bold text-slate-400 text-center mb-8">
              Custom Proof of Concept Trial
            </p>

            <div className="border-t border-slate-100 pt-8 mt-auto text-left">
              <h3 className="font-bold text-slate-900 mb-1">Features</h3>
              <p className="text-sm text-slate-500 mb-6">Everything in Pro & Business</p>
              
              <ul className="space-y-4">
                {[
                  "50,000+ tasks/month",
                  "Team collaboration (up to 5)",
                  "Role-based access control",
                  "Shared workspace connections",
                  "Advanced Admin Panel Access",
                  "Custom Style Guides",
                  "High Security Platform",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-slate-700 font-medium leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
