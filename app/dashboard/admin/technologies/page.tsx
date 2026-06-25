"use client";
import dynamic from "next/dynamic";

const AllTechonologies = dynamic(
  () => import("@/components/admin/allTechonoly/AllTechnoly"),
  { ssr: false },
);

export default function Page() {
  return (
    <div className="min-h-screen">
      <AllTechonologies />
    </div>
  );
}
