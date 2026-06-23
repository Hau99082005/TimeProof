import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Code2,
  GraduationCap,
  Building2,
  Globe,
  Newspaper,
  Search,
  User,
  ShoppingCart,
} from "lucide-react";

const Footer = () => {
  const date = new Date();
  const footerLinks = [
    { name: "Source Code", href: "/source-code", icon: Code2 },
    { name: "Đồ Án CNTT", href: "/projects", icon: GraduationCap },
    { name: "Website Mẫu", href: "/templates", icon: Globe },
    { name: "Giải Pháp", href: "/solutions", icon: Building2 },
    { name: "Tin Tức", href: "/news", icon: Newspaper },
  ];

  const contactInfo = [
    // { label: 'Email', value: 'contact@timeproof.vn' },
    { label: "Hotline", value: "0367722389" },
    { label: "Địa chỉ", value: "Hải Châu, Đà Nẵng" },
  ];

  const socialLinks = [
    { icon: Code2, href: "#" },
    { icon: Globe, href: "#" },
    { icon: Search, href: "#" },
    { icon: User, href: "#" },
  ];

  return (
    <footer className="bg-blue-50 dark:bg-black border-t border-blue-100 dark:border-slate-900">
      <div className="w-full px-6 md:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/icons/Logo/Logo.png"
                alt="TimeProof Logo"
                width={140}
                height={45}
                className="h-10 w-auto"
                priority
              />
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
              Cung cấp source code chất lượng, đồ án CNTT, website mẫu và giải
              pháp phần mềm chuyên nghiệp dành cho sinh viên và doanh nghiệp.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-5">
              Danh mục
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm hover:text-primary hover:font-semibold transition-all duration-200"
                  >
                    <link.icon size={16} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-5">
              Liên hệ
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((info, idx) => (
                <li
                  key={idx}
                  className="text-slate-600 dark:text-slate-400 text-sm"
                >
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {info.label}:
                  </span>{" "}
                  {info.value}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-5">
              Đăng ký nhận tin
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Đăng ký email để nhận những ưu đãi và tin tức mới nhất.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                Gửi
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-100 dark:border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            © {date.getFullYear()} TimeProof. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-slate-600 dark:text-slate-400 text-sm hover:text-primary hover:font-semibold transition-all duration-200"
            >
              Chính sách bảo mật
            </Link>
            <Link
              href="/terms"
              className="text-slate-600 dark:text-slate-400 text-sm hover:text-primary hover:font-semibold transition-all duration-200"
            >
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
