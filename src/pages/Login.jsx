import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { loginSchema } from '../utils/validators';
import { ROUTES } from '../constants/routes';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, loginAsGuest } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || ROUTES.DULCERIA;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simular llamada API
    await new Promise(resolve => setTimeout(resolve, 800));
    const token = `fake-jwt-token-${Date.now()}`;
    login(data, token);
    setIsSubmitting(false);
    navigate(from, { replace: true });
  };

  const handleGuest = () => {
    loginAsGuest();
    navigate(from, { replace: true });
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 lg:py-24 relative overflow-hidden w-full fade-in-up">
      {/* Glow de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brandRed/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="w-full max-w-md bg-surface/80 backdrop-blur-xl border border-borderSubtle p-8 md:p-10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        <div className="flex flex-col items-center mb-10">
          <img src="/logo.svg" alt="La Butaca" className="w-14 h-14 mb-4 drop-shadow-[0_0_15px_rgba(229,9,20,0.5)]" />
          <h2 className="font-display text-5xl text-textBright tracking-widest leading-none">BIENVENIDO</h2>
          <p className="font-body text-textSecondary text-[15px] mt-2 tracking-wide font-light">Ingresa para vivir la experiencia</p>
          <div className="h-1 bg-brandRed mt-5 rounded-full w-12 shadow-[0_0_8px_rgba(229,9,20,0.6)]"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block font-body text-[12px] uppercase tracking-[1.5px] text-textSecondary mb-2">Correo Electrónico</label>
            <input
              type="email"
              {...register('email')}
              className={`w-full bg-void border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-borderSubtle focus:border-brandRed focus:ring-brandRed/20'} rounded-xl px-4 py-3.5 text-textPrimary placeholder-textMuted font-body text-[15px] focus:outline-none focus:ring-4 transition-all duration-300`}
              placeholder="tu@correo.com"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500 font-body animate-[fadeInUp_0.3s_ease]">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block font-body text-[12px] uppercase tracking-[1.5px] text-textSecondary mb-2">Nombre Completo</label>
            <input
              type="text"
              {...register('fullName')}
              className={`w-full bg-void border ${errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-borderSubtle focus:border-brandRed focus:ring-brandRed/20'} rounded-xl px-4 py-3.5 text-textPrimary placeholder-textMuted font-body text-[15px] focus:outline-none focus:ring-4 transition-all duration-300`}
              placeholder="Ej. Juan Pérez"
            />
            {errors.fullName && (
              <p className="mt-2 text-sm text-red-500 font-body animate-[fadeInUp_0.3s_ease]">{errors.fullName.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative overflow-hidden bg-brandRed text-textBright font-body font-bold text-[14px] uppercase tracking-[2px] py-4 rounded-xl shadow-[0_0_20px_rgba(229,9,20,0.3)] hover:shadow-[0_0_30px_rgba(229,9,20,0.5)] transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 mt-4 group"
          >
            {isSubmitting ? (
               <span className="flex items-center justify-center gap-2">
                 <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 CARGANDO...
               </span>
            ) : (
               <>
                 <div className="absolute inset-0 btn-shimmer pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <span className="relative z-10">INGRESAR AHORA</span>
               </>
            )}
          </button>
        </form>

        <div className="mt-10 flex items-center">
          <div className="flex-1 bg-borderSubtle h-[1px]"></div>
          <span className="px-4 font-body text-xs uppercase tracking-widest text-textMuted">O OPCIONALMENTE</span>
          <div className="flex-1 bg-borderSubtle h-[1px]"></div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleGuest}
            className="group relative font-body text-[13px] uppercase tracking-[1px] text-textSecondary transition-colors duration-300 hover:text-white"
          >
            Continuar como invitado
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-brandRed transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
