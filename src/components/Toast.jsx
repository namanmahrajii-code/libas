import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, X } from 'lucide-react';

const Toast = () => {
  const { toastMessage, showToast } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-ink text-white px-5 py-3.5 rounded-none shadow-2xl border border-neutral-800 flex items-center gap-3 text-xs tracking-wider uppercase font-medium">
        <span className="w-2 h-2 rounded-full bg-crimson animate-ping" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};

export default Toast;
