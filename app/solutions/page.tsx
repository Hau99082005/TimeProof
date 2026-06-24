"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Code2, 
  Terminal, 
  Layers, 
  Cpu, 
  Database, 
  Cloud, 
  BookOpen, 
  Clock, 
  User, 
  Bookmark,
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  X
} from "lucide-react";

// --- Dữ liệu danh mục và giải pháp mẫu ---
const CATEGORIES = [
  { id: "all", name: "Tất cả giải pháp", icon: BookOpen },
  { id: "frontend", name: "Frontend", icon: Code2 },
  { id: "backend", name: "Backend", icon: Terminal },
  { id: "database", name: "Database", icon: Database },
  { id: "devops", name: "DevOps & Cloud", icon: Cloud },
  { id: "ai", name: "AI Integration", icon: Cpu },
];

const SOLUTIONS_DATA = [
  {
    id: 1,
    title: "Cấu hình Revalidation trong Next.js App Router cho dữ liệu thời gian thực",
    category: "frontend",
    tags: ["Next.js", "TypeScript", "Caching"],
    difficulty: "Nâng cao",
    time: "8 phút",
    author: "Minh Quân",
    summary: "Hướng dẫn tối ưu hóa cơ chế ISR và On-demand Revalidation giúp tăng tốc độ tải trang nhưng vẫn đảm bảo dữ liệu luôn mới nhất."
  },
  {
    id: 2,
    title: "Xây dựng Middleware phân quyền đa vai trò (Multi-role Authentication) trong Laravel",
    category: "backend",
    tags: ["Laravel", "PHP", "Security"],
    difficulty: "Trung bình",
    time: "12 phút",
    author: "Hoàng Nhân",
    summary: "Giải pháp thiết kế phân quyền hệ thống cho các đối tượng như Lessor (Chủ nhà) và Lessee (Người thuê) đảm bảo tính bảo mật và kiểm soát truy cập."
  },
  {
    id: 3,
    title: "Docker Compose chuẩn hóa cụm ứng dụng Nginx, Node.js và PostgreSQL",
    category: "devops",
    tags: ["Docker", "Node.js", "PostgreSQL"],
    difficulty: "Nâng cao",
    time: "15 phút",
    author: "Việt Đức",
    summary: "Từng bước đóng gói môi trường phát triển cục bộ và production giúp đồng bộ hóa source code và cơ sở dữ liệu một cách nhất quán."
  },
  {
    id: 4,
    title: "Tối ưu hóa Connection Pooling cho MongoDB với Mongoose trên Serverless Environment",
    category: "database",
    tags: ["MongoDB", "Mongoose", "Serverless"],
    difficulty: "Chuyên gia",
    time: "10 phút",
    author: "Phương Nam",
    summary: "Khắc phục triệt để lỗi nghẽn hoặc tràn kết nối (Max Connections) khi chạy các hàm Cloud Functions hoặc Vercel Serverless."
  },
  {
    id: 5,
    title: "Tích hợp Streaming API của OpenAI vào giao diện React với ReadableStream",
    category: "ai",
    tags: ["React", "OpenAI", "AI"],
    difficulty: "Nâng cao",
    time: "14 phút",
    author: "Đức Trí",
    summary: "Xử lý dữ liệu văn bản trả về theo dạng gõ chữ (teletype) giúp tăng trải nghiệm người dùng tương tự như ChatGPT."
  },
  {
    id: 6,
    title: "Tối ưu Core Web Vitals và đạt 100 điểm Lighthouse cho Single Page Application",
    category: "frontend",
    tags: ["React", "Vite", "SEO"],
    difficulty: "Trung bình",
    time: "9 phút",
    author: "Khánh An",
    summary: "Kỹ thuật Code-splitting, Lazy loading images và tối ưu hóa file tĩnh giúp website đạt tốc độ phản hồi dưới 1 giây."
  }
];

