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

    elephantPool.query('SELECT * FROM maps WHERE id = $1',[parent_map], (error, result) => {
    if(result.rowCount == 0) //if there is no map with id parent_map
    {
        response.status(400).send(`Map does not exist.`)
        return -1
    }
    if(x < 0 || x > result.rows[0].size_width){
        response.status(400).send(`Invalid x coord.`)
        return -1
    }
    if(y < 0 || y > result.rows[0].size_height){
        response.status(400).send(`Invalid y coord.`)
        return -1
    }
    elephantPool.query('SELECT * FROM shelves WHERE parent_map = $1',[parent_map], (error, result) => {
        for(var i = 0; i < result.rowCount; i++){
            if(result.rows[i].x == x && result.rows[i].y == y){
                response.status(400).send(`Location is already occupied.`)
                return -1
            }
        }

    elephantPool.query('INSERT INTO shelves (parent_map, x, y) VALUES ($1, $2, $3)', [parent_map, x, y], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Shelf added successfully.`)
    })
    })
    })
};

// DELETE a shelf and child items 
const deleteShelf = (request, response) => {
    const id = parseInt(request.params.id);
    elephantPool.query('DELETE FROM sorted WHERE parent_shelf = $1', [id], (error, result) => { //delete child items, if there are any
        if(error){
            throw error
        }
    })
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
    const {parent_map,x,y} = request.body;
    elephantPool.query('SELECT * FROM maps WHERE id = $1',[parent_map], (error, result) => {
        if(result.rowCount == 0) //if there is no map with id parent_map
        {
            response.status(400).send(`Map does not exist.`)
            return -1
        }
        if(x < 0 || x > result.rows[0].size_width){
            response.status(400).send(`Invalid x coord.`)
            return -1
        }
        if(y < 0 || y > result.rows[0].size_height){
            response.status(400).send(`Invalid y coord.`)
            return -1
        }
    elephantPool.query('SELECT * FROM shelves WHERE parent_map = $1',[parent_map], (error, result) => {
        for(var i = 0; i < result.rowCount; i++){
            if(result.rows[i].x == x && result.rows[i].y == y){
                response.status(400).send(`Location is already occupied.`)
                return -1
            }
        }
    elephantPool.query('UPDATE shelves SET parent_map = $1, x = $2, y = $3 WHERE id = $4', [parent_map,x,y,id], (error,result) => {
        if (error){
            throw error
        }
        response.status(200).send(`Shelf ID# ${id} has been updated`)
    })
    })
    })
};

module.exports = {
    getShelves,
    getShelfById,
    createShelf,
    deleteShelf,
    updateShelf,
};