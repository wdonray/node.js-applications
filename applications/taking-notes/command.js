import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { addNote, removeNote, listNotes, readNotes} from './notes.js';

const yargsSetup = () => yargs(hideBin(process.argv));

const addCommand = { 
  command: 'add', 
  describe: 'Add a new note', 
  handler: addNote,
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
};

const removeCommand = { 
  command: 'remove', 
  describe: 'Remove Notes', 
  handler: removeNote,
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
};

const listCommand = { 
  command: 'list', 
  describe: 'List Notes', 
  handler: listNotes,
};

const readCommand = { 
  command: 'read', 
  describe: 'Read Notes', 
  handler: readNotes,
};

const setupCommands = () => {
  const commands = [addCommand, removeCommand, listCommand, readCommand];

  if (commands.length > 0) {
    console.log(chalk.yellow('--- --- ---'));
    console.log(chalk.green.bold.inverse('Commands initialized!'));
  }

  commands.forEach((command) => {
    yargsSetup().command({ ...command }).parse();
  });
};

export {
  setupCommands,
};