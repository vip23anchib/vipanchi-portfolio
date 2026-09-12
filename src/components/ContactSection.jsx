import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  Code2, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';

export default function ContactSection() {
  const { personal } = portfolioData;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#00F2FE', '#00D2B4', '#10B981', '#FFFFFF']
      });
    } catch (err) {
      // fallback if not supported
    }

    setSubmitted(true);
    // Create mailto fallback link automatically
    const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(formState.subject || "Portfolio Inquiry")}&body=${encodeURIComponent(`Hi Vipanchi,\n\n${formState.message}\n\nFrom: ${formState.name} (${formState.email})`)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-white/10 gap-4">
          <div>
            <span className="font-mono text-xs text-cyan-glow uppercase tracking-[0.2em]">
              // 06. CONNECTIVITY PROTOCOL
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Get in Touch
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-md">
            Open for software engineering internships, backend architect roles, and collaborative projects.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Info & Copy Pill */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-white">
                Let's discuss backend architecture, data systems, or software opportunities.
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Whether you're looking for a dedicated backend intern with strong Django & PostgreSQL expertise, or want to talk about data pipelines and algorithmic optimization, feel free to drop a message.
              </p>

              {/* Direct Info List */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-950/80 border border-white/5">
                  <div className="flex items-center space-x-3 text-xs">
                    <Mail className="w-4 h-4 text-cyan-glow shrink-0" />
                    <span className="font-mono text-slate-200">{personal.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-surface-900 hover:bg-surface-850 text-slate-400 hover:text-cyan-glow border border-white/10 transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-telemetry" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center p-3.5 rounded-xl bg-surface-950/80 border border-white/5 space-x-3 text-xs">
                  <Phone className="w-4 h-4 text-cyan-glow shrink-0" />
                  <span className="font-mono text-slate-200">{personal.phone}</span>
                </div>

                <div className="flex items-center p-3.5 rounded-xl bg-surface-950/80 border border-white/5 space-x-3 text-xs">
                  <MapPin className="w-4 h-4 text-cyan-glow shrink-0" />
                  <span className="font-mono text-slate-200">{personal.location}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-white/5">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-3">Profiles:</span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-surface-950 hover:bg-surface-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-glow flex items-center space-x-2 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-surface-950 hover:bg-surface-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-[#0A66C2] flex items-center space-x-2 transition-colors"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={personal.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-surface-950 hover:bg-surface-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-[#FFA116] flex items-center space-x-2 transition-colors"
                  >
                    <LeetcodeIcon className="w-3.5 h-3.5" />
                    <span>LeetCode</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Send className="w-4 h-4 text-cyan-glow" />
                  <span>Send Direct Message</span>
                </h3>
                <span className="text-[11px] font-mono text-emerald-telemetry flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-telemetry mr-1.5 animate-pulse" />
                  INSTANT DISPATCH
                </span>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-surface-950/80 border border-emerald-telemetry/30 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-telemetry/15 text-emerald-telemetry border border-emerald-telemetry/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Message Prepared!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Your email client has been triggered. You can also directly reach out to <strong className="text-cyan-glow font-mono">{personal.email}</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-4 py-2 rounded-lg bg-surface-900 hover:bg-surface-800 text-xs font-mono text-cyan-glow border border-white/10 cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-medium">NAME / COMPANY</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Alex Rivera (Tech Lead)"
                        className="w-full px-4 py-3 rounded-lg bg-surface-950 border border-white/10 focus:border-cyan-glow focus:outline-none text-slate-200 placeholder:text-slate-600 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-medium">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-lg bg-surface-950 border border-white/10 focus:border-cyan-glow focus:outline-none text-slate-200 placeholder:text-slate-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-medium">SUBJECT</label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g. SDE Backend Role / Project Collaboration"
                      className="w-full px-4 py-3 rounded-lg bg-surface-950 border border-white/10 focus:border-cyan-glow focus:outline-none text-slate-200 placeholder:text-slate-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-medium">MESSAGE / PROJECT SPEC</label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Share details regarding your requirements, team, or opportunity..."
                      className="w-full px-4 py-3 rounded-lg bg-surface-950 border border-white/10 focus:border-cyan-glow focus:outline-none text-slate-200 placeholder:text-slate-600 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-gradient-to-r from-cyan-glow to-teal-400 text-obsidian font-bold text-sm flex items-center justify-center space-x-2 hover:opacity-95 hover:shadow-[0_0_20px_rgba(0,242,254,0.35)] transition-all cursor-pointer font-sans"
                  >
                    <span>Dispatch Communication</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
