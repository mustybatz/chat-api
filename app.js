const express = require('express');
const path = require('path');
const Database = require('./src/core/database');
const apiRoutes = require('./src/routes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'src', 'index.html');
    res.sendFile(indexPath);
    // res.send('hola mundo');
});

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger Config
const swaggerOptions = {
    swaggerDefinition: {
        swagger: '2.0',
        info: {
            title: 'ITESO Chat API',
            description: 'A live chat web application',
            version: '1.0.0',
            servers: ['http://localhost:' + port]
        }
    },
    apis: ['./src/modules/**/*.routes.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

Database.connect().then(() => {
    // Listen to port
    app.listen(port, () => {
        console.log('App is listening to port ' + port);
    });
}).catch(err => {
    console.error(err);
});