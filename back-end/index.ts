import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import PROPERTIES from './database/properties.json';
import { PropertyPredicateBuilder } from './helpers/property-predicate-builder';
import {
  PropertyNotFoundError,
  PropertyValidation,
} from './helpers/property-validation';

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:4200',
};

app.use(bodyParser.json());

app.use(cors(corsOptions));

app.get('/api/v1/properties-types', (req, res) => {
  const predicates = PropertyPredicateBuilder.build(req.query);

  const filteredProperties = PROPERTIES.filter((property) => {
    return predicates.every((predicate) => predicate(property));
  });

  const propertiesTypes = filteredProperties.map((property) => property.type);
  const removeDuplicatedTypes = [...new Set(propertiesTypes)];

  res.json(removeDuplicatedTypes);
});

app.get('/api/v1/districts', (req, res) => {
  const predicates = PropertyPredicateBuilder.build(req.query);

  const filteredProperties = PROPERTIES.filter((property) => {
    return predicates.every((predicate) => predicate(property));
  });

  const districts = filteredProperties.map(
    (property) => property.address.district
  );
  const removeDuplicatedDistricts = [...new Set(districts)];

  res.json(removeDuplicatedDistricts);
});

app.get('/api/v1/locations', (req, res) => {
  const predicates = PropertyPredicateBuilder.build(req.query);

  const filteredProperties = PROPERTIES.filter((property) => {
    return predicates.every((predicate) => predicate(property));
  });

  const locations = filteredProperties.map((property) => property.address.city);
  const removeDuplicatedLocations = [...new Set(locations)];

  res.json(removeDuplicatedLocations);
});

app.delete('/api/v1/properties/:id', (req, res) => {
  const { id } = req.params;

  const properties = PROPERTIES.filter((property) => property.id !== +id);

  PROPERTIES.length = 0;
  PROPERTIES.push(...properties);

  const stringifyProperties = JSON.stringify(PROPERTIES);

  fs.writeFileSync(
    `${__dirname}/database/properties.json`,
    stringifyProperties
  );

  res.json(PROPERTIES);
});

app.post('/api/v1/properties', (req, res) => {
  const property = PropertyValidation.validate(req.body);

  if (property instanceof PropertyNotFoundError) {
    return res.status(400).send(property.message);
  }

  PROPERTIES.push(property as any);

  const stringifyProperties = JSON.stringify(PROPERTIES);

  fs.writeFileSync(
    `${__dirname}/database/properties.json`,
    stringifyProperties
  );

  res.json(req.body);
});

app.get('/api/v1/properties', (req, res) => {
  const predicates = PropertyPredicateBuilder.build(req.query);

  const filteredProperties = PROPERTIES.filter((property) => {
    return predicates.every((predicate) => predicate(property));
  });

  res.json(filteredProperties);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
