import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Trophy, Users, Star, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function AchievementsSection() {
  const iconMap = {
    ShieldAlert: ShieldCheck,
    Award: Award,
    CreditCard: Trophy,
    Users: Users
  };

  return (
    <section id="achievements" className="py-16 md:py-20 border-t border-[#DDD6C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-metro-backend font-bold text-xs uppercase tracking-wider mb-1">
            <Award className="w-4 h-4 text-metro-gold" />
            <span>Honors & Hackathon Recognition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-ink-primary tracking-tight font-sans">
            Achievements & Leadership
          </h2>
          <p className="text-sm text-ink-secondary mt-1 max-w-2xl">
            National hackathon placements, cybersecurity architecture recognition, and leadership initiatives.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.achievements.map((item) => {
            const IconComponent = iconMap[item.icon] || Award;
            return (
              <div
                key={item.id}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DDD6C9] shadow-paper-card flex items-start gap-4 transition-all hover:shadow-paper"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F4] text-metro-gold border border-[#DDD6C9] flex items-center justify-center shrink-0 shadow-sm">
                  <IconComponent className="w-6 h-6 text-metro-gold" />
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-50 text-amber-900 border border-amber-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-ink-primary font-sans leading-snug">
                    {item.title}
                  </h3>

                  <div className="text-xs font-bold text-ink-muted">
                    {item.event} • <span className="text-ink-secondary">{item.organizer}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
