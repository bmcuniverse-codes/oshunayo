import { Link } from 'react-router-dom'
import { CheckCircle2, ShieldAlert } from 'lucide-react'
import PageShell from '../components/PageShell'
import Badge from '../components/Badge'
import { getLatestResult } from '../utils/storage'

export default function ResultPage() {
  const result = getLatestResult()
  const prediction = result.prediction || 'No Result'
  const confidence = Number(result.confidence || 0)

  return (
    <PageShell>
      <div className="max-w-6xl">
        <h1 className="text-3xl md:text-5xl font-black">Detection Result</h1>
        <p className="text-slate-400 mt-2">Readable analysis of the submitted news content.</p>

        <div className="grid lg:grid-cols-3 gap-5 mt-8">
          <div className="glass rounded-[2rem] p-6 lg:col-span-2">
            <Badge type={prediction}/>
            <h2 className="text-4xl font-black mt-5">{prediction === 'No Result' ? 'No detection yet' : `${prediction} News`}</h2>
            <p className="text-slate-300 mt-4 leading-8">
              {result.reason || 'Run a detection first to see analysis.'}
            </p>

            <div className="mt-6 bg-white/5 rounded-3xl p-5">
              <p className="text-slate-400 text-sm">Submitted Text</p>
              <p className="mt-2 text-slate-200 leading-7 break-words">{result.text || 'No submitted text available.'}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mt-6">
              <Link to="/detect" className="btn-primary justify-center">Run Another Detection</Link>
              <Link to="/history" className="btn-ghost justify-center">View History</Link>
            </div>
          </div>

          <div className="glass rounded-[2rem] p-6">
            <div className="w-36 h-36 rounded-full border-[10px] border-cyanGlow/30 flex items-center justify-center mx-auto">
              <div className="text-center">
                <p className="text-4xl font-black text-cyanGlow">{confidence}%</p>
                <p className="text-xs text-slate-400">Confidence</p>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <div>
                <p className="text-slate-400">Risk Level</p>
                <h4 className="text-2xl font-bold mt-1 flex items-center gap-2">
                  {result.risk_level === 'Low' ? <CheckCircle2 size={22}/> : <ShieldAlert size={22}/>}
                  {result.risk_level || 'N/A'}
                </h4>
              </div>

              <div>
                <p className="text-slate-400">Detected Keywords</p>
                <div className="flex gap-2 flex-wrap mt-3">
                  {(result.keywords || []).length ? result.keywords.map((k) => (
                    <span key={k} className="bg-white/10 px-3 py-1 rounded-full text-sm">{k}</span>
                  )) : <span className="text-slate-500 text-sm">None detected</span>}
                </div>
              </div>

              <div className="bg-white/5 rounded-3xl p-4 text-sm text-slate-400 leading-6">
                This demo model is for academic implementation. For real-world verification, compare with trusted news sources.
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
