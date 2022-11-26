//
// Example: Append a message to append-msg.txt
//

import { writeFileSync, appendFileSync } from 'fs';

// Run with "node append-message.js"

const path = '/append-msg.txt';
const initialMessage = 'This file was created by Node.js!'
const appendedMessage = ' - Donray Williams'

// Create File
writeFileSync(path, initialMessage);

// Append to file
appendFileSync(path, appendedMessage);