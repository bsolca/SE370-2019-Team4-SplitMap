var elephantPool = require('./elephantsql').elephantPool;

// GET all maps
const getMaps = (request, response) => {
    elephantPool.query('SELECT * FROM maps ORDER BY id ASC', (error, result) => {
      if (error) {
          throw error;
      }
      response.status(200).json(result.rows);
  })
};

// GET a single map by id
const getMapById = (request, response) => {
    const id = parseInt(request.params.id);

    elephantPool.query('SELECT * FROM maps WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json(result.rows)
    })
};

// POST a new map
const createMap = (request, response) => {
    const { name, size_width, size_height } = request.body;
    if(/[^a-zA-Z0-9]/.test(name)){ //if there are any special chars in name
        response.status(400).send(`Invalid name; no special characters.`)
        return -1
    }
    if(size_width < 1 || size_width > 30){
        response.status(400).send(`Invalid width.`)
        return -1
    }
    if(size_height < 1 || size_height > 30){
        response.status(400).send(`Invalid height.`)
        return -1
    }
    elephantPool.query('SELECT id FROM maps WHERE name = $1',[name], (error, result) => {
        if(result.rowCount == 0){
        elephantPool.query('INSERT INTO maps (name, size_width, size_height) VALUES ($1, $2, $3)', [name, size_width, size_height], (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Map added successfully.`)
        })
    }
        else
            response.status(400).send(`Duplicate names are not allowed.`)
    })
    };

// DELETE a map
const deleteMap = (request, response) => {
    const id = parseInt(request.params.id);

    elephantPool.query('DELETE FROM maps WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Map deleted with ID: ${id}`)
    })
};

// PUT updated data into existing map
const updateMap = (request,response) => {
    const id = parseInt(request.params.id);
    const {name, size_width, size_height} = request.body;

    elephantPool.query('UPDATE maps SET name = $1, size_width = $2, size_height = $3 WHERE id = $4', [name,size_width,size_height,id], (error,result) => {
        if (error){
            throw error
        }
        response.status(200).send(`Map ID# ${id} has been updated`)
    })
};

// GET all child shelves for a specific map
const getChildShelves = (request,response) => {
    const { id } = request.body;
    elephantPool.query('SELECT * FROM shelves WHERE parent_map = $1', [id], (error,result) => {
        if(error){
            throw error
        }
        if(result.rowCount == 0){
            response.status(200).send(`Map has no shelves.`)
            return 1
            }
        response.status(200).json(result.rows)
    })
};

module.exports = {
    getMaps,
    getMapById,
    createMap,
    deleteMap,
    updateMap,
    getChildShelves,
};