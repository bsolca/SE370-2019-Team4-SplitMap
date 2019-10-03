var pool = require('./elephantsql').elephantPool;

// GET all maps
const getMaps = (request, response) => {
  pool.query('SELECT * FROM maps ORDER BY id ASC', (error, result) => {
      if (error) {
          throw error;
      }
      response.status(200).json(result.rows);
  })
};

// GET a single map by id
const getMapById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM maps WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json(result.rows)
    })
};

// GET a map's size
const getMapSize = (request,response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM maps WHERE id = $1',[id], (error,result) => {
        if(error){
            throw error
        }
        response.status(200).send(`Map size: ${result.size}`)
    })
};

// POST a new map
const createMap = (request, response) => {
    const { id, name } = request.body;

    pool.query('INSERT INTO maps (id, name) VALUES ($1, $2)', [id, name], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Map added with ID: ${result.insertId}`)
    })
};

// DELETE a map
const deleteMap = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM maps WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Map deleted with ID: ${id}`)
    })
};

// PUT updated data into existing map
const updateMap = (request,response) => {
    const id = parseInt(request.params.id);
    const {name,user} = request.body;
    const size = parseInt(request.params.size);
    pool.query('UPDATE maps SET name = $1, user = $2, size = $3 WHERE id = $4', [name,user,size,id], (error,result) => {
        if (error){
            throw error
        }
        response.status(200).send(`Map ID# ${id} has been updated`)
    })
};

// PUT user name into existing map
const addMapUser = (request,response) => {
    const id = parseInt(request.params.id);
    const user = request.body;
    pool.query('UPDATE maps SET user = $1 WHERE id = $2', [user, id], (error, result) => {
        if(error){
            throw error
        }
        response.status(200).send(`Username ${user} set`)
    })
};

// PUT blank username in place of already existing one
const delMapUser = (request,response) => {
    const id = parseInt(request.params.id);
    const user = '';
    pool.query('UPDATE maps set user = $1 WHERE id = $2', [user,id], (error, result) => {
        if(error){
            throw error
        }
        response.status(200).send(`Map ID ${id} username cleared`)
    })

};

module.exports = {
    getMaps,
    getMapById,
    getMapSize,
    createMap,
    deleteMap,
    updateMap,
    addMapUser,
    delMapUser,
};