import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import NexoraLogo from "../../assets/company/logo/nexora-logo.svg";
import Footer from "../../components/layout/Footer";

function Login() {

    const navigate = useNavigate();

    const { loadUser } = useAuth();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = await loginUser(formData);

            await loadUser();

            toast.success(data.message);

            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-bg relative min-h-screen w-full flex flex-col overflow-hidden">

            {/* Background Glow */}
            <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-[140px]" />
            <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-violet-600/20 blur-[160px]" />

            {/* Logo */}
           <header className="relative z-20 mx-auto flex w-full  px-5 py-6">
                <Link to="/" className="flex w-fit items-center gap-3">

                     <img src={NexoraLogo} alt="Nexora" className="h-16 w-16 shrink-0" />
                    

                    <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        Nexora
                    </span>

                </Link>
            </header>

            {/* Login Section */}
            <main className="relative z-10 flex flex-1 w-full items-center justify-center px-6 py-10">

                <div
                    className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-md"
                >
                    <h1 className="text-center text-4xl font-extrabold text-white">
                        Welcome Back 👋
                    </h1>

                    <p className="mt-3 mb-8 text-center text-slate-400">
                        Login to continue your career journey with Nexora.
                    </p>

                    <form
                        className="space-y-5"
                        onSubmit={handleSubmit}
                    >

                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />

                        <div className="flex items-center justify-between text-sm">

                            <label className="flex items-center gap-2 text-slate-300">
                                <input type="checkbox" />
                                Remember me
                            </label>

                            <Link
                                to="/forgot-password"
                                className="text-blue-400 hover:underline"
                            >
                                Forgot Password?
                            </Link>

                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </Button>

                    </form>

                    <p className="mt-6 text-center text-slate-400">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-blue-400 hover:underline"
                        >
                            Create Account
                        </Link>
                    </p>

                </div>

            </main>

            {/* Footer */}
            <Footer />

        </div>
    );
}

export default Login;