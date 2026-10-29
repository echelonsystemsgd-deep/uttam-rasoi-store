'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-2xl shadow-xl border flex items-start justify-between gap-3 animate-slideInRight backdrop-blur-md transition-all ${
              toast.type === 'success'
                ? 'bg-white/95 border-emerald-300 text-charcoal-900'
                : toast.type === 'warning'
                ? 'bg-amber-50/95 border-amber-300 text-amber-900'
                : 'bg-cream-50/95 border-cream-300 text-charcoal-900'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : toast.type === 'warning' ? (
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              ) : (
                <Info className="w-5 h-5 text-terracotta-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <p className="text-xs font-bold leading-tight">{toast.title}</p>
                {toast.subtitle && (
                  <p className="text-[11px] text-charcoal-600 leading-tight">{toast.subtitle}</p>
                )}
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-charcoal-400 hover:text-charcoal-700 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
