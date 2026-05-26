import { Clock, Radio } from 'lucide-react';
import { Button } from '../ui/Button'

interface ClassCardProps {
  nome: string;
  horario: string;
  sala: string;
  totalAlunos: number;
  status: 'pronta' | 'aguardando';
}

const ClassCard = ({ nome, horario, sala, totalAlunos, status }: ClassCardProps) => {
  const isReady = status === 'pronta';

  return (
    <div className={`bg-card p-5 rounded-xl border border-bordershadow-sm transition-all ${!isReady ? 'opacity-80' : 'hover:shadow-md'}`}>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <h4 className='font-bold text-text-main'>{nome}</h4>
          <div className='flex items-center gap-2 mt-1 text-text-muted'>
            <Clock size={14}/>
            <span className='text-xs font-medium'>{horario}</span>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${isReady ? 'bg-brand/10 text-brand' : 'bg-input-bg text-text-muted'}`}>
          {sala}
        </span>
      </div>

      <div className='flex items-center ap-4 mb-6'>
        <div className='flex -space-x-2'>
          <div className='w-8 h-8 rounded-full border-2 border-card bg-border flex items-center justify-center text-[10px] font-bold text-text-muted'>JD</div>
          <div className='w-8 h-8 rounded-full border-2 border-card bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand'>AM</div>
          <div className='w-8 h-8 rounded-full border-2 border-card bg-input-bg flex items-center justify-center text-[10px] font-bold text-text-muted'>+{totalAlunos - 2}</div>
        </div>
        <span className='text-xs text-text-muted'>{totalAlunos} alunos inscritos</span>
      </div>

      {isReady ? (
        <Button icon={<Radio size={18}/>} className='py-2.5'>
          Abrir Chamada
        </Button>
      ) : (
        <Button disabled className='py-2.5 bg-input-bg text-text-muted border-none shadow-none'>
          Aguardando Horário
        </Button>
      )}
    </div>
  );
}
