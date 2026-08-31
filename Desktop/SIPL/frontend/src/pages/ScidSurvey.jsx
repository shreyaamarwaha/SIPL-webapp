import { useEffect, useState } from "react"
import { apiUrl } from "../lib/api"

function Option({ name, value, checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  )
}

export default function ScidSurvey() {
  const [data, setData] = useState(null)
  const [responses, setResponses] = useState({})
  const [result, setResult] = useState(null)

  useEffect(() => {
    fetch(apiUrl("/scid/questions"))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load SCID questions (${response.status})`)
        }
        return response.json()
      })
      .then(setData)
      .catch(() => setData({ error: true }))
  }, [])

  if (data?.error) return <div className="p-6 text-red-600">Unable to load SCID questions. Please try again later.</div>
  if (!data) return <div className="p-6">Loading SCID questions…</div>

  const handle = (id, val) => setResponses((s) => ({ ...s, [id]: String(val) }))

  const submit = async () => {
    const session_id = crypto.randomUUID()
    const body = { session_id, responses }
    const res = await fetch(apiUrl("/scid/screen"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const json = await res.json()
    setResult(json)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-4">Indian-SCID — Diagnostic Interview</h2>

      {Object.entries(data.modules).map(([moduleKey, module]) => (
        <section key={moduleKey} className="mb-6">
          <h3 className="font-semibold mb-2">{module.title}</h3>
          <div className="grid gap-4">
            {module.items.map((item) => (
              <div key={item.id} className="p-3 border rounded">
                <p className="font-medium">{item.id} — {item.question}</p>
                <div className="mt-2 flex gap-4">
                  {item.type === "symptom" && (
                    ["1", "2", "3"].map((v) => (
                      <Option
                        key={v}
                        name={item.id}
                        value={v}
                        checked={responses[item.id] === v}
                        onChange={() => handle(item.id, v)}
                        label={`${v} — ${data.meta.rating_scale.symptom_items[v]}`}
                      />
                    ))
                  )}

                  {item.type === "gate" && (
                    ["+", "-", "?"].map((v) => (
                      <Option
                        key={v}
                        name={item.id}
                        value={v}
                        checked={responses[item.id] === v}
                        onChange={() => handle(item.id, v)}
                        label={v}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div>
        <button className="px-5 py-3 rounded-xl bg-primary text-white" onClick={submit}>Submit Diagnostic</button>
      </div>

      {result && <pre className="mt-6 p-4 bg-surface border rounded">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}
