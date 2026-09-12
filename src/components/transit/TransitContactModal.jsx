import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, Check, Copy, Terminal, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons';
import { portfolioData } from '../../data/portfolioData';

export default function TransitContactModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#0F121A] text-zinc-100 rounded-xl border-2 border-metro-yellow shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-black border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-metro-yellow text-black flex items-center justify-center font-black text-sm">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase text-white font-sans">
                Stationmaster Dispatch Desk
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Direct Communication Channel • Open to SDE & Backend Opportunities
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          
          {/* Direct Communication Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            
            {/* Email Card */}
            <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 font-mono uppercase">Primary Signal</span>
                <div className="font-bold text-white text-xs truncate mt-0.5">
                  {portfolioData.personal.email}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="px-2.5 py-1 rounded bg-metro-backend text-white text-xs font-bold hover:bg-blue-600 transition"
                >
                  Open Mail
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono transition"
                >
                  {copied ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Telephone & Base */}
            <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 font-mono uppercase">Operating Base</span>
                <div className="font-bold text-white text-xs mt-0.5">
                  {portfolioData.personal.location}
                </div>
                <div className="text-zinc-400 text-xs font-mono mt-1">
                  {portfolioData.personal.phone}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

          </div>

          {/* Direct Dispatch Message Form */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-metro-yellow flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Send Station Telegram / Query</span>
            </h3>

            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Your Name / Organization</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Engineering Recruiter / Hiring Team"
                className="w-full px-3 py-2 rounded bg-zinc-950 border border-zinc-700 text-zinc-200 text-xs focus:outline-none focus:border-metro-yellow font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Your Contact Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="recruiter@company.com"
                className="w-full px-3 py-2 rounded bg-zinc-950 border border-zinc-700 text-zinc-200 text-xs focus:outline-none focus:border-metro-yellow font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Dispatch Message / Role Details</label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="We would love to discuss our Backend Engineer / SDE role..."
                className="w-full px-3 py-2 rounded bg-zinc-950 border border-zinc-700 text-zinc-200 text-xs focus:outline-none focus:border-metro-yellow font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={formSent}
              className={`w-full py-2.5 rounded font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                formSent
                  ? 'bg-emerald-600 text-white'
                  : 'bg-metro-yellow hover:bg-amber-400 text-black'
              }`}
            >
              {formSent ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Dispatch Transmitted! Stationmaster Notified</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Transmit Dispatch</span>
                </>
              )}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
