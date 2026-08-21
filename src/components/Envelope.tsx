import React from 'react';
import { motion } from 'motion/react';

interface EnvelopeProps {
  onOpen: () => void;
  guestFullName?: string | null;
}

export default function Envelope({ onOpen, guestFullName }: EnvelopeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 1.1,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
      className="flex flex-col items-center justify-center p-6 relative z-10 w-full min-h-screen"
    >
      {/* Title Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 mt-auto md:mt-0">
        {guestFullName && (
          <div className="mb-6">
            <p className="text-theme-500 text-[9px] md:text-xs tracking-[0.4em] uppercase font-bold mb-2">Specially Invited</p>
            <h2 className="font-playball text-2xl md:text-4xl text-amber-600 drop-shadow-sm px-4">Dear {guestFullName}</h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4"></div>
          </div>
        )}
        <span className="inline-block px-5 py-2 rounded-full bg-amber-50 border border-amber-200 text-[10px] uppercase tracking-[0.5em] text-amber-600 font-bold mb-6 mt-2 shadow-sm">
          You're Invited
        </span>
        <h1 className="font-cinzel text-4xl md:text-5xl text-theme-800 text-gold-shiny mb-4 tracking-tight">
          Chammi's Retirement
        </h1>
        <p className="text-stone-500 text-sm tracking-[0.2em] font-light">OCTOBER 09, 2026</p>
      </motion.div>

      {/* Gatefold Envelope */}
      <div
        className="relative w-full max-w-[430px] aspect-[1/1.42] flex items-center justify-center group cursor-pointer perspective-1000 mb-auto md:mb-0"
        onClick={onOpen}
      >
        {/* Envelope Image Replacement */}
        <div className="absolute -inset-8 bg-[radial-gradient(circle,_rgba(245,158,11,0.25)_0%,_rgba(245,158,11,0.15)_45%,_transparent_75%)] blur-3xl opacity-90 z-0 pointer-events-none" />
        
        <motion.img
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          src="/images/i.png"
          alt="Invitation Envelope"
          loading="eager"
          className="w-full h-full object-cover rounded-[1.4rem] shadow-[0_28px_80px_-20px_rgba(245,158,11,0.4)] relative z-20"
        />

        {/* The Wax Seal Button */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: -6 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#fdf0c3] via-[#e0c086] to-[#c49a45] shadow-[0_20px_45px_-10px_rgba(224,192,134,0.5)] border-[3px] md:border-[4px] border-[#b48532] flex items-center justify-center pointer-events-auto"
        >
          <div className="absolute inset-1 md:inset-1.5 rounded-full border border-[#ffffff]/60 shadow-inner" />
          <div className="text-center relative z-10 flex flex-col items-center">
            <p className="font-playball text-4xl md:text-5xl font-bold text-theme-900 leading-none drop-shadow-sm pt-2">C</p>
            <div className="h-px w-8 md:w-12 bg-theme-900/40 mx-auto my-1 md:my-1.5" />
            <p className="text-[6px] md:text-[8px] uppercase tracking-[0.35em] font-bold text-theme-900/90">Open</p>
          </div>
        </motion.div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 text-[8px] uppercase tracking-[0.45em] text-amber-600/90 font-bold bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-amber-200/80 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Tap To Open
        </div>
      </div>
    </motion.div>
  );
}
