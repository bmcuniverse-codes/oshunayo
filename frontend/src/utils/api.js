const API_URL = import.meta.env.VITE_API_URL || 'https://oshunayo.onrender.com'

export async function predictNews(text) {
  const res = await fetch(`${API_URL}/api/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) throw new Error('Prediction failed')
  return res.json()
}
