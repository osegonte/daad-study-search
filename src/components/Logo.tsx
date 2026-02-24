// src/components/Logo.tsx
// Reusable Logo component — swap real asset by replacing the SVG inside

type LogoProps = {
  variant?: 'full' | 'mark' // full = mark + wordmark, mark = icon only
  className?: string
  size?: number
}

export default function Logo({ variant = 'full', className = '', size = 32 }: LogoProps) {
  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle cx="22" cy="22" r="21" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.15" />
      {/* Globe equator */}
      <ellipse cx="22" cy="22" rx="21" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
      {/* Vertical axis */}
      <ellipse cx="22" cy="22" rx="10" ry="21" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
      {/* Orbit ring — tilted */}
      <ellipse
        cx="22"
        cy="22"
        rx="18"
        ry="7"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        transform="rotate(-30 22 22)"
      />
      {/* Dot on orbit */}
      <circle cx="33" cy="14" r="3" fill="currentColor" />
      {/* Center dot */}
      <circle cx="22" cy="22" r="3" fill="currentColor" />
    </svg>
  )

  if (variant === 'mark') {
    return (
      <span className={`text-accent ${className}`}>
        {mark}
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="text-accent">{mark}</span>
      <span
        className="font-bold text-foreground leading-none"
        style={{ fontSize: size * 0.55 }}
      >
        Studymetaverse
      </span>
    </span>
  )
}