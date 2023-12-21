import { Outlet } from "react-router-dom";
import Footer from "@components/Footer";

export default function Root() {
  return (
    <div className="grid min-h-[100svh] grid-rows-[1fr_auto] items-center justify-center bg-slate-900 p-4 text-center text-neutral-100">
      <Outlet />
      <Footer />
    </div>
  );
}
