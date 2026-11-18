export function Logo() {
  return (
    <span className="inline-flex items-center gap-2 text-[15px] font-semibold tracking-tight">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
        <rect width="24" height="24" rx="6" fill="currentColor" />
        <path
          d="M8 6.5v11M8 12l7-5.5M10.5 10.2 16 17.5"
          stroke="var(--color-fd-background)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Kova UI
    </span>
  )
}
