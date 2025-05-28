import React, { useEffect} from 'react';
import Hero from '../Header/Hero';
import UrbanActivitiesSection from './UrbanActivitiesSection';
import GymExperienceSection from './GymExperienceSection';
import SocioRutina from './SocioRutina';
import Mapa from '../Mapa';
const Home = () => {
  useEffect(() => {
    const element = document.getElementById('home');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  return (
    <div id='home'>
      <Hero></Hero>
      <GymExperienceSection></GymExperienceSection>
      <SocioRutina></SocioRutina>
      <UrbanActivitiesSection></UrbanActivitiesSection>
      <Mapa></Mapa>
    </div>
  );
};

export default Home;
