import React from 'react';

const SkeletonCard = ({ isMovie = false }) => {
  if (isMovie) {
    return (
      <div className="bg-surface rounded-xl overflow-hidden shimmer-premium flex flex-col md:flex-row h-full">
        <div className="md:w-[40%] h-72 md:h-full bg-void/50"></div>
        <div className="md:w-[60%] p-6 flex flex-col justify-center space-y-4">
          <div className="h-4 bg-void/50 rounded w-16 mb-2"></div>
          <div className="h-10 bg-void/50 rounded w-3/4"></div>
          <div className="flex space-x-2 mt-2">
             <div className="h-6 bg-void/50 rounded w-12"></div>
             <div className="h-6 bg-void/50 rounded w-20"></div>
             <div className="h-6 bg-void/50 rounded w-16"></div>
          </div>
          <div className="space-y-2 mt-6">
            <div className="h-3 bg-void/50 rounded"></div>
            <div className="h-3 bg-void/50 rounded w-5/6"></div>
            <div className="h-3 bg-void/50 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl overflow-hidden border border-borderSubtle flex flex-col h-full shimmer-premium">
      <div className="h-32 bg-void/50 w-full mb-4"></div>
      <div className="p-5 flex flex-col flex-1 space-y-3">
        <div className="h-6 bg-void/50 rounded w-2/3"></div>
        <div className="h-4 bg-void/50 rounded w-full"></div>
        <div className="h-4 bg-void/50 rounded w-4/5"></div>
        <div className="mt-auto pt-4 flex justify-between items-center">
          <div className="h-8 bg-void/50 rounded w-1/4"></div>
          <div className="h-10 bg-void/50 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
