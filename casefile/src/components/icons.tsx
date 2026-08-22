// Minimal inline SVG icon set — consistent stroke weight, no external icon library.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const FolderIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
  </svg>
);

export const UsersIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5" />
    <path d="M16 8.2a3 3 0 1 1 3.2 5.4" />
    <path d="M15 14.6c2.8.4 4.5 2.3 4.5 5.4" />
  </svg>
);

export const MagnifierIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M20 20l-4.5-4.5" />
  </svg>
);

export const MapIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Z" />
    <path d="M9 4v13" />
    <path d="M15 6.5v13" />
  </svg>
);

export const ChatIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 5h16v10H8l-4 4Z" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const PinboardIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="1.5" />
    <circle cx="8" cy="8" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="16" cy="9" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="10" cy="16" r="1.3" fill="currentColor" stroke="none" />
    <path d="M8 8l8 1M8 8l2 8" />
  </svg>
);

export const NotebookIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 3h12v18H6z" />
    <path d="M6 7h12M6 11h12M6 15h8" />
    <path d="M3 6h2M3 11h2M3 16h2" />
  </svg>
);

export const GavelIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 5l5 5" />
    <path d="M8.5 10.5 3 16l2 2 5.5-5.5" />
    <path d="M11 3l10 10" />
    <path d="M3 21h9" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg {...base} viewBox="0 0 24 24" fill="currentColor" stroke="none" {...p}>
    <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.6 1.6 6.8L12 17.6 5.8 20.9l1.6-6.8L2.2 9.5l6.9-.7Z" />
  </svg>
);

export const LockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="1.5" />
    <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
  </svg>
);

export const AlertIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3 2 20h20L12 3Z" />
    <path d="M12 10v4" />
    <circle cx="12" cy="17" r="0.4" fill="currentColor" />
  </svg>
);

export const XIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const LinkIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 15l6-6" />
    <path d="M10 6.5 12 4.4a3.5 3.5 0 0 1 5 5L15 11.4" />
    <path d="M14 17.5 12 19.6a3.5 3.5 0 0 1-5-5L9 12.6" />
  </svg>
);

export const TargetIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" />
  </svg>
);
