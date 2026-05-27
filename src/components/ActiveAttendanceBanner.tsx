import { Fingerprint, LocateFixed } from 'lucide-react';

const ActiveAttendanceBanner = () => {
  return (
    <section className='relative overflow-hidden rounded-2xl bg-card p-6 shadow-xl border border-brand/10 group'>
      <div className='absolute top-0 right-0 p-4 opacity-10'>
        <LocateFixed size={120} />
      </div>

      <div className='realtive z-10 flex flex-col md:flex-row items-center gap-6'>
        <div className='flex-1 space-y-4 text-center md:text-left'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-bold border border-success/20'>
            <span className='relative flex h-3 w-3'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75'></span>
              <span className='relative inline-flex rounded-full h-3 w-3 bg-success'></span>
            </span>
            CHAMADA ATIVA
          </div>

          <h2 className='text-2xl font-bold text-text-main'>Engenharia de Software I</h2>
          <p className='text-text-muted max-w-md mx-auto md:mx-0'>
            A sua localização foi detectada dentro do raio permitido da Sala 302. Confirme a sua presença agora.
          </p>

          <div className='flex items-center gap-4 justify-center md:justify-start'>
            <div className='flex flex-col'>
              <span className='text-xs text-text-muted font-bold uppercase'>Professor</span>
              <span className='text-sm font-semibold text-text-main'>Dr. Roberto Caminha</span>
            </div>
            <div className='w-px h-8 bg-border'></div>
            <div className='flex flex-col'>
              <span className='text-xs text-text-muted font-bold uppercase'>HORÁRIO</span>
              <span className='text-sm font-semibold text-text-main'>19:00 - 20:40</span>
            </div>
          </div>
        </div>

        <div className='w-full md:w-auto'>
          <button className='w-full md:w-56 h-20 bg-success hover:bg-success/90 text-white rounded-xl font-black text-lg shadow-lg shadow-success/30 transiton-all flex flex-col items-center justify-center gaop-1 group cursor-pointer border-none'>
            <Fingerprint size={32} />
              MARCAR PRESENÇA
          </button>
        </div>
      </div>
    </section>
  );
}

export default ActiveAttendanceBanner;
