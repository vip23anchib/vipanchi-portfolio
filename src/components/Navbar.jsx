import React, { useState, useEffect } from 'react';
import { Download, Mail, Menu, X, Compass } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Navbar({ onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Interactive Map', href: '#network-map' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-200 bg-[#121622] border-b border-[#242C3D] shadow-lg ${
        scrolled ? 'py-3 bg-[#121622]/98 backdrop-blur-md shadow-xl' : 'py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-metro-backend text-white flex items-center justify-center font-black text-sm shadow-md ring-1 ring-white/20 group-hover:scale-105 group-hover:bg-[#2563EB] transition-all">
            VB
          </div>
          <div>
            <span className="font-black text-base tracking-tight text-white font-sans block group-hover:text-blue-300 transition-colors">
              Vipanchi Barman
            </span>
            <span className="text-[11px] font-semibold text-slate-400 block -mt-0.5">
              Backend & Data Systems Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right CTA Actions & Socials */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Social Icons */}
          <div className="flex items-center gap-1 pr-2 border-r border-[#2C3549]">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition border border-transparent hover:border-white/15"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.personal.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              title="LeetCode Profile"
              className="p-2 rounded-xl text-slate-300 hover:text-[#FFA116] hover:bg-white/10 transition border border-transparent hover:border-white/15"
            >
              <LeetcodeIcon className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
              className="p-2 rounded-xl text-slate-300 hover:text-[#38BDF8] hover:bg-white/10 transition border border-transparent hover:border-white/15"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>

          <a
            href="/Barman_Vipanchi_Resume_10-09-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-metro-backend hover:bg-[#1D6FD0] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 hover:border-white/30 transition-all shadow-sm"
          >
            <Mail className="w-3.5 h-3.5 text-blue-300" />
            <span>Get in Touch</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/10 border border-white/15 text-slate-200 hover:text-white shadow-sm"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121622] border-b border-[#242C3D] px-4 py-4 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-300 pb-3 border-b border-[#242C3D]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-white/10 hover:text-white transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Social Row */}
          <div className="flex items-center justify-around py-2 border-b border-[#242C3D]">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-slate-200 hover:text-white"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={portfolioData.personal.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-[#FFA116]"
            >
              <LeetcodeIcon className="w-4 h-4" />
              <span>LeetCode</span>
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-[#38BDF8]"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <a
              href="/Barman_Vipanchi_Resume_10-09-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-metro-backend text-white text-xs font-bold shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold border border-white/15"
            >
              <Mail className="w-3.5 h-3.5 text-blue-300" />
              <span>Contact</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
