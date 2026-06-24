"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Code2, 
  Globe, 
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
  User,
  Coffee,
  ArrowUpRight
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
  const [sortBy, setSortBy] = useState("popular"); // "popular" | "newest"

  // 1. Xử lý logic lọc dữ liệu
  const filteredTemplates = TEMPLATES_DATA.filter(tpl => {
    const matchesCategory = selectedCategory === "all" || tpl.category === selectedCategory;
    const matchesSearch = tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tpl.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tpl.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // 2. Xử lý logic sắp xếp dữ liệu
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === "popular") return b.stars - a.stars;
    return b.id - a.id; // ID lớn hơn tương ứng với mẫu mới cập nhật
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* HEADER TÌM KIẾM APP-STYLE */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 backdrop-blur-md bg-white/80">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-600" />
                Thư Viện Website Mẫu
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Khám phá, trải nghiệm trực quan và tham khảo cấu trúc mã nguồn front-end chuẩn hóa.</p>
            </div>
            
            {/* Thanh tìm kiếm */}
            <div className="relative flex-1 max-w-xl md:ml-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm giao diện, đồ án hoặc công nghệ sử dụng (e.g. Next.js, Giao diện quản trị)..."
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

      {/* BỐ CỤC KHÔNG GIAN LÀM VIỆC */}
      <main className="container mx-auto px-6 py-8 grid lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR BỘ LỌC DANH MỤC (CỘT TRÁI) */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-3">Loại kiến trúc & giao diện</span>
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

          {/* Khối thông tin tiện ích */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
            <Sparkles className="w-5 h-5 text-sky-400 mb-3" />
            <h4 className="font-bold text-sm mb-1">Mã nguồn mở 100%</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-4">Mọi giao diện đều đi kèm liên kết mã nguồn GitHub sạch, tổ chức thư mục dạng mô-đun hóa dễ kế thừa.</p>
            <div className="text-[10px] font-mono text-slate-400 bg-white/5 py-1 px-2 rounded border border-white/10 inline-block">Tailwind v4 Ready</div>
          </div>
        </aside>

        {/* LƯỚI HIỂN THỊ KẾT QUẢ (CỘT PHẢI) */}
        <section className="lg:col-span-9 space-y-6">
          
          {/* THANH ĐIỀU KHIỂN & DROPDOWN SẮP XẾP */}
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 bg-white border border-slate-200/60 px-4 py-3 rounded-xl relative">
            <div>Tìm thấy <span className="font-bold text-slate-800">{sortedTemplates.length}</span> mẫu website</div>
            
            {/* Bộ điều khiển Dropdown Sắp xếp */}
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg text-slate-700 font-semibold transition-all duration-150"
              >
                Sắp xếp: {sortBy === "popular" ? "Được yêu thích" : "Mới cập nhật"}
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
                        Được yêu thích
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

          {/* LƯỚI HIỂN THỊ WEB MẪU */}
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {sortedTemplates.map((tpl) => (
                <motion.div
                  layout
                  key={tpl.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900/[0.03] hover:border-blue-200/60 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Phần đồ họa xem trước (Thumbnail đại diện dạng Gradient cao cấp) */}
                    <div className={`h-40 w-full bg-gradient-to-br ${tpl.gradient} p-5 flex flex-col justify-between relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors" />
                      
                      {/* Huy hiệu hỗ trợ thiết bị hiển thị */}
                      <div className="flex gap-1">
                        {tpl.responsive.includes("Desktop") && <Laptop className="w-3.5 h-3.5 text-white/80" />}
                        {tpl.responsive.includes("Mobile") && <Smartphone className="w-3.5 h-3.5 text-white/80" />}
                      </div>

                      {/* Số liệu tương tác nhanh */}
                      <div className="flex items-center gap-3 text-white/90 text-[10px] font-semibold bg-black/10 backdrop-blur-md self-start px-2.5 py-1 rounded-md">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {tpl.views}</span>
                        <span className="flex items-center gap-1">★ {tpl.stars}</span>
                      </div>
                    </div>

                    {/* Nội dung thông tin chi tiết */}
                    <div className="p-5">
                      <h3 className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors leading-snug mb-2 line-clamp-1">
                        {tpl.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-5">
                        {tpl.desc}
                      </p>
                    </div>
                  </div>

                  {/* Chân thẻ chứa công nghệ và nút hành động */}
                  <div className="px-5 pb-5">
                    <div className="flex flex-wrap gap-1.5 mb-5 border-t border-slate-100 pt-4">
                      {tpl.tech.map((techItem, i) => (
                        <span key={i} className="text-[10px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          {techItem}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" /> Xem Live
                      </button>
                      <button className="inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200">
                        <Code2 className="w-3.5 h-3.5" /> Xem Code
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>

            {/* Trạng thái trống khi không có kết quả phù hợp */}
            {sortedTemplates.length === 0 && (
              <div className="col-span-2 text-center py-16 bg-white border border-dashed border-slate-200 rounded-3xl space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto">
                  <Search className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-700">Không tìm thấy website mẫu nào</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">Vui lòng thay đổi từ khóa tìm kiếm hoặc chọn danh mục giao diện khác.</p>
              </div>
            )}
          </div>

          {/* PHÂN TRANG TỰ ĐỘNG */}
          {sortedTemplates.length > 0 && (
            <div className="flex items-center justify-center pt-4">
              <button className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-xs font-bold text-slate-700 transition-colors shadow-sm">
                Tải Thêm Giao Diện
              </button>
            </div>
          )}

        </section>
      </main>

    </div>
  );
}