import Confetti from 'react-confetti' ;
import './css/celebration.css' ;

const Celebration = ( { isActive, gameType } ) => {
  return isActive ? (
    < div >
      < Confetti />
      < div className = "celebration-popup" >
        <h2> Congratulations! </h2>
        < p > { gameType === 'wordle' ? 'You won the game!' : 'I won!' } </ p >
      </ div >
    </ div >
  ) : null ;
} ;

export default Celebration;
