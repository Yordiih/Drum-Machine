import React, { useState, useEffect } from 'react';
import './App.css';
import { AudioClip } from './types';

const audioClips: AudioClip[] = [
  {
    keyTrigger: 'Q',
    description: 'Heater 1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyTrigger: 'W',
    description: 'Heater 2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyTrigger: 'E',
    description: 'Heater 3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyTrigger: 'A',
    description: 'Heater 4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyTrigger: 'S',
    description: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyTrigger: 'D',
    description: 'Open HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyTrigger: 'Z',
    description: 'Kick n\' Hat',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyTrigger: 'X',
    description: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyTrigger: 'C',
    description: 'Closed HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

function Drum({ audioClip, handleDisplay }: { audioClip: AudioClip; handleDisplay: (description: string) => void }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key.toUpperCase() === audioClip.keyTrigger) {
        triggerAudio();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [audioClip.keyTrigger]);

  const triggerAudio = () => {
    const audio = document.getElementById(`audio-${audioClip.keyTrigger}`) as HTMLAudioElement;
    audio.currentTime = 0;
    audio.play();
    setActive(true);
    handleDisplay(audioClip.description);
    setTimeout(() => setActive(false), 200);
  };

  const handleClick = () => {
    triggerAudio();
  };

  return (
    <button
      className={`drum-pad ${active ? 'active' : ''}`}
      id={`drum-${audioClip.keyTrigger}`}
      onClick={handleClick}
    >
      {audioClip.keyTrigger}
      <audio className="clip" id={`audio-${audioClip.keyTrigger}`} src={audioClip.url} />
    </button>
  );
}

function App() {
  const [display, setDisplay] = useState('');

  const handleDisplay = (description: string) => {
    setDisplay(description);
  };

  return (
    <React.Fragment>
    <div className="container" id="drum-machine">
      <div className="whole-drum">
        {audioClips.map((clip) => (
          <Drum audioClip={clip} key={clip.keyTrigger} handleDisplay={handleDisplay} />
        ))}
      </div>

      <div id="display">{display}</div>
    </div>
    </React.Fragment>
  );
}

export default App;