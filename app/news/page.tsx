"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { 
  Search, 
  MessageSquare, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  ChevronDown, 
  ThumbsUp, 
  Eye, 
  X, 
  Grid, 
  Tag, 
  Clock, 
  User, 
  ArrowUpRight,
  Bookmark,
  MessageCircle
} from "lucide-react";

// --- Danh mục phân loại bài viết ---
const POST_TYPES = [
  { id: "all", name: "Tất cả bài viết", icon: Grid },
  { id: "experience", name: "Chia sẻ kinh nghiệm", icon: Sparkles },
  { id: "qa", name: "Hỏi đáp cộng đồng", icon: HelpCircle },
  { id: "explanation", name: "Giải thích kiến thức", icon: BookOpen },
];

// --- Danh sách thẻ Tab phổ biến ---
const POPULAR_TAGS = ["React", "Next.js", "Node.js", "Laravel", "Docker", "Security", "Web Performance"];

// --- Dữ liệu danh sách bài viết mẫu ---
const ARTICLES_DATA = [
  {
    id: 1,
    type: "experience",
    title: "Kinh nghiệm tối ưu hóa và triển khai đồ án tốt nghiệp CNTT đạt điểm tối đa",
    summary: "Chia sẻ lộ trình chuẩn bị từ việc thiết kế sơ đồ thực thể (Schema Design), vẽ biểu đồ UML, phân chia phân quyền vai trò hệ thống đến việc tối ưu hiệu năng trước hội đồng chấm thi.",
    author: "Nguyên Hoàng",
    date: "2 giờ trước",
    time: "10 phút đọc",
    views: "1.5k",
    likes: 420,
    comments: 28,
    tags: ["React", "Node.js", "Laravel"]
  },
  {
    id: 2,
    type: "explanation",
    title: "Giải thích tường tận về Event Loop và kiến trúc bất đồng bộ trong JavaScript",
    summary: "Hiểu sâu về Call Stack, Web APIs, Task Queue và Microtask Queue. Tại sao setTimeout(..., 0) không chạy ngay lập tức? Bài viết giúp bạn tự tin vượt qua các câu hỏi phỏng vấn core JS.",
    author: "Minh Quân",
    date: "1 ngày trước",
    time: "15 phút đọc",
    views: "2.8k",
    likes: 680,
    comments: 45,
    tags: ["React", "Next.js"]
  },
  {
    id: 3,
    type: "qa",
    title: "[Hỏi đáp] Cấu hình Connection Pooling thế nào để tránh nghẽn khi deploy MongoDB lên Serverless?",
    summary: "Hệ thống của mình sử dụng Mongoose trên Vercel Functions thường xuyên bị dính lỗi max connections khi lượng requests tăng đột biến. Có cách nào tối ưu hóa bộ nhớ đệm kết nối không mọi người?",
    author: "Đức Trí",
    date: "3 ngày trước",
    time: "5 phút đọc",
    views: "640",
    likes: 95,
    comments: 18,
    tags: ["Node.js", "Docker"]
  },
  {
    id: 4,
    type: "experience",
    title: "Hành trình chuyển đổi từ Webpack sang Vite cho dự án React quy mô lớn",
    summary: "Đánh giá chi tiết về tốc độ Hot Module Replacement (HMR) và thời gian build production. Những lưu ý quan trọng về biến môi trường (env) và cấu hình alias khi di chuyển source code.",
    author: "Khánh An",
    date: "5 ngày trước",
    time: "8 phút đọc",
    views: "1.9k",
    likes: 310,
    comments: 14,
    tags: ["React", "Web Performance"]
  },
  {
    id: 5,
    type: "explanation",
    title: "Kiến trúc bảo mật API: Giải thích cơ chế hoạt động của OAuth2 và JWT",
    summary: "Phân biệt Access Token và Refresh Token. Cách lưu trữ token an toàn ở phía Client để chống lại các cuộc tấn công XSS và CSRF phổ biến trong ứng dụng Web hiện đại.",
    author: "Thanh Hà",
    date: "1 tuần trước",
    time: "12 phút đọc",
    views: "3.2k",
    likes: 740,
    comments: 52,
    tags: ["Security", "Laravel", "Node.js"]
  }
];

