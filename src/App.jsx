import MemoryCard from "./components/MemoryCard"
import Header from "./components/Header";
import CryptoJS from "crypto-js";
import { useState,useEffect } from "react"


const App = () => {
    const [score,setScore] = useState({currentScore:0,bestScore:0});
    const [images,setImages] = useState([]);
    const [clickedCards,setClickedCards] = useState([]);
    const [loading,SetLoading] = useState(false);

    const publicKey = import.meta.env.VITE_PUBLIC_API_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_API_KEY;
    const ts = Date.now().toString();
    const hash = CryptoJS.MD5(ts+privateKey+publicKey).toString();
    const API_URL = `https://gateway.marvel.com/v1/public/characters?limit=20&ts=${ts}&apikey=${publicKey}&hash=${hash}&series=24229`;

    

    useEffect(()=>{
        const fetchImages = async ()=>{
            try{
                SetLoading(true);
                const response = await fetch(API_URL);
                const data = await response.json();
                const filteredImages = data.data.results 
                    .filter((image)=> !image.thumbnail.path.includes("image_not_available"))
                    .slice(0,12);
                SetLoading(false)
                setImages(filteredImages);
                
            } catch(error){
                console.log("Error fetching images:",error);
            }
        }
        fetchImages();
        
    },[]);

    const shuffleCards = (cards) => {
        let shuffled = [...cards]; 
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
        }
        console.log('shuffled')
        setImages(shuffled);
      };

    const handleCardClick = (targetID)=>{
        if(clickedCards.some((card)=> card.id===targetID)){
            setScore((prevScore)=>({
                ...prevScore,
                bestScore:Math.max(prevScore.bestScore,prevScore.currentScore),
                currentScore:0
            }));
            setClickedCards([]);
        } else {
            setScore((prevScore)=>({
                ...prevScore,
                currentScore: prevScore.currentScore+1
            }));
            setClickedCards((prevClickedCards)=>[...prevClickedCards,{id:targetID}]);

        }

        shuffleCards(images)
    }

    return ( 
        <>  
            <Header score={score} />
            {loading? <div className="loading-container">
                <div className="loader"></div>
            </div>:<MemoryCard images={images} score={score} clickedCards={clickedCards} handleCardClick={handleCardClick}/>}
            <p style={{textAlign:'center',color:'white'}}>Data provided by Marvel. © 2014 Marvel</p>
        </>
     );
}
 
export default App;