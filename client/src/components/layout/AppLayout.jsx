import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

export default function AppLayout() {
  return (
    <div className="relative flex min-h-dvh text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-slate-950" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 60% at 50% -30%, rgb(99 102 241 / 0.32), transparent 55%), radial-gradient(ellipse 55% 45% at 100% 100%, rgb(56 189 248 / 0.14), transparent), radial-gradient(ellipse 45% 40% at 0% 85%, rgb(99 102 241 / 0.1), transparent)",
        }}
        aria-hidden
      />
      <Sidebar />
      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
