export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full rounded-lg border border-slate-300 bg-slate-100/70 p-3 text-slate-800 outline-none transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-slate-500 dark:focus:border-blue-500 dark:focus:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    </div>
  );
}