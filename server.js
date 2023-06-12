const express = require('express');
const app = express();
const cors = require('cors');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const data = [
  { id: 1, name: 'Sabara' },
  { id: 2, name: 'Margarlet' },
  { id: 3, name: 'Linda' }
];

const csvWriter = createCsvWriter({
  path: 'data.csv',
  header: [
    { id: 'id', title: 'identity' },
    { id: 'name', title: 'name' }
  ]
});

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET',
  allowedHeaders: ['Content-type', 'X-Api-key'],
  exposedHeaders: ['Content-type'],
  preflightContinue: false
};

app.use(cors(corsOptions));

app.get('/rich', (req, res) => {
  const key = req.header('X-Api-Key');
  if (key === 'Rmcop1234') {
    csvWriter.writeRecords(data).then(() => {
      console.log('CSV file created successfully');
      res.download('data.csv');
    });
  } else {
    console.log('Invalid key');
    res.status(401).json({ error: 'Invalid key' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
