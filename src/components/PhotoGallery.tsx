import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PhotoGalleryProps {
  items: { id: string; name: string; image: string }[];
  initialIndex: number;
  onClose: () => void;
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function PhotoGallery({ items, initialIndex, onClose }: PhotoGalleryProps) {
  const [[page, direction], setPage] = useState([initialIndex, 0]);

  const currentIndex = Math.abs(page % items.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
      >
        <X size={24} />
      </button>

      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 flex flex-col items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl max-h-[70vh] flex-1 flex items-center justify-center">
              <img 
                src={items[currentIndex].image} 
                alt={items[currentIndex].name}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl pointer-events-none"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23220000'/%3E%3Ctext x='200' y='200' fill='white' font-family='sans-serif' font-size='24' font-weight='bold' text-anchor='middle' dominant-baseline='middle'%3E${encodeURIComponent(items[currentIndex].name)}%3C/text%3E%3C/svg%3E`;
                }}
              />
            </div>
            
            <div className="mt-8 text-center px-4">
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-2">{items[currentIndex].name}</h3>
              <p className="text-white/60 text-sm">{currentIndex + 1} de {items.length}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button 
          className="absolute left-2 sm:left-6 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft size={28} />
        </button>
        <button 
          className="absolute right-2 sm:right-6 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
          onClick={() => paginate(1)}
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
