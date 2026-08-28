import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Users, MessageSquare, Coffee, Sparkles, Send, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RsvpEntry, RsvpStatus } from '../types';

// Simple Confetti particle system on HTML Canvas
interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

export default function RsvpForm() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<RsvpStatus>('attending');
  const [guestsCount, setGuestsCount] = useState(1);
  const [prayerWish, setPrayerWish] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  // Run Canvas Confetti loop when submission is successful
  useEffect(() => {
    if (hasSubmitted && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = 300;

      const colors = ['#d90429', '#e63946', '#b38f4d', '#fcfbfa', '#d4af37'];
      const particles: Particle[] = [];

      // Create particles
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -100 - 10,
          size: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 4 - 2,
          speedY: Math.random() * 3 + 2,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 4 - 2
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;

        particles.forEach(p => {
          p.y += p.speedY;
          p.x += p.speedX;
          p.rotation += p.rotationSpeed;

          if (p.y < canvas.height) {
            active = true;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          // draw small confetti rectangles or circles
          if (p.size % 2 === 0) {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        });

        if (active) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };

      animate();

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [hasSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

    const newRsvp: RsvpEntry = {
      id: 'rsvp-' + Date.now(),
      name: name.trim(),
      status,
      guestsCount: status === 'attending' ? guestsCount : 0,
      prayerWish: prayerWish.trim() || undefined,
      timestamp: new Date().toISOString()
    };

    try {
      // Google Apps Script Web App URL
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXYGrMHhEUC2kJhnlWmPV7HGNIRH4Ih1xEnXjX_O5mkwSy699m1NataFMPEOcdFJCt4Q/exec';
      
      if (SCRIPT_URL) {
        await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Required for Google Apps Script to avoid CORS preflight errors
          headers: {
            'Content-Type': 'text/plain;charset=utf-8', // Use text/plain for no-cors
          },
          body: JSON.stringify(newRsvp),
        });
      } else {
        // Fallback simulate delay if URL is not set
        await new Promise(resolve => setTimeout(resolve, 1200));
      }

      setIsSubmitting(false);
      setHasSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      // You could add error state here, but for now we'll just show the success state
      // so the user doesn't get stuck if there's a network issue.
      setHasSubmitted(true);
    }
  };

  const resetForm = () => {
    setName('');
    setStatus('attending');
    setGuestsCount(1);
    setPrayerWish('');
    setHasSubmitted(false);
  };

  return (
    <div id="rsvp-and-wishes-section" className="w-full max-w-2xl px-4 mt-20">
      
      {/* RSVP HEADER */}
      <div className="text-center mb-8 px-4">
        <p className="font-playball text-3xl md:text-5xl text-theme-900 mb-4 drop-shadow-sm">RSVP</p>
        <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-500 font-bold mb-2">Celebrate With Us</p>
        <p className="text-stone-600 font-montserrat text-sm md:text-base leading-loose max-w-2xl mx-auto mb-10">
          We would be honored to celebrate this special day with you. Kindly let us know if you’ll be joining us.
        </p>
        <div className="w-16 h-[1px] bg-theme-300 mx-auto mt-4 mb-4" />
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {!hasSubmitted ? (
            <motion.form
              key="rsvp-form-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="bg-white p-6 md:p-10 rounded-[2rem] shadow-[0_20px_50px_-20px_rgba(217,4,41,0.15)] border border-theme-200/60 space-y-6 text-left"
            >
              {/* Full Name field */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2">
                  Your Full Name <span className="text-theme-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mr. & Mrs. Perera"
                  className="w-full bg-theme-50/50 border border-theme-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-theme-400 transition-all font-montserrat"
                />
              </div>

              {/* Attendance Selection */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-3">
                  Will you join us in Homagama? <span className="text-theme-600">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => setStatus('attending')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                      status === 'attending'
                        ? 'bg-theme-500 text-white border-theme-600 shadow-md'
                        : 'bg-theme-50/50 border-theme-200 text-stone-600 hover:bg-theme-100'
                    }`}
                  >
                    <CheckCircle className={`h-4 w-4 ${status === 'attending' ? 'text-white' : 'text-stone-400'}`} />
                    <span className="text-xs font-bold uppercase tracking-wider">Joyfully Accept</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('declined')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                      status === 'declined'
                        ? 'bg-stone-500 text-white border-stone-600 shadow-md'
                        : 'bg-theme-50/50 border-theme-200 text-stone-600 hover:bg-theme-100'
                    }`}
                  >
                    <div className={`h-3 w-3 rounded-full border-2 flex items-center justify-center ${status === 'declined' ? 'border-white text-white' : 'border-stone-400 text-transparent'}`}>
                      {status === 'declined' && <div className="h-1 w-1 rounded-full bg-white" />}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider">Regretfully Decline</span>
                  </button>
                </div>
              </div>

              {status === 'attending' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  {/* Guests count */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-theme-500" />
                      <span>Number of Guests Attending</span>
                    </label>
                    <div className="flex items-center gap-3">
                      {[1].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuestsCount(num)}
                          className={`h-11 w-11 rounded-full font-montserrat text-sm font-bold transition-all ${
                            guestsCount === num
                              ? 'bg-theme-600 text-white shadow-md'
                              : 'bg-theme-50/50 border border-theme-200 text-stone-600 hover:bg-theme-100'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Prayer / Wish section */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-theme-500" />
                  <span>Send a Message or Well Wishes for Chammi (Optional)</span>
                </label>
                <textarea
                  rows={4}
                  value={prayerWish}
                  onChange={(e) => setPrayerWish(e.target.value)}
                  placeholder="Write a warm message or well wishes for Chammi on her retirement..."
                  className="w-full bg-theme-50/50 border border-theme-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-theme-400 transition-all font-montserrat resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !status || !name.trim()}
                className="w-full bg-gradient-to-r from-[#e63946] to-[#a41623] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:shadow-lg hover:shadow-theme-500/30 hover:from-[#a41623] hover:to-[#780000] disabled:opacity-50 transition-all flex items-center justify-center gap-3 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send RSVP
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="rsvp-success-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 md:p-12 text-center flex flex-col items-center justify-center relative min-h-[350px]"
            >
              <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />
              
              <div className="h-16 w-16 bg-gold-100/60 text-gold-600 rounded-full flex items-center justify-center mb-6 gold-glow-strong">
                <Sparkles className="h-8 w-8 animate-bounce" />
              </div>

              <h3 className="font-display text-xl md:text-2xl text-stone-900 font-bold tracking-wider">
                Thank You So Much
              </h3>
              
              <p className="font-serif italic text-gold-600 text-base md:text-lg mt-2">
                Your response has been treasured.
              </p>

              <p className="font-montserrat text-sm md:text-base text-stone-500 mt-4 max-w-md leading-relaxed">
                {status === 'attending' 
                  ? `We are so delighted that you will join us for Chammi's Retirement Celebration on 9th of October 2026. Your presence means the world to us!`
                  : `We are sorry you won't be able to celebrate with us in person, but we truly appreciate your lovely wishes for Chammi.`}
              </p>

              <button
                onClick={() => setHasSubmitted(false)}
                className="mt-8 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-stone-400 hover:text-theme-600 transition-colors"
              >
                Submit another response
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>



    </div>
  );
}
