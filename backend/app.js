const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./database');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
const corsOptions = {
  // origin: 'http://localhost:3000',
  // credentials: true,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JWT Authentication API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Token verification middleware
const authenticateToken = require('./middleware/authenticateToken');
app.use('/api/users', authenticateToken);

// Routes
app.use('/api/users', userRoutes);

// Sync database and start the server
sequelize.sync().then(() => {
  console.log('Database synced successfully.');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});
