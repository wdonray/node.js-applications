import { authMiddleware } from './src/services/middleware/auth.js';
import { setupModel } from './src/services/db/mongoose.js'
import { setupTaskRouter } from './src/services/router/task.js'
import { setupUserRouter } from './src/services/router/user.js'

import chalk from 'chalk';
import dotenv from 'dotenv';
import express from 'express';

const { User, Task } = await setupModel();

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(async (req, res, next) => await authMiddleware(req, res, next, process.env.JWT_SECRET, User));

app.use(express.json());

app.use(setupUserRouter(User, Task, process.env.JWT_SECRET));
app.use(setupTaskRouter(Task));

app.listen(port, () => {
  console.log(chalk.cyanBright(`Server started on port ${port}...`));
}).on('error', (err) => {
  console.log(chalk.red(err));
});
