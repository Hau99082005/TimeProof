"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { 
  Search, 
  FolderGit2, 
  ShoppingCart, 
  Building2, 
  Cpu, 
  Globe, 
  GraduationCap, 
  ChevronDown, 
  Download, 
  Eye, 
  X, 
  Grid, 
  Tag, 
  GitBranch, 
  FileText,
  Trophy
} from "lucide-react";

// --- Danh mục phân loại Đồ án ---
const CATEGORIES = [
  { id: "all", name: "Tất cả đồ án", icon: Grid },
  { id: "ecommerce", name: "Thương mại điện tử", icon: ShoppingCart },
  { id: "management", name: "Hệ thống quản lý", icon: Building2 },
  { id: "social", name: "Mạng xã hội & Chat", icon: Globe },
  { id: "ai", name: "Tích hợp AI & Dữ liệu", icon: Cpu },
];

// --- Danh sách Công nghệ phổ biến ---
const TECH_TAGS = ["React", "Next.js", "Node.js", "Laravel", "PHP", "MongoDB", "MySQL", "Python"];

// --- Dữ liệu danh sách Đồ án mẫu ---
const PROJECTS_DATA = [
  {
    id: 1,
    title: "Xây dựng Website Tìm kiếm và Cho thuê Căn hộ - Nhà trọ",
    category: "ecommerce",
    author: "Nguyễn Minh Quân",
    university: "ĐH Khoa học Tự nhiên",
    score: "9.5/10",
    downloads: 1240,
    views: "3.2k",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    desc: "Hệ thống kết nối người thuê và chủ trọ. Tích hợp bản đồ số hóa tìm kiếm theo bán kính, chat real-time và thanh toán VNPay. Báo cáo chi tiết kèm sơ đồ phân thiết kế hệ thống (UML) bám sát các yêu cầu thực tế kiểm soát truy cập và bảo mật vai trò Lessor.",
    gradient: "from-blue-600 to-sky-500"
  },
  {
    id: 2,
    title: "Hệ thống Quản lý Bệnh viện và Đặt lịch khám trực tuyến",
    category: "management",
    author: "Trần Hoàng Nam",
    university: "ĐH Công nghệ Thông tin",
    score: "9.2/10",
    downloads: 850,
    views: "2.1k",
    tags: ["Laravel", "MySQL", "Vue.js", "Redis"],
    desc: "Đồ án mô phỏng quy trình đặt khám, quản lý hồ sơ bệnh án điện tử và phân ca trực cho bác sĩ. Hệ thống xử lý hàng đợi (Queue) chống quá tải khi đăng ký giờ vàng.",
    gradient: "from-emerald-600 to-teal-500"
  },
  {
    id: 3,
    title: "Mạng xã hội chia sẻ hành trình Du lịch (Travelog)",
    category: "social",
    author: "Lê Ngọc Hân",
    university: "ĐH Bách Khoa",
    score: "9.0/10",
    downloads: 620,
    views: "1.8k",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    desc: "Nền tảng mạng xã hội thu nhỏ cho phép người dùng đăng bài viết, chia sẻ hình ảnh, thả tim và bình luận. Tích hợp thuật toán gợi ý bài viết dựa trên thẻ tag.",
    gradient: "from-purple-600 to-pink-500"
  },
  {
    id: 4,
    title: "Website E-Learning có tích hợp AI chấm điểm lập trình",
    category: "ai",
    author: "Phạm Đức Trí",
    university: "Học viện Bưu chính Viễn thông",
    score: "9.8/10",
    downloads: 1530,
    views: "4.5k",
    tags: ["Python", "FastAPI", "React", "Docker"],
    desc: "Nền tảng học trực tuyến hỗ trợ compiler code online. Sử dụng AI để phân tích mã nguồn của sinh viên và đưa ra gợi ý tối ưu. Kiến trúc Microservices chạy trên Docker.",
    gradient: "from-slate-900 to-slate-700"
  },
  {
    id: 5,
    title: "Hệ thống ERP Quản lý Kho hàng và Chuỗi cung ứng",
    category: "management",
    author: "Vũ Thanh Hà",
    university: "ĐH Sư phạm Kỹ thuật",
    score: "8.9/10",
    downloads: 410,
    views: "1.2k",
    tags: ["PHP", "MySQL", "Bootstrap"],
    desc: "Đồ án kinh điển với đầy đủ nghiệp vụ xuất/nhập kho, kiểm kê, báo cáo doanh thu biểu đồ và xuất file Excel/PDF. Mã nguồn thuần cấu trúc MVC dễ dàng học tập.",
    gradient: "from-amber-600 to-orange-500"
  }
];

