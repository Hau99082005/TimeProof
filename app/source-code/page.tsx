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
  Globe
} from "lucide-react";

// --- Danh mục Ngôn ngữ / Framework ---
const LANGUAGES = [
  { id: "all", name: "Tất cả mã nguồn", icon: FolderGit2 },
  { id: "typescript", name: "TypeScript / React", icon: Code2 },
  { id: "php", name: "PHP / Laravel", icon: Globe },
  { id: "nodejs", name: "Node.js / Express", icon: Terminal },
  { id: "snippets", name: "Tailwind Snippets", icon: Layers },
];

// --- Dữ liệu Kho Mã Nguồn Mẫu ---
const REPOSITORIES_DATA = [
  {
    id: 1,
    owner: "nguyenhoang",
    repoName: "laravel-apartment-rental-api",
    description: "Mã nguồn Backend API hệ thống tìm kiếm và cho thuê căn hộ - nhà trọ. Tích hợp đầy đủ phân quyền bảo mật chặt chẽ cho vai trò Lessor (Chủ nhà), quản lý tin đăng và lưu trữ cơ sở dữ liệu với MongoDB.",
    language: "php",
    langName: "PHP",
    langColor: "bg-purple-500",
    tags: ["Laravel", "MongoDB", "JWT-Auth"],
    stars: 342,
    forks: 85,
    views: "1.8k"
  },
  {
    id: 2,
    owner: "timeproof-labs",
    repoName: "react-vite-ts-boilerplate",
    description: "Khung dự án (Boilerplate) khởi tạo nhanh bằng Vite, tối ưu sẵn cấu hình ESLint, Prettier, TypeScript và cấu trúc thư mục dạng mô-đun hóa đạt chuẩn production.",
    language: "typescript",
    langName: "TypeScript",
    langColor: "bg-blue-500",
    tags: ["React", "Vite", "TailwindCSS"],
    stars: 512,
    forks: 120,
    views: "3.4k"
  },
  {
    id: 3,
    owner: "architecture-patterns",
    repoName: "nodejs-clean-architecture",
    description: "Kiến trúc sạch (Clean Architecture) cho dự án Node.js & Express. Phân tách rõ ràng các tầng Controller, Use Cases, Entities và Repositories giúp dễ dàng viết Unit Test chuyên sâu.",
    language: "nodejs",
    langName: "JavaScript",
    langColor: "bg-green-500",
    tags: ["Node.js", "Express", "PostgreSQL"],
    stars: 289,
    forks: 64,
    views: "1.5k"
  },
  {
    id: 4,
    owner: "tailwind-ui-effects",
    repoName: "glassmorphism-dashboard-components",
    description: "Bộ sưu tập các đoạn mã nguồn ngắn (Snippets) tạo hiệu ứng mờ kính (Glassmorphism), bóng đổ mịn và hiệu ứng chuyển động gradient mượt mà chỉ bằng utility classes của Tailwind.",
    language: "snippets",
    langName: "CSS",
    langColor: "bg-sky-400",
    tags: ["TailwindCSS", "UI-Kit"],
    stars: 195,
    forks: 32,
    views: "920"
  },
  {
    id: 5,
    owner: "ai-integrations",
    repoName: "nextjs-openai-stream-handler",
    description: "Mã nguồn xử lý dữ liệu ReadableStream từ OpenAI API trong Next.js App Router (Edge Runtime). Hiển thị chữ chạy real-time mượt mà, tối ưu hóa bộ nhớ đệm ứng dụng.",
    language: "typescript",
    langName: "TypeScript",
    langColor: "bg-blue-500",
    tags: ["Next.js", "OpenAI", "Edge-Runtime"],
    stars: 408,
    forks: 92,
    views: "2.1k"
  }
];

