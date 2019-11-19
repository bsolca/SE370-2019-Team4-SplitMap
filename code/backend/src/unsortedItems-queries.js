var elephantPool = require('./elephantsql').elephantPool;

// GET all unsorted items
const getUnsortedItems = (request, response) => {
    elephantPool.query('SELECT * FROM unsorted ORDER BY parent_map ASC', (error, result) => {
      if (error) {
          throw error;
      }
      response.status(200).json(result.rows);
  })
};

// GET a single unsorted item by id
const getUnsortedById = (request, response) => {
    const id = parseInt(request.params.id);
    elephantPool.query('SELECT * FROM unsorted WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json(result.rows)
    })
};

// POST a new item to a map
const createUnsortedItem = (request, response) => {
    const {parent_map, name} = request.body;

    elephantPool.query('SELECT * FROM maps WHERE id = $1',[parent_map], (error, result) => {
    if(result.rowCount == 0) //if there is no map with id parent_map
    {
        response.status(400).send(`Map does not exist.`)
        return -1
    }
    elephantPool.query('INSERT INTO unsorted (parent_map, name) VALUES ($1, $2)', [parent_map, name], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Item added successfully to map.`)
    })
    })
};

// DELETE an unsorted item
const deleteUnsortedItem = (request, response) => {
    const id = parseInt(request.params.id);

    elephantPool.query('DELETE FROM unsorted WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Unsorted item deleted with ID: ${id}`)
    })
};

// PUT updated data into existing unsorted item
const updateUnsortedItem = (request,response) => {
    const id = parseInt(request.params.id);
    const { parent_map, name} = request.body;

    elephantPool.query('SELECT * FROM maps WHERE id = $1',[parent_map], (error, result) => {
    if(result.rowCount == 0) //if there is no shelf with id parent_map
    {
        response.status(400).send(`Map does not exist.`)
        return -1
    }

    elephantPool.query('UPDATE unsorted SET parent_map = $1, name = $2, WHERE id = $3', [parent_shelf, name, id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Unsorted item #${id} has been updated`)
    })
    })
};

module.exports = {
    getUnsortedItems,
    getUnsortedById,
    createUnsortedItem,
    deleteUnsortedItem,
    updateUnsortedItem,
};