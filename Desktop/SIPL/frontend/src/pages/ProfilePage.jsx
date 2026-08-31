import { useState } from "react"
import { useNavigate } from "react-router-dom"

const GENDER_OPTIONS = ["Male", "Female", "Non-binary", "Prefer not to say", "Other"]

export default function ProfilePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (submitted) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }))
    }
  }

  const validateField = (field, value) => {
    if (field === "fullName") {
      if (!value.trim()) return "Full name is required."
      return ""
    }

    if (field === "age") {
      if (!value.trim()) return "Age is required."
      const age = Number(value)
      if (!Number.isInteger(age) || age < 1 || age > 120) return "Enter a valid age between 1 and 120."
      return ""
    }

    if (field === "gender") {
      if (!value || value === "Select...") return "Please select a gender."
      return ""
    }

    return ""
  }

  const validateForm = () => {
    const nextErrors = {
      fullName: validateField("fullName", form.fullName),
      age: validateField("age", form.age),
      gender: validateField("gender", form.gender),
    }
    setErrors(nextErrors)
    return Object.values(nextErrors).every((error) => !error)
  }

  const handleContinue = () => {
    setSubmitted(true)
    if (!validateForm()) return
    navigate("/survey/severity")
  }

  const inputClass = (field) =>
    `w-full border rounded-xl px-4 py-3 text-[1rem] bg-[#f8fbff] outline-none focus:border-[#2d7ff9] ${
      errors[field] ? "border-[#f3a4a4]" : "border-[#dfeaf5]"
    }`

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
            onClick={() => navigate("/survey/consent")}
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
                    step === 3
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
            Step 2 of 3
          </div>

          <h1 className="text-[2.4rem] md:text-[2.8rem] leading-tight tracking-[-0.06em] font-semibold mb-3 text-[#1f2d3d]">
            Tell us a little about yourself
          </h1>

          <p className="text-[1rem] md:text-[1.08rem] text-[#52627a] mb-8 max-w-[760px]">
            This information helps provide context for your screening report. Fields marked with * are required.
          </p>

          <div className="rounded-2xl border border-[#dfeaf5] bg-white p-7 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="fullName" className="block text-[0.98rem] font-medium text-[#2e3a4d] mb-2">
                  Full Name*
                </label>
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  className={inputClass("fullName")}
                />
                {errors.fullName && <p className="mt-2 text-sm text-[#d64545]">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="age" className="block text-[0.98rem] font-medium text-[#2e3a4d] mb-2">
                  Age*
                </label>
                <input
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  value={form.age}
                  onChange={(event) => updateField("age", event.target.value)}
                  className={inputClass("age")}
                />
                {errors.age && <p className="mt-2 text-sm text-[#d64545]">{errors.age}</p>}
              </div>

              <div>
                <label htmlFor="gender" className="block text-[0.98rem] font-medium text-[#2e3a4d] mb-2">
                  Gender*
                </label>
                <select
                  id="gender"
                  value={form.gender}
                  onChange={(event) => updateField("gender", event.target.value)}
                  className={inputClass("gender")}
                >
                  <option value="">Select...</option>
                  {GENDER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.gender && <p className="mt-2 text-sm text-[#d64545]">{errors.gender}</p>}
              </div>

              <div>
                <label htmlFor="occupation" className="block text-[0.98rem] font-medium text-[#2e3a4d] mb-2">
                  Occupation
                </label>
                <input
                  id="occupation"
                  className="w-full border border-[#dfeaf5] rounded-xl px-4 py-3 text-[1rem] bg-[#f8fbff] outline-none focus:border-[#2d7ff9]"
                  placeholder="Optional — helps provide context for your clinician."
                />
              </div>

              <div>
                <label htmlFor="education" className="block text-[0.98rem] font-medium text-[#2e3a4d] mb-2">
                  Education
                </label>
                <select
                  id="education"
                  className="w-full border border-[#dfeaf5] rounded-xl px-4 py-3 text-[1rem] bg-[#f8fbff] outline-none focus:border-[#2d7ff9]"
                  defaultValue=""
                >
                  <option value="">Select level...</option>
                  <option>Some high school</option>
                  <option>High school diploma / GED</option>
                  <option>Some college</option>
                  <option>Associate's degree</option>
                  <option>Bachelor's degree</option>
                  <option>Master's degree</option>
                  <option>Doctorate / Professional degree</option>
                  <option>Prefer not to say</option>
                </select>
              </div>

              <div>
                <label htmlFor="maritalStatus" className="block text-[0.98rem] font-medium text-[#2e3a4d] mb-2">
                  Marital Status
                </label>
                <select
                  id="maritalStatus"
                  className="w-full border border-[#dfeaf5] rounded-xl px-4 py-3 text-[1rem] bg-[#f8fbff] outline-none focus:border-[#2d7ff9]"
                  defaultValue=""
                >
                  <option value="">Select...</option>
                  <option>Single</option>
                  <option>Married / Partnered</option>
                  <option>Separated</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                  <option>Prefer not to say</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-[0.98rem] font-medium text-[#2e3a4d] mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full border border-[#dfeaf5] rounded-xl px-4 py-3 text-[1rem] bg-[#f8fbff] outline-none focus:border-[#2d7ff9]"
                  placeholder="Optional — used only to send you a copy of your session details."
                />
              </div>
            </div>
          </div>

          <p className="mt-6 text-[#5e6d82] text-[0.95rem] leading-7">
            This information is associated with your screening session and made available to your reviewing clinician.
          </p>

          <p className="mt-4 text-[#5e6d82] text-[0.96rem] leading-7">
            MindScreen is a screening tool and does not provide a medical diagnosis. Results should be interpreted by a qualified mental health professional.
          </p>

          <div className="mt-10 flex justify-end">
            <button
              onClick={handleContinue}
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
