import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Building2,
  Globe,
  MapPin,
  FileText,
  ArrowLeft,
  Pencil,
  Trash2,
  
} from "lucide-react";

import {
  getCompany,
  deleteCompany,
} from "../../api/companyApi";

function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCompany = async () => {
    try {
      const data = await getCompany(id);
      setCompany(data.company);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load company"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;
    try {
      const data = await deleteCompany(id);
      toast.success(data.message);
      navigate("/companies");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete Failed"
      );
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

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

  if (!company) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-950 flex flex-col items-center justify-center px-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-10 text-center max-w-md w-full backdrop-blur-xl">
          <Building2 className="mx-auto h-12 w-12 text-slate-500" />
          <h2 className="mt-4 text-2xl font-bold text-white">Company Not Found</h2>
          <p className="mt-2 text-sm text-slate-400">
            This company listing does not exist or was deleted.
          </p>
          <Link
            to="/companies"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Companies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Top Back Nav */}
      <div className="max-w-4xl mx-auto mb-6">
        <Link
          to="/companies"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Companies
        </Link>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          
          {/* Company Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-slate-800/80">
            <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-inner flex items-center justify-center">
              <img
                src={
                  company.logo ||
                  "https://placehold.co/120x120?text=Logo"
                }
                alt={company.name}
                className="h-full w-full object-contain rounded-xl"
              />
            </div>

            <div className="text-center sm:text-left space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {company.name}
              </h1>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-1">
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:underline"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    {company.website}
                  </a>
                )}

                {company.location && (
                  <div className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="h-3.5 w-3.5 text-slate-500" />
                    {company.location}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="py-8 border-b border-slate-800/80">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              About Organization
            </h3>
            <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-line">
              {company.description || "No description provided for this company."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              to={`/companies/edit/${company._id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-3 text-xs font-semibold text-amber-400 transition-all border border-slate-700/60"
            >
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Link>

            

            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 px-5 py-3 text-xs font-semibold text-rose-400 transition-all border border-rose-500/20 sm:ml-auto"
            >
              <Trash2 className="h-4 w-4" />
              Delete Company
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default CompanyDetails;