export default function ArticlesHub() {
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("latest");

  // Đồng bộ hóa trạng thái giao diện Next-Themes (Tránh lỗi Hydration Mismatch)
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  // 1. Logic lọc dữ liệu bài viết
  const filteredArticles = ARTICLES_DATA.filter(post => {
    const matchesType = selectedType === "all" || post.type === selectedType;
    const matchesTag = !activeTag || post.tags.includes(activeTag);
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesTag && matchesSearch;
  });

  // 2. Logic sắp xếp dữ liệu
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === "popular") return parseInt(b.views.replace("k", "000")) - parseInt(a.views.replace("k", "000"));
    return b.id - a.id;
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
                <MessageSquare className="w-4 h-4 sm:w-5 h-5 text-blue-600 dark:text-blue-500 flex-shrink-0" />
                <span>Diễn Đàn Tri Thức Công Nghệ</span>
              </h1>
              <p className={`text-[11px] sm:text-xs transition-colors ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Không gian thảo luận, giải thích thuật ngữ và chia sẻ kinh nghiệm thực chiến lập trình.
              </p>
            </div>
            
            {/* Hộp tìm kiếm cân xứng tương thích đa thiết bị */}
            <div className="relative w-full md:w-80 lg:w-[400px] min-w-0 flex-shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm bài viết, câu hỏi, từ khóa..."
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
        
        {/* SIDEBAR BỘ LỌC LUỒNG THÔNG TIN & TAGS */}
        <aside className="lg:col-span-3 w-full min-w-0 space-y-4 sm:space-y-6">
          
          {/* Phân loại luồng thông tin */}
          <div className={`rounded-2xl border p-3 sm:p-4 transition-colors duration-300 ${
            isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200/60"
          }`}>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block mb-2 px-1 text-slate-400 dark:text-slate-500">
              Phân loại luồng thông tin
            </span>
            <div className="flex flex-wrap lg:flex-col gap-1.5">
              {POST_TYPES.map((type) => {
                const IconComponent = type.icon;
                const isActive = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => { setSelectedType(type.id); setActiveTag(""); }}
                    className={`flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all w-full ${
                      isActive 
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/10 dark:shadow-none" 
                        : isDark
                          ? "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-white" : "text-blue-500"}`} />
                    <span className="truncate">{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Từ khóa thịnh hành */}
          <div className={`rounded-2xl border p-3 sm:p-4 transition-colors duration-300 ${
            isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200/60"
          }`}>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block mb-2 px-1 text-slate-400 dark:text-slate-500">
              Từ khóa thịnh hành
            </span>
            <div className="flex flex-wrap gap-1.5 p-0.5">
              {POPULAR_TAGS.map((tag) => {
                const isTagActive = activeTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(isTagActive ? "" : tag)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium border transition-all flex items-center gap-1 ${
                      isTagActive 
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm" 
                        : isDark
                          ? "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Tag className="w-3 h-3 opacity-60" />
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tiện ích ẩn trên di động */}
          <div className="hidden lg:block bg-gradient-to-br from-blue-600 to-sky-500 rounded-2xl p-5 text-white shadow-sm relative overflow-hidden border border-blue-700">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <Sparkles className="w-5 h-5 text-sky-200 mb-3" />
            <h4 className="font-bold text-sm mb-1">Cộng đồng mở rộng</h4>
            <p className="text-[11px] text-blue-100 leading-relaxed mb-4">Bạn gặp bài toán khó hay có mẹo xử lý source code hay? Hãy chia sẻ để nhận điểm uy tín từ hội đồng kỹ sư.</p>
            <button className="w-full py-2 bg-white text-blue-600 font-bold rounded-xl text-xs shadow-sm hover:bg-blue-50 transition-colors">
              Viết Bài Mới
            </button>
          </div>

        </aside>

        {/* DANH SÁCH BÀI VIẾT FEED-STYLE */}
        <section className="lg:col-span-9 space-y-3.5 w-full min-w-0">
          
          {/* Thanh số liệu kết quả */}
          <div className={`flex items-center justify-between text-[11px] sm:text-xs font-medium border px-3.5 py-2.5 rounded-xl relative w-full transition-colors duration-300 ${
            isDark ? "bg-slate-950 border-slate-900 text-slate-400" : "bg-white border-slate-200/60 text-slate-500"
          }`}>
            <div className="truncate">Hiển thị <span className="font-bold text-slate-800 dark:text-white">{sortedArticles.length}</span> bài thảo luận</div>
            
            <div className="relative flex-shrink-0">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`flex items-center gap-1 border px-2.5 py-1.5 rounded-lg font-semibold text-[11px] sm:text-xs transition-colors ${
                  isDark ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                <span>Sắp xếp: {sortBy === "latest" ? "Mới nhất" : "Xem nhiều nhất"}</span>
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
                      className={`absolute right-0 mt-1 w-40 border shadow-xl rounded-xl py-1 z-20 origin-top-right transition-colors ${
                        isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                      }`}
                    >
                      <button onClick={() => { setSortBy("latest"); setIsSortOpen(false); }} className={`w-full text-left px-3 py-1.5 text-[11px] ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Mới nhất</button>
                      <button onClick={() => { setSortBy("popular"); setIsSortOpen(false); }} className={`w-full text-left px-3 py-1.5 text-[11px] ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Xem nhiều nhất</button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* KHU VỰC THỂ HIỆN FEED BÀI VIẾT */}
          <div className="space-y-3.5 w-full">
            <AnimatePresence mode="popLayout">
              {sortedArticles.map((post) => (
                <motion.div
                  layout
                  key={post.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className={`border rounded-2xl p-4 sm:p-6 flex flex-col justify-between transition-all w-full min-w-0 group ${
                    isDark 
                      ? "bg-slate-950 border-slate-900 hover:border-slate-800" 
                      : "bg-white border-slate-200 hover:border-blue-200"
                  }`}
                >
                  <div className="min-w-0">
                    {/* Hàng thông tin trên cùng */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-bold text-[10px] flex items-center justify-center border border-blue-100 dark:border-slate-800 flex-shrink-0">
                          {post.author.charAt(0)}
                        </div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[100px] sm:max-w-none">{post.author}</span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="whitespace-nowrap">{post.date}</span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="flex items-center gap-1 whitespace-nowrap"><Clock className="w-3 h-3" /> {post.time}</span>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0 ${
                        post.type === "experience" ? "bg-purple-50 text-purple-600 border border-purple-100 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/30" :
                        post.type === "explanation" ? "bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/30" :
                        "bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/30"
                      }`}>
                        {post.type === "experience" ? "Kinh nghiệm" : post.type === "explanation" ? "Giải thích" : "Hỏi đáp"}
                      </span>
                    </div>

                    {/* Tiêu đề */}
                    <h3 className={`font-bold text-sm sm:text-base transition-colors leading-snug mb-2 ${isDark ? "text-white group-hover:text-blue-400" : "text-slate-800 group-hover:text-blue-600"}`}>
                      {post.title}
                    </h3>

                    {/* Tóm tắt */}
                    <p className={`text-xs leading-relaxed mb-4 text-justify line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {post.summary}
                    </p>
                  </div>

                  {/* Phần chân bài viết */}
                  <div className={`pt-4 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full min-w-0 ${isDark ? "border-slate-900" : "border-slate-100"}`}>
                    <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                      {post.tags.map((tag, i) => (
                        <span key={i} className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${
                          isDark ? "text-slate-400 bg-slate-900 border-slate-800/80" : "text-slate-500 bg-slate-50 border-slate-100"
                        }`}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Tương tác số liệu */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 text-slate-400 dark:text-slate-500 text-[11px] font-medium flex-shrink-0 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-900">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 hover:text-blue-500 cursor-pointer"><ThumbsUp className="w-3.5 h-3.5" /> {post.likes}</span>
                        <span className="flex items-center gap-1 hover:text-blue-500 cursor-pointer"><MessageCircle className="w-3.5 h-3.5" /> {post.comments}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {post.views}</span>
                      </div>

                      <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4">
                        <button className="p-1 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 rounded transition-colors">
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                        <button className="text-blue-600 dark:text-blue-400 text-[11px] font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform whitespace-nowrap">
                          Đọc tiếp <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* TRẠNG THÁI TRỐNG */}
          {sortedArticles.length === 0 && (
            <div className={`text-center py-16 border border-dashed rounded-3xl space-y-3 w-full ${
              isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200"
            }`}>
              <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 mx-auto">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">Không tìm thấy bài viết nào</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto px-4">Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục luồng thông tin khác.</p>
            </div>
          )}

          {/* PHÂN TRANG */}
          {sortedArticles.length > 0 && (
            <div className="flex items-center justify-center pt-2">
              <button className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all w-full sm:w-auto shadow-sm ${
                isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300" : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
              }`}>
                Tải Thêm Bài Viết
              </button>
            </div>
          )}

        </section>
      </main>

    </div>
  );
}