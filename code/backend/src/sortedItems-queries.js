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
        response.status(200).json(result.rows);
    })
};

// POST a new item to a shelf
const createSortedItem = (request, response) => {
    const {parent_shelf, name, description, layer, quantity, dest_shelf, dest_layer, dest_quantity} = request.body;
    if(layer < 0 || layer > 4){ //max layer number is 4
            response.status(400).send(`Invalid layer number.`)
            return -1
    }
    if(dest_shelf != null){
    elephantPool.query('SELECT * FROM shelves WHERE id = $1',[dest_shelf], (error, result) => {
    if(result.rowCount == 0)
    {
        response.status(400).send(`Destination shelf does not exist.`)
        return -1
    }
        elephantPool.query('SELECT * FROM sorted WHERE parent_shelf = $1',[dest_shelf], (error, result) => {
        for(var i = 0; i < result.rowCount; i++){
            if(result.rows[i].layer == dest_layer){
                response.status(400).send(`Destination layer is already occupied.`)
                return -1
            }
        }
    })
})
}
elephantPool.query('SELECT * FROM shelves WHERE id = $1',[parent_shelf], (error, result) => {
if(result.rowCount == 0) //if there is no shelf with id parent_shelf
{
    response.status(400).send(`Shelf does not exist.`)
    return -1
}
    elephantPool.query('SELECT * FROM sorted WHERE parent_shelf = $1',[parent_shelf], (error, result) => {
        for(var i = 0; i < result.rowCount; i++){
            if(result.rows[i].layer == layer){
                response.status(400).send(`Layer is already occupied.`)
                return -1
            }
        }
        elephantPool.query('INSERT INTO sorted (parent_shelf, name, description, layer, quantity, dest_shelf, dest_layer, dest_quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [parent_shelf, name, description, layer, quantity, dest_shelf, dest_layer, dest_quantity], (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Item added successfully to shelf.`)
        })
    })
})
};

// DELETE a sorted item
const deleteSortedItem = (request, response) => {
    const id = parseInt(request.params.id);

    elephantPool.query('DELETE FROM sorted WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Sorted item deleted with ID: ${id}`);
    })
};

// PUT updated data into existing sorted item
const updateSortedItem = (request,response) => {
    const id = parseInt(request.params.id);
    const {parent_shelf, name, description, layer, quantity, dest_shelf, dest_layer, dest_quantity} = request.body;
    var alreadyFailed = false;
    if(layer < 0 || layer > 4){ //max layer number is 4

            response.status(400).send(`Invalid layer number.`)
            return -1
    }
    if(dest_shelf != null){
    elephantPool.query('SELECT * FROM shelves WHERE id = $1',[dest_shelf], (error, result) => {
    if(result.rowCount === 0)
    {
        response.status(400).send(`Destination shelf does not exist.`)
        alreadyFailed = true;
        return -1
    }
        elephantPool.query('SELECT * FROM sorted WHERE parent_shelf = $1',[dest_shelf], (error, result) => {
        for(var i = 0; i < result.rowCount; i++){
            if(result.rows[i].layer == layer){
                response.status(400).send(`Destination layer is already occupied.`)
                alreadyFailed = true;
                return -1
            }
        }
    })
})
}
 if(!alreadyFailed){
    elephantPool.query('SELECT * FROM shelves WHERE id = $1',[parent_shelf], (error, result) => {
    if(result.rowCount == 0) //if there is no shelf with id parent_shelf
    {
        response.status(400).send(`Shelf does not exist.`)
        return -1
    }
    elephantPool.query('UPDATE sorted SET parent_shelf = $1, name = $2, description = $3, layer = $4, quantity = $5, dest_shelf = $6, dest_layer = $7 , dest_quantity = $8 WHERE id = $9', [parent_shelf, name, description, layer, quantity, dest_shelf, dest_layer, dest_quantity, id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Sorted item #${id} has been updated.`)
    })
    })
}
};

//move a sorted item to another shelf, the location of which is stored with the item
const moveSortedItem = (request,response) => {
    const id = parseInt(request.params.id);
    elephantPool.query('SELECT * FROM sorted WHERE id = $1',[id],(error,result) => {
        if(error)
            throw error;
        var sourceSize = result.rows[0].quantity - result.rows[0].dest_quantity;
        elephantPool.query('INSERT INTO sorted (parent_shelf, name, description, layer, quantity) VALUES ($1, $2, $3, $4, $5)', [result.rows[0].dest_shelf, result.rows[0].name, result.rows[0].description, result.rows[0].dest_layer, result.rows[0].dest_quantity],(error,result) => {
            if(error)
                throw error;
        })
        if(sourceSize === 0){
        elephantPool.query('DELETE FROM sorted WHERE id = $1',[id],(error,result) => {
            if(error)
                throw error;
            response.status(200).send(`Item #${id} has been moved.`);
             })
        }
        else{
            elephantPool.query('UPDATE sorted SET parent_shelf = $1, name = $2, description = $3, layer = $4, quantity = $5, dest_shelf = $6, dest_layer = $7 , dest_quantity = $8 WHERE id = $9',[result.rows[0].parent_shelf, result.rows[0].name, result.rows[0].description, result.rows[0].layer, sourceSize, null, null, null, id],(error,result) => {
                if(error)
                    throw error;
                    response.status(200).send(`Item #${id} has been split.`);
            })
        }
    })
};

//move an item from a shelf onto a map
const exportItem = (request,response) => {
    const id = parseInt(request.params.id);
    const {mapId,quantity} = request.body;
    elephantPool.query('SELECT * FROM sorted WHERE id = $1',[id],(error,result) => {
        var sourceQuantity = result.rows[0].quantity - quantity;
        if(result.rowCount == 0){
            response.status(200).send(`No item exists with id# ${id}.`);
            return 0;
        }
        else{
            elephantPool.query('INSERT INTO unsorted (parent_map, name, description, quantity) VALUES ($1, $2, $3, $4)', [mapId,result.rows[0].name,result.rows[0].description,quantity], (error,result) => {
                if(error)
                    throw error;
            })
            if(sourceQuantity == 0){
                elephantPool.query('DELETE FROM sorted WHERE id = $1',[id],(error,result) => {
                    if(error)
                        throw error;
                })
                response.status(200).send(`Item# ${id} has been moved onto Map# ${mapId}.`)
            }
            else{
                elephantPool.query('UPDATE sorted SET quantity = $1 WHERE id = $2', [sourceQuantity,id], (error,result) => {
                    if(error)
                        throw error;
                })
                response.status(200).send(`Item# ${id} has been split onto Map# ${mapId}.`);
            }
        }
    })
};

module.exports = {
    getSortedItems,
    getSortedById,
    createSortedItem,
    deleteSortedItem,
    updateSortedItem,
    moveSortedItem,
    exportItem,
};