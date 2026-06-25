"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Settings,
  Home,
  LogOut,
  Plus,
  Trash2,
  Edit,
  X,
  ImageIcon,
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
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store";
import { Category } from "@/model/technology";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/reduxslice/technologySlice";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const AllTechonologyCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, isLoading, isUploading } = useSelector(
    (state: RootState) => state.technology,
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { signOut } = useAuth();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(createCategory({ name, description })).unwrap();
      toast.success("Tạo danh mục thành công!");
      setName("");
      setDescription("");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Không thể tạo danh mục";
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa danh mục này?")) {
      return;
    }

    try {
      await dispatch(deleteCategory(id)).unwrap();
      toast.success("Xóa danh mục thành công!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Không thể xóa danh mục";
      toast.error(errorMessage);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditDescription(category.description || "");
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingCategory) return;

    try {
      await dispatch(
        updateCategory({
          id: editingCategory.id,
          categoryData: { name: editName, description: editDescription },
        }),
      ).unwrap();
      toast.success("Cập nhật danh mục thành công!");
      setEditingCategory(null);
      setEditName("");
      setEditDescription("");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Không thể cập nhật danh mục";
      toast.error(errorMessage);
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
                  <SidebarMenuButton asChild isActive>
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
                  <SidebarMenuButton asChild>
                    <Link
                      href="/dashboard/admin/allBanner"
                      className="flex items-center gap-2"
                    >
                      <ImageIcon />
                      <span>Banner</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <DropdownMenuSeparator />
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href="/dashboard/admin/technologies"
                      className="flex items-center gap-2"
                    >
                      <ImageIcon />
                      <span>Công nghệ</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <DropdownMenuSeparator />
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href="/dashboard/admin/technologiescategories"
                      className="flex items-center gap-2"
                    >
                      <ImageIcon />
                      <span>Danh mục Công nghệ</span>
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
            Quản lý Danh mục Công nghệ
          </h1>
        </header>
        <div className="flex-1 w-full overflow-y-auto bg-gradient-to-br from-background via-background to-background/50">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2 flex-1">
                <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                  Danh sách Danh mục
                </h2>
                <p className="text-muted-foreground text-base">
                  Quản lý các danh mục công nghệ{" "}
                  <span className="font-semibold text-foreground">
                    ({categories.length})
                  </span>
                </p>
              </div>
              <Button
                onClick={() => dispatch(fetchCategories())}
                disabled={isLoading}
                className="flex items-center gap-2 shrink-0 h-11 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                {isLoading ? (
                  <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Plus className="size-4" />
                )}
                <span>{isLoading ? "Đang tải..." : "Tải lại"}</span>
              </Button>
            </div>

            <div className="w-full">
              {isLoading ? (
                <div className="flex justify-center py-16">
                  <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
              ) : currentCategories.length === 0 ? (
                <div className="rounded-xl border border-dashed border-muted-foreground/30 p-12 text-center bg-muted/20 backdrop-blur-sm">
                  <LayoutDashboard className="size-14 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">
                    Chưa có danh mục nào
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {currentCategories.map((category) => (
                    <div
                      key={category.id}
                      className="group rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:bg-card"
                    >
                      <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-500" />
                        <LayoutDashboard className="size-16 text-primary/30 group-hover:text-primary/50 transition-colors duration-300" />
                      </div>
                      <div className="p-5 relative">
                        <h3 className="font-semibold text-base sm:text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-200">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {category.description}
                          </p>
                        )}
                        <div className="flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 h-9 rounded-lg transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                            onClick={() => handleEdit(category)}
                          >
                            <Edit className="size-4" />
                            <span className="ml-2">Sửa</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 h-9 rounded-lg transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                            onClick={() => handleDelete(category.id)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <div className="text-sm text-muted-foreground">
                  Hiển thị {startIndex + 1} -{" "}
                  {Math.min(endIndex, categories.length)} của{" "}
                  {categories.length}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="rounded-lg transition-all duration-200"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-10 rounded-lg transition-all duration-200"
                        >
                          {page}
                        </Button>
                      ),
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="rounded-lg transition-all duration-200"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            )}

            <Card className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl">Thêm danh mục mới</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2.5">
                      <Label
                        htmlFor="category-name"
                        className="text-sm font-semibold"
                      >
                        Tên danh mục
                      </Label>
                      <Input
                        id="category-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên danh mục"
                        required
                        className="h-11 rounded-lg border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label
                        htmlFor="category-description"
                        className="text-sm font-semibold"
                      >
                        Mô tả
                      </Label>
                      <Input
                        id="category-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Nhập mô tả (tùy chọn)"
                        className="h-11 rounded-lg border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      disabled={isUploading}
                      className="h-11 px-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      {isUploading ? (
                        <>
                          <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          Đang lưu...
                        </>
                      ) : (
                        <>
                          <Plus className="size-4 mr-2" />
                          Lưu danh mục
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>

      {editingCategory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-card rounded-xl shadow-2xl w-full max-w-md border border-border/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-border/30">
              <h3 className="text-xl font-bold">Sửa danh mục</h3>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setEditingCategory(null)}
                className="h-9 w-9 rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <X className="size-5" />
              </Button>
            </div>
            <form onSubmit={handleUpdate} className="p-6 space-y-5">
              <div className="space-y-2.5">
                <Label htmlFor="edit-name" className="text-sm font-semibold">
                  Tên danh mục
                </Label>
                <Input
                  id="edit-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Nhập tên danh mục"
                  required
                  className="h-11 rounded-lg border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
              <div className="space-y-2.5">
                <Label
                  htmlFor="edit-description"
                  className="text-sm font-semibold"
                >
                  Mô tả
                </Label>
                <Input
                  id="edit-description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Nhập mô tả"
                  className="h-11 rounded-lg border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingCategory(null)}
                  className="rounded-lg transition-all duration-200"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={isUploading}
                  className="rounded-lg transition-all duration-200"
                >
                  {isUploading ? (
                    <>
                      <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Đang cập nhật...
                    </>
                  ) : (
                    "Cập nhật"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTechonologyCategories;
