import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import{ LogoutButton, LogoutIcon, ReturnButton, ReturnIcon} from './Buttons';
import './UserSingle.css';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UserSingle: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`);
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Загрузка...</div>;
  }

  const returnButtonHandler = () => {
    navigate("/users")
  }

  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  }

  return (
    <>
    <header className="user-single-header">
      <div className="return-button-container">
        <ReturnButton onClick={returnButtonHandler} />
      </div>
      <div className="return-icon-container">
        <ReturnIcon onClick={returnButtonHandler} />
      </div>
      <div className="user-details">
        <img className="user-avatar" src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
        <h2 className="user-name">{user.first_name} {user.last_name}</h2>
        <p className="user-email">{user.email}</p>
        
      </div>
      <div className="logout-button-container">
        <LogoutButton onClick={logoutHandler} />
      </div>
      <div className="logout-icon-container">
        <LogoutIcon onClick={logoutHandler} />
      </div>
    </header>
    <p className="user-single-paragraph">
      Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, 
      включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. 
      Он помогает клиентам лучше понимать структуру рисков их бизнеса, 
      улучшать процессы за счет применения новейших технологий и увеличивать продажи, 
      используя самые современные аналитические инструменты.
      <br></br>
      <br></br>
      В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями. 
      Не менее важно уделять внимание обмену знаниями: 
      "Один из самых позитивных моментов — это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, 
      уверенность в том, что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".
      <br></br>
      <br></br>
      Помимо разнообразных проектов для клиентов финансового сектора, 
      Сорин ведет активную предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, 
      предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов
    </p>
    </>
  );
};

export default UserSingle;
