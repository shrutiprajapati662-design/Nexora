import React, { useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import Footer from "../../components/layout/Footer";
import {
    Mail,
    Phone,
    Clock3,
    HelpCircle,
    ChevronDown,
    ChevronUp,
    MessageSquare,
    Search,
    Headphones,
    ArrowRight,
    Send,
} from "lucide-react";
import toast from "react-hot-toast";

function HelpSupport() {
    const [openFaq, setOpenFaq] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const faqs = [
        {
            id: 1,
            question: "How do I apply for a job on Nexora?",
            answer:
                "Simply browse open positions on the 'Find Jobs' page, click on any job card to view full details, and click the 'Apply Now' button. You can track your application status anytime from your Profile Dashboard.",
        },
        {
            id: 2,
            question: "How can I update my resume and profile details?",
            answer:
                "Go to your Account Profile section, click 'Edit Profile', where you can upload a new PDF resume, update your bio, social links, and key skills.",
        },
        {
            id: 3,
            question: "How do recruiters contact candidates?",
            answer:
                "When a recruiter reviews your profile and shortlists your application, you will receive an in-app notification and an email with interview details or further steps.",
        },
        {
            id: 4,
            question: "What should I do if I forget my password?",
            answer:
                "Click on 'Forgot Password' on the login page. Enter your registered email address, and we'll send you an instant reset link valid for 15 minutes.",
        },
    ];

    const toggleFaq = (id) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        toast.success("Support ticket created! Our team will get back to you soon.");
        e.target.reset();
    };

    const filteredFaqs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <PageHeader />

            <main className="flex-1 pb-24 bg-white dark:bg-[#020617]">
                {/* HERO SECTION WITH SEARCH BAR */}
                <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900/40 pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-200 dark:border-slate-800">
                    <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
                        <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 mb-4">
                            <Headphones size={14} /> 24/7 Dedicated Support
                        </span>

                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-slate-900 dark:text-white">
                            How Can We Help You Today?
                        </h1>

                        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
                            Search our knowledge base or get in touch with our team directly.
                        </p>

                        {/* Quick Search Input */}
                        <div className="mt-8 relative max-w-xl mx-auto">
                            <div className="relative flex items-center">
                                <Search className="absolute left-4 text-slate-400 dark:text-slate-500" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search for answers (e.g., reset password, apply job)..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0f172a] py-4 pl-12 pr-4 text-sm text-slate-900 dark:text-white shadow-md dark:shadow-xl focus:border-blue-600 focus:outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                {/* TOP CONTACT CARDS - TOP GAP ADDED */}
                <section className="container-custom pt-12 pb-12 mb-12">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {/* Email Support Card */}
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-7 shadow-sm hover:border-cyan-500 transition-all group">
                            <div className="mb-5 inline-flex rounded-xl bg-cyan-100 dark:bg-cyan-500/10 p-3.5 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                                <Mail size={26} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Email Us</h3>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Send us a detailed message anytime.</p>
                            <a
                                href="mailto:support@nexora.com"
                                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                            >
                                support@nexora.com <ArrowRight size={14} />
                            </a>
                        </div>

                        {/* Phone Support Card */}
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-7 shadow-sm hover:border-emerald-500 transition-all group">
                            <div className="mb-5 inline-flex rounded-xl bg-emerald-100 dark:bg-emerald-500/10 p-3.5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                                <Phone size={26} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Call Support</h3>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Talk directly to our support agents.</p>
                            <a
                                href="tel:+919876543210"
                                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                            >
                                +91 98765 43210 <ArrowRight size={14} />
                            </a>
                        </div>

                        {/* Hours Card */}
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-7 shadow-sm hover:border-amber-500 transition-all group sm:col-span-2 lg:col-span-1">
                            <div className="mb-5 inline-flex rounded-xl bg-amber-100 dark:bg-amber-500/10 p-3.5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                                <Clock3 size={26} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Working Hours</h3>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Operational support timelines.</p>
                            <div className="mt-4 text-xs font-semibold text-slate-800 dark:text-slate-300 space-y-1">
                                <p>Mon – Fri: 9:00 AM – 6:00 PM IST</p>
                                <p className="text-slate-500 dark:text-slate-400 font-normal">Weekends: Limited Ticket Support</p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* FAQ ACCORDION + CONTACT FORM GRID */}
                <section className="container-custom">
                    <div className="grid gap-10 lg:gap-12 lg:grid-cols-12 items-start">

                        {/* FAQ Accordion Section (7 cols) */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-5">
                                <HelpCircle size={26} className="text-blue-600 dark:text-blue-400" />
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    Frequently Asked Questions
                                </h2>
                            </div>

                            <div className="space-y-4 pt-2">
                                {filteredFaqs.length > 0 ? (
                                    filteredFaqs.map((faq) => {
                                        const isOpen = openFaq === faq.id;
                                        return (
                                            <div
                                                key={faq.id}
                                                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] overflow-hidden transition-all shadow-sm"
                                            >
                                                <button
                                                    onClick={() => toggleFaq(faq.id)}
                                                    className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                                >
                                                    <span className="pr-4">{faq.question}</span>
                                                    {isOpen ? (
                                                        <ChevronUp size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                                    ) : (
                                                        <ChevronDown size={18} className="text-slate-400 dark:text-slate-500 shrink-0" />
                                                    )}
                                                </button>

                                                {isOpen && (
                                                    <div className="border-t border-slate-100 dark:border-slate-800/80 px-5 py-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/30">
                                                        {faq.answer}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-sm text-slate-500 dark:text-slate-400 py-4">
                                        No matching FAQs found for "{searchQuery}".
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Quick Contact Form Section (5 cols) */}
                        <div className="lg:col-span-5 mt-4 lg:mt-0">
                            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-lg dark:shadow-xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="rounded-xl bg-blue-100 dark:bg-blue-500/10 p-2.5 text-blue-600 dark:text-blue-400">
                                        <MessageSquare size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                        Send Us a Message
                                    </h3>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                                    Fill out this quick form and our support team will reply within 24 hours.
                                </p>

                                <form onSubmit={handleMessageSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            Your Full Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Shruti Prajapati"
                                            className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#020617] px-4 py-3 text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-[#020617] focus:border-blue-600 focus:outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="name@example.com"
                                            className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#020617] px-4 py-3 text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-[#020617] focus:border-blue-600 focus:outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            How can we help?
                                        </label>
                                        <textarea
                                            rows={4}
                                            required
                                            placeholder="Describe your issue or feedback in detail..."
                                            className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#020617] p-4 text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-[#020617] focus:border-blue-600 focus:outline-none transition-all"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 py-3.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all active:scale-95 mt-2"
                                    >
                                        <Send size={14} /> Send Message
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default HelpSupport;