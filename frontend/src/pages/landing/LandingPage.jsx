import { useState } from 'react'
import './LandingPage.css'
import NavigationBar from '../../components/navigation-bar/NavigationBar'
import LandingCard from '../../components/landing-cards/LandingCard';
import axios from "axios";
import Voila from "./svg/voila.svg";
import Files from "./svg/files.svg";
import Account from "./svg/account.svg";


function LandingPage() {
    const [testThing, setTestThing] = useState([]);
    const [deckName, setDeckName] = useState("Your Deck");
    const [file, setFile] = useState(null)

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const uploadFile = () => {
        const formData = new FormData();
        console.log(file);
        formData.append('file', file);
        console.log(formData);

        axios.post("api/pdf-to-flashcard", formData)
            .then(function (response) {
                console.log("API Response:", response);

                const flashcards = response.data.gpt_results;
                const deck_name = response.data.deck_name;

                // Remove file extension '.pdf' from deck name
                const cleanDeckName = deck_name.replace(/\.[^/.]+$/, "");
                setDeckName(cleanDeckName || "Your Deck");

                if (Array.isArray(flashcards)) {
                    setTestThing(flashcards);  
                } else {
                    setTestThing([]); 
                    console.error("Unexpected data format. Expected array.");
                }
            })
            .catch(function (error) {
                console.log("API Error:", error);
                setTestThing([]);
                setDeckName("Your Deck");
            });
    };

  return (
    <div className='landing-container'>
        <NavigationBar />
        <h2 className="landing-title">Welcome to SmartCard, the new best way to make flashcards!</h2>
        
        <div className='landing-cards'>
            <LandingCard
                imgLink={<img src={Account} alt="Voila" />}
                header="Create an Account"
                paragraph="Sign up to SmartCard by clicking the button below"
            />
            <LandingCard
                imgLink={<img src={Files} alt="Voila" />}
                header="Upload your Notes"
                paragraph="Submit your notes, textbooks, or other schoolwork to SmartCard in PDF format"
            />
            <LandingCard
                imgLink={<img src={Voila} alt="Voila" />}
                header="Voila!"
                paragraph="We automatically create succinct and effective flashcards for you to study"
            />
        </div>

        <button className="signup-button">Sign Up</button>

        <input type="file" onChange={handleFile} />
        <button type="submit" onClick={uploadFile}>Upload</button>

        <h2>Generated Flashcards for {deckName}</h2>
        {Array.isArray(testThing) && testThing.length > 0 ? (
            testThing.map((card, index) => (
                <div key={index} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px"}}>
                    <h3>Q: {card.question}</h3>
                    <p>A: {card.answer}</p>
                </div>
            ))
        ) : (
            <p>No flashcards generated yet.</p>
        )}
    </div>
  )
}

export default LandingPage
