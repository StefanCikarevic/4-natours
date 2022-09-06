const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.status(200).json({ message: 'Hello from the server side' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`APP running on port ${PORT}`);
});
