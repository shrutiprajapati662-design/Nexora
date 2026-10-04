export default function Button({
  children,
  type = "button",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        w-full
        rounded-xl
        bg-gradient-to-r
        from-blue-600
        to-violet-600
        px-5
        py-3
        font-semibold
        text-white
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-xl
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}