"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  BookOpen, 
  Code2, 
  Terminal, 
  Layers, 
  Cpu, 
  Cloud, 
  ChevronDown, 
  Clock, 
  GraduationCap, 
  PlayCircle, 
  Sparkles, 
  X, 
  Grid,
  Bookmark,
  Award,
  SlidersHorizontal
} from "lucide-react";

// --- Danh mục phân loại chuyên ngành ---
const CATEGORIES = [
  { id: "all", name: "Tất cả công nghệ", icon: Grid },
  { id: "frontend", name: "Frontend Development", icon: Code2 },
  { id: "backend", name: "Backend & APIs", icon: Terminal },
  { id: "fullstack", name: "Fullstack Engineering", icon: Layers },
  { id: "devops", name: "DevOps & Cloud", icon: Cloud },
  { id: "ai", name: "AI Web Integration", icon: Cpu },
];

// --- Dữ liệu danh sách khóa học công nghệ mẫu ---
const COURSES_DATA = [
  {
    id: 1,
    title: "Lập trình Next.js 14 & React Nâng Cao toàn diện",
    category: "frontend",
    level: "Nâng cao",
    duration: "24 giờ học",
    lessons: "48 bài giảng",
    rating: 4.9,
    students: "1,240",
    tags: ["Next.js", "React", "TypeScript"],
    desc: "Làm chủ App Router, Server Components, tối ưu hóa SEO và cơ chế Server Actions để xây dựng ứng dụng web tốc độ cao chuẩn production.",
    gradient: "from-blue-600 to-sky-400"
  },
  {
    id: 2,
    title: "Xây dựng RESTful APIs & Microservices với Laravel v11",
    category: "backend",
    level: "Trung bình",
    duration: "20 giờ học",
    lessons: "38 bài giảng",
    rating: 4.8,
    students: "950",
    tags: ["Laravel", "PHP", "Microservices"],
    desc: "Thiết kế kiến trúc backend mở rộng, phân quyền nâng cao, tối ưu hóa truy vấn cơ sở dữ liệu và tích hợp hàng đợi (Queue Processing).",
    gradient: "from-red-600 to-orange-500"
  },
  {
    id: 3,
    title: "Chinh phục MERN Stack Toàn diện cho dự án thực tế",
    category: "fullstack",
    level: "Trung bình",
    duration: "36 giờ học",
    lessons: "64 bài giảng",
    rating: 4.7,
    students: "2,100",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    desc: "Học từ con số 0 đến khi làm chủ toàn bộ hệ sinh thái JavaScript Fullstack. Xây dựng trọn vẹn hệ thống quản lý phân quyền và real-time chat.",
    gradient: "from-emerald-600 to-teal-500"
  },
  {
    id: 4,
    title: "CI/CD Pipeline & Đóng gói ứng dụng với Docker & Kubernetes",
    category: "devops",
    level: "Nâng cao",
    duration: "18 giờ học",
    lessons: "30 bài giảng",
    rating: 4.9,
    students: "780",
    tags: ["Docker", "Kubernetes", "DevOps"],
    desc: "Chuẩn hóa môi trường phát triển cục bộ và tự động hóa quy trình triển khai ứng dụng lên các hạ tầng đám mây lớn an toàn.",
    gradient: "from-slate-900 to-slate-700"
  },
  {
    id: 5,
    title: "Tích hợp Generative AI và LLMs vào ứng dụng Web",
    category: "ai",
    level: "Chuyên gia",
    duration: "15 giờ học",
    lessons: "25 bài giảng",
    rating: 4.9,
    students: "620",
    tags: ["OpenAI API", "Python", "FastAPI"],
    desc: "Kỹ thuật tối ưu Prompting, tích hợp mô hình ngôn ngữ lớn (LLM), xử lý luồng dữ liệu trả về (Streaming) thời gian thực trên giao diện web.",
    gradient: "from-indigo-600 to-purple-500"
  },
  {
    id: 6,
    title: "Tối ưu hóa Hiệu năng Frontend & Kỹ thuật SEO chuyên sâu",
    category: "frontend",
    level: "Cơ bản",
    duration: "12 giờ học",
    lessons: "20 bài giảng",
    rating: 4.6,
    students: "1,450",
    tags: ["Vite", "Web Performance", "SEO"],
    desc: "Cải thiện chỉ số Core Web Vitals, cấu hình bộ nhớ đệm, thu gọn kích thước bundle code giúp trang web đạt điểm tuyệt đối trên Lighthouse.",
    gradient: "from-cyan-600 to-blue-500"
  }
];

