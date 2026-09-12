import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles, Trash2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function TerminalDrawer({ isOpen, onClose }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      type: "system",
      text: "VIPANCHI.SYS REPL v2026.09 (x86_64-telemetry-engine)\nType 'help' to inspect available system queries."
    }
  ]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output = portfolioData.terminalCommands[trimmed] || 
      `Command not found: '${trimmed}'. Type 'help' for available commands.`;

    setHistory((prev) => [
      ...prev,
      { type: "user", text: `$ ${cmdStr}` },
      { type: "response", text: output }
    ]);
    setInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
  };

  const quickCommands = ["help", "about", "skills", "projects", "experience", "honors", "contact", "clear"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl h-[600px] max-h-[85vh] rounded-2xl glass-panel border border-cyan-glow/40 flex flex-col overflow-hidden shadow-2xl font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-surface-950 border-b border-white/10 text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-2 font-semibold text-slate-200">vipanchi@terminal: ~ / interactive_query</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setHistory([])}
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Clear Terminal Output"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Action Chips */}
        <div className="px-4 py-2 bg-surface-900/90 border-b border-white/5 flex items-center space-x-2 overflow-x-auto text-[11px]">
          <span className="text-slate-500">Quick:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-0.5 rounded bg-surface-950 text-cyan-glow hover:bg-cyan-glow/20 border border-white/5 transition-all cursor-pointer whitespace-nowrap"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Body */}
        <div 
          className="flex-1 p-4 overflow-y-auto space-y-3 bg-obsidian/95 text-slate-300"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.type === "user" ? (
                <div className="text-cyan-glow font-bold">{item.text}</div>
              ) : item.type === "system" ? (
                <div className="text-slate-500 italic whitespace-pre-wrap">{item.text}</div>
              ) : (
                <div className="text-slate-200 whitespace-pre-wrap pl-2 border-l border-cyan-glow/30 py-0.5">
                  {item.text}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Bar */}
        <form 
          onSubmit={handleSubmit}
          className="flex items-center px-4 py-3 bg-surface-950 border-t border-white/10"
        >
          <span className="text-cyan-glow font-bold mr-2">›</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help' or any command..."
            className="flex-1 bg-transparent text-white focus:outline-none font-mono placeholder:text-slate-600 text-xs"
          />
          <button
            type="submit"
            className="px-3 py-1 rounded bg-cyan-glow/20 hover:bg-cyan-glow text-cyan-glow hover:text-obsidian font-bold text-xs transition-colors cursor-pointer"
          >
            Execute
          </button>
        </form>
      </div>
    </div>
  );
}
