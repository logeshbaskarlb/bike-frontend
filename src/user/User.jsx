import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";

const User = () => {
    const bikeTimes = {
        "Bike 1": 50,
        "Bike 2": 60,
        "Bike 3": 80
    };

    const [selectedBike, setSelectedBike] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isCountdownActive, setIsCountdownActive] = useState(false);
    const timerRef = useRef(null);

    const location = useLocation();

    const username = location.state?.username;

    const handleBikeSelect = async (e) => {

        const bike = e.target.value;

        setSelectedBike(bike);
        setTimeRemaining(bikeTimes[bike] * 60);
        setIsCountdownActive(true);
        // countdown (like stopwatch)
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        try {
            const response = await axios.post('http://localhost:5050/saveBikeSelection', {
                username: username,
                bike: bike,
                startTime: new Date().toISOString()
            });
            console.log("Bike selection saved successfully", response.data);
        } catch (error) {
            console.error("Error saving bike selection:", error.message);
        }
    };

    useEffect(() => {
        if (isCountdownActive) {
            timerRef.current = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerRef.current);
                        setIsCountdownActive(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000); 
        }
        return () => {
            clearInterval(timerRef.current);
        };
    }, [isCountdownActive]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleStopCountdown = async () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        setIsCountdownActive(false);
        setTimeRemaining(0);

        try {
            await axios.post('http://localhost:5050/stopBikeSelection', {
                username: username,
                bike: selectedBike,
                stopTime: new Date().toISOString()
            });
            console.log("Bike selection stopped successfully");
        } catch (error) {
            console.error("Error stopping bike selection:", error.message);
        }

        setSelectedBike("");
    };

    return (
        <div>
            <h1>Select a Bike to Assemble using</h1>
            
            <div className="bike-selection">
                <label htmlFor="bikes">Choose a bike:</label>
                <select id="bikes" onChange={handleBikeSelect} value={selectedBike}>
                    <option value="" disabled>Select a bike</option>
                    <option value="Bike 1">Bike 1</option>
                    <option value="Bike 2">Bike 2</option>
                    <option value="Bike 3">Bike 3</option>
                </select>
            </div>

            {selectedBike && (
                <div className="bike-info">
                    <h2>{selectedBike}</h2>
                    <p>Time to assemble: {formatTime(timeRemaining)}</p>
                    <button onClick={handleStopCountdown}>Stop Countdown</button>
                </div>
            )}
        </div>
    );
};

export default User;


