import { useMemo, useState } from 'react'
import PageShell from '../components/PageShell'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import { getAnalytics, getHistory, getUsers } from '../utils/storage'

export default function AdminDashboard() {
  const [page, setPage] = useState(1)
  const records = getHistory()
  const users = getUsers()
  const analytics = getAnalytics()
  const per = 5
  const pages = Math.max(1, Math.ceil(records.length / per))
  const items = useMemo(() => records.slice((page - 1) * per, page * per), [records, page])

  const fakePercent = analytics.total ? Math.round((analytics.fake / analytics.total) * 100) : 0
  const realPercent = analytics.total ? Math.round((analytics.real / analytics.total) * 100) : 0
  const suspiciousPercent = analytics.total ? Math.round((analytics.suspicious / analytics.total) * 100) : 0

  const stats = [
    { label: 'Registered Users', value: analytics.users },
    { label: 'Total Checks', value: analytics.total },
    { label: 'Fake News Found', value: analytics.fake },
    { label: 'Model Confidence', value: analytics.total ? `${analytics.averageConfidence}%` : '0%' },
  ]

  return (
    <PageShell>
      <div className="max-w-6xl">
        <h1 className="text-3xl md:text-5xl font-black">Admin Dashboard</h1>
        <p className="text-slate-400 mt-2">Counts are dynamic and only reflect users and detection records saved in this system.</p>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
          {stats.map((item) => <StatCard key={item.label} {...item} />)}
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mt-8">
          <div className="glass rounded-[2rem] p-5 lg:col-span-1">
            <h2 className="text-xl font-bold">Detection Breakdown</h2>
            <div className="space-y-5 mt-6">
              {[
                ['Fake', fakePercent],
                ['Real', realPercent],
                ['Suspicious', suspiciousPercent],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="flex justify-between text-sm text-slate-300 mb-2"><span>{label}</span><span>{value}%</span></div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-cyanGlow rounded-full" style={{ width: `${value}%` }} /></div>
                </div>
              ))}
              {!analytics.total && <p className="text-slate-500 text-sm leading-6">No detection records yet. The chart updates after users analyze news.</p>}
            </div>
          </div>

          <div className="glass rounded-[2rem] p-5 lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Submitted News Records</h2>
            <div className="space-y-3">
              {items.map((i) => (
                <div key={i.id} className="bg-white/5 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold line-clamp-1">{i.title}</p>
                    <p className="text-slate-400 text-sm">Submitted: {new Date(i.date).toLocaleDateString()} • Confidence: {i.confidence}%</p>
                  </div>
                  <Badge type={i.prediction} />
                </div>
              ))}
              {!items.length && <p className="text-slate-500 text-sm bg-white/5 rounded-2xl p-4">No submitted news records yet.</p>}
            </div>
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
              <button className="btn-ghost" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
              <span className="text-slate-400">Page {page} of {pages}</span>
              <button className="btn-ghost" disabled={page === pages} onClick={() => setPage((p) => p + 1)}>Next</button>
            </div>
          </div>
        </div>

        <div className="glass rounded-[2rem] p-5 mt-8">
          <h2 className="text-xl font-bold">Registered Users</h2>
          <p className="text-slate-400 text-sm mt-1">This list is generated from registration/login activity on this browser.</p>
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            {users.slice(0, 6).map((user) => (
              <div key={user.id || user.email} className="bg-white/5 rounded-2xl p-4">
                <p className="font-semibold">{user.name}</p>
                <p className="text-slate-400 text-sm">{user.email}</p>
              </div>
            ))}
            {!users.length && <p className="text-slate-500 text-sm bg-white/5 rounded-2xl p-4">No registered users yet.</p>}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
