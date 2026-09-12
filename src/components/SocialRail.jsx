import React, { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function SocialRail() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socials = [
    {
      name: "GitHub Profile",
      href: portfolioData.personal.github,
      icon: GithubIcon,
      external: true,
      customHover: "hover:text-cyan-glow"
    },
    {
      name: "LinkedIn Profile",
      href: portfolioData.personal.linkedin,
      icon: LinkedinIcon,
      external: true,
      customHover: "hover:text-[#0A66C2]"
    },
    {
      name: "LeetCode Solutions",
      href: portfolioData.personal.leetcode,
      icon: LeetcodeIcon,
      external: true,
      customHover: "hover:text-[#FFA116]"
    }
  ];

  return (
    <div className="fixed left-6 bottom-0 z-30 hidden lg:flex flex-col items-center space-y-4">
      {/* Quick email copy button */}
      <div className="relative group">
        <button
          onClick={handleCopyEmail}
          className="p-2.5 rounded-lg bg-surface-900 border border-white/10 text-slate-400 hover:text-cyan-glow hover:border-cyan-glow/40 transition-all shadow-md cursor-pointer"
          title="Click to copy email address"
          aria-label="Copy Email"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-telemetry" /> : <Mail className="w-4 h-4" />}
        </button>
        <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-surface-850 border border-white/10 text-[11px] font-mono text-slate-200 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
          {copied ? "Copied to clipboard!" : portfolioData.personal.email}
        </span>
      </div>

      {/* Social links */}
      {socials.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2.5 rounded-lg bg-surface-900 border border-white/10 text-slate-400 ${item.customHover} hover:border-white/30 hover:scale-110 transition-all shadow-md`}
            aria-label={item.name}
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}

      {/* Connecting Vertical Circuit Line */}
      <div className="w-[1px] h-24 bg-gradient-to-b from-cyan-glow/50 via-white/10 to-transparent" />
    </div>
  );
}
