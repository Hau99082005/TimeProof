"use client";

import React from "react";
import { motion } from "framer-motion";
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
  Cpu
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

// --- Dữ liệu Mock ---
const CORE_VALUES = [
  {
    icon: Zap,
    title: "Thực Chiến & Chuẩn Production",
    desc: "Không chỉ dừng lại ở 'Hello World'. Mọi kiến thức, đồ án và giải pháp trên nền tảng đều tuân theo tiêu chuẩn công nghiệp, sẵn sàng để deploy thực tế.",
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    icon: Rocket,
    title: "Cập Nhật Công Nghệ Liên Tục",
    desc: "Nắm bắt nhanh nhất các xu hướng như Next.js App Router, React 19, Microservices hay tích hợp Generative AI vào ứng dụng web.",
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    icon: Users,
    title: "Sức Mạnh Của Cộng Đồng",
    desc: "Học tập không cô đơn. Chúng tôi xây dựng môi trường để lập trình viên chia sẻ code, đánh giá chéo (code review) và cùng nhau tiến bộ.",
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    icon: ShieldCheck,
    title: "Kiến Trúc & Bảo Mật Ưu Tiên",
    desc: "Đào tạo tư duy hệ thống (System Design). Viết code không chỉ để chạy được, mà còn phải bảo mật, dễ bảo trì và có khả năng mở rộng (Scalable).",
    color: "text-purple-500",
    bg: "bg-purple-50"
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

// Tránh lỗi khi import BookOpen từ lucide-react ở trên chưa có
import { BookOpen } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 overflow-hidden">

      {/* 1. CÂU CHUYỆN CỦA CHÚNG TÔI (OUR STORY) */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Tại sao <span className="text-blue-600">TimeProof</span> ra đời?
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  Hàng năm, có hàng ngàn sinh viên công nghệ thông tin tốt nghiệp với kiến thức lý thuyết vững vàng, nhưng lại lúng túng khi đối mặt với việc xây dựng một hệ thống phần mềm thực tế, hay triển khai ứng dụng lên production.
                </p>
                <p>
                  TimeProof được xây dựng từ nỗi trăn trở đó. Không chỉ là một nền tảng học trực tuyến, chúng tôi cung cấp một <strong className="text-slate-800">hệ sinh thái toàn diện</strong> gồm: mã nguồn mẫu, kiến trúc phần mềm, bài toán thực chiến và các giải pháp tối ưu hệ thống.
                </p>
                <p>
                  Mục tiêu của chúng tôi là trang bị cho bạn tư duy của một Senior Engineer ngay từ những dòng code đầu tiên.
                </p>
              </motion.div>
            </motion.div>

            {/* Illustration Grid */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 translate-y-8">
                  <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><Terminal className="w-6 h-6" /></div>
                    <span className="font-bold text-sm text-slate-800">Mã nguồn tối ưu</span>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-6 rounded-3xl shadow-xl border border-slate-800 flex flex-col items-center text-center gap-4 text-white">
                    <div className="w-12 h-12 bg-white/10 text-sky-400 rounded-2xl flex items-center justify-center"><Layers className="w-6 h-6" /></div>
                    <span className="font-bold text-sm">Kiến trúc hệ thống</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-600 to-sky-500 p-6 rounded-3xl shadow-xl shadow-blue-500/20 border border-blue-400 flex flex-col items-center text-center gap-4 text-white">
                    <div className="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center"><Cpu className="w-6 h-6" /></div>
                    <span className="font-bold text-sm">Công nghệ tương lai</span>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center"><Globe className="w-6 h-6" /></div>
                    <span className="font-bold text-sm">Cộng đồng toàn cầu</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. GIÁ TRỊ CỐT LÕI (BENTO GRID) */}
      <section className="py-24 bg-white border-y border-slate-200/60">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Giá Trị Cốt Lõi</h2>
            <p className="text-slate-500">4 trụ cột nền tảng tạo nên chất lượng đào tạo và nội dung tại TimeProof.</p>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {CORE_VALUES.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div key={idx} variants={fadeUp} className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl ${value.bg} ${value.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{value.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. TRIẾT LÝ & HÀNH TRÌNH HỌC TẬP (JOURNEY) */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Triết lý<br/>Mô phỏng thực tế</h2>
              <p className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base">
                Tại TimeProof, học tập không phải là việc ghi nhớ cú pháp. Học tập là quá trình phân tích mã nguồn chuẩn, trực tiếp giải quyết các bài toán hóc búa về hiệu năng và chia sẻ lại tri thức để củng cố chuyên môn.
              </p>
              <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold transition-colors flex items-center gap-2">
                Bắt đầu hành trình <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-4">
                {JOURNEY_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                      <Icon className="w-6 h-6 text-sky-400 mb-4" />
                      <h4 className="font-bold text-slate-200 mb-2">{step.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THỐNG KÊ (STATS) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/60">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION (CTA) */}
      <section className="py-24 relative overflow-hidden">
        {/* Nền xanh gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-sky-500" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Sẵn Sàng Nâng Tầm <br /> Kỹ Năng Lập Trình?
            </h2>
            <p className="text-blue-50 text-sm md:text-lg mb-10 leading-relaxed">
              Tham gia cùng hàng ngàn lập trình viên khác, khám phá các bộ tài liệu giải pháp chuyên sâu và xây dựng portfolio mơ ước của bạn ngay hôm nay.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 rounded-xl bg-white text-blue-600 text-sm font-bold shadow-2xl hover:scale-105 transition-transform duration-200">
                Khám Phá Nền Tảng Miễn Phí
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}