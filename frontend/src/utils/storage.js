const HISTORY_KEY = 'truthlens_history'
const RESULT_KEY = 'truthlens_result'
const USERS_KEY = 'truthlens_users'
const CURRENT_USER_KEY = 'truthlens_user'

function safeParse(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback))
  } catch {
    return fallback
  }
}

function normalizeRecord(record) {
  const now = new Date()
  return {
    id: record.id || crypto.randomUUID(),
    title: (record.text || record.title || 'Untitled news').slice(0, 95),
    text: record.text || '',
    prediction: record.prediction || 'Suspicious',
    confidence: Number(record.confidence || 0),
    risk_level: record.risk_level || 'Medium',
    reason: record.reason || '',
    keywords: Array.isArray(record.keywords) ? record.keywords : [],
    date: record.date || now.toISOString(),
  }
}

export function getUsers() {
  return safeParse(USERS_KEY, [])
}

export function saveUser(user) {
  const users = getUsers()
  const normalized = {
    id: user.id || crypto.randomUUID(),
    name: user.name || 'TruthLens User',
    email: (user.email || '').toLowerCase(),
    createdAt: user.createdAt || new Date().toISOString(),
  }

  const exists = users.some((item) => item.email === normalized.email)
  const updated = exists
    ? users.map((item) => item.email === normalized.email ? { ...item, ...normalized } : item)
    : [normalized, ...users]

  localStorage.setItem(USERS_KEY, JSON.stringify(updated))
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(normalized))
  return normalized
}

export function getCurrentUser() {
  return safeParse(CURRENT_USER_KEY, null)
}

export function loginUser(email) {
  const normalizedEmail = (email || '').toLowerCase()
  const users = getUsers()
  const found = users.find((user) => user.email === normalizedEmail)
  const user = found || saveUser({ name: 'Demo User', email: normalizedEmail || 'demo@truthlens.ai' })
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  return user
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY)
}

export function getHistory() {
  return safeParse(HISTORY_KEY, [])
}

export function saveDetection(record) {
  const normalized = normalizeRecord(record)
  const existing = getHistory().filter((item) => item.id !== normalized.id)
  const updated = [normalized, ...existing].slice(0, 100)
  localStorage.setItem(RESULT_KEY, JSON.stringify(normalized))
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
  return normalized
}

export function getLatestResult() {
  return safeParse(RESULT_KEY, {})
}

export function clearHistory() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify([]))
  localStorage.removeItem(RESULT_KEY)
}

export function getAnalytics() {
  const history = getHistory()
  const users = getUsers()
  const total = history.length
  const fake = history.filter((item) => item.prediction === 'Fake').length
  const real = history.filter((item) => item.prediction === 'Real').length
  const suspicious = history.filter((item) => item.prediction === 'Suspicious').length
  const averageConfidence = total
    ? Math.round(history.reduce((sum, item) => sum + Number(item.confidence || 0), 0) / total)
    : 0

  return {
    total,
    users: users.length,
    fake,
    real,
    suspicious,
    averageConfidence,
  }
}
