const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./user-queries');
const mapsQueries = require('./maps-queries');

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.get('/maps', mapsQueries.getMaps);
app.get('/maps/:id', mapsQueries.getMapById);
app.post('/maps/', mapsQueries.createMap);
app.delete('/maps/:id', mapsQueries.deleteMap);
app.put('/maps/:id', mapsQueries.updateMap);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
