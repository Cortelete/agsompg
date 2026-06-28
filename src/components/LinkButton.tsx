import React from 'react';
import { motion } from 'motion/react';

interface LinkButtonProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick: () => void;
  disabled?: boolean;
}

export function LinkButton({ icon, title, subtitle, onClick, disabled }: LinkButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02, boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.2)' }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={disabled ? undefined : onClick}
      className={`relative w-full flex items-center p-3 sm:p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden group transition-colors ${
        disabled ? 'opacity-70 cursor-not-allowed' : 'hover:bg-white/15'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 group-hover:animate-[pulse_2s_ease-in-out_infinite] transition-opacity pointer-events-none" />
      
      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 rounded-full text-white">
        {icon}
      </div>
      
      <div className="flex-1 flex flex-col justify-center text-center pr-10 sm:pr-12">
        <span className="text-sm sm:text-base font-semibold text-white tracking-wide">
          {title}
        </span>
        {subtitle && (
          <span className="text-xs sm:text-sm text-white/70 font-light mt-0.5">
            {subtitle}
          </span>
        )}
      </div>
    </motion.button>
  );
}
