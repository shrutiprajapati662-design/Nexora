import { ArrowLeft, Sun, Moon, Laptop } from "lucide-react";
import { useState } from "react";

function AppearanceMenu({ onBack }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  const applyTheme = (value) => {
    document.body.classList.remove("light-theme", "dark-theme");
    const resolved = value === "light" ? "light-theme" : "dark-theme";
    document.body.classList.add(resolved);

    // Tailwind ke dark: classes ko bhi humare apne theme ke sath sync karo
    document.documentElement.classList.toggle("dark", resolved === "dark-theme");

    localStorage.setItem("theme", value);
  };

  const changeTheme = (value) => {
    setTheme(value);
    applyTheme(value);
  };

  return (
    <div className="absolute right-0 top-0 h-full w-full bg-slate-900 z-10 flex flex-col">

      <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-4 bg-slate-900/80">
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-lg font-semibold text-white tracking-wide">
          Appearance
        </h2>
      </div>

      <div className="p-5 space-y-3 flex-1 overflow-y-auto">

        <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-800/80 hover:border-slate-700/60 transition-all cursor-pointer">
          <div className="flex items-center gap-3">
            <Sun className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-slate-200">Light</span>
          </div>
          <input
            type="radio"
            name="theme"
            checked={theme === "light"}
            onChange={() => changeTheme("light")}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-800/80 hover:border-slate-700/60 transition-all cursor-pointer">
          <div className="flex items-center gap-3">
            <Moon className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-slate-200">Dark</span>
          </div>
          <input
            type="radio"
            name="theme"
            checked={theme === "dark"}
            onChange={() => changeTheme("dark")}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-800/80 hover:border-slate-700/60 transition-all cursor-pointer">
          <div className="flex items-center gap-3">
            <Laptop className="w-4 h-4 text-sky-400" />
            <span className="text-sm font-medium text-slate-200">System</span>
          </div>
          <input
            type="radio"
            name="theme"
            checked={theme === "system"}
            onChange={() => changeTheme("system")}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
        </label>

      </div>
    </div>
  );
}

export default AppearanceMenu;