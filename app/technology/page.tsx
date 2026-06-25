"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
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
  Award,
  Star
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
    desc: "Làm chủ App Router, Server Components, tối ưu hóa SEO và cơ chế Server Actions để xây dựng ứng dụng web tốc độ cao chuẩn production thương mại.",
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
    desc: "Thiết kế kiến trúc backend mở rộng, phân quyền nâng cao, tối ưu hóa truy vấn cơ sở dữ liệu và tích hợp hàng đợi xử lý nền (Queue Processing).",
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
    desc: "Chuẩn hóa môi trường phát triển cục bộ và tự động hóa quy trình triển khai ứng dụng lên các hạ tầng đám mây lớn bảo mật an toàn.",
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
    desc: "Kỹ thuật tối ưu Prompting, tích hợp mô hình ngôn ngữ lớn (LLM), xử lý luồng dữ liệu trả về (Streaming) thời gian thực trên giao diện đồ họa web.",
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
    desc: "Cải thiện chỉ số Core Web Vitals, cấu hình bộ nhớ đệm, thu gọn kích thước bundle code giúp trang web đạt điểm tuyệt đối trên công cụ chấm Lighthouse.",
    gradient: "from-cyan-600 to-blue-500"
  }
];

export default function CoursesExplorer() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("popular");

  // Đồng bộ hóa trạng thái giao diện Next-Themes (Tránh lỗi Hydration Mismatch)
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  const filteredCourses = COURSES_DATA.filter(course => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "Tất cả" || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "popular") return parseInt(b.students.replace(",", "")) - parseInt(a.students.replace(",", ""));
    return b.id - a.id;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased w-full overflow-x-hidden ${
      isDark ? "bg-black text-slate-100" : "bg-slate-50 text-slate-900"
    }`}>
      
      {/* ─── PHẦN ĐẦU TRANG CÂN ĐỐI TRỤC DỌC TRỰC DIỆN (ĐÃ FIX LỖI OVERLAP) ─── */}
      <div className={`border-b relative z-10 transition-colors duration-300 w-full ${
        isDark ? "bg-black border-slate-900" : "bg-white border-slate-200/80"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
            
            <div className="min-w-0 space-y-1">
              <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight flex items-center gap-2">
                <GraduationCap className="w-4 h-4 sm:w-5 h-5 text-blue-600 dark:text-blue-500 flex-shrink-0" />
                <span>Học Công Nghệ Mới</span>
              </h1>
              <p className={`text-[11px] sm:text-xs transition-colors ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Khám phá các khóa học công nghệ web hiện đại, thực chiến và bài bản.
              </p>
            </div>
            
            {/* Hộp tìm kiếm cân xứng đồng bộ hệ thống */}
            <div className="relative w-full md:w-80 lg:w-[400px] min-w-0 flex-shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm khóa học, framework sử dụng..."
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
        
        {/* SIDEBAR BỘ LỌC NGÔN NGỮ & TRÌNH ĐỘ */}
        <aside className="lg:col-span-3 w-full min-w-0 space-y-4 sm:space-y-6">
          
          {/* Phân hệ công nghệ */}
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

          {/* Trình độ lập trình */}
          <div className={`rounded-2xl border p-3 sm:p-4 transition-colors duration-300 ${
            isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200/60"
          }`}>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block mb-2 px-1 text-slate-400 dark:text-slate-500">
              Trình độ lập trình
            </span>
            <div className="flex flex-wrap gap-1.5 p-0.5">
              {["Tất cả", "Cơ bản", "Trung bình", "Nâng cao", "Chuyên gia"].map((lvl) => {
                const isSelected = selectedLevel === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium border transition-all ${
                      isSelected 
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm" 
                        : isDark
                          ? "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Banner chứng nhận ẩn trên di động */}
          <div className="hidden lg:block bg-gradient-to-br from-blue-600 to-sky-500 rounded-2xl p-5 text-white shadow-sm relative overflow-hidden border border-blue-700">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <Award className="w-5 h-5 text-sky-200 mb-3" />
            <h4 className="font-bold text-sm mb-1">Cập Nhật Chứng Nhận</h4>
            <p className="text-[11px] text-blue-100 leading-relaxed mb-4">Hoàn thành bài tập thực hành và đồ án cuối khóa để nâng cao trình độ kỹ sư chuyên nghiệp.</p>
            <div className="text-xs bg-white/10 py-1.5 px-3 rounded-lg font-mono inline-block">Project-based Learning</div>
          </div>

        </aside>

        {/* NƠI HIỂN THỊ DANH SÁCH KHÓA HỌC */}
        <section className="lg:col-span-9 space-y-3.5 w-full min-w-0">
          
          {/* Thanh chỉ số kết quả */}
          <div className={`flex items-center justify-between text-[11px] sm:text-xs font-medium border px-3.5 py-2.5 rounded-xl relative w-full transition-colors duration-300 ${
            isDark ? "bg-slate-950 border-slate-900 text-slate-400" : "bg-white border-slate-200/60 text-slate-500"
          }`}>
            <div className="truncate">Tìm thấy <span className="font-bold text-slate-800 dark:text-white">{sortedCourses.length}</span> khóa học phù hợp</div>
            
            <div className="relative flex-shrink-0">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`flex items-center gap-1 border px-2.5 py-1.5 rounded-lg font-semibold text-[11px] sm:text-xs transition-colors ${
                  isDark ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                <span>Sắp xếp: {sortBy === "popular" ? "Phổ biến nhất" : "Mới cập nhật"}</span>
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
                      className={`absolute right-0 mt-1 w-36 border shadow-xl rounded-xl py-1 z-20 origin-top-right transition-colors ${
                        isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                      }`}
                    >
                      <button onClick={() => { setSortBy("popular"); setIsSortOpen(false); }} className={`w-full text-left px-3 py-1.5 text-[11px] ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Phổ biến nhất</button>
                      <button onClick={() => { setSortBy("newest"); setIsSortOpen(false); }} className={`w-full text-left px-3 py-1.5 text-[11px] ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Mới cập nhật</button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* LƯỚI KHU VỰC THẺ KHÓA HỌC */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 w-full">
            <AnimatePresence mode="popLayout">
              {sortedCourses.map((course) => (
                <motion.div
                  layout
                  key={course.id}
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
                    {/* Phần đồ họa Gradient bìa thẻ */}
                    <div className={`h-32 w-full bg-gradient-to-br ${course.gradient} p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl transform translate-x-1/3 -translate-y-1/3" />
                      
                      <span className="self-start px-2.5 py-0.5 text-[10px] font-bold text-slate-800 bg-white/90 backdrop-blur-sm rounded uppercase tracking-wide">
                        {course.level}
                      </span>

                      <div className="text-white/90 text-[10px] font-semibold bg-black/10 backdrop-blur-md self-start px-2.5 py-1 rounded">
                        {course.students} học viên đang học
                      </div>
                    </div>

                    {/* Nội dung chi tiết */}
                    <div className="p-4 sm:p-5">
                      <h3 className={`font-bold text-sm transition-colors leading-snug mb-2 line-clamp-1 ${isDark ? "text-white group-hover:text-blue-400" : "text-slate-800 group-hover:text-blue-600"}`}>
                        {course.title}
                      </h3>
                      <p className={`text-[11px] sm:text-xs line-clamp-2 leading-relaxed text-justify ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        {course.desc}
                      </p>

                      <div className="flex items-center gap-3.5 text-[10px] sm:text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-4">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.lessons}</span>
                        <span className="flex items-center gap-0.5 text-amber-500"><Star className="w-3 h-3 fill-amber-500" /> {course.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Chân thẻ chứa Nhãn công nghệ & CTAs */}
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <div className={`flex flex-wrap gap-1.5 mb-5 border-t pt-4 ${isDark ? "border-slate-900" : "border-slate-100"}`}>
                      {course.tags.map((tag, i) => (
                        <span key={i} className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${
                          isDark ? "text-blue-400 bg-blue-950/40 border-blue-900/30" : "text-blue-600 bg-blue-50 border-slate-100"
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full">
                      <button className={`inline-flex items-center justify-center text-xs font-semibold py-2 rounded-xl transition-colors min-h-[36px] ${
                        isDark ? "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}>
                        Đề cương
                      </button>
                      <button className={`inline-flex items-center justify-center gap-1 text-[11px] font-bold py-2 px-3 rounded-xl transition-all duration-200 min-h-[36px] ${
                        isDark ? "bg-slate-100 text-slate-900 hover:bg-slate-200" : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/10"
                      }`}>
                        <PlayCircle className="w-3.5 h-3.5" /> Học ngay
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* TRẠNG THÁI TRỐNG (KHI KHÔNG KHỚP BỘ LỌC) */}
          {sortedCourses.length === 0 && (
            <div className={`text-center py-16 border border-dashed rounded-3xl space-y-3 w-full ${
              isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200"
            }`}>
              <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">Không tìm thấy khóa học phù hợp</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto px-4">Vui lòng điều chỉnh lại từ khóa hoặc chọn phân hệ công nghệ khác trong danh mục.</p>
            </div>
          )}

          {/* PHÂN TRANG */}
          {sortedCourses.length > 0 && (
            <div className="flex items-center justify-center pt-2">
              <button className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all w-full sm:w-auto shadow-sm ${
                isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300" : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
              }`}>
                Xem thêm khóa học
              </button>
            </div>
          )}

        </section>
      </main>

    </div>
  );
}