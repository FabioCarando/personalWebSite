"use client";

export default function HongKongMap() {
  return (
    <svg
      viewBox="0 0 1200 900"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8e7e1" />
          <stop offset="100%" stopColor="#cfcec8" />
        </linearGradient>

        <radialGradient id="islandShade">
          <stop offset="0%" stopColor="#c8c7bf" />
          <stop offset="100%" stopColor="#b8b7af" />
        </radialGradient>

        {/* Filter for subtle shadow */}
        <filter id="islandShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
      </defs>

      {/* Water base */}
      <rect width="1200" height="900" fill="url(#waterGrad)" />

      {/* Deep water areas (subtle) */}
      <path
        d="M 0 0 L 1200 0 L 1200 900 L 0 900 Z"
        fill="url(#waterGrad)"
        opacity="0.4"
      />

      {/* NEW TERRITORIES - Northern region */}
      <path
        d="M 350 120 Q 500 100 650 140 L 680 240 Q 600 220 500 230 Q 400 240 350 240 Z"
        fill="#c8c7bf"
        stroke="#999893"
        strokeWidth="0.8"
        filter="url(#islandShadow)"
      />

      {/* KOWLOON PENINSULA - Larger and more detailed */}
      <path
        d="M 380 240 Q 420 250 450 270 L 480 350 Q 460 380 430 400 L 380 380 Q 360 340 380 240 Z"
        fill="url(#islandShade)"
        stroke="#999893"
        strokeWidth="1.2"
        filter="url(#islandShadow)"
      />

      {/* HONG KONG ISLAND - Main island, more realistic */}
      <path
        d="M 480 350 Q 540 340 600 350 Q 650 360 680 390 Q 700 440 680 500 Q 640 530 580 540 Q 520 535 480 520 Z"
        fill="url(#islandShade)"
        stroke="#999893"
        strokeWidth="1.2"
        filter="url(#islandShadow)"
      />

      {/* LANTAU ISLAND - West of HK Island */}
      <path
        d="M 250 400 Q 320 380 370 410 Q 390 480 350 560 Q 290 580 240 560 Z"
        fill="url(#islandShade)"
        stroke="#999893"
        strokeWidth="1.2"
        filter="url(#islandShadow)"
      />

      {/* LAMMA ISLAND - South */}
      <path
        d="M 550 580 Q 620 560 660 590 Q 670 650 620 680 Q 560 690 540 650 Z"
        fill="url(#islandShade)"
        stroke="#999893"
        strokeWidth="1"
        filter="url(#islandShadow)"
      />

      {/* CHEUNG CHAU - Small island west */}
      <circle cx="320" cy="520" r="18" fill="url(#islandShade)" stroke="#999893" strokeWidth="0.8" />

      {/* PENG CHAU - Tiny island */}
      <circle cx="290" cy="480" r="12" fill="url(#islandShade)" stroke="#999893" strokeWidth="0.8" />

      {/* Small islands north */}
      <circle cx="480" cy="200" r="10" fill="#c8c7bf" stroke="#999893" strokeWidth="0.6" />
      <circle cx="550" cy="180" r="8" fill="#c8c7bf" stroke="#999893" strokeWidth="0.6" />
      <circle cx="620" cy="200" r="9" fill="#c8c7bf" stroke="#999893" strokeWidth="0.6" />

      {/* VICTORIA HARBOUR - The iconic crescent shaped harbor */}
      <path
        d="M 420 380 Q 480 370 520 390 Q 510 420 480 430 Q 440 435 420 420 Z"
        fill="#e8e7e1"
        stroke="#999893"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Harbor inner detail line */}
      <path
        d="M 430 395 Q 470 388 510 398"
        stroke="#999893"
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
      />

      {/* Star Ferry route indicator (subtle line) */}
      <line
        x1="430"
        y1="375"
        x2="450"
        y2="415"
        stroke="#ea580c"
        strokeWidth="0.8"
        opacity="0.4"
        strokeDasharray="3,3"
      />

      {/* CURRENT LOCATION MARKER - Central HK Island */}
      <g transform="translate(580, 430)">
        {/* Outer glow circle */}
        <circle
          cx="0"
          cy="0"
          r="24"
          fill="none"
          stroke="#ea580c"
          strokeWidth="0.8"
          opacity="0.25"
        />

        {/* Middle indicator ring */}
        <circle
          cx="0"
          cy="0"
          r="14"
          fill="none"
          stroke="#ea580c"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Central dot */}
        <circle cx="0" cy="0" r="7" fill="#ea580c" opacity="0.9" />

        {/* Inner highlight */}
        <circle cx="0" cy="0" r="3" fill="#fff" opacity="0.6" />
      </g>

      {/* MAINLAND CHINA - Shenzhen region (subtle background) */}
      <path
        d="M 350 80 Q 700 70 750 120 L 750 140 Q 700 100 350 110 Z"
        fill="#d9d8d2"
        opacity="0.3"
      />

      <text
        x="550"
        y="95"
        fontSize="10"
        fill="#111111"
        opacity="0.25"
        fontFamily="monospace"
        textAnchor="middle"
      >
        Shenzhen (China)
      </text>

      {/* COMPASS - Minimalist design */}
      <g transform="translate(1080, 80)">
        {/* Compass circle */}
        <circle
          cx="0"
          cy="0"
          r="28"
          fill="none"
          stroke="#111111"
          strokeWidth="0.8"
          opacity="0.3"
        />

        {/* North arrow */}
        <line
          x1="0"
          y1="-18"
          x2="0"
          y2="-26"
          stroke="#ea580c"
          strokeWidth="1.5"
        />

        {/* Cardinal points */}
        <text
          x="0"
          y="-32"
          fontSize="9"
          fontWeight="600"
          fill="#ea580c"
          textAnchor="middle"
        >
          N
        </text>

        <text
          x="24"
          y="4"
          fontSize="8"
          fill="#111111"
          opacity="0.4"
          textAnchor="middle"
        >
          E
        </text>

        <text
          x="0"
          y="36"
          fontSize="8"
          fill="#111111"
          opacity="0.4"
          textAnchor="middle"
        >
          S
        </text>

        <text
          x="-24"
          y="4"
          fontSize="8"
          fill="#111111"
          opacity="0.4"
          textAnchor="middle"
        >
          W
        </text>
      </g>

      {/* SCALE BAR - Clean design */}
      <g transform="translate(50, 820)">
        {/* Main scale line */}
        <line
          x1="0"
          y1="0"
          x2="80"
          y2="0"
          stroke="#111111"
          strokeWidth="1.2"
          opacity="0.5"
        />

        {/* End markers */}
        <line
          x1="0"
          y1="-4"
          x2="0"
          y2="4"
          stroke="#111111"
          strokeWidth="1"
          opacity="0.5"
        />

        <line
          x1="80"
          y1="-4"
          x2="80"
          y2="4"
          stroke="#111111"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Label */}
        <text
          x="40"
          y="18"
          fontSize="9"
          fontFamily="monospace"
          fill="#111111"
          opacity="0.5"
          textAnchor="middle"
        >
          15 km
        </text>
      </g>

      {/* LOCATION LABELS - Refined typography */}
      <text
        x="420"
        y="310"
        fontSize="13"
        fontWeight="600"
        fill="#111111"
        opacity="0.7"
        fontFamily="system-ui"
        textAnchor="middle"
      >
        Kowloon
      </text>

      <text
        x="590"
        y="480"
        fontSize="13"
        fontWeight="600"
        fill="#111111"
        opacity="0.7"
        fontFamily="system-ui"
        textAnchor="middle"
      >
        Hong Kong
        <tspan x="590" dy="15">
          Island
        </tspan>
      </text>

      <text
        x="310"
        y="495"
        fontSize="11"
        fill="#111111"
        opacity="0.55"
        fontFamily="system-ui"
        textAnchor="middle"
      >
        Lantau
      </text>

      <text
        x="600"
        y="620"
        fontSize="10"
        fill="#111111"
        opacity="0.5"
        fontFamily="system-ui"
        textAnchor="middle"
      >
        Lamma
      </text>

      <text
        x="465"
        y="395"
        fontSize="10"
        fill="#111111"
        opacity="0.45"
        fontFamily="monospace"
        textAnchor="middle"
      >
        Victoria Harbour
      </text>

      {/* INFO BOX - New Territories label */}
      <g transform="translate(500, 180)">
        <rect
          x="-50"
          y="-10"
          width="100"
          height="20"
          fill="#111111"
          opacity="0.05"
          rx="3"
        />

        <text
          x="0"
          y="5"
          fontSize="9"
          fill="#111111"
          opacity="0.4"
          fontFamily="monospace"
          textAnchor="middle"
        >
          New Territories
        </text>
      </g>
    </svg>
  );
}
