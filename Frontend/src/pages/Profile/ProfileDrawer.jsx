import AppearanceMenu from "./AppearanceMenu";
import PrivacyMenu from "./PrivacyMenu";
import NotificationMenu from "./NotificationMenu";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
    X,
    User,

    Bookmark,
    Briefcase,
    Palette,
    ShieldCheck,
    Bell,
    HelpCircle,
    Info,
    LogOut,
    ChevronRight
} from "lucide-react";

function ProfileDrawer({
    isOpen,
    onClose,
    user,
    onLogout,
}) {
    const [showAppearance, setShowAppearance] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            />

            {/* Drawer */}
            <div
    className={`fixed right-0 top-0 z-50 h-screen w-full sm:w-[380px]
    bg-white dark:bg-slate-900
    border-l border-slate-200 dark:border-slate-800
    shadow-2xl
    transition-transform duration-300 ease-out
    flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
    }`}
>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 bg-white dark:bg-slate-900/80">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white tracking-wide">
                        Account
                    </h2>

                    <button
    onClick={onClose}
    className="p-1.5 rounded-lg
    text-slate-500 dark:text-slate-400
    hover:bg-slate-100 dark:hover:bg-slate-800
    hover:text-blue-600 dark:hover:text-white
    transition-colors"
>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto p-5 space-y-5
scrollbar-thin
scrollbar-thumb-slate-300
dark:scrollbar-thumb-slate-700
scrollbar-track-slate-100
dark:scrollbar-track-slate-900">
                    {/* User Card */}
                    <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
                        <img
                            src={user?.profilePhoto || "/default-avatar.png"}
                            alt="Profile"
                            className="h-12 w-12 rounded-full border border-slate-700 object-cover"
                        />

                        <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-semibold text-white truncate">
                                {user?.name}
                            </h3>
                            <p className="text-xs text-slate-400 truncate">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    {!showAppearance && !showPrivacy && !showNotification && (
                        <div className="space-y-1">
                            <Link
                                to="/profile"
                                onClick={onClose}
                                className="flex items-center gap-3 px-6 py-3 text-white hover:bg-slate-800"
                            >
                                <User size={18} />
                                <span>My Profile</span>
                            </Link>



                            <Link
                                to="/saved-jobs"
                                onClick={onClose}
                                className="flex items-center gap-3 px-6 py-3 text-white hover:bg-slate-800"
                            >
                                <Bookmark size={18} />
                                <span>Saved Jobs</span>
                            </Link>
                            <Link
                                to="/applications"
                                onClick={onClose}
                                className="flex items-center gap-3 px-6 py-3 text-white hover:bg-slate-800"
                            >
                                <Briefcase size={18} />
                                <span>My Applications</span>
                            </Link>
                            <div className="my-2 border-t border-slate-800/80" />

                            <button
                                onClick={() => {
                                    setShowAppearance(true);
                                    setShowPrivacy(false);
                                    setShowNotification(false);
                                }}
                                className="flex w-full items-center justify-between px-6 py-3 text-white hover:bg-slate-800"
                            >
                                <div className="flex items-center gap-3">
                                    <Palette size={18} />
                                    <span>Appearance</span>
                                </div>

                                <ChevronRight size={18} />
                            </button>

                            <button
                                onClick={() => setShowPrivacy(true)}
                                className="flex w-full items-center justify-between px-3.5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                                    <span>Privacy & Security</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-transform group-hover:translate-x-0.5" />
                            </button>



                            <div className="my-2 border-t border-slate-800/80" />

                            <Link
                                to="/help-support"
                                onClick={onClose}
                                className="group flex w-full items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all"
                            >
                                <HelpCircle className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                                <span>Help & Support</span>
                            </Link>

                            <Link
                                to="/about"
                                onClick={onClose}
                                className="group flex w-full items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all"
                            >
                                <Info className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                                <span>About Nexora</span>
                            </Link>

                            <div className="my-2 border-t border-slate-800/80" />

                            <button
                                onClick={onLogout}
                                className="flex w-full items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-xl transition-all"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}

                    {showAppearance && (
                        <AppearanceMenu
                            onBack={() => setShowAppearance(false)}
                        />
                    )}

                    {showPrivacy && (
                        <PrivacyMenu
                            onBack={() => setShowPrivacy(false)}
                        />
                    )}

                    {showNotification && (
                        <NotificationMenu
                            onBack={() => setShowNotification(false)}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default ProfileDrawer;