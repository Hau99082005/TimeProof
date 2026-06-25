"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { 
  Rocket, 
  Zap, 
  Users, 
  ShieldCheck, 
  Code2, 
  Globe, 
  ArrowRight,
  Terminal,
  Layers,
  Cpu,
  BookOpen
} from "lucide-react";

// --- Cấu hình Animations ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
} as const;

// --- Dữ liệu Định hình Trụ cột ---
const CORE_VALUES = [
  {
    icon: Zap,
    title: "Thực Chiến & Chuẩn Production",
    desc: "Không chỉ dừng lại ở 'Hello World'. Mọi kiến thức, đồ án và giải pháp trên nền tảng đều tuân theo tiêu chuẩn công nghiệp, sẵn sàng để deploy thực tế.",
    color: "text-amber-500 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30 border-transparent dark:border-amber-900/20"
  },
  {
    icon: Rocket,
    title: "Cập Nhật Công Nghệ Liên Tục",
    desc: "Nắm bắt nhanh nhất các xu hướng như Next.js App Router, React 19, Microservices hay tích hợp Generative AI vào ứng dụng web.",
    color: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30 border-transparent dark:border-blue-900/20"
  },
  {
    icon: Users,
    title: "Sức Mạnh Của Cộng Đồng",
    desc: "Học tập không cô đơn. Chúng tôi xây dựng môi trường để lập trình viên chia sẻ code, đánh giá chéo (code review) và cùng nhau tiến bộ.",
    color: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30 border-transparent dark:border-emerald-900/20"
  },
  {
    icon: ShieldCheck,
    title: "Kiến Trúc & Bảo Mật Ưu Tiên",
    desc: "Đào tạo tư duy hệ thống (System Design). Viết code không chỉ để chạy được, mà còn phải bảo mật, dễ bảo trì và có khả năng mở rộng (Scalable).",
    color: "text-purple-500 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30 border-transparent dark:border-purple-900/20"
  }
];

const STATS = [
  { label: "Dòng Code Được Viết", value: "2M+" },
  { label: "Kỹ Sư Tham Gia", value: "10,000+" },
  { label: "Giải Pháp Công Nghệ", value: "500+" },
  { label: "Đồ Án Tốt Nghiệp", value: "150+" },
];

const JOURNEY_STEPS = [
  { icon: BookOpen, title: "1. Tiếp thu kiến thức nền tảng", desc: "Học qua các khóa học và tài liệu được biên soạn kỹ lưỡng." },
  { icon: Code2, title: "2. Phân tích mã nguồn", desc: "Tham khảo các Website Mẫu (Templates) chuẩn mực." },
  { icon: Terminal, title: "3. Giải quyết vấn đề", desc: "Vận dụng các Giải Pháp (Solutions) vào bài toán thực tế." },
  { icon: Globe, title: "4. Chia sẻ & Đóng góp", desc: "Viết bài chia sẻ kinh nghiệm cho cộng đồng lập trình viên." }
];

