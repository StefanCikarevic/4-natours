const express = require('express');
const fs = require('fs');

const app = express();

// app.get('/', (request, response) => {
//   response.status(200).json({ message: 'Hello from the server side' });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours', (request, response) => {
  response.status(200).json({ status: 'success', data: { tours: tours } });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`APP running on port ${PORT}`);
});
