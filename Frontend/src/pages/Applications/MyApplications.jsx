import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getMyApplications,
    withdrawApplication,
} from "../../services/applicationService";

function MyApplications() {
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState([]);
    const [withdrawingId, setWithdrawingId] = useState(null);

    const loadApplications = async () => {
        try {
            const data = await getMyApplications();
            // Filter out empty/invalid applications (like missing job data)
            const validApplications = (data.applications || []).filter(
                (app) => app.job && app.job.title
            );
            setApplications(validApplications);
        } catch (error) {
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadApplications();
    }, []);

    const handleWithdraw = async (applicationId) => {
        try {
            setWithdrawingId(applicationId);

            const data = await withdrawApplication(applicationId);

            toast.success(data.message || "Application withdrawn successfully");

            loadApplications();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Withdraw Failed"
            );
        } finally {
            setWithdrawingId(null);
        }
    };

    const getStatusStyle = (status) => {
        const s = status?.toLowerCase();

        if (s === "selected" || s === "accepted" || s === "hired") {
            return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
        }

        if (s === "rejected") {
            return "bg-rose-500/10 text-rose-400 border-rose-500/20";
        }

        if (s === "withdrawn") {
            return "bg-slate-500/10 text-slate-400 border-slate-500/20";
        }

        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="flex items-center gap-3 text-slate-400">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                    <span className="text-lg font-medium">Loading applications...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        My Applications
                    </h1>
                    <p className="mt-1 text-sm text-slate-400">
                        Track and manage your submitted job applications
                    </p>
                </div>
                <div className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md">
                    Total Submitted: <span className="ml-1.5 font-bold text-indigo-400">{applications.length}</span>
                </div>
            </div>

            {applications.length === 0 ? (
                <div className="rounded-2xl
border border-slate-200 dark:border-slate-800/80
bg-white dark:bg-slate-900/40
p-12
text-center
backdrop-blur-md">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                        No Applications Found
                    </h2>
                    <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-400">
                        You haven't applied to any roles yet. Explore open job listings and start applying today!
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {applications.map((application) => {
                        const job = application.job || {};
                        const company = job.company || {};
                        const companyName = typeof company === "object" ? company.name : company;
                        const companyLogo = typeof company === "object" ? company.logo : null;

                        return (
                            <div
                                key={application._id}
                                className="group relative overflow-hidden rounded-2xl
border border-slate-200 dark:border-slate-800/80
bg-white dark:bg-slate-900/60
p-6
transition-all duration-300
hover:border-blue-300 dark:hover:border-slate-700/80
hover:bg-white dark:hover:bg-slate-900/90
hover:shadow-xl hover:shadow-indigo-500/5"
                            >
                                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                                    {/* Company & Job Details */}
                                    <div className="flex items-start gap-4 sm:gap-5">
                                        {/* Logo or Fallback */}
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800 text-lg font-bold text-slate-200 overflow-hidden shadow-inner">
                                            {companyLogo ? (
                                                <img
                                                    src={companyLogo}
                                                    alt={companyName || "Company"}
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = "none";
                                                    }}
                                                />
                                            ) : (
                                                <span>{(companyName || "C")[0]?.toUpperCase()}</span>
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <h2 className="text-xl font-semibold text-white transition-colors group-hover:text-indigo-300">
                                                {job.title || "Untitled Role"}
                                            </h2>

                                            <p className="text-sm font-medium text-slate-300">
                                                {companyName || "Company Name Unavailable"}
                                            </p>

                                            {/* Info Chips */}
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs text-slate-400">
                                                {job.location && (
                                                    <span className="flex items-center gap-1.5">
                                                        <svg className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        {job.location}
                                                    </span>
                                                )}

                                                {job.salary && (
                                                    <span className="flex items-center gap-1.5">
                                                        <svg className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        ₹{Number(job.salary).toLocaleString("en-IN")}
                                                    </span>
                                                )}

                                                <span className="flex items-center gap-1.5">
                                                    <svg className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    Applied {application.createdAt ? new Date(application.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action & Status Section */}
                                    <div className="flex items-center justify-between gap-4 border-t border-slate-800/80 pt-4 md:border-t-0 md:pt-0">
                                        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize tracking-wide ${getStatusStyle(application.status)}`}>
                                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current"></span>
                                            {application.status || "Pending"}
                                        </span>

                                        {application.status !== "Withdrawn" && (
                                            <button
                                                disabled={withdrawingId === application._id}
                                                onClick={() => handleWithdraw(application._id)}
                                                className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-400 transition-all hover:bg-rose-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {withdrawingId === application._id ? (
                                                    <span className="flex items-center gap-1.5">
                                                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                        Withdrawing...
                                                    </span>
                                                ) : (
                                                    "Withdraw"
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default MyApplications;