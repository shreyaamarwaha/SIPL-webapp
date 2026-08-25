import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const steps = [
  { number: 1, label: "Answer questions" },
  { number: 2, label: "AI-assisted analysis" },
  { number: 3, label: "Clinician review" },
]

const cards = [
  {
    icon: "📋",
    title: "30 questions",
    body: "The assessment contains 30 questions selected from a structured bank of 150 items, covering a range of emotional and physical experiences.",
  },
  {
    icon: "⏱",
    title: "Approximately 8–10 minutes",
    body: "You can take your time with each question. There is no time limit. Save your progress and return if needed.",
  },
  {
    icon: "✍️",
    title: "Text responses",
    body: "Answer each question in your own words. There are no right or wrong answers — honest, natural responses are most helpful.",
  },
  {
    icon: "🔒",
    title: "Private and handled with care",
    body: "Your responses contain sensitive personal information and are handled accordingly.",
  },
  {
    icon: "🤖",
    title: "AI-assisted analysis",
    body: "Responses are analyzed using an AI-assisted screening pipeline mapped to validated clinical frameworks (HAM-D, HAM-A, BDI).",
  },
  {
    icon: "👨‍⚕️",
    title: "Intended for clinical review",
    body: "The output is a screening report designed to support — not replace — the judgment of a qualified mental health professional.",
  },
]

export default function AssessmentOverview() {
  const navigate = useNavigate()
  const [showCookieBanner, setShowCookieBanner] = useState(true)

  useEffect(() => {
    const storedPreference = localStorage.getItem("mindscreen-cookie-preference")
    if (storedPreference === "allow" || storedPreference === "decline") {
      setShowCookieBanner(false)
    }
  }, [])

  const handleCookieChoice = (choice) => {
    localStorage.setItem("mindscreen-cookie-preference", choice)
    setShowCookieBanner(false)
  }

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-[#1d2a39]">
      <header className="border-b border-[#dfeaf5] bg-[#f3f6fb]">
        <div className="max-w-[1200px] mx-auto h-full px-4 py-4 md:px-8 md:py-0 md:h-20 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2d7ff9] text-white flex items-center justify-center shadow-sm text-lg">
              ✦
            </div>
            <div className="text-[1.8rem] md:text-[2.25rem] leading-none font-bold tracking-[-0.06em] text-[#1d2a39]">MindScreen</div>
          </div>

          <nav className="hidden md:flex items-center gap-12 text-[1.05rem] text-[#58677a] font-medium">
            <a href="#" className="hover:text-[#1d2a39]">About</a>
            <a href="#" className="hover:text-[#1d2a39]">Privacy</a>
            <a href="#" className="hover:text-[#1d2a39]">Help</a>
          </nav>

          <div className="flex items-center justify-between md:justify-end gap-4">
            <button className="text-[#2d7ff9] font-medium text-[1.05rem]">Clinician Login</button>
            <button
              onClick={() => navigate("/")}
              className="text-[#2d7ff9] font-medium text-[1.05rem] flex items-center gap-2"
            >
              ← Back
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 py-8 md:px-8 md:py-10 pb-40 md:pb-32">
        <div className="h-[120px] md:h-[140px] flex items-center">
          <div className="inline-flex items-center gap-3 px-4 py-2.5 md:px-5 md:py-3 rounded-full border border-[#b9d5f7] bg-[#dfeefd] text-[#2d7ff9] text-sm md:text-[1.08rem] font-medium shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2d7ff9]" />
            Clinical Screening — Phase 1
          </div>
        </div>

        <div className="max-w-[980px] mx-auto pt-2">
          <div className="text-[#7d8ea6] text-[0.75rem] md:text-[0.9rem] uppercase tracking-[0.28em] md:tracking-[0.35em] mb-6 md:mb-8 font-medium">
            Assessment Overview
          </div>

          <h1 className="text-[2.4rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.25rem] leading-[0.95] tracking-[-0.07em] font-semibold mb-5 md:mb-7 text-[#1d2a39]">
            Before you begin
          </h1>

          <p className="text-base md:text-[1.25rem] text-[#5a6678] mb-8 md:mb-12 max-w-[900px] leading-relaxed">
            Please take a moment to understand what the assessment involves before you start.
          </p>

          <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12 max-w-[720px]">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1 min-w-0">
                <div
                  className={`relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 text-base md:text-lg font-semibold transition-colors ${
                    step.number === 1
                      ? "border-[#2d7ff9] bg-[#2d7ff9] text-white shadow-[0_0_0_4px_rgba(45,127,249,0.12)]"
                      : "border-[#d1dbe8] bg-white text-[#58677a]"
                  }`}
                >
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-[2px] flex-1 mx-3 md:mx-4 ${index === 0 ? "bg-[#dfeaf5]" : "bg-[#dfeaf5]"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {cards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-[#dfeaf5] bg-white p-5 md:p-7 min-h-[210px] md:min-h-[230px] shadow-[0_1px_0_rgba(15,23,42,0.02)]">
                <div className="text-[2rem] md:text-[2.3rem] mb-4 md:mb-5">{card.icon}</div>
                <h3 className="text-[1.12rem] md:text-[1.3rem] font-semibold text-[#1d2a39] mb-3">{card.title}</h3>
                <p className="text-[0.98rem] md:text-[1.05rem] leading-7 text-[#5a6678]">{card.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[#dfeaf5] bg-white p-5 md:p-6 text-[#5a6678] text-base md:text-[1.08rem] leading-8">
            <p>
              <strong className="font-semibold text-[#1d2a39]">Important:</strong> MindScreen is a screening tool only. It does not provide a medical diagnosis, treatment recommendations, or crisis support. If you are in distress or crisis, please contact a mental health professional or emergency services immediately.
            </p>
            <p className="mt-4">
              MindScreen is a screening tool and does not provide a medical diagnosis. Results should be interpreted by a qualified mental health professional.
            </p>
          </div>

          <div className="mt-10 flex justify-end">
            <Link to="/survey/consent">
              <button className="px-6 py-3 md:px-7 md:py-3.5 rounded-xl bg-[#2d7ff9] text-white text-[0.98rem] md:text-[1.05rem] font-semibold shadow-[0_8px_18px_rgba(45,127,249,0.22)] hover:bg-[#236fe0] transition-colors">
                Continue
              </button>
            </Link>
          </div>
        </div>
      </main>

      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#1f242b] text-white px-4 py-4 md:px-6 border-t border-white/10 z-50 shadow-[0_-12px_30px_rgba(0,0,0,0.15)]">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-sm md:text-[1.05rem]">
            <p className="text-white/75 max-w-[900px] leading-relaxed text-sm md:text-base">
              This website uses cookies, pixel tags, and local storage for performance, personalization, and marketing purposes. We use our own cookies and some from third parties. Only essential cookies are turned on by default. <span className="underline text-white">Cookies settings</span>
            </p>

            <div className="flex flex-col sm:flex-row items-stretch gap-3 lg:items-center">
              <button
                onClick={() => handleCookieChoice("decline")}
                className="bg-[#2d2f36] text-white px-4 py-2.5 md:px-5 md:py-3 rounded-xl font-semibold border border-white/10"
              >
                Do not allow cookies
              </button>
              <button
                onClick={() => handleCookieChoice("allow")}
                className="bg-[#2d7ff9] text-white px-4 py-2.5 md:px-5 md:py-3 rounded-xl font-semibold shadow-md"
              >
                Allow all cookies
              </button>
              <button
                aria-label="Close cookie banner"
                onClick={() => handleCookieChoice("decline")}
                className="text-white text-2xl font-light leading-none px-2"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
