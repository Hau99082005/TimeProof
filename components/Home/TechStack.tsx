"use client";
import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string;
}

const TechStack = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/technologiescategories");
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-in slide-in-from-bottom-12 fade-in duration-1000">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
            Công Nghệ Cốt Lõi
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Đón Đầu Xu Hướng Với <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Công Nghệ Hiện Đại Nhất
            </span>
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Chúng tôi luôn cập nhật và áp dụng những công nghệ tiên tiến nhất để
            đảm bảo dự án của bạn đạt hiệu năng cao, bảo mật tuyệt đối và dễ
            dàng mở rộng.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="size-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group relative p-6 md:p-10 rounded-xl bg-slate-100 dark:bg-slate-800/40 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 hover:border-primary/50 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 animate-in slide-in-from-bottom-8 fade-in fill-mode-both hover:shadow-lg hover:shadow-primary/10"
                style={{
                  animationDelay: `${index * 100}ms`,
                  borderRadius: "5px",
                }}
              >
                <div className="absolute top-4 right-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <Bookmark className="w-5 h-5 md:w-6 md:h-6 text-slate-500 dark:text-slate-400 group-hover:text-primary" />
                </div>

                <div className="pr-8">
                  <h4
                    className="text-base md:text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2"
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "20px",
                      fontStyle: "Bold",
                      fontWeight: "700",
                      lineHeight: 1.4,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {category.name}
                  </h4>
                  {category.description && (
                    <p
                      className="text-sm md:text-base text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 line-clamp-2"
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "16px",
                        fontStyle: "Regular",
                        fontWeight: "400",
                        lineHeight: 1.6,
                        letterSpacing: "0.01em",
                      }}
                    >
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TechStack;
