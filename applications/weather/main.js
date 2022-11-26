import axios from 'axios';
import chalk from 'chalk';
import dotenv from 'dotenv';

import { getWeather } from './getWeather.js';

axios.defaults.headers.common['accept-encoding'] = null;
dotenv.config()

console.log(chalk.green('Starting weather app...'));
console.log(chalk.yellow('--- --- ---'));

const { temp, feels_like, name, description } = await getWeather(process.argv[2]);

console.log(chalk.blue(`It is currently ${temp} in ${name} and it feels like ${feels_like} with ${description}`));

console.log(chalk.yellow('--- --- ---'));

console.log(chalk.red('Shutting down weather app...'));
