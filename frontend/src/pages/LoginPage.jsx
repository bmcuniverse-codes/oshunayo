import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { loginUser } from '../utils/storage'

export default function LoginPage() {
  const nav = useNavigate()

  function submit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    loginUser(form.get('email'))
    nav('/dashboard')
  }

  return (
    <div className="min-h-screen bg-ink grid place-items-center px-4">
      <form onSubmit={submit} className="glass rounded-[2rem] p-6 md:p-8 w-full max-w-md">
        <Logo />
        <h1 className="text-3xl font-black mt-8">Welcome back</h1>
        <p className="text-slate-400 mt-2">Use your registered email. New demo emails are counted as new users.</p>
        <input name="email" className="input mt-6" placeholder="Email address" type="email" required />
        <input name="password" className="input mt-4" placeholder="Password" type="password" required />
        <button className="btn-primary w-full mt-6">Login</button>
        <p className="text-slate-400 mt-5 text-center">No account? <Link className="text-cyanGlow" to="/register">Create one</Link></p>
      </form>
    </div>
  )
}
