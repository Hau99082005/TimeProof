"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { User } from "@/model/user";
import { Check, X } from "lucide-react";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-6 md:p-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard Admin</h1>
        <Button onClick={fetchUsers} disabled={loading}>
          {loading && <Spinner className="size-4 mr-2" />}
          Tải lại
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Tổng người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Người dùng hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{users.filter(u => u.status).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Người dùng bị khóa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{users.filter(u => !u.status).length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner className="size-12" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.full_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status ? "default" : "destructive"}>
                        {user.status ? "Hoạt động" : "Ngưng Hoạt Động"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="icon" onClick={() => toggleUserStatus(user.id)}>
                        {user.status ? <X className="size-4" /> : <Check className="size-4" />}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
