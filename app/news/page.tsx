"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  CheckCircle,
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
  const [sortBy, setSortBy] = useState("latest"); // "latest" | "popular"

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* HEADER ỨNG DỤNG TINH GỌN */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 backdrop-blur-md bg-white/80">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Diễn Đàn Tri Thức Công Nghệ
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Không gian thảo luận, giải thích thuật ngữ và chia sẻ kinh nghiệm thực chiến lập trình.</p>
            </div>
            
            {/* Thanh tìm kiếm */}
            <div className="relative flex-1 max-w-xl md:ml-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm bài viết, câu hỏi phỏng vấn, kinh nghiệm làm đồ án..."
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

      {/* BỐ CỤC KHÔNG GIAN HAI CỘT */}
      <main className="container mx-auto px-6 py-8 grid lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR LỌC DANH MỤC (CỘT TRÁI) */}
        <aside className="lg:col-span-3 space-y-6">
          
          {/* Nhóm Bộ Lọc Loại Bài Viết */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-3">Phân loại luồng thông tin</span>
            <div className="space-y-1">
              {POST_TYPES.map((type) => {
                const IconComponent = type.icon;
                const isActive = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => { setSelectedType(type.id); setActiveTag(""); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive 
                        ? "bg-blue-50 text-blue-600 shadow-sm" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                    {type.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nhóm Thẻ Tags Phổ Biến */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-3">Từ khóa thịnh hành</span>
            <div className="flex flex-wrap gap-1.5 p-1">
              {POPULAR_TAGS.map((tag) => {
                const isTagActive = activeTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(isTagActive ? "" : tag)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1 ${
                      isTagActive 
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm" 
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

          {/* Tiện ích đóng góp thảo luận */}
          <div className="bg-gradient-to-br from-blue-600 to-sky-500 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <Sparkles className="w-5 h-5 text-sky-200 mb-3" />
            <h4 className="font-bold text-sm mb-1">Cộng đồng mở rộng</h4>
            <p className="text-[11px] text-blue-100 leading-relaxed mb-4">Bạn gặp bài toán khó hay có mẹo xử lý source code hay? Hãy chia sẻ để nhận điểm uy tín từ hội đồng kỹ sư.</p>
            <button className="w-full py-2 bg-white text-blue-600 font-bold rounded-xl text-xs shadow-sm hover:bg-blue-50 transition-colors">
              Viết Bài Mới
            </button>
          </div>

        </aside>

        {/* DANH SÁCH BÀI VIẾT FEED-STYLE (CỘT PHẢI) */}
        <section className="lg:col-span-9 space-y-4">
          
          {/* THANH ĐIỀU KHIỂN SẮP XẾP */}
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 bg-white border border-slate-200/60 px-4 py-3 rounded-xl relative">
            <div>Hiển thị <span className="font-bold text-slate-800">{sortedArticles.length}</span> bài thảo luận</div>
            
            {/* Vùng Dropdown Sắp xếp */}
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg text-slate-700 font-semibold transition-all duration-150"
              >
                Sắp xếp: {sortBy === "latest" ? "Mới nhất" : "Xem nhiều nhất"}
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
                        onClick={() => { setSortBy("latest"); setIsSortOpen(false); }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${
                          sortBy === "latest" ? "text-blue-600 bg-blue-50/40 font-bold" : "text-slate-600"
                        }`}
                      >
                        Mới nhất
                      </button>
                      <button
                        onClick={() => { setSortBy("popular"); setIsSortOpen(false); }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${
                          sortBy === "popular" ? "text-blue-600 bg-blue-50/40 font-bold" : "text-slate-600"
                        }`}
                      >
                        Xem nhiều nhất
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* DANH SÁCH BÀI VIẾT THỰC TẾ */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {sortedArticles.map((post) => (
                <motion.div
                  layout
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-slate-200/60 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-900/[0.01] hover:border-blue-200/50 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Hàng thông tin trên cùng: Tác giả, Thời gian, Loại bài viết */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 font-bold text-[10px] flex items-center justify-center border border-blue-100">
                          {post.author.charAt(0)}
                        </div>
                        <span className="font-semibold text-slate-700">{post.author}</span>
                        <span className="text-slate-300">•</span>
                        <span>{post.date}</span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                      </div>

                      {/* Loại Badge phân hệ */}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        post.type === "experience" ? "bg-purple-50 text-purple-600 border border-purple-100" :
                        post.type === "explanation" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                        "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}>
                        {post.type === "experience" ? "Kinh nghiệm" : post.type === "explanation" ? "Giải thích" : "Hỏi đáp"}
                      </span>
                    </div>

                    {/* Tiêu đề thảo luận */}
                    <h3 className="font-bold text-base text-slate-800 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                      {post.title}
                    </h3>

                    {/* Tóm tắt ngắn nội dung bài viết */}
                    <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                      {post.summary}
                    </p>
                  </div>

                  {/* Phần chân bài viết chứa Thẻ tags kỹ thuật và Tương tác số liệu */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-medium font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Thống kê tương tác: Thích, Xem, Bình luận */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 text-slate-400 text-[11px] font-medium">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer"><ThumbsUp className="w-3.5 h-3.5" /> {post.likes}</span>
                        <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer"><MessageCircle className="w-3.5 h-3.5" /> {post.comments}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {post.views}</span>
                      </div>

                      <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
                        <button className="p-1 text-slate-400 hover:text-blue-600 rounded transition-colors">
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                        <button className="text-blue-600 text-[11px] font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                          Đọc tiếp <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>

            {/* Trạng thái rỗng khi tìm kiếm không ra kết quả */}
            {sortedArticles.length === 0 && (
              <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-3xl space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto">
                  <Search className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-700">Không tìm thấy bài viết nào</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">Thử đổi từ khóa tìm kiếm hoặc bấm vào bộ lọc danh mục bên trái để làm mới luồng dữ liệu.</p>
              </div>
            )}
          </div>

          {/* PHÂN TRANG */}
          {sortedArticles.length > 0 && (
            <div className="flex items-center justify-center pt-4">
              <button className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-xs font-bold text-slate-700 transition-colors shadow-sm">
                Tải Thêm Bài Viết
              </button>
            </div>
          )}

        </section>
      </main>

    </div>
  );
}