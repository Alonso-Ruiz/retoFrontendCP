import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose, title, message, type = 'success', confirmText = 'ACEPTAR' }) => {
  const [render, setRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setRender(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setRender(false);
  };

  if (!render) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[rgba(0,0,0,0.85)] backdrop-blur-[8px] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onTransitionEnd={handleAnimationEnd}
    >
      <div 
        className={`bg-surface border border-borderRed rounded-[20px] p-8 md:p-10 max-w-[420px] w-full shadow-[0_0_60px_rgba(229,9,20,0.15)] flex flex-col items-center text-center transform transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4'}`}
        role="dialog"
      >
        {type === 'success' ? (
          <div className="mb-6 relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-brandRed/10 rounded-full animate-ping"></div>
            <div className="relative z-10 w-20 h-20 rounded-full bg-surface border-2 border-brandRed flex items-center justify-center shadow-[0_0_20px_rgba(229,9,20,0.4)]">
              <svg className="w-10 h-10 text-brandRed" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" className="draw-check" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="mb-6 relative w-20 h-20 flex items-center justify-center text-brandRed">
            <svg className="w-16 h-16 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        )}
        
        <h2 className="font-display text-[32px] tracking-[2px] text-textBright mb-3">{title}</h2>
        
        <div className="font-body text-[15px] prose prose-invert text-textSecondary mb-8 w-full font-light leading-[1.6]">
          {message}
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-brandRed hover:bg-brandRedGlow text-white font-body font-bold uppercase tracking-[2px] text-[14px] py-4 px-6 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(229,9,20,0.4)] hover:-translate-y-1 focus:ring-4 focus:ring-brandRed/50 outline-none"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
