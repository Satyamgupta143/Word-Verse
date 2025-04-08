import { useEffect, useRef, useState } from 'react';
import backgroundMusic from './sound/bgmusic.mp3';
import './Components.css';

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [ isPlaying, setIsPlaying ] = useState( false );

  useEffect(() => {
    const playAudio = () => {
      const playPromise = audioRef.current.play();
      if ( playPromise !== undefined ) {
        playPromise
          .then( () => {
            setIsPlaying( true );
          } )
          .catch( error => {
            setIsPlaying( false );
          } ) ;
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('canplay', playAudio);
      return () => {
        audioRef.current.removeEventListener('canplay', playAudio);
      } ;
    }
  }, [] ) ;

  const handleToggleMusic = () => {
    if ( isPlaying ) {
      audioRef.current.pause();
      setIsPlaying( false );
    } else {
      audioRef.current.play().then( () => setIsPlaying( true ) ) ;
    }
  } ;

  return (
    < div className = "background-music-footer" >
      < audio ref = { audioRef } src = { backgroundMusic } loop >
        Your browser does not support the audio element.
      </ audio >
      < button className = 'musicPlay' onClick = { handleToggleMusic } >
        { isPlaying ? 'Stop Music' : 'Play Music' }
      </ button >
    </ div >
  ) ;
} ;

export default BackgroundMusic ;




