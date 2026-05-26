import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const TeacherDashboard = () => {
  return (
    <div className='flex flex-col h-screen overflow-hidden bg-app-bg font-sans'>
      <Header/>

      <div className='flex flex-1 overflow-hidden'>
        <Sidebar/>
      </div>
    </div>
  );
}

export default TeacherDashboard;
