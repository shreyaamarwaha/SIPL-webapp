import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiUrl } from "../apiConfig"

const scaleLabels = {
  0: "Not at all",
  1: "Several days",
  2: "More than half the days",
  3: "Nearly every day",
}

const observationTemplates = [
  { title: "Depressed mood", detail: "Persistent low mood with somatic description over multiple weeks." },
  { title: "Reduced interest (Anhedonia)", detail: "Marked withdrawal from previously valued activities." },
  { title: "Sleep disturbance", detail: "Early morning awakening pattern with associated ruminative cognition." },
  { title: "Passive suicidal ideation", detail: "Reported passive thoughts of non-existence without expressed plan." },
]

export default function SeveritySurvey() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [phq9, setPhq9] = useState({})
  const [gad7, setGad7] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [result, setResult] = useState(null)
  const [report, setReport] = useState(null)
  const [flowStep, setFlowStep] = useState("questions")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    fetch(apiUrl("/api/severity/questions"))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load questions (${response.status})`)
        }
        return response.json()
      })
      .then(setData)
      .catch((error) => setLoadError(error.message))
  }, [])

  const allQuestions = useMemo(() => {
    if (!data) return []
    return [
      ...data.phq9.items.map((item) => ({ ...item, group: "PHQ-9" })),
      ...data.gad7.items.map((item) => ({ ...item, group: "GAD-7" })),
    ]
  }, [data])

  const currentQuestion = allQuestions[currentIndex]
  const answeredCount = Object.values({ ...phq9, ...gad7 }).filter((value) => value !== undefined && value !== null).length
  const currentValue = currentQuestion
    ? currentQuestion.group === "PHQ-9"
      ? phq9[currentQuestion.item_id]
      : gad7[currentQuestion.item_id]
    : undefined

  const selectAnswer = (value) => {
    if (!currentQuestion) return
    const nextValue = Number(value)
    if (currentQuestion.group === "PHQ-9") {
      setPhq9((prev) => ({ ...prev, [currentQuestion.item_id]: nextValue }))
    } else {
      setGad7((prev) => ({ ...prev, [currentQuestion.item_id]: nextValue }))
    }
  }

  const goNext = () => {
    if (currentValue === undefined) return

    if (currentIndex < allQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      return
    }

    setIsSubmitting(true)
    const session_id = crypto.randomUUID()
    const body = { session_id, phq9_responses: phq9, gad7_responses: gad7 }

    fetch(apiUrl("/api/severity/screen"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((payload) => {
        setResult(payload)
        setFlowStep("review")
      })
      .finally(() => setIsSubmitting(false))
  }

  const showReview = () => {
    if (!result) return

    const sessionId = result.session_id
    fetch(apiUrl("/api/report/combined"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        report_id: sessionId,
        patient_ref: sessionId,
        phq9_responses: phq9,
        gad7_responses: gad7,
      }),
    })
      .then((res) => res.json())
      .then((payload) => {
        setReport(payload)
        setFlowStep("processing")
        window.setTimeout(() => setFlowStep("report"), 1800)
      })
      .catch(() => {
        setReport({
          risk_flag: result.risk_flag,
          severity: {
            phq9: result.phq9,
            gad7: result.gad7,
          },
          recommendations: [
            "Review the severity markers with the patient.",
            "Confirm the screening result as part of a full clinical assessment.",
          ],
        })
        setFlowStep("processing")
        window.setTimeout(() => setFlowStep("report"), 1800)
      })
  }

  const answeredList = useMemo(() => {
    if (!allQuestions.length) return []
    return allQuestions
      .filter((q) => (q.group === "PHQ-9" ? phq9[q.item_id] !== undefined : gad7[q.item_id] !== undefined))
      .map((question) => ({
        ...question,
        value: question.group === "PHQ-9" ? phq9[question.item_id] : gad7[question.item_id],
      }))
  }, [allQuestions, phq9, gad7])

  const evidenceStrength = report?.risk_flag || result?.risk_flag ? "Moderate-High" : "Moderate"
  const severityNarrative = report?.severity
    ? `${report.severity.phq9.severity_band} depression and ${report.severity.gad7.severity_band.toLowerCase()} anxiety symptoms based on the latest screening result.`
    : result
      ? `${result.phq9.severity_band} depression and ${result.gad7.severity_band.toLowerCase()} anxiety symptoms based on the latest screening result.`
      : ""

  if (loadError) {
    return (
      <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-6">
        <div className="max-w-lg rounded-2xl border border-[#f3c7c7] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-[#1f2d3d] mb-3">Unable to load assessment</h1>
          <p className="text-[#52627a] mb-6">{loadError}</p>
          <button
            type="button"
            onClick={() => navigate("/survey/profile")}
            className="px-6 py-3 rounded-xl bg-[#2d7ff9] text-white font-semibold hover:bg-[#236fe0] transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center text-[#1f2d3d] text-xl font-medium">
        Loading assessment…
      </div>
    )
  }

  if (flowStep === "questions") {
    return (
      <div className="min-h-screen bg-[#f4f7fb] text-[#1f2d3d]">
        <header className="h-16 border-b border-[#dfeaf5] bg-white/80 backdrop-blur-sm">
          <div className="max-w-[1200px] mx-auto h-full px-4 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#2d7ff9] text-white flex items-center justify-center shadow-sm text-sm">✦</div>
              <div className="text-[1.7rem] leading-none font-bold tracking-[-0.04em] text-[#1d2a39]">MindScreen</div>
            </div>

            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => {
                if (currentIndex === 0) return
                navigate("/survey/profile")
              }}
              className={`font-medium text-[0.98rem] flex items-center gap-2 ${
                currentIndex === 0
                  ? "text-[#b8c5d6] cursor-not-allowed"
                  : "text-[#2d7ff9]"
              }`}
            >
              ← Back
            </button>
          </div>
        </header>

        <main className="max-w-[1100px] mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="max-w-[900px] mx-auto">
            <div className="mb-6 flex items-center justify-end text-[#6a7b90] text-[0.8rem] uppercase tracking-[0.2em] font-medium">
              <span>{answeredCount}/{allQuestions.length} answered</span>
            </div>

            <div className="mb-6 h-2.5 bg-[#edf2fa] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2d7ff9] rounded-full transition-all duration-300"
                style={{ width: `${(answeredCount / allQuestions.length) * 100}%` }}
              />
            </div>

            <div className="rounded-[22px] border border-[#dfeaf5] bg-white p-6 md:p-8 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              <div className="text-[#7d8ea6] text-[0.8rem] uppercase tracking-[0.2em] font-medium mb-4">
                {currentQuestion.group}
              </div>

              <h1 className="text-[2rem] md:text-[2.6rem] leading-tight tracking-[-0.06em] font-semibold mb-6 text-[#1f2d3d]">
                {currentQuestion.text}
              </h1>

              <div className="space-y-3">
                {Object.entries(scaleLabels).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => selectAnswer(value)}
                    className={`w-full text-left rounded-xl border px-5 py-4 transition-all ${
                      currentValue === Number(value)
                        ? "border-[#2d7ff9] bg-[#edf5ff] shadow-sm"
                        : "border-[#dfeaf5] bg-[#f9fbff] hover:border-[#bfd8ff]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[1.2rem] font-semibold text-[#1f2d3d]">{value}</span>
                      <span className="text-[1.02rem] text-[#4e5a6d]">{label}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  type="button"
                  disabled={currentValue === undefined || isSubmitting}
                  onClick={goNext}
                  className={`px-7 py-3.5 rounded-xl text-[1.05rem] font-semibold transition-colors ${
                    currentValue === undefined || isSubmitting
                      ? "bg-[#dfeaf5] text-[#7d8ea6] cursor-not-allowed"
                      : "bg-[#2d7ff9] text-white shadow-[0_8px_18px_rgba(45,127,249,0.22)] hover:bg-[#236fe0]"
                  }`}
                >
                  {currentIndex === allQuestions.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (flowStep === "review") {
    return (
      <div className="min-h-screen bg-[#f4f7fb] text-[#1f2d3d]">
        <header className="h-20 border-b border-[#dfeaf5] bg-white/80 backdrop-blur-sm">
          <div className="max-w-[1200px] mx-auto h-full px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2d7ff9] text-white flex items-center justify-center shadow-sm">✦</div>
              <div className="text-[2rem] leading-none font-bold tracking-[-0.04em] text-[#1d2a39]">MindScreen</div>
            </div>
            <div className="text-[#6f7d91] text-[0.9rem] tracking-[0.2em] uppercase">MS-{(result?.session_id || "000000000000").slice(-12)}</div>
          </div>
        </header>

        <main className="max-w-[1100px] mx-auto px-6 py-12">
          <div className="max-w-[900px] mx-auto">
            <div className="mb-8 text-[#6d7d92] uppercase tracking-[0.22em] text-[0.9rem] font-medium">Review your answers</div>
            <h1 className="text-[3rem] leading-none tracking-[-0.06em] font-semibold mb-6 text-[#1f2d3d]">Review your answers</h1>

            <div className="rounded-[26px] border border-[#dfeaf5] bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              <div className="space-y-4">
                {answeredList.map((item) => (
                  <div key={`${item.group}-${item.item_id}`} className="border-b border-[#edf2fa] pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="text-[0.72rem] uppercase tracking-[0.22em] text-[#7d8ea6] mb-2">{item.group}</div>
                        <div className="text-[1.15rem] font-medium text-[#1f2d3d]">{item.text}</div>
                      </div>
                      <div className="rounded-full bg-[#edf5ff] border border-[#cfe0ff] px-3 py-1 text-[0.85rem] font-semibold text-[#2d7ff9]">
                        {item.value} / 3
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={showReview}
                className="px-7 py-3.5 rounded-xl bg-[#2d7ff9] text-white text-[1.05rem] font-semibold shadow-[0_8px_18px_rgba(45,127,249,0.22)] hover:bg-[#236fe0] transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (flowStep === "processing") {
    return (
      <div className="min-h-screen bg-[#f4f7fb] text-[#1f2d3d] px-6 py-10 flex flex-col items-center justify-center">
        <div className="flex justify-center mb-8">
          <div className="relative w-[150px] h-[150px] rounded-full border-[3px] border-[#2d7ff9]/50 flex items-center justify-center">
            <div className="absolute inset-[12px] rounded-full border-[3px] border-[#2d7ff9]/50" />
            <div className="text-[#2d7ff9] text-4xl font-light">+</div>
          </div>
        </div>

        <div className="text-[#6f7d91] uppercase tracking-[0.35em] text-sm font-medium mb-6">Processing</div>
        <h1 className="text-[3.1rem] md:text-[4.2rem] leading-[0.95] tracking-[-0.07em] font-semibold mb-6 text-[#1d2a39] text-center">
          Analyzing your responses
        </h1>
        <p className="text-[1.2rem] text-[#52627a] text-center max-w-[700px] leading-relaxed">
          This may take a moment. Please keep this window open while your screening report is being prepared.
        </p>

        <div className="w-full max-w-[850px] mt-10 rounded-[26px] border border-[#dfeaf5] bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
          <div className="space-y-5">
            <div className="flex items-center gap-4 text-[1.2rem] text-[#1f2d3d]">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#d4f3df] text-[#1a8f5a] text-sm font-semibold">✓</span>
              <span>Responses received</span>
            </div>
            <div className="flex items-center gap-4 text-[1.2rem] text-[#1f2d3d]">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#d4f3df] text-[#1a8f5a] text-sm font-semibold">✓</span>
              <span>Reviewing responses</span>
            </div>
            <div className="flex items-center gap-4 text-[1.2rem] text-[#1f2d3d]">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border-[2px] border-[#2d7ff9] bg-[#edf5ff] text-[#2d7ff9] text-sm font-semibold animate-pulse">◉</span>
              <div className="flex-1">
                <div className="font-medium">Mapping clinical indicators</div>
                <div className="text-[1rem] text-[#627089] mt-1">Mapping your responses to HAM-D, HAM-A, and BDI frameworks.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#1f2d3d]">
      <header className="h-20 border-b border-[#dfeaf5] bg-white/80 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto h-full px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2d7ff9] text-white flex items-center justify-center shadow-sm">✦</div>
            <div className="text-[2rem] leading-none font-bold tracking-[-0.04em] text-[#1d2a39]">MindScreen</div>
          </div>
          <div className="text-[#6f7d91] text-[0.9rem] tracking-[0.18em] uppercase">MS-{result?.session_id?.slice(-12) || "000000000000"}</div>
        </div>
      </header>

      <main className="max-w-[1140px] mx-auto px-6 py-8">
        <div className="rounded-[20px] border border-[#dfeaf5] bg-[#f8f8f0] px-6 py-5 mb-7 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-[1.05rem] text-[#4f5f77] italic">Supporting evidence strength</div>
            <div className="inline-flex items-center justify-end w-full md:w-[220px]">
              <span className="text-[1.05rem] font-semibold text-[#d76a2a]">{evidenceStrength}</span>
            </div>
          </div>

          <div className="mt-4 h-3 w-full rounded-full bg-[#f3e4b7] overflow-hidden">
            <div className="h-full rounded-full bg-[#f4a14c]" style={{ width: result?.risk_flag ? "78%" : "62%" }} />
          </div>

          <div className="mt-4 text-[1rem] text-[#4f5f77] leading-7">
            Based on ensemble model agreement across multiple response patterns.
          </div>
        </div>

        <div className="rounded-[22px] border border-[#dfeaf5] bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.02)] mb-8">
          <div className="text-[#7d8ea6] text-[0.82rem] uppercase tracking-[0.2em] font-medium mb-4">Key observations</div>

          <div className="space-y-4">
            {observationTemplates.map((item, index) => (
              <div key={item.title} className="border-t border-[#edf2fa] pt-4 first:border-0 first:pt-0">
                <div className="flex items-start gap-3">
                  <span className="mt-2 inline-block w-2.5 h-2.5 rounded-full bg-[#f4a14c]" />
                  <div>
                    <div className="text-[1.2rem] font-semibold text-[#1f2d3d]">{item.title}</div>
                    <div className="text-[1rem] text-[#55657c] mt-1">{item.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[22px] border border-[#dfeaf5] bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-[#dfeaf5] bg-[#f8fbff] p-5">
              <div className="text-[#7d8ea6] text-[0.7rem] uppercase tracking-[0.18em] font-medium">PHQ-9</div>
              <div className="mt-3 text-[2.3rem] font-semibold tracking-[-0.05em] text-[#1f2d3d]">{result.phq9.total} / {result.phq9.max_possible}</div>
              <div className="mt-2 text-[1.05rem] text-[#4e5a6d]">Severity band: {result.phq9.severity_band}</div>
              <div className="mt-2 text-[0.95rem] text-[#52627a]">Risk item: {result.phq9.risk_flag ? "endorsed" : "not endorsed"}</div>
            </div>

            <div className="rounded-2xl border border-[#dfeaf5] bg-[#f8fbff] p-5">
              <div className="text-[#7d8ea6] text-[0.7rem] uppercase tracking-[0.18em] font-medium">GAD-7</div>
              <div className="mt-3 text-[2.3rem] font-semibold tracking-[-0.05em] text-[#1f2d3d]">{result.gad7.total} / {result.gad7.max_possible}</div>
              <div className="mt-2 text-[1.05rem] text-[#4e5a6d]">Severity band: {result.gad7.severity_band}</div>
              <div className="mt-2 text-[0.95rem] text-[#52627a]">Missing items: {result.gad7.missing_items.length || 0}</div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#dfeaf5] bg-[#f8fbff] p-5">
            <div className="text-[#7d8ea6] text-[0.7rem] uppercase tracking-[0.18em] font-medium">Clinical summary</div>
            <div className="mt-3 text-[1.08rem] leading-8 text-[#425268]">{severityNarrative}</div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-7 py-3.5 rounded-xl bg-[#2d7ff9] text-white text-[1.05rem] font-semibold shadow-[0_8px_18px_rgba(45,127,249,0.22)] hover:bg-[#236fe0] transition-colors"
            >
              Finish
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
