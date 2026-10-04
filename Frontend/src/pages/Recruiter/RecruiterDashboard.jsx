import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Users,
  PlusCircle,
  Eye,
  MapPin,
  ArrowUpRight,
  TrendingUp,
  Building2,
} from "lucide-react";
import { getMyJobs } from "../../services/recruiterService";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getMyJobs();
      setJobs(data.jobs || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalApplicants = jobs.reduce(
    (total, job) => total + (job.totalApplicants || 0),
    0
  );

  const activeJobs = jobs.filter((j) => j.status !== "Closed").length;

  return (
    <div className="relative mx-auto max-w-7xl px-8 py-10">

      <div className="absolute top-0 left-10 -z-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-slate-800/80 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">
              Recruiter Dashboard
            </h1>
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
              Employer
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Manage your job postings and track applicants.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/recruiter/post-job"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500"
          >
            <PlusCircle size={17} />
            Post Job
          </Link>

          <Link
            to="/recruiter/my-jobs"
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-slate-600 hover:bg-slate-800"
          >
            <Eye size={17} />
            My Jobs
          </Link>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="mt-8 flex flex-wrap items-center divide-x divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex items-center gap-4 px-8 py-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/15">
            <Briefcase className="text-blue-400" size={20} />
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{jobs.length}</p>
            <p className="text-sm text-slate-400">Total Jobs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-8 py-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600/15">
            <TrendingUp className="text-emerald-400" size={20} />
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{activeJobs}</p>
            <p className="text-sm text-slate-400">Active Listings</p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-8 py-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600/15">
            <Users className="text-violet-400" size={20} />
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{totalApplicants}</p>
            <p className="text-sm text-slate-400">Total Applicants</p>
          </div>
        </div>
      </div>

      {/* RECENT JOBS */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent Jobs</h2>
          <Link
            to="/recruiter/my-jobs"
            className="text-sm font-semibold text-blue-400 hover:text-blue-300"
          >
            View all
          </Link>
        </div>

        <div className="mt-5 space-y-4">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="h-4 w-1/3 rounded bg-slate-800" />
                <div className="mt-3 h-3 w-1/4 rounded bg-slate-800" />
              </div>
            ))
          ) : jobs.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-500">
                <Building2 size={22} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                No jobs posted yet
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Post your first job to start receiving applications.
              </p>
              <Link
                to="/recruiter/post-job"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
              >
                <PlusCircle size={16} />
                Post a Job
              </Link>
            </div>
          ) : (
            jobs.slice(0, 5).map((job) => (
              <div
                key={job._id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-0.5 hover:border-slate-700 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white">
                    {job.title?.charAt(0)?.toUpperCase() || "J"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{job.title}</h3>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
                      <MapPin size={13} />
                      {job.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
                    {job.jobType}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                    <Users size={12} />
                    {job.totalApplicants || 0} applicants
                  </span>
                  <Link
                    to="/recruiter/my-jobs"
                    className="flex items-center gap-1 text-sm font-semibold text-blue-400 hover:text-blue-300"
                  >
                    View <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

export default RecruiterDashboard;