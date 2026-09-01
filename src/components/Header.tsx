import React from 'react';
import { Building2 } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-white/90 backdrop-blur-md border-b border-slate-100/90 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Mobile Campus Logo Badge */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-primary-600/20 lg:hidden shrink-0">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <div className="lg:hidden text-[10px] font-extrabold uppercase tracking-wider text-primary-600 leading-none mb-0.5">
            Campus Navigator
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">{title}</h1>
        </div>
      </div>
      
      {/* Live Campus Indicator badge */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200/60">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="hidden xs:inline">Campus Live</span>
      </div>
    </header>
  );
};
