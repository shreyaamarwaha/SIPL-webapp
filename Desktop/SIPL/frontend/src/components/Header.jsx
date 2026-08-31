import { Brand } from "./Brand"
import { Button } from "./Button"

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Privacy", href: "#privacy" },
  { label: "Help", href: "#help" },
]

export function Header() {
  return (
    <nav className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Brand />

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="/login">
            <Button variant="ghost" size="sm">Clinician Login</Button>
          </a>
          <a href="/survey">
            <Button variant="primary" size="sm">Start Assessment</Button>
          </a>
        </div>
      </div>
    </nav>
  )
}
