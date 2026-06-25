"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { 
  Search, 
  Code2, 
  FolderGit2, 
  GitFork, 
  Star, 
  Eye, 
  ChevronDown, 
  Copy, 
  Check, 
  X, 
  Terminal, 
  Layers, 
  FileCode,
  Sparkles,
  Cloud,
  BookOpen,
  User,
  Clock,
  Bookmark,
  ArrowUpRight,
  Database,
  Cpu
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
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Đồng bộ hóa trạng thái giao diện Next-Themes (Tránh lỗi Hydration Mismatch)
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  const handleCopyClone = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSolutions = SOLUTIONS_DATA.filter(sol => {
    const matchesCategory = selectedCategory === "all" || sol.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "Tất cả" || sol.difficulty === selectedDifficulty;
    const matchesSearch = sol.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sol.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sol.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const sortedSolutions = [...filteredSolutions].sort((a, b) => {
    if (sortBy === "newest") return b.id - a.id;
    return a.id - b.id;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased w-full overflow-x-hidden ${
      isDark ? "bg-black text-slate-100" : "bg-slate-50 text-slate-900"
    }`}>
      
      {/* ─── PHẦN ĐẦU TRANG CÂN ĐỐI TRỤC DỌC (ĐÃ SỬA LỖI OVERLAP CHÈN NỘI DUNG) ─── */}
      <div className={`border-b relative z-10 transition-colors duration-300 w-full ${
        isDark ? "bg-black border-slate-900" : "bg-white border-slate-200/80"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
            
            <div className="min-w-0 space-y-1">
              <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight flex items-center gap-2">
                <Layers className="w-4 h-4 sm:w-5 h-5 text-blue-600 dark:text-blue-500 flex-shrink-0" />
                <span>Kho Giải Pháp Kỹ Thuật</span>
              </h1>
              <p className={`text-[11px] sm:text-xs transition-colors ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Tìm kiếm cấu trúc, mã nguồn và best practices cho dự án của bạn.
              </p>
            </div>
            
            {/* Hộp tìm kiếm cân xứng tương thích đa thiết bị */}
            <div className="relative w-full md:w-80 lg:w-[400px] min-w-0 flex-shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm kiếm giải pháp, từ khóa hoặc công nghệ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-9 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
                  isDark 
                    ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:bg-slate-900/40" 
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white"
                }`}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* BỐ CỤC KHÔNG GIAN LÀM VIỆC CHÍNH */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 w-full">
        
        {/* SIDEBAR BỘ LỌC NGÔN NGỮ & PHÂN HỆ */}
        <aside className="lg:col-span-3 w-full min-w-0 space-y-4 sm:space-y-6">
          
          {/* Phân loại phân hệ */}
          <div className={`rounded-2xl border p-3 sm:p-4 transition-colors duration-300 ${
            isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200/60"
          }`}>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block mb-2 px-1 text-slate-400 dark:text-slate-500">
              Phân hệ công nghệ
            </span>
            <div className="flex flex-wrap lg:flex-col gap-1.5">
              {CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all w-full ${
                      isActive 
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/10 dark:shadow-none" 
                        : isDark
                          ? "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-white" : "text-blue-500"}`} />
                    <span className="truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mức độ phức tạp */}
          <div className={`rounded-2xl border p-3 sm:p-4 transition-colors duration-300 ${
            isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200/60"
          }`}>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block mb-2 px-1 text-slate-400 dark:text-slate-500">
              Mức độ phức tạp
            </span>
            <div className="flex flex-wrap gap-1.5 p-0.5">
              {["Tất cả", "Cơ bản", "Trung bình", "Nâng cao", "Chuyên gia"].map((diff) => {
                const isSelected = selectedDifficulty === diff;
                return (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium border transition-all ${
                      isSelected 
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm" 
                        : isDark
                          ? "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {diff}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Banner hệ thống */}
          <div className="hidden lg:block bg-gradient-to-br from-blue-600 to-sky-500 rounded-2xl p-5 text-white shadow-sm relative overflow-hidden border border-blue-700">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <Sparkles className="w-5 h-5 text-sky-200 mb-3" />
            <h4 className="font-bold text-sm mb-1">Cập nhật liên tục</h4>
            <p className="text-[11px] text-blue-100 leading-relaxed mb-4">Các giải pháp lập trình được đội ngũ kiểm tra cấu trúc nghiêm ngặt trước khi xuất bản.</p>
            <div className="text-xs bg-white/10 py-1.5 px-3 rounded-lg font-mono inline-block">System Uptime: 99.99%</div>
          </div>

        </aside>

        {/* NƠI HIỂN THỊ DANH SÁCH GIẢI PHÁP */}
        <section className="lg:col-span-9 space-y-3.5 w-full min-w-0">
          
          {/* Thanh số liệu kết quả */}
          <div className={`flex items-center justify-between text-[11px] sm:text-xs font-medium border px-3.5 py-2.5 rounded-xl relative w-full transition-colors duration-300 ${
            isDark ? "bg-slate-950 border-slate-900 text-slate-400" : "bg-white border-slate-200/60 text-slate-500"
          }`}>
            <div className="truncate">Tìm thấy <span className="font-bold text-slate-800 dark:text-white">{sortedSolutions.length}</span> giải pháp phù hợp</div>
            
            <div className="relative flex-shrink-0">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`flex items-center gap-1 border px-2.5 py-1.5 rounded-lg font-semibold text-[11px] sm:text-xs transition-colors ${
                  isDark ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                <span>Sắp xếp: {sortBy === "newest" ? "Mới nhất" : "Cũ nhất"}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className={`absolute right-0 mt-1 w-32 border shadow-xl rounded-xl py-1 z-20 origin-top-right transition-colors ${
                        isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                      }`}
                    >
                      <button onClick={() => { setSortBy("newest"); setIsSortOpen(false); }} className={`w-full text-left px-3 py-1.5 text-[11px] ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Mới nhất</button>
                      <button onClick={() => { setSortBy("oldest"); setIsSortOpen(false); }} className={`w-full text-left px-3 py-1.5 text-[11px] ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Cũ nhất</button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* LƯỚI GRID HIỂN THỊ DANH SÁCH CARD GIẢI PHÁP */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 w-full">
            <AnimatePresence mode="popLayout">
              {sortedSolutions.map((sol) => (
                <motion.div
                  layout
                  key={sol.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className={`border rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all w-full min-w-0 group ${
                    isDark 
                      ? "bg-slate-950 border-slate-900 hover:border-slate-800" 
                      : "bg-white border-slate-200 hover:border-blue-200"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-4 w-full min-w-0">
                      <div className="flex flex-wrap gap-1 w-full sm:w-auto">
                        {sol.tags.map((tag, i) => (
                          <span key={i} className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            isDark ? "text-slate-400 bg-slate-900 border border-slate-800/80" : "text-slate-600 bg-slate-50 border border-slate-100"
                          }`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0 ${
                        sol.difficulty === "Cơ bản" ? "bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400 dark:border dark:border-green-900/30" :
                        sol.difficulty === "Trung bình" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 dark:border dark:border-blue-900/30" :
                        sol.difficulty === "Nâng cao" ? "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 dark:border dark:border-amber-900/30" : 
                        "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 dark:border dark:border-red-900/30"
                      }`}>
                        {sol.difficulty}
                      </span>
                    </div>

                    <h3 className={`font-bold text-sm transition-colors leading-snug mb-2 line-clamp-2 ${isDark ? "text-white group-hover:text-blue-400" : "text-slate-800 group-hover:text-blue-600"}`}>
                      {sol.title}
                    </h3>

                    <p className={`text-xs line-clamp-2 leading-relaxed mb-6 text-justify ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {sol.summary}
                    </p>
                  </div>

                  <div className={`pt-4 border-t flex items-center justify-between gap-4 ${isDark ? "border-slate-900" : "border-slate-100"}`}>
                    <div className="flex items-center gap-3.5 text-[11px] font-medium text-slate-400 dark:text-slate-500 flex-shrink-0">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {sol.author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {sol.time}</span>
                    </div>

                    <div className="flex items-center gap-2 justify-end flex-1">
                      <button className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
                        isDark ? "text-slate-400 hover:text-blue-400 hover:bg-slate-900" : "text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                      }`}>
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                      <button className={`inline-flex items-center justify-center gap-1 text-[11px] font-bold py-2 px-3 rounded-xl transition-all duration-200 min-h-[36px] whitespace-nowrap ${
                        isDark ? "bg-slate-100 text-slate-900 hover:bg-slate-200" : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}>
                        Xem Code <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* TRẠNG THÁI TRỐNG (KHO LỌC KHÔNG CÓ KẾT QUẢ) */}
          {sortedSolutions.length === 0 && (
            <div className={`text-center py-16 border border-dashed rounded-3xl space-y-3 w-full ${
              isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200"
            }`}>
              <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 mx-auto">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">Không tìm thấy giải pháp nào</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto px-4">Vui lòng điều chỉnh lại từ khóa hoặc lọc theo tùy chọn chuyên hệ khác.</p>
            </div>
          )}

          {/* PHÂN TRANG */}
          {sortedSolutions.length > 0 && (
            <div className="flex items-center justify-center pt-2">
              <button className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all w-full sm:w-auto shadow-sm ${
                isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300" : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
              }`}>
                Tải Thêm Giải Pháp
              </button>
            </div>
          )}

        </section>
      </main>

    </div>
  );
}