import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { ROUTES } from '../constants/routes';

const Footer = () => {
  return (
    <footer className="bg-void border-t border-borderSubtle px-6 py-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

        {/* COL 1: Marca */}
        <div className="flex flex-col space-y-4">
          <Link to={ROUTES.HOME} className="flex items-center space-x-3">
            <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
            <span className="font-display text-3xl font-bold text-brandRed tracking-[4px]">LA BUTACA</span>
          </Link>
          <p className="font-body text-sm text-textMuted max-w-sm">Tu cine. Tu mundo.</p>
          <div className="flex space-x-4 pt-4">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, idx) => (
              <a key={idx} href="#" className="w-10 h-10 rounded-full border border-borderSubtle flex items-center justify-center text-textSecondary hover:border-brandRed hover:text-brandRed transition-all duration-300">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* COL 2: Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-display text-lg text-brandRed tracking-widest uppercase mb-2">Navegar</h4>
          {[
            { name: 'Home', path: ROUTES.HOME },
            { name: 'Dulcería', path: ROUTES.DULCERIA },
            { name: 'Login', path: ROUTES.LOGIN }
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="font-body text-sm text-textSecondary hover:text-white transition-colors duration-200 group flex items-center"
            >
              <span className="relative">
                {link.name}
              </span>
              <span className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brandRed">→</span>
            </Link>
          ))}
        </div>

        {/* COL 3: Info */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-display text-lg text-brandRed tracking-widest uppercase mb-2">Contacto</h4>
          <p className="font-body text-sm text-textSecondary">Lima, Perú</p>
          <p className="font-body text-sm text-textSecondary hover:text-brandRed transition-colors cursor-pointer">ruizcardenas03@gmail.com</p>
        </div>

      </div>

      <div className="pt-8 border-t border-borderSubtle/50 text-center">
        <p className="font-body text-xs text-textMuted">
          © {new Date().getFullYear()} La Butaca. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
