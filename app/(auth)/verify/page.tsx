"use client";

import { useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

function WoopsIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 12C4 12 5.5 8 8 8C10.5 8 12 12 12 12C12 12 13.5 16 16 16C18.5 16 20 12 20 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 12C4 12 5.5 16 8 16C10.5 16 12 12 12 12C12 12 13.5 8 16 8C18.5 8 20 12 20 12" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function VerifyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "m@example.com";

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pastedData = value.replace(/\D/g, "").slice(0, 6);
      if (pastedData) {
        const newOtp = [...otp];
        for (let i = 0; i < pastedData.length; i++) {
          newOtp[i] = pastedData[i];
        }
        setOtp(newOtp);
        const focusIndex = Math.min(pastedData.length, 5);
        inputRefs.current[focusIndex]?.focus();
      }
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return;
    
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-6 flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5">
        <WoopsIcon className="h-8 w-8 text-slate-900" />
      </div>

      <div className="w-full text-center space-y-2 mb-8">
        <h1 className="text-[22px] font-bold tracking-tight text-slate-900">Enter verification code</h1>
        <p className="text-[14px] text-slate-500">We sent a 6-digit code to <span className="font-semibold text-slate-900">{email}</span></p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6 flex flex-col items-center">
        <div className="flex items-center justify-center space-x-2">
          {otp.slice(0, 3).map((digit, index) => (
            <input
              key={`first-${index}`}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-slate-200 bg-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:border-transparent transition-all"
              autoFocus={index === 0}
            />
          ))}

          <div className="mx-1 h-[2px] w-[14px] bg-slate-300 rounded-full" />

          {otp.slice(3, 6).map((digit, index) => {
            const actualIndex = index + 3;
            return (
              <input
                key={`second-${actualIndex}`}
                ref={(el) => { inputRefs.current[actualIndex] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(actualIndex, e.target.value)}
                onKeyDown={(e) => handleKeyDown(actualIndex, e)}
                className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-slate-200 bg-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:border-transparent transition-all"
              />
            );
          })}
        </div>

        <p className="text-[13px] text-slate-400">
          Didn&apos;t receive the code? <button type="button" className="text-slate-500 font-medium hover:text-slate-700 transition-colors">Resend (55s)</button>
        </p>

        <Button 
          type="submit" 
          className="w-[300px] h-11 text-[15px] font-medium bg-[#A3A3A3] hover:bg-slate-500 text-white rounded-lg transition-colors mt-2" 
          disabled={isLoading || otp.join("").length !== 6}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </Button>
      </form>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Suspense fallback={<div className="animate-pulse flex flex-col items-center"><div className="h-16 w-16 bg-white rounded-2xl mb-8"></div><div className="h-8 w-64 bg-slate-200 rounded mb-4"></div><div className="h-4 w-48 bg-slate-200 rounded"></div></div>}>
        <VerifyForm />
      </Suspense>
    </motion.div>
  );
}
