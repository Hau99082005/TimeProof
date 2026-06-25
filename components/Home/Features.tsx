"use client";

const Features = () => {
  return (
    <>
      <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-in slide-in-from-bottom-12 fade-in duration-1000">
            <h2
              className="text-sm font-bold tracking-widest text-primary uppercase mb-3"
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: "20px",
                fontStyle: "Regular",
                fontWeight: "400",
                lineHeight: 1.5,
                letterSpacing: "0.01em",
              }}
            >
              Giải Pháp Công Nghệ
            </h2>
            <h3
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6"
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: "46px",
                fontStyle: "Bold",
                fontWeight: "700",
                lineHeight: 1.5,
                letterSpacing: "0.01em",
              }}
            >
              Giải pháp công nghệ
              <br className="hidden md:block" />
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "46px",
                  fontStyle: "Bold",
                  fontWeight: "700",
                  lineHeight: 1.5,
                  letterSpacing: "0.01em",
                }}
              >
                toàn diện
              </span>
            </h3>
            <p
              className="text-lg text-slate-600 dark:text-slate-400"
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: "20px",
                fontStyle: "Regular",
                fontWeight: "400",
                lineHeight: 1.5,
                letterSpacing: "0.01em",
              }}
            >
              TimeProof là nền tảng hàng đầu cung cấp kiến thức lập trình, thiết
              kế web enterprise-grade, và tư vấn công nghệ toàn diện. Chúng tôi
              hỗ trợ sinh viên, startup, và doanh nghiệp biến đổi kỹ thuật số
              thành lợi thế cạnh tranh.
            </p>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
    </>
  );
};

export default Features;
