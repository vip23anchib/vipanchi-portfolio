import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white border-t border-[#DDD6C9] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding & Info */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-ink-primary text-white flex items-center justify-center font-black text-xs">
              VB
            </div>
            <span className="font-extrabold text-ink-primary text-sm font-sans">
              Vipanchi Barman
            </span>
          </div>
          <p className="text-xs text-ink-muted">
            Backend & Data Systems Engineer • B.Tech CSE (9.04 CGPA), VIT Bhopal
          </p>
        </div>

        {/* Middle: Social Links */}
        <div className="flex items-center gap-4 text-xs font-bold text-ink-secondary">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-metro-backend transition flex items-center gap-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-metro-backend transition flex items-center gap-1.5"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <a
            href={portfolioData.personal.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-metro-backend transition flex items-center gap-1.5"
          >
            <LeetcodeIcon className="w-3.5 h-3.5" />
            <span>LeetCode</span>
          </a>
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="hover:text-metro-backend transition flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
        </div>

        {/* Right: Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F4] hover:bg-[#EAE4D9] text-ink-secondary hover:text-ink-primary text-xs font-bold border border-[#DDD6C9] transition"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}
