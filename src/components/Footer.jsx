import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#121622] border-t border-[#242C3D] py-12 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding & Info */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-metro-backend text-white flex items-center justify-center font-black text-xs shadow-md ring-1 ring-white/20">
              VB
            </div>
            <span className="font-black text-white text-base font-sans">
              Vipanchi Barman
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Backend & Data Systems Engineer • B.Tech CSE (9.04 CGPA), VIT Bhopal
          </p>
        </div>

        {/* Middle: Social Links */}
        <div className="flex items-center gap-5 text-xs font-bold text-slate-300">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition flex items-center gap-1.5"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#38BDF8] transition flex items-center gap-1.5"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a
            href={portfolioData.personal.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFA116] transition flex items-center gap-1.5"
          >
            <LeetcodeIcon className="w-4 h-4" />
            <span>LeetCode</span>
          </a>
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="hover:text-blue-300 transition flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
        </div>

        {/* Right: Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-bold border border-white/15 transition-all shadow-sm"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}
