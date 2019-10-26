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

// GET a map's size
const getMapSize = (request,response) => {
    const id = parseInt(request.params.id);

    elephantPool.query('SELECT * FROM maps WHERE id = $1', [id], (error,result) => {
        if(error){
            throw error
        }
        response.status(200).send(`Map width: ${result.size_width}, map height: ${result.size_height}`)
    })
};

// POST a new map
const createMap = (request, response) => {
    const { name, size_width, size_height } = request.body;

    elephantPool.query('INSERT INTO maps (name, size_width, size_height) VALUES ($1, $2, $3)', [name, size_width, size_height], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Map added with ID: ${result.insertId}`)
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

module.exports = {
    getMaps,
    getMapById,
    getMapSize,
    createMap,
    deleteMap,
    updateMap,
};