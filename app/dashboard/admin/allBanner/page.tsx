"use client";
import dynamic from "next/dynamic";

const AllBanner = dynamic(
  () => import("@/components/admin/allBanner/AllBanner"),
  { ssr: false },
);

const page = () => {
  return (
    <div className="min-h-screen">
      <AllBanner />
    </div>
  );
};

export default page;
