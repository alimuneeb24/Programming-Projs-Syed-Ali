import React, { use, useEffect, useState} from "react";
import { FlashcardData, categories } from "./data/flashcards";
import Flashcard from "./components/Flashcard";
import ProgressBar from "./components/ProgressBar";

const App: React.FC = () =>{
    const [selectedCategory, setselectedCategory] = useState<string | null>(null);
    const [shuffledCards, setshuffledCards] = useState<FlashcardData[]>([]);
    const [currentIndex, setcurrentIndex] = useState(0)
    const [showtranslation, setshowtranslation] = useState(false)
    const [points, setPoints] = useState(0)
    const [darkMode, setdarkMode] = useState(false)

    const toggleDarkMode = () => {
        setdarkMode(!darkMode)
        document.documentElement.setAttribute("data-theme", darkMode ? "Light Mode" : "Dark Mode")
    }

    const shuffleArray = (array: FlashcardData[]): FlashcardData[] => {
        return[...array].sort(() => Math.random() - 0.5)
    }
    const handlecategorySelect = (category: string) => {
        setselectedCategory(category);
        setshuffledCards(shuffleArray(categories[category]))
        setcurrentIndex(0)
        setshowtranslation(false)
        setPoints(0)
    }
    useEffect(() => {
        if(selectedCategory){
            setshuffledCards(shuffleArray(categories[selectedCategory]))
            setcurrentIndex(0)
            setshowtranslation(false)
            setPoints(0)
        }
    }, [selectedCategory])
    const handlenextCard = (isCorrect: boolean) => {
        if (isCorrect){
            setPoints((prev) => prev +1)
        }
        if (currentIndex < shuffledCards.length -1){
            setcurrentIndex(currentIndex+1)
            setshowtranslation(false)
        }
        else{
            alert("You have completed this category!🎉 Shuffling again...")
            setshuffledCards(shuffleArray(shuffledCards))
            setcurrentIndex(0)
            setshowtranslation(false)
            setPoints(0)
        }
    }
    const handleShuffle = () => {
        setshuffledCards(shuffleArray(shuffledCards))
        setcurrentIndex(0)
        setshowtranslation(false)
        setPoints(0)
    }
    
    return(
        <div className="appcontainer">
          <h1>Learn Finnish Through Flashcard</h1>
          <h3>Select your category and start learning! :)</h3> 

          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {darkMode ? "Light Mode":"Dark Mode"}
          </button>

          {/*Category selection button*/}
          {!selectedCategory && (
            <div>
            {Object.keys(categories).map((category) => (
                <button key={category} onClick={() => handlecategorySelect(category)}>
                    {category}
                </button>
            ))}
          </div>
          )}
          {/*change category*/}
          {selectedCategory && (
            <button onClick={() => setselectedCategory(null)} className="change-category">
                Change Category 🔄
            </button>
          )}
          {/*progress bar*/}
          {selectedCategory && (
            <ProgressBar currentIndex={currentIndex} total={shuffledCards.length} />
          )}
          {selectedCategory && <h2>Points: {points}</h2>}

          {/*show flashcards one at a time + controls*/}
          {selectedCategory && shuffledCards.length > 0 && (
            <div className="flashcard-container">
                <Flashcard 
                flashcard={shuffledCards[currentIndex]} 
                currentIndex={currentIndex}/>
                <div className="buttons-container">
                    <button onClick={() => handlenextCard(false)} className="wrong">
                        You got it wrong ❌
                    </button>
                    <button onClick={() => handlenextCard(true)} className="success">
                        You got it right! ✅
                    </button>
                    <button onClick={handleShuffle} className="shuffle">
                        Shuffle 🔄
                    </button>
                </div>
            </div>
          )}
        </div>
    )
}

export default App;