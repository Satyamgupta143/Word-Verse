import { useRef, useEffect, useState } from 'react' ;
import BackgroundMusic from './components/backgroundmusic.js' ;
import Navbar from './components/Navbar' ;
import MainContent from './components/MainContent' ;
import Rules from './components/Rules' ;
import About from './components/About' ;
import Footer from './components/Footer' ;
import './components/Components.css' ;
import StartConnection from './websocket' ;

const App = () => {
  const [ ws, setWs ] = useState( null ) ;

  const handleScroll = () => {
    const elements = document.querySelectorAll( '.rules--left-div-w, .rules--right-div-w' ) ;
    elements.forEach( element => {
      const rect = element.getBoundingClientRect() ; 
      if ( rect.top < window.innerHeight && rect.bottom >= 0 ) {
        element.classList.add( 'scroll-in' ) ; 
      } else {
        element.classList.remove( 'scroll-in' ) ;
      }
    } ) ;
  } ;

  useEffect( () => {
    const websocket = StartConnection( 'ws://localhost:8080/ws' ) ;
    setWs( websocket ) ;

    window.addEventListener( 'scroll', handleScroll ) ;
    return () => {
      window.removeEventListener( 'scroll', handleScroll );
      if ( websocket ) {
        websocket.close() ;
      }
    } ;
  } , []) ;

  const landingPageRef = useRef( null ) ;
  const rulesRef = useRef( null ) ;
  const aboutRef = useRef( null ) ;
  const scrollToLandingPage = () => {
    landingPageRef.current.scrollIntoView( { behavior : 'smooth' } ) ;
  } ;

  const scrollToRules = () => {
    rulesRef.current.scrollIntoView( { behavior : 'smooth' } ) ;
  } ;

  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView( { behavior : 'smooth' } ) ;
  } ;

  return (
    < div >
      < Navbar scrollToLandingPage = { scrollToLandingPage } scrollToRules = { scrollToRules } scrollToAbout = { scrollToAbout } />
      < div className = "LandingPage" ref = { landingPageRef } >
        < MainContent ws = { ws } />
      </ div >
      < div className = "wordleGame" ref = { rulesRef } >
        < Rules game = "wordle" />
      </ div >
      < div className = "about" ref = { aboutRef } >
        < About />
      </ div >
      < div className = "footer" >
        < Footer />
        < BackgroundMusic />
      </ div >
    </ div >
  ) ;
} ;

export default App ;