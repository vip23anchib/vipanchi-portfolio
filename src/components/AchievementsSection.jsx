import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Trophy, Users } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function AchievementsSection() {
  const iconMap = { ShieldAlert: ShieldCheck, Award, CreditCard: Trophy, Users };

  return (
    <section id="achievements" className="py-16 md:py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <div className="w-10 h-[3px] bg-metro-gold rounded-full mb-5" />
          <div className="flex items-center gap-2 text-metro-backend font-bold text-xs uppercase tracking-wider mb-2">
            <Award className="w-4 h-4 text-metro-gold" />
            <span>Honors &amp; Hackathon Recognition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight font-sans">
            Achievements &amp; Leadership
          </h2>
          <p className="text-sm text-[#374151] mt-2 max-w-2xl font-medium">
            National hackathon placements, cybersecurity architecture recognition, and leadership initiatives.
          </p>
        </motion.div>

        {/* Content Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="rounded-3xl border border-[#E4DDD3] bg-white/50 shadow-[0_2px_24px_rgba(27,95,168,0.06)] p-6 sm:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.achievements.map((item, idx) => {
              const IconComponent = iconMap[item.icon] || Award;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.07 }}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DDD6C9] shadow-sm hover:shadow-md hover:-translate-y-1 flex items-start gap-4 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-metro-gold" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-[#111827] font-sans leading-snug group-hover:text-metro-backend transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-xs font-extrabold text-[#6B7280]">
                      {item.event} • <span className="text-[#374151]">{item.organizer}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#374151] leading-relaxed pt-1 font-medium">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
