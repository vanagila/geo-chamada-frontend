interface DistanceRadarProps {
  distance: number;
  maxRadius?: number;
}

const DistanceRadar = () => {
  const percentage = Math.min((distance / maxRadius) * 100, 100);
  const isInRange = distance <= maxRadius;
  
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
          <span className='text-2xl font-black text-text-main'>{distance}m</span>
          <span className={`text-[10px] font-bold ${bgClass}`}>{label}</span>
        </div>
      </div>

      <p className='text-sm text-text-muted'>
        Está a {distance} metros do ponto central da sala.
      </p>
    </div>
  );
}

export default DistanceRadar;
