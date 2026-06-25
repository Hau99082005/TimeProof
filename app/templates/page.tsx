"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { 
  Search, 
  Code2, 
  Layout, 
  Laptop, 
  Smartphone, 
  ExternalLink, 
  Eye, 
  Layers, 
  ChevronDown, 
  Sparkles, 
  X,
  Grid,
  ShoppingBag,
  Coffee
} from "lucide-react";

// --- Danh mục phân loại giao diện ---
const CATEGORIES = [
  { id: "all", name: "Tất cả giao diện", icon: Grid },
  { id: "saas", name: "SaaS & Dashboard", icon: Layout },
  { id: "project", name: "Đồ án & Hệ thống", icon: Layers },
  { id: "ecommerce", name: "Thương mại điện tử", icon: ShoppingBag },
  { id: "business", name: "Doanh nghiệp & Cafe", icon: Coffee },
];

// --- Dữ liệu các Website Mẫu ---
const TEMPLATES_DATA = [
  {
    id: 1,
    title: "PhotoFlyAI - Giao diện Nền tảng Tạo ảnh Nghệ thuật",
    category: "saas",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    responsive: ["Desktop", "Tablet", "Mobile"],
    views: 1420,
    stars: 310,
    desc: "Giao diện SaaS hiện đại tối ưu trải nghiệm người dùng với bố cục chuẩn hóa: thanh điều hướng tối giản, logo thương hiệu PhotoFlyAI bên trái và khu vực đăng nhập bên phải.",
    gradient: "from-indigo-600 via-purple-600 to-pink-500"
  },
  {
    id: 2,
    title: "Hệ thống Kết nối và Tìm kiếm Cho thuê Căn hộ - Nhà trọ",
    category: "project",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    responsive: ["Desktop", "Tablet", "Mobile"],
    views: 2850,
    stars: 640,
    desc: "Mẫu giao diện hoàn chỉnh cho đồ án tốt nghiệp công nghệ thông tin. Tích hợp bộ lọc tìm kiếm nâng cao, bản đồ vị trí trực quan và trang quản trị phân quyền cho chủ nhà (Lessor).",
    gradient: "from-blue-600 to-sky-500"
  },
  {
    id: 3,
    title: "An Coffee - Website Giới thiệu & Gọi món trực tuyến",
    category: "business",
    tech: ["HTML5", "Tailwind CSS", "JavaScript"],
    responsive: ["Desktop", "Mobile"],
    views: 920,
    stars: 185,
    desc: "Giao diện tối giản, ấm cúng dành cho các thương hiệu quán cà phê hoặc ẩm thực địa phương. Tích hợp menu điện tử, hiển thị giờ hoạt động và hệ thống định vị bản đồ mượt mà.",
    gradient: "from-amber-700 to-orange-500"
  },
  {
    id: 4,
    title: "Minimalist Developer Portfolio Terminal",
    category: "business",
    tech: ["Vite", "React", "Tailwind CSS"],
    responsive: ["Desktop", "Tablet", "Mobile"],
    views: 1150,
    stars: 290,
    desc: "Trang thông tin cá nhân (Portfolio) phong cách danh mục tối giản kết hợp với giao diện dòng lệnh độc đáo dành cho kỹ sư phần mềm muốn tạo dấu ấn riêng.",
    gradient: "from-emerald-600 to-teal-500"
  },
  {
    id: 5,
    title: "E-Commerce Gadget Clean Architecture Interface",
    category: "ecommerce",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    responsive: ["Desktop", "Tablet", "Mobile"],
    views: 1980,
    stars: 425,
    desc: "Giao diện cửa hàng công nghệ cao cấp lấy cảm hứng từ Apple và Stripe. Tối ưu luồng thanh toán, giỏ hàng động và bộ lọc thuộc tính sản phẩm không độ trễ.",
    gradient: "from-slate-900 to-slate-700"
  }
];

