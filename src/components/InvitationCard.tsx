import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { InviteImage } from './Decorations';

interface InvitationCardProps {
  onRsvpClick: () => void;
  guestFullName?: string | null;
}

function CountdownTimer() {
  const targetDate = new Date("October 09, 2026 13:30:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const stats = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center w-full max-w-4xl mx-auto mt-8 md:mt-16 z-20 px-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
          className="relative group"
        >
          <div className="relative w-[4.5rem] h-[6.5rem] sm:w-20 sm:h-28 md:w-32 md:h-44 bg-white rounded-t-full shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] border border-theme-100/60 flex flex-col items-center justify-center overflow-hidden transition-transform duration-700 group-hover:-translate-y-3">
            <div className="absolute top-0 right-0 opacity-[0.03] paper-grain w-full h-full pointer-events-none" />
            <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border-[0.5px] border-theme-300/50 rounded-t-full pointer-events-none" />

            <span className="text-2xl sm:text-3xl md:text-5xl font-playball text-theme-800 text-gold-shiny leading-none relative z-10 drop-shadow-sm mt-3 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110">
              {Math.max(0, stat.value).toString().padStart(2, '0')}
            </span>

            <div className="w-full flex justify-center mt-2 sm:mt-3 md:mt-6 mb-1 sm:mb-2 relative z-10">
              <span className="text-[8px] sm:text-[9px] md:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-stone-500 font-bold px-2 sm:px-3 py-1 sm:py-1.5 bg-stone-50 rounded-full border border-theme-100/50 shadow-sm whitespace-nowrap">
                {stat.label}
              </span>
            </div>

            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rotate-45 bg-theme-400" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function InvitationCard({ onRsvpClick, guestFullName }: InvitationCardProps) {
  return (
    <div id="invitation-details-container" className="flex flex-col items-center w-full relative z-10 w-full overflow-hidden">
      
      {/* Details Section */}
      <section className="cv-auto py-24 md:py-32 w-full flex flex-col items-center px-4 relative bg-[#fcfbfa]">
        <div className="section-floral-overlay absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-[clamp(200px,35vw,400px)]">
            <InviteImage src="/images/10.png" alt="" className="w-full h-auto object-contain drop-shadow-sm opacity-50" eager />
          </div>
          <div className="absolute bottom-0 right-0 w-[clamp(200px,35vw,400px)]">
            <InviteImage src="/images/10.png" alt="" className="w-full h-auto object-contain drop-shadow-sm opacity-50 rotate-180" />
          </div>
        </div>

        <div className="max-w-[1000px] w-full flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center mb-8 md:mb-16"
          >
            <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent to-theme-400 mb-6 md:mb-10" />
            
            {guestFullName && (
              <div className="mb-8 text-center flex flex-col items-center">
                <span className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-stone-400 font-bold mb-3">Specially Invited</span>
                <p className="font-playball text-4xl md:text-5xl text-theme-800 text-gold-shiny drop-shadow-sm mb-4">Dear {guestFullName}</p>
                <div className="w-24 h-[1px] bg-theme-300 mx-auto mt-2 mb-6" />
              </div>
            )}

            <p className="text-theme-700 text-[9px] md:text-[12px] tracking-[0.4em] md:tracking-[0.6em] uppercase font-bold text-center leading-loose">
              You are cordially invited to<br className="hidden md:block" /> celebrate the retirement of
            </p>
          </motion.div>

          <div className="relative w-full flex flex-col items-center justify-center gap-6 md:gap-10 my-12 md:my-20 z-10 px-2 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-white w-full max-w-[400px] p-6 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tl-[100px] rounded-br-[100px] md:rounded-tl-[130px] md:rounded-br-[130px] overflow-hidden group flex flex-col justify-center text-center items-center"
            >
              <div className="absolute inset-2 border border-theme-200/60 rounded-tl-[90px] rounded-br-[90px] md:rounded-tl-[120px] md:rounded-br-[120px] pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
              <div className="relative z-10 space-y-4 py-8 md:py-12 flex flex-col items-center">

                <h3 className="text-5xl md:text-7xl font-playball text-theme-800 text-gold-shiny group-hover:scale-110 transition-transform duration-700 pt-2 drop-shadow-sm">Chammika</h3>
                <p className="text-xs md:text-sm font-cinzel text-stone-600 tracking-wide leading-relaxed mt-4">After 36 Years of Dedicated Service</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-10 mt-4 md:mt-16 w-full"
          >
            <div className="w-1.5 h-1.5 rotate-45 bg-theme-300" />

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 text-center w-full max-w-5xl px-4">
              <div className="flex flex-col items-center flex-1">
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-bold mb-3">The Date</p>
                <p className="font-cinzel text-xl md:text-3xl text-theme-900 text-gold-shiny tracking-widest font-bold whitespace-nowrap">FRIDAY, 09TH OCTOBER</p>
                <p className="font-cinzel text-lg md:text-xl text-theme-600 tracking-[0.3em] font-normal mt-2">2026</p>
              </div>

              <div className="hidden md:flex flex-col items-center gap-3">
                <div className="w-px h-12 bg-theme-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                <div className="w-px h-12 bg-theme-200" />
              </div>

              <div className="md:hidden flex flex-row items-center gap-3">
                <div className="h-px w-10 bg-theme-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                <div className="h-px w-10 bg-theme-200" />
              </div>

              <div className="flex flex-col items-center flex-1">
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-bold mb-3">The Time</p>
                <p className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">01:30 PM</p>
                <p className="font-cinzel text-xs md:text-sm text-theme-600 tracking-[0.2em] mt-3 uppercase">To 04:00 PM</p>
              </div>

              <div className="hidden md:flex flex-col items-center gap-3">
                <div className="w-px h-12 bg-theme-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                <div className="w-px h-12 bg-theme-200" />
              </div>

              <div className="md:hidden flex flex-row items-center gap-3">
                <div className="h-px w-10 bg-theme-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                <div className="h-px w-10 bg-theme-200" />
              </div>

              <div className="flex flex-col items-center flex-1">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-bold mb-3">The Venue</p>
                <p className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">SKY LOUNGE</p>
                <p className="font-cinzel text-[10px] md:text-xs text-theme-600 tracking-[0.15em] md:tracking-[0.2em] mt-3 uppercase max-w-[180px] md:max-w-none leading-relaxed">Hotel Green Court<br/>Homagama</p>
              </div>
            </div>

            <div className="pt-8 w-full px-4 flex flex-col items-center gap-8">
              <div className="relative inline-flex items-center justify-center w-full max-w-md mx-auto group">
                <div className="absolute inset-0 bg-theme-100 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <p className="relative text-theme-800 bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] text-[9px] md:text-[11px] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase px-6 lg:px-10 py-4 lg:py-5 rounded-full border border-theme-200 flex items-center justify-center gap-4 w-full md:w-auto">
                  <span className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                  <span className="whitespace-nowrap">OFFICIALLY RETIRED</span>
                  <span className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                </p>
              </div>

              <div className="text-center px-4 max-w-2xl mx-auto">
                <p className="font-playball text-2xl md:text-3xl text-theme-800 mb-3 opacity-90 leading-relaxed">
                  “When you think you're at the end of something, you're at the beginning of something else.”
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="cv-auto py-24 md:py-36 bg-[#f0eceb] w-full relative border-y border-theme-100/30 flex flex-col items-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-theme-100 blur-[120px] rounded-full opacity-30 pointer-events-none" />

        <div className="w-full max-w-[1000px] px-4 flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full flex flex-col items-center"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[12vw] md:text-[140px] text-theme-100/50 whitespace-nowrap pointer-events-none z-0 select-none">
              Celebrate
            </div>

            <div className="flex items-center gap-4 md:gap-8 justify-center relative z-10 w-full mb-6 mt-4 opacity-70">
              <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-theme-400" />
              <div className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
              <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-theme-400" />
            </div>

            <h2 className="font-cinzel text-3xl md:text-5xl text-theme-900 text-gold-shiny mb-8 relative z-10 tracking-widest font-bold drop-shadow-sm px-4 leading-[1.4]">
              Wait for the <span className="font-playball text-theme-500 italic lowercase tracking-normal text-4xl md:text-7xl ml-2">party</span>
            </h2>

            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-theme-600 font-bold bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full border border-theme-200/50 inline-flex items-center gap-3 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] relative z-10">
              <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
              Counting Down
              <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
            </p>
          </motion.div>

          <CountdownTimer />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 md:mt-16 relative z-20"
          >
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Chammi's+Retirement+Celebration&dates=20261009T080000Z/20261009T103000Z&details=Join+us+to+celebrate+Chammi's+retirement+in+style.+The+Sky+Lounge+offers+a+beautiful+view+to+commemorate+36+years+of+dedicated+service.&location=Hotel+Green+Court,+Homagama,+Sri+Lanka"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-theme-500 to-theme-700 text-white px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
              Save the Date
            </a>
          </motion.div>
        </div>
      </section>

      {/* Venue Location Section */}
      <section id="venue-section" className="cv-auto py-24 md:py-36 bg-[#fcfbfa] w-full relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 paper-grain pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-200 blur-[150px] rounded-full opacity-20 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 flex flex-col items-start"
            >
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-4 mb-1">
                  <div className="w-8 h-px bg-theme-400" />
                  <span className="text-theme-600 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[11px]">The Venue</span>
                </div>
                <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[4rem] text-theme-900 leading-[1] drop-shadow-sm ml-[-4px]">
                  Sky Lounge
                </h2>
                <p className="text-xs md:text-sm text-theme-600 font-bold uppercase tracking-[0.25em]">
                  Hotel Green Court
                </p>
              </div>

              <div className="space-y-6 pt-4 relative">
                <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-theme-300 to-transparent" />

                <div className="pl-8 space-y-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-theme-100 absolute -left-5 top-0">
                    <MapPin className="w-4 h-4 text-theme-500" />
                  </div>
                  <p className="text-lg md:text-xl text-stone-700 font-cinzel font-medium leading-relaxed tracking-wide">
                    Homagama,<br /> Sri Lanka.
                  </p>
                </div>

                <div className="pl-8 space-y-4 pt-4 text-stone-500 text-sm md:text-base tracking-wide font-light leading-relaxed">
                  Join with us to celebrate Chammi's Retirement in style! The Sky Lounge is the perfect, intimate venue to honor 36 years of dedicated service.
                </div>
              </div>

              <div className="pt-8 w-full md:w-auto">
                <button
                  onClick={() => window.open('https://maps.app.goo.gl/o35Cv8EeSUsVeyVH6', '_blank')}
                  className="w-full md:w-auto flex items-center justify-center gap-4 bg-gradient-to-r from-[#e63946] to-[#a41623] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:from-[#a41623] hover:to-[#780000] hover:shadow-xl hover:shadow-theme-500/30 transition-all duration-300 group"
                >
                  <MapPin className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                  Live Location
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => window.open('https://maps.app.goo.gl/o35Cv8EeSUsVeyVH6', '_blank')}
              className="relative w-full max-w-[450px] mx-auto aspect-[4/5] md:aspect-[3/4] rounded-t-full rounded-b-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[12px] border-white bg-theme-100 overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 border border-theme-200 rounded-t-full rounded-b-[1.5rem] pointer-events-none z-10" />
              <div className="absolute inset-0 z-20" />

              <div className="absolute inset-0 w-full h-full scale-[1.2] group-hover:scale-[1.15] transition-transform duration-[2s]">
                <iframe
                  src="https://maps.google.com/maps?q=Hotel%20Green%20Court%20Homagama&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent h-32 pointer-events-none z-10 flex items-end justify-center pb-6">
                <p className="text-[8px] uppercase tracking-widest text-stone-500 font-bold bg-white/90 px-5 py-2 rounded-full shadow-sm backdrop-blur-md inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-theme-400 animate-pulse" />
                  View on Map
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
