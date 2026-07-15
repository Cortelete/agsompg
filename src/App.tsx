/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Instagram, MapPin, MessageCircle, Star, Wrench, Shield, Check, Send, ChevronRight, Volume2, Car } from 'lucide-react';
import { motion } from 'motion/react';
import { LinkButton } from './components/LinkButton';
import { Modal } from './components/Modal';
import { PhotoGallery } from './components/PhotoGallery';

export default function App() {
  const [isLogoSpinning, setIsLogoSpinning] = useState(false);
  
  // Modals state
  const [activeModal, setActiveModal] = useState<'none' | 'whoWeAre' | 'contact' | 'location' | 'rating' | 'feedback' | 'developer'>('none');
  
  // Rating state
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Form states
  const [contactName, setContactName] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [observation, setObservation] = useState('');
  const [devName, setDevName] = useState('');
  
  // Gallery state
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  const AVAILABLE_SERVICES = [
    { id: '1', name: 'Auto elétrica', image: '/1.png' },
    { id: '2', name: 'Insulfilm', image: '/2.png' },
    { id: '3', name: 'Som', image: '/3.png' },
    { id: '4', name: 'Alarme travas vidros elétricos', image: '/4.png' },
    { id: '5', name: 'Manutenção em teto solar', image: '/5.png' },
    { id: '6', name: 'Concertos em motor arranque', image: '/6.png' },
    { id: '7', name: 'Concerto em alternador', image: '/7.png' },
    { id: '8', name: 'Vendas de centrais multimídias', image: '/8.png' },
    { id: '9', name: 'Acessórios em geral', image: '/9.png' }
  ];

  const handleLogoClick = () => {
    setIsLogoSpinning(true);
    setTimeout(() => {
      setIsLogoSpinning(false);
      setActiveModal('whoWeAre');
    }, 1200); // match animation duration
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const servicesText = selectedServices.join(', ');
    const obsText = observation.trim() ? `\n\nObservação (ex: modelo do veículo): ${observation.trim()}` : '';

    const text = `Olá, meu nome é ${contactName.trim() || 'um cliente'}. Gostaria de informações sobre: ${servicesText || 'seus serviços'}.${obsText}`;
    window.open(`https://wa.me/5542999271852?text=${encodeURIComponent(text)}`, '_blank');
    setActiveModal('none');
  };

  const handleRating = (value: number) => {
    setRating(value);
    if (value === 5) {
      window.open('https://search.google.com/local/writereview?placeid=ChIJfXuQeVIb6JQRkoLjKo5sLfo', '_blank');
      setActiveModal('none');
    } else {
      setActiveModal('feedback');
    }
  };

  const handleDevSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá, meu nome é ${devName.trim()}. Vi o link da AG Som e quero um site incrível como esse!`;
    window.open(`https://wa.me/5541988710303?text=${encodeURIComponent(text)}`, '_blank');
    setActiveModal('none');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Main Card container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[420px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative"
      >
        {/* Blurred Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/fundo.png" 
            alt="" 
            className="w-full h-full object-cover opacity-40 blur-xl"
            onError={(e) => {
              // fallback if image not found, just hide it
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 mix-blend-overlay"></div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col items-center relative z-10">
          
          {/* Logo Section */}
          <div className="relative mb-8 w-full flex justify-center">
            <div className="absolute inset-0 bg-red-600/10 blur-3xl animate-pulse rounded-full w-3/4 mx-auto" />
            <img 
              src="/logo.png" 
              alt="AG Som Logo" 
              onClick={handleLogoClick}
              className={`relative w-56 h-auto sm:w-64 cursor-pointer drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] ${isLogoSpinning ? 'animate-elegant-zoom' : 'hover:scale-105 transition-transform duration-300'}`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='224' height='100' viewBox='0 0 224 100'%3E%3Crect width='224' height='100' fill='transparent'/%3E%3Ctext x='112' y='50' fill='white' font-family='sans-serif' font-size='32' font-weight='bold' text-anchor='middle' dominant-baseline='middle'%3EAG Som%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>

          {/* Subtitle Section */}
          <p className="text-sm sm:text-base text-white/80 font-light mb-8 text-center max-w-[280px]">
            Estilo e sofisticação para o seu veículo.
          </p>

          {/* Links Section */}
          <div className="w-full space-y-3 sm:space-y-4 flex-1">
            <LinkButton 
              icon={<MessageCircle size={22} />}
              title="Atendimento WhatsApp"
              subtitle="Faça seu orçamento"
              onClick={() => setActiveModal('contact')}
            />
            <LinkButton 
              icon={<MapPin size={22} />}
              title="Localização"
              subtitle="Visite nossa loja"
              onClick={() => setActiveModal('location')}
            />
            <LinkButton 
              icon={<Star size={22} />}
              title="Avalie-nos"
              subtitle="Sua opinião é importante"
              onClick={() => setActiveModal('rating')}
            />
            <LinkButton 
              icon={<Instagram size={22} />}
              title="Instagram"
              subtitle="Em breve"
              disabled
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-white/10 bg-black/40 relative z-10 backdrop-blur-md">
          <button 
            onClick={() => setActiveModal('developer')}
            className="w-full text-center group"
          >
            <span className="text-xs text-white/60 font-light group-hover:text-white/90 transition-colors flex items-center justify-center gap-1">
              Desenvolvido por <strong className="font-medium">InteligenciArte.IA ✨</strong>
            </span>
          </button>
        </div>
      </motion.div>

      {/* --- MODALS --- */}

      <Modal isOpen={activeModal === 'whoWeAre'} onClose={() => setActiveModal('none')} title="Quem Somos">
        <div className="flex flex-col items-center space-y-6 pt-2">
          
          <div className="relative">
            <div className="absolute inset-0 bg-red-600/20 blur-xl rounded-full" />
            <div className="relative w-28 h-auto flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="AG Som Logo" 
                className="w-full h-auto drop-shadow-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='112' height='50' viewBox='0 0 112 50'%3E%3Crect width='112' height='50' fill='transparent'/%3E%3Ctext x='56' y='25' fill='white' font-family='sans-serif' font-size='16' font-weight='bold' text-anchor='middle' dominant-baseline='middle'%3EAG Som%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>

          <div className="text-center space-y-4 px-2">
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
              A <strong className="font-medium text-white">AG Som</strong> é referência em soluções para quem busca mais <span className="text-red-200">tecnologia, conforto e qualidade</span> para o veículo.
            </p>
            
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
              Atuamos com instalação de som automotivo, acessórios e personalizações, oferecendo atendimento especializado, produtos de qualidade e serviços executados com precisão.
            </p>
          </div>

          <div className="w-full grid grid-cols-3 gap-3 py-4 border-y border-white/5">
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5">
              <Volume2 size={24} className="text-red-300 mb-2" />
              <span className="text-xs font-medium text-white/70">Som</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5">
              <Wrench size={24} className="text-red-300 mb-2" />
              <span className="text-xs font-medium text-white/70">Elétrica</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5">
              <Car size={24} className="text-red-300 mb-2" />
              <span className="text-xs font-medium text-white/70">Acessórios</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-900/10 via-red-800/10 to-red-900/10 p-4 rounded-xl border border-red-500/10 w-full">
            <p className="text-sm text-center text-red-100/90 font-light italic leading-relaxed">
              "Nosso compromisso é entregar resultados que superem expectativas, sempre com transparência, confiança e atenção aos detalhes."
            </p>
          </div>

        </div>
      </Modal>

      <Modal isOpen={activeModal === 'contact'} onClose={() => setActiveModal('none')} title="Contato via WhatsApp">
        <form onSubmit={handleContactSubmit} className="space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 ml-1">Seu Nome</label>
            <input 
              type="text" 
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all text-sm"
              placeholder="Como podemos te chamar?"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-2 ml-1">Serviços que procura:</label>
            <div className="space-y-2.5 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
              {AVAILABLE_SERVICES.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                  <div 
                    className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 overflow-hidden shrink-0 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setGalleryIndex(index)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23330000'/%3E%3Ctext x='24' y='24' fill='white' font-family='sans-serif' font-size='10' font-weight='bold' text-anchor='middle' dominant-baseline='middle'%3EAG%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                  </div>
                  
                  <label className="flex flex-1 items-center gap-3 cursor-pointer h-full">
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${selectedServices.includes(item.name) ? 'bg-white border-white' : 'border-white/40'}`}>
                      {selectedServices.includes(item.name) && <Check size={14} className="text-red-900" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={selectedServices.includes(item.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedServices([...selectedServices, item.name]);
                        } else {
                          setSelectedServices(selectedServices.filter(s => s !== item.name));
                        }
                      }}
                    />
                    <span className="text-sm text-white line-clamp-2">{item.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 ml-1">Observação (opcional)</label>
            <input 
              type="text" 
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all text-sm"
              placeholder="Ex: Marca/modelo do carro, detalhes..."
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3.5 px-4 bg-white text-red-950 font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors text-sm shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
          >
            <Send size={18} />
            Confirmar e Enviar
          </button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'location'} onClose={() => setActiveModal('none')} title="Nossa Localização">
        <div className="space-y-4">
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex gap-3 items-start">
            <MapPin size={20} className="text-white/70 shrink-0 mt-0.5" />
            <p className="text-sm text-white/90 leading-relaxed font-light">
              José Macedo de Loyola número 1<br/>
              <span className="text-xs text-white/60">Ponta Grossa, PR</span>
            </p>
          </div>
          <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-white/20">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.8957871334574!2d-50.124776!3d-25.1053888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e81b5279907b7d%3A0xfa2d6c8e2ae38292!2sAGSOM%20E%20ACESS%C3%93RIOS%20AUTOMOTIVOS!5e0!3m2!1spt-BR!2sbr!4v1782608377467!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a 
            href="https://maps.app.goo.gl/uX3L3wHjX2V7YhGv8" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-white/10 border border-white/20 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-colors text-sm"
          >
            Abrir no aplicativo de mapas
          </a>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'rating'} onClose={() => { setActiveModal('none'); setRating(0); }} title="Avalie nossa loja">
        <div className="flex flex-col items-center py-6">
          <p className="text-sm sm:text-base text-white/80 font-light mb-6 text-center">
            Como foi sua experiência com a AG Som?
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => handleRating(star)}
                className="transition-transform hover:scale-110 p-1"
              >
                <Star 
                  size={36} 
                  className={`transition-colors ${star <= (hoveredRating || rating) ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-white/30'}`} 
                />
              </button>
            ))}
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'feedback'} onClose={() => { setActiveModal('none'); setRating(0); }} title="Deixe seu feedback">
        <form action="https://formsubmit.co/agsomeacessorios@gmail.com" method="POST" className="space-y-4">
          <input type="hidden" name="_subject" value="Novo Feedback - Avaliação Menor que 5 Estrelas" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="rating" value={rating} />
          
          <p className="text-sm text-white/80 font-light text-center mb-4">
            Sentimos muito que não tenha sido 5 estrelas. Nos conte o que houve e como podemos melhorar:
          </p>
          
          <textarea 
            name="message"
            required
            rows={4}
            className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all text-sm resize-none custom-scrollbar"
            placeholder="Sua mensagem..."
          />
          
          <button 
            type="submit"
            className="w-full py-3.5 px-4 bg-white text-red-950 font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors text-sm"
          >
            <Send size={18} />
            Enviar Feedback
          </button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'developer'} onClose={() => setActiveModal('none')} title="Desenvolvedor">
        <div className="flex flex-col items-center space-y-6 pt-2">
          <a 
            href="https://instagram.com/inteligenciarte.ia" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors w-full"
          >
            <div className="w-14 h-14 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white">
              <Instagram size={28} />
            </div>
            <div className="text-center">
              <h3 className="text-white font-medium">@inteligenciarte.ia</h3>
              <p className="text-xs text-white/60 mt-0.5">Siga-nos no Instagram</p>
            </div>
          </a>

          <div className="w-full border-t border-white/10 pt-6">
            <h4 className="text-sm font-medium text-white/90 text-center mb-4">Quer um site incrível como esse? Fale comigo! 🚀</h4>
            <form onSubmit={handleDevSubmit} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  required
                  value={devName}
                  onChange={(e) => setDevName(e.target.value)}
                  className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all text-sm"
                  placeholder="Seu nome"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:from-emerald-400 hover:to-emerald-500 transition-all text-sm shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
              >
                <MessageCircle size={18} />
                Solicitar via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </Modal>

      {galleryIndex !== null && (
        <PhotoGallery 
          items={AVAILABLE_SERVICES} 
          initialIndex={galleryIndex} 
          onClose={() => setGalleryIndex(null)} 
        />
      )}

    </div>
  );
}
