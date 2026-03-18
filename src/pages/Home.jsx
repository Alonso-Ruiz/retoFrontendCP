import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';
import { getPremieres } from '../services/premieresService';
import SkeletonCard from '../components/SkeletonCard';
import { ROUTES } from '../constants/routes';

const Home = () => {
  const [premieres, setPremieres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPremieres = async () => {
      try {
        const data = await getPremieres();
        setPremieres(data);
      } catch (err) {
        setError('Ocurrió un error al cargar la cartelera.');
      } finally {
        setLoading(false);
      }
    };
    fetchPremieres();
  }, []);

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-void">
        <h2 className="text-2xl font-display text-brandRed mb-4 tracking-wider">Error</h2>
        <p className="text-textSecondary font-body">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-6 px-8 py-3 bg-brandRed text-white rounded font-body font-bold hover:bg-brandRedGlow transition-colors uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(229,9,20,0.3)]"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full lg:py-20">
      
      {/* Hero Section */}
      <div className="mb-20 relative z-10 flex flex-col fade-in-up">
        <h1 className="font-display text-[clamp(60px,10vw,120px)] text-textBright leading-[0.85] tracking-wide mb-2">LA BUTACA</h1>
        <p className="font-body font-light text-[clamp(20px,3vw,32px)] text-textSecondary tracking-wide">Tu cine. Tu mundo.</p>
        <div className="h-1.5 bg-brandRed mt-6 rounded-full w-0 animate-grow-line shadow-[0_0_10px_rgba(229,9,20,0.8)]"></div>
      </div>

      {/* Grid Cartelera */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="fade-in-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                <SkeletonCard isMovie={true} />
              </div>
            ))
          : premieres.map((movie, idx) => (
              <div
                key={movie.id}
                onClick={() => navigate(ROUTES.LOGIN)}
                className="fade-in-up group cursor-pointer bg-surface rounded-2xl overflow-hidden border border-borderSubtle flex flex-col sm:flex-row h-full transition-all duration-500 hover:border-borderRed hover:bg-elevated hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Poster Container */}
                <div className="sm:w-[40%] aspect-[2/3] sm:aspect-auto sm:h-auto overflow-hidden relative bg-void shrink-0">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
                  />
                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-brandRed/0 group-hover:bg-brandRed/30 transition-colors duration-500 z-10"></div>
                  {/* Ícono animado */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                     <div className="w-16 h-16 rounded-full bg-void/80 backdrop-blur-sm border border-brandRed flex items-center justify-center text-textBright shadow-[0_0_30px_rgba(229,9,20,0.6)]">
                       <Play className="ml-1" size={28} fill="currentColor" />
                     </div>
                  </div>
                </div>
                
                {/* Info Container */}
                <div className="sm:w-[60%] p-6 sm:p-8 flex flex-col relative z-20">
                  {/* Badge */}
                  <div className="flex items-center mb-4">
                    <span className="inline-flex items-center text-xs font-body font-bold text-brandRed uppercase tracking-widest bg-brandRed/10 px-3 py-1 rounded-full border border-brandRed/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-brandRed mr-2 animate-pulse shadow-[0_0_5px_#e50914]"></span>
                      Estreno
                    </span>
                  </div>
                  
                  <h3 className="font-display text-4xl text-textBright leading-[1.1] mb-4 group-hover:text-brandRed transition-colors duration-300">{movie.title}</h3>
                  
                  {/* Info Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-elevated border border-borderSubtle rounded-full text-[12px] font-body text-textPrimary">{movie.rating}</span>
                    <span className="px-3 py-1 bg-elevated border border-borderSubtle rounded-full text-[12px] font-body text-textPrimary">{movie.genre}</span>
                    <span className="px-3 py-1 bg-elevated border border-borderSubtle rounded-full text-[12px] font-body text-textSecondary">{movie.duration}</span>
                  </div>
                  
                  <p className="font-body text-[14px] text-textSecondary leading-[1.7] mb-8 flex-1">
                    {movie.description}
                  </p>
                  
                  {/* Action */}
                  <div className="mt-auto">
                    <button className="flex items-center font-body text-[13px] font-bold uppercase tracking-widest text-brandRed bg-transparent border-[1.5px] border-brandRed rounded-lg px-6 py-3 transition-all duration-300 group-hover:bg-brandRed group-hover:text-white group-hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] w-fit group/btn">
                      Comprar Entradas
                      <ArrowRight size={16} className="ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;
