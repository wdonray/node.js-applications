import { fileURLToPath } from 'url';
import chalk from 'chalk';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { getWeather } from '../api/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable access to .env
dotenv.config();

// Initialize express
const app = express();

// Store port from .env
const port = process.env.PORT_2;

const publicPath = path.join(__dirname, '../public');
const srcPath = path.join(__dirname, '../src');
const viewsPath = path.join(__dirname, '../src/pages');

// Initialize ejs
app.set('view engine', 'ejs');
// Set views path for ejs
app.set('views', viewsPath)

// Serve static files
app.use(express.static(publicPath));
app.use(express.static(srcPath));

// Render the home route
app.get('/', (_req, res) => {
  res.render('index', {
    siteName: 'Weather Or Not',
  });
});

// Render the weather route
app.get('/weather', async (req, res) => {
  const searchParam = req.query.search;

  try {
    const { temp, feels_like, name, description } = await getWeather(searchParam);

    res.render('weather', {
      address: searchParam ? 'Check it out...' : 'No search param',
      weatherData: {
        temp, 
        feels_like, 
        name, 
        description,
      }
    });
  } catch(err) {
    res.render('404', {
      helpText: 'Error loading weather!'
    });
  }
});

// Render about route
app.get('/about', (_req, res) => {
  res.render('about');
});

// Render about route
app.get('/about/*', (_req, res) => {
  res.render('404', {
    helpText: '404 going too deep!'
  });
});

app.get('*', (_req, res) => {
  res.render('404', {
    helpText: '404 page not found!'
  });
});

// Begin listening to port 3000
app.listen(port, async () => {
  console.log(chalk.green(`Server started on port ${port}`));
});

// Watch for any errors
app.listen(port).on('error', (err) => {
  console.log(chalk.red(err));
});
