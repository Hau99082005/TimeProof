"use client";
import dynamic from "next/dynamic";

const AllTechonologyCategories = dynamic(
  () =>
    import("@/components/admin/allTechonologyCategories/AllTechonologyCategories"),
  { ssr: false },
);

export default function Page() {
  return (
    <div className="min-h-screen">
      <AllTechonologyCategories />
    </div>
  );
}
