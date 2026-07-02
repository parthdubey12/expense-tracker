import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const activeUser = localStorage.getItem('userName') || 'System operator';

  const fetchLedgerStream = async () => {
    try {
      const activeSessionToken = localStorage.getItem('token');
      const response = await axios.get('/api/expenses', {
        headers: { Authorization: `Bearer ${activeSessionToken}` }
      });
      setExpenses(response.data);
    } catch (error) {
      localStorage.clear();
      navigate('/');
    }
  };

  useEffect(() => {
    fetchLedgerStream();
  }, []);

  const handleRecordInjection = async (e) => {
    e.preventDefault();
    try {
      const activeSessionToken = localStorage.getItem('token');
      await axios.post('/api/expenses', { amount: Number(amount), category, description }, {
        headers: { Authorization: `Bearer ${activeSessionToken}` }
      });
      setAmount('');
      setDescription('');
      fetchLedgerStream();
    } catch (error) {
      console.error('Data pipeline error during creation sequence.');
    }
  };

  const handlePurgeInstance = async (targetId) => {
    try {
      const activeSessionToken = localStorage.getItem('token');
      await axios.delete(`/api/expenses/${targetId}`, {
        headers: { Authorization: `Bearer ${activeSessionToken}` }
      });
      fetchLedgerStream();
    } catch (error) {
      console.error('Failure inside structural memory purging routine.');
    }
  };

  const handleSessionTermination = () => {
    localStorage.clear();
    navigate('/');
  };

  // Statistical Calculation Engines
  const categoriesList = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Housing', 'Healthcare', 'Miscellaneous'];
  const aggregatedValuesMap = categoriesList.map(cat => {
    return expenses
      .filter(exp => exp.category === cat)
      .reduce((sum, item) => sum + item.amount, 0);
  });

  const aggregateGrossOutflow = expenses.reduce((sum, item) => sum + item.amount, 0);

  const analyticalChartDataConfiguration = {
    labels: categoriesList.filter((_, idx) => aggregatedValuesMap[idx] > 0),
    datasets: [{
      label: 'Asset Expenditure Velocity Mapping',
      data: aggregatedValuesMap.filter(val => val > 0),
      backgroundColor: ['#f43f5e', '#3b82f6', '#eab308', '#10b981', '#6366f1', '#a855f7', '#64748b'],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Premium Global Navigation Strip */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">𝚵</div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">LedgerPrime <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 border rounded text-slate-500">v1.1</span></span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border">Identity Node: <b className="text-slate-900 font-bold">{activeUser}</b></span>
          <button onClick={handleSessionTermination} className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-4 py-2 rounded-xl hover:bg-red-100 transition border border-red-200">Disconnect</button>
        </div>
      </nav>

      <main className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Core Architectural Aggregators */}
        <div className="bg-gradient-to-r from-indigo-900 via-slate-950 to-emerald-950 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-indigo-200 text-xs font-mono uppercase tracking-widest">Aggregated Pipeline Volumetric Outflow</p>
            <h2 className="text-4xl font-black tracking-tight mt-1">${aggregateGrossOutflow.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3 text-xs font-mono text-slate-300">
            Active Data Buffers: <span className="text-emerald-400 font-bold">{expenses.length} Nodes Loaded</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Data Injection Node Panel */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 h-fit">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Log Transaction Metrics</h3>
            <form onSubmit={handleRecordInjection} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1 uppercase tracking-wider">Asset Metric Quantity ($)</label>
                <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition font-semibold" placeholder="0.00" required />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1 uppercase tracking-wider">Classification Index</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition font-medium">
                  {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1 uppercase tracking-wider">Descriptive Payload</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-sm" placeholder="Metadata identifier strings..." />
              </div>
              <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-200">Inject Transaction Block</button>
            </form>
          </div>

          {/* Visualization Graphic Engine Matrix */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[350px]">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight self-start mb-4">Functional Breakdown Diagnostics</h3>
            {expenses.length > 0 ? (
              <div className="w-full max-w-sm"><Pie data={analyticalChartDataConfiguration} /></div>
            ) : (
              <div className="text-center p-8 text-slate-400 font-medium text-sm border-2 border-dashed border-slate-200 rounded-xl w-full">Analytical visualization matrix inactive: Awaiting ledger records populate sequences.</div>
            )}
          </div>
        </div>

        {/* Live Storage Table Ledgers */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Data Stream Storage Matrices</h3>
          </div>
          {expenses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-500 text-xs uppercase font-mono tracking-wider">
                    <th className="py-3 px-6">Timestamp Index</th>
                    <th className="py-3 px-6">Payload Summary</th>
                    <th className="py-3 px-6">Vector Class</th>
                    <th className="py-3 px-6 text-right">Value Mapping</th>
                    <th className="py-3 px-6 text-center">Operation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {expenses.map((exp) => (
                    <tr key={exp._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-mono text-slate-400 text-xs">{new Date(exp.date).toLocaleDateString()}</td>
                      <td className="py-4 px-6 font-semibold text-slate-800">{exp.description || 'Null Identifier String'}</td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 text-xs font-bold rounded-md bg-slate-100 border text-slate-600">{exp.category}</span>
                      </td>
                      <td className="py-4 px-6 text-right font-mono font-bold text-rose-600">-${Number(exp.amount).toFixed(2)}</td>
                      <td className="py-4 px-6 text-center">
                        <button onClick={() => handlePurgeInstance(exp._id)} className="text-xs font-bold px-3 py-1 bg-red-50 text-red-600 rounded-lg border border-red-100 hover:bg-red-500 hover:text-white hover:border-transparent transition duration-150">Purge</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 text-sm">System Storage Nodes Empty. No data packets detected inside the execution cluster.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
