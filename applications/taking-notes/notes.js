import chalk from 'chalk';
import path from 'path';
import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = `${__dirname}/notes/notes.json`;

const loadNotes = () => { 
  try {
    return JSON.parse(readFileSync(filePath).toString()) 
  } catch(err) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes);
  writeFileSync(filePath, dataJson);
};

export const addNote = (argv) => {
  console.log(chalk.green.bold('Running Add Command!'));
  console.log(chalk.yellow('--- --- ---'));
  
  const { title, body } = argv;

  const notes = loadNotes()
  const duplicateNotes = notes.filter((note) => note.title === title);

  if (!duplicateNotes.length) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.blue('Note added.'))
  } else {
    console.log(chalk.red('Note title taken.'))
  }
};

export const removeNote = (argv) => {
  console.log(chalk.green.bold('Running Remove Command!'));
  console.log(chalk.yellow('--- --- ---'));

  const { title } = argv;
  
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => note.title != title);

  if (notes.length !== filteredNotes.length) {
    saveNotes(filteredNotes);
    console.log(chalk.blue('Note removed.'))
  } else {
    console.log(chalk.red('Note not found.'))
  }
};

export const listNotes = () => {
  console.log(chalk.green.bold('Running List Command!'));
  console.log(chalk.yellow('--- --- ---'));

  const notes = loadNotes()

  notes.forEach((note) => {
    console.log(chalk.italic.gray(note.title));
  });
};

export const readNotes = (argv) => {
  console.log(chalk.green.bold('Running Read Command!'));
  console.log(chalk.yellow('--- --- ---'));

  const { title } = argv;

  const notes = loadNotes()

  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.blue(`Note body: ${note.body}`))
  } else {
    console.log(chalk.red('Note not found.'))
  }
};