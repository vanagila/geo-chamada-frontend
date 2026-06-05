import { Clock, Radio } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../ui/Button';
import useChamadas from '../../hooks/useChamadas';
import type { Coordenadas } from '../../types/geo.types';

interface TurmaCardProps {
  id: number;
  nome: string;
  horario: string;
  sala: string;
  totalAlunos: number;
  status: 'pronta' | 'aguardando';
  configuracao: {
    raio: number;
    coordenadas: { latitude: number; longitude: number } | null;
    hasLocation: boolean;
  };
  onSuccess?: () => void
}

const TurmaCard = ({ id, nome, horario, sala, totalAlunos, status, configuracao, onSuccess }: TurmaCardProps) => {
  const isReady = status === 'pronta';

  const { createChamada, isCreating } = useChamadas();

  console.log(configuracao)

  const handleAbrirChamada = () => {
    if (!configuracao.hasLocation || !configuracao.coordenadas) {
      toast.error('Configure a sua localização no painel ao lado');
      return
    }

    createChamada(
      {
        turma_id: id,
        raio: configuracao.raio,
        coordenadas: {
          latitude: configuracao.coordenadas.latitude,
          longitude: configuracao.coordenadas.longitude,
        },
      },
      {
        onSuccess: () => {
          toast.success(`Chamada aberta para ${turma}!`);
          onSuccess?.();
        },
        onError: (error: any) => {
          console.error('Erro completo:', error);
          console.error('Response:', error.response);
          console.error('Data:', error.response?.data);
        }
      }
    );
  };

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
        <Button 
          onClick={handleAbrirChamada}
          disabled={isCreating || !configuracao.hasLocation}
          icon={<Radio size={18}/>} 
          className='py-2.5'>
          {isCreating ? 'Abrindo...' : 'Abrir Chamada'}
        </Button>
      ) : (
        <Button disabled className='py-2.5 bg-input-bg text-text-muted border-none shadow-none'>
          Aguardando Horário
        </Button>
      )}
    </div>
  );
}

export default TurmaCard;
