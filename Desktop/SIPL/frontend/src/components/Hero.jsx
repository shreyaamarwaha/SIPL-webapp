import { Button } from "./Button"
import { ChevronIcon, ClockIcon, QuestionsIcon, ShieldIcon } from "./icons"

const FEATURE_HIGHLIGHTS = [
  {
    title: "30 Questions",
    description:
      "Selected from a structured 150-question bank, mapped to validated clinical scales.",
    icon: QuestionsIcon,
    iconClass: "bg-primary-light text-primary",
  },
  {
    title: "8–10 Minutes",
    description: "A focused, comfortable experience designed around your pace.",
    icon: ClockIcon,
    iconClass: "bg-secondary-light text-secondary",
  },
  {
    title: "Private & Secure",
    description: "Your responses are sensitive information, handled with appropriate care.",
    icon: ShieldIcon,
    iconClass: "bg-success-light text-success",
  },
]

function FeatureCard({ icon: Icon, iconClass, title, description }) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-surface border border-border hover:border-primary/20 hover:shadow-sm transition-all duration-200">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconClass}`}
      >
        <Icon />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="flex-1 max-w-6xl mx-auto px-6 pt-20 pb-16 w-full">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light border border-blue-200 text-xs font-medium text-primary mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Clinical Screening — Phase 1
          </div>

          <h1 className="font-display text-5xl lg:text-6xl text-foreground leading-tight tracking-tight mb-6">
            AI-assisted
            <br />
            <span className="text-primary">Depression</span>
            <br />
            Screening
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
            A structured screening experience designed to help identify potential symptoms
            associated with depression, grounded in validated clinical assessment frameworks.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a href="/survey">
              <Button variant="primary" size="lg">
                Start Assessment
                <ChevronIcon />
              </Button>
            </a>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            MindScreen is a screening tool and does not provide a medical diagnosis. Results should
            be interpreted by a qualified mental health professional.
          </p>
        </div>

        <div className="animate-fade-in-up delay-200">
          <div className="grid grid-cols-1 gap-4">
            {FEATURE_HIGHLIGHTS.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
