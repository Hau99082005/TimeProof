"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  GitBranch, // Đã thay Github -> GitBranch
  ExternalLink,
  FileText,
  Trophy,
  ArrowUpRight
} from "lucide-react";

// --- Danh mục phân loại Đồ án ---
const CATEGORIES = [
  { id: "all", name: "Tất cả đồ án", icon: Grid },
  { id: "ecommerce", name: "Thương mại điện tử", icon: ShoppingCart },
  { id: "management", name: "Hệ thống quản lý (ERP/CRM)", icon: Building2 },
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
    desc: "Hệ thống kết nối người thuê và chủ trọ. Tích hợp bản đồ số hóa tìm kiếm theo bán kính, chat real-time và thanh toán VNPay. Báo cáo chi tiết kèm sơ đồ phân tích thiết kế hệ thống (UML).",
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 backdrop-blur-md bg-white/80">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-blue-600" />
                Kho Đồ Án Kỹ Thuật Phần Mềm
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Tải mã nguồn mở, báo cáo thesis và tham khảo kiến trúc hệ thống thực tế.</p>
            </div>
            
            <div className="relative flex-1 max-w-xl md:ml-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm tên đồ án, nghiệp vụ hệ thống (e.g. Quản lý kho, Chatbot)..."
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

      <main className="container mx-auto px-6 py-8 grid lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-3">Nghiệp vụ hệ thống</span>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setActiveTech(""); }}
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
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-3">Công nghệ cốt lõi</span>
            <div className="flex flex-wrap gap-1.5 p-1">
              {TECH_TAGS.map((tech) => {
                const isTechActive = activeTech === tech;
                return (
                  <button
                    key={tech}
                    onClick={() => setActiveTech(isTechActive ? "" : tech)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1 ${
                      isTechActive 
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm" 
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

          <div className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <GraduationCap className="w-5 h-5 text-indigo-200 mb-3" />
            <h4 className="font-bold text-sm mb-1">Chia sẻ đồ án của bạn</h4>
            <p className="text-[11px] text-blue-100 leading-relaxed mb-4">Đóng góp mã nguồn và báo cáo tốt nghiệp của bạn để giúp đỡ cộng đồng sinh viên khóa sau.</p>
            <button className="w-full py-2 bg-white text-indigo-600 font-bold rounded-xl text-xs shadow-sm hover:bg-blue-50 transition-colors">
              Đăng tải Đồ án
            </button>
          </div>
        </aside>

        <section className="lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 bg-white border border-slate-200/60 px-4 py-3 rounded-xl relative">
            <div>Tìm thấy <span className="font-bold text-slate-800">{sortedProjects.length}</span> đồ án mẫu</div>
            
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg text-slate-700 font-semibold transition-all duration-150"
              >
                Sắp xếp: {sortBy === "downloads" ? "Tải nhiều nhất" : sortBy === "score" ? "Điểm cao nhất" : "Mới nhất"}
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
                      className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 shadow-xl rounded-xl py-1.5 z-20 origin-top-right"
                    >
                      <button
                        onClick={() => { setSortBy("downloads"); setIsSortOpen(false); }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${
                          sortBy === "downloads" ? "text-blue-600 bg-blue-50/40 font-bold" : "text-slate-600"
                        }`}
                      >
                        Tải nhiều nhất
                      </button>
                      <button
                        onClick={() => { setSortBy("score"); setIsSortOpen(false); }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${
                          sortBy === "score" ? "text-blue-600 bg-blue-50/40 font-bold" : "text-slate-600"
                        }`}
                      >
                        Điểm cao nhất
                      </button>
                      <button
                        onClick={() => { setSortBy("newest"); setIsSortOpen(false); }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${
                          sortBy === "newest" ? "text-blue-600 bg-blue-50/40 font-bold" : "text-slate-600"
                        }`}
                      >
                        Mới nhất
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {sortedProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-900/[0.03] hover:border-blue-200/60 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className={`h-36 w-full bg-gradient-to-br ${project.gradient} p-5 flex flex-col justify-between relative overflow-hidden`}>
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
                        <span className="truncate max-w-[120px]">{project.author}</span>
                        <span className="w-1 h-1 rounded-full bg-white/50" />
                        <span className="truncate">{project.university}</span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors leading-snug mb-3 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                        {project.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5">
                    <div className="flex flex-wrap gap-1.5 mb-5 border-t border-slate-100 pt-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-mono font-medium text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                        <span className="flex items-center gap-1" title="Lượt tải về"><Download className="w-3.5 h-3.5" /> {project.downloads}</span>
                        <span className="flex items-center gap-1" title="Lượt xem"><Eye className="w-3.5 h-3.5" /> {project.views}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-500 bg-slate-50 border border-slate-200 rounded-lg hover:text-blue-600 hover:border-blue-200 transition-colors" title="Tải báo cáo Word/PDF">
                          <FileText className="w-4 h-4" />
                        </button>
                        <button className="inline-flex items-center gap-1.5 text-[11px] font-bold py-2 px-3 bg-slate-900 border border-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-200">
                          {/* Đã thay đổi icon tại đây */}
                          <GitBranch className="w-3.5 h-3.5" /> Source Code
                        </button>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>

            {sortedProjects.length === 0 && (
              <div className="col-span-2 text-center py-16 bg-white border border-dashed border-slate-200 rounded-3xl space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-700">Không tìm thấy đồ án phù hợp</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">Vui lòng thay đổi từ khóa tìm kiếm hoặc chọn công nghệ khác trong bộ lọc.</p>
              </div>
            )}
          </div>

          {sortedProjects.length > 0 && (
            <div className="flex items-center justify-center pt-4">
              <button className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-xs font-bold text-slate-700 transition-colors shadow-sm">
                Tải Thêm Đồ Án
              </button>
            </div>
          )}

        </section>
      </main>
    </div>
  );
}