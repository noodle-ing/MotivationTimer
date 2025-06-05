import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('');
  const [seconds, setSeconds] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const motivationPhrases: string[] = ["you can do it!", "NEVER GIVE UP", "I believe in you", "dont stop bro"];
  const [motivation, setMotivation] = useState("");

    useEffect(() => {
        let interval: number | undefined;
        if(isRunning && seconds > 0){
            interval = setInterval(() => {
                setSeconds(prev => prev - 1);
                const randomIndex = Math.floor(Math.random() * motivationPhrases.length);
                setMotivation(motivationPhrases[randomIndex]);
            }, 1000);
        }

        if (seconds === 0 && isRunning) {
            clearInterval(interval);
            setIsRunning(false);
            setIsFinished(true);
        }
        if (seconds === 0 && isRunning) {
            clearInterval(interval);
            setIsRunning(false);
            setIsFinished(true);
        }

        return () => clearInterval(interval);
    }, [isRunning, seconds]);

    const handleStart = () => {
        setIsRunning(true);
        setIsFinished(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setIsFinished(false);
        setSeconds(10);
        setName('');
    };



  return (
    <div className="container">
        <h1>Timer Motivator</h1>
        {!isRunning && !isFinished && (
            <>
                <input type="text"
                placeholder="input name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />

                <button onClick={handleStart} disabled={!name}>
                    Timer start
                </button>
            </>
        )}

        {isRunning && <h2>{seconds} seconds left</h2>}
        {isFinished && (
            <div>
                <h2>You got it, {name} 💪</h2>
            </div>
        )}

        {isRunning && (
            <p><i>{motivation}</i></p>
        )}

        {(isRunning || isFinished) && (
            <button onClick={handleReset}>Reset</button>
        )}

    </div>
  )
}

export default App
