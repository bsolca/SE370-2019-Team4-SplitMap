const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const port = 3000;
const db = require('./user-queries');
const mapsQueries = require('./maps-queries');
const shelvesQueries = require('./shelves-queries');
const sortedQueries = require('./sortedItems-queries');
const unsortedQueries = require('./unsortedItems-queries')

app.use(bodyParser.json());
app.use(cors());

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
app.get('maps/', mapsQueries.getChildShelves);

app.get('/shelves/',shelvesQueries.getShelves);
app.get('/shelves/:id',shelvesQueries.getShelfById);
app.post('/shelves/',shelvesQueries.createShelf);
app.delete('/shelves/:id',shelvesQueries.deleteShelf);
app.put('/shelves/:id',shelvesQueries.updateShelf);

app.get('/sorted/',sortedQueries.getSortedItems);
app.get('/sorted/:id',sortedQueries.getSortedById);
app.post('/sorted/',sortedQueries.createSortedItem);
app.delete('sorted/:id',sortedQueries.deleteSortedItem);
app.put('sorted/:id',sortedQueries.updateSortedItem);

app.get('/unsorted/',unsortedQueries.getUnsortedItems);
app.get('/unsorted/:id',unsortedQueries.getUnsortedById);
app.post('/unsorted/',unsortedQueries.createUnsortedItem);
app.delete('unsorted/:id',unsortedQueries.deleteUnsortedItem);
app.put('unsorted/:id',unsortedQueries.updateUnsortedItem);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
