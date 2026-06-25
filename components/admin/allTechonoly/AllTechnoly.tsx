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
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit,
  Upload,
  X,
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
import { Technology } from "@/model/technology";
import {
  fetchTechnologies,
  fetchCategories,
  createTechnology,
  updateTechnology,
  deleteTechnology,
} from "@/lib/reduxslice/technologySlice";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const AllTechnoly = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { technologies, categories, isLoading, isUploading } = useSelector(
    (state: RootState) => state.technology,
  );
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<string>("");
  const [editingTech, setEditingTech] = useState<Technology | null>(null);
  const [editName, setEditName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<string>("");
  const [editSelectedFile, setEditSelectedFile] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { signOut } = useAuth();

  useEffect(() => {
    dispatch(fetchTechnologies());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Tính toán phân trang
  const totalPages = Math.ceil(technologies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTechnologies = technologies.slice(startIndex, endIndex);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (categoryId) {
        formData.append("category_id", categoryId);
      }
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      await dispatch(createTechnology(formData)).unwrap();
      toast.success("Tạo công nghệ thành công!");
      setName("");
      setCategoryId("");
      setSelectedFile(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Không thể tạo công nghệ";
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa công nghệ này?")) {
      return;
    }

    try {
      await dispatch(deleteTechnology(id)).unwrap();
      toast.success("Xóa công nghệ thành công!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Không thể xóa công nghệ";
      toast.error(errorMessage);
    }
  };

  const handleEdit = (tech: Technology) => {
    setEditingTech(tech);
    setEditName(tech.name);
    setEditCategoryId(tech.category_id ? tech.category_id.toString() : "");
    setEditSelectedFile(null);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingTech) return;

    try {
      const formData = new FormData();
      formData.append("name", editName);
      if (editCategoryId) {
        formData.append("category_id", editCategoryId);
      }
      if (editSelectedFile) {
        formData.append("image", editSelectedFile);
      }

      await dispatch(
        updateTechnology({ id: editingTech.id, formData }),
      ).unwrap();
      toast.success("Cập nhật công nghệ thành công!");
      setEditingTech(null);
      setEditName("");
      setEditCategoryId("");
      setEditSelectedFile(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Không thể cập nhật công nghệ";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    dispatch(fetchTechnologies());
  }, [dispatch]);

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
            Quản lý Công nghệ
          </h1>
        </header>
        <div className="flex-1 p-3 md:p-8 lg:p-12 w-full overflow-y-auto">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 w-full">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Danh sách Công nghệ
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Quản lý các công nghệ{" "}
                  <span className="font-semibold text-white-900">
                    ({technologies.length})
                  </span>
                </p>
              </div>
              <Button
                onClick={() => dispatch(fetchTechnologies())}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Plus className="size-4" />
                )}
                <span className="text-sm md:text-base">
                  {isLoading ? "Đang tải..." : "Tải lại"}
                </span>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
              {isLoading ? (
                <div className="col-span-full flex justify-center py-12">
                  <div className="size-10 border-4 border-current border-t-transparent rounded-full animate-spin" />
                </div>
              ) : currentTechnologies.length === 0 ? (
                <Card className="md:col-span-2 lg:col-span-3 w-full">
                  <CardContent className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20">
                    <ImageIcon className="size-12 md:size-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-sm md:text-base">
                      Chưa có công nghệ nào
                    </p>
                  </CardContent>
                </Card>
              ) : (
                currentTechnologies.map((tech) => (
                  <Card
                    key={tech.id}
                    className="transition-all duration-200 hover:shadow-md w-full"
                    style={{
                      borderRadius: "8px",
                    }}
                  >
                    <div className="relative">
                      <div className="aspect-video bg-muted flex items-center justify-center0 border-b-2">
                        {tech.images ? (
                          <img
                            src={tech.images}
                            alt={tech.name}
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
                          onClick={() => handleEdit(tech)}
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          className="h-8 w-8"
                          onClick={() => handleDelete(tech.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm md:text-base">
                          {tech.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    Hiển thị {startIndex + 1} -{" "}
                    {Math.min(endIndex, technologies.length)} của{" "}
                    {technologies.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Trang trước</span>
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
                          variant={currentPage === page ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ),
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <span className="sr-only">Trang sau</span>
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

            <Card className="transition-all duration-200 hover:shadow-md w-full">
              <CardHeader>
                <CardTitle className="text-sm md:text-lg">
                  Thêm công nghệ mới
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="tech-name" className="text-sm md:text-base">
                      Tên công nghệ
                    </Label>
                    <Input
                      id="tech-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập tên công nghệ"
                      className="text-sm md:text-base"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="tech-category"
                      className="text-sm md:text-base"
                    >
                      Danh mục
                    </Label>
                    <select
                      id="tech-category"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm md:text-base"
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="tech-image"
                      className="text-sm md:text-base"
                    >
                      Hình ảnh
                    </Label>
                    <div className="border-2 border-dashed rounded-lg p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center gap-2">
                      {selectedFile ? (
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Preview"
                            className="max-h-40 object-contain"
                          />
                          <p className="text-sm text-muted-foreground">
                            {selectedFile.name}
                          </p>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => setSelectedFile(null)}
                          >
                            Xóa ảnh
                          </Button>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="size-8 md:size-10 text-muted-foreground" />
                          <input
                            type="file"
                            id="tech-image"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setSelectedFile(file);
                                const fileName = file.name.replace(
                                  /\.[^/.]+$/,
                                  "",
                                );
                                setName(fileName);
                              }
                            }}
                            className="hidden"
                          />
                          <Button
                            variant="secondary"
                            type="button"
                            onClick={() =>
                              document.getElementById("tech-image")?.click()
                            }
                            className="flex items-center gap-2"
                          >
                            <Upload className="size-4" />
                            Chọn ảnh
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={isUploading}
                      className="text-sm md:text-base"
                    >
                      {isUploading ? (
                        <>
                          <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          Đang tải...
                        </>
                      ) : (
                        "Lưu công nghệ"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>

      {editingTech && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-card rounded-xl shadow-2xl w-full max-w-md border border-border/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-border/30">
              <h3 className="text-xl font-bold">Sửa công nghệ</h3>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setEditingTech(null)}
                className="h-9 w-9 rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <X className="size-5" />
              </Button>
            </div>
            <form onSubmit={handleUpdate} className="p-6 space-y-5">
              <div className="space-y-2.5">
                <Label htmlFor="edit-name" className="text-sm font-semibold">
                  Tên công nghệ
                </Label>
                <Input
                  id="edit-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Nhập tên công nghệ"
                  required
                  className="h-11 rounded-lg border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="edit-category" className="text-sm font-semibold">
                  Danh mục
                </Label>
                <select
                  id="edit-category"
                  value={editCategoryId}
                  onChange={(e) => setEditCategoryId(e.target.value)}
                  className="w-full h-11 border border-border/50 rounded-lg px-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-background"
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="edit-image" className="text-sm font-semibold">
                  Hình ảnh
                </Label>
                <div className="border-2 border-dashed border-border/30 rounded-lg p-4 flex flex-col items-center justify-center gap-3">
                  {editSelectedFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={URL.createObjectURL(editSelectedFile)}
                        alt="Preview"
                        className="max-h-32 object-contain"
                      />
                      <p className="text-sm text-muted-foreground">
                        {editSelectedFile.name}
                      </p>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => setEditSelectedFile(null)}
                        className="rounded-lg transition-all duration-200"
                      >
                        Xóa ảnh
                      </Button>
                    </div>
                  ) : (
                    <>
                      {editingTech.images && (
                        <img
                          src={editingTech.images}
                          alt={editingTech.name}
                          className="max-h-32 object-contain"
                        />
                      )}
                      <ImageIcon className="size-8 text-muted-foreground/50" />
                      <input
                        type="file"
                        id="edit-image"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setEditSelectedFile(file);
                          }
                        }}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() =>
                          document.getElementById("edit-image")?.click()
                        }
                        className="flex items-center gap-2 rounded-lg transition-all duration-200"
                      >
                        <Upload className="size-4" />
                        Chọn ảnh mới
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingTech(null)}
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

export default AllTechnoly;
