// Minimalistiske produktikoner
export const MilkIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M8 2h8v3l1 1v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6l1-1V2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(59, 130, 246, 0.1)"
    />
    <path d="M8 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const BreadIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M4 12c0-4 2-6 8-6s8 2 8 6-2 6-8 6-8-2-8-6z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(245, 158, 11, 0.1)"
    />
    <path d="M8 12h.01M12 12h.01M16 12h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const FishIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M6.5 12c0-3 2.5-5 5.5-5s5.5 2 5.5 5-2.5 5-5.5 5-5.5-2-5.5-5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(239, 68, 68, 0.1)"
    />
    <path
      d="M18 12l3-2-3-2M6 12l-3-2 3-2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="15" cy="10" r="1" fill="currentColor" />
  </svg>
)

export const YogurtIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M8 4h8v2l-1 14H9L8 6V4z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(168, 85, 247, 0.1)"
    />
    <path d="M8 4h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const AppleIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 3c-3 0-5 2-5 5 0 4 2 8 5 8s5-4 5-8c0-3-2-5-5-5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(34, 197, 94, 0.1)"
    />
    <path d="M12 3c1-1 2-1 2 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 2c0 1 1 1 2 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ChickenIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M6 8c0-3 2-5 6-5s6 2 6 5v8c0 2-1 3-3 3H9c-2 0-3-1-3-3V8z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(251, 191, 36, 0.1)"
    />
    <path d="M9 12h6M9 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const getProductIcon = (productName: string) => {
  const name = productName.toLowerCase()
  if (name.includes("melk")) return MilkIcon
  if (name.includes("brød")) return BreadIcon
  if (name.includes("laks") || name.includes("fisk")) return FishIcon
  if (name.includes("yoghurt")) return YogurtIcon
  if (name.includes("epler") || name.includes("frukt")) return AppleIcon
  if (name.includes("kylling") || name.includes("kjøtt")) return ChickenIcon
  return MilkIcon // default
}
