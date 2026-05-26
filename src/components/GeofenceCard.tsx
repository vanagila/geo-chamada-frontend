import { LocateFixed, Info, Signal } from 'lucide-react';
import Button from '../ui/Button';

const GeofenceCard = () => {
  return (
    <div className='bg-card rounded-xl border-2 border-brand shadow-xl overflow-hidden'>
      <div className='p-5 border-b border-border'>
        <h3 className='font-bold text-lg flex items-center gap-2 text-text-main'>
          <LocateFixed className='text-brand' size={20} />
          Iniciar Chamada Geo
        </h3>
        <p className='text-xs text-text-muted mt-1'>Configure o raio de geofencing para a sala atual.</p>
      </div>
      <div className='p-5 space-y-6'>
        <div className='relative w-full h-40 bg-input-bg rounded-lg overflow-hidden flex items-center justify-center'>
          <div className='absolute inset-0 opacity-20 bg-[url("https://www.transparenttextures.com/patterns/cubes.png")]'></div>
          <div className='relative z-10'>
            <div className='absolute -inset-8 bg-brand/20 rounded-full animate-ping'></div>
            <div className='absolute -inset-12 bg-brand/10 rounded-full border border-brand/30'></div>
            <div className='relative w-6 h-6 bg-brand rounded-full border-2 border-white flex items-center justify-center shadow-lg'>
              <span className='w-2 h-2 bg-white rounded-full'></span>
            </div>
          </div>
          <div className='absolute bottom-2 right-2 bg-card/90 px-2 py-1 rounded text-[10px] font-bold shadow-sm z-20 text-text-main'>
            Sua localização: Sala 204
          </div>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <label className='text-sm font-bold text-text-main'>Raio de Validação</label>
            <span className='text-brand font-bold text-sm'>150m</span>
          </div>
          <input 
            className='w-full h-2 bg-input-bg rounded-lg appearance-none cursor-pointer accent-brand' 
            max='500' min='50' step='50' type='range' defaultValue='150'
          />
          <div className='flex justify-between text-[10px] text-text-muted font-bold uppercase tracking-wider'>
            <span>50m</span>
            <span>250m</span>
            <span>500m</span>
          </div>
        </div>
        <div className='bg-brand/5 border border-brand/10 p-4 rounded-lg'>
          <div className="flex items-start gap-3">
            <Info className='text-brand shrink-0' size={18} />
            <p className='text-xs leading-relaxed text-text-muted'>
              Alunos fora do raio de <strong className="text-brand">150 metros</strong> precisarão de sua autorização manual para confirmar presença.
            </p>
          </div>
        </div>
        <Button icon={<Signal size={20} />} className='py-3'>
          ATIVAR GEOFENCE
        </Button>
      </div>
    </div>
  );
}

export default GeofenceCard;
