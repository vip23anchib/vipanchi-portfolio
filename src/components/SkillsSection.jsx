import React, { useState } from 'react';
import { 
  Code2, 
  Server, 
  Database, 
  BarChart3, 
  Layout, 
  Wrench, 
  Check, 
  Cpu, 
  Sparkles
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function SkillsSection() {
  const { categories } = portfolioData.skills;
  const [activeCategory, setActiveCategory] = useState("All");

  const categoryIcons = {
    "Languages": Code2,
    "Backend & Architecture": Server,
    "Databases & Data Engineering": Database,
    "Data, Analytics & AI": BarChart3,
    "Frontend & UI": Layout,
    "Tools & DevOps": Wrench,
  };

  const filteredCategories = activeCategory === "All" 
    ? categories 
    : categories.filter(c => c.name === activeCategory);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10 gap-4">
          <div>
            <span className="font-mono text-xs text-cyan-glow uppercase tracking-[0.2em]">
              // 02. TECHNICAL MATRIX
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Skills & Systems Competency
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-md">
            Indexed by proficiency and real-world engineering application across backend services, data stores, and AI models.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeCategory === "All"
                ? 'bg-cyan-glow text-obsidian font-bold shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                : 'bg-surface-900 text-slate-300 hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            All Matrix ({categories.reduce((acc, cat) => acc + cat.skills.length, 0)})
          </button>

          {categories.map((cat) => {
            const Icon = categoryIcons[cat.name] || Code2;
            const isSelected = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono flex items-center space-x-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-glow/20 text-cyan-glow border border-cyan-glow/40 shadow-sm'
                    : 'bg-surface-900 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = categoryIcons[category.name] || Code2;
            return (
              <div 
                key={category.name}
                className="rounded-xl glass-panel p-6 border border-white/10 hover:border-cyan-glow/30 transition-all space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
                  <div className="p-2 rounded-lg bg-surface-950 text-cyan-glow border border-white/5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      {category.name}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500">
                      {category.skills.length} core competencies
                    </span>
                  </div>
                </div>

                {/* Skill Items */}
                <div className="space-y-3.5">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">{skill.name}</span>
                        <span className="font-mono text-[11px] text-cyan-glow font-medium">{skill.level}%</span>
                      </div>

                      {/* Progress bar */}
                      <div className="h-1.5 w-full bg-surface-950 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-glow to-teal-400 rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      <p className="text-[11px] text-slate-400 font-mono pl-1">
                        › {skill.highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
