import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Building2,
  Globe,
  MapPin,
  FileText,
  ArrowLeft,
  Save,
  Upload,
} from "lucide-react";

import {
  getCompany,
  updateCompany,
  uploadCompanyLogo,
} from "../../api/companyApi";

function EditCompany() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
  });

  const [logo, setLogo] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const fetchCompany = async () => {
    try {
      const data = await getCompany(id);
      setFormData({
        name: data.company.name || "",
        description: data.company.description || "",
        website: data.company.website || "",
        location: data.company.location || "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load company"
      );
      navigate("/companies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const data = await updateCompany(id, formData);

      if (logo) {
        const logoData = new FormData();
        logoData.append("logo", logo);
        await uploadCompanyLogo(id, logoData);
      }

      toast.success(data.message || "Company updated successfully");
      navigate(`/companies/${id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          <span className="text-base font-medium">Loading Company...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Top Back Nav */}
      <div className="max-w-3xl mx-auto mb-6">
        <Link
          to={`/companies/${id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Details
        </Link>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Edit Company Profile
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Update organization information and official branding assets.
            </p>
          </div>

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
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 hover:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

            </div>

            {/* Location Field */}
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
                  placeholder="e.g. London, UK"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 hover:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Company Logo Upload */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Update Company Logo
              </label>
              <div className="relative flex justify-center rounded-xl border-2 border-dashed border-slate-800 bg-slate-950/40 p-5 transition-colors hover:border-slate-700">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />
                <div className="text-center">
                  <Upload className="mx-auto h-6 w-6 text-slate-400" />
                  <p className="mt-1 text-xs text-slate-300 font-medium">
                    {logo ? logo.name : "Click or drag new logo file to replace"}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">PNG, JPG or SVG up to 2MB</p>
                </div>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Description
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
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 hover:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:bg-blue-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  "Saving Changes..."
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
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

export default EditCompany;