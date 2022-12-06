import { connect } from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { createTaskModel, createUserModel } from '../../models/index.js';

dotenv.config();

export const setupModel = async () => {
  try {
    await connect(process.env.MONGODB_CONNECTION_URL + '/task-api');
    return { 
      User: createUserModel(), 
      Task: createTaskModel() 
    };
  } catch(err) {
    console.log(chalk.red(err));
  }
}
