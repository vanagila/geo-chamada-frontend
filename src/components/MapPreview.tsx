import { Map } from 'lucide-react';

const MapPreview = () => {
  return (
    <div className='col-span-1 md:col-span-2 bg-card rounded-2xl border border-brand/5 overflow-hidden flex flex-col shadow-sm'>
      <div className='h-full min-h-[200px] bg-input-bg relative'>
        <div className='absolute inset-0 opacity-30 bgg-[url("https://www.transparenttextures.com/patterns/cubes.png")]'></div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-10 h-10 bg-band/20 rounded-full flex items-center justify-center animate-pulse'>
            <div className='w-3 h-4 bg-brand rounded-full border boder-white shadow-lg'></div>
          </div>
        </div>

        <div className='absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm p-3 rounded-xl border border-border shadow-lg'>
          <div className='flex items-center gap-3 text-text-main'>
            <Map className='text-brand shrink-0' size={20} />
            <span className='text-sm font-semibold truncate'>
              Campus Central - Bloco C, 3º Andar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapPreview;
