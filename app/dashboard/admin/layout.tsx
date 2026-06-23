"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { dbUser, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!dbUser) {
        router.push("/login");
      } else if (dbUser.role !== "admin") {
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    }
  }, [dbUser, loading, router]);

  useEffect(() => {
    const footer = document.querySelector('footer');
    const contactFloating = document.querySelector('[class*="ContactFloating"]');
    if (footer) (footer as HTMLElement).style.display = 'none';
    if (contactFloating) (contactFloating as HTMLElement).style.display = 'none';
    return () => {
      if (footer) (footer as HTMLElement).style.display = '';
      if (contactFloating) (contactFloating as HTMLElement).style.display = '';
    };
  }, []);

  if (loading || isAuthorized === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Spinner className="size-12" />
        <p className="text-lg">Đang kiểm tra quyền truy cập...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 text-center">
        <Card className="max-w-md w-full p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Truy cập bị từ chối</h2>
          <p className="text-gray-600 mb-6">Bạn không có quyền truy cập trang quản trị</p>
          <div className="flex gap-3 justify-center">
            <Button variant="default" onClick={() => router.push("/")}>Về trang chủ</Button>
          </div>
        </Card>
      </div>
    );
  }

  return <div className="min-h-screen">{children}</div>;
}
