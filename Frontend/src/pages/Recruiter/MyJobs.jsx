import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Pencil,
  Trash2,
  Users,
  MapPin,
  IndianRupee,
  Briefcase,
  Plus,
  LayoutDashboard,
  Eye,
  Building2,
  Sparkles,
} from "lucide-react";

import { getMyJobs, deleteJob } from "../../services/recruiterService";

function MyJobs() {
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
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;

    try {
      const data = await deleteJob(id);
      toast.success(data.message || "Job deleted successfully");
      loadJobs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-48 rounded-lg bg-slate-800"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-36 rounded-2xl bg-slate-800/60 border border-slate-700/50"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      {/* Header Section */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
            My Job Postings
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 border border-blue-500/20">
              {jobs.length} Active
            </span>
          </h1>
          <p className="mt-1 text-sm text-slate-400">Manage your active listings and candidate applications.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/recruiter/dashboard"
            className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/40 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
          >
            <LayoutDashboard size={17} />
            Dashboard
          </Link>

          <Link
            to="/recruiter/post-job"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 hover:scale-[1.02]"
          >
            <Plus size={18} />
            Post New Job
          </Link>
        </div>
      </div>

      {/* Main Content */}
      {jobs.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-12 text-center backdrop-blur-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sparkles size={28} />
          </div>
          <h2 className="text-2xl font-bold text-white">No Jobs Posted Yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-400">
            Create your first job posting to start finding top talent for your team.
          </p>
          <Link
            to="/recruiter/post-job"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-all duration-200"
          >
            <Plus size={18} />
            Post Your First Job
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-md hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* Left Side Info */}
                <div className="space-y-3">
                  <div>
                    <h2 className="text-xl font-bold text-white transition group-hover:text-blue-400">
                      {job.title}
                    </h2>
                    {job.company?.name && (
                      <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                        <Building2 size={14} className="text-slate-500" />
                        {job.company.name}
                      </p>
                    )}
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-300">
                    <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-800/50 px-3 py-1.5">
                      <MapPin size={14} className="text-blue-400" />
                      {job.location}
                    </div>

                    <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-800/50 px-3 py-1.5">
                      <Briefcase size={14} className="text-amber-400" />
                      {job.jobType}
                    </div>

                    <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-800/50 px-3 py-1.5">
                      <IndianRupee size={14} className="text-emerald-400" />
                      {job.salary} LPA
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 border-t border-slate-800/80 pt-4 lg:border-t-0 lg:pt-0">
                  <Link
                    to={`/jobs/${job._id}`}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-700/60 bg-slate-800/40 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-all duration-200"
                    title="View Job"
                  >
                    <Eye size={16} />
                    <span>View</span>
                  </Link>

                  <Link
                    to={`/recruiter/edit-job/${job._id}`}
                    className="flex items-center gap-1.5 rounded-xl border border-blue-500/20 bg-blue-500/10 px-3.5 py-2.5 text-xs font-semibold text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-200"
                    title="Edit Job"
                  >
                    <Pencil size={15} />
                    <span>Edit</span>
                  </Link>

                  <Link
                    to={`/recruiter/applicants/${job._id}`}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all duration-200"
                    title="View Applicants"
                  >
                    <Users size={16} />
                    <span>{job.totalApplicants || 0} Applicants</span>
                  </Link>

                  <button
                    onClick={() => handleDelete(job._id)}
                    className="flex items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 p-2.5 text-rose-400 hover:bg-rose-600 hover:text-white transition-all duration-200"
                    title="Delete Job"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyJobs;