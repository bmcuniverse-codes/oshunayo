import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
export default function LoadingPage(){const nav=useNavigate();useEffect(()=>{const t=setTimeout(()=>nav('/intro'),2500);return()=>clearTimeout(t)},[nav]);return <div className="min-h-screen bg-ink flex flex-col items-center justify-center px-4 text-center"><div className="relative mb-8"><div className="w-28 h-28 rounded-full border-4 border-cyanGlow border-t-transparent animate-spin"/><div className="absolute inset-0 flex items-center justify-center"><Logo/></div></div><h1 className="text-4xl md:text-6xl font-black">TruthLens AI</h1><p className="text-slate-400 mt-4 max-w-md">Calm, intelligent and readable fake news detection for modern users.</p></div>}
