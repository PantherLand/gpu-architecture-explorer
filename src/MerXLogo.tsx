export default function MerXLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="merx-left" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#1a6dd4" />
          <stop offset="100%" stopColor="#0d3d7a" />
        </linearGradient>
        <linearGradient id="merx-right" x1="1" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#2bc4e8" />
          <stop offset="100%" stopColor="#1a8db8" />
        </linearGradient>
        <linearGradient id="merx-center" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#45d6f0" />
          <stop offset="100%" stopColor="#1a73e8" />
        </linearGradient>
        <linearGradient id="merx-inner-left" x1="0.3" y1="0.2" x2="0.5" y2="0.8">
          <stop offset="0%" stopColor="#0e4a9a" />
          <stop offset="100%" stopColor="#072d5e" />
        </linearGradient>
        <linearGradient id="merx-inner-right" x1="0.7" y1="0.2" x2="0.5" y2="0.8">
          <stop offset="0%" stopColor="#1890c0" />
          <stop offset="100%" stopColor="#0b5f85" />
        </linearGradient>
      </defs>

      {/* Left outer face */}
      <polygon
        points="10,35 30,15 50,50 30,80"
        fill="url(#merx-left)"
      />

      {/* Right outer face */}
      <polygon
        points="90,35 70,15 50,50 70,80"
        fill="url(#merx-right)"
      />

      {/* Left inner face (shadow) */}
      <polygon
        points="30,15 50,35 50,50 30,80"
        fill="url(#merx-inner-left)"
      />

      {/* Right inner face (shadow) */}
      <polygon
        points="70,15 50,35 50,50 70,80"
        fill="url(#merx-inner-right)"
      />

      {/* Center top diamond highlight */}
      <polygon
        points="50,10 60,30 50,50 40,30"
        fill="url(#merx-center)"
        opacity="0.9"
      />

      {/* Bottom point */}
      <polygon
        points="30,80 50,50 70,80 50,95"
        fill="#0a3366"
      />
    </svg>
  );
}
