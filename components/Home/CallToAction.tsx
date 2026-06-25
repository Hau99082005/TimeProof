"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-900">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="relative rounded-[3rem] overflow-hidden bg-black shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-black mix-blend-overlay" />
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/30 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-purple-600/30 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/3" />

          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

          <div className="relative z-10 px-6 py-20 md:py-28 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 font-medium text-sm mb-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Sẵn sàng để bứt phá?
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 max-w-4xl animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-150 fill-mode-both">
              Nâng Tầm Dự Án Của Bạn Ngay Hôm Nay
            </h2>
            
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-12 animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-300 fill-mode-both">
              Tham gia cùng hàng ngàn khách hàng đã và đang sử dụng thư viện mã nguồn và giải pháp của chúng tôi để kiến tạo những sản phẩm công nghệ tuyệt vời.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 animate-in slide-in-from-bottom-14 fade-in duration-1000 delay-500 fill-mode-both">
              <Link href="/pricing">
                <Button className="h-14 px-8 rounded-full bg-white text-black hover:bg-white/90 hover:scale-105 transition-all duration-300 font-bold text-lg flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                  Xem Bảng Giá
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="h-14 px-8 rounded-full border-2 border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-white/40 backdrop-blur-md hover:scale-105 transition-all duration-300 font-bold text-lg flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-purple-400" />
                  Liên Hệ Ngay
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
