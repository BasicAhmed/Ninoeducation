export function CessnaIllustration(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 1000 420" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="nino-plane-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#eae7e1" />
          <stop offset="100%" stopColor="#cbc7bd" />
        </linearGradient>
        <linearGradient id="nino-plane-wing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d8d4cc" />
        </linearGradient>
        <linearGradient id="nino-plane-fin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d8d4cc" />
          <stop offset="100%" stopColor="#f2f0eb" />
        </linearGradient>
        <radialGradient id="nino-plane-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0b0d0f" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0b0d0f" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="530" cy="392" rx="270" ry="16" fill="url(#nino-plane-shadow)" />

      {/* horizontal stabilizer */}
      <path
        d="M 55 220 L 150 210 L 158 222 L 150 234 L 55 232 C 46 231, 46 221, 55 220 Z"
        fill="url(#nino-plane-fin)"
        stroke="#b9b4a9"
        strokeWidth="1.5"
      />

      {/* vertical fin */}
      <path
        d="M 150 232 C 145 190, 152 145, 175 118 C 188 104, 198 106, 196 122 L 182 230 Z"
        fill="url(#nino-plane-fin)"
        stroke="#b9b4a9"
        strokeWidth="1.5"
      />
      <path
        d="M 152 232 L 118 236 L 120 246 L 168 246 Z"
        fill="url(#nino-plane-fin)"
        stroke="#b9b4a9"
        strokeWidth="1.5"
      />

      {/* fuselage */}
      <path
        d="M 150 224 C 155 185, 190 162, 240 158 L 640 158 C 700 158, 760 180, 800 215 C 820 232, 800 248, 760 250 L 220 254 C 175 253, 152 244, 150 224 Z"
        fill="url(#nino-plane-body)"
        stroke="#b9b4a9"
        strokeWidth="1.5"
      />

      {/* cabin windows */}
      <path d="M 300 175 L 470 172 L 478 210 L 300 212 Z" fill="#0b0d0f" opacity="0.55" />
      <line x1="365" y1="173" x2="360" y2="211" stroke="#eae7e1" strokeWidth="3" />
      <line x1="420" y1="172" x2="418" y2="210" stroke="#eae7e1" strokeWidth="3" />

      {/* accent stripe */}
      <path d="M 225 232 L 770 224 L 770 231 L 225 239 Z" fill="#fe5200" />

      {/* wing struts */}
      <line x1="335" y1="200" x2="300" y2="90" stroke="#b9b4a9" strokeWidth="6" />
      <line x1="560" y1="200" x2="600" y2="90" stroke="#b9b4a9" strokeWidth="6" />

      {/* high wing */}
      <path
        d="M 40 92 L 900 60 C 930 59, 950 68, 950 80 C 950 92, 930 100, 900 100 L 40 118 C 15 118, 5 108, 5 100 C 5 92, 15 93, 40 92 Z"
        fill="url(#nino-plane-wing)"
        stroke="#b9b4a9"
        strokeWidth="1.5"
      />

      {/* nose / engine cowl */}
      <path
        d="M 800 214 C 850 206, 895 214, 918 230 C 928 238, 922 250, 895 254 L 800 250 Z"
        fill="url(#nino-plane-body)"
        stroke="#b9b4a9"
        strokeWidth="1.5"
      />

      {/* spinner + propeller */}
      <ellipse cx="925" cy="232" rx="10" ry="15" fill="#cfcbc2" stroke="#b9b4a9" strokeWidth="1.5" />
      <ellipse cx="935" cy="232" rx="7" ry="50" fill="#0b0d0f" opacity="0.1" />
      <rect
        x="931"
        y="184"
        width="6"
        height="96"
        rx="3"
        fill="#5b5750"
        opacity="0.55"
        transform="rotate(8 934 232)"
      />

      {/* landing gear */}
      <line x1="235" y1="252" x2="218" y2="330" stroke="#8f8b82" strokeWidth="6" />
      <circle cx="215" cy="345" r="22" fill="#0b0d0f" />
      <circle cx="215" cy="345" r="22" fill="none" stroke="#fe5200" strokeWidth="3" />

      <line x1="700" y1="250" x2="715" y2="330" stroke="#8f8b82" strokeWidth="6" />
      <circle cx="718" cy="345" r="22" fill="#0b0d0f" />
      <circle cx="718" cy="345" r="22" fill="none" stroke="#fe5200" strokeWidth="3" />

      <line x1="825" y1="242" x2="848" y2="300" stroke="#8f8b82" strokeWidth="5" />
      <circle cx="851" cy="312" r="16" fill="#0b0d0f" />
    </svg>
  );
}