export default function SourceCodeHub() {
  const [selectedLang, setSelectedLang] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("stars"); 
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Quản lý trạng thái mounted nhằm tránh lỗi bất đồng bộ (Hydration Mismatch) giữa Server và Client
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Biến kiểm tra chế độ tối dựa trên hệ thống next-themes
  const isDark = mounted && theme === "dark";

  const handleCopyClone = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredRepos = REPOSITORIES_DATA.filter(repo => {
    const matchesLang = selectedLang === "all" || repo.language === selectedLang;
    const matchesSearch = repo.repoName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          repo.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLang && matchesSearch;
  });

  const sortedRepos = [...filteredRepos].sort((a, b) => {
    if (sortBy === "stars") return b.stars - a.stars;
    if (sortBy === "newest") return b.id - a.id;
    return a.id - b.id;
  });

  return (
  <div className={`min-h-screen transition-colors duration-300 font-sans antialiased w-full overflow-x-hidden ${
        isDark ? "bg-black text-slate-100" : "bg-slate-50 text-slate-900"
      }`}>
        
        {/* ─── THANH TÌM KIẾM PHỤ (SUB-HEADER) ĐÃ FIX CÂN ĐỐI ─── */}
        <div className={`border-b relative z-10 transition-colors duration-300 w-full ${
          isDark ? "bg-black border-slate-900" : "bg-white border-slate-200"
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-7">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              
              {/* Khối Tiêu đề */}
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 sm:w-5 h-5 text-blue-600 dark:text-blue-500 flex-shrink-0" />
                  <span>Trung Tâm Mã Nguồn Mở</span>
                </h1>
                <p className={`text-[11px] sm:text-xs mt-1 transition-colors ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Khám phá cấu trúc mã nguồn dự án và snippets tối ưu hệ thống.
                </p>
              </div>
              
              {/* Hộp tìm kiếm thông minh */}
              <div className="relative w-full md:w-80 lg:w-[400px] min-w-0 flex-shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Tìm tên kho lưu trữ, công nghệ..."
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
      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-6 md:py-8 grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 w-full">
        
        {/* SIDEBAR BỘ LỌC DANH MỤC */}
        <aside className="lg:col-span-3 w-full min-w-0">
          <div className={`rounded-2xl border p-3 sm:p-4 transition-colors duration-300 ${
            isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200/60"
          }`}>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block mb-2 px-1 text-slate-400 dark:text-slate-500">
              Ngôn ngữ chính
            </span>
            
            <div className="flex flex-wrap lg:flex-col gap-1.5">
              {LANGUAGES.map((lang) => {
                const IconComponent = lang.icon;
                const isActive = selectedLang === lang.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLang(lang.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all ${
                      isActive 
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/10 dark:shadow-none" 
                        : isDark
                          ? "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-white" : "text-blue-500"}`} />
                    <span className="truncate">{lang.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block bg-gradient-to-br from-blue-950 to-black rounded-2xl p-5 text-white shadow-sm relative overflow-hidden mt-6 border border-slate-900">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-xl pointer-events-none" />
            <Sparkles className="w-4 h-4 text-sky-400 mb-2.5" />
            <h4 className="font-bold text-xs mb-1">Đóng góp mã nguồn</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-4">Chia sẻ các giải pháp xử lý tối ưu của bạn tới cộng đồng phần mềm.</p>
            <button className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-[11px] font-bold transition-colors">
              Tạo Pull Request
            </button>
          </div>
        </aside>

        {/* LƯỚI KHU VỰC THỂ HIỆN KẾT QUẢ */}
        <section className="lg:col-span-9 space-y-3.5 w-full min-w-0">
          
          {/* Thanh số liệu tinh gọn trên mọi kích thước */}
          <div className={`flex items-center justify-between text-[11px] sm:text-xs font-medium border px-3.5 py-2.5 rounded-xl relative w-full transition-colors duration-300 ${
            isDark ? "bg-slate-950 border-slate-900 text-slate-400" : "bg-white border-slate-200/60 text-slate-500"
          }`}>
            <div className="truncate">Hiển thị <span className={`font-bold ${isDark ? "text-white" : "text-slate-800"}`}>{sortedRepos.length}</span> kết quả</div>
            
            <div className="relative flex-shrink-0">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`flex items-center gap-1 border px-2.5 py-1.5 rounded-lg font-semibold text-[11px] sm:text-xs transition-colors ${
                  isDark ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                <span>{sortBy === "stars" ? "Nhiều sao" : sortBy === "newest" ? "Mới nhất" : "Cũ nhất"}</span>
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
                      <button onClick={() => { setSortBy("stars"); setIsSortOpen(false); }} className={`w-full text-left px-3 py-1.5 text-[11px] ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Nhiều sao</button>
                      <button onClick={() => { setSortBy("newest"); setIsSortOpen(false); }} className={`w-full text-left px-3 py-1.5 text-[11px] ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Mới nhất</button>
                      <button onClick={() => { setSortBy("oldest"); setIsSortOpen(false); }} className={`w-full text-left px-3 py-1.5 text-[11px] ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Cũ nhất</button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* VÙNG DANH SÁCH THẺ CARD REPOSITORIES */}
          <div className="space-y-3 w-full">
            <AnimatePresence mode="popLayout">
              {sortedRepos.map((repo) => {
                const cloneCommand = `git clone https://timeproof.edu/git/${repo.owner}/${repo.repoName}.git`;
                return (
                  <motion.div
                    layout
                    key={repo.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className={`border rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all w-full min-w-0 ${
                      isDark 
                        ? "bg-slate-950 border-slate-900 hover:border-slate-800" 
                        : "bg-white border-slate-200 hover:border-blue-200"
                    }`}
                  >
                    <div className="min-w-0">
                      {/* Thẻ Header: Tên Repository thích ứng mobile */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 mb-2.5 w-full min-w-0">
                        <h3 className="text-xs sm:text-sm font-bold flex items-center gap-1 flex-wrap break-all min-w-0 pr-2">
                          <span className={isDark ? "text-slate-500" : "text-slate-400"}>{repo.owner}</span>
                          <span className={isDark ? "text-slate-700" : "text-slate-300"}>/</span>
                          <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer break-all">{repo.repoName}</span>
                        </h3>
                        <div className={`flex items-center gap-1.5 text-[10px] font-semibold self-start sm:self-auto flex-shrink-0 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          <span className={`w-2 h-2 rounded-full ${repo.langColor}`} />
                          {repo.langName}
                        </div>
                      </div>

                      {/* Nội dung mô tả chi tiết */}
                      <p className={`text-[11px] sm:text-xs leading-relaxed mb-4 text-justify ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        {repo.description}
                      </p>

                      {/* Công nghệ sử dụng & Chỉ số đo lường */}
                      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-3 mb-3 w-full min-w-0 ${isDark ? "border-slate-900" : "border-slate-100"}`}>
                        <div className="flex flex-wrap gap-1 w-full sm:w-auto">
                          {repo.tags.map((tag, i) => (
                            <span key={i} className={`text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded flex-shrink-0 ${
                              isDark ? "text-blue-400 bg-blue-950/40 border border-blue-900/30" : "text-blue-600 bg-blue-50"
                            }`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-3.5 text-[10px] sm:text-[11px] font-medium text-slate-400 dark:text-slate-500 self-start sm:self-auto flex-shrink-0">
                          <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {repo.stars}</span>
                          <span className="flex items-center gap-0.5"><GitFork className="w-3 h-3" /> {repo.forks}</span>
                          <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> {repo.views}</span>
                        </div>
                      </div>
                    </div>

                    {/* HỘP TERMINAL CHỨA PHÍM SAO CHÉP LỆNH CLONE */}
                    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 border p-2 rounded-xl w-full min-w-0 ${
                      isDark ? "bg-black border-slate-900" : "bg-slate-50 border-slate-100"
                    }`}>
                      
                      {/* Vùng văn bản mã Terminal có thanh cuộn ngang độc lập để chống vỡ màn hình */}
                      <div className={`flex items-center gap-1.5 font-mono text-[10px] border px-2.5 py-2 rounded-lg flex-1 overflow-x-auto whitespace-nowrap scrollbar-none min-w-0 w-full ${
                        isDark ? "bg-slate-950 border-slate-900 text-slate-300" : "bg-white border-slate-200/60 text-slate-500"
                      }`}>
                        <span className="text-blue-500 dark:text-blue-400 font-bold select-none">$</span>
                        <span className="select-all break-all">{cloneCommand}</span>
                      </div>

                      {/* Các phím bấm thao tác */}
                      <div className="flex items-center gap-2 justify-end w-full sm:w-auto flex-shrink-0">
                        <button 
                          onClick={() => handleCopyClone(repo.id, cloneCommand)}
                          className={`p-2 border rounded-lg transition-colors flex items-center justify-center min-w-[36px] min-h-[36px] ${
                            isDark ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-400 hover:text-slate-700"
                          }`}
                        >
                          {copiedId === repo.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1 text-[11px] font-bold px-3 py-2 rounded-lg transition-colors min-h-[36px] whitespace-nowrap ${
                          isDark ? "bg-slate-100 text-slate-900 hover:bg-slate-200" : "bg-slate-900 text-white hover:bg-slate-800"
                        }`}>
                          <FileCode className="w-3.5 h-3.5" /> Xem Tập Tin
                        </button>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* TRẠNG THÁI KHÔNG TÌM THẤY KẾT QUẢ */}
          {sortedRepos.length === 0 && (
            <div className={`text-center py-16 border border-dashed rounded-3xl space-y-3 w-full ${
              isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200"
            }`}>
              <h4 className="font-bold text-sm text-slate-400">Không tìm thấy mã nguồn nào phù hợp</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto px-4">Vui lòng điều chỉnh lại từ khóa hoặc lọc theo phân hệ chính khác.</p>
            </div>
          )}

          {/* PHÂN TRANG */}
          {sortedRepos.length > 0 && (
            <div className="flex items-center justify-center pt-2">
              <button className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all w-full sm:w-auto shadow-sm ${
                isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300" : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
              }`}>
                Tải Thêm Mã Nguồn
              </button>
            </div>
          )}

        </section>
      </main>

    </div>
  );
}