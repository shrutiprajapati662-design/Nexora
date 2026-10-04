import { useState } from "react";
import { 
  Search, 
  Briefcase, 
  RotateCcw, 
  SlidersHorizontal,
  X,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { useJobs } from "../../context/JobsContext";
import JobCard from "./JobCard";

function Jobs() {
  const { jobs, loading } = useJobs();

  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState([]);
  const [experience, setExperience] = useState("All");
  const [location, setLocation] = useState("All Locations");
  const [salary, setSalary] = useState("Any Salary");

  const parseSalaryInLPA = (sal) => {
    if (!sal) return 0;
    const num = Number(sal);
    if (isNaN(num)) return 0;
    return num >= 100000 ? num / 100000 : num;
  };

  const formatSalaryDisplay = (sal) => {
    const lpa = parseSalaryInLPA(sal);
    return lpa ? `${lpa} LPA` : "N/A";
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.name?.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      jobType.length === 0 || jobType.includes(job.jobType);

    const matchesExperience =
      experience === "All" ||
      job.experience === Number(experience);

    const matchesLocation =
      location === "All Locations" ||
      job.location === location;

    const jobSalaryLPA = parseSalaryInLPA(job.salary);

    const matchesSalary =
      salary === "Any Salary" ||
      (salary === "5+ LPA" && jobSalaryLPA >= 5) ||
      (salary === "10+ LPA" && jobSalaryLPA >= 10) ||
      (salary === "15+ LPA" && jobSalaryLPA >= 15) ||
      (salary === "20+ LPA" && jobSalaryLPA >= 20);

    return matchesSearch && matchesType && matchesExperience && matchesLocation && matchesSalary;
  });

  const clearAllFilters = () => {
    setSearch("");
    setJobType([]);
    setExperience("All");
    setLocation("All Locations");
    setSalary("Any Salary");
  };

  const hasActiveFilters = 
    search !== "" || 
    jobType.length > 0 || 
    experience !== "All" || 
    location !== "All Locations" || 
    salary !== "Any Salary";

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Background Glow */}
      <div className="absolute -top-10 left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      {/* HERO HEADER & SEARCH */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        
        <div className="inline-flex items-center gap-2 rounded-full theme-badge px-4 py-1.5 text-xs font-semibold border border-blue-500/20 shadow-sm">
          <Sparkles size={14} className="animate-pulse text-blue-500" />
          <span>Over {jobs.length || "1,000"}+ Tech & Startup Roles Available</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight theme-text leading-tight">
          Find Your <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Dream Job</span> Fast
        </h1>

        <p className="text-base sm:text-lg theme-muted max-w-2xl mx-auto font-medium">
          Explore top-tier engineering, design, and remote roles from high-growth tech companies.
        </p>

        {/* Search Bar Container */}
        <div className="pt-2 max-w-2xl mx-auto">
          <div className="relative flex items-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-xl hover:border-blue-500 focus-within:border-blue-500 transition-all gap-2">
            
            <div className="flex items-center w-full px-3 py-1">
              <Search size={20} className="text-blue-500 shrink-0" />
              <input
                type="text"
                placeholder="Job title, keyword, or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-sm theme-text font-medium placeholder:theme-muted outline-none"
              />
              {search && (
                <button 
                  onClick={() => setSearch("")}
                  className="p-1 theme-muted hover:text-blue-500 transition"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              type="button"
              className="shrink-0 rounded-xl bg-blue-600 hover:bg-blue-700 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 active:scale-95 transition-all"
            >
              Search
            </button>
          </div>

          {/* Quick Filter Tags */}
          <div className="flex items-center justify-center gap-2 mt-4 text-xs theme-muted flex-wrap">
            <span className="font-semibold">Popular Searches:</span>
            {["Frontend", "React Developer", "Remote", "Full-Time"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearch(tag)}
                className="rounded-lg bg-white dark:bg-slate-900 hover:border-blue-500 px-3 py-1 theme-text border border-slate-200 dark:border-slate-800 shadow-sm font-medium transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* JOBS LAYOUT */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 items-stretch">

        {/* LEFT SIDEBAR (FILTERS) */}
        <aside className="lg:col-span-1 h-full">
          <div className="h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6 flex flex-col justify-between">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-blue-500" />
                  <h2 className="text-lg font-bold theme-text">Filters</h2>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-600 transition"
                  >
                    <RotateCcw size={12} /> Reset
                  </button>
                )}
              </div>

              {/* JOB TYPE */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider theme-muted">
                  Job Type
                </label>
                <div className="space-y-2.5">
                  {["Full-Time", "Part-Time", "Internship", "Remote"].map((type) => (
                    <label key={type} className="flex items-center gap-3 text-sm font-medium theme-text cursor-pointer hover:text-blue-500">
                      <input
                        type="checkbox"
                        checked={jobType.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setJobType([...jobType, type]);
                          } else {
                            setJobType(jobType.filter((t) => t !== type));
                          }
                        }}
                        className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* EXPERIENCE */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider theme-muted">
                  Experience
                </label>
                <div className="relative">
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm theme-text outline-none focus:border-blue-500 transition cursor-pointer"
                  >
                    <option value="All">All Experience</option>
                    <option value="0">Fresher (0 Years)</option>
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3 Years</option>
                    <option value="5">5+ Years</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3.5 top-3 theme-muted pointer-events-none" />
                </div>
              </div>

              {/* LOCATION */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider theme-muted">
                  Location
                </label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm theme-text outline-none focus:border-blue-500 transition cursor-pointer"
                  >
                    <option value="All Locations">All Locations</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Noida">Noida</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3.5 top-3 theme-muted pointer-events-none" />
                </div>
              </div>

              {/* SALARY */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider theme-muted">
                  Minimum Salary
                </label>
                <div className="relative">
                  <select
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm theme-text outline-none focus:border-blue-500 transition cursor-pointer"
                  >
                    <option value="Any Salary">Any Salary</option>
                    <option value="5+ LPA">5+ LPA</option>
                    <option value="10+ LPA">10+ LPA</option>
                    <option value="15+ LPA">15+ LPA</option>
                    <option value="20+ LPA">20+ LPA</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3.5 top-3 theme-muted pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </aside>

        {/* RIGHT JOBS LIST */}
        <main className="lg:col-span-3 space-y-5">
          
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-sm">
            <span className="text-xs font-medium theme-muted">
              Showing <strong className="theme-text font-bold">{filteredJobs.length}</strong> available jobs
            </span>

            <div className="flex flex-wrap gap-2">
              {jobType.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-md theme-badge px-2.5 py-1 text-xs font-semibold">
                  {t}
                  <button onClick={() => setJobType(jobType.filter((item) => item !== t))}>
                    <X size={12} className="hover:text-blue-700" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
                        <div className="h-3 w-1/4 rounded bg-slate-200 dark:bg-slate-800" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job._id}
                  id={job._id}
                  company={job.company?.name}
                  logo={job.company?.logo}
                  title={job.title}
                  description={job.description}
                  location={job.location}
                  salary={formatSalaryDisplay(job.salary)}
                  type={job.jobType}
                  experience={`${job.experience}+ Years`}
                  skills={job.skills || ["React", "JavaScript", "Tailwind"]}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-slate-800 text-blue-500">
                  <Briefcase size={22} />
                </div>
                <h3 className="mt-4 text-lg font-bold theme-text">No Matching Jobs Found</h3>
                <p className="mt-1 text-xs theme-muted max-w-sm mx-auto">
                  We couldn't find any positions matching your search filters. Try clearing some criteria.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition shadow-md shadow-blue-600/20"
                >
                  <RotateCcw size={14} /> Clear All Filters
                </button>
              </div>
            )}
          </div>

        </main>

      </div>
    </div>
  );
}

export default Jobs;