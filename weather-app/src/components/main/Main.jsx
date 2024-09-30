import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

import './main.css';

function Main() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const getCachedWeather = () => {
        const cachedWeather = localStorage.getItem('latestWeather');
        if (cachedWeather) {
            setWeather(JSON.parse(cachedWeather));
            return true;
        }
        return false;
    };

    const updateLastWeatherReports = (newWeather) => {
        const existingReports = localStorage.getItem('lastWeatherReports');
        let updatedReports = [];

        if (existingReports) {
            updatedReports = [newWeather, ...JSON.parse(existingReports)];
        } else {
            updatedReports = [newWeather];
        }

        localStorage.setItem('lastWeatherReports', JSON.stringify(updatedReports));
    };

    const getLatestWeather = async () => {
        try {
            const response = await axios.get('http://localhost:3000/weather/latest');
            setWeather(response.data);

            localStorage.setItem('latestWeather', JSON.stringify(response.data));
        } catch (error) {
            console.error('Error fetching latest weather', error);
        }
    };

    const getWeather = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/weather?city=${city}`);
            setWeather(response.data);

            localStorage.setItem('latestWeather', JSON.stringify(response.data));
            updateLastWeatherReports(response.data);

            setIsAnimating(true);
            setCity('');
        } catch (error) {
            console.error('Error fetching weather data', error);
        }
    };

    useEffect(() => {
        if (!getCachedWeather()) {
            getLatestWeather();
        }
    }, []);

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    const iconUrl = weather && weather.icon
        ? `./src/assets/icons/${weather.icon}.svg`
        : '';

    return (
        <section className='main'>
            <motion.div
                className="main__wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1}}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className={`weather__content ${isAnimating ? 'fade-in' : ''}`}>
                    {weather ? (
                        <>
                            {iconUrl && <img className='weather__icon' src={iconUrl} alt={weather.description} />}
                            <h2 className='weather__title'>{weather.city}</h2>
                            <p className='weather__temp'>{Math.floor(weather.temperature)}°</p>
                            <p className='weather__descr'>{weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}</p>
                        </>
                    ) : (
                        <p className='no-weather'>
                            Enter the name of the city where you want to check the weather and press the button
                        </p>

                    )}
                </div>

                <div className="weather__form">
                    <p>Enter the city</p>

                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Start entering the name of the city"
                    />

                    <button onClick={getWeather}>Submit</button>

                    <Link to="/list" className='weather__link'>Show history</Link>
                </div>
            </motion.div>
        </section>
    );
}

export default Main;