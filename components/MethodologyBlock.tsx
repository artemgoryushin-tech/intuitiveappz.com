const criteria = [
  "Commission model and payout predictability",
  "Brand reputation and transparency of terms",
  "Tracking quality, dashboard depth and promotional assets",
  "Accepted geos, payment methods and traffic restrictions",
  "Regulatory risk and clarity of compliance rules"
];

export function MethodologyBlock() {
  return (
    <section className="surface-card rounded-[2rem] p-7 md:p-10">
      <p className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.01em] text-brand">
        Editorial methodology
      </p>
      <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-ink">
        How we evaluate affiliate programs
      </h2>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {criteria.map((criterion, index) => (
          <div key={criterion} className="flex gap-3 rounded-2xl bg-cream/80 p-4 text-sm font-bold text-ink">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-black text-brand">
              {index + 1}
            </span>
            {criterion}
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm leading-7 text-muted">
        Reviews are informational and should be validated against official terms for each program.
        Financial products and trading involve risk, and no page promises guaranteed income or results.
      </p>
    </section>
  );
}
