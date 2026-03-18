import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { ROUTES } from '../constants/routes';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { items } = useCartStore();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const navLinks = [
    { name: 'Home', path: ROUTES.HOME },
    { name: 'Dulcería', path: ROUTES.DULCERIA },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(5,5,5,0.85)] backdrop-blur-[20px] border-b border-borderSubtle transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex-shrink-0 flex items-center gap-3 group">
            <img src="/logo.svg" alt="La Butaca Logo" className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-display text-[26px] tracking-[4px] mt-1 text-brandRed group-hover:text-brandRedGlow transition-colors duration-300">LA BUTACA</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-body font-medium text-[14px] uppercase tracking-[1.5px] transition-colors duration-300 py-2 group ${isActive ? 'text-white' : 'text-textSecondary hover:text-white'}`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-brandRed transform origin-center transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
              );
            })}
            
            {/* Auth / User */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <span className="font-body text-[14px] font-medium text-textSecondary uppercase tracking-[1px]">HOLA, {user.fullName.split(' ')[0]}</span>
                <button 
                  onClick={logout}
                  className="text-textMuted hover:text-brandRed transition-colors duration-300 p-2 rounded-full hover:bg-bgElevated"
                  title="Cerrar sesión"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : isAuthenticated && !user ? (
               <div className="flex items-center space-x-4">
                <span className="font-body text-[14px] font-medium text-textSecondary uppercase tracking-[1px]">Invitado</span>
                <button 
                  onClick={logout}
                  className="text-textMuted hover:text-brandRed transition-colors duration-300 p-2 rounded-full hover:bg-bgElevated"
                  title="Cerrar sesión"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className={`relative font-body font-medium text-[14px] uppercase tracking-[1.5px] transition-colors duration-300 py-2 group ${location.pathname === ROUTES.LOGIN ? 'text-white' : 'text-textSecondary hover:text-white'}`}
              >
                Login
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-brandRed transform origin-center transition-transform duration-300 ${location.pathname === ROUTES.LOGIN ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            )}

            {/* Cart Badge */}
            <Link to={ROUTES.DULCERIA} className="relative p-2 text-textSecondary hover:text-white transition-colors duration-300 group">
              <ShoppingCart size={22} className="group-hover:scale-110 transition-transform duration-300" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brandRed rounded-full animate-pulse shadow-[0_0_10px_rgba(229,9,20,0.5)]">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to={ROUTES.DULCERIA} className="relative p-2 text-textSecondary">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-[6px] py-[2px] text-[10px] font-bold leading-none text-white bg-brandRed rounded-full shadow-[0_0_10px_rgba(229,9,20,0.5)]">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-textSecondary hover:text-white transition-transform duration-300">
              <div className={`transform transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Content */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[300px] border-b border-borderSubtle bg-surface/95 backdrop-blur-xl' : 'max-h-0'}`}>
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl font-body font-medium text-[14px] uppercase tracking-[1px] transition-all duration-200 ${location.pathname === link.path ? 'bg-brandRed/10 text-brandRed font-bold border border-brandRed/20' : 'text-textSecondary hover:bg-elevated hover:text-white'}`}
            >
              {link.name}
            </Link>
          ))}
          
          {isAuthenticated && user ? (
              <div className="px-4 py-3 flex justify-between items-center border-t border-borderSubtle mt-2 pt-4">
                <span className="font-body text-[14px] font-medium text-textSecondary uppercase">HOLA, {user.fullName.split(' ')[0]}</span>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-textMuted hover:text-brandRed transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
          ) : isAuthenticated && !user ? (
              <div className="px-4 py-3 flex justify-between items-center border-t border-borderSubtle mt-2 pt-4">
                <span className="font-body text-[14px] font-medium text-textSecondary uppercase">Invitado</span>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-textMuted hover:text-brandRed transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl font-body font-medium text-[14px] uppercase tracking-[1px] transition-all duration-200 ${location.pathname === ROUTES.LOGIN ? 'bg-brandRed/10 text-brandRed font-bold border border-brandRed/20' : 'text-textSecondary hover:bg-elevated hover:text-white'}`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
