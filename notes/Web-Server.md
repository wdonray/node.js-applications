# Web Servers

It would be nice for a user to type a URL into the browser and pull up and interact with our application.

#### How to create a web server?

Express is a popular NPM library that allows you create a web server with Node.js. Express allows us to serve up all of the assets for our application. This includes HTML, CSS and Javascript.

## Example

``` javascript
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
```