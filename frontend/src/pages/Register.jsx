import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const serverResponse = await axios.post('/api/auth/register', { name, email, password });
      localStorage.setItem('token', serverResponse.data.token);
      localStorage.setItem('userName', serverResponse.data.name);
      navigate('/dashboard');
    } catch (error) {
      setErr(error.response?.data?.message || 'Initialization Failed: Database Payload Rejection');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900 justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Profile</h2>
          <p className="text-sm text-slate-500 mt-2">Initialize access parameters for dashboard systems</p>
        </div>

        {err && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200 text-center font-medium">{err}</div>}

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 tracking-wider uppercase block mb-1">Full Legal Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" placeholder="John Doe" required />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 tracking-wider uppercase block mb-1">Network Email Axis</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" placeholder="john@doe.com" required />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 tracking-wider uppercase block mb-1">Passphrase Secret</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" placeholder="••••••••" required />
          </div>
          <button type="submit" className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 hover:shadow-none transition-all duration-200">Commit Record Registry</button>
        </form>
        <div className="text-center text-sm text-slate-500">
          Already verified? <Link to="/" className="text-indigo-600 font-semibold hover:underline">Return to Terminal Gate</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;