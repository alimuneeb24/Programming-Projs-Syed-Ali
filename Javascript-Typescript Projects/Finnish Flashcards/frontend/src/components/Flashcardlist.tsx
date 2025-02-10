import React from "react";
import Flashcard from "./Flashcard";
import { FlashcardData } from "../data/flashcards";

interface Flashcardlistprops{
    flashcards: FlashcardData[];
    currentindex: number;
}

const Flashcardlist: React.FC<Flashcardlistprops> = ({flashcards, currentindex}) =>{
    return(
        <div style={{display:'flex', flexWrap:'wrap', gap:'10px', justifyContent:'center', marginTop:'20px'}}>
            {flashcards.map((flashcard)=> (
                <Flashcard key={flashcard.id} flashcard={flashcard} currentIndex={currentindex}  />
            ))}
        </div>
    )
}

export default Flashcardlist;