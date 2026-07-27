const CONTROL =
  "h-11 rounded-full border border-border bg-surface px-5 text-sm text-muted disabled:cursor-not-allowed";

export type Chip = { key: string; label: string; count?: number };

/**
 * Layout only — every control is disabled until search and filtering are wired
 * up. Kept inert rather than decorative so nothing looks clickable but dead.
 */
export default function FilterBar({
  searchLabel,
  searchPlaceholder,
  sortOptions,
  allLabel,
  chips,
  note = "Search and filtering are coming soon.",
}: {
  searchLabel: string;
  searchPlaceholder: string;
  sortOptions?: { value: string; label: string }[];
  allLabel: string;
  chips: Chip[];
  note?: string;
}) {
  return (
    <div className="mb-10 flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon />
          <input
            type="search"
            disabled
            placeholder={searchPlaceholder}
            aria-label={searchLabel}
            className={`${CONTROL} w-full pl-11`}
          />
        </div>
        {sortOptions && (
          <select
            disabled
            aria-label="Sort results"
            className={`${CONTROL} w-full sm:w-52`}
            defaultValue={sortOptions[0].value}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled
          className="inline-flex h-11 items-center rounded-full border border-brand bg-brand-soft px-4 text-sm font-semibold text-brand disabled:cursor-not-allowed"
        >
          {allLabel}
        </button>
        {chips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            disabled
            className="inline-flex h-11 items-center rounded-full border border-border px-4 text-sm font-medium text-muted disabled:cursor-not-allowed"
          >
            {chip.label}
            {chip.count !== undefined && (
              <span className="ml-1.5 opacity-60">{chip.count}</span>
            )}
          </button>
        ))}
      </div>

      {note && <p className="text-xs text-muted">{note}</p>}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
