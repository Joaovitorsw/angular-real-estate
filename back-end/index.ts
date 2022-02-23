import cors from 'cors';
import express from 'express';
import PROPERTIES from './database/properties.json';

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:4200',
};

app.use(cors(corsOptions));

app.get('/api/v1/properties-types', (req, res) => {
  const propertiesTypes = PROPERTIES.map((property) => property.type);
  const filteredPropertiesTypes = [...new Set(propertiesTypes)];

  res.json(filteredPropertiesTypes);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
