import './Components.css' ;
import clickSound from './sound/sound_click.wav' ;

const Navbar = ( {  scrollToLandingPage, scrollToRules, scrollToAbout } ) => {

    const playClickSound = () => {
      const audio = new Audio(clickSound);
      audio.play();
    };

    const handleClick = (scrollFunction) => {
      playClickSound();
      scrollFunction();
    };

    return (
      < nav className = 'nav-items' >
        < div className = "logo" >
          < h3 > WordVerse </ h3 >
        </ div >
        < ul className = 'nav---list' >
          < li onClick = { () => handleClick( scrollToLandingPage ) } > HOME </ li >
          < li onClick = { () => handleClick(scrollToRules) } > RULES </ li >
          < li onClick = { () => handleClick(scrollToAbout) }> ABOUT </ li >
        </ ul >
      </ nav >
    ) ;
  } ;

export default Navbar ;