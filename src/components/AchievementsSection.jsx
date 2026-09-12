import React from 'react';
import { Trophy, Award, ShieldAlert, CreditCard, Users, Star, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function AchievementsSection() {
  const { achievements } = portfolioData;

  const iconMap = {
    ShieldAlert: ShieldAlert,
    Award: Award,
    CreditCard: CreditCard,
    Users: Users,
  };

  return (
    <section id="achievements" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-white/10 gap-4">
          <div>
            <span className="font-mono text-xs text-cyan-glow uppercase tracking-[0.2em]">
              // 05. HONORS & LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Hackathons & Recognition
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-md">
            National hackathon qualifications, system design accolades, and engineering leadership.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item) => {
            const Icon = iconMap[item.icon] || Trophy;
            return (
              <div
                key={item.id}
                className="rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 hover:border-cyan-glow/40 transition-all flex flex-col justify-between space-y-4 group shadow-lg"
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-surface-950 border border-white/10 text-xs font-mono font-bold text-cyan-glow">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-cyan-glow transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs font-mono text-slate-400 mt-1">
                    Organized by: <strong className="text-slate-200">{item.organizer}</strong>
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed mt-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>{item.event}</span>
                  <span className="text-emerald-telemetry flex items-center">
                    <Star className="w-3.5 h-3.5 mr-1 fill-emerald-telemetry/20" />
                    VERIFIED
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
