"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import { UserCircle, ShieldCheck, Bell, Palette, Moon, Sun, Save, Copy, Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function SettingsComponents() {
  const { user, dbUser, signOut, refetchUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [showProfile, setShowProfile] = useState(true);
  const [showCertificates, setShowCertificates] = useState(true);
  const [showSpaces, setShowSpaces] = useState(true);
  const [emailNews, setEmailNews] = useState(false);
  const [avatarKey, setAvatarKey] = useState(Date.now());

  useEffect(() => {
    if (dbUser) {
      setFirstName(dbUser.full_name || "");
    }
  }, [dbUser]);

  const navItems = [
    { id: "profile", label: "Thông tin cơ bản", icon: UserCircle },
    { id: "security", label: "Thông tin tài khoản", icon: ShieldCheck },
    { id: "notifications", label: "Thông báo", icon: Bell },
    { id: "appearance", label: "Giao diện", icon: Palette },
  ];

  const profileUrl = `https://timeproof.vn/profile/${dbUser?.id || "user"}`;

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file ảnh!");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Kích thước ảnh tối đa 5MB!");
      return;
    }

    setIsUploading(true);
    try {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = async () => {
        const maxWidth = 400;
        const maxHeight = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }

        canvas.toBlob(async (blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append("avatar", blob, "avatar.jpg");
            const res = await fetch("/api/user/update", {
              method: "POST",
              body: formData,
            });
            if (res.ok) {
              await refetchUser();
              setAvatarKey(Date.now());
              toast.success("Cập nhật ảnh đại diện thành công!");
            } else {
              toast.error("Cập nhật ảnh đại diện thất bại!");
            }
            setIsUploading(false);
          }
        }, "image/jpeg", 0.8);
      };

      img.onerror = () => {
        toast.error("Không thể xử lý ảnh!");
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Cập nhật ảnh đại diện thất bại!");
      setIsUploading(false);
    }
  };
  
  const handleSaveProfile = async () => {
    if (!dbUser?.id) return;
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("full_name", firstName);
      const res = await fetch("/api/user/update", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        await refetchUser();
        toast.success("Lưu thay đổi thành công!");
      } else {
        toast.error("Lưu thay đổi thất bại!");
      }
    } catch (error) {
      toast.error("Lưu thay đổi thất bại!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error("Copy URL thất bại!");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-black">
      <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <aside className="md:col-span-1 lg:col-span-1">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                    activeTab === item.id
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          <main className="md:col-span-3 lg:col-span-4">
            {activeTab === "profile" && (
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-slate-800 p-6 md:p-8">
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="relative group">
                      <Avatar key={avatarKey} className="h-32 w-32 border-4 border-blue-100 dark:border-slate-80">
                        {(() => {
                          const baseSrc = (user?.photoURL || dbUser?.avatar || "").trim();
                          const cacheParam = dbUser?.updated_at ? `?t=${new Date(dbUser.updated_at).getTime()}` : "";
                          const src = baseSrc ? baseSrc + cacheParam : null;
                          return src ? (
                            <AvatarImage src={src} alt={firstName} />
                          ) : null;
                        })()}
                        <AvatarFallback className="text-4xl font-bold bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                          {firstName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <input
                          type="file"
                          id="avatar-upload"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                        <Button
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => document.getElementById('avatar-upload')?.click()}
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Upload className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        {firstName}
                        <span className="text-sm font-normal px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
                          Free
                        </span>
                      </h1>
                    </div>
                  </div>
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSaving ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Lưu thay đổi
                  </Button>
                </div>

                <Separator className="my-8" />

                <div className="mb-8 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                        Nâng cấp lên Plus
                      </h3>
                      <p className="text-purple-600 dark:text-purple-400 text-sm mt-1">
                        Không quảng cáo, tập trung hơn, và nhiều tính năng hay khác.
                      </p>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Nâng cấp lên Plus
                    </Button>
                  </div>
                </div>

                <div className="space-y-8">
                  <section>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                      Thông tin cơ bản
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <Label className="text-slate-700 dark:text-slate-300">Biệt danh TimeProof</Label>
                        <Input
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                          placeholder="Nhập biệt danh TimeProof của bạn"
                          className="mt-2"
                        />
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                          Biệt danh của bạn sẽ xuất hiện trên League và hiển thị cho mọi người.
                        </p>
                      </div>

                      <div>
                        <Label className="text-slate-700 dark:text-slate-300">URL hồ sơ</Label>
                        <div className="flex gap-2 mt-2">
                          <Input value={profileUrl} disabled />
                          <Button
                            onClick={handleCopyUrl}
                            className={`${isCopied ? "bg-green-600" : "bg-green-600 hover:bg-green-700"} text-white`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Đã sao chép
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 mr-2" />
                                Sao chép link
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <Switch id="show-profile" checked={showProfile} onCheckedChange={setShowProfile} />
                          <Label htmlFor="show-profile" className="text-slate-700 dark:text-slate-300 font-medium">
                            Hiển thị hồ sơ
                          </Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <Switch id="show-certificates" checked={showCertificates} onCheckedChange={setShowCertificates} />
                          <div>
                            <Label htmlFor="show-certificates" className="text-slate-700 dark:text-slate-300 font-medium">
                              Hiển thị Chứng chỉ trong Hồ sơ
                            </Label>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                              Hiển thị các chứng chỉ bạn đã kiếm được trên hồ sơ TimeProof của mình.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Switch id="show-spaces" checked={showSpaces} onCheckedChange={setShowSpaces} />
                          <div>
                            <Label htmlFor="show-spaces" className="text-slate-700 dark:text-slate-300 font-medium">
                              Hiển thị Spaces trong Hồ sơ
                            </Label>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                              Hiển thị các spaces bạn đã tạo trên hồ sơ TimeProof của mình.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <Separator />

                  <section>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                      Thông tin tài khoản
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label className="text-slate-700 dark:text-slate-300">
                          Họ <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="mt-2"
                        />
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                          Tên bạn nhập ở đây sẽ xuất hiện trên chứng chỉ của bạn.
                        </p>
                      </div>
                      <div>
                        <Label className="text-slate-700 dark:text-slate-300">
                          Tên đệm <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label className="text-slate-700 dark:text-slate-300">
                        Email <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        value={dbUser?.email || ""}
                        disabled
                        className="mt-2"
                      />
                      <div className="mt-2 p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-slate-700 dark:text-slate-300 font-medium">
                          Email được quản lý bởi tài khoản Google của bạn.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-8">
                      <input
                        type="checkbox"
                        id="email-news"
                        checked={emailNews}
                        onChange={(e) => setEmailNews(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="email-news" className="text-slate-700 dark:text-slate-300">
                        Gửi email cho tôi về tin tức và cập nhật
                      </Label>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                        Mật khẩu
                      </h3>
                      <Button variant="outline" className="border-slate-300 dark:border-slate-700">
                        Đặt lại mật khẩu
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">
                        Xóa tài khoản
                      </h3>
                      <Button
                        variant="destructive"
                        className="border-red-600 bg-transparent text-red-600 hover:bg-red-600 hover:text-white"
                      >
                        Xóa tài khoản của tôi
                      </Button>
                    </div>
                  </section>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-slate-800 p-6 md:p-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Thông tin tài khoản
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Cài đặt bảo mật sẽ sớm có sẵn.
                </p>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-slate-800 p-6 md:p-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Thông báo
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Cài đặt thông báo sẽ sớm có sẵn.
                </p>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-slate-800 p-6 md:p-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Giao diện
                </h1>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {theme === "dark" ? (
                      <Moon className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                    ) : (
                      <Sun className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                    )}
                    <div>
                      <Label className="text-sm font-medium text-slate-900 dark:text-white">
                        Chế độ tối
                      </Label>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Chuyển đổi giữa chế độ sáng và tối
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
