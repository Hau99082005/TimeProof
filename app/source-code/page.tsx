"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Cpu, 
  Globe, 
  Layers, 
  FileCode,
  Sparkles,
  ArrowUpRight
} from "lucide-react";

// --- Danh mục Ngôn ngữ / Framework ---
const LANGUAGES = [
  { id: "all", name: "Tất cả mã nguồn", icon: FolderGit2 },
  { id: "typescript", name: "TypeScript / React", icon: Code2, color: "bg-blue-500" },
  { id: "php", name: "PHP / Laravel", icon: Globe, color: "bg-purple-500" },
  { id: "nodejs", name: "Node.js / Express", icon: Terminal, color: "bg-green-500" },
  { id: "snippets", name: "Tailwind Snippets", icon: Layers, color: "bg-sky-400" },
];

// --- Dữ liệu Kho Mã Nguồn Mẫu ---
const REPOSITORIES_DATA = [
  {
    id: 1,
    owner: "nguyenhoang",
    repoName: "laravel-apartment-rental-api",
    description: "Mã nguồn Backend API hệ thống tìm kiếm và cho thuê căn hộ - nhà trọ. Tích hợp đầy đủ phân quyền bảo mật cho vai trò Lessor (Chủ nhà), quản lý tin đăng và lưu trữ MongoDB.",
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
    description: "Kiến trúc sạch (Clean Architecture) cho dự án Node.js & Express. Phân tách rõ ràng các tầng Controller, Use Cases, Entities và Repositories giúp dễ dàng viết Unit Test.",
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
    description: "Mã nguồn xử lý dữ liệu ReadableStream từ OpenAI API trong Next.js App Router (Edge Runtime). Hiển thị chữ chạy real-time mượt mà, tối ưu hóa bộ nhớ đệm.",
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
  const [sortBy, setSortBy] = useState("stars"); // "stars" | "newest" | "oldest"
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Xử lý sao chép dòng lệnh clone nhanh
  const handleCopyClone = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 1. Logic lọc dữ liệu
  const filteredRepos = REPOSITORIES_DATA.filter(repo => {
    const matchesLang = selectedLang === "all" || repo.language === selectedLang;
    const matchesSearch = repo.repoName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          repo.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLang && matchesSearch;
  });

  // 2. Logic sắp xếp dữ liệu
  const sortedRepos = [...filteredRepos].sort((a, b) => {
    if (sortBy === "stars") return b.stars - a.stars;
    if (sortBy === "newest") return b.id - a.id;
    return a.id - b.id;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* HEADER TÌM KIẾM TINH GỌN PHONG CÁCH GITHUB */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 backdrop-blur-md bg-white/80">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-blue-600" />
                Trung Tâm Mã Nguồn Mở
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Khám phá cấu trúc mã nguồn dự án, snippets thực tế và các mẫu xử lý thuật toán tối ưu.</p>
            </div>
            
            {/* Hộp tìm kiếm */}
            <div className="relative flex-1 max-w-xl md:ml-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm tên kho lưu trữ, công nghệ (e.g. JWT, Laravel, Next.js)..."
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
        
        {/* SIDEBAR BỘ LỌC NGÔN NGỮ (CỘT TRÁI) */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-3">Ngôn ngữ chính</span>
            <div className="space-y-1">
              {LANGUAGES.map((lang) => {
                const IconComponent = lang.icon;
                const isActive = selectedLang === lang.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLang(lang.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive 
                        ? "bg-blue-50 text-blue-600 shadow-sm" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                    {lang.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hộp gợi ý phím tắt nhanh */}
          <div className="bg-gradient-to-br from-blue-900 to-slate-950 rounded-2xl p-5 text-white shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-xl pointer-events-none" />
            <Sparkles className="w-4 h-4 text-sky-400 mb-2.5" />
            <h4 className="font-bold text-xs mb-1">Đóng góp mã nguồn</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-4">Bạn có đoạn mã xử lý hay hoặc Boilerplate tâm đắc? Đóng góp ngay để cùng xây dựng cộng đồng vững mạnh.</p>
            <button className="w-full py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl text-[11px] font-bold transition-colors">
              Tạo Pull Request
            </button>
          </div>
        </aside>

        {/* DANH SÁCH CÁC KHO MÃ NGUỒN (CỘT PHẢI) */}
        <section className="lg:col-span-9 space-y-4">
          
          {/* THANH ĐIỀU KHIỂN & DROPDOWN SẮP XẾP */}
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 bg-white border border-slate-200/60 px-4 py-3 rounded-xl relative">
            <div>Hiển thị <span className="font-bold text-slate-800">{sortedRepos.length}</span> kho lưu trữ mã nguồn</div>
            
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg text-slate-700 font-semibold transition-all duration-150"
              >
                Sắp xếp: {
                  sortBy === "stars" ? "Nhiều sao nhất" :
                  sortBy === "newest" ? "Mới nhất" : "Cũ nhất"
                }
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.12, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 shadow-xl rounded-xl py-1.5 z-20 origin-top-right"
                    >
                      <button
                        onClick={() => { setSortBy("stars"); setIsSortOpen(false); }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${
                          sortBy === "stars" ? "text-blue-600 bg-blue-50/40 font-bold" : "text-slate-600"
                        }`}
                      >
                        Nhiều sao nhất
                      </button>
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

          {/* DANH SÁCH CARD KHO MÃ NGUỒN */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {sortedRepos.map((repo) => {
                const cloneCommand = `git clone https://timeproof.edu/git/${repo.owner}/${repo.repoName}.git`;
                return (
                  <motion.div
                    layout
                    key={repo.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white border border-slate-200/70 rounded-2xl p-5 hover:border-blue-200/80 transition-all duration-200 group flex flex-col justify-between"
                  >
                    <div>
                      {/* Tiêu đề kiểu Repository Owner/Name */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1">
                          <span className="text-slate-400 font-normal">{repo.owner}</span>
                          <span className="text-slate-300">/</span>
                          <span className="group-hover:text-blue-600 transition-colors cursor-pointer">{repo.repoName}</span>
                        </h3>
                        
                        {/* Huy hiệu ngôn ngữ dạng chấm tròn định vị */}
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                          <span className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`} />
                          {repo.langName}
                        </div>
                      </div>

                      {/* Mô tả chi tiết mã nguồn */}
                      <p className="text-xs text-slate-500 leading-relaxed mb-4 max-w-4xl">
                        {repo.description}
                      </p>

                      {/* Thẻ phụ công nghệ và Số liệu tương tác */}
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-50 pb-4 mb-4">
                        <div className="flex flex-wrap gap-1">
                          {repo.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400">
                          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {repo.stars}</span>
                          <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" /> {repo.forks}</span>
                          <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {repo.views}</span>
                        </div>
                      </div>
                    </div>

                    {/* Dòng lệnh sao chép nhanh và Nút hành động */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                      <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 bg-white border border-slate-200/60 px-3 py-2 rounded-lg flex-1 overflow-x-auto whitespace-nowrap">
                        <span className="text-blue-500 text-[11px] select-none">$</span>
                        <span>{cloneCommand}</span>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button 
                          onClick={() => handleCopyClone(repo.id, cloneCommand)}
                          className="p-2 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-slate-500 hover:text-slate-800 transition-colors relative"
                          title="Sao chép lệnh sao chép"
                        >
                          {copiedId === repo.id ? (
                            <Check className="w-3.5 h-3.5 text-green-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 bg-slate-900 border border-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors">
                          <FileCode className="w-3.5 h-3.5" /> Xem Tập Tin
                        </button>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Trạng thái trống khi bộ lọc không khớp */}
            {sortedRepos.length === 0 && (
              <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-3xl space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto">
                  <Search className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-700">Không tìm thấy mã nguồn nào</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">Vui lòng điều chỉnh lại từ khóa hoặc danh mục ngôn ngữ để có kết quả mong muốn.</p>
              </div>
            )}
          </div>

          {/* PHÂN TRANG */}
          {sortedRepos.length > 0 && (
            <div className="flex items-center justify-center pt-4">
              <button className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-xs font-bold text-slate-700 transition-colors shadow-sm">
                Tải Thêm Mã Nguồn
              </button>
            </div>
          )}

        </section>
      </main>

    </div>
  );
}