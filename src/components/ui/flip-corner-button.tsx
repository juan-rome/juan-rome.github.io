/** A small corner pill that flips a card, shared between the Experience
 *  timeline cards and the Gadget cards so both flip mechanics read as one
 *  pattern site-wide. */
export function FlipCornerButton({
  label,
  onToggleFlip,
}: {
  label: string;
  onToggleFlip: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggleFlip();
      }}
      className="border-border-strong bg-background text-muted hover:text-foreground absolute top-3.5 right-3.5 flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M4 4v5h5M20 20v-5h-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </button>
  );
}
