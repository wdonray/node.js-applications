import { fileURLToPath } from 'url';
import chalk from 'chalk';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable access to .env
dotenv.config();

// Initialize express
const app = express();

// Store port from .env
const port = process.env.PORT;

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
