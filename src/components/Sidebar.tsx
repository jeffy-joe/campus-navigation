import React from 'react';
import { 
  LayoutDashboard, 
  Navigation, 
  Layers, 
  Map as MapIcon, 
  Building2,
  Search
} from 'lucide-react';

export type ActiveTab = 'dashboard' | 'navigate' | 'explore' | 'map';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    {
      id: 'dashboard' as ActiveTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'navigate' as ActiveTab,
      label: 'Navigate',
      icon: Navigation,
    },
    {
      id: 'explore' as ActiveTab,
      label: 'Explore Floors',
      icon: Layers,
    },
    {
      id: 'map' as ActiveTab,
      label: 'Campus Map',
      icon: MapIcon,
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 h-screen sticky top-0 shrink-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-600 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-primary-600/25">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight uppercase">
              Campus<br /><span className="text-primary-600">Navigator</span>
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">Find your way, every day.</p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="px-4 py-2 flex-1 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 text-left ${
                isActive
                  ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'text-primary-600 scale-110' : 'text-slate-400'
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

    </aside>
  );
};
