import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { LocateFixed, Info, Signal, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import useGeolocation from '../hooks/useGeolocation';
import type { Coordenadas } from '../types/geo.types';

interface GeofenceCardProps {
  onConfigChange?: (config: { raio: number; coordenadas: Coordenadas | null}) => void;
}

const GeofenceCard = ({ onConfigChange }: GeofenceCardProps) => {
  const [raio, setRaio] = useState<number>(150);

  const { 
    coordenadas,
    carregando,
    erro,
    capturarLocalizacao,
    hasLocation
  } = useGeolocation({
    persistLocation: true
  });

  const lastNotifiedRef = useRef<string>('');

  useEffect(() => {
    const configString = JSON.stringify({ raio, coordenadas });

    if (configString !== lastNotifiedRef.current) {
      lastNotifiedRef.current = configString;

      if (onConfigChange) {
        onConfigChange({ raio, coordenadas });
      }
    }
  }, [coordenadas, raio]);

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRaio(parseInt(e.target.value))
  }

  return (
    <div className={`bg-card rounded-xl border-2 shadow-xl overflow-hidden transition-colors ${hasLocation ? 'border-green-500/50' : 'border-brand'}`}>
      <div className='p-5 border-b border-border flex justify-between items-center'>
        <div>
          <h3 className='font-bold text-lg flex items-center gap-2 text-text-main'>
            <LocateFixed className={hasLocation ? 'text-green-500' : 'text-brand'} size={20} />
            Configuração da Chamada
          </h3>
          <p className='text-xs text-text-muted mt-1'>Configure o raio e ative sua localização</p>
        </div>
        {hasLocation && (
          <span className="flex items-center gap-1 bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-bold">
            <CheckCircle2 size={14} />
            Ativo
          </span>
        )}
      </div>
      <div className='p-5 space-y-6'>
        <div className={`relative w-full h-40 rounded-lg overflow-hidden flex items-center justify-center transition-colors ${hasLocation ? 'bg-green-500/5' : 'bg-input-bg'}`}>
          <div className='absolute inset-0 opacity-20 bg-[url("https://www.transparenttextures.com/patterns/cubes.png")]'></div>
          <div className='relative z-10'>
            {hasLocation ? (
              <>
                <div className='absolute -inset-8 bg-green-500/20 rounded-full animate-pulse'></div>
                <div className='relative w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg'>
                  <span className='w-2 h-2 bg-white rounded-full'></span>
                </div>
              </>
            ) : (
              <>
                <div className='absolute -inset-8 bg-brand/20 rounded-full animate-ping'></div>
                <div className='absolute -inset-12 bg-brand/10 rounded-full border border-brand/30'></div>
                <div className='relative w-6 h-6 bg-brand rounded-full border-2 border-white flex items-center justify-center shadow-lg'>
                  <span className='w-2 h-2 bg-white rounded-full'></span>
                </div>
              </>
            )}
          </div>
          <div className={`absolute bottom-2 right-2 px-2 py-1 rounded text-[10px] font-bold shadow-sm z-20 ${hasLocation ? 'bg-green-500 text-white' : 'bg-card/90 text-text-main'}`}>
            {hasLocation ? 'Localização Capturada' : 'Localização Pendente'}
          </div>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <label className='text-sm font-bold text-text-main'>Raio de Validação</label>
            <span className={`${hasLocation ? 'text-green-500' : 'text-brand'} font-bold text-sm`}>{raio}m</span>
          </div>
          <input 
            onChange={handleRadioChange}
            className={`w-full h-2 bg-input-bg rounded-lg appearance-none cursor-pointer ${hasLocation ? 'accent-green-500' : 'accent-brand'}`} 
            max='150' min='50' step='10' type='range' value={raio}
          />
          <div className='flex justify-between text-[10px] text-text-muted font-bold uppercase tracking-wider'>
            <span>50m</span>
            <span>100m</span>
            <span>150m</span>
          </div>
        </div>
        <div className={`${hasLocation ? 'bg-green-500/5 border-green-500/10' : 'bg-brand/5 border-brand/10'} border p-4 rounded-lg`}>
          <div className="flex items-start gap-3">
            <Info className={`${hasLocation ? 'text-green-500' : 'text-brand'} shrink-0`} size={18} />
            <p className='text-xs leading-relaxed text-text-muted'>
              Alunos fora do raio de <strong className={hasLocation ? "text-green-500" : "text-brand"}>{raio} metros</strong> precisarão de sua autorização manual para confirmar presença.
            </p>
          </div>
        </div>
        {erro && (
          <p className="text-xs font-semibold text-error text-center bg-error/10 py-2 rounded-lg">
            {erro}
          </p>
        )}
        <Button 
          onClick={capturarLocalizacao} 
          disabled={carregando} 
          icon={<Signal size={20} />} 
          className={`py-3 w-full ${hasLocation ? 'bg-input-bg !text-text-main hover:bg-border border border-border shadow-none' : ''}`}
        >
          {carregando ? 'Capturando...' : hasLocation ? 'Atualizar Localização' : 'Ativar Localização'}
        </Button>
      </div>
    </div>
  );
}

export default GeofenceCard;
