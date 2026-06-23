"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { User } from "@/model/user";
import { Check, X, LayoutDashboard, Users, Settings, Home, LogOut, TrendingUp } from "lucide-react";
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts";

const roleColors = {
  admin: "#3b82f6",
  seller: "#10b981",
  customer: "#f59e0b"
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        toast.error("Không thể tải danh sách người dùng");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId: number) => {
    try {
      const res = await fetch(`/api/admin/active/${userId}`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: data.data.status } : u));
        toast.success("Cập nhật trạng thái thành công");
      } else {
        toast.error("Không thể cập nhật trạng thái");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi cập nhật");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const statusData = [
    { name: "Hoạt động", value: users.filter(u => u.status).length, fill: "#10b981" },
    { name: "Ngưng hoạt động", value: users.filter(u => !u.status).length, fill: "#ef4444" }
  ];

  const roleData = [
    { name: "Admin", value: users.filter(u => u.role === "admin").length, fill: roleColors.admin },
    { name: "Seller", value: users.filter(u => u.role === "seller").length, fill: roleColors.seller },
    { name: "Customer", value: users.filter(u => u.role === "customer").length, fill: roleColors.customer }
  ];

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
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive>
                    <Link href="/dashboard/admin" className="flex items-center gap-2">
                      <LayoutDashboard />
                      <span>Tổng quan</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/" className="flex items-center gap-2">
                      <Home />
                      <span>Trang chủ</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings />
                      <span>Cài đặt</span>
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
          <h1 className="text-base sm:text-lg md:text-2xl font-bold truncate flex-1">Dashboard Admin</h1>
          <div className="shrink-0">
            <Button onClick={fetchUsers} disabled={loading} size="sm">
              {loading && <Spinner className="size-4 mr-1" />}
              <span className="hidden sm:inline">Tải lại</span>
              <span className="sm:hidden">Tải</span>
            </Button>
          </div>
        </header>
        <div className="flex-1 p-3 md:p-8 lg:p-12 w-full overflow-y-auto">
          <div className="grid grid-cols-1 gap-3 md:gap-6 mb-6 md:mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              <Card className="transition-all duration-200 hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium text-gray-500">Tổng người dùng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold">{users.length}</div>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium text-gray-500">Người dùng hoạt động</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-600">{users.filter(u => u.status).length}</div>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium text-gray-500">Người dùng bị khóa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-600">{users.filter(u => !u.status).length}</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-8">
            <Card className="transition-all duration-200 hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm md:text-lg">
                  <TrendingUp className="size-4 md:size-6" />
                  Thống kê trạng thái người dùng
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 md:p-6">
                <ChartContainer config={{}} className="h-48 md:h-72 lg:h-80 w-full">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="transition-all duration-200 hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm md:text-lg">
                  <Users className="size-4 md:size-6" />
                  Thống kê vai trò người dùng
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 md:p-6">
                <ChartContainer config={{}} className="h-48 md:h-72 lg:h-80 w-full">
                  <BarChart data={roleData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{fontSize: 10}} />
                    <YAxis tick={{fontSize: 10}} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {roleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="transition-all duration-200 hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm md:text-lg">
                <Users className="size-4 md:size-6" />
                Danh sách người dùng
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex justify-center py-12">
                  <Spinner className="size-10 md:size-12" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs md:text-sm whitespace-nowrap">ID</TableHead>
                        <TableHead className="text-xs md:text-sm whitespace-nowrap">Họ tên</TableHead>
                        <TableHead className="text-xs md:text-sm whitespace-nowrap">Email</TableHead>
                        <TableHead className="text-xs md:text-sm whitespace-nowrap">Vai trò</TableHead>
                        <TableHead className="text-xs md:text-sm whitespace-nowrap">Trạng thái</TableHead>
                        <TableHead className="text-xs md:text-sm whitespace-nowrap">Hành động</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map(user => (
                        <TableRow key={user.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <TableCell className="text-xs md:text-sm whitespace-nowrap">{user.id}</TableCell>
                          <TableCell className="text-xs md:text-sm whitespace-nowrap">{user.full_name}</TableCell>
                          <TableCell className="text-xs md:text-sm max-w-[100px] sm:max-w-[150px] truncate">{user.email}</TableCell>
                          <TableCell>
                            <Badge
                              style={{ backgroundColor: roleColors[user.role as keyof typeof roleColors] }}
                              className="text-white text-xs md:text-sm whitespace-nowrap"
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status ? "default" : "destructive"} className="text-xs md:text-sm whitespace-nowrap">
                              {user.status ? "Hoạt động" : "Ngưng Hoạt Động"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="icon" onClick={() => toggleUserStatus(user.id)} className="transition-all duration-200 hover:scale-105 shrink-0">
                              {user.status ? <X className="size-4" /> : <Check className="size-4" />}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </div>
  );
}
