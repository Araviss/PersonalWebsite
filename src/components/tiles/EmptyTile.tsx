'use client';

/**
 * EmptyTile — Nintendo Switch-style placeholder tile
 * 
 * Visual specifications (from Switch screenshot analysis):
 * - Same dimensions as GameTile: w-[20vw] min-w-[112px] max-w-[400px] aspect-square
 * - Fill: theme-aware (--tile-empty: #F5F5F5 light / #3A3A3A dark)
 * - Outer border: 1px solid separator
 * - Inner border: subtle inset line creating frame effect
 * - Corners: rounded-tile (4px)
 * - No interaction states, purely decorative
 */
export function EmptyTile() {
  return (
    <div
      className="w-[20vw] min-w-[112px] max-w-[400px] aspect-square shrink-0 rounded-tile border border-separator bg-tile-empty p-[3px]"
      aria-hidden="true"
    >
      {/* Inner frame border */}
      <div className="h-full w-full rounded-[2px] border border-separator/50" />
    </div>
  );
}
