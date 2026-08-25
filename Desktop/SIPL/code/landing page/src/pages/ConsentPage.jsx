import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function ConsentPage() {
  const navigate = useNavigate()
  const [checks, setChecks] = useState({
    diagnosis: false,
    consent: false,
  })

  const allChecked = checks.diagnosis && checks.consent

  const toggle = (key) =>
    setChecks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#1f2d3d]">
      <header className="h-16 border-b border-[#dfeaf5] bg-white/80 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto h-full px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2d7ff9] text-white flex items-center justify-center shadow-sm text-sm">
              ✦
            </div>
            <div className="text-[1.7rem] leading-none font-bold tracking-[-0.04em] text-[#1d2a39]">MindScreen</div>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="text-[#2d7ff9] font-medium text-[0.98rem] flex items-center gap-2"
          >
            ← Back
          </button>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center gap-4 md:gap-6 max-w-[720px] mb-6">
            {[1, 2, 3].map((step, index) => (
              <div key={step} className="flex items-center flex-1 min-w-0">
                <div
                  className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 text-base md:text-lg font-semibold transition-colors ${
                    step === 2
                      ? "border-[#2d7ff9] bg-[#2d7ff9] text-white shadow-[0_0_0_4px_rgba(45,127,249,0.12)]"
                      : "border-[#d1dbe8] bg-white text-[#58677a]"
                  }`}
                >
                  {step}
                </div>
                {index < 2 && <div className="h-[2px] flex-1 mx-3 md:mx-4 bg-[#dfeaf5]" />}
              </div>
            ))}
          </div>

          <div className="text-[#7d8ea6] text-[0.8rem] uppercase tracking-[0.24em] mb-5 font-medium">
            Step 1 of 3
          </div>

          <h1 className="text-[2.4rem] md:text-[2.8rem] leading-tight tracking-[-0.06em] font-semibold mb-3 text-[#1f2d3d]">
            Consent &amp; Privacy
          </h1>

          <p className="text-[1rem] md:text-[1.08rem] text-[#52627a] mb-6 max-w-[760px]">
            Please read the following information carefully before proceeding.
          </p>

          <div className="rounded-2xl border border-[#dfeaf5] bg-white p-7 text-[#3a485d] shadow-[0_1px_0_rgba(15,23,42,0.02)]">
            <div className="space-y-6 text-[1.02rem] leading-8">
              <div>
                <h3 className="font-semibold text-[#1f2d3d] mb-2">Purpose of this assessment</h3>
                <p>MindScreen is a structured screening tool designed to help identify potential symptoms associated with depression and anxiety. The assessment is intended to support — not replace — clinical judgment by a qualified mental health professional. It does not provide a diagnosis.</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1f2d3d] mb-2">How your responses are used</h3>
                <p>Your text responses will be processed through an AI-assisted screening pipeline. The output of this analysis is a structured screening report made available to your clinician for review. Your responses are not used to train AI models.</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1f2d3d] mb-2">Data privacy</h3>
                <p>Your responses contain sensitive personal information. They are handled with appropriate care and security measures. This assessment does not collect financial information. Your data is not sold or shared with third parties outside of the clinical review process.</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1f2d3d] mb-2">AI-assisted analysis</h3>
                <p>An AI-assisted pipeline processes your text responses to produce a structured screening summary. This pipeline is grounded in validated clinical frameworks (HAM-D, HAM-A, BDI). AI analysis supports — but does not replace — the clinical interpretation performed by your mental health professional.</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1f2d3d] mb-2">Clinical review</h3>
                <p>The screening report generated from your responses is intended to be reviewed and interpreted by a qualified mental health clinician. The clinician is responsible for all clinical decisions and recommendations based on the screening output.</p>
              </div>

              <p className="italic text-[#3a485d]">
                Your responses are sensitive information. They should be handled and stored securely in accordance with applicable clinical data governance standards.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={checks.diagnosis}
                onChange={() => toggle("diagnosis")}
                className="mt-1 h-5 w-5 accent-[#2d7ff9]"
              />
              <span className="text-[1.02rem] leading-7 text-[#37506d]">
                I understand that this assessment is a screening tool and not a medical diagnosis. Results are intended to support clinical review only.
              </span>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={checks.consent}
                onChange={() => toggle("consent")}
                className="mt-1 h-5 w-5 accent-[#2d7ff9]"
              />
              <span className="text-[1.02rem] leading-7 text-[#37506d]">
                I consent to my text responses being analyzed for screening purposes as described above.
              </span>
            </label>
          </div>

          <p className="mt-5 text-[#5e6d82] text-sm">
            Both confirmations are required to proceed.
          </p>

          <div className="mt-10 flex justify-end">
            <button
              disabled={!allChecked}
              onClick={() => navigate("/survey/profile")}
              className={`px-7 py-3.5 rounded-xl text-[1.05rem] font-semibold transition-colors ${
                allChecked
                  ? "bg-[#2d7ff9] text-white shadow-[0_8px_18px_rgba(45,127,249,0.22)] hover:bg-[#236fe0]"
                  : "bg-[#dfeaf5] text-[#7d8ea6] cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
