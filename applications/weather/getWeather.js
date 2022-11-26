import axios from 'axios';
import chalk from 'chalk';
import { getCords } from './getCords.js';

export const getWeather = async (address) => {
  try {
    const { latitude, longitude } = await getCords(address);

    const fetchWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${longitude}&lon=${latitude}&units=imperial&appid=${process.env.OPEN_WEATHER_TOKEN}`;

    const { data } = await axios.get(fetchWeatherUrl);

    const { description } = data.weather[0];
    const { temp, feels_like } = data.main;
    const { name } = data;
    
    return { 
      description,
      feels_like,
      name,
      temp, 
    };
  } catch(err) {
    console.log(chalk.red(err));
  }
};
