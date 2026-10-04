import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Building2,
  Globe,
  MapPin,
  Plus,
  ArrowRight,
  ExternalLink,
  Search,
  SlidersHorizontal,
  CheckCircle2,
  Activity,
} from "lucide-react";

import { getCompanies } from "../../api/companyApi";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data.companies || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load companies"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const locations = useMemo(() => {
    const defaultLocations = [
      "Bengaluru, India",
      "Hyderabad, India",
      "Pune, India",
      "Mumbai, India",
      "Chennai, India",
      "Noida, India",
      "Gurugram, India",
      "Delhi, India",
      "Kolkata, India",
      "Ahmedabad, India",
      "San Francisco, USA",
      "London, UK",
    ];

    const apiLocs = companies
      .map((c) => c.location)
      .filter((loc) => loc && loc.trim() !== "");

    return ["all", ...Array.from(new Set([...defaultLocations, ...apiLocs]))];
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch =
        company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        selectedLocation === "all" || company.location === selectedLocation;

      return matchesSearch && matchesLocation;
    });
  }, [companies, searchTerm, selectedLocation]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 theme-muted">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
          <span className="text-sm font-medium">Loading Directory...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full theme-badge px-3 py-0.5 text-xs font-semibold mb-2.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified Directory
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight theme-text sm:text-4xl">
              Registered Companies
            </h1>
            <p className="mt-1 text-sm theme-muted">
              Manage and explore all hiring organizations registered on Nexora platform.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2">
              <Building2 className="h-4 w-4 text-blue-500" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider theme-muted font-medium">Companies</span>
                <span className="text-sm font-bold theme-text leading-tight">{companies.length}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2">
              <Globe className="h-4 w-4 text-emerald-500" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider theme-muted font-medium">Locations</span>
                <span className="text-sm font-bold theme-text leading-tight">{locations.length - 1}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2">
              <Activity className="h-4 w-4 text-indigo-500" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider theme-muted font-medium">Hiring</span>
                <span className="text-xs font-bold text-emerald-500 leading-tight">Active</span>
              </div>
            </div>

            <Link
              to="/companies/create"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 active:scale-[0.98] ml-auto sm:ml-2"
            >
              <Plus className="h-4 w-4" />
              Add Company
            </Link>
          </div>
        </div>

        {/* Search Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-sm">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 theme-muted" />
            <input
              type="text"
              placeholder="Search companies by name or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 theme-text pl-10 pr-4 py-2 text-sm outline-none transition-colors focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-medium theme-muted pl-1">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Location:</span>
            </div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 theme-text px-3 py-2 text-sm outline-none cursor-pointer focus:border-blue-500"
            >
              <option value="all">All Locations</option>
              {locations.filter((l) => l !== "all").map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Company Cards Grid */}
        {filteredCompanies.length === 0 ? (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-500">
              <Building2 className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-base font-semibold theme-text">
              No Companies Found
            </h2>
            <p className="mt-1 text-xs theme-muted">
              Try adjusting your search queries or location filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((company) => (
              <div
                key={company._id}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2 shadow-sm flex items-center justify-center">
                      <img
                        src={
                          company.logo ||
                          "https://placehold.co/100x100?text=Logo"
                        }
                        alt={company.name}
                        className="h-full w-full object-contain rounded-lg"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-md theme-badge px-2 py-0.5 text-[10px] font-semibold">
                        Employer
                      </span>
                      {company.website && (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noreferrer"
                          className="theme-muted hover:text-blue-500 transition-colors p-1"
                          title="Visit Official Website"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h2 className="text-lg font-bold theme-text tracking-tight group-hover:text-blue-500 transition-colors">
                    {company.name}
                  </h2>

                  {company.description && (
                    <p className="mt-1.5 text-xs theme-muted line-clamp-2 leading-relaxed">
                      {company.description}
                    </p>
                  )}

                  <div className="mt-4 space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    <div className="flex items-center gap-2 text-xs theme-muted">
                      <Globe className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                      <span className="truncate">
                        {company.website || "No Website Provided"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs theme-muted">
                      <MapPin className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                      <span className="truncate">
                        {company.location || "Location Not Added"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <Link
                    to={`/companies/${company._id}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-50 dark:bg-slate-800/80 hover:bg-blue-600 text-blue-600 dark:text-slate-200 hover:text-white dark:hover:text-white px-4 py-2 text-xs font-semibold transition-all duration-200"
                  >
                    View Profile
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default CompanyList;