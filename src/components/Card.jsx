const Card = ({name,imageURL,onClick}) => {
    return ( 
        <div className="card" onClick={onClick}>
            <img src={imageURL} alt={`image of ${name}`} />
            <p className="card-name">{name}</p>
        </div>
     );
}
 
export default Card;
