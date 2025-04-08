import { useState } from 'react' ;
import './Components.css' ;
import wordle from './pictures/wordle-rules.png' ;

const RuleButton = ( { title, description, icon, onClick } ) => {
  return (
    < div className = "rule-button" onClick = { onClick } >
      < div className = "rule-icon" >{ icon }</ div >
      < h3 > { title } </ h3 >
      < p > { description } </ p >
      < button className = "play-button" > Rules </ button >
    </ div >
  ) ;
} ;

const RulesModal = ( { show, onClose, title, rules } ) => {

  if (!show) return null;

  return (
    < div className = "modal-overlay" >
      < div className = "modal-content" >
        < h2 > { title } </ h2 >
        < div > { rules } </ div >
        < button className = "close-button" onClick = { onClose } > &times; </ button >
      </ div >
    </ div >
  ) ;
} ;

const wordleRules = (
  < div className = 'rules--wordle' >
    < div className = 'rules--left-div-w' >
      < ol >
        < li >
          < span > Objective: </ span >
          Guess the secret 5-letter word within six attempts.
        </ li >
        < li >
          < span > How to play: </ span >
          < ul >
            < li > Enter a valid 5-letter word as your guess. </ li >
            < li> After each guess, the color of the tiles will change to show how close your guess was to the word. </ li >
          </ ul >
        </ li >
        < li >
          < span > Color Indicators: </ span >
          < ul >
            < li > < span > 😁: </ span > Bingo! The letter is in the secret word and in the right spot. </ li >
            < li > < span > 👍: </ span > So close! The letter is in the secret word but not in the right position. </ li >
            < li >< span > 😭: </ span > Nope! The letter isn’t in the secret word at all. </ li >
          </ ul >
        </ li >
      </ ol >
    </ div >
    < div className = 'rules--right-div-w' >
      < img src = { wordle } alt = 'Banner for wordle game' className = 'rules--right-div-img' />
    </ div > 
  </ div >
) ;

const adversealRules = (
  < div className = 'rules--wordle' >
    < div className = 'rules--left-div-w' >
      < ol >
        < li >
          < span > Objective: </ span >
          Help the computer guess your secret 5-letter word.
        </ li > 
        < li >
          < span > How to play: </ span >
          < ul >
            < li > Start by picking a secret 5-letter word that only you know. </ li >
            < li > The computer will make a guess. Your job is to give it some feedback. </ li >
          </ ul >
        </ li >
        < li >
          < span > Color Indicators: </ span >
          < ul >
            < li >< span > Green (G) : </ span > Bingo! The letter is in the secret word and in the right spot. </ li >
            < li > < span > Yellow (Y): </ span > So close! The letter is in the secret word but not in the right position. </ li >
            < li >< span > Red (R): </ span > Nope! The letter isn’t in the secret word at all. </ li >
          </ ul >
        </ li >
      </ ol >
    </ div >
    < div className = 'rules--right-div-w'>
      < img src = { wordle } alt = 'Banner for adverseal game' className = 'rules--right-div-img' />
    </ div >
  </ div >
) ;

const Rules = () => {
  const [ showModal, setShowModal ] = useState(false);
  const [ currentRules, setCurrentRules ] = useState({});

  const handleButtonClick = ( rules ) => {
    setCurrentRules( rules ) ;
    setShowModal( true ) ;
  } ; 

  const handleCloseModal = () => {
    setShowModal( false ) ; 
  } ;

  return (
    < div className = "rules-section" >
      < h1 > Game Rules </ h1 >
      < div className = "rule-buttons-container" >
        < RuleButton
          title = "Wordle"
          description = "Guess the word"
          icon = "🔠"
          onClick = { () => handleButtonClick( { title : 'Wordle Game Rules', rules : wordleRules } ) }
        />
        < RuleButton
          title = "Adverswordle"
          description = "Let bot guess the word"
          icon = "🤖"
          onClick = { () => handleButtonClick( { title : 'Adverswordle Game Rules', rules : adversealRules } ) }
        />
      </ div >
      < RulesModal
        show = { showModal }
        onClose ={ handleCloseModal }
        title = { currentRules.title }
        rules = { currentRules.rules }
      />
    </ div >
  ) ;
} ;

export default Rules ;