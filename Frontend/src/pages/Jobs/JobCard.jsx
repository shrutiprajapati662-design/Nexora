import { applyJob } from "../../services/applicationService";
import { toast } from "react-hot-toast";

import { Link } from "react-router-dom";
import {
    MapPin,
    Briefcase,
    IndianRupee,
    Clock3,
    Award
} from "lucide-react";

function JobCard({
    id,
    company,
    logo,
    title,
    description,
    location,
    salary,
    type,
    experience,
    skills = [],
}) {

    const handleApply = async () => {
        try {
            const res = await applyJob(id);
            toast.success(res.message);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to apply"
            );
        }
    };
    const companyInitial = company?.charAt(0)?.toUpperCase() || "C";

    return (
        <div className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10">

            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex gap-4">
                    {logo ? (
                        <img
                            src={logo}
                            alt={company}
                            className="h-14 w-14 rounded-2xl object-cover bg-slate-100 dark:bg-slate-800 p-1"
                        />
                    ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">
                            {companyInitial}
                        </div>
                    )}

                    <div>
                        <h2 className="text-2xl font-bold leading-tight text-slate-900 dark:text-slate-100 group-hover:text-blue-500">
                            {title}
                        </h2>

                        <p className="mt-1 text-base text-slate-500 dark:text-slate-400">
                            {company}
                        </p>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400 dark:text-slate-500" />
                    {location}
                </div>

                <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-slate-400 dark:text-slate-500" />
                    {type}
                </div>

                <div className="flex items-center gap-2">
                    <Award size={16} className="text-slate-400 dark:text-slate-500" />
                    {experience}
                </div>

                <div className="flex items-center gap-2 font-semibold text-green-600 dark:text-green-400">
                    <IndianRupee size={16} />
                    {salary}
                </div>
            </div>

            {/* Skills */}
            <div className="mt-5 flex flex-wrap gap-2">
                {skills.slice(0, 4).map((skill, index) => (
                    <span
                        key={index}
                        className="rounded-full bg-blue-50 dark:bg-blue-950/50 border border-transparent dark:border-blue-800/40 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300"
                    >
                        {skill}
                    </span>
                ))}
            </div>

            {/* Description */}
            <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {description}
            </p>

            {/* Footer */}
            <div className="mt-10 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Clock3 size={15} />
                    <span>2d ago</span>
                </div>

                <button
                    onClick={handleApply}
                    className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
                >
                    Apply Now
                </button>
            </div>

        </div>
    );
}

export default JobCard;