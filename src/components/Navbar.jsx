import React, { useState, useEffect } from 'react';
import { Terminal, Download, Menu, X, Layers, Sparkles, User, Briefcase, Code2, Award, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Navbar({ onOpenTerminal, onOpenAbout }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Overview", href: "#hero", id: "hero", icon: Layers },
    { name: "Skills", href: "#skills", id: "skills", icon: Code2 },
    { name: "Experience", href: "#experience", id: "experience", icon: Briefcase },
    { name: "Projects", href: "#projects", id: "projects", icon: Sparkles },
    { name: "Achievements", href: "#achievements", id: "achievements", icon: Award },
    { name: "Contact", href: "#contact", id: "contact", icon: Mail },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-obsidian/85 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#hero" 
          className="flex items-center space-x-3 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-surface-900 border border-cyan-glow/30 flex items-center justify-center text-cyan-glow group-hover:border-cyan-glow group-hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all">
            <span className="font-mono font-bold text-sm">VB</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-wide text-white group-hover:text-cyan-glow transition-colors">
              VIPANCHI BARMAN
            </span>
            <span className="font-mono text-[10px] text-slate-400 tracking-wider flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-telemetry mr-1.5 animate-pulse" />
              VIT '27 • 9.04 CGPA
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-1 p-1 rounded-full bg-surface-900/80 border border-white/10 backdrop-blur-md">
          <button
            onClick={onOpenAbout}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-cyan-glow hover:bg-white/5 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-cyan-glow" />
            <span>About Bio</span>
          </button>

          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSection === item.id
                  ? 'bg-cyan-glow/15 text-cyan-glow border border-cyan-glow/30 shadow-[0_0_10px_rgba(0,242,254,0.15)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Actions (Terminal & Resume) */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Terminal Console Trigger */}
          <button
            onClick={onOpenTerminal}
            className="px-3 py-1.5 rounded-lg bg-surface-900 hover:bg-surface-850 border border-white/10 hover:border-cyan-glow/40 text-xs font-mono text-slate-300 hover:text-cyan-glow flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm"
            title="Open Interactive Command Sandbox"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-glow" />
            <span>CLI_SANDBOX</span>
          </button>

          {/* Resume Download */}
          <a
            href={portfolioData.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-glow to-teal-400 text-obsidian font-semibold text-xs flex items-center space-x-1.5 hover:opacity-95 hover:shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume PDF</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-lg bg-surface-900 border border-white/10 text-cyan-glow"
            aria-label="Open Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-surface-900 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pt-2 pb-6 bg-surface-950/95 backdrop-blur-2xl border-b border-white/10 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAbout();
            }}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-white/5 hover:text-cyan-glow transition-all text-left"
          >
            <User className="w-4 h-4 text-cyan-glow" />
            <span>About Bio & Philosophy</span>
          </button>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
                  activeSection === item.id
                    ? 'bg-cyan-glow/10 text-cyan-glow font-medium border border-cyan-glow/20'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            );
          })}

          <div className="pt-3 border-t border-white/10 flex flex-col space-y-2">
            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-glow to-teal-400 text-obsidian font-bold text-center text-sm flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
