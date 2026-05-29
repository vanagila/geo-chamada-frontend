import { useState } from 'react';
import { Calculator, FlaskConical, Code, Info, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Disciplina {
  id: string;
  nome: string;
  descricao: string;
  codigo: string;
  cargaHoraria: number;
  professor: { nome: string; avatarUrl?: string };
  turmas: string[];
  icon: React.ReactNode;
  iconBgClass: string;
  iconColorClass: string;
}

const mockDisciplinas: Disciplina[] = [
  { id: '1', nome: 'Cálculo I', descricao: 'Estudo de limites, derivadas e integrais...', codigo: 'MAT101', cargaHoraria: 60, professor: { nome: 'Dr. Ricardo Silva', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM1FzkroP5tpXYcZlj_h29KFQoucadNhKDLYtq5LQ9Tnod5I3WEeWX0BzsDh4Ak-yY1psOd8QU7TPAi1XlptZwhiVucUaiYAi_NWjK4IeqLsrKrQn3Z1cmNtpwZjPUzHa3WXG_ttWaqxyVDbyC8b5pEJv3wk4dsZjDAEOZfGDWSvT7GuhuqslsS1Ma-sw8Lg3CTT5S87USHiOrwt-ZB83BvtXWOHVG2MKLGCTopk6P5Og_-m79HeqTO3OKkWZxQ1ENtSq-YobbB24' }, turmas: ['T01', 'T02'], icon: <Calculator size={20} />, iconBgClass: 'bg-brand/10', iconColorClass: 'text-brand' },
  { id: '2', nome: 'Física Geral II', descricao: 'Termodinâmica, oscilações, ondas e fluidos...', codigo: 'FIS202', cargaHoraria: 80, professor: { nome: 'Dra. Amanda Costa', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwAPdCfRgUTo7YMV_6LoIZRrcgu0bVIGH1ZAQ-jTlzbWMPyRnMyA264wTeoC-Tfbkmnp0AFrNt7c81DmC1A7jdqDM2awcXFiICMO_ruV-W8J1A0Zz94VtBfaeYe9F6rkpO-3TGpUtv7SO1ibfUeplZBe2CDawwiNKF_OuZ_p-8NYtB1452uUf7HZ0FmTyJ0TdE6ZeHpK0eH4-797uuKpzqtgHzMdnUoGE1fFRpDil7Hf3UAIOwSmiCN3Zeyva_2e2YmQ4kSzRMrdU' }, turmas: ['T05'], icon: <FlaskConical size={20} />, iconBgClass: 'bg-purple-500/10', iconColorClass: 'text-purple-500' },
  { id: '3', nome: 'Algoritmos e Estruturas', descricao: 'Lógica de programação e análise de complexidade...', codigo: 'CC103', cargaHoraria: 60, professor: { nome: 'Prof. Marcelo Souza', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGmFd-uLzlByohW61RxfYoCQr24AdDHhVnCQp9Y5vnSDO0V8Zzxe9gkFrkQt9vhbnvc1OhrvqCxdGrbXynDr-F2NyuwfBy73Uo8AQsgEGw5lnleBzfczTeqTHyUQbr-yrdwp5-ZNhzwqR78dH-CK8ryO4he2FkMR0GkGAcfkzdaHKOpNN5cKKGqKTFS6bjSk24HnjBgG-aEqfoBjpDULjuLMZ2XY1MTdCw5pN9LaXy5zGeD4vbx3osCSy3gYHe5YytRaHsQJ1Vth4' }, turmas: ['T01', 'T03', 'T04'], icon: <Code size={20} />, iconBgClass: 'bg-success/10', iconColorClass: 'text-success' }
];

const DisciplinaRow = ({ disciplina }: { disciplina: Disciplina }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <tr className='hover:bg-input-bg/50 transition-colors group'>
      <td className='px-6 py-4'>
        <div className='flex items-center gap-3'>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${disciplina.iconBgClass} ${disciplina.iconColorClass}`}>
            {disciplina.icon}
          </div>
          <div className='relative'>
            <p className='font-bold text-text-main'>{disciplina.nome}</p>
            <button 
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className='text-xs font-medium text-brand hover:underline cursor-pointer flex items-center gap-1 mt-0.5'
            >
              Ver descrição
              <Info size={12} />
            </button>
            {showTooltip && (
              <div className='absolute z-20 top-full left-0 mt-2 w-64 p-3 bg-card-dark text-white rounded-lg text-xs shadow-xl border border-border-dark'>
                {disciplina.descricao}
              </div>
            )}
          </div>
        </div>
      </td>
      <td className='px-6 py-4 font-medium text-text-muted'>{disciplina.codigo}</td>
      <td className='px-6 py-4 text-center'>
        <span className='px-2.5 py-1 rounded-md bg-input-bg text-text-muted text-xs font-bold uppercase border border-border'>
          {disciplina.cargaHoraria}h
        </span>
      </td>
      <td className='px-6 py-4'>
        <div className='flex items-center gap-2'>
          {disciplina.professor.avatarUrl ? (
            <div className='w-6 h-6 rounded-full overflow-hidden bg-border'>
              <img src={disciplina.professor.avatarUrl} alt={disciplina.professor.nome} className='w-full h-full object-cover' />
            </div>
          ) : (
            <div className='w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand'>
              {disciplina.professor.nome.charAt(0)}
            </div>
          )}
          <span className='text-sm text-text-muted'>{disciplina.professor.nome}</span>
        </div>
      </td>
      <td className='px-6 py-4'>
        <div className='flex items-center justify-center gap-1 flex-wrap'>
          {disciplina.turmas.map(turma => (
            <span key={turma} className='px-2 py-1 flex items-center justify-center rounded border border-border bg-card text-text-muted text-xs font-medium shadow-sm'>
              {turma}
            </span>
          ))}
        </div>
      </td>
      <td className='px-6 py-4 text-right'>
        <div className='flex items-center justify-end gap-2 group-hover:opacity-100 transition-opacity'>
          <button className='p-2 hover:bg-brand/10 text-brand rounded-lg transition-colors cursor-pointer' title='Editar'>
            <Edit size={18} />
          </button>
          <button className='p-2 hover:bg-error/10 text-error rounded-lg transition-colors cursor-pointer' title='Excluir'>
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

const DisciplinesTable = () => {
  return (
    <div className='bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col'>
      <div className='overflow-x-auto'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='bg-input-bg border-b border-border'>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider'>Nome</th>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider'>Código</th>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-center'>Carga Horária</th>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider'>Professor Responsável</th>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-center'>Turmas</th>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-right'>Ações</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-border'>
            {mockDisciplinas.map((disciplina) => (
              <DisciplinaRow key={disciplina.id} disciplina={disciplina} />
            ))}
          </tbody>
        </table>
      </div>
      
      <div className='px-6 py-4 bg-input-bg/50 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border'>
        <p className='text-xs text-text-muted'>
          Mostrando <span className='font-bold text-text-main'>1-3</span> de <span className='font-bold text-text-main'>24</span> disciplinas
        </p>
        <div className='flex items-center gap-1'>
          <button className='p-1.5 hover:bg-border rounded-lg text-text-muted disabled:opacity-50 transition-colors' disabled>
            <ChevronLeft size={18} />
          </button>
          <button className='w-8 h-8 flex items-center justify-center rounded-lg bg-brand text-white text-sm font-bold shadow-sm transition-all cursor-pointer'>1</button>
          <button className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-border text-text-muted text-sm font-medium transition-all cursor-pointer'>2</button>
          <span className='px-1 text-text-muted'>...</span>
          <button className='p-1.5 hover:bg-border rounded-lg text-text-muted transition-colors cursor-pointer'>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DisciplinesTable;
