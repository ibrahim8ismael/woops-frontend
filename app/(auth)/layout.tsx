export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7] p-4 text-slate-900 font-sans">
      <div className="w-full max-w-[400px]">
        {children}
      </div>
    </div>
  );
}
