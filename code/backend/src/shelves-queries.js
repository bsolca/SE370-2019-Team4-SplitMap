var elephantPool = require('./elephantsql').elephantPool;

// GET all shelves
const getShelves = (request, response) => {
    elephantPool.query('SELECT * FROM shelves ORDER BY id ASC', (error, result) => {
      if (error) {
          throw error;
      }
      response.status(200).json(result.rows);
  })
};

// GET a single shelf by id
const getShelfById = (request, response) => {
    const id = parseInt(request.params.id);
    elephantPool.query('SELECT * FROM shelves WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json(result.rows)
    })
};

// POST a new shelf
const createShelf = (request, response) => {
    const { parent_map, x, y } = request.body;
    if(x < 1 || x > 30){
        response.status(400).send(`Invalid x coord.`)
        return -1
    }

    if(y < 1 || y > 30){
        response.status(400).send(`Invalid y coord.`)
        return -1
    }

    elephantPool.query('SELECT id FROM maps WHERE name = $1',[parent_map], (error, result) => {
    if(result.rowCount == 0) //if there is no map with name parent_map
    {
        response.status(400).send(`Map does not exist.`)
        return -1
    }
    elephantPool.query('INSERT INTO shelves (parent_map, x, y) VALUES ($1, $2, $3)', [parent_map, x, y], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Shelf added with ID: ${result.id}`)
    })
    })
};

// DELETE a shelf
const deleteShelf = (request, response) => {
    const id = parseInt(request.params.id);

    elephantPool.query('DELETE FROM shelves WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Shelf deleted with ID: ${id}`)
    })
};

// PUT updated data into existing shelf
const updateShelf = (request,response) => {
    const id = parseInt(request.params.id);
    const {parent_map,size} = request.body;

    elephantPool.query('UPDATE shelves SET parent_map = $1, size = $2 WHERE id = $3', [parent_map,size,id], (error,result) => {
        if (error){
            throw error
        }
        response.status(200).send(`Shelf ID# ${id} has been updated`)
    })
};

module.exports = {
    getShelves,
    getShelfById,
    createShelf,
    deleteShelf,
    updateShelf,
};