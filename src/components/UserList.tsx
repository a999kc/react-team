import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserList.css'

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://reqres.in/api/users');
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId: number) => {
    if (token) {
      navigate(`/users/${userId}`);
    } else {
      alert('Для просмотра информации о пользователе необходимо авторизоваться.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <>
      <div className="user-list-up">
        <h2 className="user-list-title">Наша команда</h2>
        <p className="user-list-paragraph">
            Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи,
            и умеющие находить выход из любых, даже самых сложных ситуаций. 
        </p>
        {token && <button className="logout-button" onClick={handleLogout}>Выйти</button>}
      </div>
      <div className="user-list">
        {users.map(user => (
          <div key={user.id} className="user-card" onClick={() => handleUserClick(user.id)}>
            <img className="user-card-avatar" src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
            <p className="user-card-name">{user.first_name} {user.last_name}</p>
            <p className="user-card-email">{user.email}</p>
          </div>
        ))}
      </div>
      
    </>
  );
};

export default UsersList;
