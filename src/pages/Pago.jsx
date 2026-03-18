import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { CreditCard, User, Mail, FileText, Lock } from 'lucide-react';

import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { paymentSchema } from '../utils/validators';
import { submitPayment } from '../services/payuService';
import { completePurchase } from '../services/completeService';

import Modal from '../components/Modal';
import { ROUTES } from '../constants/routes';

const Pago = () => {
  const { user } = useAuthStore();
  const { total, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactionInfo, setTransactionInfo] = useState(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      documentType: 'DNI',
      documentNumber: '',
      cardNumber: '',
      expirationDate: '',
      cvv: ''
    }
  });

  const cardNum = watch('cardNumber') || '••••••••••••••••';
  const cardName = watch('fullName') || 'NOMBRE APELLIDO';
  const cardExp = watch('expirationDate') || 'MM/YY';

  const formatCardNumber = (num) => {
    const raw = num.replace(/\s/g, '');
    const groups = raw.match(/.{1,4}/g);
    return groups ? groups.join(' ') : num;
  };

  const onSubmit = async (data) => {
    setIsProcessing(true);
    setErrorMsg(null);
    try {
      const checkoutData = { ...data, total };
      const payuResponse = await submitPayment(checkoutData);
      console.log("👉 Respuesta íntegra de PayU Sandbox:", payuResponse);
      
      if (payuResponse.code === 'ERROR' || !payuResponse.transactionResponse) {
        throw new Error(payuResponse.error || 'La tarjeta fue rechazada o es inválida para este entorno de pruebas (Sandbox).');
      }

      const txResponse = payuResponse.transactionResponse;
      
      if (txResponse.state !== 'APPROVED') {
        const detail = txResponse.responseMessage || txResponse.responseCode || 'Transacción denegada por el banco.';
        throw new Error(`Detalle de PayU: ${detail}`);
      }
      
      const completeInfo = {
        email: data.email,
        fullName: data.fullName,
        dni: data.documentNumber,
        operationDate: txResponse.operationDate,
        transactionId: txResponse.transactionId
      };
      
      const confirmRes = await completePurchase(completeInfo);
      if (confirmRes.responseCode === "0") {
        setTransactionInfo(completeInfo);
        setShowSuccess(true);
      } else {
        throw new Error('No se pudo confirmar la compra en el sistema interno.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error de red o de servicio. Inténtelo más tarde.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    clearCart();
    navigate(ROUTES.HOME);
  };

  const formatOperationDate = (dateVal) => {
    if (!dateVal) return new Date().toLocaleString();
    const isTimestamp = !isNaN(dateVal) && dateVal.toString().length >= 10;
    const dateObj = new Date(isTimestamp ? Number(dateVal) : dateVal);
    return isNaN(dateObj.getTime()) ? new Date().toLocaleString() : dateObj.toLocaleString('es-PE');
  };

  const getInputClass = (fieldName) => {
    const isError = errors[fieldName];
    const base = "w-full bg-void border rounded-xl px-11 py-3.5 text-textPrimary placeholder-textMuted font-body text-[15px] focus:outline-none transition-all duration-300 focus:ring-4";
    const normal = "border-borderSubtle focus:border-brandRed focus:ring-brandRed/20";
    const error = "border-red-500 focus:border-red-500 focus:ring-red-500/20";
    return `${base} ${isError ? error : normal}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full fade-in-up">
      
      <div className="mb-10 flex flex-col items-center">
         <h1 className="font-display text-5xl text-textBright tracking-wider pt-2">
           CHECKOUT SEGURO
         </h1>
         <div className="h-1 bg-brandRed mt-4 rounded-full w-20 shadow-[0_0_8px_rgba(229,9,20,0.6)] animate-grow-line"></div>
      </div>

      {errorMsg && (
        <div className="mb-8 p-6 bg-red-950/40 border border-brandRed rounded-2xl flex items-center gap-4 animate-[fadeInUp_0.3s_ease]">
          <div className="bg-brandRed/20 p-2 rounded-full">
             <svg className="w-8 h-8 text-brandRed" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
          <span className="font-body text-red-200 tracking-wide leading-relaxed">{errorMsg}</span>
        </div>
      )}

      {/* Credit Card Preview Premium */}
      <div className="w-full max-w-[380px] h-[220px] rounded-2xl p-6 relative overflow-hidden bg-gradient-to-br from-surface via-void to-surface shadow-[0_20px_50px_rgba(229,9,20,0.08)] border border-borderSubtle mx-auto mb-12 group cursor-default">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 11px)' }}></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brandRed rounded-full opacity-10 blur-[50px]"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500 rounded-full opacity-5 blur-[40px]"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-12 h-9 rounded bg-gradient-to-br from-goldAccent/80 to-yellow-600/60 shadow-inner border border-yellow-300/30 flex items-center justify-center">
              <div className="w-8 h-5 border-[0.5px] border-yellow-900/20 rounded-[2px] grid grid-cols-2 gap-[1px]">
                 <div className="border-b-[0.5px] border-r-[0.5px] border-yellow-900/20"></div><div className="border-b-[0.5px] border-yellow-900/20"></div>
                 <div className="border-r-[0.5px] border-yellow-900/20"></div><div></div>
              </div>
            </div>
            <span className="font-display text-xl text-brandRed font-light opacity-80 uppercase">LA BUTACA</span>
          </div>
          
          <div className="font-body text-[22px] tracking-[4px] text-white font-medium drop-shadow-md">
            {formatCardNumber(cardNum)}
          </div>
          
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-body text-[9px] text-textMuted uppercase tracking-widest mb-1">Titular</span>
              <span className="font-display text-lg text-textPrimary tracking-wider uppercase truncate max-w-[200px]">{cardName}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-body text-[9px] text-textMuted uppercase tracking-widest mb-1">Vence</span>
              <span className="font-display text-lg text-textPrimary tracking-widest">{cardExp}</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        
        <div className="bg-surface/50 border border-borderSubtle rounded-3xl p-6 md:p-10 shadow-xl">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-borderSubtle/50">
            <User className="text-brandRed" size={24} />
            <h2 className="font-display text-2xl text-textBright tracking-widest uppercase mt-1">Datos Personales</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-body text-[11px] uppercase tracking-[2px] text-textSecondary mb-2">Nombre Completo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-textMuted">
                  <User size={18} />
                </div>
                <input type="text" {...register('fullName')} className={getInputClass('fullName')} placeholder="Ej. Juan Pérez" />
              </div>
              {errors.fullName && <p className="mt-2 text-xs text-red-500 font-body">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block font-body text-[11px] uppercase tracking-[2px] text-textSecondary mb-2">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-textMuted">
                  <Mail size={18} />
                </div>
                <input type="email" {...register('email')} className={getInputClass('email')} placeholder="correo@ejemplo.com" />
              </div>
              {errors.email && <p className="mt-2 text-xs text-red-500 font-body">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block font-body text-[11px] uppercase tracking-[2px] text-textSecondary mb-2">Tipo de Documento</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-textMuted">
                  <FileText size={18} />
                </div>
                <select {...register('documentType')} className={getInputClass('documentType').replace('px-11', 'pl-11 pr-4')}>
                  <option value="DNI">DNI</option>
                  <option value="CE">Carné de Extranjería</option>
                  <option value="PASSPORT">Pasaporte</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-body text-[11px] uppercase tracking-[2px] text-textSecondary mb-2">Número de Documento</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-textMuted">
                  <FileText size={18} />
                </div>
                <input type="text" {...register('documentNumber')} className={getInputClass('documentNumber')} placeholder="12345678" />
              </div>
              {errors.documentNumber && <p className="mt-2 text-xs text-red-500 font-body">{errors.documentNumber.message}</p>}
            </div>
          </div>
        </div>

        <div className="bg-surface/50 border border-borderSubtle rounded-3xl p-6 md:p-10 shadow-xl">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-borderSubtle/50">
            <CreditCard className="text-brandRed" size={24} />
            <h2 className="font-display text-2xl text-textBright tracking-widest uppercase mt-1">Datos de Tarjeta</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block font-body text-[11px] uppercase tracking-[2px] text-textSecondary mb-2">Número de Tarjeta</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-textMuted">
                  <CreditCard size={18} />
                </div>
                <input type="text" maxLength="16" {...register('cardNumber')} className={getInputClass('cardNumber')} placeholder="0000 0000 0000 0000" />
              </div>
              {errors.cardNumber && <p className="mt-2 text-xs text-red-500 font-body">{errors.cardNumber.message}</p>}
            </div>

            <div>
              <label className="block font-body text-[11px] uppercase tracking-[2px] text-textSecondary mb-2">Fecha de Expiración</label>
              <div className="relative">
                <input type="text" {...register('expirationDate')} className={getInputClass('expirationDate').replace('px-11', 'px-4')} placeholder="MM/YY" />
              </div>
              {errors.expirationDate && <p className="mt-2 text-xs text-red-500 font-body">{errors.expirationDate.message}</p>}
            </div>

            <div>
              <label className="block font-body text-[11px] uppercase tracking-[2px] text-textSecondary mb-2">CVV</label>
              <div className="relative">
                <input type="password" maxLength="4" {...register('cvv')} className={getInputClass('cvv').replace('px-11', 'px-4')} placeholder="123" />
              </div>
              {errors.cvv && <p className="mt-2 text-xs text-red-500 font-body">{errors.cvv.message}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-center sticky bottom-6 z-20">
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full max-w-sm relative overflow-hidden bg-brandRed text-white font-display text-2xl tracking-[2px] py-4 rounded-xl shadow-[0_10px_30px_rgba(229,9,20,0.4)] hover:shadow-[0_15px_40px_rgba(229,9,20,0.6)] transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 group flex items-center justify-center gap-3"
          >
            {isProcessing ? (
               <span className="flex items-center gap-3 font-body text-[15px] font-bold tracking-[2px]">
                 <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 PROCESANDO...
               </span>
            ) : (
               <>
                 <div className="absolute inset-0 btn-shimmer pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <Lock size={20} className="relative z-10 -mt-1" />
                 <span className="relative z-10">PAGAR S/ {total.toFixed(2)}</span>
               </>
            )}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {transactionInfo && (
        <Modal
          isOpen={showSuccess}
          title="¡COMPRA EXITOSA!"
          type="success"
          confirmText="VOLVER AL INICIO"
          onClose={handleSuccessClose}
          message={
            <div className="text-left bg-void p-5 rounded-xl border border-borderSubtle mt-2 font-mono text-sm space-y-3">
              <div className="flex flex-col">
                <span className="text-textMuted text-[10px] uppercase tracking-widest">Transacción</span>
                <span className="text-textPrimary">{transactionInfo.transactionId}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-textMuted text-[10px] uppercase tracking-widest">Fecha</span>
                <span className="text-textPrimary">{formatOperationDate(transactionInfo.operationDate)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-textMuted text-[10px] uppercase tracking-widest">Titular</span>
                <span className="text-textPrimary tracking-wide uppercase">{transactionInfo.fullName}</span>
              </div>
              <div className="flex flex-col border-t border-borderSubtle/50 pt-3 mt-1">
                <span className="text-textMuted text-[10px] uppercase tracking-widest">Total Pagado</span>
                <span className="text-brandRed text-lg font-bold">S/ {total.toFixed(2)}</span>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};

export default Pago;
