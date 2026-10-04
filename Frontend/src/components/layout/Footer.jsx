import { Link } from "react-router-dom";

function Footer() {
  return (
   <footer className="relative z-10 border-t border-slate-800 bg-transparent backdrop-blur-sm">

      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-10 px-8 py-16">

        {/* ---------- BRAND ---------- */}

        <div>

          <h2 className="text-3xl font-bold text-blue-500">
            Nexora
          </h2>

          <p className="mt-4 text-slate-400">
            AI Powered Career Platform helping developers build successful careers.
          </p>

        </div>

        {/* ---------- COMPANY ---------- */}

        <div>

          <h3 className="mb-4 text-xl font-semibold">
            Company
          </h3>

          <div className="space-y-3">

            <Link to="/">About</Link>

            <br />

            <Link to="/">Careers</Link>

            <br />

            <Link to="/">Contact</Link>

          </div>

        </div>

        {/* ---------- JOBS ---------- */}

        <div>

          <h3 className="mb-4 text-xl font-semibold">
            Jobs
          </h3>

          <div className="space-y-3">

            <Link to="/jobs">Browse Jobs</Link>

            <br />

            <Link to="/">Companies</Link>

            <br />

            <Link to="/">Dashboard</Link>

          </div>

        </div>

        {/* ---------- SUPPORT ---------- */}

        <div>

          <h3 className="mb-4 text-xl font-semibold">
            Support
          </h3>

          <div className="space-y-3">

            <Link to="/">Privacy Policy</Link>

            <br />

            <Link to="/">Terms & Conditions</Link>

            <br />

            <Link to="/">Help Center</Link>

          </div>

        </div>

      </div>

      {/* ---------- COPYRIGHT ---------- */}

      <div className="border-t border-slate-800 py-6 text-center text-slate-500">

        © 2026 Nexora. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;