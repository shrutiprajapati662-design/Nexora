import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, KeyRound, ShieldCheck, ArrowLeft } from "lucide-react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { changePassword } from "../../api/authApi";

function ChangePassword() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
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

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const data = await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      toast.success(data.message);

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      navigate("/profile");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Password change failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12 bg-[#060911]">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[130px] pointer-events-none"></div>

      {/* CARD CONTAINER */}
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        
        <button
          onClick={() => navigate("/profile")}
          className="group flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Profile
        </button>

        <div className="flex items-center gap-3.5 mb-8">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Change Password
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter your current and new password below.
            </p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Current Password */}
          <div className="relative">
            <Input
              label="Current Password"
              type={showOld ? "text" : "password"}
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3.5 top-[38px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              {showOld ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <Input
              label="New Password"
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3.5 top-[38px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-[38px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-sm text-white shadow-lg shadow-blue-600/25 transition-all active:scale-[0.98]"
            >
              <ShieldCheck className="h-4 w-4" />
              {loading ? "Updating..." : "Change Password"}
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default ChangePassword;