export default function ProjectsHub() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTech, setActiveTech] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("downloads");

  // Xử lý vòng đời tránh lỗi Hydration của Next.js khi đồng bộ hóa giao diện tối với next-themes
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  const filteredProjects = PROJECTS_DATA.filter(project => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesTech = !activeTech || project.tags.includes(activeTech);
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTech && matchesSearch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "downloads") return b.downloads - a.downloads;
    if (sortBy === "score") return parseFloat(b.score) - parseFloat(a.score);
    return b.id - a.id;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased w-full overflow-x-hidden ${
      isDark ? "bg-black text-slate-100" : "bg-slate-50 text-slate-900"
    }`}>
      
      {/* ─── PHẦN ĐẦU TRANG CÂN ĐỐI TRỤC DỌC (ĐÃ SỬA LỖI TRÀN CHÈN NỘI DUNG) ─── */}
      <div className={`border-b relative z-10 transition-colors duration-300 w-full ${
        isDark ? "bg-black border-slate-900" : "bg-white border-slate-200/80"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
            
            <div className="min-w-0 space-y-1">
              <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 sm:w-5 h-5 text-blue-600 dark:text-blue-500 flex-shrink-0" />
                <span>Kho Đồ Án Kỹ Thuật Phần Mềm</span>
              </h1>
              <p className={`text-[11px] sm:text-xs transition-colors ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Tải mã nguồn mở, báo cáo thesis và tham khảo kiến trúc hệ thống thực tế.
              </p>
            </div>
            
            {/* Hộp tìm kiếm cân xứng tương thích đa thiết bị */}
            <div className="relative w-full md:w-80 lg:w-[400px] min-w-0 flex-shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm tên đồ án, nghiệp vụ hệ thống..."
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

      {/* BỐ CỤC KHÔNG GIAN NÀM VIỆC CHÍNH */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 w-full">
        
        {/* SIDEBAR BỘ LỌC NGÔN NGỮ & NGHIỆP VỤ */}
        <aside className="lg:col-span-3 w-full min-w-0 space-y-4 sm:space-y-6">
          
          {/* Nghiệp vụ hệ thống */}
          <div className={`rounded-2xl border p-3 sm:p-4 transition-colors duration-300 ${
            isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200/60"
          }`}>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block mb-2 px-1 text-slate-400 dark:text-slate-500">
              Nghiệp vụ hệ thống
            </span>
            <div className="flex flex-wrap lg:flex-col gap-1.5">
              {CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setActiveTech(""); }}
                    className={`flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all w-full ${
                      isActive 
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/10 dark:shadow-none" 
                        : isDark
                          ? "bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white"
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

          {/* Công nghệ cốt lõi */}
          <div className={`rounded-2xl border p-3 sm:p-4 transition-colors duration-300 ${
            isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200/60"
          }`}>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block mb-2 px-1 text-slate-400 dark:text-slate-500">
              Công nghệ cốt lõi
            </span>
            <div className="flex flex-wrap gap-1.5 p-0.5">
              {TECH_TAGS.map((tech) => {
                const isTechActive = activeTech === tech;
                return (
                  <button
                    key={tech}
                    onClick={() => setActiveTech(isTechActive ? "" : tech)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium border transition-all flex items-center gap-1 ${
                      isTechActive 
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm" 
                        : isDark
                          ? "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Tag className="w-3 h-3 opacity-60" />
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Banner quảng cáo phụ ẩn trên mobile */}
          <div className="hidden lg:block bg-gradient-to-br from-indigo-600 to-blue-500 rounded-2xl p-5 text-white shadow-sm relative overflow-hidden border border-indigo-700">
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <GraduationCap className="w-5 h-5 text-indigo-200 mb-3" />
            <h4 className="font-bold text-sm mb-1">Chia sẻ đồ án của bạn</h4>
            <p className="text-[11px] text-blue-100 leading-relaxed mb-4">Đóng góp mã nguồn và báo cáo tốt nghiệp của bạn để giúp đỡ cộng đồng sinh viên khóa sau.</p>
            <button className="w-full py-2 bg-white text-indigo-600 font-bold rounded-xl text-xs shadow-sm hover:bg-blue-50 transition-colors">
              Đăng tải Đồ án
            </button>
          </div>
        </aside>

        {/* NƠI HIỂN THỊ DANH SÁCH ĐỒ ÁN */}
        <section className="lg:col-span-9 space-y-3.5 w-full min-w-0">
          
          {/* Thanh số liệu kết quả */}
          <div className={`flex items-center justify-between text-[11px] sm:text-xs font-medium border px-3.5 py-2.5 rounded-xl relative w-full transition-colors duration-300 ${
            isDark ? "bg-slate-950 border-slate-900 text-slate-400" : "bg-white border-slate-200/60 text-slate-500"
          }`}>
            <div className="truncate">Tìm thấy <span className="font-bold text-slate-800 dark:text-white">{sortedProjects.length}</span> đồ án mẫu</div>
            
            <div className="relative flex-shrink-0">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`flex items-center gap-1 border px-2.5 py-1.5 rounded-lg font-semibold text-[11px] sm:text-xs transition-colors ${
                  isDark ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                <span>Sắp xếp: {sortBy === "downloads" ? "Tải nhiều nhất" : sortBy === "score" ? "Điểm cao nhất" : "Mới nhất"}</span>
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
                      <button onClick={() => { setSortBy("downloads"); setIsSortOpen(false); }} className={`w-full text-left px-3 py-1.5 text-[11px] ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Tải nhiều nhất</button>
                      <button onClick={() => { setSortBy("score"); setIsSortOpen(false); }} className={`w-full text-left px-3 py-1.5 text-[11px] ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Điểm cao nhất</button>
                      <button onClick={() => { setSortBy("newest"); setIsSortOpen(false); }} className={`w-full text-left px-3 py-1.5 text-[11px] ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Mới nhất</button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* LƯỚI GRID HIỂN THỊ DANH SÁCH CARD ĐỒ ÁN */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 w-full">
            <AnimatePresence mode="popLayout">
              {sortedProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className={`border rounded-2xl overflow-hidden transition-all w-full min-w-0 flex flex-col justify-between group ${
                    isDark 
                      ? "bg-slate-950 border-slate-900 hover:border-slate-800" 
                      : "bg-white border-slate-200 hover:border-blue-200"
                  }`}
                >
                  <div className="min-w-0">
                    {/* Phần đồ họa Gradient của thẻ */}
                    <div className={`h-36 w-full bg-gradient-to-br ${project.gradient} p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3" />
                      
                      <div className="flex justify-between items-start w-full relative z-10">
                        <span className="px-2.5 py-0.5 text-[10px] font-bold text-slate-800 bg-white/90 backdrop-blur-sm rounded uppercase tracking-wide">
                          {project.category === "ecommerce" ? "TMĐT" : 
                           project.category === "management" ? "Hệ thống" : 
                           project.category === "social" ? "Mạng xã hội" : "AI"}
                        </span>
                        <div className="flex items-center gap-1 text-white bg-black/20 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold border border-white/10">
                          <Trophy className="w-3 h-3 text-amber-300" /> {project.score}
                        </div>
                      </div>

                      <div className="relative z-10 text-white/90 text-[10px] flex items-center gap-2 font-medium">
                        <span className="truncate max-w-[110px]">{project.author}</span>
                        <span className="w-1 h-1 rounded-full bg-white/50" />
                        <span className="truncate">{project.university}</span>
                      </div>
                    </div>

                    {/* Tiêu đề & Nội dung mô tả ngắn */}
                    <div className="p-4 sm:p-5">
                      <h3 className={`font-bold text-sm transition-colors leading-snug mb-3 line-clamp-2 ${isDark ? "text-white group-hover:text-blue-400" : "text-slate-800 group-hover:text-blue-600"}`}>
                        {project.title}
                      </h3>
                      <p className={`text-[11px] sm:text-xs line-clamp-3 leading-relaxed text-justify ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        {project.desc}
                      </p>
                    </div>
                  </div>

                  {/* Chân thẻ chứa Nhãn công nghệ & Phím hành động */}
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <div className={`flex flex-wrap gap-1.5 mb-5 border-t pt-4 ${isDark ? "border-slate-900" : "border-slate-100"}`}>
                      {project.tags.map((tag, i) => (
                        <span key={i} className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${
                          isDark ? "text-slate-400 bg-slate-900 border-slate-800/80" : "text-slate-600 bg-slate-50 border-slate-100"
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px] text-slate-400 font-medium flex-shrink-0">
                        <span className="flex items-center gap-0.5" title="Lượt tải về"><Download className="w-3.5 h-3.5" /> {project.downloads}</span>
                        <span className="flex items-center gap-0.5" title="Lượt xem"><Eye className="w-3.5 h-3.5" /> {project.views}</span>
                      </div>

                      <div className="flex items-center gap-2 justify-end flex-1">
                        <button className={`p-2 border rounded-lg transition-colors flex items-center justify-center min-w-[34px] min-h-[36px] ${
                          isDark ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-slate-50 border-slate-200 text-slate-500 hover:text-blue-600"
                        }`} title="Tải báo cáo Word/PDF">
                          <FileText className="w-4 h-4" />
                        </button>
                        <button className={`inline-flex items-center justify-center gap-1.5 text-[11px] font-bold py-2 px-3 rounded-lg transition-all duration-200 min-h-[36px] ${
                          isDark ? "bg-slate-100 text-slate-900 hover:bg-slate-200" : "bg-slate-900 text-white hover:bg-slate-800"
                        }`}>
                          <GitBranch className="w-3.5 h-3.5" /> Source Code
                        </button>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* TRẠNG THÁI TRỐNG (KHI KHÔNG CÓ KẾT QUẢ PHÙ HỢP) */}
          {sortedProjects.length === 0 && (
            <div className={`text-center py-16 border border-dashed rounded-3xl space-y-3 w-full ${
              isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200"
            }`}>
              <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 mx-auto">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">Không tìm thấy đồ án phù hợp</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto px-4">Vui lòng thay đổi từ khóa tìm kiếm hoặc chọn công nghệ khác trong bộ lọc.</p>
            </div>
          )}

          {/* PHÂN TRANG */}
          {sortedProjects.length > 0 && (
            <div className="flex items-center justify-center pt-2">
              <button className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all w-full sm:w-auto shadow-sm ${
                isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300" : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
              }`}>
                Tải Thêm Đồ Án
              </button>
            </div>
          )}

        </section>
      </main>

    </div>
  );
}