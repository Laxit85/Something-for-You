import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { AmbientBackground } from './components/AmbientBackground';
import { Butterflies } from './components/Butterflies';
import { StoryNavigation } from './components/StoryNavigation';

import { HeroSection } from './sections/HeroSection';
import { LittleNoteSection } from './sections/LittleNoteSection';
import { GoodThingsSection } from './sections/GoodThingsSection';
import { GardenSection } from './sections/GardenSection';
import { SmileChallengeSection } from './sections/SmileChallengeSection';
import { PauseSection } from './sections/PauseSection';
import { PersonalLetterSection } from './sections/PersonalLetterSection';
import { FinalSection } from './sections/FinalSection';
import { audio } from './utils/audio';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    audio.startMusic();
  }, []);

  const handlePreloaderFinish = () => {
    setIsLoading(false);
    audio.startMusic();
  };

  const scrollToNextSection = () => {
    audio.startMusic();
    const noteEl = document.getElementById('note-section');
    if (noteEl) {
      noteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRestartExperience = () => {
    audio.playSparkle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#FFF9F0] text-[#49364F] selection:bg-[#F5DCE5] selection:text-[#49364F] overflow-x-hidden font-sans-body">
      {/* Preloader Experience */}
      {isLoading && <Preloader onFinish={handlePreloaderFinish} />}

      {/* Persistent Ambient Atmosphere */}
      <AmbientBackground />
      <Butterflies />

      {/* Floating Controls */}
      <StoryNavigation />

      {/* Main Storytelling Sections */}
      <main className="relative z-10 w-full">
        {/* 1. Hero & 3D Envelope */}
        <HeroSection onOpenNext={scrollToNextSection} />

        {/* 2. A Little Note for You */}
        <LittleNoteSection />

        {/* 3. A Little Collection of Good Things */}
        <GoodThingsSection />

        {/* 4. The Happiness Garden */}
        <GardenSection />

        {/* 5. A Tiny Smile Challenge */}
        <SmileChallengeSection />

        {/* 6. A Little Pause */}
        <PauseSection />

        {/* 7. A Letter Just for You */}
        <PersonalLetterSection />

        {/* 8. Final Surprise – The Last Little Gift */}
        <FinalSection onRestart={handleRestartExperience} />
      </main>
    </div>
  );
};

export default App;
