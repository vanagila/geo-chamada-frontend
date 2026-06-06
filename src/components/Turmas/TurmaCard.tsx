import { Clock, Radio, StopCircle } from 'lucide-react';
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
  chamadaAtiva?: {
    id: number;
    status: string;
  } | null;
  onSuccess?: () => void
}

const TurmaCard = ({ 
  id, nome, horario, sala, totalAlunos, status, configuracao, chamadaAtiva, onSuccess
}: TurmaCardProps) => {
  const isReady = status === 'pronta';
  const hasChamadaAtiva = chamadaAtiva && chamadaAtiva.status === 'ABERTA';

  const { 
    createChamada, 
    isCreating,
    encerrarChamada,
    isEncerrando
  } = useChamadas();

  console.log(configuracao)
  console.log(chamadaAtiva)

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
          toast.success(`Chamada aberta para ${nome}!`);
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

  const handleEncerrarChamada = () => {
    if(!chamadaAtiva?.id) return;

    if (window.confirm(`Tem certeza que deseja encerrar a chamada da turma ${nome}?`)) {
      encerrarChamada(chamadaAtiva.id, {
        onSuccess: () => {
          toast.success(`Chamada da turma ${nome} encerrada!`);
          onSuccess?.();
        },
        onError: (error: any) => {
          const message = error.response?.data?.detail || 'Erro ao encerrar chamada';
          toast.error(message);
        },
      });
    }
  };

  return (
    <div className={`bg-card p-5 rounded-xl border border-border shadow-sm transition-all ${!isReady ? 'opacity-80' : 'hover:shadow-md'}`}>
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

      {hasChamadaAtiva && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-600 text-xs px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Chamada Ativa
          </span>
        </div>
      )}

      <div className='flex items-center gap-4 mb-6'>
        <div className='flex -space-x-2'>
          <div className='w-8 h-8 rounded-full border-2 border-card bg-border flex items-center justify-center text-[10px] font-bold text-text-muted'>JD</div>
          <div className='w-8 h-8 rounded-full border-2 border-card bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand'>AM</div>
          <div className='w-8 h-8 rounded-full border-2 border-card bg-input-bg flex items-center justify-center text-[10px] font-bold text-text-muted'>+{totalAlunos - 2}</div>
        </div>
        <span className='text-xs text-text-muted'>{totalAlunos} alunos inscritos</span>
      </div>

      {hasChamadaAtiva ? (
        <Button 
          onClick={handleEncerrarChamada}
          disabled={isEncerrando}
          icon={<StopCircle size={18}/>} 
          className='py-2.5 bg-error hover:bg-error/90 text-white shadow-error/20 border-error'
        >
          {isEncerrando ? 'Encerrando...' : 'Encerrar Chamada'}
        </Button>
      ) : isReady ? (
        <Button 
          onClick={handleAbrirChamada}
          disabled={isCreating || !configuracao.hasLocation}
          icon={<Radio size={18}/>} 
          className='py-2.5'
        >
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
