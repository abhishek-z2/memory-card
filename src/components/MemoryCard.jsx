import Card from "./Card";


const MemoryCard = ({images,score,handleCardClick}) => {


    function getImageURL(image){
        const path = image.thumbnail.path;
        const extension = image.thumbnail.extension;
        const variant = 'standard_xlarge';

        return `${path}/${variant}.${extension}`;
    }
    return ( 
        <div className="memory-card">
           {images.map((image)=>(
               <Card  
                    key={image.id} 
                    imageURL={getImageURL(image)}  
                    name={image.name} 
                    onClick={()=>handleCardClick(image.id)} 
                />
           ))}
        </div>
     );
}
 
export default MemoryCard;