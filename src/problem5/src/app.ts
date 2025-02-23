import express from 'express';
import bodyParser from 'body-parser';
import resourceRoutes from './routes/resourceRoutes';

// Initialize express app
const app = express();
app.use(bodyParser.json());

// Use the routes
app.use('/api/resources', resourceRoutes);

// Default route for testing
app.get('/', (req, res) => {
  res.send('ExpressJS with TypeScript CRUD API');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
