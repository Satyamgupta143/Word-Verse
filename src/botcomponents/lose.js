import './css/lose.css' ;

const Lost = ( { isActive, gameType } ) => {
    return isActive ? (
        < div className="lose-popup" >
            < h2 > Oh no! </ h2 >
            < p > { gameType === 'wordle' ? 'You lost the game!' : 'I lost!' }</ p >
        </ div >
    ) : null ;
  } ;
  
  export default Lost ;
