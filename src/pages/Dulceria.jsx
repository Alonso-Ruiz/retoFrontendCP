import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCandyStoreItems } from '../services/candystoreService';
import { useCartStore } from '../store/cartStore';
import SkeletonCard from '../components/SkeletonCard';
import ProductCard from '../components/ProductCard';
import { ROUTES } from '../constants/routes';

const Dulceria = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { items, total } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const data = await getCandyStoreItems();
        setProducts(data);
      } catch (err) {
        setError('Ocurrió un error al cargar la dulcería.');
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, []);

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h2 className="font-display text-2xl text-brandRed mb-4">Error</h2>
        <p className="font-body text-textSecondary">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-8 py-3 bg-brandRed text-white rounded font-body font-bold hover:bg-brandRedGlow">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col lg:flex-row gap-10">
      
      {/* Product Grid Area */}
      <div className="flex-1 fade-in-up">
        <div className="mb-10 flex flex-col">
          <div className="flex items-center gap-4">
             <img src="/logo.svg" alt="Icono" className="w-[32px] h-[32px]" />
             <h1 className="font-display text-5xl text-textBright tracking-wider pt-2">
               DULCERÍA
             </h1>
          </div>
          <p className="font-body text-textSecondary mt-2 tracking-wide font-light">Completa tu experiencia cinematográfica.</p>
          <div className="h-1 bg-brandRed mt-4 rounded-full w-0 animate-grow-line shadow-[0_0_8px_rgba(229,9,20,0.6)]"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 9 }).map((_, idx) => (
                <div key={idx} style={{ animationDelay: `${idx * 0.1}s` }} className="fade-in-up">
                  <SkeletonCard />
                </div>
              ))
            : products.map((product, idx) => (
                <div key={product.id} style={{ animationDelay: `${(idx % 6) * 0.1}s` }}>
                  <ProductCard product={product} />
                </div>
              ))
          }
        </div>
      </div>

      {/* Cart Sidebar Area */}
      <div className="w-full lg:w-[400px] lg:flex-shrink-0 fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="bg-surface rounded-2xl p-6 md:p-8 border-y border-r border-l-[3px] border-l-brandRed border-y-borderSubtle border-r-borderSubtle shadow-2xl sticky top-28 backdrop-blur-sm">
          <h2 className="font-display text-[26px] tracking-[2px] text-textBright mb-6 border-b border-borderSubtle pb-4">TU PEDIDO</h2>
          
          <div className="space-y-5 max-h-[450px] overflow-y-auto pr-3 mb-8 custom-scrollbar">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 opacity-60">
                <p className="font-body text-textSecondary text-center">Tu carrito está vacío.</p>
                <p className="font-body text-[13px] text-textMuted text-center mt-2">Agrega un combo para empezar</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm animate-[pageEnter_0.3s_ease_forwards]">
                  <div className="flex-1 pr-4">
                    <p className="font-body text-textBright font-medium tracking-wide uppercase text-[13px]">{item.name}</p>
                    <p className="font-body text-textMuted mt-1">S/ {item.price.toFixed(2)} c/u</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-body text-textSecondary bg-elevated px-2 py-1 rounded text-xs px-2.5">x{item.quantity}</p>
                    <div className="font-display tracking-wider text-[18px] text-brandRed w-[70px] text-right">
                      S/ {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-borderSubtle pt-6 mb-8">
            <div className="flex justify-between items-end">
              <span className="font-display tracking-[3px] text-textSecondary text-lg">TOTAL PAGO</span>
              <span className="font-display text-4xl text-brandRed tracking-wider relative bottom-[-4px]">S/ {total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate(ROUTES.PAGO)}
            disabled={items.length === 0}
            title={items.length === 0 ? 'Agrega productos para continuar' : ''}
            className={`w-full py-4 px-6 font-body font-semibold text-[14px] uppercase tracking-[2px] rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.3)] relative overflow-hidden ${
              items.length === 0 
                ? 'bg-elevated text-textMuted cursor-not-allowed border border-borderSubtle' 
                : 'bg-brandRed hover:bg-brandRedDeep text-white border border-transparent hover:-translate-y-1'
            }`}
          >
            {items.length > 0 && <div className="absolute inset-0 btn-shimmer pointer-events-none"></div>}
            <span className="relative z-10 flex items-center justify-center gap-2">
              Continuar <span className="text-[18px] leading-none mb-0.5">→</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dulceria;
