import PageShell from '../components/PageShell'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { buildWeeklyTrend } from '../data/mockData'
import { getAnalytics, getHistory } from '../utils/storage'

export default function DashboardPage() {
  const history = getHistory()
  const analytics = getAnalytics()
  const chartData = buildWeeklyTrend(history)
  const stats = [
    { label: 'Registered Users', value: analytics.users },
    { label: 'Total Checks', value: analytics.total },
    { label: 'Fake Detected', value: analytics.fake },
    { label: 'Suspicious', value: analytics.suspicious },
  ]

  return (
    <PageShell>
      <h1 className="text-3xl md:text-5xl font-black">Dashboard</h1>
      <p className="text-slate-400 mt-2">Overview generated from real activity saved on this browser.</p>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid xl:grid-cols-3 gap-5 mt-6">
        <div className="glass rounded-3xl p-5 xl:col-span-2">
          <h2 className="font-bold text-xl mb-4">Weekly Detection Trend</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis allowDecimals={false} stroke="#94a3b8" />
              <Tooltip />
              <Area dataKey="real" fill="#22D3EE33" stroke="#22D3EE" />
              <Area dataKey="fake" fill="#EF444433" stroke="#EF4444" />
              <Area dataKey="suspicious" fill="#F59E0B33" stroke="#F59E0B" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-3xl p-5">
          <h2 className="font-bold text-xl mb-4">Recent Checks</h2>
          <div className="space-y-3">
            {history.slice(0, 4).map((i) => (
              <div key={i.id} className="bg-white/5 rounded-2xl p-4">
                <p className="line-clamp-1 text-sm">{i.title}</p>
                <div className="mt-3 flex justify-between">
                  <Badge type={i.prediction} />
                  <span className="text-slate-400 text-sm">{i.confidence}%</span>
                </div>
              </div>
            ))}
            {!history.length && (
              <div className="bg-white/5 rounded-2xl p-4 text-slate-400 text-sm leading-6">
                No checks yet. Run a news detection and this section will update automatically.
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
