import React from 'react';
import { Plus, Minus, RotateCcw, Layers, Compass } from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onToggleLayer?: () => void;
  is3dView?: boolean;
  onToggle3D?: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onToggleLayer,
  is3dView = false,
  onToggle3D,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Layer Toggle (if supported) */}
      {onToggleLayer && (
        <button
          onClick={onToggleLayer}
          title="Toggle Layer Details"
          className="w-10 h-10 rounded-xl bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-soft border border-slate-100 transition-all hover:scale-105 active:scale-95"
        >
          <Layers className="w-5 h-5 text-slate-600" />
        </button>
      )}

      {/* Zoom controls */}
      <div className="bg-white rounded-xl shadow-soft border border-slate-100 p-1 flex flex-col items-center">
        <button
          onClick={onZoomIn}
          title="Zoom In"
          className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
        <div className="w-6 h-px bg-slate-100 my-0.5"></div>
        <button
          onClick={onZoomOut}
          title="Zoom Out"
          className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        title="Reset Map View"
        className="w-10 h-10 rounded-xl bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-soft border border-slate-100 transition-all hover:scale-105 active:scale-95"
      >
        <RotateCcw className="w-4 h-4 text-slate-600" />
      </button>
    </div>
  );
};
