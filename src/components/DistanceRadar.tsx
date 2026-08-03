import { useState, useEffect } from 'react';
import { Signal } from 'lucide-react';
import Button from '../ui/Button';
import useGeolocation from '../hooks/useGeolocation';
import type { Coordenadas } from '../types/geo.types';

interface DistanceRadarProps {
  chamadaCoordenadas?: Coordenadas | null;
  maxRadius?: number;
  onDistanceChange?: (distance: number) => void;
}

const DistanceRadar = ({ chamadaCoordenadas, maxRadius, onDistanceChange }: DistanceRadarProps) => {

  const [distance, setDistance] = useState<number>(0);
  const [isInRange, setIsInRange] = useState<boolean>(false);

  const { 
    coordenadas,
    carregando,
    capturarLocalizacao,
    hasLocation
  } = useGeolocation({
    persistLocation: true
  });

  useEffect(() => {
    if (hasLocation && coordenadas && chamadaCoordenadas) {
      const calcDistance = calculateDistance(
        coordenadas.latitude,
        coordenadas.longitude,
        chamadaCoordenadas.latitude,
        chamadaCoordenadas.longitude
      );
      setDistance(calcDistance);
      setIsInRange(calcDistance <= maxRadius);
      onDistanceChange?.(calcDistance);
    }
  }, [coordenadas, chamadaCoordenadas, hasLocation, maxRadius]);

  const percentage = Math.min((distance / maxRadius) * 100, 100);
  const colorClass = isInRange ? 'text-success' : 'text-error';
  const bgClass = isInRange ? 'text-success' : 'text-error';
  const label = isInRange ? 'NO RAIO' : 'FORA DO RAIO';

  return (
    <div className='col-span-1 bg-card p-6 rounded-2xl border border-brand/5 flex flex-col items-center justify-center text-center space-y-4 shadow-sm'>
      <h3 className='text-text-muted text-sm font-bold uppercase tracking-widest'>
        Distância Atual
      </h3>

      <div className='relative flex items-center justify-center'>
        <svg className='w-32 h-32 transform -rotate-90'>
          <circle className='text-input-bg' cx='64' cy='64' fill='transparent' r='58' stroke='currentColor' strokeWidth='8'></circle>
          <circle 
            className={`${colorClass} transition-all duration-1000`} 
            cx='64' cy='64' fill='transparent' r='58' stroke='currentColor' 
            strokeDasharray='364.4' 
            strokeDashoffset={364.4 - (percentage / 100) * 364.4} 
            strokeWidth='8'
          ></circle>
        </svg>

        <div className='absolute flex flex-col items-center'>
          <span className='text-2xl font-black text-text-main'>{Math.round(distance)}m</span>
          <span className={`text-[10px] font-bold ${bgClass}`}>{label}</span>
        </div>
      </div>

      <p className='text-sm text-text-muted'>
        {hasLocation && chamadaCoordenadas 
          ? `Você está a ${Math.round(distance)} metros do ponto de referência`
          : 'Ative sua localização para ver a distância'}
      </p>

      <Button 
        onClick={capturarLocalizacao} 
        disabled={carregando} 
        icon={<Signal size={20} />} 
        className={`py-3 w-full ${hasLocation ? 'bg-input-bg !text-text-main hover:bg-border border border-border shadow-none' : ''}`}
      >
        {carregando ? 'Capturando...' : hasLocation ? 'Atualizar Localização' : 'Ativar Localização'}
      </Button>
    </div>
  );
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // Raio da Terra em metros
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default DistanceRadar;
