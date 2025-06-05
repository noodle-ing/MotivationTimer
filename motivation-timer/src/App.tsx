import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [name, setName] = useState('');
    const [seconds, setSeconds] = useState(10);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const motivationPhrases: string[] = ["you can do it!", "NEVER GIVE UP", "I believe in you", "dont stop bro"];
    const [motivation, setMotivation] = useState("");

    const startTimer = () => {
        setIsRunning(true);
        setIsFinished(false);
        setSeconds(10);
    };

    const handleReset = () => {
        setIsRunning(false);
        setIsFinished(false);
        setSeconds(10);
        setName('');
        setMotivation("");
    };

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (isRunning && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prev => prev - 1);

                const randomIndex = Math.floor(Math.random() * motivationPhrases.length);
                setMotivation(motivationPhrases[randomIndex]);
            }, 1000);
        } else if (seconds === 0 && isRunning) {
            setIsRunning(false);
            setIsFinished(true);
            setMotivation("");
        }

        return () => clearInterval(interval);
    }, [isRunning, seconds]);

    return (
        <div className="container">
            <h1>Timer Motivator</h1>

            {!isRunning && !isFinished && (
                <>
                    <input
                        type="text"
                        placeholder="input name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button onClick={startTimer} disabled={isRunning || name.trim() === ''}>
                        {isFinished ? "Try again" : "Start timer"}
                    </button>
                </>
            )}

            {isRunning && <h2>{name}: {seconds} seconds left</h2>}

            {isRunning && (
                <p><i>{motivation}</i></p>
            )}

            {isFinished && (
                <div>
                    <h2>You did that, {name} 💪</h2>
                    <button onClick={handleReset}>Try again</button>
                </div>
            )}
        </div>
    );
}

export default App;
