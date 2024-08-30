import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';


const appear = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
`;

const popOut = keyframes`
  from { opacity: 1; transform: translateZ(0); }
  to { opacity: 0; transform: translateZ(-300px); }
`;


const SplashPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('/images/splash.jpg') no-repeat center center;
  background-size: cover;
  color: #DAA520;
  position: relative;
  overflow: hidden;
`;

const SplashTextWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-family: 'Creepster', cursive;
  font-size: 5rem;
  color: #DAA520;
  text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.7);
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Letter = styled.span`
  display: inline-block;
  opacity: 0;
  animation: ${appear} 0.5s forwards;
  animation-delay: ${props => props.delay || '0s'};
  transform: translateZ(0);

  &.pop-out {
    animation: ${popOut} 1s forwards;
  }
`;

const SplashPage = () => {
  const [isPopping, setIsPopping] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const textTimeout = setTimeout(() => {
      setIsPopping(true);
    }, 3000);

    const redirectTimeout = setTimeout(() => {
      navigate('/login');
    }, 4000);

    return () => {
      clearTimeout(textTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  const text = "Hunt for the Treasure";

  const letterElements = text.split('').map((char, index) => (
    <Letter key={index} delay={`${index * 0.1}s`} className={isPopping ? 'pop-out' : ''}>
      {char}
    </Letter>
  ));

  return (
    <SplashPageWrapper>
      <SplashTextWrapper>
        {letterElements}
      </SplashTextWrapper>
    </SplashPageWrapper>
  );
};

export default SplashPage;
