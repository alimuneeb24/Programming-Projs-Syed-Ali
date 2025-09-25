import React, {useEffect, useState} from "react";
import { FlashcardData } from "../data/flashcards";

interface Flashcardprops{
    flashcard: FlashcardData;
    currentIndex: number;
}

const Flashcard: React.FC<Flashcardprops> = ({flashcard, currentIndex}) => {
    const [isFlipped, setisFlipped] = useState(false)

    useEffect(() => {
        setisFlipped(false);
    }, [currentIndex])

    return(
        <div onClick={() => setisFlipped(!isFlipped)}
            style={{
                width: "250px",
                height: "150px",
                border: "1px solid black",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                fontSize:"20px",
                background: isFlipped ? "#fffa65" : "#a8dadc",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                margin:"auto"
            }}
        >
            {isFlipped? flashcard.translation : flashcard.word}
        </div>
    )
}

export default Flashcard;