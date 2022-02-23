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

app.get('/api/v1/districts', (req, res) => {
  const districts = PROPERTIES.map((property) => property.address.district);
  const filteredDistricts = [...new Set(districts)];

  res.json(filteredDistricts);
});

app.get('/api/v1/locations', (req, res) => {
  const locations = PROPERTIES.map((property) => property.address.city);
  const filteredLocations = [...new Set(locations)];

  res.json(filteredLocations);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
