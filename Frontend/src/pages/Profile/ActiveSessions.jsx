import React, { useState } from "react";
import { 
  Monitor, 
  Laptop, 
  Smartphone, 
  MapPin, 
  Clock, 
  LogOut, 
  ArrowLeft, 
  ShieldCheck, 
  Globe, 
  AlertTriangle 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ActiveSessions() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const sessions = [
    {
      id: 1,
      deviceType: "desktop",
      deviceName: "Chrome on Windows 11",
      location: "New Delhi, India",
      ipAddress: "103.211.54.12",
      lastActive: "Active Now",
      isCurrent: true,
    },
    {
      id: 2,
      deviceType: "mobile",
      deviceName: "Safari on iPhone 15 Pro",
      location: "Mumbai, India",
      ipAddress: "49.36.120.88",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
  ];

  const handleLogoutAll = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      toast.success("Successfully logged out from all other devices");
      setIsLoggingOut(false);
    }, 1000);
  };

  const handleRevokeSession = (sessionId, deviceName) => {
    toast.success(`Session revoked for ${deviceName}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        
        {/* Navigation & Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm border border-slate-200 transition-all hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Active Sessions
                </h1>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-300">
                  <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Secure
                </span>
              </div>
              <p className="text-sm text-slate-500">
                Manage and monitor devices currently logged into your account.
              </p>
            </div>

            <button
              onClick={handleLogoutAll}
              disabled={isLoggingOut}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition-all active:scale-95 disabled:opacity-50"
            >
              <LogOut size={16} />
              {isLoggingOut ? "Logging out..." : "Logout All Devices"}
            </button>
          </div>
        </div>

        {/* Security Warning Banner - High Contrast Dark Amber */}
        <div className="mb-8 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 shadow-sm text-amber-950">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-600" />
          <div className="text-sm leading-relaxed font-medium">
            <strong className="font-bold text-amber-900">Unfamiliar device?</strong> If you see a device or location you don't recognize, revoke access immediately and update your account password.
          </div>
        </div>

        {/* Device Sessions List */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Connected Devices ({sessions.length})
          </h2>

          <div className="grid gap-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-200 bg-white ${
                  session.isCurrent
                    ? "border-blue-400 shadow-md ring-1 ring-blue-400/20"
                    : "border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                {session.isCurrent && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600" />
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left Side: Icon & Details */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
                        session.isCurrent
                          ? "border-blue-200 bg-blue-50 text-blue-600"
                          : "border-slate-200 bg-slate-100 text-slate-600"
                      }`}
                    >
                      {session.deviceType === "mobile" ? (
                        <Smartphone size={22} />
                      ) : (
                        <Laptop size={22} />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900">
                          {session.deviceName}
                        </h3>

                        {session.isCurrent && (
                          <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700 border border-blue-200">
                            Current Device
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} className="text-slate-400" />
                          {session.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe size={14} className="text-slate-400" />
                          {session.ipAddress}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} className="text-slate-400" />
                          {session.lastActive}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Action Button */}
                  <div className="flex items-center justify-end border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
                    {!session.isCurrent ? (
                      <button
                        onClick={() => handleRevokeSession(session.id, session.deviceName)}
                        className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                      >
                        Revoke Access
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                        <ShieldCheck size={15} className="text-emerald-600" />
                        <span>Active & Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ActiveSessions;