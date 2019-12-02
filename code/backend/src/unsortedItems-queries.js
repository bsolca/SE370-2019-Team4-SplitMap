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
    const {parent_map, name, description, quantity, dest_map, dest_quantity} = request.body;

    elephantPool.query('SELECT * FROM maps WHERE id = $1',[parent_map], (error, result) => {
    if(result.rowCount == 0) //if there is no map with id parent_map
    {
        response.status(400).send(`Map does not exist.`)
        return -1
    }
    elephantPool.query('SELECT * FROM maps WHERE id = $1',[dest_map],(error,result) => {
        if(result.rowCount == 0){
            response.status(400).send(`Destination map does not exist.`)
            return -1
        }
    elephantPool.query('INSERT INTO unsorted (parent_map, name, description, quantity, dest_map, dest_quantity) VALUES ($1, $2, $3, $4, $5, $6)', [parent_map, name, description, quantity, dest_map, dest_quantity], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Item added successfully to map.`)
    })
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
    const {parent_map, name, description, quantity, dest_map, dest_quantity} = request.body;

    elephantPool.query('SELECT * FROM maps WHERE id = $1',[parent_map], (error, result) => {
    if(result.rowCount == 0) //if there is no shelf with id parent_map
    {
        response.status(400).send(`Map does not exist.`)
        return -1
    }
    elephantPool.query('SELECT * FROM maps WHERE id = $1',[dest_map],(error,result) => {
        if(result.rowCount == 0){
            response.status(400).send(`Destination map does not exist.`)
            return -1
        }
    elephantPool.query('UPDATE unsorted SET parent_map = $1, name = $2, description = $3, quantity = $4, dest_map = $5, dest_quantity = $6 WHERE id = $7', [parent_shelf, name, description, quantity, dest_map, dest_quantity, id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Unsorted item #${id} has been updated`)
    })
    })
    })
};

const moveUnsortedItem = (request,response) => {
    const id = parseInt(request.params.id);
    elephantPool.query('SELECT * FROM unsorted WHERE id = $1',[id],(error,result) => {
        if(error)
            throw error;
        var sourceSize = result.rows[0].quantity - result.rows[0].dest_quantity;
        elephantPool.query('INSERT INTO unsorted (parent_map, name, description, quantity) VALUES ($1, $2, $3, $4)', [result.rows[0].dest_map, result.rows[0].name, result.rows[0].description, result.rows[0].dest_quantity],(error,result) => {
            if(error)
                throw error;
        })
        if(sourceSize === 0){
            elephantPool.query('DELETE FROM unsorted WHERE id = $1',[id],(error,result) => {
                if(error)
                    throw error;
                response.status(200).send(`Item #${id} has been moved.`);
                 })
        }
        else{
            elephantPool.query('UPDATE unsorted SET parent_map = $1, name = $2, description = $3, quantity = $4, dest_map = $5, dest_quantity = $6 WHERE id = $7', [result.rows[0].parent_map,result.rows[0].name,result.rows[0].description,sourceSize,null,null,id],(error,result) => {
                if(error)
                    throw error;
                response.status(200).send(`Item #${id} has been split.`);
            })
        }
    })
};

//move an item from a map onto a shelf
const importItem = (request,response) => {
    const id = parseInt(request.params.id);
    const {shelfId,layer,quantity} = request.body;
    elephantPool.query('SELECT * FROM unsorted WHERE id = $1',[id],(error,result) => {
        var sourceQuantity = result.rows[0].quantity - quantity;
        if(result.rowCount == 0){
            response.status(200).send(`No item exists with id# ${id}.`);
            return 0;
        }
        else{
            elephantPool.query('INSERT INTO sorted (parent_shelf,name,description,layer,quantity) VALUES ($1,$2,$3,$4,$5)', [shelfId,result.rows[0].name,result.rows[0].description,layer,quantity], (error,result) => {
                if(error)
                    throw error;
            })
            if(sourceQuantity == 0){
                elephantPool.query('DELETE FROM unsorted WHERE id = $1',[id],(error,result) => {
                    if(error)
                        throw error;
                })
                response.status(200).send(`Item# ${id} has been moved onto Shelf# ${shelfId}.`)
            }
            else{
                elephantPool.query('UPDATE unsorted SET quantity = $1 WHERE id = $2', [sourceQuantity,id], (error,result) => {
                    if(error)
                        throw error;
                })
                response.status(200).send(`Item# ${id} has been split onto Shelf# ${shelfId}.`);
            }
        }
    })
};

module.exports = {
    getUnsortedItems,
    getUnsortedById,
    createUnsortedItem,
    deleteUnsortedItem,
    updateUnsortedItem,
    moveUnsortedItem,
    importItem,
};