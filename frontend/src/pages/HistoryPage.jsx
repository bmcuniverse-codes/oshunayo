import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import Badge from '../components/Badge'
import { clearHistory, getHistory } from '../utils/storage'

export default function HistoryPage() {
  const [records, setRecords] = useState(getHistory())
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const per = 5

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return records
    return records.filter((item) => `${item.title} ${item.prediction} ${item.text}`.toLowerCase().includes(q))
  }, [records, query])

  const pages = Math.max(1, Math.ceil(filtered.length / per))
  const items = filtered.slice((page - 1) * per, page * per)

  function resetRecords() {
    clearHistory()
    setRecords([])
    setPage(1)
  }

  return (
    <PageShell>
      <div className="max-w-6xl">
        <h1 className="text-3xl md:text-5xl font-black">Detection History</h1>
        <p className="text-slate-400 mt-2">Paginated record of previous checks saved on this browser.</p>

        <div className="glass rounded-[2rem] mt-8 overflow-hidden">
          <div className="p-4 flex flex-col md:flex-row gap-3 md:items-center justify-between border-b border-white/10">
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1) }}
              className="input md:max-w-md"
              placeholder="Search history..."
            />
            <div className="flex gap-3">
              <Link to="/detect" className="btn-primary">New Detection</Link>
              <button onClick={resetRecords} className="btn-ghost">Clear</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-slate-300">
                <tr>
                  <th className="p-4">News Title</th>
                  <th className="p-4">Prediction</th>
                  <th className="p-4">Confidence</th>
                  <th className="p-4">Risk</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id} className="border-t border-white/10">
                    <td className="p-4 min-w-[280px]">{i.title}</td>
                    <td className="p-4"><Badge type={i.prediction}/></td>
                    <td className="p-4">{i.confidence}%</td>
                    <td className="p-4 text-slate-300">{i.risk_level || 'N/A'}</td>
                    <td className="p-4 text-slate-400 whitespace-nowrap">{new Date(i.date).toLocaleDateString()}</td>
                  </tr>
                ))}
                {!items.length && (
                  <tr><td colSpan="5" className="p-8 text-center text-slate-400">No records found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 flex justify-between items-center border-t border-white/10">
            <button className="btn-ghost" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
            <span className="text-slate-400">Page {page} of {pages}</span>
            <button className="btn-ghost" disabled={page === pages} onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
