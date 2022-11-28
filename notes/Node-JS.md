# What is Node.js? 

##### TL:DR

<sub>
  <i>
    Allows you to run JS on a server as opposed to just the client.
  </i>
</sub>

---
Node.js expanded the capabilities of Javascript. Before Node, JS was limited to what the browser could do. With Node you can now use JS to build things like web servers and connect to databases, command line interfaces and back-end applications. 

##### Important side notes
- Node was written in C++.
- Node is not a programming language.
- Node sends JS code to V8 JS Engine (C++) to get the results back.
- JS is really just running C++ behind the scenes.
- Asynchronous, Non-blocking, Single Threaded and Event Driven.


# Why should you use Node.js?

Node uses an event-driven, non-blocking input/output model that makes it lightweight and efficient. While you are making request Node can still run as you are waiting for that request to return a response.

#### Blocking I/O Model (Total Time: 4.5 Seconds)
```javascript
import getUserSync from './src/api/user';

const userOne = getUserSync(1);
console.log(userOne);

const userTwo = getUserSync(2);
console.log(userTwo);

const sum = 1 + 33;
console.log(sum);
```

#### Non-blocking I/O Model (Total Time: 2.1 Seconds)
```javascript
import getUser from './src/api/user';

getUser(1, (user) => {
  console.log(user);
});

getUser(2, (user) => {
  console.log(user);
});

const sum = 1 + 33;
console.log(sum);
```

Non-blocking speeds up processing and allows you to process multiple actions. Node uses NPM for package management, which is the largest open source library there is.