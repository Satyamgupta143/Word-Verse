import { useState } from 'react';
import landingbanner from './pictures/landing-banner.jpg' ;
import './Components.css' ;
import Chatbot from '../botcomponents/Chatbot.js' ;
import clickSound from './sound/sound_click.wav' ;

function MainContent( { ws } ) {
  const [ isChatbotVisible, setChatbotVisible ] = useState( false ) ;
  const handlePlayNowClick = () => {
    const audio = new Audio(clickSound) ;
    audio.play() ;
    setChatbotVisible ( true ) ;
  } ;
  const handleCloseChatbot = () => {
    setChatbotVisible ( false ) ;
  } ;
    return (
      < div className = 'mainContent' >
        < div className = 'left-div' >
            < h1 > Welcome to WordVerse </ h1 >
            < p className = 'about---game' > Dive in the world of words. </ p >
            < button className ='playNow' onClick = { handlePlayNowClick } > PLAY NOW </ button >
            < Chatbot isVisible = { isChatbotVisible } onClose = { handleCloseChatbot } ws = { ws } />
        </ div >
        < div className = "right-div" >
            < img src = {landingbanner} alt = "Landing Banner" className = 'landingImg'/>
        </ div >
      </ div >
    )
  }
export default MainContent ;