"use client";
import dynamic from "next/dynamic";

const SettingsComponents = dynamic(
  () => import("@/components/SettingsComponents"),
  { ssr: false },
);

const page = () => {
  return (
    <div className="min-h-screen">
      <SettingsComponents />
    </div>
  );
};

export default page;
