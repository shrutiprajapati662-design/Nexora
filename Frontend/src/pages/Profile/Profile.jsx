import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">

        {/* 1. TOP HEADER / BANNER SECTION (DIV 1) */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl backdrop-blur-sm md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* User Info & Avatar */}
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="h-28 w-28 rounded-full border-4 border-blue-500/30 object-cover shadow-lg ring-4 ring-slate-800"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-4xl font-bold text-white shadow-lg ring-4 ring-slate-800">
                  {user.name?.charAt(0)}
                </div>
              )}

              <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                  {user.name || "User Name"}
                </h1>
                <p className="text-blue-400 font-medium">
                  {user.professionalRole || "Software Developer"}
                </p>
                <p className="text-sm text-slate-400 flex items-center justify-center md:justify-start gap-1">
                  <span>📍</span> {user.location || "Location not set"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/profile/edit"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-all duration-200"
              >
                Edit Profile
              </Link>
              <button
                onClick={() => navigate("/change-password")}
                className="rounded-lg bg-slate-800 border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-all duration-200"
              >
                Change Password
              </button>
            </div>

          </div>
        </div>

        {/* BOTTOM EQUAL CONTAINER WRAPPER */}
        <div className="grid gap-6 md:grid-cols-3 items-stretch">

          {/* 2. LEFT CONTAINER - CONTACT & RESUME TOGETHER (DIV 2) */}
          <div className="md:col-span-1 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-md flex flex-col justify-between space-y-6">
            
            {/* Contact Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white border-b border-slate-800 pb-3">
                Contact Details
              </h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-slate-400 text-xs">Email Address</p>
                  <p className="font-medium text-slate-200 break-all">{user.email || "-"}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Phone Number</p>
                  <p className="font-medium text-slate-200">{user.phone || "-"}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Location</p>
                  <p className="font-medium text-slate-200">{user.location || "-"}</p>
                </div>
              </div>
            </div>

            {/* Resume / CV Section */}
            <div className="border-t border-slate-800 pt-5 space-y-3">
              <h2 className="text-lg font-semibold text-white">
                Resume / CV
              </h2>
              <div className="flex flex-col gap-3">
                <p className="text-xs text-slate-400">
                  {user?.resume ? "📄 Resume Uploaded" : "⚠️ No Resume Attached"}
                </p>
                {user?.resume ? (
                  <a
                    href={user.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-center items-center gap-2 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-4 py-2.5 text-sm font-medium hover:bg-emerald-600/30 transition"
                  >
                    View Resume
                  </a>
                ) : (
                  <p className="text-xs text-amber-400/80">
                    Upload your resume to apply for jobs directly.
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* 3. RIGHT CONTAINER - EDUCATION & CAREER TOGETHER (DIV 3) */}
          <div className="md:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-md flex flex-col justify-between space-y-6">
            
            {/* Education Section */}
            <div>
              <h2 className="mb-5 text-xl font-semibold text-white border-b border-slate-800 pb-3">
                Education
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-800/50 p-4 border border-slate-800">
                  <p className="text-xs text-slate-400">Qualification</p>
                  <p className="font-medium text-white">{user?.qualification || "Not Added"}</p>
                </div>
                <div className="rounded-xl bg-slate-800/50 p-4 border border-slate-800">
                  <p className="text-xs text-slate-400">College / University</p>
                  <p className="font-medium text-white">{user?.college || "Not Added"}</p>
                </div>
                <div className="rounded-xl bg-slate-800/50 p-4 border border-slate-800">
                  <p className="text-xs text-slate-400">Specialization</p>
                  <p className="font-medium text-white">{user?.specialization || "Not Added"}</p>
                </div>
                <div className="rounded-xl bg-slate-800/50 p-4 border border-slate-800">
                  <p className="text-xs text-slate-400">Passing Year</p>
                  <p className="font-medium text-white">{user?.passingYear || "Not Added"}</p>
                </div>
                <div className="rounded-xl bg-slate-800/50 p-4 border border-slate-800 sm:col-span-2">
                  <p className="text-xs text-slate-400">CGPA / Percentage</p>
                  <p className="font-medium text-white">{user?.cgpa || "Not Added"}</p>
                </div>
              </div>
            </div>

            {/* Career / Work Experience Section */}
            <div className="border-t border-slate-800 pt-5">
              <h2 className="mb-5 text-xl font-semibold text-white border-b border-slate-800 pb-3">
                Career Details
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-800/50 p-4 border border-slate-800">
                  <p className="text-xs text-slate-400">Current Company</p>
                  <p className="font-medium text-white">{user?.currentCompany || "Not Added"}</p>
                </div>
                <div className="rounded-xl bg-slate-800/50 p-4 border border-slate-800">
                  <p className="text-xs text-slate-400">Current CTC</p>
                  <p className="font-medium text-white">{user?.currentCTC || "Not Added"}</p>
                </div>
                <div className="rounded-xl bg-slate-800/50 p-4 border border-slate-800">
                  <p className="text-xs text-slate-400">Expected CTC</p>
                  <p className="font-medium text-white">{user?.expectedCTC || "Not Added"}</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;