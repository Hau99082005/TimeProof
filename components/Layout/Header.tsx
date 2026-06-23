"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Code2,
  GraduationCap,
  Building2,
  Globe,
  Search,
  Newspaper,
  Sun,
  Moon,
  LogOut,
  User as UserIcon,
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
import { auth } from "@/firebase/client";
import { User, signOut } from "firebase/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      const res = await fetch("/api/auth/session", { method: "DELETE" });
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    { name: "Source Code", icon: Code2, href: "/source-code" },
    { name: "Đồ Án CNTT", icon: GraduationCap, href: "/projects" },
    { name: "Website Mẫu", icon: Globe, href: "/templates" },
    { name: "Giải Pháp", icon: Building2, href: "/solutions" },
    { name: "Tin Tức", icon: Newspaper, href: "/news" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-blue-50 dark:bg-slate-900 border-b border-blue-100 dark:border-slate-800">
      <div className="w-full px-6 md:px-12 lg:px-24 flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/icons/Logo/Logo.png"
              alt="TimeProof Logo"
              width={160}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-700 dark:text-slate-200 transition-all hover:text-primary hover:font-semibold"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-slate-700 dark:text-slate-200 hover:text-primary hover:bg-blue-100 dark:hover:bg-slate-800 h-10 w-10"
          >
            <Search size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-slate-700 dark:text-slate-200 hover:text-primary hover:bg-blue-100 dark:hover:bg-slate-800 h-10 w-10"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          {user ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={(user.photoURL || "").trim()} alt={user.displayName || "User"} />
                <AvatarFallback>
                  {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {user.displayName || user.email}
              </span>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut size={20} />
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button className="hidden md:flex font-semibold h-10 px-5">
                Đăng nhập
              </Button>
            </Link>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-slate-700 dark:text-slate-200 hover:text-primary hover:bg-blue-50 dark:hover:bg-slate-800"
              >
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] sm:w-[400px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 p-0"
              showCloseButton={false}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
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
                      className="text-slate-700 dark:text-slate-200 hover:text-primary hover:bg-blue-50 dark:hover:bg-slate-800"
                    >
                      <X size={24} />
                    </Button>
                  </SheetClose>
                </div>
                <div className="flex-1 flex flex-col gap-2 p-6">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-primary hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-all"
                      >
                        <item.icon size={22} />
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <div className="flex flex-col gap-3 p-6 border-t border-slate-200 dark:border-slate-800">
                  <Button
                    variant="ghost"
                    className="w-full text-slate-700 dark:text-slate-200 hover:text-primary hover:bg-blue-50 dark:hover:bg-slate-800 justify-start gap-3"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="ml-6">Chuyển đổi giao diện</span>
                  </Button>
                  <SheetClose asChild>
                    <Button className="w-full">Liên hệ</Button>
                  </SheetClose>
                  {user ? (
                    <div className="flex flex-col gap-2 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={(user.photoURL || "").trim()} alt={user.displayName || "User"} />
                          <AvatarFallback>
                            {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {user.displayName || user.email}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full text-slate-700 hover:text-primary hover:bg-blue-50 justify-start gap-3"
                        onClick={handleSignOut}
                      >
                        <LogOut size={20} />
                        Đăng xuất
                      </Button>
                    </div>
                  ) : (
                    <SheetClose asChild>
                      <Link href="/login">
                        <Button
                          variant="ghost"
                          className="w-full text-slate-700 hover:text-primary hover:bg-blue-50"
                        >
                          Đăng nhập
                        </Button>
                      </Link>
                    </SheetClose>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
