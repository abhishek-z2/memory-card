const Score = ({score}) => {
    return ( 
        <div className="score-board">
            <p>Current Score:{score.currentScore||''}</p>
            <p>Best Score:<span className="best-score">{score.bestScore||''}</span></p>
        </div>
     );
}
 
export default Score;