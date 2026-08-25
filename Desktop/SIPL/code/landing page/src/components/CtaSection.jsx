import { Button } from "./Button"

export function CtaSection() {
  return (
    <section className="bg-foreground py-16">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl text-white mb-4">Ready to begin your screening?</h2>
        <p className="text-white/60 text-sm mb-8 leading-relaxed">
          The assessment takes approximately 8–10 minutes. Answer honestly and in your own words —
          there are no right or wrong responses.
        </p>
        <Button variant="primary" size="lg">
          Start Assessment
        </Button>
      </div>
    </section>
  )
}
