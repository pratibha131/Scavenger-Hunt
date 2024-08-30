import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import users from '../data/users.json';

const LoginPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
  flex-direction: column;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events: none;
  preload: auto;

  @media (max-width: 768px) {
    left: 25%; 
    transform: translate(-25%, -50%);
  }

  @media (max-width: 480px) {
    left: 20%; 
    transform: translate(-20%, -50%);
  }
`;

const HorrorHeading = styled.h1`
  font-family: 'Creepster', cursive;
  font-size: 6rem;
  margin-bottom: 2rem;
  color: #DAA520;
  text-shadow: 2px 2px 8px black;
  position: absolute;
  top: 0.7rem;
  z-index: 3;
  text-align: center;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 4rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
  }
`;

const LoginForm = styled(motion.form)`
  position: relative;
  z-index: 3;
  margin-top: 5rem;
  background: url('${process.env.PUBLIC_URL}/images/bg-paper.jpg') no-repeat center center;
  background-size: cover;
  padding: 2rem;
  border-radius: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 80%;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    width: 70%;
    padding: 1rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;

  @media (max-width: 480px) {
    padding: 0.6rem;
  }
`;

const Button = styled(motion.button)`
  padding: 0.8rem 1.2rem;
  margin-top: 1rem;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #333;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userArray = users.db_users;

    const user = userArray.find(u => u.email === email && u.password === password);

    if (user) {
        navigate('/profile', { state: { user } });
    } else {
        setError('Invalid email or password');
    }
};

  return (
    <LoginPageWrapper>
      <BackgroundVideo
        src={`${process.env.PUBLIC_URL}/videos/bg.mp4`}
        autoPlay
        muted
        loop
      />
      <HorrorHeading>Scavenger Hunt</HorrorHeading>
      <LoginForm 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <h2>Login</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          Login
        </Button>
        {error && <p style={{ fontFamily: 'Creepster, cursive', color: 'red' }}>{error}</p>}
      </LoginForm>
    </LoginPageWrapper>
  );
};

export default LoginPage;
