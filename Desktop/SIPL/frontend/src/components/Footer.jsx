import { Brand } from "./Brand"

const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Use", href: "#help" },
  { label: "Contact", href: "#help" },
]

export function Footer() {
  return (
    <footer id="privacy" className="border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Brand size="sm" />

        <div className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">© 2026 MindScreen. Screening tool only.</p>
      </div>
    </footer>
  )
}
