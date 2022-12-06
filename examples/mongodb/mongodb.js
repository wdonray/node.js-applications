// CRUD - Create, Read, Update and Delete
import { MongoClient, ObjectId } from 'mongodb';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_CONNECTION_URL);
let taskDb = null;
let users = null;

const isInitialized = () => taskDb && users && client;

export const setupClient = async () => {
  try {
    taskDb = client.db('task-db');
    users = taskDb.collection('users');

    await client.connect();
    console.log(chalk.green.bold.inverse('Client Connected...'));

    return { taskDb, users, client };
  } catch(err) {
    console.log(chalk.red(err));
  }
};

// Create
export const addUser = async ({ name, age }) => {
  if (!isInitialized()) {
    return;
  }

  try {
    const result = await users.insertOne({ _id: new ObjectId(), name, age });
    console.log(chalk.blue.inverse(`A document was inserted with the _id: ${result.insertedId}`));
  } catch(err) {
    console.log(chalk.red(err));
  }
};

// Read
export const readUser = async(query, options = null) => {
  if (!isInitialized()) {
    return;
  }

  try {
    const user = await users.findOne(query, options);
    console.log(chalk.blue.inverse(`A document was found with the name ${user.name}`));
    return user;
  } catch(err) {
    console.log(chalk.red(err));
    return null;
  }
};

// Update
export const updateUser = async (userToUpdate, fieldsToUpdate) => {
  if (!isInitialized()) {
    return;
  }

  const filter = { name: userToUpdate };
  const updateDoc = { $set: fieldsToUpdate };

  // this option instructs the method to create a document if no documents match the filter
  const options = { upsert: true };

  try {
    const result = await users.updateOne(filter, updateDoc, options);
    console.log(chalk.yellow.inverse(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    ));
  } catch(err) {
    console.log(chalk.red(err));
  }
};

// Delete
export const deleteUser = async (query) => {
  if (!isInitialized()) {
    return;
  }

  try {
    const result = await users.deleteOne(query);

    if (result.deletedCount === 1) {
      console.log(chalk.green("Successfully deleted one document."));
    } else {
      console.log(chalk.red("No documents matched the query. Deleted 0 documents."));
    }

  } catch(err) {
    console.log(chalk.red(err));
  }
};