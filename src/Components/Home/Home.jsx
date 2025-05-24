import React from 'react';
import Hero from '../Header/Hero';
import UrbanActivitiesSection from './UrbanActivitiesSection';
import GymExperienceSection from './GymExperienceSection';
const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <GymExperienceSection></GymExperienceSection>
      <UrbanActivitiesSection></UrbanActivitiesSection>
    </div>
  );
};

export default Home;
