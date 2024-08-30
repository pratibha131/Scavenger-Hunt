import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  background: black;
  color: #DAA520;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://wallpaperaccess.com/full/399192.jpg') no-repeat center center/cover;
  opacity: 0.3;
  z-index: 0;
`;

const ProfileCard = styled(motion.div)`
  padding: 2rem;
  border-radius: 10px;
  width: 350px;
  text-align: center;
  z-index: 1;
`;

const HorrorHeading = styled.h1`
  font-family: 'Creepster', cursive;
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #DAA520;
  text-shadow: 3px 3px 10px black;
`;

const ProfileDetail = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
  text-shadow: 2px 2px 5px black;
`;

const AnimatedDetail = styled(motion.div)`
  font-size: 1.2rem;
  margin-top: 1rem;
  text-shadow: 2px 2px 5px black;
`;

const ProfilePage = () => {
  const location = useLocation();
  const { team_name, roll_number, email, contact } = location.state.user;

  return (
    <ProfileWrapper>
      <BackgroundImage />
      <ProfileCard 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <HorrorHeading>Welcome to the Dark Side</HorrorHeading>
        <ProfileDetail><strong>Team Name:</strong> {team_name}</ProfileDetail>
        <ProfileDetail><strong>Roll Number:</strong> {roll_number}</ProfileDetail>
        <ProfileDetail><strong>Email:</strong> {email}</ProfileDetail>
        <ProfileDetail><strong>Contact:</strong> {contact || "N/A"}</ProfileDetail>
        
        <AnimatedDetail
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <strong>Are you ready for the hunt?</strong>
        </AnimatedDetail>
      </ProfileCard>
    </ProfileWrapper>
  );
};

export default ProfilePage;
