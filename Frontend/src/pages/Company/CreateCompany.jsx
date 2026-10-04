import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
    Building2,
    Globe,
    MapPin,
    FileText,
    ArrowLeft,
    Upload,
    PlusCircle
} from "lucide-react";

import { createCompany } from "../../api/companyApi";

function CreateCompany() {
    const [logo, setLogo] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogoChange = (e) => {

        setLogo(e.target.files[0]);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = await createCompany(formData);
            toast.success(data.message || "Company created successfully!");
            navigate("/companies");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Company Creation Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-slate-950 py-6 px-4 sm:px-6 lg:px-8">

            {/* Top Bar - Left Aligned Back Link */}
            <div className="max-w-6xl mx-auto mb-6">
                <Link
                    to="/companies"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Companies
                </Link>
            </div>

            {/* Main Form Container */}
            <div className="mx-auto max-w-3xl">

                {/* Header */}
                <div className="mb-8 text-center sm:text-left">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        Register New Company
                    </h1>
                    <p className="mt-1.5 text-sm text-slate-400">
                        Set up your organization profile to start posting tech jobs on Nexora.
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Grid for Name & Website */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                            {/* Company Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                                    Company Name <span className="text-blue-500">*</span>
                                </label>
                                <div className="relative rounded-xl shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                        <Building2 className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Acme Corporation"
                                        className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 hover:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                            </div>

                            {/* Website */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                                    Website URL
                                </label>
                                <div className="relative rounded-xl shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                        <Globe className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        placeholder="https://example.com"
                                        className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 hover:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                                Headquarters / Location
                            </label>
                            <div className="relative rounded-xl shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. San Francisco, CA or Remote"
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 hover:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                        </div>

                        {/* Logo Upload Placeholder */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                                Company Logo
                            </label>
                            <div className="flex justify-center rounded-xl border-2 border-dashed border-slate-800 bg-slate-950/40 px-6 py-6 transition-colors hover:border-slate-700">
                                <div className="text-center">
                                    <Upload className="mx-auto h-8 w-8 text-slate-500" />
                                    <div className="mt-2 flex text-sm text-slate-400">
                                        <label className="cursor-pointer rounded-md font-medium text-blue-400 hover:underline">

                                            Upload a logo

                                            <input
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                onChange={handleLogoChange}
                                            />

                                        </label>

                                        <p className="pl-1">
                                            or drag and drop
                                        </p>
                                    </div>

                                    {logo && (
                                        <div className="mt-4 flex justify-center">
                                            <img
                                                src={URL.createObjectURL(logo)}
                                                alt="Company Logo Preview"
                                                className="h-20 w-20 rounded-xl border border-slate-700 object-cover"
                                            />
                                        </div>
                                    )}


                                    <p className="text-xs text-slate-500 mt-1">PNG, JPG, SVG up to 2MB</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                                About Company
                            </label>
                            <div className="relative rounded-xl shadow-sm">
                                <div className="pointer-events-none absolute top-3.5 left-0 flex items-center pl-3.5 text-slate-400">
                                    <FileText className="h-4 w-4" />
                                </div>
                                <textarea
                                    rows={4}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Briefly describe what your company does, your culture, and tech stack..."
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 hover:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:bg-blue-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    "Creating Organization..."
                                ) : (
                                    <>
                                        <PlusCircle className="h-4 w-4" />
                                        Create Company
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default CreateCompany;