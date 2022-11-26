import http from 'http';
import dotenv from 'dotenv';

dotenv.config()

const url = `http://api.openweathermap.org/data/2.5/weather?lat=-9.58890301712257&lon=-51.6197890205486&units=imperial&appid=${process.env.OPEN_WEATHER_TOKEN}`

const request = http.request(url, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data = data + chunk
  });

  response.on('end', () => {
    console.log('Body:', JSON.parse(data))
  });
});

request.on("error", (err) => console.log("Error: ", err));
request.end();