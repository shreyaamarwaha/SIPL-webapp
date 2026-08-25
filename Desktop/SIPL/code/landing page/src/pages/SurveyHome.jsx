import { Link } from "react-router-dom"

export default function SurveyHome() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-semibold mb-4">Start Assessment</h1>

      <p className="text-sm text-muted-foreground mb-6">
        Choose the screening flow you want to complete. The frontend will fetch questions
        from the backend and submit your responses for scoring.
      </p>

      <div className="flex flex-col gap-3">
        <Link to="/survey/severity">
          <button className="px-6 py-3 rounded-xl bg-primary text-white">PHQ-9 / GAD-7 (Severity)</button>
        </Link>

        <Link to="/survey/scid">
          <button className="px-6 py-3 rounded-xl bg-foreground text-white">Indian-SCID (Diagnostic)</button>
        </Link>
      </div>
    </main>
  )
}
