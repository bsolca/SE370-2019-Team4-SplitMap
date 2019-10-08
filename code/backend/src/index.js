
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./user-queries');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Split Swagger Api Documentation',
            description: 'The open API to communicate with the React.js app of Split map',
            contact: {
                name: 'Benjamin Solca',
                email: 'benjamin@solca.io'
            },
            servers: 'http://localhost:3000'
        }
    },
    tags: {
        name: "Users",
        description: "All users endpoint"
    },
    apis: ["src/index.js", "src/user-queries.js"]
};
const swaggerDocs= swaggerJsDoc(swaggerOptions);

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Basic sumary
 *     tags:
 *       - Users 
 *     description: suhruoh
 *     responses:
 *       '200':
 *         description: A JSON desc
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
app.get('/users', db.getUsers);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Basic sumary
 *     tags:
 *       - Users 
 *     description: This is only the main endpoint
 *     responses:
 *       '200':
 *         description: A JSON desc
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
    
});
