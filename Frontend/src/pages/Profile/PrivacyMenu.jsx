import { ArrowLeft, Key, ShieldAlert, Smartphone, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function PrivacyMenu({ onBack }) {
  return (
    <div className="absolute right-0 top-0 h-full w-full bg-slate-900 z-10 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-4 bg-slate-900/80">
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>

        <h2 className="text-lg font-semibold text-white tracking-wide">
          Privacy & Security
        </h2>
      </div>

      {/* Options List */}
      <div className="p-5 space-y-1 flex-1 overflow-y-auto">
        <Link
          to="/change-password"
          className="flex w-full items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all group"
        >
          <Key className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
          <span>Change Password</span>
        </Link>

        <Link
          to="/active-sessions"
          className="flex w-full items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all"
        >
          <Smartphone className="w-4 h-4 text-slate-400" />
          <span>Active Sessions</span>
        </Link>

        <Link
          to="/two-factor-auth"
          className="flex w-full items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all"
        >
          <ShieldAlert className="w-4 h-4 text-slate-400" />
          <span>Two Factor Authentication</span>
        </Link>

      </div>
    </div>
  );
}

export default PrivacyMenu;