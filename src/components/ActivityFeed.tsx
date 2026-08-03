import { UserCheck, UserPlus, AlertTriangle, Edit } from 'lucide-react'

const ActivityFeed = () => {
  return (
    <div className='bg-card p-6 rounded-lg border border-border shadow-sm flex flex-col'>
      <h4 className='text-lg font-bold text-text-main mb-6'>Atividade Recente</h4>
        <div className='space-y-6 flex-1'>
          <div className='flex gap-4'>
            <div className='w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0 text-success'>
              <UserCheck size={16}/>
            </div>
            <div>
              <p className='text-sm text-text-main font-medium'>Chamada concluída</p>
               <p className='text-xs text-text-muted mt-1'>Matemática - Prof. Ricardo • 10:30</p>
            </div>
          </div>
          <div className='flex gap-4'>
            <div className='w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0 text-brand'>
              <UserPlus size={16}/>
            </div>
            <div>
              <p className='text-sm text-text-main font-medium'>Novo aluno registrado</p>
              <p className='text-xs text-text-muted mt-1'>Ana Clara Santos - Turma B • 09:15</p>
            </div>
          </div>
          <div className='flex gap-4'>
            <div className='w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center shrink-0 text-warning'>
              <AlertTriangle size={16}/>
            </div>
            <div>
              <p className='text-sm text-text-main font-medium'>Alerta de falta</p>
              <p className="text-xs text-text-muted mt-1">5 alunos ausentes em História • 08:45</p>
            </div>
          </div>
          <div className='flex gap-4'>
            <div className='w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 text-purple-500'>
              <Edit size={16}/>
            </div>
            <div>
              <p className='text-sm text-text-main font-medium'>Horário atualizado</p>
              <p className='text-xs text-text-muted mt-1'>Turma 301 - Sala alterada • Ontem</p>
            </div>
          </div>
        </div>
        <button className='w-full mt-6 py-2 text-brand font-bold text-sm bg-brand/5 rounded-lg hover:bg-brand/10 transition-colors cursor-pointer'>
          Ver tudo
        </button>
    </div>
  );
}

export default ActivityFeed;
