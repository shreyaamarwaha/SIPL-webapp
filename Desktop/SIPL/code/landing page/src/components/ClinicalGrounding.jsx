const CLINICAL_SCALES = [
  {
    name: "Hamilton Depression Rating Scale",
    items: "17 core items",
    code: "HAM-D",
  },
  {
    name: "Hamilton Anxiety Rating Scale",
    items: "14 core items",
    code: "HAM-A",
  },
  {
    name: "Beck Depression Inventory",
    items: "21 core items",
    code: "BDI",
  },
]

export function ClinicalGrounding() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-6 w-full">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-mono-code uppercase tracking-widest text-muted-foreground mb-4">
            Clinical Grounding
          </p>
          <h2 className="font-display text-3xl text-foreground mb-4">
            Mapped to validated clinical scales
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            MindScreen&apos;s screening questions are mapped to items from the Hamilton Depression
            Rating Scale (HAM-D), Hamilton Anxiety Rating Scale (HAM-A), and Beck Depression
            Inventory (BDI) — widely used frameworks in clinical mental health assessment.
          </p>
          <div className="flex flex-wrap gap-2">
            {CLINICAL_SCALES.map((scale) => (
              <span
                key={scale.code}
                className="px-3 py-1.5 rounded-lg bg-muted text-sm font-mono-code font-medium text-muted-foreground border border-border"
              >
                {scale.code}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {CLINICAL_SCALES.map((scale) => (
            <div
              key={scale.code}
              className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{scale.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{scale.items}</p>
              </div>
              <span className="font-mono-code text-xs font-medium text-muted-foreground px-2 py-1 rounded bg-muted">
                {scale.code}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
