import React from 'react';
import { LayoutDashboard, Navigation, Layers, Map as MapIcon } from 'lucide-react';
import { ActiveTab } from './Sidebar';

interface MobileNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'navigate' as ActiveTab, label: 'Navigate', icon: Navigation },
    { id: 'explore' as ActiveTab, label: 'Floors', icon: Layers },
    { id: 'map' as ActiveTab, label: 'Campus Map', icon: MapIcon },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-1.5 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all duration-200 min-h-[48px] active:scale-95 ${
              isActive
                ? 'text-primary-600 font-bold bg-primary-50/80'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-2'}`} />
            <span className={`text-[11px] mt-0.5 tracking-tight ${isActive ? 'font-bold text-primary-700' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
