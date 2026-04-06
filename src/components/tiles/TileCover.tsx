import type { Project } from '@/data/projects';

interface TileCoverProps {
  project: Project;
}

/**
 * CSS/SVG-driven cover art for game tiles.
 * Renders a gradient background with a centered tech icon and project title.
 */
export function TileCover({ project }: TileCoverProps) {
  const theme = project.theme;
  const gradient = theme?.gradient ?? 'linear-gradient(135deg, #454545 0%, #2d2d2d 100%)';
  const accentColor = theme?.accentColor ?? '#ffffff';

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center gap-3 p-4"
      style={{ background: gradient }}
    >
      {/* Subtle diagonal pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 8px, currentColor 8px, currentColor 9px)',
          color: accentColor,
        }}
        aria-hidden="true"
      />

      {/* Tech icon — centered */}
      {theme?.icon && (
        <svg
          className="relative z-10 h-[35%] w-[35%] drop-shadow-md"
          viewBox="0 0 24 24"
          fill={accentColor}
          aria-hidden="true"
        >
          <path d={theme.icon} />
        </svg>
      )}

      {/* Bottom: tech badge */}
      {project.techStack[0] && (
        <span
          className="relative z-10 rounded-full px-3 py-1 text-[clamp(8px,0.9vw,11px)] font-medium"
          style={{
            backgroundColor: `${accentColor}33`,
            color: accentColor,
          }}
        >
          {project.techStack[0]}
        </span>
      )}
    </div>
  );
}
