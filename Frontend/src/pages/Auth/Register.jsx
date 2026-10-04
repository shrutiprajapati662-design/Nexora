import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { registerUser } from "../../api/authApi";
import NexoraLogo from "../../assets/company/logo/nexora-logo.svg";
import Footer from "../../components/layout/Footer";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success(data.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
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

      {/* Logo Header */}
      <header className="relative z-20 mx-auto flex w-full  px-5 py-6">
        <Link to="/" className="flex w-fit items-center gap-3">
           <img src={NexoraLogo} alt="Nexora" className="h-16 w-16 shrink-0" />
          

          <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Nexora
          </span>
        </Link>
      </header>

      {/* Register Section */}
      <main className="relative z-10 flex flex-1 w-full items-center justify-center px-6 py-10">
        <div className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-md">
          <h1 className="text-center text-4xl font-extrabold text-white">
            Create Account 🚀
          </h1>

          <p className="mt-3 mb-8 text-center text-slate-400">
            Join Nexora and start your career journey.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

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
              placeholder="Create a password"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-400 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Register;