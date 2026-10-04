function CategoryCard({ title, jobs }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-2 hover:border-blue-500">

      <h3 className="text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-slate-400">
        {jobs} Jobs Available
      </p>

    </div>
  );
}

export default CategoryCard;