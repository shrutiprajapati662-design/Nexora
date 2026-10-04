function CompanyCard({ company, openings }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition duration-300 hover:-translate-y-2 hover:border-blue-500">

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold">
        {company.charAt(0)}
      </div>

      <h3 className="mt-5 text-2xl font-bold">
        {company}
      </h3>

      <p className="mt-2 text-slate-400">
        {openings}+ Open Positions
      </p>

    </div>
  );
}

export default CompanyCard;
