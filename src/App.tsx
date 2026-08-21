import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, Award, Sparkles, Heart } from 'lucide-react';
import Envelope from './components/Envelope';
import InvitationCard from './components/InvitationCard';
import RsvpForm from './components/RsvpForm';
import AudioPlayer from './components/AudioPlayer';
import { MandalaFrame, FloatingPetals } from './components/Decorations';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);

  // Parse guest personalization from URL
  const searchParams = new URLSearchParams(window.location.search);
  const guestParam = searchParams.get('guest');
  const prefixParam = searchParams.get('prefix');
  const guestFullName = guestParam && prefixParam ? `${prefixParam} ${guestParam}` : guestParam || null;

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setAutoPlayAudio(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans select-none selection:bg-gold-100 selection:text-gold-900 overflow-x-hidden">
      <MandalaFrame minimal={false} />
      <FloatingPetals disabled={false} />

      {/* Background Audio Player (synthesized client-side) */}
      <AudioPlayer autoPlayTrigger={autoPlayAudio} />

      <AnimatePresence mode="wait">
        {!isEnvelopeOpen ? (
          <motion.div
            key="envelope-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-50"
          >
            <Envelope onOpen={handleOpenEnvelope} guestFullName={guestFullName} />
          </motion.div>
        ) : (
          <motion.div
            key="invitation-screen"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-full flex flex-col items-center"
          >
            {/* STUNNING FLOATING NAVIGATION HEADER */}
            <header className="sticky top-0 w-full bg-cream/80 backdrop-blur-md border-b border-gold-200/20 py-4 px-6 z-40 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="font-display text-xs tracking-widest text-gold-600 font-bold">C.R.C</span>
              </div>

              <nav className="flex items-center gap-6 font-display text-[10px] md:text-xs uppercase tracking-widest font-semibold text-stone-500">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-gold-600 transition-colors"
                >
                  Invitation
                </button>
                <button
                  onClick={() => scrollToSection('rsvp-and-wishes-section')}
                  className="hover:text-gold-600 transition-colors"
                >
                  RSVP
                </button>
              </nav>

              <button
                onClick={() => scrollToSection('rsvp-and-wishes-section')}
                className="rounded-full bg-gold-gradient hover:opacity-90 text-white font-sans text-[10px] uppercase tracking-wider px-4 py-1.5 font-bold shadow-sm cursor-pointer transition-opacity"
              >
                RSVP Now
              </button>
            </header>

            {/* MAIN COVER HERO OVERVIEW BANNER */}
            <section 
              className="min-h-[100dvh] w-full flex items-center justify-center p-4 md:p-12 relative overflow-hidden"
              style={{ backgroundImage: 'url(/images/ttt.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.03, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-cinzel text-[40vw] text-theme-900 pointer-events-none whitespace-nowrap leading-none select-none z-0 hidden md:block"
              >
                C
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                className="relative z-10 w-full max-w-[600px] min-h-[500px] flex flex-col items-center justify-center p-6"
              >

                <div className="flex flex-col items-center text-center space-y-4 flex-1 w-full relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-12 md:mt-0"
                  >
                    <span className="block text-[12px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-theme-700 font-bold mb-2">
                      Please join us
                    </span>
                  </motion.div>

                  <div className="space-y-0 py-4 flex-1 flex flex-col justify-center items-center">
                    <motion.h2
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.8 }}
                      className="font-sinhala text-2xl md:text-3xl text-theme-800 mb-2 font-bold"
                    >
                      විශ්‍රාම සැමරුම
                    </motion.h2>
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="font-playball text-[3rem] sm:text-[3.5rem] md:text-[5rem] text-theme-800 leading-[1.1] drop-shadow-sm"
                    >Chammi's</motion.h1>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="font-serif text-3xl md:text-5xl text-amber-500 italic font-light my-2 md:my-4"
                    >
                      Retirement
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="mt-8 md:mt-auto pb-4 w-full flex flex-col items-center"
                  >
                    <div className="flex items-center justify-center gap-4 mb-6 opacity-70 w-full px-8 hidden md:flex">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-300 to-theme-400" />
                      <div className="w-1.5 h-1.5 rotate-45 bg-amber-500 shrink-0" />
                      <div className="h-px w-full bg-gradient-to-l from-transparent via-amber-300 to-theme-400" />
                    </div>
                    <div className="font-cinzel space-y-2">
                      <p className="text-lg md:text-base text-stone-700 tracking-[0.2em] md:tracking-[0.3em] font-bold">09 OCTOBER 2026</p>
                      <p className="text-[11px] md:text-[9px] text-theme-600 tracking-[0.2em] uppercase font-bold">Homagama, Sri Lanka</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </section>

            {/* INVITATION CONTENT MODULES */}
            <main className="w-full max-w-4xl px-4 py-12 flex flex-col items-center gap-16">

              {/* Detailed Invitation Card */}
              <InvitationCard onRsvpClick={() => scrollToSection('rsvp-and-wishes-section')} guestFullName={guestFullName} />

              {/* Rsvp Form segment */}
              <RsvpForm />

            </main>

            {/* TRADITIONAL SACRAMENTAL FOOTER */}
            <footer className="w-full bg-[#181615] text-[#eadbba] py-16 px-6 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

              <div className="max-w-md mx-auto space-y-6">
                {/* Traditional heart icon */}
                <div className="text-gold-500 flex justify-center">
                  <Heart className="w-6 h-6 opacity-60" />
                </div>

                <h3 className="font-serif text-xl italic text-gold-200">
                  “Wishing you a wonderful retirement filled with joy and happiness.”
                </h3>

                <p className="font-sans text-xs text-stone-500 leading-relaxed max-w-sm mx-auto">
                  Thank you for joining us to celebrate Chammi's dedicated service and wishing her well in her new journey.
                </p>

                <div className="pt-4 border-t border-stone-800/80 max-w-sm mx-auto flex flex-col items-center gap-4">
                  <p className="font-display text-[9px] uppercase tracking-[0.2em] text-stone-500">
                    Chammi's Retirement Celebration • 2026
                  </p>
                  
                  <p className="text-[#D4AF37] text-xs font-sans tracking-wider">
                    Want a beautiful invitation like this? Create yours with <a target="_blank" rel="noreferrer" className="text-white hover:text-[#D4AF37] underline transition-colors duration-300 font-semibold" href="https://wa.me/94707819074">invitemint</a>
                  </p>
                </div>
              </div>

              {/* Back to Top Quick Button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-10 mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-stone-800 bg-stone-900 text-gold-400 hover:text-gold-200 transition-all shadow-md active:scale-95 cursor-pointer"
                title="Scroll to Top"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

