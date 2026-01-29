
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Users, Activity, ExternalLink } from 'lucide-react';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const MarketInsights: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold">Market Momentum</h3>
          <p className="text-slate-400 text-sm">Real-time aggregate data across 50+ neighborhoods.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-800 px-4 py-3 rounded-2xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Seekers</div>
              <div className="text-lg font-bold">12.4k</div>
            </div>
          </div>
          <div className="bg-slate-800 px-4 py-3 rounded-2xl flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Avg Growth</div>
              <div className="text-lg font-bold">+8.2%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-64 bg-slate-800/50 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-bold text-slate-400">Inventory Trends</span>
            <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">Last 6 Months</span>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={data}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip 
                cursor={{fill: '#1e293b'}}
                contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '12px'}}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#22c55e' : '#334155'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-800/30 p-5 rounded-3xl border border-slate-800 flex items-start gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-2xl">
              <Users className="text-indigo-400 w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200">Investor Sentiment</h4>
              <p className="text-sm text-slate-500 leading-relaxed mt-1">
                Sentiment is increasingly bullish in peripheral districts as transit links expand.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/30 p-5 rounded-3xl border border-slate-800 flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 rounded-2xl">
              <Activity className="text-amber-400 w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200">Liquidity Index</h4>
              <p className="text-sm text-slate-500 leading-relaxed mt-1">
                Properties are selling 15% faster than Q4 last year. Average time-on-market: 22 days.
              </p>
            </div>
          </div>
          
          <button className="w-full py-4 border border-slate-700 rounded-2xl text-xs font-bold text-slate-400 hover:text-white hover:border-slate-500 transition-all flex items-center justify-center gap-2">
            View Detailed 2024 Market PDF <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
