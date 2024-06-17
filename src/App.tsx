import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import UserList from './components/UserList';
import UserSingle from './components/UserSingle';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/users" element={<UserList/>} />
        <Route path="/users/:userId" element={<UserSingle />} />
        <Route path="/login" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
};

export default App;

