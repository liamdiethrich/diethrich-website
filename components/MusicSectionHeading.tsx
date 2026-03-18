type MusicSectionHeadingProps = {
  sequence: string;
  eyebrow: string;
  title: string;
  description: string;
  invert?: boolean;
  className?: string;
};

export function MusicSectionHeading({
  sequence,
  eyebrow,
  title,
  description,
  invert = false,
  className = ""
}: MusicSectionHeadingProps) {
  const borderClassName = invert ? "border-white/10" : "border-black/10";
  const sequenceClassName = invert ? "text-ivory/34" : "text-ink/34";
  const titleClassName = invert ? "text-ivory" : "text-ink";
  const bodyClassName = invert ? "text-ivory/66" : "text-ink/68";

  return (
    <div
      className={`grid gap-6 border-t pt-7 md:gap-8 md:pt-8 lg:grid-cols-[3.75rem_minmax(0,0.8fr)_minmax(0,0.54fr)] lg:items-end ${borderClassName} ${className}`}
    >
      <p className={`font-heading text-[0.76rem] uppercase tracking-[0.3em] ${sequenceClassName}`}>{sequence}</p>

      <div className="space-y-3">
        <p className="font-heading text-[0.76rem] uppercase tracking-[0.26em] text-accent md:text-[0.82rem]">
          {eyebrow}
        </p>
        <h2 className={`font-display text-[2.2rem] leading-[0.95] md:text-[3.1rem] ${titleClassName}`}>{title}</h2>
      </div>

      <p className={`max-w-[29rem] text-[0.98rem] leading-[1.72] md:text-[1.02rem] lg:justify-self-end ${bodyClassName}`}>
        {description}
      </p>
    </div>
  );
}
