function TestimonialCard({ name, role, review }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition duration-300 hover:-translate-y-2 hover:border-blue-500">

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold">
        {name.charAt(0)}
      </div>

      <h3 className="mt-5 text-xl font-bold">
        {name}
      </h3>

      <p className="text-sm text-slate-400">
        {role}
      </p>

      <p className="mt-5 text-slate-300">
        "{review}"
      </p>

    </div>
  );
}

export default TestimonialCard;