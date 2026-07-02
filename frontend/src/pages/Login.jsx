import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const serverResponse = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', serverResponse.data.token);
      localStorage.setItem('userName', serverResponse.data.name);
      navigate('/dashboard');
    } catch (error) {
      setErr(error.response?.data?.message || 'Access Denied: Connection Pipeline Failure');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900 justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="text-sm text-slate-500 mt-2">Sign in to track your monetary operational vectors</p>
        </div>
        
        {err && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200 text-center font-medium">{err}</div>}
        
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 tracking-wider uppercase block mb-1">Email Coordinates</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" placeholder="name@domain.com" required />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 tracking-wider uppercase block mb-1">Passphrase Key</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" placeholder="••••••••" required />
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-none transition-all duration-200">Authenticate Node Session</button>
        </form>
        <div className="text-center text-sm text-slate-500">
          New terminal user? <Link to="/register" className="text-indigo-600 font-semibold hover:underline">Provision New Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;