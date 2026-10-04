import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Clock3,
  Hourglass,
  CheckCircle2,
  XCircle,
  FileText,
  TrendingUp,
  User,
  ArrowUpRight,
  Phone,
  Edit,
  Lock,
} from "lucide-react";
import { getMyApplications } from "../../services/applicationService";
import { useAuth } from "../../context/AuthContext";

const statusConfig = {
  Pending: { color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20", border: "border-l-amber-500", icon: Hourglass },
  Accepted: { color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20", border: "border-l-emerald-500", icon: CheckCircle2 },
  Rejected: { color: "text-rose-400", bg: "bg-rose-400/10 border-rose-400/20", border: "border-l-rose-500", icon: XCircle },
};

function Dashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await getMyApplications();
      setApplications(data.applications || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const counts = {
    All: applications.length,
    Pending: applications.filter((a) => a.status === "Pending").length,
    Accepted: applications.filter((a) => a.status === "Accepted").length,
    Rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  const visibleApplications =
    activeTab === "All"
      ? applications
      : applications.filter((a) => a.status === activeTab);

  const profileFields = [user?.phone, user?.bio, user?.location, user?.skills?.length, user?.resume];
  const filledFields = profileFields.filter(Boolean).length;
  const profileCompletion = Math.round((filledFields / profileFields.length) * 100);

  const formatSalary = (salary) => {
    if (!salary) return "N/A";
    const num = Number(salary);
    if (isNaN(num)) return salary;
    if (num >= 100000) return `${(num / 100000).toFixed(1)} LPA`;
    return `${num.toLocaleString("en-IN")}`;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden px-4 sm:px-6 lg:px-8 py-8">

      <div className="absolute top-10 left-10 -z-10 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 -z-10 h-[30rem] w-[30rem] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome back, {user?.name?.split(" ")[0] || "User"} 👋
            </h1>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold capitalize text-blue-400 border border-slate-700">
              {user?.role || "Job Seeker"}
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Track your job applications and stay updated on hiring statuses.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-800/90 bg-slate-900/80 px-3.5 py-2 shadow-lg">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <TrendingUp size={15} />
            </div>
            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Total</span>
              <span className="text-xs font-bold text-white">{counts.All}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-800/90 bg-slate-900/80 px-3.5 py-2 shadow-lg">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
              <Hourglass size={15} />
            </div>
            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Pending</span>
              <span className="text-xs font-bold text-amber-400">{counts.Pending}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-800/90 bg-slate-900/80 px-3.5 py-2 shadow-lg">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 size={15} />
            </div>
            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Accepted</span>
              <span className="text-xs font-bold text-emerald-400">{counts.Accepted}</span>
            </div>
          </div>

          <Link
            to="/jobs"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 transition-all duration-200"
          >
            Explore Jobs <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-6 items-start">

        {/* LEFT SIDEBAR */}
        <aside className="lg:col-span-1 w-full lg:sticky lg:top-24">
          <div className="flex flex-col rounded-2xl border border-slate-800/90 bg-slate-900/80 shadow-2xl">
            
            {/* BANNER + AVATAR WRAPPER */}
            <div className="relative shrink-0">
              <div className="relative h-24 w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
                <div className="absolute -left-4 top-2 h-1 w-40 rotate-[30deg] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent blur-[2px]" />
                <div className="absolute left-10 top-9 h-1 w-56 rotate-[30deg] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent blur-[2px]" />
                <div className="absolute left-28 -top-2 h-1 w-48 rotate-[30deg] bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent blur-[2px]" />
                <div className="absolute right-0 bottom-1 h-1 w-40 rotate-[30deg] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
              </div>

              {/* AVATAR */}
              <div className="absolute -bottom-8 left-5 z-10">
                {user?.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt={user.name}
                    className="h-16 w-16 rounded-2xl border-4 border-slate-900 object-cover shadow-2xl"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-slate-900 bg-slate-800 text-xl font-bold text-white shadow-2xl">
                    {user?.name?.charAt(0)?.toUpperCase() || <User size={20} />}
                  </div>
                )}
              </div>
            </div>

            {/* DETAILS SECTION */}
            <div className="px-5 pt-10 pb-4 space-y-4">
              <div>
                <h2 className="text-base font-bold text-white">{user?.name}</h2>
                <p className="text-xs text-slate-400 break-all">{user?.email}</p>
              </div>

              <div className="space-y-1.5 border-t border-slate-800/80 pt-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-blue-400 shrink-0" />
                  <span>{user?.location || "Location not set"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-blue-400 shrink-0" />
                  <span>{user?.phone || "Phone not set"}</span>
                </div>
              </div>

              <div className="space-y-1.5 border-t border-slate-800/80 pt-3">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-400">Profile strength</span>
                  <span className="text-blue-400 font-semibold">{profileCompletion}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 transition-all duration-500"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
              </div>

              {user?.skills?.length > 0 && (
                <div className="space-y-2 border-t border-slate-800/80 pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Top skills</span>
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {user.skills.slice(0, 10).map((skill) => (
                      <span key={skill} className="rounded-md bg-slate-800/90 px-2 py-0.5 text-[10px] font-medium text-slate-300 border border-slate-700/60">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 border-t border-slate-800/80 pt-3">
                <Link to="/profile/edit" className="flex items-center justify-center gap-1 rounded-lg border border-slate-800 bg-slate-800/40 p-2 text-[11px] text-slate-300 hover:bg-slate-800 hover:text-white transition">
                  <Edit size={12} /> Edit
                </Link>
                <button className="flex items-center justify-center gap-1 rounded-lg border border-slate-800 bg-slate-800/40 p-2 text-[11px] text-slate-300 hover:bg-slate-800 hover:text-white transition">
                  <Lock size={12} /> Password
                </button>
              </div>
            </div>

            {/* MANAGE PROFILE */}
            <div className="shrink-0 p-3 border-t border-slate-800/80 bg-slate-900/90 rounded-b-2xl">
              <Link
                to="/profile"
                className="flex w-full justify-center items-center rounded-xl border border-slate-700 bg-slate-800/80 py-2 text-xs font-semibold text-white hover:bg-slate-800 hover:border-slate-600 transition"
              >
                Manage Profile
              </Link>
            </div>

          </div>
        </aside>

        {/* RIGHT AREA */}
        <div className="lg:col-span-3">

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white">Your Applications</h2>
            <div className="flex flex-wrap gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
              {["All", "Pending", "Accepted", "Rejected"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {tab} ({counts[tab]})
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 mt-4">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-xl bg-slate-800" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/3 rounded bg-slate-800" />
                      <div className="h-3 w-1/4 rounded bg-slate-800" />
                    </div>
                  </div>
                </div>
              ))
            ) : visibleApplications.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-500">
                  <FileText size={24} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">No applications found</h3>
                <p className="mt-1 text-xs text-slate-400">
                  You haven't applied to any job under this filter yet.
                </p>
                <Link
                  to="/jobs"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition"
                >
                  Find Jobs
                </Link>
              </div>
            ) : (
              visibleApplications.map((app) => {
                const status = statusConfig[app.status] || statusConfig.Pending;
                const StatusIcon = status.icon;

                return (
                  <div
                    key={app._id}
                    className={`rounded-2xl border border-slate-800/90 ${status.border} border-l-4 bg-slate-900/80 p-5 transition-all hover:border-slate-700 hover:shadow-xl hover:shadow-blue-950/20 flex flex-col gap-4`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {app.job?.company?.logo ? (
                          <img
                            src={app.job.company.logo}
                            alt={app.job.company?.name}
                            className="h-12 w-12 shrink-0 rounded-xl object-cover border border-slate-800"
                          />
                        ) : (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-inner">
                            {app.job?.company?.name?.charAt(0)?.toUpperCase() || "C"}
                          </div>
                        )}

                        <div>
                          <h3 className="text-base font-bold text-white hover:text-blue-400 transition">
                            {app.job?.title || "Role Unavailable"}
                          </h3>
                          <p className="text-xs font-medium text-slate-400">
                            {app.job?.company?.name || "Company"}
                          </p>
                        </div>
                      </div>

                      <span className={`inline-flex items-center gap-1.5 shrink-0 self-start sm:self-center rounded-full border px-3 py-1 text-xs font-semibold ${status.bg} ${status.color}`}>
                        <StatusIcon size={12} />
                        {app.status}
                      </span>
                    </div>

                    {app.job && (
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-slate-500 shrink-0" />
                          <span>{app.job.location || "Remote"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase size={14} className="text-slate-500 shrink-0" />
                          <span>{app.job.jobType || "Full-Time"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <IndianRupee size={14} className="text-slate-500 shrink-0" />
                          <span>{formatSalary(app.job.salary)}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Clock3 size={13} className="shrink-0" />
                        <span>Applied on {new Date(app.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>

                      {app.job && (
                        <Link
                          to={`/jobs/${app.job._id}`}
                          className="inline-flex items-center gap-1 font-semibold text-blue-400 hover:text-blue-300 transition"
                        >
                          View Details <ArrowUpRight size={13} />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;