export default function CoursesExplorer() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("popular"); // "popular" | "newest"

  // 1. Logic lọc dữ liệu khóa học
  const filteredCourses = COURSES_DATA.filter(course => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "Tất cả" || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesLevel && matchesSearch;
  });

  // 2. Logic sắp xếp dữ liệu
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "popular") return parseInt(b.students.replace(",", "")) - parseInt(a.students.replace(",", ""));
    return b.id - a.id; // Mới nhất lên đầu
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* HEADER TÌM KIẾM APP-STYLE */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 backdrop-blur-md bg-white/80">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Học Công Nghệ Mới
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Khám phá các khóa học công nghệ web hiện đại, thực chiến và bài bản.</p>
            </div>
            
            {/* Thanh tìm kiếm khóa học */}
            <div className="relative flex-1 max-w-xl md:ml-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm khóa học, framework hoặc từ khóa kỹ thuật (e.g. Next.js, Docker)..."
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

      {/* BỐ CỤC CHÍNH DASHBOARD */}
      <main className="container mx-auto px-6 py-8 grid lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR BỘ LỌC (CỘT TRÁI) */}
        <aside className="lg:col-span-3 space-y-6">
          
          {/* Lọc theo Chuyên Ngành */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-3">Phân hệ công nghệ</span>
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

          {/* Lọc theo Trình Độ */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-3">Trình độ lập trình</span>
            <div className="flex flex-wrap gap-2">
              {["Tất cả", "Cơ bản", "Trung bình", "Nâng cao", "Chuyên gia"].map((lvl) => {
                const isSelected = selectedLevel === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isSelected 
                        ? "bg-slate-900 text-white" 
                        : "bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100"
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Banner Cam kết Chất lượng */}
          <div className="bg-gradient-to-br from-blue-600 to-sky-500 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <Award className="w-5 h-5 text-sky-200 mb-3" />
            <h4 className="font-bold text-sm mb-1">Cấp Chứng Nhận</h4>
            <p className="text-[11px] text-blue-100 leading-relaxed mb-4">Hoàn thành các bài lab thực hành và đồ án cuối khóa để nhận chứng nhận kỹ sư đạt chuẩn từ TimeProof.</p>
            <div className="text-xs bg-white/10 py-1.5 px-3 rounded-lg font-mono inline-block">Project-based Learning</div>
          </div>

        </aside>

        {/* DANH SÁCH KHÓA HỌC (CỘT PHẢI) */}
        <section className="lg:col-span-9 space-y-6">
          
          {/* THANH ĐIỀU KHIỂN & DROPDOWN SẮP XẾP */}
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 bg-white border border-slate-200/60 px-4 py-3 rounded-xl relative">
            <div>Tìm thấy <span className="font-bold text-slate-800">{sortedCourses.length}</span> khóa học phù hợp</div>
            
            {/* Menu Sắp xếp */}
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg text-slate-700 font-semibold transition-all duration-150"
              >
                Sắp xếp: {sortBy === "popular" ? "Phổ biến nhất" : "Mới cập nhật"}
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
                        onClick={() => { setSortBy("popular"); setIsSortOpen(false); }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${
                          sortBy === "popular" ? "text-blue-600 bg-blue-50/40 font-bold" : "text-slate-600"
                        }`}
                      >
                        Phổ biến nhất
                      </button>
                      <button
                        onClick={() => { setSortBy("newest"); setIsSortOpen(false); }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${
                          sortBy === "newest" ? "text-blue-600 bg-blue-50/40 font-bold" : "text-slate-600"
                        }`}
                      >
                        Mới cập nhật
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* LƯỚI HIỂN THỊ KHÓA HỌC */}
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {sortedCourses.map((course) => (
                <motion.div
                  layout
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900/[0.03] hover:border-blue-200/60 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Ảnh bao phủ đại diện (SaaS Visual Cover) */}
                    <div className={`h-32 w-full bg-gradient-to-br ${course.gradient} p-5 flex flex-col justify-between relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl transform translate-x-1/3 -translate-y-1/3" />
                      
                      {/* Trình độ Badge */}
                      <span className="self-start px-2.5 py-0.5 text-[10px] font-bold text-slate-800 bg-white/90 backdrop-blur-sm rounded-md uppercase tracking-wide">
                        {course.level}
                      </span>

                      {/* Thống kê học viên nhanh */}
                      <div className="text-white/90 text-[10px] font-semibold bg-black/10 backdrop-blur-sm self-start px-2 py-0.5 rounded">
                        {course.students} học viên đang học
                      </div>
                    </div>

                    {/* Nội dung chi tiết */}
                    <div className="p-5">
                      <h3 className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors leading-snug mb-2 line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                        {course.desc}
                      </p>

                      {/* Thời lượng bài học */}
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium mb-2">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {course.duration}</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-slate-400" /> {course.lessons}</span>
                      </div>
                    </div>
                  </div>

                  {/* Phần chân thẻ chứa công nghệ sử dụng và nút CTAs */}
                  <div className="px-5 pb-5">
                    <div className="flex flex-wrap gap-1 mb-4 border-t border-slate-100 pt-4">
                      {course.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-semibold text-blue-600 bg-blue-50/60 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors">
                        Đề cương
                      </button>
                      <button className="inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2 bg-blue-600 border border-blue-600 text-white rounded-xl hover:bg-blue-700 hover:border-blue-700 transition-all duration-200 shadow-md shadow-blue-500/10">
                        <PlayCircle className="w-3.5 h-3.5" /> Học ngay
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>

            {/* Trạng thái trống khi không tìm thấy kết quả */}
            {sortedCourses.length === 0 && (
              <div className="col-span-2 text-center py-16 bg-white border border-dashed border-slate-200 rounded-3xl space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto">
                  <Search className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-700">Không tìm thấy khóa học phù hợp</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">Vui lòng thay đổi từ khóa tìm kiếm hoặc chọn phân hệ công nghệ khác.</p>
              </div>
            )}
          </div>

          {/* PHÂN TRANG */}
          {sortedCourses.length > 0 && (
            <div className="flex items-center justify-center pt-4">
              <button className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-xs font-bold text-slate-700 transition-colors shadow-sm">
                Xem thêm khóa học
              </button>
            </div>
          )}

        </section>
      </main>

    </div>
  );
}