export function LogoMark({ className = "w-7 h-7", "aria-hidden": ariaHidden = true }) {
  return (
    <div
      className={`${className} rounded-xl bg-primary flex items-center justify-center shrink-0`}
      aria-hidden={ariaHidden}
    >
      <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 2C5.239 2 3 4.239 3 7c0 1.657.805 3.13 2.044 4.048L4.5 14h7l-.544-2.952A4.996 4.996 0 0013 7c0-2.761-2.239-5-5-5z"
          fill="currentColor"
          opacity=".3"
        />
        <path
          d="M5.5 7h5M8 4.5v5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export function Brand({ size = "md" }) {
  const markSize = size === "sm" ? "w-6 h-6" : "w-7 h-7"
  const labelClass =
    size === "sm"
      ? "font-display text-lg text-foreground tracking-tight"
      : "font-display text-xl text-foreground tracking-tight"

  return (
    <div className="flex items-center gap-2.5">
      <LogoMark className={markSize} />
      <span className={labelClass}>MindScreen</span>
    </div>
  )
}
