import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Check, Copy, Download, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

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
    <section id="contact" className="py-16 md:py-20 bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <div className="w-10 h-[3px] bg-metro-backend rounded-full mb-5" />
          <div className="flex items-center gap-2 text-metro-backend font-bold text-xs uppercase tracking-wider mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>Connect &amp; Collaborate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight font-sans">
            Get in Touch
          </h2>
          <p className="text-sm text-[#374151] mt-2 max-w-2xl font-medium">
            I am actively looking for Software Development Engineer (SDE) and Backend Developer opportunities. Let's talk!
          </p>
        </motion.div>

        {/* Content Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="rounded-3xl border border-[#E4DDD3] bg-white/50 shadow-[0_2px_24px_rgba(27,95,168,0.06)] p-6 sm:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left: Contact Cards */}
            <div className="lg:col-span-5 space-y-4">

              {/* Email Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DDD6C9] shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
                <div>
                  <span className="text-xs font-black text-[#6B7280] uppercase tracking-wider">Direct Email</span>
                  <div className="text-base sm:text-lg font-black text-[#111827] font-sans mt-0.5 select-all">
                    {portfolioData.personal.email}
                  </div>
                </div>
                <div className="flex items-center gap-2.5 pt-1">
                  <a href={`mailto:${portfolioData.personal.email}`}
                    className="px-4 py-2.5 rounded-xl bg-metro-backend hover:bg-[#154E8C] text-white text-xs font-bold shadow-sm hover:shadow-md transition-all">
                    Send Email
                  </a>
                  <button onClick={handleCopyEmail}
                    className="px-4 py-2.5 rounded-xl bg-[#FAF8F4] hover:bg-[#EAE4D9] text-[#111827] text-xs font-bold border border-[#DDD6C9] shadow-xs hover:shadow transition-all">
                    {copied ? 'Copied to Clipboard ✓' : 'Copy Email'}
                  </button>
                </div>
              </div>

              {/* Location & Socials */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DDD6C9] shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
                <div>
                  <span className="text-xs font-black text-[#6B7280] uppercase tracking-wider">Location &amp; Presence</span>
                  <div className="text-sm font-black text-[#111827] mt-1 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-metro-backend" />
                    <span>{portfolioData.personal.location}</span>
                  </div>
                  <div className="text-xs text-[#6B7280] font-bold mt-1">
                    Phone: {portfolioData.personal.phone}
                  </div>
                </div>
                <div className="pt-3 border-t border-[#EAE4D9] flex flex-wrap gap-2">
                  <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F4] hover:bg-[#EAE4D9] text-[#111827] text-xs font-bold border border-[#DDD6C9] hover:border-[#0A66C2] shadow-xs hover:shadow transition-all">
                    <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" /> LinkedIn
                  </a>
                  <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F4] hover:bg-[#EAE4D9] text-[#111827] text-xs font-bold border border-[#DDD6C9] hover:border-[#111827] shadow-xs hover:shadow transition-all">
                    <GithubIcon className="w-3.5 h-3.5 text-[#111827]" /> GitHub
                  </a>
                  <a href={portfolioData.personal.leetcode} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F4] hover:bg-[#EAE4D9] text-[#111827] text-xs font-bold border border-[#DDD6C9] hover:border-[#FFA116] shadow-xs hover:shadow transition-all">
                    <LeetcodeIcon className="w-3.5 h-3.5 text-[#FFA116]" /> LeetCode
                  </a>
                </div>
              </div>

              {/* Resume CTA */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#F4EFE6] border border-[#DDD6C9] shadow-sm flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-black text-[#111827]">Looking for my full resume?</div>
                  <div className="text-[11px] text-[#6B7280] font-bold">Updated for 2026/2027 recruiting</div>
                </div>
                <a href="/Barman_Vipanchi_Resume_10-09-2026.pdf" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#111827] text-white text-xs font-bold hover:bg-[#2C3345] shadow-md hover:shadow-lg transition-all shrink-0">
                  <Download className="w-3.5 h-3.5" /> Resume PDF
                </a>
              </div>
            </div>

            {/* Right: Message Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DDD6C9] shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-black text-[#111827] font-sans mb-4">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">Your Name</label>
                    <input type="text" required value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Hiring Manager / Recruiter"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#DDD6C9] text-[#111827] text-sm focus:outline-none focus:ring-2 focus:ring-metro-backend/20 focus:border-metro-backend font-sans transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">Your Email</label>
                    <input type="email" required value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="recruiter@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#DDD6C9] text-[#111827] text-sm focus:outline-none focus:ring-2 focus:ring-metro-backend/20 focus:border-metro-backend font-sans transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">Message</label>
                    <textarea required rows={4} value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Vipanchi, I saw your portfolio and would like to discuss a role..."
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#DDD6C9] text-[#111827] text-sm focus:outline-none focus:ring-2 focus:ring-metro-backend/20 focus:border-metro-backend font-sans transition-all" />
                  </div>
                  <button type="submit" disabled={formSent}
                    className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
                      formSent ? 'bg-emerald-700 text-white' : 'bg-metro-backend hover:bg-[#154E8C] text-white hover:-translate-y-0.5 active:translate-y-0'
                    }`}>
                    {formSent ? (
                      <><Check className="w-4 h-4" /><span>Message Sent! Thank you</span></>
                    ) : (
                      <><Send className="w-4 h-4" /><span>Send Message</span></>
                    )}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
