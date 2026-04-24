import React from "react";
import { Check, CreditCard, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl w-full grid md:grid-cols-[380px_1fr] gap-x-12 gap-y-12 items-start">
        
        {/* Left Column: Summary */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm sticky top-8">
          <Link href="/upgrade" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
          <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Summary</h2>
          
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-slate-900">Pro Plan</h3>
              <p className="text-sm text-slate-500 mt-1">Billed monthly</p>
            </div>
            <span className="font-bold text-slate-900">$29.00</span>
          </div>

          <div className="py-6 border-b border-slate-100 mb-6 space-y-3">
            <label className="text-[13px] font-bold text-slate-700 block">Discount code</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter code" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm">
                Apply
              </button>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-sm text-slate-500 font-medium">
              <span>Subtotal</span>
              <span>$29.00</span>
            </div>
            <div className="flex justify-between font-extrabold text-slate-900 text-[17px] border-t border-slate-100 pt-4">
              <span>Due today</span>
              <span>$29.00</span>
            </div>
          </div>

          <button className="w-full py-3.5 bg-emerald-600 text-white rounded-xl text-[15px] font-bold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg active:scale-[0.99]">
            Continue to confirmation
          </button>
          
          <p className="text-xs text-center text-slate-500 mt-5 font-medium">
            By continuing, you agree to our <a href="#" className="underline hover:text-slate-900">Terms of Service</a>.
          </p>
        </div>

        {/* Right Column: Payment Details */}
        <div className="pt-2">
          {/* Stepper */}
          <div className="mb-10 lg:mb-12">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">
              Upgrade your plan
            </h1>
            
            <div className="flex items-center gap-2 sm:gap-4 text-sm font-bold">
              <div className="flex items-center gap-2 text-emerald-600">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={3} />
                </div>
                <span>Choose plan</span>
              </div>
              <div className="h-px bg-slate-200 w-8 sm:w-16" />
              <div className="flex items-center gap-2 text-slate-900">
                <div className="w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px]">
                  2
                </div>
                <span className="border-b-2 border-slate-900 pb-0.5">Payment</span>
              </div>
              <div className="h-px bg-slate-200 w-8 sm:w-16" />
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-5 h-5 rounded-full border-2 border-slate-200 flex items-center justify-center text-[10px]">
                  3
                </div>
                <span>Complete</span>
              </div>
            </div>
          </div>

          {/* Payment details */}
          <div className="mb-10">
            <div className="pb-4 border-b border-slate-200 mb-6">
              <h2 className="text-xl font-bold text-slate-900">Payment details</h2>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-slate-900 mb-1 text-[15px]">Default payment method</h3>
              <p className="text-[13px] text-slate-500 mb-4">Select a saved payment method.</p>
              
              <div className="space-y-3">
                {/* Saved Method 1 */}
                <label className="flex items-center gap-4 p-4 border-2 border-emerald-500 bg-emerald-50/20 rounded-2xl cursor-pointer relative transition-all shadow-sm">
                  <div className="shrink-0 w-12 h-8 bg-white border border-slate-200 rounded flex items-center justify-center">
                     <span className="text-[10px] font-extrabold text-blue-800 italic tracking-wider">VISA</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-sm">Visa ending in 0315</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Expires 08/2026</p>
                    <div className="flex gap-4 mt-2.5 text-[11px] font-bold text-slate-500 underline decoration-slate-300 underline-offset-2">
                      <button className="hover:text-slate-900 hover:decoration-slate-900 transition-colors">Remove</button>
                      <button className="hover:text-slate-900 hover:decoration-slate-900 transition-colors">Edit</button>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-[5px] border-emerald-600 bg-white shadow-sm" />
                </label>

                {/* Saved Method 2 */}
                <label className="flex items-center gap-4 p-4 border border-slate-200 bg-white hover:border-slate-300 rounded-2xl cursor-pointer transition-all shadow-sm group">
                  <div className="shrink-0 w-12 h-8 bg-white border border-slate-200 rounded flex items-center justify-center">
                    <span className="text-[10px] font-extrabold text-blue-500 italic tracking-tight">Pay<span className="text-blue-800">Pal</span></span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-sm">Jane Smithson</h4>
                    <p className="text-xs text-slate-500 mt-0.5">j.smith93@gmail.com</p>
                    <div className="flex gap-4 mt-2.5 text-[11px] font-bold text-slate-500 underline decoration-slate-300 underline-offset-2">
                      <button className="hover:text-slate-900 hover:decoration-slate-900 transition-colors">Sign out</button>
                      <button className="hover:text-slate-900 hover:decoration-slate-900 transition-colors">Edit</button>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 bg-slate-50 group-hover:bg-white group-hover:border-slate-400 transition-colors" />
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 py-2 mb-8">
              <div className="h-px bg-slate-200 flex-1" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">or</span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            {/* Add new method */}
            <div>
              <div className="flex justify-between items-baseline mb-6 pb-4 border-b border-slate-200">
                <h3 className="text-[17px] font-bold text-slate-900">Add new method</h3>
                <span className="text-xs text-slate-500 font-medium">* required field</span>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Name on card*</label>
                  <input 
                    type="text" 
                    placeholder="Enter name"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Card number*</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm tracking-widest transition-all font-mono"
                    />
                    <CreditCard className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">Expiration date*</label>
                    <input 
                      type="text" 
                      placeholder="MM / YY"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">CVV*</label>
                    <input 
                      type="text" 
                      placeholder="123"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