export default function TemplatesExplorer() {
  const [selectedCategory, setSelectedCategory] = useState("all");
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

  const filteredTemplates = TEMPLATES_DATA.filter(tpl => {
    const matchesCategory = selectedCategory === "all" || tpl.category === selectedCategory;
    const matchesSearch = tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tpl.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tpl.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === "popular") return b.stars - a.stars;
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
                <Code2 className="w-4 h-4 sm:w-5 h-5 text-blue-600 dark:text-blue-500 flex-shrink-0" />
                <span>Thư Viện Website Mẫu</span>
              </h1>
              <p className={`text-[11px] sm:text-xs transition-colors ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Khám phá, trải nghiệm trực quan và tham khảo cấu trúc mã nguồn front-end chuẩn hóa.
              </p>
            </div>
            
            {/* Hộp tìm kiếm cân xứng tương thích đa thiết bị */}
            <div className="relative w-full md:w-80 lg:w-[400px] min-w-0 flex-shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm giao diện, đồ án, công nghệ..."
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
        
        {/* SIDEBAR BỘ LỌC DANH MỤC */}
        <aside className="lg:col-span-3 w-full min-w-0 space-y-4 sm:space-y-6">
          <div className={`rounded-2xl border p-3 sm:p-4 transition-colors duration-300 ${
            isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200/60"
          }`}>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block mb-2 px-1 text-slate-400 dark:text-slate-500">
              Loại kiến trúc & giao diện
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

          {/* Khối phụ trợ mở rộng hiển thị trên máy tính */}
          <div className="hidden lg:block bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-5 text-white shadow-sm relative overflow-hidden border border-slate-800">
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
            <Sparkles className="w-5 h-5 text-sky-400 mb-3" />
            <h4 className="font-bold text-sm mb-1">Mã nguồn mở 100%</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-4">Mọi giao diện đều đi kèm liên kết mã nguồn GitHub sạch, tổ chức thư mục dạng mô-đun hóa dễ kế thừa.</p>
            <div className="text-[10px] font-mono text-slate-400 bg-white/5 py-1 px-2 rounded border border-white/10 inline-block">Tailwind Ready</div>
          </div>
        </aside>

        {/* NƠI HIỂN THỊ DANH SÁCH WEBSITE MẪU */}
        <section className="lg:col-span-9 space-y-3.5 w-full min-w-0">
          
          {/* Thanh số liệu kết quả */}
          <div className={`flex items-center justify-between text-[11px] sm:text-xs font-medium border px-3.5 py-2.5 rounded-xl relative w-full transition-colors duration-300 ${
            isDark ? "bg-slate-950 border-slate-900 text-slate-400" : "bg-white border-slate-200/60 text-slate-500"
          }`}>
            <div className="truncate">Tìm thấy <span className="font-bold text-slate-800 dark:text-white">{sortedTemplates.length}</span> mẫu website</div>
            
            <div className="relative flex-shrink-0">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`flex items-center gap-1 border px-2.5 py-1.5 rounded-lg font-semibold text-[11px] sm:text-xs transition-colors ${
                  isDark ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                <span>Sắp xếp: {sortBy === "popular" ? "Được yêu thích" : "Mới cập nhật"}</span>
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
                      <button onClick={() => { setSortBy("popular"); setIsSortOpen(false); }} className={`w-full text-left px-3 py-1.5 text-[11px] ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Được yêu thích</button>
                      <button onClick={() => { setSortBy("newest"); setIsSortOpen(false); }} className={`w-full text-left px-3 py-1.5 text-[11px] ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Mới cập nhật</button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* LƯỚI KHU VỰC THẺ WEB MẪU */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 w-full">
            <AnimatePresence mode="popLayout">
              {sortedTemplates.map((tpl) => (
                <motion.div
                  layout
                  key={tpl.id}
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
                    {/* Phần đồ họa bìa thẻ sử dụng hệ màu Gradient cao cấp */}
                    <div className={`h-40 w-full bg-gradient-to-br ${tpl.gradient} p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors" />
                      
                      <div className="flex gap-1">
                        {tpl.responsive.includes("Desktop") && <Laptop className="w-3.5 h-3.5 text-white/80" />}
                        {tpl.responsive.includes("Mobile") && <Smartphone className="w-3.5 h-3.5 text-white/80" />}
                      </div>

                      <div className="flex items-center gap-3 text-white/90 text-[10px] font-semibold bg-black/10 backdrop-blur-md self-start px-2.5 py-1 rounded-md">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {tpl.views}</span>
                        <span className="flex items-center gap-0.5">★ {tpl.stars}</span>
                      </div>
                    </div>

                    {/* Nội dung thông tin chi tiết */}
                    <div className="p-4 sm:p-5">
                      <h3 className={`font-bold text-sm transition-colors leading-snug mb-2 line-clamp-1 ${isDark ? "text-white group-hover:text-blue-400" : "text-slate-800 group-hover:text-blue-600"}`}>
                        {tpl.title}
                      </h3>
                      <p className={`text-[11px] sm:text-xs line-clamp-3 leading-relaxed text-justify ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        {tpl.desc}
                      </p>
                    </div>
                  </div>

                  {/* Chân thẻ bọc Nhãn linh kiện và phím CTAs chạm tiêu chuẩn */}
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <div className={`flex flex-wrap gap-1.5 mb-5 border-t pt-4 ${isDark ? "border-slate-900" : "border-slate-100"}`}>
                      {tpl.tech.map((techItem, i) => (
                        <span key={i} className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${
                          isDark ? "text-slate-400 bg-slate-900 border-slate-800/80" : "text-slate-600 bg-slate-50 border-slate-100"
                        }`}>
                          {techItem}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full">
                      <button className={`inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl transition-colors min-h-[36px] ${
                        isDark ? "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}>
                        <ExternalLink className="w-3.5 h-3.5" /> Xem Live
                      </button>
                      <button className={`inline-flex items-center justify-center gap-1.5 text-[11px] font-bold py-2 px-3 rounded-xl transition-all duration-200 min-h-[36px] ${
                        isDark ? "bg-slate-100 text-slate-900 hover:bg-slate-200" : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/10"
                      }`}>
                        <Code2 className="w-3.5 h-3.5" /> Xem Code
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* TRẠNG THÁI TRỐNG (KHI BỘ LỌC KHÔNG KHỚP) */}
          {sortedTemplates.length === 0 && (
            <div className={`text-center py-16 border border-dashed rounded-3xl space-y-3 w-full ${
              isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200"
            }`}>
              <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 mx-auto">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">Không tìm thấy website mẫu nào</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto px-4">Vui lòng thay đổi từ khóa tìm kiếm hoặc chọn danh mục cấu trúc khác.</p>
            </div>
          )}

          {/* PHÂN TRANG */}
          {sortedTemplates.length > 0 && (
            <div className="flex items-center justify-center pt-2">
              <button className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all w-full sm:w-auto shadow-sm ${
                isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300" : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
              }`}>
                Tải Thêm Giao Diện
              </button>
            </div>
          )}

        </section>
      </main>

    </div>
  );
}