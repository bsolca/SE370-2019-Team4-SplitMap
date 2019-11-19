var elephantPool = require('./elephantsql').elephantPool;

// GET all sorted items
const getSortedItems = (request, response) => {
    elephantPool.query('SELECT * FROM sorted ORDER BY parent_shelf ASC', (error, result) => {
      if (error) {
          throw error;
      }
      response.status(200).json(result.rows);
  })
};

// GET a single sorted item by id
const getSortedById = (request, response) => {
    const id = parseInt(request.params.id);
    elephantPool.query('SELECT * FROM sorted WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json(result.rows)
    })
};

// POST a new item to a shelf
const createSortedItem = (request, response) => {
    const { parent_shelf, name, layer} = request.body;
    if(layer < 0 || layer > 4) //max layer number is 4
        {
            response.status(400).send(`Invalid layer number.`)
            return -1
        }
    elephantPool.query('SELECT * FROM shelves WHERE id = $1',[parent_shelf], (error, result) => {
    if(result.rowCount == 0) //if there is no shelf with id parent_shelf
    {
        response.status(400).send(`Shelf does not exist.`)
        return -1
    }
})
    elephantPool.query('SELECT * FROM sorted WHERE parent_shelf = $1',[parent_shelf], (error, result) => {
        for(var i = 0; i < result.rowCount; i++){
            if(result.rows[i].layer == layer){
                response.status(400).send(`Layer is already occupied.`)
                return -1
            }
        }
    })
    elephantPool.query('INSERT INTO sorted (parent_shelf, name, layer) VALUES ($1, $2, $3)', [parent_shelf, name, layer], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Item added successfully to shelf.`)
    })
};

// DELETE a sorted item
const deleteSortedItem = (request, response) => {
    const id = parseInt(request.params.id);

    elephantPool.query('DELETE FROM sorted WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Sorted item deleted with ID: ${id}`)
    })
};

// PUT updated data into existing sorted item
const updateSortedItem = (request,response) => {
    const id = parseInt(request.params.id);
    const { parent_shelf, name, layer} = request.body;
    if(layer < 0 || layer > 4) //max layer number is 4
    {
        response.status(400).send(`Invalid layer number.`)
        return -1
    }
    elephantPool.query('SELECT * FROM shelves WHERE id = $1',[parent_shelf], (error, result) => {
    if(result.rowCount == 0) //if there is no shelf with id parent_shelf
    {
        response.status(400).send(`Shelf does not exist.`)
        return -1
    }
})
    elephantPool.query('SELECT * FROM shelves WHERE parent_shelf = $1',[parent_shelf], (error, result) => {
        for(var i = 0; i < result.rowCount; i++){
            if(result.rows[i].layer == layer){
                response.status(400).send(`Layer is already occupied.`)
                return -1
            }
        }
})
    elephantPool.query('UPDATE sorted SET parent_shelf = $1, name = $2, layer = $3 WHERE id = $4', [parent_shelf, name, layer, id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Sorted item #${id} has been updated`)
})
};

module.exports = {
    getSortedItems,
    getSortedById,
    createSortedItem,
    deleteSortedItem,
    updateSortedItem,
};