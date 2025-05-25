import React from 'react';
import Hero from '../Header/Hero';
import UrbanActivitiesSection from './UrbanActivitiesSection';
import GymExperienceSection from './GymExperienceSection';
import SocioRutina from './SocioRutina';
const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <SocioRutina></SocioRutina>
      <GymExperienceSection></GymExperienceSection>
      <UrbanActivitiesSection></UrbanActivitiesSection>
    </div>
  );
};

export default Home;
