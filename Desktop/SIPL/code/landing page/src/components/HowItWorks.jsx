const STEPS = [
  {
    number: "01",
    title: "Answer Questions",
    body: "Respond to 30 structured questions in your own words. Take as much time as you need.",
  },
  {
    number: "02",
    title: "AI-Assisted Analysis",
    body: "Your responses are analyzed using an AI-assisted screening pipeline grounded in clinical assessment frameworks.",
  },
  {
    number: "03",
    title: "Clinician Review",
    body: "A structured screening report is generated for review and interpretation by your mental health professional.",
  },
]

export function HowItWorks() {
  return (
    <section id="about" className="bg-surface border-t border-b border-border py-16">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-mono-code uppercase tracking-widest text-muted-foreground text-center mb-10">
          How It Works
        </p>
        <div className="grid md:grid-cols-3 gap-10">
          {STEPS.map((step) => (
            <div key={step.number} className="flex flex-col gap-3">
              <span className="font-mono-code text-3xl font-medium text-primary/30">
                {step.number}
              </span>
              <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
