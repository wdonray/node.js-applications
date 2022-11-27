import express from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('', (req, res) => {
  res.send('Hello express!');
});

app.get('/help', (req, res) => {
  res.send('Need some help? Head over to "notes/Web-Server.md"');
});

app.get('/about', (req, res) => {
  res.send('This is an example of a web server being created with express.');
});

app.listen(port, () => {
  console.log(chalk.green(`Server started on port ${port}...`));
});