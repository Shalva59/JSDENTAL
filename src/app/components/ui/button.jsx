export function Button({ children, className = "", asChild, size, variant, ...props }) {
  const baseClass = "px-4 py-2 rounded font-medium"
  const sizeClass = size === "lg" ? "px-6 py-3 text-lg" : ""
  const variantClass =
    variant === "secondary"
      ? "bg-blue-500 text-white"
      : variant === "outline"
        ? "border border-current bg-transparent"
        : "bg-primary text-white"

  const combinedClass = `${baseClass} ${sizeClass} ${variantClass} ${className}`

  if (asChild) {
    return (
      <div className={combinedClass} {...props}>
        {children}
      </div>
    )
  }

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  )
}

export default Button