export default function AboutPage() {
  // Đồng bộ hóa trạng thái giao diện Next-Themes (Tránh lỗi Hydration Mismatch)
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased w-full overflow-x-hidden ${
      isDark ? "bg-black text-slate-100" : "bg-slate-50 text-slate-900"
    }`}>

      {/* 1. CÂU CHUYỆN CỦA CHÚNG TÔI (OUR STORY) */}
      <section className={`py-16 md:py-24 transition-colors duration-300 w-full ${
        isDark ? "bg-black" : "bg-slate-50"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="min-w-0">
              <motion.h2 variants={fadeUp} className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6 ${isDark ? "text-white" : "text-slate-900"}`}>
                Tại sao <span className="text-blue-600 dark:text-blue-500">TimeProof</span> ra đời?
              </motion.h2>
              <motion.div variants={fadeUp} className={`space-y-5 text-sm sm:text-base text-justify leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                <p>
                  Hàng năm, có hàng ngàn sinh viên công nghệ thông tin tốt nghiệp với kiến thức lý thuyết vững vàng, nhưng lại lúng túng khi đối mặt với việc xây dựng một hệ thống phần mềm thực tế, hay triển khai ứng dụng lên production thương mại.
                </p>
                <p>
                  TimeProof được xây dựng từ nỗi trăn trở đó. Không chỉ là một nền tảng học trực tuyến, chúng tôi cung cấp một <strong className={isDark ? "text-blue-400" : "text-slate-800"}>hệ sinh thái toàn diện</strong> gồm: mã nguồn mẫu, kiến trúc phần mềm, bài toán thực chiến và các giải pháp tối ưu hệ thống.
                </p>
                <p>
                  Mục tiêu của chúng tôi là trang bị cho bạn tư duy của một Senior Engineer ngay từ những dòng code đầu tiên.
                </p>
              </motion.div>
            </motion.div>

            {/* Khối Đồ họa Đối xứng (Illustration Grid) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full min-w-0"
            >
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-4 md:translate-y-6">
                  <div className={`p-5 sm:p-6 rounded-3xl border text-center flex flex-col items-center gap-3 transition-colors ${
                    isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-100 shadow-xl shadow-slate-200/50"
                  }`}>
                    <div className="w-11 h-11 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center"><Terminal className="w-5 h-5" /></div>
                    <span className={`font-bold text-xs sm:text-sm ${isDark ? "text-slate-200" : "text-slate-800"}`}>Mã nguồn tối ưu</span>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-5 sm:p-6 rounded-3xl border border-slate-800 text-center flex flex-col items-center gap-3 text-white">
                    <div className="w-11 h-11 bg-white/10 text-sky-400 rounded-2xl flex items-center justify-center"><Layers className="w-5 h-5" /></div>
                    <span className="font-bold text-xs sm:text-sm">Kiến trúc hệ thống</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-600 to-sky-500 p-5 sm:p-6 rounded-3xl border border-blue-500/30 text-center flex flex-col items-center gap-3 text-white shadow-lg shadow-blue-500/10">
                    <div className="w-11 h-11 bg-white/20 text-white rounded-2xl flex items-center justify-center"><Cpu className="w-5 h-5" /></div>
                    <span className="font-bold text-xs sm:text-sm">Công nghệ tương lai</span>
                  </div>
                  <div className={`p-5 sm:p-6 rounded-3xl border text-center flex flex-col items-center gap-3 transition-colors ${
                    isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-100 shadow-xl shadow-slate-200/50"
                  }`}>
                    <div className="w-11 h-11 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center"><Globe className="w-5 h-5" /></div>
                    <span className={`font-bold text-xs sm:text-sm ${isDark ? "text-slate-200" : "text-slate-800"}`}>Cộng đồng toàn cầu</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. GIÁ TRỊ CỐT LÕI (BENTO GRID) */}
      <section className={`py-16 md:py-24 border-y transition-colors duration-300 w-full ${
        isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200/60"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>Giá Trị Cốt Lõi</h2>
            <p className="text-slate-400 text-xs sm:text-sm">4 trụ cột nền tảng tạo nên chất lượng đào tạo và nội dung chuyên sâu tại TimeProof.</p>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
          >
            {CORE_VALUES.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={idx} variants={fadeUp} 
                  className={`border p-6 sm:p-8 rounded-3xl transition-all duration-300 flex flex-col min-w-0 ${
                    isDark ? "bg-slate-900 border-slate-800/80" : "bg-slate-50 border-slate-100 hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1"
                  }`}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-6 border ${value.bg}`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className={`text-base sm:text-lg font-bold mb-3 ${isDark ? "text-slate-100" : "text-slate-800"}`}>{value.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 leading-relaxed text-justify">{value.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. TRIẾT LÝ & HÀNH TRÌNH HỌC TẬP (JOURNEY) */}
      <section className="py-16 md:py-24 bg-slate-950 text-white relative overflow-hidden w-full border-b border-slate-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
            <div className="lg:col-span-5 min-w-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-5 leading-tight">Triết lý<br/>Mô phỏng thực tế</h2>
              <p className="text-slate-400 leading-relaxed mb-8 text-xs sm:text-sm text-justify">
                Tại TimeProof, học tập không phải là việc ghi nhớ cú pháp một cách thụ động. Học tập là quá trình phân tích mã nguồn chuẩn, trực tiếp giải quyết các bài toán hóc búa về hiệu năng tải hệ thống và chia sẻ lại tri thức để nâng cao năng lực chuyên môn.
              </p>
              <button className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 self-start">
                Bắt đầu hành trình <ArrowRight className="w-4 h-4 text-blue-400" />
              </button>
            </div>

            <div className="lg:col-span-7 w-full min-w-0">
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                {JOURNEY_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="bg-white/[0.02] border border-white/[0.07] p-5 sm:p-6 rounded-2xl backdrop-blur-sm flex flex-col min-w-0">
                      <Icon className="w-5 h-5 text-sky-400 mb-3.5 flex-shrink-0" />
                      <h4 className="font-bold text-sm text-slate-200 mb-1.5 truncate">{step.title}</h4>
                      <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed text-justify">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THỐNG KÊ (STATS) */}
      <section className={`py-12 md:py-16 border-b transition-colors duration-300 w-full ${
        isDark ? "bg-black border-slate-900" : "bg-slate-50 border-slate-200/60"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full">
            {STATS.map((stat, idx) => (
              <div key={idx} className="text-center min-w-0">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 mb-1 truncate">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider truncate">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION (CTA) */}
      <section className="py-20 md:py-24 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-sky-500" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
              Sẵn Sàng Nâng Tầm <br className="sm:hidden" /> Kỹ Năng Lập Trình?
            </h2>
            <p className="text-blue-50 text-xs sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
              Tham gia cùng hàng ngàn lập trình viên khác, khám phá các bộ tài liệu giải pháp chuyên sâu và xây dựng hồ sơ năng lực đồ án cá nhân mơ ước của bạn ngay hôm nay.
            </p>
            <div className="flex justify-center w-full">
              <button className="px-6 py-3 rounded-xl bg-white text-blue-600 text-xs sm:text-sm font-bold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-auto">
                Khám Phá Nền Tảng Miễn Phí
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}