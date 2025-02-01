import Score from "./Score";

const Header = ({score}) => {
    return ( 
        <div className="top-window">
            <div className="header">
                <h1>
                    The Memory Card
                </h1>
                <p>Score by clicking on a card. Do not click a card that is already clicked!</p>
            </div>
            <Score score={score} />
        </div>
     );
}
 
export default Header;