const express = require("express");

const port = process.env.PORT || 4000;
const app = express();

app.get('/hello-world', (request, response) => {
  response.send('Hello World!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// Export the Express API
module.exports = app;