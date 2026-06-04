import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileSearch, RotateCcw, Sparkles } from 'lucide-react'
import PageShell from '../components/PageShell'
import { predictNews } from '../utils/api'
import { saveDetection } from '../utils/storage'

const samples = [
  'Breaking: Viral post claims banks will close for 30 days without official confirmation. Share now!',
  'The Ministry of Education has released a revised school calendar after a press briefing on Monday.',
  'Secret miracle cure discovered overnight and doctors do not want you to know about it!'
]

export default function DetectPage() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const nav = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setError('')

    if (text.trim().length < 20) {
      setError('Please enter at least 20 characters so the system can analyze it properly.')
      return
    }

    setLoading(true)
    try {
      const result = await predictNews(text)
      saveDetection({ ...result, text, date: new Date().toISOString() })
      nav('/result')
    } catch {
      const fallback = {
        prediction: 'Suspicious',
        confidence: 64,
        risk_level: 'Medium',
        reason: 'Backend connection was not available, so a demo result was generated. Start Flask backend for live analysis.',
        keywords: ['unverified', 'viral', 'claim'],
      }
      saveDetection({ ...fallback, text, date: new Date().toISOString() })
      nav('/result')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageShell>
      <div className="max-w-6xl">
        <p className="text-cyanGlow font-semibold flex items-center gap-2"><Sparkles size={18}/> AI News Classifier</p>
        <h1 className="text-3xl md:text-5xl font-black mt-2">Detect News</h1>
        <p className="text-slate-400 mt-3 max-w-2xl leading-7">
          Paste a headline, claim, or full article. TruthLens AI checks suspicious language patterns and returns a calm, readable result.
        </p>

        <form onSubmit={submit} className="glass rounded-[2rem] p-5 md:p-8 mt-8">
          <label className="text-sm text-slate-300 font-semibold">News content</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            minLength={20}
            className="input min-h-[280px] resize-none mt-3 leading-7"
            placeholder="Paste suspicious news content here..."
          />
          <div className="mt-3 flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm text-slate-400">
            <span>{text.trim().length} characters</span>
            {error && <span className="text-amber-300">{error}</span>}
          </div>

          <div className="flex flex-col md:flex-row gap-3 mt-5">
            <button disabled={loading} className="btn-primary justify-center">
              <FileSearch size={18}/>{loading ? 'Analyzing...' : 'Analyze News'}
            </button>
            <button type="button" className="btn-ghost justify-center" onClick={() => setText(samples[0])}>
              Use Sample Text
            </button>
            <button type="button" className="btn-ghost justify-center" onClick={() => { setText(''); setError('') }}>
              <RotateCcw size={18}/> Clear
            </button>
          </div>
        </form>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {samples.map((item, index) => (
            <button key={item} onClick={() => setText(item)} className="text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-4 transition">
              <p className="text-xs text-cyanGlow font-bold">Sample {index + 1}</p>
              <p className="text-slate-300 text-sm mt-2 leading-6">{item}</p>
            </button>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
