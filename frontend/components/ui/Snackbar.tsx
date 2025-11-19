// src/components/ui/Snackbar.tsx
import React, { useEffect } from 'react';
import { Icon } from './Icon';

interface SnackbarProps {
  message: string;
  type: 'success' | 'error';
  isOpen: boolean;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => onClose(), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl text-white font-semibold ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}>
        <Icon name={type === 'success' ? 'CheckCircle' : 'XCircle'} className="w-6 h-6" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Snackbar;