import NexoraLogo from "../../assets/company/logo/nexora-logo.svg";

import { NavLink, useNavigate, Link } from "react-router-dom";
import {
    Menu, X, Bell,
    ChevronDown,
    User,
} from "lucide-react";  //mobile hamburger icon
import { useState, useEffect, useRef } from "react";  //mobile menu open/close
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../api/authApi";
import ProfileDrawer from "../../pages/Profile/ProfileDrawer";
import NotificationMenu from "../../pages/Profile/NotificationMenu";


function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);


    const [profileOpen, setProfileOpen] = useState(false);
    const dashboardRef = useRef(null);

    const { user, setUser } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();

            setUser(null);
            setMenuOpen(false);

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dashboardRef.current &&
                !dashboardRef.current.contains(event.target)
            ) {
                setShowDashboard(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <>
            <nav className="relative z-50 flex items-center justify-between border-b border-slate-800 px-8 py-5">
                <NavLink
                    to="/"
                    className="flex items-center gap-2.5"
                >
                    <img src={NexoraLogo} alt="Nexora" className="h-16 w-16 shrink-0" />

                    <span className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        Nexora
                    </span>
                </NavLink>

                <div className="hidden items-center gap-6 md:flex">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-500 font-semibold"
                                : "text-slate-200 hover:text-blue-400"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/jobs"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-500 font-semibold"
                                : "text-slate-200 hover:text-blue-400"
                        }
                    >
                        Jobs
                    </NavLink>

                    {user ? (
                        <>
                            <NavLink
                                to="/companies"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-500 font-semibold"
                                        : "text-slate-200 hover:text-blue-400"
                                }
                            >
                                Companies
                            </NavLink>

                            <div
                                ref={dashboardRef}
                                className="relative z-50">

                                <button
                                    onClick={() => {
                                        setShowDashboard(!showDashboard);
                                        setShowNotifications(false);
                                    }}
                                    className="flex items-center gap-1 text-slate-200 hover:text-blue-400"
                                >
                                    Dashboard
                                    <ChevronDown size={16} />
                                </button>

                                {showDashboard && (
                                    <div className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">

                                        <Link
                                            to="/recruiter/dashboard"
                                            onClick={() => setShowDashboard(false)}
                                            className="block px-5 py-3 transition-colors duration-200 hover:bg-slate-800"
                                        >
                                            Recruiter Dashboard
                                        </Link>

                                        <Link
                                            to="/dashboard"
                                            onClick={() => setShowDashboard(false)}
                                            className="block px-5 py-3 transition-colors duration-200 hover:bg-slate-800"
                                        >
                                            Admin Dashboard
                                        </Link>

                                        <Link
                                            to="/recruiter/my-jobs"
                                            onClick={() => setShowDashboard(false)}
                                            className="block rounded-b-xl px-5 py-3 transition-colors duration-200 hover:bg-slate-800"
                                        >
                                            My Jobs
                                        </Link>

                                    </div>
                                )}

                            </div>

                            <div className="relative">

                                <button
                                    onClick={() => {
                                        setProfileOpen(false);
                                        setShowDashboard(false);
                                        setShowNotifications(true);
                                    }}
                                    className="rounded-full p-2 text-white transition hover:bg-slate-800 hover:text-blue-400"
                                >
                                    <div className="relative">

                                        <Bell size={20} />

                                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                            2
                                        </span>

                                    </div>
                                </button>

                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setProfileOpen(true);
                                        setShowDashboard(false);
                                        setShowNotifications(false);
                                    }}
                                    className="flex items-center gap-2 font-semibold text-blue-400 hover:text-blue-300"
                                >
                                    <img
                                        src={user?.profilePhoto || "/default-avatar.png"}
                                        alt="Profile"
                                        className="h-9 w-9 rounded-full object-cover border border-slate-700"
                                    />
                                    <span>{user.name}</span>
                                </button>



                            </div>



                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-500 font-semibold"
                                        : "text-slate-200 hover:text-blue-400"
                                }
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-500 font-semibold"
                                        : "text-slate-200 hover:text-blue-400"
                                }
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>
            {menuOpen && (
                <div className="flex flex-col gap-4 border-b border-slate-800 bg-slate-900 px-8 py-5 md:hidden">

                    <NavLink
                        to="/"
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/jobs"
                        onClick={() => setMenuOpen(false)}
                    >
                        Jobs
                    </NavLink>

                    {user ? (
                        <>
                            <NavLink
                                to="/companies"
                                onClick={() => setMenuOpen(false)}
                            >
                                Companies
                            </NavLink>

                            <NavLink
                                to="/dashboard"
                                onClick={() => setMenuOpen(false)}
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/profile"
                                onClick={() => setMenuOpen(false)}
                            >
                                {user.name}
                            </NavLink>

                            <button
                                onClick={handleLogout}
                                className="rounded-lg bg-red-500 px-4 py-2 text-white"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                onClick={() => setMenuOpen(false)}
                            >
                                Register
                            </NavLink>
                        </>
                    )}

                </div>
            )}

            <ProfileDrawer
                isOpen={profileOpen}
                onClose={() => setProfileOpen(false)}
                user={user}
                onLogout={handleLogout}
            />

            {showNotifications && (

                <div className="fixed inset-0 z-[70]">

                    {/* Background */}

                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowNotifications(false)}
                    />

                    {/* Drawer */}

                    <div className="absolute right-0 top-0 h-full w-[420px] max-w-full bg-slate-900 shadow-2xl">

                        <NotificationMenu
                            onBack={() => setShowNotifications(false)}
                        />

                    </div>

                </div>

            )}
        </>
    );
}

export default Navbar;