export default function SolutionsExplorer() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Tất cả");
  
  // State quản lý việc xổ xuống và tiêu chí sắp xếp
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest"); // "newest" | "oldest"

  // 1. Lọc dữ liệu theo danh mục, từ khóa, độ khó
  const filteredSolutions = SOLUTIONS_DATA.filter(sol => {
    const matchesCategory = selectedCategory === "all" || sol.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "Tất cả" || sol.difficulty === selectedDifficulty;
    const matchesSearch = sol.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sol.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sol.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  // 2. Sắp xếp dữ liệu sau khi lọc (Giả định ID lớn hơn là bài viết mới hơn)
  const sortedSolutions = [...filteredSolutions].sort((a, b) => {
    if (sortBy === "newest") return b.id - a.id;
    return a.id - b.id;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* HEADER TÌM KIẾM */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 backdrop-blur-md bg-white/80">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                Kho Giải Pháp Kỹ Thuật
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Tìm kiếm cấu trúc, mã nguồn và best practices cho dự án của bạn.</p>
            </div>
            
            <div className="relative flex-1 max-w-xl md:ml-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm kiếm giải pháp, từ khóa hoặc công nghệ (e.g. Next.js, Docker)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* BỐ CỤC CHÍNH */}
      <main className="container mx-auto px-6 py-8 grid lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR BỘ LỌC (CỘT TRÁI) */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-3">Phân loại phân hệ</span>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive 
                        ? "bg-blue-50 text-blue-600 shadow-sm" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/60 p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-3">Mức độ phức tạp</span>
            <div className="flex flex-wrap gap-2">
              {["Tất cả", "Cơ bản", "Trung bình", "Nâng cao", "Chuyên gia"].map((diff) => {
                const isSelected = selectedDifficulty === diff;
                return (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isSelected 
                        ? "bg-slate-900 text-white" 
                        : "bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100"
                    }`}
                  >
                    {diff}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-sky-500 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <Sparkles className="w-5 h-5 text-sky-200 mb-3" />
            <h4 className="font-bold text-sm mb-1">Cập nhật liên tục</h4>
            <p className="text-[11px] text-blue-100 leading-relaxed mb-4">Các giải pháp lập trình được đội ngũ kiểm tra cấu trúc nghiêm ngặt trước khi xuất bản.</p>
            <div className="text-xs bg-white/10 py-1.5 px-3 rounded-lg font-mono inline-block">System Uptime: 99.99%</div>
          </div>
        </aside>

        {/* HIỂN THỊ KẾT QUẢ (CỘT PHẢI) */}
        <section className="lg:col-span-9 space-y-6">
          
          {/* THANH ĐIỀU KHIỂN & DROPDOWN SẮP XẾP */}
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 bg-white border border-slate-200/60 px-4 py-3 rounded-xl relative">
            <div>Tìm thấy <span className="font-bold text-slate-800">{sortedSolutions.length}</span> giải pháp phù hợp</div>
            
            {/* Vùng Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg text-slate-700 font-semibold transition-all duration-150"
              >
                Sắp xếp: {sortBy === "newest" ? "Mới nhất" : "Cũ nhất"}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <>
                    {/* Lớp phủ vô hình để bấm trượt ra ngoài tự đóng menu */}
                    <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 shadow-xl rounded-xl py-1.5 z-20 origin-top-right"
                    >
                      <button
                        onClick={() => { setSortBy("newest"); setIsSortOpen(false); }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${
                          sortBy === "newest" ? "text-blue-600 bg-blue-50/40 font-bold" : "text-slate-600"
                        }`}
                      >
                        Mới nhất
                      </button>
                      <button
                        onClick={() => { setSortBy("oldest"); setIsSortOpen(false); }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${
                          sortBy === "oldest" ? "text-blue-600 bg-blue-50/40 font-bold" : "text-slate-600"
                        }`}
                      >
                        Cũ nhất
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* GRID DANH SÁCH GIẢI PHÁP */}
          <div className="grid md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {sortedSolutions.map((sol) => (
                <motion.div
                  layout
                  key={sol.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-slate-200/60 rounded-2xl p-5 hover:shadow-xl hover:shadow-blue-900/[0.02] hover:border-blue-200/60 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {sol.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-slate-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        sol.difficulty === "Cơ bản" ? "bg-green-50 text-green-600" :
                        sol.difficulty === "Trung bình" ? "bg-blue-50 text-blue-600" :
                        sol.difficulty === "Nâng cao" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                      }`}>
                        {sol.difficulty}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors leading-snug mb-2 line-clamp-2">
                      {sol.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-6">
                      {sol.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {sol.author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {sol.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                      <button className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 bg-slate-50 border border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 rounded-xl transition-all duration-200">
                        Xem Code <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {sortedSolutions.length === 0 && (
              <div className="col-span-2 text-center py-16 bg-white border border-dashed border-slate-200 rounded-3xl space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto">
                  <Search className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-700">Không tìm thấy giải pháp nào</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">Vui lòng thử lại bằng các từ khóa khác hoặc điều chỉnh các tùy chọn bộ lọc.</p>
              </div>
            )}
          </div>

          {sortedSolutions.length > 0 && (
            <div className="flex items-center justify-center pt-6">
              <button className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-xs font-bold text-slate-700 transition-colors shadow-sm">
                Tải Thêm Giải Pháp
              </button>
            </div>
          )}

        </section>
      </main>

    </div>
  );
}