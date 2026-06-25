import Banner from "@/components/Banner";
import Features from "@/components/Home/Features";
import TechStack from "@/components/Home/TechStack";
import CallToAction from "@/components/Home/CallToAction";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
      <Banner />
      <Features />
      <TechStack />
      <CallToAction />
    </div>
  );
}
