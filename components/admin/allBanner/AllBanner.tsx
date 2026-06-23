"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Users,
  Settings,
  Home,
  LogOut,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
  link: string;
  createdAt: Date;
}

export default function AllBanner() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { signOut } = useAuth();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success("Đã chọn ảnh");
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar>
        <SidebarHeader className="flex items-center gap-2 p-4">
          <div className="flex items-center gap-2 font-bold text-lg">
            <LayoutDashboard />
            <span>TimeProof</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "14px",
                fontWeight: "bold",
                fontStyle: "bold",
                lineHeight: 1.6,
                letterSpacing: "0.01em",
              }}
            >
              Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href="/dashboard/admin"
                      className="flex items-center gap-2"
                    >
                      <LayoutDashboard />
                      <span>Tổng quan</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <DropdownMenuSeparator />
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/" className="flex items-center gap-2">
                      <Home />
                      <span>Trang chủ</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <DropdownMenuSeparator />
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings />
                      <span>Cài đặt</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <DropdownMenuSeparator />
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive>
                    <Link
                      href="/dashboard/admin/banner"
                      className="flex items-center gap-2"
                    >
                      <ImageIcon />
                      <span>Banner</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild onClick={signOut}>
                <button className="flex items-center gap-2 w-full">
                  <LogOut />
                  <span>Đăng xuất</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col w-full overflow-hidden">
        <header className="flex h-14 sm:h-16 items-center gap-2 sm:gap-4 px-3 sm:px-4 md:px-8 border-b bg-background sticky top-0 z-10 shrink-0">
          <SidebarTrigger />
          <h1 className="text-base sm:text-lg md:text-2xl font-bold truncate flex-1">
            Quản lý Banner
          </h1>
        </header>
        <div className="flex-1 p-3 md:p-8 lg:p-12 w-full overflow-y-auto">
          <div className="flex flex-col gap-6 w-full max-w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 w-full">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Danh sách Banner
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Quản lý các banner hiển thị trên trang chủ
                </p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="size-4" />
                <span className="text-sm md:text-base">Thêm banner mới</span>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
              {banners.length === 0 ? (
                <Card className="md:col-span-2 lg:col-span-3 xl:col-span-4 w-full">
                  <CardContent className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20">
                    <ImageIcon className="size-12 md:size-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-sm md:text-base">
                      Chưa có banner nào
                    </p>
                  </CardContent>
                </Card>
              ) : (
                banners.map((banner) => (
                  <Card
                    key={banner.id}
                    className="transition-all duration-200 hover:shadow-md w-full"
                  >
                    <div className="relative">
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        {banner.image ? (
                          <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="size-12 text-muted-foreground" />
                        )}
                      </div>
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8"
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          className="h-8 w-8"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm md:text-base">
                          {banner.title}
                        </CardTitle>
                        <Switch checked={banner.isActive} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                        {banner.description}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            <Card className="transition-all duration-200 hover:shadow-md w-full">
              <CardHeader>
                <CardTitle className="text-sm md:text-lg">
                  Thêm banner mới
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="banner-title"
                    className="text-sm md:text-base"
                  >
                    Tiêu đề
                  </Label>
                  <Input
                    id="banner-title"
                    placeholder="Nhập tiêu đề banner"
                    className="text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="banner-description"
                    className="text-sm md:text-base"
                  >
                    Mô tả
                  </Label>
                  <Textarea
                    id="banner-description"
                    placeholder="Nhập mô tả banner"
                    className="text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banner-link" className="text-sm md:text-base">
                    Liên kết
                  </Label>
                  <Input
                    id="banner-link"
                    placeholder="Nhập liên kết banner"
                    className="text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="banner-image"
                    className="text-sm md:text-base"
                  >
                    Hình ảnh
                  </Label>
                  <div className="border-2 border-dashed rounded-lg p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center gap-2">
                    <ImageIcon className="size-8 md:size-10 text-muted-foreground" />
                    <input
                      type="file"
                      id="banner-image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      variant="secondary"
                      onClick={() =>
                        document.getElementById("banner-image")?.click()
                      }
                    >
                      Chọn ảnh
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="banner-active" defaultChecked />
                  <Label
                    htmlFor="banner-active"
                    className="text-sm md:text-base"
                  >
                    Kích hoạt banner
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Button
                    disabled={isUploading}
                    className="text-sm md:text-base"
                  >
                    {isUploading ? "Đang tải..." : "Lưu banner"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}
