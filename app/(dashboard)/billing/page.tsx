import React from "react";
import { 
  HelpCircle, 
  Trash2, 
  Search, 
  Download, 
  FileText, 
  MoreHorizontal,
  CircleCheck,
  CircleDot
} from "lucide-react";
import { cn } from "@/lib/utils";

const invoices = [
  { id: "Invoice0014", date: "Feb 12, 2025", plan: "Basic Plan", status: "Upcoming", amount: "$40.00" },
  { id: "Invoice0013", date: "Jan 12, 2025", plan: "Basic Plan", status: "Paid", amount: "$40.00" },
  { id: "Invoice0012", date: "Dec 12, 2025", plan: "Basic Plan", status: "Paid", amount: "$40.00" },
  { id: "Invoice0011", date: "Nov 12, 2025", plan: "Basic Plan", status: "Paid", amount: "$40.00" },
  { id: "Invoice0010", date: "Oct 12, 2025", plan: "Basic Plan", status: "Paid", amount: "$40.00" },
  { id: "Invoice0009", date: "Sep 12, 2025", plan: "Basic Plan", status: "Paid", amount: "$40.00" },
  { id: "Invoice0008", date: "Aug 12, 2025", plan: "Basic Plan", status: "Paid", amount: "$40.00" },
];

export default function BillingPage() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20">
        
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Plans & Billing</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your details and personal preferences here.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm">
          <HelpCircle className="h-4 w-4" />
          Need Help?
        </button>
      </div>

      {/* Current Plan */}
      <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-sm font-bold text-slate-900 mb-1">Current Plan</h2>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Basic Plan</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm">Providing the core tools and services you need at an affordable price.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
            <div className="flex items-baseline">
              <span className="text-3xl font-extrabold text-slate-900">$39.00</span>
              <span className="text-sm font-medium text-slate-500 ml-1">/month</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                Cancel Plan
              </button>
              <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Next Invoices */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Next Invoices</h2>
          <div className="text-3xl font-extrabold text-slate-900 mb-6">$40.00</div>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <span className="text-slate-500 w-24">Plan Type</span>
              <span className="text-slate-400 mr-2">:</span>
              <span className="font-medium text-slate-700">Basic Plan (Monthly)</span>
            </div>
            <div className="flex items-center">
              <span className="text-slate-500 w-24">Next Invoice</span>
              <span className="text-slate-400 mr-2">:</span>
              <span className="font-medium text-slate-700">Feb 12, 2026</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex flex-col">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Payment Method</h2>
          
          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-slate-400 font-mono tracking-widest translate-y-1">****</span> 8721
            </div>
            <div className="h-8 px-3 border border-slate-200 rounded flex items-center justify-center font-extrabold text-blue-800 italic shrink-0 bg-blue-50/50">
              VISA
            </div>
          </div>
          
          <div className="flex items-end justify-between mt-auto">
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <span className="text-slate-500 w-24">Name Card</span>
                <span className="text-slate-400 mr-2">:</span>
                <span className="font-medium text-slate-700">James Calzoni</span>
              </div>
              <div className="flex items-center">
                <span className="text-slate-500 w-24">Expired Date</span>
                <span className="text-slate-400 mr-2">:</span>
                <span className="font-medium text-slate-700">12/26</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                Change Card
              </button>
              <button className="p-2 border border-red-100 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 mb-6">Billing History</h2>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center bg-slate-50 border border-slate-200/60 rounded-xl p-1 shrink-0 w-fit">
            <button className="px-4 py-1.5 text-sm font-bold bg-white text-slate-900 rounded-lg shadow-sm border border-slate-100">
              View All
            </button>
            <button className="px-4 py-1.5 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
              Active
            </button>
            <button className="px-4 py-1.5 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
              Archived
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap">
              Most Recent
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap">
              <Download className="h-4 w-4" />
              Download All
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-sm text-left border-collapse">
            <tbody>
              {invoices.map((invoice, i) => (
                <tr key={i} className="group border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 pl-4 pr-3 w-4">
                    <input type="checkbox" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                  </td>
                  <td className="py-4 px-3 font-medium text-slate-900 flex items-center gap-3">
                     <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                       <FileText className="h-4 w-4" />
                     </div>
                     {invoice.id}
                  </td>
                  <td className="py-4 px-3 text-slate-600 font-medium whitespace-nowrap">{invoice.date}</td>
                  <td className="py-4 px-3 text-slate-600 font-medium whitespace-nowrap">{invoice.plan}</td>
                  <td className="py-4 px-3">
                    <span className={cn(
                      "flex items-center gap-1.5 font-bold",
                      invoice.status === "Upcoming" ? "text-slate-700" : "text-emerald-600"
                    )}>
                      {invoice.status === "Upcoming" ? (
                         <CircleDot className="h-3.5 w-3.5" />
                      ) : (
                         <CircleCheck className="h-3.5 w-3.5" />
                      )}
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-slate-900 font-bold">{invoice.amount}</td>
                  <td className="py-4 pl-3 pr-4 text-right hidden sm:table-cell">
                    <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>

    </div>
  );
}
