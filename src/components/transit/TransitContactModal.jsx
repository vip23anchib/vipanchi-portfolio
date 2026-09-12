import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from '../Icons';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#FAF8F4] text-ink-primary rounded-2xl border border-[#DDD6C9] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#DDD6C9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-ink-primary text-white flex items-center justify-center font-bold text-sm shadow-sm">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-ink-primary font-sans">
                Get in Touch
              </h2>
              <p className="text-xs text-ink-muted">
                Available for SDE & Backend Developer Roles (Full-Time & Internships)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE4D9] text-ink-secondary hover:text-ink-primary transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          
          {/* Direct Communication Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Email Card */}
            <div className="p-4 rounded-xl bg-white border border-[#DDD6C9] flex flex-col justify-between shadow-paper-card">
              <div>
                <span className="text-[11px] text-ink-muted uppercase font-bold">Email Address</span>
                <div className="font-bold text-ink-primary text-xs truncate mt-0.5">
                  {portfolioData.personal.email}
                </div>
              </div>
              <div className="mt-3.5 flex items-center gap-2">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="px-3 py-1.5 rounded-lg bg-metro-backend text-white text-xs font-bold hover:bg-[#154E8C] transition"
                >
                  Send Email
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE4D9] text-ink-primary text-xs font-semibold transition"
                >
                  {copied ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Location & Socials */}
            <div className="p-4 rounded-xl bg-white border border-[#DDD6C9] flex flex-col justify-between shadow-paper-card">
              <div>
                <span className="text-[11px] text-ink-muted uppercase font-bold">Location & Phone</span>
                <div className="font-bold text-ink-primary text-xs mt-0.5">
                  {portfolioData.personal.location}
                </div>
                <div className="text-ink-muted text-xs mt-0.5">
                  {portfolioData.personal.phone}
                </div>
              </div>
              <div className="mt-3.5 flex items-center gap-2">
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE4D9] text-ink-primary text-xs font-semibold transition"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE4D9] text-ink-primary text-xs font-semibold transition"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

          </div>

          {/* Quick Message Form */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-primary">
              Send a Direct Message
            </h3>

            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Hiring Manager / Recruiter"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DDD6C9] text-ink-primary text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-metro-backend/20 focus:border-metro-backend font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">Your Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="recruiter@company.com"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DDD6C9] text-ink-primary text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-metro-backend/20 focus:border-metro-backend font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">Message</label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hi Vipanchi, we would love to discuss an opportunity on our team..."
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DDD6C9] text-ink-primary text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-metro-backend/20 focus:border-metro-backend font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={formSent}
              className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm ${
                formSent
                  ? 'bg-emerald-700 text-white'
                  : 'bg-ink-primary hover:bg-[#2C3345] text-white'
              }`}
            >
              {formSent ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Message Sent Successfully!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
