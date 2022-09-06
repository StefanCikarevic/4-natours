const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

// app.get('/', (request, response) => {
//   response.status(200).json({ message: 'Hello from the server side' });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (request, response) => {
  response
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours: tours } });
});

app.get('/api/v1/tours/:id', (request, response) => {
  
  const tour = tours.find((tour) => tour.id == request.params.id);
  response.status(200).json({ status: 'success', data: { tour: tour } });
});

app.post('/api/v1/tours', (request, response) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, request.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      response
        .status(201)
        .json({ message: 'success', data: { tour: newTour } });
    }
  );
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`APP running on port ${PORT}`);
});
