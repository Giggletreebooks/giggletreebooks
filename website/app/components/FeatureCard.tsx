import { type Feature } from "@/app/lib/features";

export default function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-7 transition-colors duration-200 hover:border-brand">
      <span
        aria-hidden
        className="flex size-12 items-center justify-center rounded-xl bg-brand-soft text-brand [&>svg]:size-6"
      >
        {feature.icon}
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
        {feature.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
        {feature.description}
      </p>
    </div>
  );
}
