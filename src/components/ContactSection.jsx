import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, Copy, Download, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#FAF8F4] border-t border-[#DDD6C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-metro-backend font-bold text-xs uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-ink-primary tracking-tight font-sans">
            Get in Touch
          </h2>
          <p className="text-sm text-ink-secondary mt-1 max-w-2xl font-medium">
            I am actively looking for Software Development Engineer (SDE) and Backend Developer opportunities. Let’s talk!
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Communication Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DDD6C9] shadow-paper hover:shadow-paper-lg transition-all duration-300 space-y-4">
              <div>
                <span className="text-xs font-black text-ink-muted uppercase tracking-wider">Direct Email</span>
                <div className="text-base sm:text-lg font-black text-ink-primary font-sans mt-0.5 select-all">
                  {portfolioData.personal.email}
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="px-4 py-2.5 rounded-xl bg-metro-backend hover:bg-[#154E8C] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Send Email
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF8F4] hover:bg-[#EAE4D9] text-ink-primary text-xs font-bold border border-[#DDD6C9] shadow-xs hover:shadow transition-all"
                >
                  {copied ? 'Copied to Clipboard ✓' : 'Copy Email'}
                </button>
              </div>
            </div>

            {/* Location & Socials Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DDD6C9] shadow-paper hover:shadow-paper-lg transition-all duration-300 space-y-4">
              <div>
                <span className="text-xs font-black text-ink-muted uppercase tracking-wider">Location & Presence</span>
                <div className="text-sm font-black text-ink-primary mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-metro-backend" />
                  <span>{portfolioData.personal.location}</span>
                </div>
                <div className="text-xs text-ink-muted font-bold mt-1">
                  Phone: {portfolioData.personal.phone}
                </div>
              </div>

              <div className="pt-3 border-t border-[#EAE4D9] flex flex-wrap gap-2">
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F4] hover:bg-[#EAE4D9] text-ink-primary text-xs font-bold border border-[#DDD6C9] hover:border-[#0A66C2] shadow-xs hover:shadow transition-all"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F4] hover:bg-[#EAE4D9] text-ink-primary text-xs font-bold border border-[#DDD6C9] hover:border-ink-primary shadow-xs hover:shadow transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-ink-primary" />
                  <span>GitHub</span>
                </a>
                <a
                  href={portfolioData.personal.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F4] hover:bg-[#EAE4D9] text-ink-primary text-xs font-bold border border-[#DDD6C9] hover:border-[#FFA116] shadow-xs hover:shadow transition-all"
                >
                  <LeetcodeIcon className="w-3.5 h-3.5 text-[#FFA116]" />
                  <span>LeetCode</span>
                </a>
              </div>
            </div>

            {/* Resume Download CTA */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F4EFE6] border border-[#DDD6C9] shadow-paper flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-black text-ink-primary">Looking for my full resume?</div>
                <div className="text-[11px] text-ink-muted font-bold">Updated for 2026/2027 recruiting</div>
              </div>
              <a
                href="/Barman_Vipanchi_Resume_10-09-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-ink-primary text-white text-xs font-bold hover:bg-[#2C3345] shadow-md hover:shadow-lg transition-all shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume PDF</span>
              </a>
            </div>

          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DDD6C9] shadow-paper hover:shadow-paper-lg transition-all duration-300">
              <h3 className="text-lg font-black text-ink-primary font-sans mb-4">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-ink-secondary mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Hiring Manager / Recruiter"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#DDD6C9] text-ink-primary text-sm focus:outline-none focus:ring-2 focus:ring-metro-backend/20 focus:border-metro-backend font-sans transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-secondary mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="recruiter@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#DDD6C9] text-ink-primary text-sm focus:outline-none focus:ring-2 focus:ring-metro-backend/20 focus:border-metro-backend font-sans transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-secondary mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Vipanchi, I saw your portfolio and would like to discuss a role..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#DDD6C9] text-ink-primary text-sm focus:outline-none focus:ring-2 focus:ring-metro-backend/20 focus:border-metro-backend font-sans transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSent}
                  className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
                    formSent
                      ? 'bg-emerald-700 text-white'
                      : 'bg-metro-backend hover:bg-[#154E8C] text-white hover:-translate-y-0.5 active:translate-y-0'
                  }`}
                >
                  {formSent ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Message Sent! Thank you</span>
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

      </div>
    </section>
  );
}
