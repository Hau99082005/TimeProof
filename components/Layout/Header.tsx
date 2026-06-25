"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  Building2,
  Globe,
  Newspaper,
  Search,
  Sun,
  Moon,
  LogOut,
  User as UserIcon,
  Settings,
  LayoutDashboard,
  Home,
  ChevronDown,
  Layers,
  Info,
  Cpu,
  HomeIcon,
  FolderKanban
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  
  const { theme, setTheme } = useTheme();
  const { user, dbUser, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainNavItems = [
    { name: "Trang chủ", icon: HomeIcon, href: "/source-code" },
    { name: "Tính năng", icon: FolderKanban, href: "/projects" },
    { name: "Websites", icon: Globe, href: "/templates" },
  ];

  const dropdownNavItems = [
    { name: "Giải Pháp", icon: Building2, href: "/solutions" },
    { name: "Công nghệ", icon: Cpu, href: "/technology" },
    { name: "Bài viết", icon: Newspaper, href: "/news" },
    { name: "Tìm hiểu thêm", icon: Info, href: "/learn-more" },
  ];

  const allNavItems = [...mainNavItems, ...dropdownNavItems];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const isHome = pathname === "/";
  const isScrolled = scrolled || !isHome;

  const headerBg = isScrolled
    ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200/50 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
    : "bg-gradient-to-b from-black/60 via-black/20 to-transparent border-b border-transparent";

  const textColor = isScrolled
    ? "text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary"
    : "text-white/90 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]";

  const iconColor = isScrolled
    ? "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
    : "text-white hover:bg-white/20 drop-shadow-md";
    
  const positionClass = isHome ? "fixed" : "sticky";

  return (
    <header className={`${positionClass} top-0 left-0 right-0 z-50 w-full transition-all duration-700 ease-in-out ${headerBg}`}>
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 flex h-20 sm:h-24 items-center justify-between gap-4">
        <div className="flex items-center gap-8 sm:gap-10 lg:gap-12 flex-1 min-w-0">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group relative">
            <Image
              src="/icons/Logo/Logo.png"
              alt="TimeProof Logo"
              width={160}
              height={50}
              className="h-11 sm:h-12 md:h-14 w-auto transition-all duration-700 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
              priority
            />
          </Link>
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {mainNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative px-2 py-3 text-[15px] font-bold transition-all duration-300 whitespace-nowrap ${textColor}`}
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  <item.icon className="w-[18px] h-[18px] transition-transform duration-500 group-hover:-translate-y-1" />
                  {item.name}
                </span>
                <span className={`absolute bottom-0 left-0 w-0 h-[3px] transition-all duration-500 group-hover:w-full rounded-t-full ${isScrolled ? 'bg-primary' : 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'}`} />
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`group relative px-2 py-3 text-[15px] font-bold transition-all duration-300 whitespace-nowrap outline-none ${textColor}`}>
                  <span className="relative z-10 flex items-center gap-2.5">
                    <Layers className="w-[18px] h-[18px] transition-transform duration-500 group-hover:-translate-y-1" />
                    Khám phá
                    <ChevronDown className="w-4 h-4 ml-0.5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </span>
                  <span className={`absolute bottom-0 left-0 w-0 h-[3px] transition-all duration-500 group-hover:w-full rounded-t-full ${isScrolled ? 'bg-primary' : 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'}`} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-lg shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-300 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
                {dropdownNavItems.map((item) => (
                  <DropdownMenuItem asChild key={item.name} className="rounded-md cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800 p-3 transition-colors mb-1 last:mb-0">
                    <Link href={item.href} className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300">
                        <item.icon size={18} />
                      </div>
                      <span className="font-semibold text-[15px]">{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className={`flex items-center gap-3 px-4 py-2.5 rounded-full max-w-[200px] sm:max-w-[320px] animate-in slide-in-from-right-8 zoom-in-95 fade-in duration-500 shadow-inner backdrop-blur-xl ${isScrolled ? 'bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700' : 'bg-white/10 border border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`}>
                <Search size={18} className={isScrolled ? "text-slate-400" : "text-white/70"} />
                <input
                  type="text"
                  autoFocus
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full bg-transparent border-none outline-none text-sm font-medium p-0 focus:ring-0 ${isScrolled ? 'text-slate-700 dark:text-slate-200 placeholder:text-slate-400' : 'text-white placeholder:text-white/60'}`}
                />
                <button type="button" onClick={() => setIsSearchOpen(false)} className={`transition-all duration-300 shrink-0 p-1.5 rounded-full hover:rotate-90 ${isScrolled ? 'text-slate-400 hover:text-primary hover:bg-slate-200 dark:hover:bg-slate-700' : 'text-white/70 hover:text-white hover:bg-white/20'}`}>
                  <X size={16} />
                </button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className={`rounded-full h-11 w-11 sm:h-12 sm:w-12 transition-all duration-500 hover:scale-110 ${iconColor}`}
              >
                <Search size={22} />
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={`hidden md:flex rounded-full h-12 w-12 transition-all duration-500 hover:scale-110 ${iconColor}`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[22px] w-[22px] rotate-0 scale-100 transition-transform duration-700 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[22px] w-[22px] rotate-90 scale-0 transition-transform duration-700 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {loading ? (
            <div className="hidden md:flex h-12 w-12 items-center justify-center">
              <div className={`h-6 w-6 animate-spin rounded-full border-[3px] border-t-transparent ${isScrolled ? 'border-primary' : 'border-white'}`} />
            </div>
          ) : user && dbUser ? (
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/pricing" className="shrink-0">
                <Button className={`hidden sm:flex font-bold h-11 sm:h-12 px-5 sm:px-7 text-sm sm:text-[15px] rounded-full shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 ${isScrolled ? 'bg-gradient-to-r from-primary to-blue-600 hover:shadow-primary/30 text-white' : 'bg-white text-primary hover:bg-white/90 hover:shadow-white/20'}`}>
                  Bảng giá
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`flex items-center gap-2 p-1.5 rounded-full h-11 sm:h-12 transition-all duration-500 hover:ring-4 ${isScrolled ? 'hover:ring-primary/20' : 'hover:ring-white/30'}`}
                  >
                    <Avatar className={`h-8 w-8 sm:h-9 sm:w-9 ring-2 shadow-md ${isScrolled ? 'ring-white dark:ring-slate-900' : 'ring-white/80'}`}>
                      {(() => {
                        const baseSrc = (user.photoURL || dbUser.avatar || "").trim();
                        const cacheParam = dbUser.updated_at ? `?t=${new Date(dbUser.updated_at).getTime()}` : "";
                        const src = baseSrc ? baseSrc + cacheParam : null;
                        return src ? (
                          <AvatarImage src={src} alt={dbUser.full_name} className="object-cover" />
                        ) : null;
                      })()}
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {(dbUser.full_name || user.email || "U").charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 p-2 rounded-lg shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-300 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
                  <DropdownMenuLabel className="p-3">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-lg truncate">{dbUser.full_name}</span>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                        {dbUser.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                  {dbUser.role === "admin" && (
                    <>
                      <DropdownMenuItem asChild className="rounded-md cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800 p-3 transition-colors">
                        <Link href="/dashboard/admin" className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-xl text-primary"><LayoutDashboard size={18} /></div>
                          <span className="font-semibold">Quản trị admin</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                    </>
                  )}
                  <DropdownMenuItem asChild className="rounded-md cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800 p-3 transition-colors">
                    <Link href="/settings" className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300"><Settings size={18} /></div>
                      <span className="font-semibold">Cài đặt tài khoản</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-md cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800 p-3 transition-colors">
                    <Link href="/" className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300"><Home size={18} /></div>
                      <span className="font-semibold">Về trang chủ</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="rounded-md cursor-pointer focus:bg-red-50 dark:focus:bg-red-900/20 text-red-600 dark:text-red-400 p-3 transition-colors"
                  >
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl mr-1"><LogOut size={18} /></div>
                    <span className="font-semibold">Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/pricing" className="shrink-0">
                <Button className={`hidden sm:flex font-bold h-11 sm:h-12 px-5 sm:px-7 text-sm sm:text-[15px] rounded-full shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 ${isScrolled ? 'bg-gradient-to-r from-primary to-blue-600 hover:shadow-primary/30 text-white' : 'bg-white text-primary hover:bg-white/90 hover:shadow-white/20'}`}>
                  Bảng giá
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className={`hidden sm:flex font-bold h-11 sm:h-12 px-5 sm:px-7 text-sm sm:text-[15px] rounded-full transition-all duration-500 border-2 ${isScrolled ? 'border-primary/20 hover:bg-primary/5 dark:border-primary/30 dark:hover:bg-primary/10' : 'border-white/50 text-white hover:bg-white/10 hover:border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]'}`}>
                  Đăng nhập
                </Button>
              </Link>
            </div>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`lg:hidden rounded-full h-11 w-11 sm:h-12 sm:w-12 transition-all duration-300 ${iconColor}`}
              >
                <Menu size={28} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] sm:w-[420px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-l border-white/20 dark:border-white/5 p-0 shadow-2xl flex flex-col h-full"
              showCloseButton={false}
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800/50 shrink-0">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/icons/Logo/Logo.png"
                      alt="TimeProof Logo"
                      width={140}
                      height={45}
                      className="h-10 w-auto"
                      priority
                    />
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X size={24} />
                  </Button>
                </SheetClose>
              </div>
              
              <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                {allNavItems.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-5 px-5 py-4 text-[17px] font-bold text-slate-700 dark:text-slate-200 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 rounded-2xl transition-all duration-300 group"
                    >
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:text-primary group-hover:shadow-md transition-all duration-300">
                        <item.icon size={22} className="group-hover:scale-110 transition-transform" />
                      </div>
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
              
              <div className="p-6 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col gap-4 shrink-0">
                <SheetClose asChild>
                  <Link href="/pricing">
                    <Button className="w-full rounded-2xl bg-gradient-to-r from-primary to-blue-600 text-white shadow-xl h-14 text-lg font-bold hover:scale-[1.02] transition-transform">Bảng giá</Button>
                  </Link>
                </SheetClose>
                <Button
                  variant="outline"
                  className="w-full rounded-2xl justify-start gap-4 h-14 text-base font-bold border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-black hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <Sun className="absolute h-[22px] w-[22px] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-amber-500" />
                    <Moon className="absolute h-[22px] w-[22px] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-blue-400" />
                  </div>
                  Chuyển đổi giao diện
                </Button>
                
                {loading ? (
                  <div className="flex items-center justify-center py-6">
                    <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-primary border-t-transparent" />
                  </div>
                ) : user && dbUser ? (
                  <div className="mt-2 bg-white dark:bg-slate-950 rounded-3xl p-5 shadow-lg border border-slate-100 dark:border-slate-800/60">
                    <div className="flex items-center gap-4 mb-5">
                      <Avatar className="h-14 w-14 ring-4 ring-primary/10">
                        {(() => {
                          const baseSrc = (user.photoURL || dbUser.avatar || "").trim();
                          const cacheParam = dbUser.updated_at ? `?t=${new Date(dbUser.updated_at).getTime()}` : "";
                          const src = baseSrc ? baseSrc + cacheParam : null;
                          return src ? (
                            <AvatarImage src={src} alt={dbUser.full_name} className="object-cover" />
                          ) : null;
                        })()}
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                          {(dbUser.full_name || user.email || "U").charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="text-lg font-bold text-slate-800 dark:text-slate-100 truncate">
                          {dbUser.full_name || user.email}
                        </span>
                        <span className="text-sm font-medium text-slate-500 truncate">
                          {dbUser.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {dbUser.role === "admin" && (
                        <SheetClose asChild>
                          <Link href="/dashboard/admin">
                            <Button variant="ghost" className="w-full justify-start gap-4 h-12 rounded-2xl hover:bg-primary/5">
                              <div className="p-1.5 bg-primary/10 rounded-lg text-primary"><LayoutDashboard size={18} /></div>
                              <span className="font-bold text-base">Quản trị admin</span>
                            </Button>
                          </Link>
                        </SheetClose>
                      )}
                      <SheetClose asChild>
                        <Link href="/settings">
                          <Button variant="ghost" className="w-full justify-start gap-4 h-12 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800">
                            <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300"><Settings size={18} /></div>
                            <span className="font-bold text-base">Cài đặt tài khoản</span>
                          </Button>
                        </Link>
                      </SheetClose>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-4 h-12 rounded-2xl text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={signOut}
                      >
                        <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-lg mr-1"><LogOut size={18} /></div>
                        <span className="font-bold text-base">Đăng xuất</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <SheetClose asChild>
                    <Link href="/login">
                      <Button variant="outline" className="w-full rounded-2xl h-14 text-lg font-bold border-2 border-primary/20 text-primary hover:bg-primary/5 mt-2 transition-colors">
                        Đăng nhập
                      </Button>
                    </Link>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;