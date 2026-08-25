const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer select-none active:scale-[0.98]"

const BUTTON_SIZES = {
  sm: "px-4 py-2 text-sm",
  lg: "px-8 py-3.5 text-base",
}

const BUTTON_VARIANTS = {
  primary:
    "bg-primary text-white hover:bg-primary-hover focus-visible:outline-primary shadow-sm",
  ghost: "bg-transparent text-foreground hover:bg-muted",
  outline: "bg-surface border border-border text-foreground hover:bg-muted",
}

export function Button({
  children,
  variant = "primary",
  size = "sm",
  className = "",
  type = "button",
  ...props
}) {
  const sizeClass = BUTTON_SIZES[size] ?? BUTTON_SIZES.sm
  const variantClass = BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.primary

  return (
    <button
      type={type}
      className={`${BUTTON_BASE} ${sizeClass} ${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
