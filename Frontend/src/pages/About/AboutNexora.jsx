import React from "react";
import PageHeader from "../../components/layout/PageHeader";
import Footer from "../../components/layout/Footer";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Target,
  Rocket,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Award,
} from "lucide-react";

function AboutNexora() {
  const stats = [
    { label: "Active Job Listings", value: "10,000+" },
    { label: "Verified Companies", value: "500+" },
    { label: "Job Seekers Placed", value: "25,000+" },
    { label: "Hiring Success Rate", value: "98%" },
  ];

  const features = [
    "AI-Powered Smart Job Matching",
    "Real-Time Application Status Tracker",
    "Direct Recruiter Communication",
    "Verified Company Profiles & Reviews",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <PageHeader />

      <main className="flex-1">
        {/* HERO SECTION WITH SPLIT IMAGE */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
          {/* Subtle Background Glows */}
          <div className="absolute top-1/4 left-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-[140px] pointer-events-none" />

          <div className="container-custom relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              
              {/* Left Column: Text */}
              <div className="space-y-6 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <Rocket size={14} /> Reimagining Recruitment in India
                </span>

                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-[1.15]">
                  Empowering Talent,{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                    Transforming Careers
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Nexora is a cutting-edge MERN stack recruitment ecosystem connecting ambitious professionals with industry-leading companies through seamless, transparent, and intelligent hiring solutions.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    to="/jobs"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-blue-600/40 active:scale-95"
                  >
                    Explore Opportunities <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/companies"
                    className="inline-flex items-center gap-2 rounded-xl bg-white dark:bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    <Building2 size={18} /> Browse Companies
                  </Link>
                </div>
              </div>

              {/* Right Column: Dynamic Image Showcase */}
              <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-3 shadow-2xl backdrop-blur-xl">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                    alt="Nexora Team Collaboration"
                    className="h-[360px] sm:h-[420px] w-full rounded-2xl object-cover"
                  />
                  
                  {/* Floating Badge 1 */}
                  <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-4 shadow-xl">
                    <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Trust Factor</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">100% Verified Jobs</p>
                    </div>
                  </div>

                  {/* Floating Badge 2 */}
                  <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-4 shadow-xl">
                    <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400">
                      <Zap size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Fast Match</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Instant Applying</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="border-y border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#0f172a]/60 py-10 backdrop-blur-md">
          <div className="container-custom">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION, VISION & COMMUNITY GRID */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                Driven by Purpose, Built for Growth
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                Discover how Nexora is shaping the future of work and career acceleration.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              
              {/* Our Mission */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm hover:border-blue-500/50 hover:shadow-md transition-all group">
                <div className="mb-5 inline-flex rounded-xl bg-cyan-500/10 p-3.5 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                  <Target size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Mission</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  To eliminate hiring friction by delivering transparent, fast, and merit-based career connections.
                </p>
              </div>

              {/* Our Vision */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm hover:border-purple-500/50 hover:shadow-md transition-all group">
                <div className="mb-5 inline-flex rounded-xl bg-purple-500/10 p-3.5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <Rocket size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Vision</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  To become India’s most trusted talent network, connecting millions of job seekers to top companies.
                </p>
              </div>

              {/* Features Highlight */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm hover:border-emerald-500/50 hover:shadow-md transition-all group">
                <div className="mb-5 inline-flex rounded-xl bg-emerald-500/10 p-3.5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <Briefcase size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Key Features</h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {features.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm hover:border-amber-500/50 hover:shadow-md transition-all group">
                <div className="mb-5 inline-flex rounded-xl bg-amber-500/10 p-3.5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Vibrant Community</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Join a growing ecosystem where talent meets opportunity with dedicated recruiter dashboards.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA CALLOUT SECTION */}
        <section className="pb-20">
          <div className="container-custom">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-12 sm:px-12 sm:py-16 text-center text-white shadow-2xl">
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl font-extrabold sm:text-4xl">
                  Ready to Kickstart Your Next Career Move?
                </h2>
                <p className="text-blue-100 text-sm sm:text-base">
                  Create your profile today, explore thousands of curated jobs, and land your dream role with Nexora.
                </p>
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-blue-600 hover:bg-slate-100 transition-all shadow-lg active:scale-95"
                >
                  Find Jobs Now <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AboutNexora;