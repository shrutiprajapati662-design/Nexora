import JobCard from "../Jobs/JobCard";
import CategoryCard from "../Jobs/CategoryCard";
import CompanyCard from "../Jobs/CompanyCard";
import TestimonialCard from "../Jobs/TestimonialCard";
import { useNavigate } from "react-router-dom";
import { useJobs } from "../../context/JobsContext";

function Home() {
  const navigate = useNavigate();
  const { jobs } = useJobs();

  return (
    <div className="min-h-screen bg-white dark:bg-[#060911] text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white pb-20 transition-colors duration-200">
      
      {/* ===================== HOME PAGE ===================== */}

      <section className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 overflow-hidden px-6 lg:px-8 py-16 sm:py-20 border-b border-slate-200 dark:border-slate-800/60">

        {/* ---------- BACKGROUND GLOW ---------- */}

        <div className="absolute left-0 top-0 -z-10 h-80 w-80 rounded-full bg-blue-600/10 dark:bg-blue-600/20 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-[120px] pointer-events-none"></div>

        {/* ====================================================
                       LEFT HERO SECTION
          Heading + Description + Buttons + Stats
        ==================================================== */}

        <div className="max-w-3xl">

          {/* ---------- MAIN HEADING ---------- */}

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] text-slate-900 dark:text-white">
            Find Your{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Dream Job
            </span>{" "}
            Faster With AI
          </h1>

          {/* ---------- DESCRIPTION ---------- */}

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Discover jobs, build your resume, prepare for interviews,
            and grow your career with Nexora.
          </p>

          {/* ---------- CTA BUTTONS ---------- */}

          <div className="mt-8 flex flex-col sm:flex-row gap-4">

            <button 
              onClick={() => navigate("/register")}
              className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-[0.98]"
            >
              Get Started
            </button>

            <button 
              onClick={() => navigate("/jobs")}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 px-7 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 backdrop-blur-md transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 active:scale-[0.98]"
            >
              Explore Jobs
            </button>

          </div>

          {/* ---------- HERO STATS ---------- */}

          <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-4 border-t border-slate-200 dark:border-slate-800/80 pt-6">

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 p-4 text-center backdrop-blur-sm transition hover:border-slate-300 dark:hover:border-slate-700">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">10K+</h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 font-medium">Jobs</p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 p-4 text-center backdrop-blur-sm transition hover:border-slate-300 dark:hover:border-slate-700">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">500+</h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 font-medium">Companies</p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 p-4 text-center backdrop-blur-sm transition hover:border-slate-700">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">50K+</h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 font-medium">Candidates</p>
            </div>

          </div>

        </div>

        {/* ====================================================
                       RIGHT HERO SECTION
          Illustration / Dashboard Preview / AI Graphic
        ==================================================== */}

        <div className="relative flex items-center justify-center mt-6 lg:mt-0">

          {/* ---------- MAIN CARD ---------- */}

          <div className="w-full max-w-[380px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-2xl dark:shadow-none backdrop-blur-xl">

            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                AI Career Assistant
              </h3>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              Personalized career guidance powered by AI.
            </p>

            <div className="mt-6 space-y-3">

              <div className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-3 text-xs font-medium text-slate-700 dark:text-slate-300">
                <span>Resume Score :</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800/50">92%</span>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-3 text-xs font-medium text-slate-700 dark:text-slate-300">
                <span>Interview Ready :</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-300 dark:border-blue-800/50">85%</span>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-3 text-xs font-medium text-slate-700 dark:text-slate-300">
                <span>Skills Matched :</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-800/50">78%</span>
              </div>

            </div>

          </div>

          {/* ---------- FLOATING CARD ---------- */}

          <div className="absolute -left-2 -top-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/95 p-3 shadow-xl backdrop-blur-md hidden sm:block">

            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
              Interview Calls
            </p>

            <h2 className="mt-0.5 text-xl font-bold text-emerald-500 dark:text-emerald-400">
              +128
            </h2>

          </div>

          {/* ---------- FLOATING CARD 2 ---------- */}

          <div className="absolute -right-2 -bottom-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/95 p-3 shadow-xl backdrop-blur-md hidden sm:block">

            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
              AI Resume Score
            </p>

            <h2 className="mt-0.5 text-xl font-bold text-blue-600 dark:text-blue-400">
              92%
            </h2>

          </div>

        </div>
      </section>

      {/* ====================================================
                FEATURED JOBS SECTION
      ==================================================== */}

      <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">

        {/* ---------- SECTION HEADING ---------- */}

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Jobs
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Discover opportunities from top companies.
            </p>

          </div>

          <button
            onClick={() => navigate("/jobs")}
            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
          >
            View All
          </button>

        </div>

        {/* ---------- JOB CARDS WRAPPER ---------- */}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">

          {jobs.slice(0, 4).map((job) => (
            <div key={job._id} className="w-full max-w-[285px] scale-[0.95] origin-top transition-transform hover:scale-[0.98]">
              <JobCard
                id={job._id}
                company={job.company?.name}
                logo={job.company?.logo}
                title={job.title}
                description={job.description}
                location={job.location}
                salary={`${job.salary} LPA`}
                type={job.jobType}
                experience={`${job.experience}+ Years`}
                skills={job.skills || ["React", "JavaScript", "Tailwind"]}
              />
            </div>
          ))}

        </div>

      </section>

      {/* ====================================================
                TOP CATEGORIES
      ==================================================== */}

      <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800/60 pt-12">

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Top Categories
        </h2>

        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Browse jobs by category.
        </p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">

          <CategoryCard title="Frontend" jobs="245" />
          <CategoryCard title="Backend" jobs="320" />
          <CategoryCard title="AI / ML" jobs="180" />
          <CategoryCard title="UI / UX" jobs="95" />

        </div>

      </section>


      {/* ====================================================
                    TOP COMPANIES
      ==================================================== */}

      <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800/60 pt-12">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Top Companies
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Companies actively hiring on Nexora.
            </p>
          </div>

          <button className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">
            View All
          </button>

        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">

          <CompanyCard company="Google" openings="120" />
          <CompanyCard company="Microsoft" openings="95" />
          <CompanyCard company="Amazon" openings="150" />
          <CompanyCard company="Adobe" openings="60" />

        </div>

      </section>


      {/* ====================================================
                    TESTIMONIALS
      ==================================================== */}

      <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800/60 pt-12">

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          What Our Users Say
        </h2>

        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Success stories from Nexora users.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">

          <TestimonialCard
            name="Rahul"
            role="Frontend Developer"
            review="Nexora helped me land my first developer job."
          />

          <TestimonialCard
            name="Priya"
            role="Python Developer"
            review="The AI resume suggestions were incredibly helpful."
          />

          <TestimonialCard
            name="Amit"
            role="UI/UX Designer"
            review="Best platform for interview preparation and job search."
          />

        </div>

      </section>


      {/* ====================================================
                    CTA SECTION
      ==================================================== */}

      <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-10 py-12 text-center shadow-xl">

          {/* ---------- HEADING ---------- */}

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Ready To Build Your Career?
          </h2>

          {/* ---------- DESCRIPTION ---------- */}

          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-blue-100">
            Join thousands of developers who are finding better jobs with Nexora.
          </p>

          {/* ---------- BUTTONS ---------- */}

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

            <button 
              onClick={() => navigate("/register")}
              className="rounded-xl bg-white px-7 py-3 text-xs sm:text-sm font-semibold text-blue-600 shadow-md transition hover:bg-slate-100 active:scale-[0.98]"
            >
              Get Started
            </button>

            <button 
              onClick={() => navigate("/jobs")}
              className="rounded-xl border border-white/30 bg-white/10 px-7 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-[0.98]"
            >
              Browse Jobs
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;