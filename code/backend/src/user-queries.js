var elephantPool = require('./elephantsql').elephantPool;

// GET all users
const getUsers = (request, response) => {
  elephantPool.query('SELECT * FROM users ORDER BY id ASC', (error, result) => {
      if (error) {
          throw error;
      }
      response.status(200).json(result.rows);
  })
};

// GET a single user by id
const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    elephantPool.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json(result.rows)
    })
};

// POST a new user
const createUser = (request, response) => {
    const { name, email } = request.body;

    elephantPool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${result.insertId}`)
    })
};

// PUT updated data in an existing user
const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;

    elephantPool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
};

// DELETE a user
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    elephantPool.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};