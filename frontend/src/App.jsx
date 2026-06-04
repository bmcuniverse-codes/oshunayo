import { Routes, Route, Navigate } from 'react-router-dom'
import LoadingPage from './pages/LoadingPage'
import IntroPage from './pages/IntroPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import DetectPage from './pages/DetectPage'
import ResultPage from './pages/ResultPage'
import HistoryPage from './pages/HistoryPage'
import AdminDashboard from './pages/AdminDashboard'

export default function App(){return <Routes><Route path="/" element={<LoadingPage/>}/><Route path="/intro" element={<IntroPage/>}/><Route path="/home" element={<LandingPage/>}/><Route path="/login" element={<LoginPage/>}/><Route path="/register" element={<RegisterPage/>}/><Route path="/dashboard" element={<DashboardPage/>}/><Route path="/detect" element={<DetectPage/>}/><Route path="/result" element={<ResultPage/>}/><Route path="/history" element={<HistoryPage/>}/><Route path="/admin" element={<AdminDashboard/>}/><Route path="*" element={<Navigate to="/"/>}/></Routes>}
