import React from "react";
import { Check, Shield, Layers, ArrowRight, CreditCard, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="flex-1 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 p-6 lg:p-12">
        
        {/* Left Column - Information */}
        <div className="flex flex-col pt-8">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">Woops</span>
          </Link>

          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Activate Your Woops Pro
          </h1>
          <p className="text-slate-600 text-lg mb-12">
            Get unlimited access to all productivity tools and advanced automations in seconds.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mb-6">Pro Plan</h2>

          <div className="space-y-4 mb-12">
            {/* Monthly Plan Option (Selected) */}
            <label className="flex items-center justify-between p-6 border-2 border-emerald-500 bg-emerald-50/30 rounded-2xl cursor-pointer transition-colors shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="h-6 w-6 rounded-full border-[6px] border-emerald-600 bg-white" />
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Monthly Plan</h3>
                  <p className="text-sm text-slate-500 mt-1">Ideal for short-term sprints & trials.</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-extrabold text-slate-900">$29</span>
                <span className="text-slate-500 font-medium"> / Month</span>
              </div>
            </label>

            {/* Annual Plan Option */}
            <label className="flex items-center justify-between p-6 border-2 border-slate-200 bg-white hover:border-slate-300 rounded-2xl cursor-pointer transition-colors shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-6 w-6 rounded-full border-2 border-slate-300 bg-white" />
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Annual Plan</h3>
                  <p className="text-sm text-slate-500 mt-1">Commit for a year with <span className="text-emerald-600 font-bold">-20% savings.</span></p>
                </div>
              </div>
              <div className="text-right">
                <del className="text-sm text-slate-400 block -mb-1">$29</del>
                <span className="text-xl font-extrabold text-slate-900">$23</span>
                <span className="text-slate-500 font-medium"> / Month</span>
              </div>
            </label>
          </div>

          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2 mb-6">
            What you'll unlock <ArrowRight className="h-5 w-5 text-emerald-600" />
          </h3>

          <ul className="space-y-4 mb-8">
            {[
              "5,000 tasks/month",
              "Unlimited active workflows",
              "Advanced logic & branching",
              "Custom webhooks & integrations",
              "Faster help with priority support"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} />
                </div>
                {feature}
              </li>
            ))}
          </ul>

          <p className="text-slate-500 text-sm leading-relaxed mt-auto border-t border-slate-200 pt-8">
            Everything unlocked, synced, and built for speed. Automate in real time, scale your workflow smoothly, and get help fast with priority support.
          </p>
        </div>

        {/* Right Column - Payment Form */}
        <div className="flex flex-col justify-center py-8">
          <div className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            
            {/* Payment Method Toggle */}
            <div className="flex p-1 bg-slate-100/80 rounded-xl mb-10">
              <button className="flex-1 py-2.5 bg-white text-slate-900 font-bold text-sm rounded-lg shadow-sm border border-slate-200/50">
                Pay by Card
              </button>
              <button className="flex-1 py-2.5 text-slate-500 font-bold text-sm rounded-lg hover:text-slate-700 transition-colors">
                Pay with Paypal
              </button>
            </div>

            <div className="space-y-8">
              {/* Billed To */}
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Billed To</label>
                <input 
                  type="text" 
                  defaultValue="Bob Snow"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Payment Detail */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Payment Detail</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <label className="flex flex-col items-center justify-center gap-3 p-4 border-2 border-slate-200 rounded-2xl cursor-pointer hover:border-slate-300 transition-colors bg-white">
                    <Building className="h-6 w-6 text-slate-400" strokeWidth={1.5} />
                    <span className="font-bold text-slate-700 text-sm">Bank Transfer</span>
                  </label>
                  <label className="flex flex-col items-center justify-center gap-3 p-4 border-2 border-emerald-500 rounded-2xl cursor-pointer bg-emerald-50/10 shadow-sm relative overflow-hidden">
                    <CreditCard className="h-6 w-6 text-emerald-600" strokeWidth={1.5} />
                    <span className="font-bold text-slate-900 text-sm">Credit Card</span>
                  </label>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Card number"
                      defaultValue="1234 5678 9012 3456"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 tracking-wide font-mono"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-50">
                      {/* Simple visual placeholders for card logos */}
                      <div className="w-8 h-5 bg-red-500 rounded-md"></div>
                      <div className="w-8 h-5 bg-blue-600 rounded-md"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="MM / YY"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                    <input 
                      type="text" 
                      placeholder="CVV"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[position:right_16px_center] bg-no-repeat pr-10">
                    <option>Choose country</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>

                  <div className="grid grid-cols-3 gap-4">
                    <input 
                      type="text" 
                      placeholder="City"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                    <input 
                      type="text" 
                      placeholder="State"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                    <input 
                      type="text" 
                      placeholder="ZIP"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Total & Submit */}
              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-end justify-between mb-6">
                  <span className="text-xl font-bold text-slate-900">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-slate-900">$29</span>
                    <span className="font-bold text-slate-500"> / Month</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-emerald-600 text-white rounded-xl text-[15px] font-bold hover:bg-emerald-700 transition-all shadow-sm mb-4 active:scale-[0.99]">
                  Subscribe Now
                </button>

                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                  <Shield className="h-5 w-5 text-emerald-600 shrink-0" />
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Your payment data is fully encrypted and handled with the highest security standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
