/** Headline figure for page heroes. Wrap a group in a <dl>. */
export default function Stat({
  value,
  label,
}: {
  value: number | string;
  label: string;
}) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-3xl font-semibold tracking-tight">
        {value}
        <span className="mt-1 block text-sm font-normal tracking-normal text-muted">
          {label}
        </span>
      </dd>
    </div>
  );
}
