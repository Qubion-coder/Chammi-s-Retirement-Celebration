import React, { useState } from 'react';
import { Copy, Link, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PREFIXES = [
  'Mr.',
  'Mrs.',
  'Miss',
  'Mr. & Mrs.',
  'Family',
  'Dear'
];

export default function AdminPage() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const domain = window.location.origin;

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    const link = `${domain}/?guest=${encodeURIComponent(guestName.trim())}&prefix=${encodeURIComponent(prefix)}`;
    setGeneratedLink(link);
    setCopiedLink(false);
    setCopiedMessage(false);
  };

  const getFullMessage = () => {
    return `Dear ${prefix} ${guestName} ❤️

We are delighted to cordially invite you to join us in celebrating a very special milestone — Chammi's Retirement Celebration.

After many years of dedication, commitment, and wonderful memories, we warmly invite you to share this memorable occasion with us.

Please view the complete invitation and event details through the link below 🌐:

${generatedLink}

Your presence would truly mean a lot to us, and we would be delighted to celebrate this special day together with you.

With warmest wishes and love,
❤️ Chammi & Family`;
  };

  const copyToClipboard = async (text: string, isFullMessage: boolean) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isFullMessage) {
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 2000);
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans select-none selection:bg-theme-100 selection:text-theme-900 overflow-x-hidden p-6 md:p-12 items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-[0_20px_50px_-20px_rgba(217,4,41,0.15)] border border-theme-200/60 p-6 md:p-10">
        
        <div className="text-center mb-8">
          <h1 className="font-playball text-4xl md:text-5xl text-theme-900 mb-2">Invitation Generator</h1>
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-stone-500 font-bold">Chammi's Retirement</p>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-[150px_1fr] gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2">
                Prefix
              </label>
              <select
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full bg-theme-50/50 border border-theme-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-theme-400 transition-all font-montserrat"
              >
                {PREFIXES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2">
                Guest Name <span className="text-theme-600">*</span>
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Sanjaya"
                className="w-full bg-theme-50/50 border border-theme-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-theme-400 transition-all font-montserrat"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!guestName.trim()}
            className="w-full bg-gradient-to-r from-[#e63946] to-[#a41623] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:shadow-lg hover:shadow-theme-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Link className="w-4 h-4" />
            Generate Link
          </button>
        </div>

        <AnimatePresence>
          {generatedLink && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-10 border-t border-theme-200/60 pt-8 space-y-6"
            >
              <div className="bg-theme-50 rounded-xl p-4 border border-theme-200 break-all text-xs font-mono text-stone-600">
                {generatedLink}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => copyToClipboard(generatedLink, false)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-theme-300 text-theme-800 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-theme-50 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {copiedLink ? 'Copied Link!' : 'Copy Link Only'}
                </button>
                
                <button
                  onClick={() => copyToClipboard(getFullMessage(), true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-theme-600 text-white border-2 border-theme-600 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-theme-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {copiedMessage ? 'Copied Full!' : 'Copy Full Message'}
                </button>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm mt-6">
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-4">Message Preview</p>
                <div className="whitespace-pre-wrap font-montserrat text-sm text-stone-700 leading-relaxed">
                  {getFullMessage()}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
