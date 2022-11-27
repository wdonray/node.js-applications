import axios from 'axios';
import chalk from 'chalk';

export const getCords = async (address) => {
  const fetchGeocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;
 
  try {
    const { data } = await axios.get(fetchGeocodingUrl);
    const [latitude, longitude] = data.features[0].center;

    return {
      latitude,
      longitude
    };
  } catch (err) {
    console.log(chalk.red(err));
  }
};
