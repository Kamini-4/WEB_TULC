
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';

interface CalibrationSchedulerProps {
  onClose: () => void;
  leadData: {
    name: string;
    email: string;
    organization: string;
    linkedin?: string;
  };
}

const CalibrationScheduler: React.FC<CalibrationSchedulerProps> = ({ onClose, leadData }) => {
  const [step, setStep] = useState<'selection' | 'confirmation'>('selection');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available days: Monday, Thursday, Friday, Saturday, Sunday
  // Timing: 9 am - 2 pm
  const availableDays = [1, 4, 5, 6, 0]; // Monday=1, Thursday=4, Friday=5, Saturday=6, Sunday=0
  const timeSlots = [
    "09:00 AM", "09:45 AM", "10:30 AM", "11:15 AM", "12:00 PM", "12:45 PM", "01:30 PM"
  ];

  const getNextAvailableDates = () => {
    const dates = [];
    const current = new Date();
    current.setDate(current.getDate() + 2); // Minimum 48h buffer

    while (dates.length < 5) {
      if (availableDays.includes(current.getDay())) {
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const dates = getNextAvailableDates();

  const handleRequest = async () => {
    setIsSubmitting(true);
    
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: leadData.name,
            from_email: leadData.email,
            organization: leadData.organization,
            selected_date: selectedDate,
            selected_time: selectedTime,
            type: 'CALIBRATION_REQUEST',
            to_email: 'suchita135sancheti@gmail.com',
          },
          publicKey
        );
      }
      setStep('confirmation');
    } catch (error) {
      console.error("Scheduling Request Failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl overflow-hidden shadow-2xl border border-[#b8860b]/20"
      >
        <div className="p-8 sm:p-12">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.3em] mb-2">Institutional Protocol</h2>
              <h3 className="text-3xl font-bold text-[#111111]">Request <span className="italic">Structural Alignment.</span></h3>
            </div>
            <button onClick={onClose} className="text-zinc-400 hover:text-[#111111] transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 'selection' ? (
              <motion.div 
                key="selection"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="bg-zinc-50 p-6 border border-zinc-100 italic text-zinc-600 text-sm leading-relaxed">
                  "Calibration sessions are reserved for Principals who have completed the Structural Audit. This is not a sales briefing, but a high-fidelity diagnostic review of your institutional substrate."
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-[9px] uppercase text-[#b8860b] font-black tracking-widest block mb-4">Select Diagnostic Window</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {dates.map((date) => (
                        <button
                          key={date.toISOString()}
                          onClick={() => setSelectedDate(date.toDateString())}
                          className={`p-4 text-left border transition-all ${
                            selectedDate === date.toDateString() 
                            ? 'border-[#b8860b] bg-[#b8860b]/5' 
                            : 'border-zinc-200 hover:border-[#b8860b]/50'
                          }`}
                        >
                          <div className="text-[10px] font-bold uppercase text-zinc-400 mb-1">
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div className="text-sm font-bold text-[#111111]">
                            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedDate && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <label className="text-[9px] uppercase text-[#b8860b] font-black tracking-widest block mb-4">Select Time (9 AM - 2 PM)</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 text-xs font-bold transition-all border ${
                              selectedTime === time 
                              ? 'bg-[#111111] text-white border-[#111111]' 
                              : 'text-zinc-500 border-zinc-200 hover:border-zinc-400'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    disabled={!selectedDate || !selectedTime || isSubmitting}
                    onClick={handleRequest}
                    className="w-full py-5 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Processing Request...
                      </>
                    ) : (
                      'Request Institutional Alignment'
                    )}
                  </button>
                  <p className="text-center text-[9px] text-zinc-400 uppercase mt-4 tracking-widest">
                    Your request will be reviewed by the Principal Architect.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="confirmation"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-[#b8860b] rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-3xl font-bold mb-4 text-[#111111]">Alignment Requested.</h4>
                <p className="text-zinc-500 text-lg font-light italic leading-relaxed max-w-md mx-auto mb-10">
                  The Principal Architect has been notified of your request for {selectedDate} at {selectedTime}. You will receive a secure confirmation once the window is approved.
                </p>
                <button 
                  onClick={onClose}
                  className="text-[11px] font-black uppercase text-[#b8860b] tracking-widest hover:text-[#111111] transition-colors"
                >
                  Return to Terminal
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default CalibrationScheduler;
