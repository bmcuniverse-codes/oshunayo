import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { saveUser } from '../utils/storage'

export default function RegisterPage() {
  const nav = useNavigate()

  function submit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    saveUser({
      name: form.get('name'),
      email: form.get('email'),
    })
    nav('/dashboard')
  }

  return (
    <div className="min-h-screen bg-ink grid place-items-center px-4">
      <form onSubmit={submit} className="glass rounded-[2rem] p-6 md:p-8 w-full max-w-md">
        <Logo />
        <h1 className="text-3xl font-black mt-8">Create account</h1>
        <p className="text-slate-400 mt-2">Your account is saved locally for this academic demo.</p>
        <input name="name" className="input mt-6" placeholder="Full name" required />
        <input name="email" className="input mt-4" placeholder="Email address" type="email" required />
        <input name="password" className="input mt-4" placeholder="Password" type="password" required />
        <button className="btn-primary w-full mt-6">Register</button>
        <p className="text-slate-400 mt-5 text-center">Already registered? <Link className="text-cyanGlow" to="/login">Login</Link></p>
      </form>
    </div>
  )
}
