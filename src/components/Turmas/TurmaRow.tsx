import { Edit, Trash2, Album, UserPlus, Users } from 'lucide-react';
import type { Turma } from '../../types/turmas.types';

interface TurmaRowProps {
  turma: Turma;
  onEdit: (turma: Turma) => void;
  onDelete: (id: number) => void;
  onAssignProfessor: (turma: Turma) => void;
  onAssignAluno: (turma: Turma) => void;
}

const TurmaRow = ({ turma, onEdit, onDelete, onAssignProfessor, onAssignAluno }: TurmaRowProps) => {

  const getIconColor = (codigo: string) => {
    const colors = [
      { bg: 'bg-brand/10', text: 'text-brand' },
      { bg: 'bg-purple-500/10', text: 'text-purple-500' },
      { bg: 'bg-green-500/10', text: 'text-green-500' },
      { bg: 'bg-orange-500/10', text: 'text-orange-500' },
      { bg: 'bg-blue-500/10', text: 'text-blue-500' },
    ];
    const index = codigo.length % colors.length;
    return colors[index];
  };

  const colors = getIconColor(turma.codigo);

  const formatarData = (dataString?: string) => {
    if (!dataString) return '-';
    const partes = dataString.split('-');
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataString;
  };

  const formatarHorario = (horario?: string) => {
    if (!horario) return '-';
    return horario.substring(0, 5);
  };

  const professores = turma.professores || [];
  const temProfessores = professores.length > 0;
  const primeiroProfessor = temProfessores ? professores[0] : null;
  const maisProfessores = professores.length > 1 ? professores.length - 1 : 0;

  return (
    <tr className='hover:bg-input-bg/50 transition-colors group'>
      <td className='px-6 py-4'>
        <div className='flex items-center gap-3'>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg} ${colors.text}`}>
            {<Album size={20} />}
          </div>
          <div className='relative'>
            <p className='font-bold text-text-main'>{turma.codigo}</p>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 font-medium text-center text-text-muted'>{turma.disciplina_nome}</td>
      <td className='px-6 py-4'>
        {temProfessores ? (
          <div className='flex flex-col items-start gap-0.5'>
            <div className='flex items-center gap-2'>
              <div className='w-7 h-7 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand shrink-0'>
                {primeiroProfessor?.nome?.charAt(0) || '?'}
              </div>
              <span className='text-sm font-medium text-text-main'>
                {primeiroProfessor?.nome || 'Sem nome'}
              </span>
            </div>
            {maisProfessores > 0 && (
              <span className='text-[10px] text-text-muted ml-9'>
                + {maisProfessores} outro(s) professor(es)
              </span>
            )}
          </div>
        ) : (
          <span className='text-sm text-text-muted italic'>Nenhum professor</span>
        )}
      </td>
      <td className='px-6 py-4 font-medium text-center text-text-muted'>{turma.semestre}</td>
      <td className='px-6 py-4 font-medium text-center text-text-muted'>{turma.ano}</td>
      <td className='px-6 py-4 font-medium text-center text-text-muted'>{formatarHorario(turma.horario)}</td>
      <td className='px-6 py-4 font-medium text-center text-text-muted'>{formatarData(turma.data_inicio)} {formatarData(turma.data_fim)}</td>
      <td className='px-3 py-3 text-right'>
        <div className='flex items-center justify-end gap-2 group-hover:opacity-100 transition-opacity'>
          <button
            onClick={() => onAssignProfessor(turma)}
            className='p-1.5 hover:bg-blue-500/10 text-blue-500 rounded-lg transition-colors cursor-pointer' 
            title='Vincular / Alterar Professor'
          >
            <UserPlus size={18} />
          </button>
          <button
            onClick={() => onAssignAluno(turma)}
            className='p-1.5 hover:bg-blue-500/10 text-blue-500 rounded-lg transition-colors cursor-pointer' 
            title='Matricular Aluno'
          >
            <Users size={18} />
          </button>
          <button
            onClick={() => onEdit(turma)}
            className='p-2 hover:bg-brand/10 text-brand rounded-lg transition-colors cursor-pointer' title='Editar'>
            <Edit size={18} />
          </button>
          <button 
            onClick={() => onDelete(turma.id)}
            className='p-2 hover:bg-error/10 text-error rounded-lg transition-colors cursor-pointer' title='Excluir'>
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TurmaRow;
