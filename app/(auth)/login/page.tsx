"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate sending OTP and redirecting to verify page
    setTimeout(() => {
      router.push(`/verify?email=${encodeURIComponent(email)}`);
    }, 800);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-full flex flex-col items-center">
      <div className="mb-8 flex items-center justify-center space-x-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-900/5">
          <WoopsIcon className="h-6 w-6 text-slate-900" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">Woops</span>
      </div>

      <div className="w-full text-center space-y-2 mb-8">
        <h1 className="text-[22px] font-bold tracking-tight text-slate-900">Sign in or sign up</h1>
        <p className="text-[15px] text-slate-600">Start creating with Woops</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="space-y-1.5 text-left">
          <label htmlFor="email" className="text-sm font-semibold text-slate-800">
            Email
          </label>
          <Input 
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="h-11 rounded-lg border-slate-200 bg-white px-3 focus-visible:ring-1 focus-visible:ring-slate-400"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full h-11 text-[15px] font-medium bg-[#2B2B2B] hover:bg-black text-white rounded-lg transition-colors" 
          disabled={isLoading}
        >
          {isLoading ? "Sending code..." : "Login with Email"}
        </Button>
      </form>

      <div className="w-full relative mt-8 mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-[13px] uppercase font-medium">
          <span className="bg-[#F7F7F7] px-3 text-slate-400">Or continue with</span>
        </div>
      </div>

      <div className="w-full grid gap-3">
        <Button 
          type="button"
          variant="outline" 
          className="h-11 justify-center rounded-lg border-slate-200 bg-white text-[15px] font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors" 
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading}
        >
          <GoogleIcon className="mr-3 h-[18px] w-[18px]" />
          Google
        </Button>
        <Button 
          type="button"
          variant="outline" 
          className="h-11 justify-center rounded-lg border-slate-200 bg-white text-[15px] font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors" 
          onClick={() => handleSocialLogin('facebook')}
          disabled={isLoading}
        >
          <FacebookIcon className="mr-3 h-[18px] w-[18px] text-[#1877F2]" />
          Facebook
        </Button>
      </div>

    </motion.div>
  );
}

function WoopsIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 12C4 12 5.5 8 8 8C10.5 8 12 12 12 12C12 12 13.5 16 16 16C18.5 16 20 12 20 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 12C4 12 5.5 16 8 16C10.5 16 12 12 12 12C12 12 13.5 8 16 8C18.5 8 20 12 20 12" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function GoogleIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  );
}

function FacebookIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
