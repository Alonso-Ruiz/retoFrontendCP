import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const ProductCard = ({ product }) => {
  const { items, addItem, removeItem } = useCartStore();
  
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="bg-surface rounded-2xl overflow-hidden border border-borderSubtle flex flex-col h-full transition-all duration-300 hover:border-borderRed hover:shadow-[0_0_20px_rgba(229,9,20,0.1)] hover:-translate-y-1 fade-in-up group">
      <div className="h-[180px] bg-void relative overflow-hidden w-full shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-surface to-transparent"></div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-body text-[15px] font-semibold text-textBright mb-1 tracking-wide uppercase">{product.name}</h3>
        <p className="font-body text-[14px] text-textSecondary leading-relaxed mb-4 flex-1">{product.description}</p>
        
        <div className="mt-auto flex justify-between items-center pt-2">
          <span className="font-display text-[22px] tracking-wider text-brandRed">S/ {product.price.toFixed(2)}</span>
          
          <div className="flex items-center space-x-2 bg-void rounded-[10px] p-1 border border-borderSubtle">
            <button 
              onClick={() => removeItem(product.id)}
              disabled={quantity === 0}
              className={`w-[30px] h-[30px] rounded-[8px] flex items-center justify-center transition-all duration-200 ${quantity > 0 ? 'bg-elevated hover:bg-brandRed text-white shadow-md' : 'text-textMuted cursor-not-allowed'}`}
            >
              <Minus size={16} strokeWidth={3} />
            </button>
            <span className="w-5 text-center font-body font-semibold text-[14px] text-textBright">{quantity}</span>
            <button 
              onClick={() => addItem(product)}
              className="w-[30px] h-[30px] bg-elevated hover:bg-brandRed text-white rounded-[8px] flex items-center justify-center shadow-md transition-all duration-200"
            >
              <Plus size={16} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
